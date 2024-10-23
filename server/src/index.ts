import express from 'express'
import type { Express, Request, Response } from 'express'
import connectDB from './config/mongodb';
import 'dotenv/config';
import userRouter from './routes/userRoutes';
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



startServer();

// Export the Express app for Vercel
export default app



// Start the server only if running locally
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
  })
}


