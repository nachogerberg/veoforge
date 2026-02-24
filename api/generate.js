import OpenAIService from '../services/openaiService.js';
import Veo3Service from '../services/veo3Service.js';

const openaiService = new OpenAIService();
const veo3Service = new Veo3Service();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    const { script, jsonFormat, settingMode, language, room, locations, ...params } = req.body;
    
    if (!script || script.trim().length < 50) {
      return res.status(400).json({ 
        error: 'Script must be at least 50 characters long' 
      });
    }
    
    console.log('[API] Generating segments for script:', script.substring(0, 50) + '...');
    
    const result = await openaiService.generateSegments({
      script,
      jsonFormat: jsonFormat || 'standard',
      settingMode: settingMode || 'single',
      language: language || 'en',
      room: room || 'living room',
      locations: locations || [],
      ...params
    });
    
    res.json({ 
      success: true, 
      segments: result.segments,
      count: result.segments.length
    });
  } catch (error) {
    console.error('[API] Error:', error);
    res.status(500).json({ error: error.message });
  }
}
