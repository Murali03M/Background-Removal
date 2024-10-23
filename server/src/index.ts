import express from 'express'
import type { Express, Request, Response } from 'express'
import connectDB from './config/mongodb';
import 'dotenv/config';
import userRouter from './routes/userRoutes';
import userModel from './models/userModel';
const app: Express = express()
const PORT = process.env.PORT || 8080

app.use(express.json());


// Function to connect to the database and start the server
const startServer = async () => {
  try {
    await connectDB(); // Await the database connection
    console.log('Database connected...');


  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};

app.use('/api/user', userRouter);

app.get('/', (_req: Request, res: Response) => {
  res.send('Express Typescript on Vercel')
})

app.post('/api/test-user', async (req, res) => {
  try {
      const userData = req.body; // Make sure this is in the right format
      await userModel.create(userData);
      res.status(201).json({ success: true });
  } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ success: false, message: error.message });
  }
});




startServer();

// Export the Express app for Vercel
export default app



// Start the server only if running locally
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
  })
}


