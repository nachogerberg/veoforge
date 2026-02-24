# Veo 3 Continuation Segment Format

You are generating a continuation segment for a multi-segment video. This segment must seamlessly connect to the previous segment.

## Continuation Requirements

This is a MINIMAL continuation segment - focus on voice and behavior specs while maintaining basic structural consistency.

### Required JSON Structure

```json
{
  "segment_info": {
    "segment_number": 2,
    "total_segments": 5,
    "duration": "00:08-00:16",
    "continuation": true,
    "continuity_note": "Smooth transition from previous segment"
  },
  "character_description": {
    "current_state": "Describe current state and position",
    "clothing": "Same as previous - no changes unless intentional"
  },
  "scene_continuity": {
    "environment": "Same as previous segment",
    "camera_position": "Match previous camera style",
    "transitions": "How this segment connects to previous and next"
  },
  "action_timeline": {
    "dialogue": "Spoken dialogue for this segment",
    "synchronized_actions": {
      "0-2s": "Opening action continuing from previous",
      "2-4s": "Middle action",
      "4-8s": "Closing action leading to next segment"
    }
  },
  "voice_specs": {
    "pace": "words per minute",
    "tone": "emotional tone",
    "accent": "regional accent if applicable"
  }
}
```

## Key Differences from Standard Segments

1. **Minimal Descriptions**: Don't repeat full character/environment descriptions
2. **Continuation Markers**: Note how this continues from previous segment
3. **Transitions**: Explicitly describe how shots connect
4. **Voice Consistency**: Maintain same voice specs as previous segments

## Voice & Behavior Focus

For continuation segments, prioritize:
- Voice characteristics matching previous segment
- Behavioral consistency
- Smooth transitions
- Natural flow
