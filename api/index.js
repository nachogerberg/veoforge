// Vercel API Handler for VeoForge - Simple test version

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const path = req.url || '';
  
  // Health check
  if (path === '/api/health' || path === '/health') {
    return res.status(200).json({ status: 'ok' });
  }
  
  // Generate endpoint
  if (path.startsWith('/api/generate') && req.method === 'POST') {
    const { script } = req.body;
    
    if (!script || script.trim().length < 50) {
      return res.status(400).json({ 
        error: 'Script must be at least 50 characters long' 
      });
    }
    
    // Test import
    try {
      const { default: OpenAIService } = await import('./services/openaiService.js');
      const service = new OpenAIService();
      
      console.log('[API] Service created, calling generateSegments...');
      
      const result = await service.generateSegments({
        script,
        jsonFormat: 'standard',
        language: 'en'
      });
      
      return res.json({ 
        success: true, 
        segments: result.segments,
        count: result.segments.length
      });
    } catch (error) {
      console.error('[API] Error:', error);
      return res.status(500).json({ 
        error: error.message,
        stack: error.stack
      });
    }
  }
  
  return res.status(200).json({ 
    status: 'ok',
    endpoints: ['/api/health', '/api/generate']
  });
}
