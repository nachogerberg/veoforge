import express from 'express';
import Veo3Service from '../services/veo3Service.js';

const router = express.Router();

// Generate videos from segments using Veo 3
router.post('/generate-videos-veo3', async (req, res) => {
  console.log('[API] /generate-videos-veo3 called');
  
  try {
    const { segments, videoQuality = 'standard', language = 'es' } = req.body;
    
    // Validate required fields
    if (!segments || !Array.isArray(segments) || segments.length === 0) {
      return res.status(400).json({ 
        error: 'No segments provided for video generation' 
      });
    }
    
    console.log('[API] Generating videos with Veo 3:', {
      segmentCount: segments.length,
      videoQuality,
      language
    });
    
    // Use Veo 3 service for video generation
    const result = await Veo3Service.generateVideosWithVeo3(segments, {
      quality: videoQuality,
      language
    });
    
    console.log('[API] Video generation initiated:', {
      totalVideos: result.videos.length,
      estimatedTime: result.estimatedTime
    });
    
    res.json({
      success: true,
      videos: result.videos,
      service: 'veo3',
      estimatedTime: result.estimatedTime,
      message: 'Video generation initiated successfully'
    });
    
  } catch (error) {
    console.error('[API] Video generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate videos',
      message: error.message 
    });
  }
});

// Check video generation status
router.get('/video-status/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    
    const status = await Veo3Service.getVideoStatus(videoId);
    
    res.json({
      success: true,
      videoId,
      status
    });
    
  } catch (error) {
    console.error('[API] Video status check error:', error);
    res.status(500).json({ 
      error: 'Failed to check video status',
      message: error.message 
    });
  }
});

// Download completed video
router.get('/download-video/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    
    const videoData = await Veo3Service.downloadVideo(videoId);
    
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `attachment; filename="segment_${videoId}.mp4"`);
    res.send(videoData);
    
  } catch (error) {
    console.error('[API] Video download error:', error);
    res.status(500).json({ 
      error: 'Failed to download video',
      message: error.message 
    });
  }
});

// Test endpoint to verify Veo 3 API calls
router.post('/test-veo3', async (req, res) => {
  console.log('[API] /test-veo3 called - Testing Veo 3 API connection');
  
  try {
    const testPrompt = "A simple test video of a person smiling and waving at the camera for 3 seconds";
    
    console.log('[API] Making test API call to Veo 3 with prompt:', testPrompt);
    
    // Test the Veo 3 API call directly
    const result = await Veo3Service.callVeo3API(testPrompt, 'standard');
    
    console.log('[API] Test API call result:', {
      id: result.id,
      status: result.status,
      hasOperation: !!result.operation
    });
    
    res.json({
      success: true,
      message: 'Veo 3 API test successful',
      result: {
        videoId: result.id,
        status: result.status,
        operationName: result.operation?.name,
        apiResponse: result.apiResponse
      }
    });
    
  } catch (error) {
    console.error('[API] Veo 3 test error:', error);
    res.status(500).json({
      success: false,
      error: 'Veo 3 API test failed',
      message: error.message,
      details: error.toString()
    });
  }
});

export default router;

