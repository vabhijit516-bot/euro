async function test() {
  const profileRes = await fetch('http://localhost:5000/api/profile');
  const profile = await profileRes.json();
  console.log('1. Profile Endpoint:', profile.success ? `OK (${profile.profile.name} - ${profile.profile.targetRole} - Readiness: ${profile.profile.readinessScore}%)` : 'FAIL');

  const overviewRes = await fetch('http://localhost:5000/api/overview');
  const overview = await overviewRes.json();
  console.log('2. Overview Endpoint:', overview.success ? `OK (${overview.radar.length} radar dimensions, ${overview.roadmap.length} roadmap nodes)` : 'FAIL');

  const careersRes = await fetch('http://localhost:5000/api/careers');
  const careers = await careersRes.json();
  console.log('3. Careers Endpoint:', careers.success ? `OK (${careers.total} careers found)` : 'FAIL');

  const coursesRes = await fetch('http://localhost:5000/api/courses');
  const courses = await coursesRes.json();
  console.log('4. Courses Endpoint:', courses.success ? `OK (${courses.total} courses found)` : 'FAIL');

  const chatRes = await fetch('http://localhost:5000/api/coach/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: 'How do I crack the FAANG ML system design round?' })
  });
  const chat = await chatRes.json();
  console.log('5. AI Coach Chat Endpoint:', chat.success ? `OK (Response: ${chat.message.content.substring(0, 40)}...)` : 'FAIL');

  const viteRes = await fetch('http://localhost:5173/');
  console.log('6. Frontend Vite Server:', viteRes.status === 200 ? 'OK (200 - React App Running)' : 'FAIL');
}

test().catch(console.error);
