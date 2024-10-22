import 'dotenv/config';
import express, { Response, Request } from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.ts';

const PORT = process.env.PORT || 4000;

const app = express();

// Function to connect to the database and start the server
const startServer = async () => {
  try {
    await connectDB(); // Await the database connection
    console.log('Database connected...');

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // Exit the process if there's an error
  }
};

// Middleware setup
app.use(express.json());
app.use(cors());

// Basic route
app.get('/', (_req: Request, res: Response) => {
  res.send("Hello World!");
});

// Start the server and connect to the database
startServer();
