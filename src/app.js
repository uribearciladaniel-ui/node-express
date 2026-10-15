import express from 'express';

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',  
    success: true,
    message: 'API is healthy',
    version: '1.0.0',
  });
});

export default app;