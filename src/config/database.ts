import mongoose from 'mongoose';
import Logger from './logger';

class Database {
  private DATABASE: string;
  private logger;

  constructor() {
    // Replace database value in the .env file with your database config url
    this.DATABASE =
      process.env.NODE_ENV === 'test'
        ? process.env.DATABASE_TEST
        : process.env.DATABASE;

    this.logger = Logger.logger;

    if (!this.DATABASE) {
      this.logger.error('Database URL is not defined in environment variables');
      throw new Error('Database URL is not defined. Please check your .env file');
    }
  }

  public initializeDatabase = async (): Promise<void> => {
    try {
      this.logger.info(`Attempting to connect to database... (Environment: ${process.env.NODE_ENV || 'development'})`);

      // Configure mongoose
      mongoose.set('strictQuery', false);
      await mongoose.connect(this.DATABASE, {
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      this.logger.info('Connected to the database.');
      mongoose.connection.on('error', (error) => {
        this.logger.error('MongoDB connection error:', error);
      });

      // Add disconnection handler
      mongoose.connection.on('disconnected', () => {
        this.logger.warn('MongoDB disconnected. Attempting to reconnect...');
      });

      // Add reconnection handler
      mongoose.connection.on('reconnected', () => {
        this.logger.info('MongoDB reconnected successfully.');
      });
    } catch (error) {
      this.logger.error('Could not connect to the database.', error);
    }
  };
}
export default Database;
