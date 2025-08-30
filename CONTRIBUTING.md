# Contributing to AI Companion

Thank you for your interest in contributing to AI Companion! This project aims to provide compassionate AI assistance with a focus on mental health and wellness support.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our commitment to:
- **Compassionate Technology**: Build tools that genuinely help people
- **Mental Health Awareness**: Treat mental health topics with sensitivity and respect
- **Inclusive Development**: Welcome contributors from all backgrounds and experience levels
- **Responsible AI**: Ensure AI tools are used ethically and safely

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key with Realtime API access
- Basic knowledge of React, TypeScript, and Next.js
- Understanding of mental health sensitivity (for wellness features)

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/Fred-Edwin/ai-mental-health-companion.git`
3. Install dependencies: `npm install`
4. Copy environment template: `cp .env.local.example .env.local`
5. Add your OpenAI API key to `.env.local`
6. Start development server: `npm run dev`

## 💡 How to Contribute

### Types of Contributions Welcome
- 🐛 **Bug fixes** - Help make the app more reliable
- ✨ **New features** - Expand AI capabilities and tools
- 🎭 **New personas** - Add specialized AI assistants
- 🛠️ **New tools** - Create additional helper functions
- 📚 **Documentation** - Improve guides and explanations
- 🧪 **Testing** - Add tests for better code quality
- 🎨 **UI/UX improvements** - Enhance user experience
- 🔒 **Security enhancements** - Strengthen privacy and safety

### Contribution Process

#### 1. Choose an Issue
- Check [open issues](https://github.com/Fred-Edwin/ai-mental-health-companion/issues)
- Look for `good-first-issue` or `help-wanted` labels
- Comment on the issue to let others know you're working on it

#### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

#### 3. Make Your Changes
- Write clean, readable code
- Follow existing code style and conventions
- Add comments for complex logic
- Update documentation if needed

#### 4. Test Your Changes
```bash
npm run build    # Ensure it builds successfully
npm run lint     # Check for linting issues
```

#### 5. Commit Your Changes
```bash
git add .
git commit -m "feat: add breathing exercise timer feature"
# Use conventional commit format:
# feat: new feature
# fix: bug fix
# docs: documentation
# style: formatting
# refactor: code restructuring
# test: adding tests
```

#### 6. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```
Then create a pull request with:
- Clear description of changes
- Reference related issues
- Screenshots (if UI changes)
- Testing instructions

## 🎭 Adding New Personas

### Persona Guidelines
1. **Define Clear Purpose**: What specific need does this persona serve?
2. **Craft Instructions**: Write detailed, empathetic instructions
3. **Select Appropriate Tools**: Choose tools that match the persona's role
4. **Add Icon**: Select a meaningful Lucide React icon
5. **Test Thoroughly**: Ensure the persona behaves as expected

### Example Persona Implementation
```typescript
// In src/types/index.ts
{
  id: 'fitness_coach',
  name: 'Fitness Coach',
  instructions: `You are an enthusiastic fitness coach...`,
  description: 'Motivating health and exercise companion'
}

// Add corresponding icon in PersonaSelector.tsx
fitness_coach: Dumbbell,
```

## 🛠️ Creating New Tools

### Tool Development Guidelines
1. **Single Responsibility**: Each tool should do one thing well
2. **Clear Parameters**: Use Zod schemas for type safety
3. **Helpful Responses**: Return meaningful, actionable information
4. **Error Handling**: Gracefully handle failures
5. **Privacy Conscious**: Respect user data and privacy

### Tool Template
```typescript
const newTool = tool({
  name: 'tool_name',
  description: 'Clear description of what this tool does',
  parameters: z.object({
    param1: z.string().describe('What this parameter is for'),
    param2: z.number().optional().describe('Optional parameter')
  }),
  async execute({ param1, param2 }) {
    try {
      // Tool implementation
      return 'Helpful response to user';
    } catch (error) {
      return 'Graceful error message';
    }
  }
});
```

## 🧠 Mental Health Considerations

### Guidelines for Wellness Features
- **Evidence-Based**: Use established therapeutic techniques
- **Non-Diagnostic**: Never provide medical diagnoses
- **Crisis Awareness**: Always include crisis resource information
- **Gentle Language**: Use compassionate, non-judgmental tone
- **Professional Boundaries**: Clearly state AI limitations
- **Resource Integration**: Link to professional help when appropriate

### Required Elements for Mental Health Tools
- Crisis resource access
- Clear disclaimers about AI limitations
- Encouragement to seek professional help
- Respectful handling of sensitive topics

## 🔍 Code Review Process

### What We Look For
- **Functionality**: Does the code work as intended?
- **Safety**: Are there any security or privacy concerns?
- **Mental Health Sensitivity**: Is the content appropriate and helpful?
- **Code Quality**: Is the code clean, readable, and maintainable?
- **User Experience**: Does this improve the user's interaction?
- **Documentation**: Are changes well-documented?

### Review Timeline
- We aim to review pull requests within 48 hours
- Complex changes may take longer
- We'll provide constructive feedback and suggestions

## 📋 Issue Templates

### Bug Report
- **Description**: What happened vs. what was expected
- **Steps to reproduce**: How to recreate the issue
- **Environment**: Browser, OS, Node version
- **Screenshots**: If applicable
- **Error messages**: Full error text

### Feature Request
- **Problem**: What need does this address?
- **Solution**: Your proposed approach
- **Alternatives**: Other solutions considered
- **Impact**: Who would benefit from this feature?

## 🚀 Release Process

### Versioning
We use [Semantic Versioning](https://semver.org/):
- **Major** (1.0.0): Breaking changes
- **Minor** (0.1.0): New features, backward compatible
- **Patch** (0.0.1): Bug fixes

### Release Cadence
- Patch releases: As needed for critical fixes
- Minor releases: Monthly feature updates
- Major releases: Quarterly significant updates

## ❓ Questions?

- **General Questions**: [Open a discussion](https://github.com/Fred-Edwin/ai-mental-health-companion/discussions)
- **Bug Reports**: [Create an issue](https://github.com/Fred-Edwin/ai-mental-health-companion/issues)
- **Feature Requests**: [Start a discussion](https://github.com/Fred-Edwin/ai-mental-health-companion/discussions)

## 🙏 Recognition

Contributors will be:
- Listed in our README contributors section
- Credited in release notes
- Given appropriate GitHub repository permissions
- Invited to contribute to project direction

---

**Thank you for helping make AI Companion a more compassionate and helpful tool for everyone! 💚**