# Security Policy

## 🔒 Responsible Disclosure

The AI Companion project takes security and privacy seriously, especially given our focus on mental health and wellness support. We appreciate the security community's efforts to improve our project's security.

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability, please follow these steps:

### For Critical Security Issues
**DO NOT** create a public GitHub issue. Instead:

1. **Email us directly**: Send details to `security@ai-companion-project.com`
2. **Include details**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)
3. **Allow response time**: We aim to respond within 48 hours

### For Non-Critical Issues
- Create a [private security advisory](https://github.com/yourusername/ai-companion/security/advisories/new)
- Follow the same reporting format as above

## 🛡️ Security Measures

### Data Protection
- **No Persistent Storage**: Voice conversations are not stored beyond the session
- **Local Data Only**: Mood tracking and personal data stored locally in browser
- **Ephemeral API Keys**: Temporary keys prevent long-term exposure
- **No Server Logging**: Personal conversations are not logged on our servers

### API Security
- **Secure Key Management**: Environment variables for sensitive data
- **Rate Limiting**: Protection against abuse and API key exhaustion
- **Input Validation**: Zod schemas validate all user inputs
- **Error Handling**: Generic error messages prevent information leakage

### Mental Health Considerations
- **Crisis Detection**: Immediate resource provision for mental health emergencies
- **Professional Boundaries**: Clear disclaimers about AI limitations
- **Resource Verification**: Crisis resources are verified and current
- **Safe Content**: Guardrails prevent harmful or inappropriate content

## 🔍 Vulnerability Types We're Concerned About

### High Priority
- **API Key Exposure**: OpenAI keys or other credentials in client-side code
- **Data Leakage**: Personal/health information exposed or transmitted insecurely  
- **Authentication Bypass**: Unauthorized access to admin functions
- **Code Injection**: XSS, SQL injection, or similar attacks
- **Mental Health Safety**: Content that could harm vulnerable users

### Medium Priority
- **Information Disclosure**: Non-personal system information exposure
- **Session Management**: Issues with user session handling
- **Input Validation**: Improper handling of user inputs
- **Dependencies**: Vulnerabilities in third-party packages

### Lower Priority
- **UI/UX Issues**: Non-security related interface problems
- **Performance**: Non-security related performance issues
- **Compatibility**: Browser or device compatibility issues

## ⚡ Response Timeline

| Severity | Response Time | Fix Timeline |
|----------|---------------|--------------|
| Critical | 24 hours | 48-72 hours |
| High | 48 hours | 1 week |
| Medium | 1 week | 2-4 weeks |
| Low | 2 weeks | Next release |

## 🎖️ Recognition

We believe in recognizing security researchers who help improve our project:

### Hall of Fame
Security researchers who responsibly disclose vulnerabilities will be:
- Listed in our security hall of fame (with permission)
- Credited in release notes
- Given appropriate acknowledgment in the repository

### Coordinated Disclosure
- We'll work with you to understand and fix the issue
- We'll coordinate public disclosure timing
- We'll provide updates throughout the process

## 📋 Security Best Practices for Users

### API Key Security
- **Never commit** API keys to public repositories
- **Use environment variables** for all sensitive configuration
- **Rotate keys regularly** as a security practice
- **Monitor usage** for unexpected API consumption

### Personal Data
- **Understand data storage**: Personal data stays in your browser
- **Clear data** when sharing devices (localStorage)
- **Use private browsing** for sensitive sessions
- **Be cautious** when screensharing during therapy sessions

### Mental Health Safety
- **Professional help**: This AI is not a replacement for professional therapy
- **Crisis situations**: Always contact emergency services or crisis hotlines
- **Privacy awareness**: Be mindful of who might see/hear your conversations
- **Boundaries**: Understand AI limitations and seek human support when needed

## 🔧 Security Development Practices

### Code Security
- **Dependency Scanning**: Regular updates and vulnerability checks
- **Static Analysis**: Code quality and security analysis
- **Input Sanitization**: All user inputs are validated and sanitized
- **Secure Headers**: Appropriate security headers on all responses

### Infrastructure Security
- **HTTPS Everywhere**: All communications encrypted in transit
- **Environment Isolation**: Separate development and production environments
- **Access Control**: Minimal necessary permissions
- **Audit Logging**: Security-relevant events are logged

## 📚 Security Resources

### For Developers
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/going-to-production#security)
- [React Security](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)

### For Users
- [OpenAI Privacy Policy](https://openai.com/privacy/)
- [Mental Health Digital Security](https://www.samhsa.gov/technology)
- [Crisis Text Line Privacy](https://www.crisistextline.org/privacy-policy/)

## 📞 Emergency Mental Health Resources

If you or someone you know is in immediate danger:
- **United States**: Call 911 or text HOME to 741741
- **Crisis Lifeline**: 988 (Suicide & Crisis Lifeline)
- **International**: Contact your local emergency services

## 📝 Updates to This Policy

This security policy may be updated periodically. Changes will be:
- Committed to this repository
- Announced in release notes
- Communicated to security researchers who have contacted us

---

**Last Updated**: January 2025

**Contact**: For security concerns, email `security@ai-companion-project.com`

Thank you for helping keep AI Companion safe and secure for everyone! 🙏