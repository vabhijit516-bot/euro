// Test Script to verify model training status and 9-stage NLP chat endpoint

async function testPipeline() {
  console.log('Testing GET http://localhost:5000/api/model/status ...');
  const statusRes = await fetch('http://localhost:5000/api/model/status');
  const statusData = await statusRes.json();
  console.log('Model Status:', statusData.status, '| Accuracy:', statusData.metrics.accuracy);

  console.log('\nTesting POST http://localhost:5000/api/coach/chat with: "Can I start Deep Learning now?"');
  const chatRes = await fetch('http://localhost:5000/api/coach/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: 'Can I start Deep Learning now?' })
  });
  const chatData = await chatRes.json();
  console.log('Chat Response Success:', chatData.success);
  console.log('Detected Intent:', chatData.nlpTelemetry.intent);
  console.log('Confidence:', chatData.nlpTelemetry.confidencePercent + '%');
  console.log('Blockers Found:', chatData.nlpTelemetry.blockersCount);
  if (chatData.nlpTelemetry.blockers.length > 0) {
    console.log('Prerequisite Blocker:', chatData.nlpTelemetry.blockers[0].reason);
  }
  console.log('\n--- AI Message Snippet ---');
  console.log(chatData.message.content.substring(0, 350) + '...\n');
}

testPipeline().catch(console.error);
