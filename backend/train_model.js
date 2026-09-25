// Standalone Training Runner for CareerAI Model
// Executes full training loop across all corpora and persists weights.

import { modelTrainerInstance } from './nlp/modelTrainer.js';

console.log('===========================================================');
console.log('       CAREERAI NEURAL ENGINE - FULL MODEL TRAINING        ');
console.log('===========================================================');

const startTime = Date.now();
const metrics = modelTrainerInstance.train();
const elapsed = Date.now() - startTime;

console.log('\n--- TRAINING RESULTS ---');
console.log(`Model Name:        ${metrics.modelName}`);
console.log(`Training Samples:  ${metrics.trainingSamples}`);
console.log(`Intent Classes:    ${metrics.intentClasses}`);
console.log(`Vocabulary Size:   ${metrics.vocabularySize} N-Grams`);
console.log(`Model Accuracy:    ${(metrics.accuracy * 100).toFixed(2)}%`);
console.log(`Macro F1-Score:    ${(metrics.macroF1Score * 100).toFixed(2)}%`);
console.log(`Final Cross-Loss:  ${metrics.finalLoss}`);
console.log(`Total Epochs:      ${metrics.epochs}`);
console.log(`Training Time:     ${elapsed}ms`);
console.log('===========================================================');
console.log('Model artifact written to backend/nlp/trained_model.json');
