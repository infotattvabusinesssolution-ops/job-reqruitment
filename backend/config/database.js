const mongoose = require('mongoose');
const logger = require('../utils/logger');

class DatabaseConnection {
  constructor() {
    this.retryCount = 0;
    this.maxRetries = 5;
    this.retryDelay = 5000;
  }

  async connect() {
    const uri = process.env.NODE_ENV === 'test'
      ? process.env.MONGODB_TEST_URI
      : process.env.MONGODB_URI;

    const options = {
      maxPoolSize: 10,
      minPoolSize: 2,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
      heartbeatFrequencyMS: 10000,
      retryWrites: true,
      w: 'majority',
    };

    try {
      await mongoose.connect(uri, options);
      this.retryCount = 0;
      logger.info(`MongoDB connected successfully to ${uri}`);

      mongoose.connection.on('error', (error) => {
        logger.error('MongoDB runtime error:', error);
      });

      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected. Attempting reconnection...');
        this.handleReconnection();
      });

      mongoose.connection.on('reconnected', () => {
        logger.info('MongoDB reconnected successfully');
      });

    } catch (error) {
      logger.error('MongoDB connection error:', error);
      await this.handleReconnection();
    }
  }

  async handleReconnection() {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      logger.info(`Retrying connection... Attempt ${this.retryCount}/${this.maxRetries}`);
      await new Promise(resolve => setTimeout(resolve, this.retryDelay));
      return this.connect();
    } else {
      logger.error('Max reconnection attempts reached. Exiting process.');
      process.exit(1);
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      logger.info('MongoDB disconnected successfully');
    } catch (error) {
      logger.error('Error disconnecting MongoDB:', error);
    }
  }

  isConnected() {
    return mongoose.connection.readyState === 1;
  }

  getConnection() {
    return mongoose.connection;
  }
}

module.exports = new DatabaseConnection();