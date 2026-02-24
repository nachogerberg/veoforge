# VeoForge

AI-powered video generation platform with Veo3, OpenAI, and multi-model support.

## Features

- **Veo3 Integration** - Generate videos using Google's Veo 3 model
- **OpenAI Support** - Integration with OpenAI for video generation
- **Multi-segment Processing** - Generate videos from multiple segments
- **REST API** - Full REST API for video generation workflows

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your API keys
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

- `POST /api/generate-videos-veo3` - Generate videos with Veo 3
- `GET /api/video-status/:videoId` - Check video generation status
- `GET /api/download-video/:videoId` - Download generated video
- `POST /api/test-veo3` - Test Veo 3 API connection

## Environment Variables

See `.env.example` for required environment variables.

## License

MIT
