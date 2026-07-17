require('dotenv').config();
const database = require('../config/database');
const Role = require('../models/Role');
const User = require('../models/User');
const Category = require('../models/Category');
const logger = require('../utils/logger');
const slugify = require('slugify');

async function seed() {
  try {
    logger.info('Starting database seeding...');
    await database.connect();

    // Seed roles
    logger.info('Seeding roles...');
    await Role.seedDefaultRoles();
    logger.info('Roles seeded successfully');

    // Seed categories
    logger.info('Seeding categories...');
    await seedCategories();
    logger.info('Categories seeded successfully');

    // Seed admin user
    logger.info('Seeding admin user...');
    await seedAdminUser();
    logger.info('Admin user seeded successfully');

    logger.info('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Seeding failed:', error);
    process.exit(1);
  }
}

async function seedCategories() {
  const categories = [
    // Industries
    { name: 'Technology', type: 'industry', icon: '💻', description: 'IT and Technology sector', sortOrder: 1 },
    { name: 'Healthcare', type: 'industry', icon: '🏥', description: 'Healthcare and Medical', sortOrder: 2 },
    { name: 'Finance', type: 'industry', icon: '💰', description: 'Banking and Financial Services', sortOrder: 3 },
    { name: 'Education', type: 'industry', icon: '📚', description: 'Education and Training', sortOrder: 4 },
    { name: 'Manufacturing', type: 'industry', icon: '🏭', description: 'Manufacturing and Production', sortOrder: 5 },
    { name: 'Retail', type: 'industry', icon: '🛍️', description: 'Retail and E-commerce', sortOrder: 6 },
    { name: 'Construction', type: 'industry', icon: '🏗️', description: 'Construction and Real Estate', sortOrder: 7 },
    { name: 'Hospitality', type: 'industry', icon: '🍽️', description: 'Hospitality and Tourism', sortOrder: 8 },

    // Job Categories
    { name: 'Software Development', type: 'job_category', icon: '👨‍💻', description: 'Software engineering and development', sortOrder: 1 },
    { name: 'Data Science', type: 'job_category', icon: '📊', description: 'Data analysis and science', sortOrder: 2 },
    { name: 'Design', type: 'job_category', icon: '🎨', description: 'UI/UX and Graphic Design', sortOrder: 3 },
    { name: 'Marketing', type: 'job_category', icon: '📢', description: 'Marketing and Advertising', sortOrder: 4 },
    { name: 'Sales', type: 'job_category', icon: '🤝', description: 'Sales and Business Development', sortOrder: 5 },
    { name: 'Human Resources', type: 'job_category', icon: '👥', description: 'HR and Recruitment', sortOrder: 6 },
    { name: 'Accounting', type: 'job_category', icon: '📋', description: 'Accounting and Finance', sortOrder: 7 },
    { name: 'Engineering', type: 'job_category', icon: '⚙️', description: 'Mechanical, Electrical, Civil Engineering', sortOrder: 8 },
  ];

  for (const category of categories) {
    category.slug = slugify(category.name, { lower: true, strict: true });
    await Category.findOneAndUpdate(
      { name: category.name, type: category.type },
      category,
      { upsert: true, new: true }
    );
  }
}

async function seedAdminUser() {
  const adminRole = await Role.findOne({ name: 'super_admin' });
  if (!adminRole) {
    logger.error('Admin role not found');
    return;
  }

  const existingAdmin = await User.findOne({ email: 'admin@jobreqruitment.com' });
  if (existingAdmin) {
    logger.info('Admin user already exists');
    return;
  }

  await User.create({
    firstName: 'Super',
    lastName: 'Admin',
    email: 'admin@jobreqruitment.com',
    password: 'Admin@12345',
    role: adminRole._id,
    isEmailVerified: true,
    isActive: true,
  });

  logger.info('Admin user created: admin@jobreqruitment.com / Admin@12345');
}

seed();