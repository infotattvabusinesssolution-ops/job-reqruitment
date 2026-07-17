require('dotenv').config();
const app = require('./app');
const database = require('./config/database');
const logger = require('./utils/logger');
const http = require('http');
const { Server } = require('socket.io');

class ServerBootstrap {
  constructor() {
    this.server = null;
    this.io = null;
    this.port = process.env.PORT || 5000;
    this.host = process.env.HOST || 'localhost';
  }

  async start() {
    try {
      // Connect to database
      await database.connect();
      logger.info('Database connected successfully');

      // Run automatic seeder
      const autoSeed = require('./utils/autoSeed');
      await autoSeed();

      // Create HTTP server
      this.server = http.createServer(app);

      // Initialize Socket.IO
      this.initializeSocketIO();

      // Start listening
      this.server.listen(this.port, this.host, () => {
        logger.info(`
╔══════════════════════════════════════════════════════════╗
║            JobReqruitment Platform Server                ║
╠══════════════════════════════════════════════════════════╣
║  Status:    Running                                      ║
║  Port:      ${String(this.port).padEnd(43)}║
║  Host:      ${this.host.padEnd(43)}║
║  Env:       ${(process.env.NODE_ENV || 'development').padEnd(43)}║
║  API:       http://${this.host}:${this.port}/api          ║
║  Health:    http://${this.host}:${this.port}/health       ║
╚══════════════════════════════════════════════════════════╝
        `);
      });

      // Graceful shutdown handlers
      this.setupGracefulShutdown();

    } catch (error) {
      logger.error('Failed to start server:', error);
      process.exit(1);
    }
  }

  initializeSocketIO() {
    this.io = new Server(this.server, {
      cors: {
        origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
      },
      pingTimeout: 60000,
      pingInterval: 25000,
    });

    // Socket authentication middleware
    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication required'));
      }
      try {
        const jwtManager = require('./config/jwt');
        const decoded = jwtManager.verifyAccessToken(token);
        socket.userId = decoded.userId;
        socket.userRole = decoded.role;
        next();
      } catch (error) {
        next(new Error('Invalid token'));
      }
    });

    this.io.on('connection', (socket) => {
      logger.info(`Socket connected: ${socket.id} (User: ${socket.userId})`);

      // Join user to their personal room
      socket.join(`user:${socket.userId}`);

      // Join role-based room
      if (socket.userRole) {
        socket.join(`role:${socket.userRole}`);
      }

      // Handle typing events
      socket.on('typing:start', (data) => {
        socket.to(`conversation:${data.conversationId}`).emit('typing:start', {
          userId: socket.userId,
          conversationId: data.conversationId,
        });
      });

      socket.on('typing:stop', (data) => {
        socket.to(`conversation:${data.conversationId}`).emit('typing:stop', {
          userId: socket.userId,
          conversationId: data.conversationId,
        });
      });

      // Handle disconnection
      socket.on('disconnect', (reason) => {
        logger.info(`Socket disconnected: ${socket.id} (Reason: ${reason})`);
      });

      // Handle errors
      socket.on('error', (error) => {
        logger.error(`Socket error for ${socket.id}:`, error);
      });
    });

    // Make io accessible to routes
    app.set('io', this.io);
    logger.info('Socket.IO initialized successfully');
  }

  setupGracefulShutdown() {
    const shutdown = async (signal) => {
      logger.info(`${signal} received. Starting graceful shutdown...`);

      // Stop accepting new connections
      if (this.server) {
        this.server.close(() => {
          logger.info('HTTP server closed');
        });
      }

      // Close Socket.IO connections
      if (this.io) {
        this.io.close(() => {
          logger.info('Socket.IO server closed');
        });
      }

      // Disconnect from database
      await database.disconnect();

      logger.info('Graceful shutdown completed');
      process.exit(0);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error);
      shutdown('UNCAUGHT_EXCEPTION');
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });
  }

  getServer() {
    return this.server;
  }

  getIO() {
    return this.io;
  }
}

const serverBootstrap = new ServerBootstrap();

// Start server if this file is run directly
if (require.main === module) {
  serverBootstrap.start();
}

module.exports = serverBootstrap;