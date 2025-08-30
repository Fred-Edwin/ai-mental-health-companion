# 🤖 AI Mental Health Companion - Your Intelligent Voice Assistant

A sophisticated Next.js application that provides real-time voice interaction with specialized AI personas, featuring advanced therapeutic tools and mental health support.

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![OpenAI](https://img.shields.io/badge/OpenAI-Realtime_API-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8)

## 📸 Application Preview

![AI Companion Interface](https://github.com/user/ai-companion/assets/screenshot.png)

*The AI Companion interface featuring the Wellness Therapist persona with mood tracking, task management, and real-time voice interaction capabilities.*

## ✨ Features

### 🎭 Multiple AI Personas
- **💚 Wellness Therapist** - Compassionate mental health companion with therapeutic tools
- **🎯 Productivity Coach** - Task management and goal achievement
- **🎓 Learning Tutor** - Educational support and knowledge sharing

### 🗣️ Advanced Voice Capabilities
- **Real-time voice conversation** using OpenAI's Realtime API
- **WebRTC connection** for low-latency audio
- **Interruption handling** for natural conversation flow
- **Audio transcription** with Whisper integration
- **Voice activity detection** for seamless interaction

### 🧠 Wellness Therapist Tools

#### 📊 Mood Tracking
Track emotional states with detailed metrics:
- Mood levels (very_low → excellent)
- Energy levels (1-10 scale)
- Anxiety tracking (1-10 scale)
- Personal notes and trigger identification
- Persistent data storage

#### 🫁 Guided Breathing Exercises
Professional breathing techniques:
- **4-7-8 Breathing** - Anxiety relief and sleep promotion
- **Box Breathing** - Focus and stress management
- **Simple Deep Breathing** - Quick stress relief
- **Anxiety Relief** - Parasympathetic activation
- Customizable duration and guided instructions

#### 📝 Therapeutic Journaling
Evidence-based prompts for self-reflection:
- **Categories**: Reflection, gratitude, emotions, goals, growth
- **Difficulty levels**: Easy, moderate, deep exploration
- **50+ curated prompts** designed by mental health principles
- Encourages self-discovery over direct advice

#### 🚨 Crisis Support Resources
Immediate access to professional help:
- **24/7 Crisis Hotlines** (988 Suicide Prevention)
- **Text-based support** (Crisis Text Line)
- **Emergency protocols** with clear guidance
- **Mental health resources** and warmlines

### 🛠️ Core Functionality
- **Task Management** - Voice-activated todo list with priorities
- **Weather Integration** - Real-time weather information
- **Smart Guardrails** - Content filtering and safety measures
- **Session Management** - Persistent conversation history
- **Responsive Design** - Works on desktop and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key with Realtime API access
- Modern browser with microphone support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fred-Edwin/ai-companion.git
   cd ai-companion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local` in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` and grant microphone permissions

## 🎯 Usage Examples

### Wellness Therapist Interactions
- *"Track my mood - I'm feeling low with high anxiety"*
- *"Help me with a breathing exercise for stress"*
- *"Give me a journal prompt about emotions"*
- *"I need crisis resources, I'm having a tough time"*
- *"Can you guide me through anxiety relief breathing?"*

### General Assistant
- *"Add buy groceries to my tasks with high priority"*
- *"What's the weather like in New York?"*
- *"Help me organize my day"*

## 🏗️ Architecture

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Lucide React** for icons
- **Zod** for schema validation

### Voice Integration
- **OpenAI Realtime API** for speech-to-speech
- **WebRTC transport** for browser audio
- **Ephemeral client secrets** for security
- **Custom hook architecture** for session management

### State Management
- **React hooks** for local state
- **localStorage** for persistence
- **Real-time updates** via OpenAI streaming

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/ephemeral/     # Ephemeral key generation
│   │   └── weather/            # Weather API integration
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main application
├── components/
│   ├── ui/                     # Reusable UI components
│   ├── ChatHistory.tsx         # Conversation display
│   ├── MicrophoneButton.tsx    # Voice controls
│   ├── PersonaSelector.tsx     # AI persona switcher
│   ├── StatusIndicator.tsx     # Connection status
│   └── TaskList.tsx            # Todo management
├── hooks/
│   ├── useTasks.ts             # Task management
│   └── useVoiceAgent.ts        # Voice session logic
├── lib/
│   └── utils.ts                # Utility functions
└── types/
    └── index.ts                # TypeScript definitions
```

## 🔧 Configuration

### Persona Customization
Modify personas in `src/types/index.ts`:
```typescript
export const PERSONAS: Persona[] = [
  {
    id: 'wellness_therapist',
    name: 'Wellness Therapist',
    instructions: 'Your therapeutic instructions...',
    description: 'Compassionate mental health companion'
  }
];
```

### Tool Development
Add new tools in `src/hooks/useVoiceAgent.ts`:
```typescript
const customTool = tool({
  name: 'tool_name',
  description: 'Tool description',
  parameters: z.object({
    // Define parameters
  }),
  async execute(params) {
    // Tool implementation
  }
});
```

## 🔒 Privacy & Security

- **Ephemeral API keys** prevent key exposure
- **Local data storage** for sensitive information
- **No conversation recording** beyond session
- **HIPAA-aware design** for therapeutic tools
- **Crisis detection** with immediate resource provision

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for the Realtime API and GPT models
- **Mental health professionals** who inspired the therapeutic features
- **Open source community** for the amazing tools and libraries

## 📞 Support & Resources

### Mental Health Resources
- **Crisis Text Line**: Text HOME to 741741
- **National Suicide Prevention Lifeline**: 988
- **SAMHSA National Helpline**: 1-800-662-HELP (4357)

### Technical Support
- [Report Issues](https://github.com/yourusername/ai-companion/issues)
- [Discussions](https://github.com/yourusername/ai-companion/discussions)

---

**⚠️ Important Disclaimer**: This AI companion is designed to provide support and resources, but it is not a replacement for professional mental health treatment. If you're experiencing a mental health crisis, please contact emergency services or a mental health professional immediately.

**Made with ❤️ for mental health awareness and AI-powered wellness**
