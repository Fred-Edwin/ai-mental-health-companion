📄 Product Requirements Document (PRD)

Project: Browser-Based AI Companion
Author: Edwinfred Kamau
Version: 1.0
Date: 30 Aug 2025

1. 📌 Overview

The Browser-Based AI Companion is a web application that allows users to interact with an AI through real-time voice conversations. The AI companion can remember context during sessions, perform useful tasks through tools, and adapt its personality. The project demonstrates Next.js + OpenAI Agent SDK integration with WebRTC, conversation history, tool execution, and guardrails.

This project serves as a portfolio-ready showcase of AI engineering skills, combining frontend UI/UX, backend ephemeral key handling, and realtime AI interaction.

2. 🎯 Goals & Objectives

Deliver a browser-first AI companion with voice in/out.

Demonstrate RealtimeSession and RealtimeAgent usage.

Implement tools that extend AI capabilities (task list, weather).

Showcase guardrails for safe AI interactions.

Build a scalable, extensible architecture that can be enhanced with memory, personas, and multi-agent orchestration.

3. 🧑‍💻 User Stories
Core Stories

As a user, I want to speak to the AI companion via my microphone so I can interact naturally.

As a user, I want the AI to respond with a natural voice in real-time so the conversation feels fluid.

As a user, I want to see the conversation history in chat bubble format so I can review what was said.

As a user, I want the AI to perform actions like adding tasks or fetching weather so it’s actually useful.

As a user, I want safe interactions with the AI, where it avoids inappropriate responses.

Stretch Stories

As a user, I want to switch personalities (friendly/chatty, productivity coach, tutor) so the AI fits different contexts.

As a user, I want the AI to remember past sessions (memory) so it feels persistent.

As a user, I want the AI to ask for confirmation before taking actions so I have control.

4. 🔑 Features & Requirements
4.1 Core Features (MVP)

Realtime Voice Agent

Connect mic → AI via WebRTC

AI speaks back via browser audio

Conversation History

Transcribed user speech + AI responses in chat UI

Basic Tools

Task Manager Tool: “Add X to my tasks”

Weather Tool: “What’s the weather in Nairobi?”

Guardrails

Example: Filter out banned words (demo safety layer)

4.2 Stretch Features

Persistent memory (SQLite/Postgres/localStorage)

Multiple companion personas

Tool approval flow (accept/reject in UI)

Manual “Stop” button (interrupt AI response)

5. 🎨 UI/UX Design
Layout

Header: App name + settings button

Main Panel: Chat history (bubbles with timestamps)

Controls:

🎙️ Mic on/off button

⏹️ Stop button

📋 Task List sidebar

Optional: Persona selector dropdown

Example Chat Flow
You: “Add ‘Buy milk’ to my tasks.”  
AI: “Got it, I added ‘Buy milk’ to your task list.”  

Task List:  
- Buy milk

6. ⚙️ Technical Architecture
6.1 Frontend (Next.js Client)

Next.js App Router

TailwindCSS + ShadCN UI

Components:

ChatWindow.tsx

MicButton.tsx

TaskList.tsx

Uses @openai/agents-realtime for RealtimeSession

Handles mic permissions & audio output

Subscribes to history_updated and tool_approval_requested

6.2 Backend (Next.js API)

/api/auth/ephemeral

Issues ephemeral client key for Realtime API

/api/tools/

Server-side tools (e.g., weather fetch, database ops)

6.3 OpenAI Realtime API

Model: gpt-realtime (voice in/out)

Agents configured with:

Instructions (personality, role)

Tools (weather, tasks)

Guardrails

7. 📊 Data Flow

User speaks → Browser mic captures audio

Audio sent → OpenAI Realtime API (WebRTC)

AI response generated (voice + text)

Text → displayed in chat history

Voice → played in browser audio element

If tool needed → executed (client-side or server API)

Result returned → added to history & UI updated

8. 🛡️ Safety & Guardrails

Output guardrails to filter banned words/phrases.

Tool approval required for sensitive actions.

Interruptions supported via session.interrupt() and Stop button.

9. 📅 Development Plan (Milestones)

Phase 1 (Week 1–2):

Setup Next.js project + Tailwind + ShadCN

Implement ephemeral key API

Create Realtime voice session

Show chat history in UI

Phase 2 (Week 3):

Add Task Manager tool

Add Weather tool

Implement guardrail example

Phase 3 (Week 4):

Add persona selector

Add tool approval flow

Add stop/interrupt button

Phase 4 (Optional Showcase):

Persistent memory in DB

Journaling/summary mode

Multi-agent orchestration

10. ✅ Success Criteria

✅ User can hold fluid voice conversation with AI in browser.

✅ Conversation history displays correctly.

✅ At least two tools work (tasks, weather).

✅ Guardrails catch and block unsafe output.

✅ Deployable as a Next.js web app (Vercel/Netlify).