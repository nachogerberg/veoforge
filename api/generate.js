import express from 'express';

const app = express();
app.use(express.json());

// Import services
import OpenAIService from '../services/openaiService.js';
import Veo3Service from '../services/veo3Service.js';

const openaiService = new OpenAIService();
const veo3Service = new Veo3Service();

// POST /api/generate
app.post('/generate', async (req, res) => {
  try {
    const { script, jsonFormat, settingMode, language, room, locations, ...params } = req.body;
    
    if (!script || script.trim().length < 50) {
      return res.status(400).json({ 
        error: 'Script must be at least 50 characters long' 
      });
    }
    
    const result = await openaiService.generateSegments({
      script,
      jsonFormat: jsonFormat || 'standard',
      settingMode: settingMode || 'single',
      language: language || 'en',
      room: room || 'living room',
      locations: locations || [],
      ...params
    });
    
    res.json({ success: true, segments: result.segments });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default app;
