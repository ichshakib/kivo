import cors from 'cors';
import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Kivo API',
    status: 'online',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Kivo API server running on http://localhost:${PORT}`);
});
