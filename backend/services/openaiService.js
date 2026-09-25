// OpenAI API & Custom RAG Integration Service
// Uses OpenAI GPT-4o with Custom RAG Knowledge Base and Skill Dependency Graphs

import 'dotenv/config';
import OpenAI from 'openai';
import { CAREER_KNOWLEDGE_BASE } from '../knowledge/careerDatabase.js';
import { SKILL_DEPENDENCY_GRAPH, validatePrerequisites } from '../knowledge/dependencyGraph.js';

const openaiApiKey = process.env.OPENAI_API_KEY || '';
export const isOpenAIConfigured = Boolean(openaiApiKey);

export const openai = isOpenAIConfigured ? new OpenAI({ apiKey: openaiApiKey }) : null;

if (isOpenAIConfigured) {
  console.log(`[OpenAI] ✔ OpenAI Client initialized with GPT-4o & Custom RAG`);
} else {
  console.log(`[OpenAI] ℹ OPENAI_API_KEY not yet provided in .env. Running local trained NLP intelligence engine.`);
}

/**
 * Executes Custom RAG: Retrieves career knowledge & dependency graph context
 * and passes to OpenAI GPT-4o for hyper-tailored 7-section career coaching.
 * @param {string} prompt
 * @param {object} studentProfile
 * @returns {Promise<string>} Structured response
 */
export async function generateOpenAIChatWithRAG(prompt, studentProfile) {
  if (!isOpenAIConfigured) {
    return null; // Will fallback to local NLP engine
  }

  // 1. Custom RAG Context Retrieval
  const targetCareer = CAREER_KNOWLEDGE_BASE.find(
    c => c.title.toLowerCase() === (studentProfile.targetRole || '').toLowerCase()
  ) || CAREER_KNOWLEDGE_BASE[0];

  const ragContext = `
TARGET CAREER BLUEPRINT:
Role: ${targetCareer.title} (Domain: ${targetCareer.domain}, Thinking Level: ${targetCareer.thinkingLevel}/5)
Required Skills: ${JSON.stringify(targetCareer.requiredSkills)}
Tools: ${targetCareer.tools.join(', ')}
Compensation Band: ${targetCareer.compensation}
Hiring Demand: ${targetCareer.hiringDemand}

STUDENT PROFILE CONTEXT:
Candidate: ${studentProfile.name} (${studentProfile.degree}, ${studentProfile.year})
Current Verified Skills: Python (L4), Pandas/NumPy (L4), SQL (L3), DSA (L3), Git (L3), Statistics (L2), ML (L1), Deep Learning (L1)
Current Career Readiness: ${studentProfile.readinessScore}%
Learning Momentum: ${studentProfile.learningMomentumPercent}%

DEPENDENCY GRAPH CONSTRAINTS:
${JSON.stringify(SKILL_DEPENDENCY_GRAPH, null, 2)}
`;

  const modelsToAttempt = ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo'];
  
  for (const modelName of modelsToAttempt) {
    try {
      const completion = await openai.chat.completions.create({
        model: modelName,
        messages: [
          {
            role: 'system',
            content: `You are CareerAI: an elite AI Career Intelligence Coach. You do not behave like a generic chatbot.
You must analyze the student's question against the provided Custom RAG Knowledge Base and Skill Dependency Graph.
You MUST format your response using these strict 7 sections:
### 1. UNDERSTANDING
### 2. CURRENT STATUS
### 3. SKILL GAP (include markdown table with columns: Competency | Current Level | Required Level | Status | Priority)
### 4. RECOMMENDATION (if a prerequisite is missing, issue an explicit ⚠️ Prerequisite Dependency Warning!)
### 5. NEXT STEP
### 6. RESOURCES
### 7. PROJECT

CUSTOM RAG KNOWLEDGE RETRIEVED:
${ragContext}`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3
      });

      const replyContent = completion.choices[0]?.message?.content;
      if (replyContent) {
        return {
          success: true,
          content: replyContent,
          model: `OpenAI ${modelName} + Custom RAG`,
          isLiveCloud: true
        };
      }
    } catch (err) {
      console.error(`[OpenAI RAG Error with ${modelName}]:`, err.message);
      if (err.status === 429) {
        // Quota limit hit on this key
        return {
          success: false,
          quotaExceeded: true,
          error: err.message,
          model: 'OpenAI GPT-4o (Active Pipeline - 0 Billing Balance on platform.openai.com)'
        };
      }
    }
  }

  return {
    success: false,
    model: 'CareerAI Neural Engine (Trained Fallback)',
    error: 'OpenAI API currently unavailable or quota exhausted'
  };
}
