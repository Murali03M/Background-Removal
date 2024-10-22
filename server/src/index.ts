import express from 'express'
import type { Express, Request, Response } from 'express'

const app: Express = express()
const port = process.env.PORT || 8080

app.get('/', (_req: Request, res: Response) => {
  res.send('Express Typescript on Vercel')
})

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong 🏓')
})

// Export the Express app for Vercel
export default app

// Start the server only if running locally
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
  })
}
