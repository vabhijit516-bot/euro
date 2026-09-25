// NLP Intent Detection Engine (Trained Machine Learning Model + N-Gram TF-IDF Classifier)
// Supports all 16 Career Intelligence intents with calibrated probabilities and fallback rules

import { INTENTS } from './intents.js';
import { modelTrainerInstance } from './modelTrainer.js';

export { INTENTS };

// Ensure model weights are loaded on boot
let modelLoaded = modelTrainerInstance.loadModel();
if (!modelLoaded) {
  modelTrainerInstance.train();
}

const HEURISTIC_KEYWORDS = [
  { intent: INTENTS.FOLLOW_UP_QUERY, keywords: ['after that', 'what next', 'start with', 'what first', 'then what', 'and then', 'after this', 'what should i learn next', 'can i start'] },
  { intent: INTENTS.CAREER_COMPARISON, keywords: [' or ', ' vs ', 'versus', 'compare', 'difference between', 'should i choose'] },
  { intent: INTENTS.RESUME_ANALYSIS, keywords: ['resume', 'cv', 'ats', 'bullet point', 'google xyz', 'profile review'] },
  { intent: INTENTS.SKILL_ASSESSMENT, keywords: ['test my', 'quiz', 'evaluate my skill', 'assessment', 'test me', 'diagnostic'] },
  { intent: INTENTS.JOB_PREPARATION, keywords: ['prepare for interview', 'interview', 'mock interview', 'faang', 'system design mock', 'coding round', 'salary negotiation', 'negotiate'] },
  { intent: INTENTS.CERTIFICATION_ADVICE, keywords: ['certification', 'certificate', 'certified', 'aws cert', 'gcp cert', 'which cert'] },
  { intent: INTENTS.PROJECT_RECOMMENDATION, keywords: ['project', 'portfolio', 'capstone', 'github repo', 'build a', 'hands-on project'] },
  { intent: INTENTS.LEARNING_PLAN, keywords: ['30-day', '3 month', 'sprint plan', 'schedule', 'curriculum', 'study plan', 'learning plan'] },
  { intent: INTENTS.RESOURCE_SEARCH, keywords: ['where can i learn', 'resource', 'course', 'tutorial', 'book', 'documentation', 'where to study'] },
  { intent: INTENTS.CAREER_READINESS, keywords: ['am i ready', 'readiness', 'job ready', 'can i apply', 'ready for a job', 'readiness score'] },
  { intent: INTENTS.SKILL_GAP, keywords: ['missing', 'gap', 'deficit', 'what do i lack', 'what am i missing', 'weakness', 'bottleneck'] },
  { intent: INTENTS.PROGRESS_UPDATE, keywords: ['progress', 'how much have i completed', 'my velocity', 'hours logged', 'where do i stand', 'milestone gate'] },
  { intent: INTENTS.CAREER_ROADMAP, keywords: ['how do i become', 'how to become', 'roadmap', 'pathway', 'path to', 'step by step'] },
  { intent: INTENTS.SKILL_REQUIREMENT, keywords: ['what skills does', 'skills needed for', 'skills required', 'what do i need to know for', 'requirements for'] },
  { intent: INTENTS.CAREER_DISCOVERY, keywords: ['what career can i choose', 'which career', 'what job fits', 'what should i become', 'recommend a career', 'discover'] },
  { intent: INTENTS.GENERAL_CAREER_QUESTION, keywords: ['what does a', 'responsibilities of', 'day in the life', 'salary of', 'market demand for', 'outlook'] }
];

/**
 * Classifies prompt intent using Ensemble NLP (Trained Naive Bayes + N-Gram TF-IDF with Heuristic Boost)
 * @param {string} prompt
 * @returns {{ intent: string, confidence: number, method: string, distribution: object }}
 */
export function classifyIntent(prompt = '') {
  const text = prompt.toLowerCase().trim();

  // 1. Run inference through the trained Machine Learning Model
  const mlResult = modelTrainerInstance.classifyInternal(prompt);

  // 2. Run Heuristic pattern verification for high-precision edge cases
  let ruleMatch = null;
  for (const item of HEURISTIC_KEYWORDS) {
    for (const kw of item.keywords) {
      if (text.includes(kw)) {
        ruleMatch = { intent: item.intent, matchedKeyword: kw };
        break;
      }
    }
    if (ruleMatch) break;
  }

  // 3. Ensemble Decision: If rule matches, boost confidence
  if (ruleMatch) {
    if (ruleMatch.intent === mlResult.intent) {
      return {
        intent: mlResult.intent,
        confidence: Math.min(0.99, Number((mlResult.confidence * 1.08).toFixed(3))),
        method: 'Ensemble (Trained ML + Pattern Match)',
        matchedKeyword: ruleMatch.matchedKeyword,
        distribution: mlResult.distribution
      };
    } else {
      // Prioritize strong deterministic keywords (e.g. "vs", "mock interview", "resume")
      return {
        intent: ruleMatch.intent,
        confidence: 0.95,
        method: 'Heuristic Pattern Override',
        matchedKeyword: ruleMatch.matchedKeyword,
        distribution: mlResult.distribution
      };
    }
  }

  // Return trained model's raw probability
  return {
    intent: mlResult.intent,
    confidence: mlResult.confidence,
    method: 'Trained Naive Bayes + TF-IDF',
    distribution: mlResult.distribution
  };
}
