import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Import routes
import generateRouter from './routes/generate.js';
import generateVideoRouter from './routes/generateVideo.js';
import generatePlusRouter from './routes/generate.plus.js';
import generateContinuationRouter from './routes/generateContinuation.js';
import generateNewContRouter from './routes/generate.newcont.js';

// Routes
app.use('/api/generate', generateRouter);
app.use('/api/generate-videos-veo3', generateVideoRouter);
app.use('/api/generate.plus', generatePlusRouter);
app.use('/api/generateContinuation', generateContinuationRouter);
app.use('/api/generate.newcont', generateNewContRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
