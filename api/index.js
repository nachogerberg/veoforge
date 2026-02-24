// Basic Vercel API handler
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'ok',
    message: 'VeoForge API is running',
    endpoints: [
      '/api/generate - POST: Generate video segments from script',
      '/api/health - GET: Health check'
    ]
  });
}
