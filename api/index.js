import express from 'express';
import cors from 'cors';

// Import routes
import generateVideoRouter from './routes/generateVideo.js';
import generateRouter from './routes/generate.js';
import generatePlusRouter from './routes/generate.plus.js';
import generateContinuationRouter from './routes/generateContinuation.js';
import generateNewContRouter from './routes/generate.newcont.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/generate-videos-veo3', generateVideoRouter);
app.use('/api/generate', generateRouter);
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

export default app;
