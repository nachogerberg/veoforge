// Vercel API Handler for VeoForge
// This file serves all API endpoints

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const path = req.url || '';
  console.log('[API] Request:', path, req.method);
  
  // Health check
  if (path === '/api/health' || path === '/health') {
    return res.status(200).json({ 
      status: 'ok',
      message: 'VeoForge API is running'
    });
  }
  
  // Generate endpoint - POST /api/generate
  if (path.startsWith('/api/generate') && req.method === 'POST') {
    try {
      // Check for API key
      const apiKey = process.env.OPENAI_API_KEY;
      console.log('[API] Has OpenAI key:', !!apiKey);
      
      if (!apiKey) {
        return res.status(500).json({ 
          error: 'OPENAI_API_KEY not configured on server' 
        });
      }
      
      const { default: OpenAIService } = await import('./services/openaiService.js');
      const openaiService = new OpenAIService();
      
      const { script, jsonFormat, settingMode, language, room, locations, ...params } = req.body;
      
      if (!script || script.trim().length < 50) {
        return res.status(400).json({ 
          error: 'Script must be at least 50 characters long' 
        });
      }
      
      console.log('[API] Generating segments...');
      
      const result = await openaiService.generateSegments({
        script,
        jsonFormat: jsonFormat || 'standard',
        settingMode: settingMode || 'single',
        language: language || 'en',
        room: room || 'living room',
        locations: locations || [],
        ...params
      });
      
      return res.json({ 
        success: true, 
        segments: result.segments,
        count: result.segments.length
      });
    } catch (error) {
      console.error('[API] Error:', error.message);
      return res.status(500).json({ error: error.message });
    }
  }
  
  // Default response
  return res.status(200).json({ 
    status: 'ok',
    message: 'VeoForge API is running',
    endpoints: [
      '/api/health - GET: Health check',
      '/api/generate - POST: Generate video segments'
    ]
  });
}
