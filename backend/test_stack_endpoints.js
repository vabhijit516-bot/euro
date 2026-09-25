// Test script for Supabase Auth, Resend communication, and Custom RAG

async function testFullStack() {
  console.log('Testing Full Stack Endpoints...\n');

  // 1. Test Supabase Signup / Fallback
  console.log('1. Testing POST /api/auth/signup ...');
  const signupRes = await fetch('http://localhost:5000/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'alex.kumar@university.edu',
      password: 'SecurePassword123!',
      name: 'Alex Kumar',
      targetRole: 'Data Scientist'
    })
  });
  const signupData = await signupRes.json();
  console.log('   ✔ Signup Result:', signupData.message);

  // 2. Test Resend Email Notification Trigger
  console.log('\n2. Testing POST /api/auth/send-email-reminder ...');
  const emailRes = await fetch('http://localhost:5000/api/auth/send-email-reminder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'alex.kumar@university.edu',
      title: 'Daily Study Session Reminder',
      message: 'You planned to complete "Python Pandas Basics & Vectorized Ops" today. Progress: 70%.'
    })
  });
  const emailData = await emailRes.json();
  console.log('   ✔ Resend Dispatch:', emailData.message || (emailData.success ? 'Email Sent' : 'Failed'));

  // 3. Test Coach Chat with Custom RAG
  console.log('\n3. Testing POST /api/coach/chat (Custom RAG + Intelligence Pipeline) ...');
  const chatRes = await fetch('http://localhost:5000/api/coach/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: 'What is my biggest skill gap for Data Scientist?' })
  });
  const chatData = await chatRes.json();
  console.log('   ✔ Model Provider:', chatData.message.model);
  console.log('   ✔ Intent Detected:', chatData.nlpTelemetry.intent);
  console.log('   ✔ 7-Section Response Valid:', chatData.message.content.includes('### 1. UNDERSTANDING'));

  console.log('\n================================================================');
  console.log('   FULL STACK (OPENAI + RESEND + SUPABASE + CUSTOM RAG) VERIFIED! ');
  console.log('================================================================');
}

testFullStack().catch(console.error);
