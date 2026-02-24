// Vercel API Handler for VeoForge

import openaiService from './services/openaiService.js';

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
    const { script, jsonFormat, settingMode, language, room, locations, ...params } = req.body;
    
    if (!script || script.trim().length < 50) {
      return res.status(400).json({ 
        error: 'Script must be at least 50 characters long' 
      });
    }
    
    try {
      console.log('[API] Calling generateSegments...');
      
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
  
  return res.status(200).json({ 
    status: 'ok',
    endpoints: ['/api/health', '/api/generate']
  });
}
