// Vercel API Handler for VeoForge

import openaiService from './services/openaiService.js';
import veo3Service from './services/veo3Service.js';

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
  
  // Generate segments from script
  if (path === '/api/generate' && req.method === 'POST') {
    const { script, jsonFormat, settingMode, language, room, locations, ...params } = req.body;
    
    if (!script || script.trim().length < 50) {
      return res.status(400).json({ 
        error: 'Script must be at least 50 characters long' 
      });
    }
    
    try {
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
  
  // Generate videos with Veo3
  if (path === '/api/generate-videos-veo3' && req.method === 'POST') {
    const { segments, options } = req.body;
    
    if (!segments || !Array.isArray(segments) || segments.length === 0) {
      return res.status(400).json({ 
        error: 'No segments provided' 
      });
    }
    
    try {
      console.log('[API] Generating videos with Veo3...');
      
      const results = await veo3Service.generateVideosWithVeo3(segments, options);
      
      return res.json({ 
        success: true, 
        videos: results,
        count: results.length
      });
    } catch (error) {
      console.error('[API] Veo3 Error:', error.message);
      return res.status(500).json({ error: error.message });
    }
  }
  
  // Check Veo3 video status
  if (path.startsWith('/api/video-status') && req.method === 'GET') {
    const videoId = path.split('/').pop();
    
    try {
      const status = await veo3Service.getVideoStatus(videoId);
      return res.json(status);
    } catch (error) {
      console.error('[API] Status Error:', error.message);
      return res.status(500).json({ error: error.message });
    }
  }
  
  return res.status(200).json({ 
    status: 'ok',
    endpoints: [
      '/api/health',
      '/api/generate - POST: Generate segments from script',
      '/api/generate-videos-veo3 - POST: Generate videos with Veo3',
      '/api/video-status/:id - GET: Check video status'
    ]
  });
}
