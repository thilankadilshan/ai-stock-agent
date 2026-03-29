# AI Stock Analysis Agent (MVP) 📈🤖

> **⚠️ STRICT COPYRIGHT & LICENSE NOTICE**
> This repository and its contents are the exclusive intellectual property of the author.
> This project is currently public for portfolio and demonstration purposes ONLY.
> **You are strictly PROHIBITED** from copying, forking, distributing, modifying, or using this code, idea, or architecture for commercial, personal, or educational projects without explicit written permission. All rights reserved.

## About The Project

This is a proprietary Proof of Concept (PoC) AI Quantitative Analysis Agent built specifically for the Colombo Stock Exchange (CSE). It utilizes Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG) principles to analyze historical market data, company financials, and news sentiment to provide data-driven insights.

## Tech Stack

- **Frontend:** Next.js (React), Tailwind CSS, Lucide Icons
- **Backend:** Next.js API Routes (Node.js environment)
- **AI Engine:** Google Gemini API
- **Deployment:** Vercel

## Core Features (MVP)

- Targeted analysis of a single CSE company.
- Ingestion of static `.csv` historical price data.
- Document reading capabilities for Annual/Quarterly reports (PDF).
- Sentiment analysis based on recent financial news context.
- Clean, intuitive chat-based user interface.

## Local Setup (Authorized Users Only)

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env.local` file in the root directory and add the required environment variables:
   \`GEMINI_API_KEY=your_google_ai_studio_key\`
4. Place target company `.csv` and `.pdf` files in the `data/` directory.
5. Run `npm run dev` to start the development server.
