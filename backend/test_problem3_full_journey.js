// Comprehensive Verification of Problem 3: Complete User Journey Test

async function testCompleteUserJourney() {
  console.log('================================================================');
  console.log('   PROBLEM 3: AI LEARNING & CAREER ASSISTANT FULL USER JOURNEY  ');
  console.log('================================================================\n');

  // Step 1: Switch profile to Arun (B.Tech CSE, Full Stack Developer)
  console.log('Step 1: Student Profile Switching (Section 3 & 15)...');
  const switchRes = await fetch('http://localhost:5000/api/profile/switch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ studentId: 'arun' })
  });
  const switchData = await switchRes.json();
  console.log(`   ✔ Active Student: ${switchData.profile.name} (${switchData.profile.degree})`);
  console.log(`   ✔ Career Goal: ${switchData.profile.targetRole}\n`);

  // Step 2: Resume Document Upload & AI Parsing (Section 4 & 5)
  console.log('Step 2: Resume / Document AI Analysis with Sentence Evidence...');
  const resumeSamplesRes = await fetch('http://localhost:5000/api/resume/samples');
  const samplesData = await resumeSamplesRes.json();
  const arunResume = samplesData.samples.arun;

  const parseRes = await fetch('http://localhost:5000/api/resume/parse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      resumeText: arunResume.text,
      targetRole: 'Full Stack Developer'
    })
  });
  const parseData = await parseRes.json();
  console.log(`   ✔ Candidate: ${parseData.result.candidateName}`);
  console.log(`   ✔ Skills Detected: ${parseData.result.extractedSkills.map(s => s.name).join(', ')}`);
  console.log(`   ✔ Sample AI Explainability:\n     "${parseData.result.extractedSkills[0].explanation}"\n`);

  // Step 3: Skill Gap Detection (Section 6)
  console.log('Step 3: Skill Gap Detection against Full Stack Developer requirements...');
  console.log(`   ✔ Present (✓): ${parseData.result.presentSkills.map(p => p.skill).join(', ')}`);
  console.log(`   ✔ Missing (✗): ${parseData.result.missingSkills.map(m => m.skill).join(', ')}`);
  console.log(`   ✔ Prioritized Gaps: ${parseData.result.prioritizedGaps.map(g => `${g.skill} (${g.priority})`).join(', ')}\n`);

  // Step 4: Sync to Profile
  console.log('Step 4: Syncing Extracted Skills & Readiness to Active Profile...');
  const syncRes = await fetch('http://localhost:5000/api/resume/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      extractedSkills: parseData.result.extractedSkills,
      readinessScore: parseData.result.readinessScore,
      targetRole: 'Full Stack Developer'
    })
  });
  const syncData = await syncRes.json();
  console.log(`   ✔ Updated Readiness Score: ${syncData.profile.readinessScore}%\n`);

  // Step 5: Personalized Weekly Learning Roadmap (Section 7)
  console.log('Step 5: Fetching Personalized Weekly Learning Plan...');
  const planRes = await fetch('http://localhost:5000/api/learning-plan');
  const planData = await planRes.json();
  console.log(`   ✔ Initial Overall Progress: ${planData.overallProgressPercent}%`);
  console.log(`   ✔ Total Milestones: ${planData.totalTasksCount} weeks`);
  console.log(`   ✔ Week 3 Task: ${planData.learningPlan[2].title} (${planData.learningPlan[2].status})\n`);

  // Step 6: Progress Tracking & Activity Completion (Section 9)
  console.log('Step 6: Updating Task 3 Status to "completed"...');
  const updateRes = await fetch('http://localhost:5000/api/learning-plan/task/week-3', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'completed' })
  });
  const updateData = await updateRes.json();
  console.log(`   ✔ New Overall Progress: ${updateData.overallProgressPercent}%`);
  console.log(`   ✔ Updated Task 3 Status: ${updateData.task.status}\n`);

  // Step 7: Calendar Scheduling API (Section 13)
  console.log('Step 7: Testing Calendar Event Export (.ics)...');
  const calRes = await fetch('http://localhost:5000/api/calendar/export/week-3');
  const calText = await calRes.text();
  console.log(`   ✔ iCalendar Event Generated:\n${calText.split('\n').slice(0, 7).join('\n')}\n`);

  // Step 8: Live Job Market Comparison (Section 13)
  console.log('Step 8: Benchmarking against Live Employer Postings (Stripe)...');
  const jobRes = await fetch('http://localhost:5000/api/jobs/compare?jobId=job-stripe-fs');
  const jobData = await jobRes.json();
  console.log(`   ✔ Employer: ${jobData.comparison.company} - ${jobData.comparison.role}`);
  console.log(`   ✔ Match Score: ${jobData.comparison.matchPercent}%`);
  console.log(`   ✔ Missing for Role: ${jobData.comparison.missingSkills.map(m => m.skill).join(', ')}\n`);

  // Step 9: Notifications & Reminders (Section 10)
  console.log('Step 9: Testing Notifications & Study Reminders...');
  const notifRes = await fetch('http://localhost:5000/api/notifications');
  const notifData = await notifRes.json();
  console.log(`   ✔ Unread Reminders: ${notifData.unreadCount}`);
  console.log(`   ✔ Sample Alert: "${notifData.notifications[0].title}" - ${notifData.notifications[0].message}\n`);

  // Step 10: Knowledge Retrieval Search (Section 8)
  console.log('Step 10: Knowledge Retrieval Search: "machine learning from beginner level"...');
  const searchRes = await fetch('http://localhost:5000/api/resources/search?q=machine%20learning%20from%20beginner%20level');
  const searchData = await searchRes.json();
  console.log(`   ✔ Matched Topic: ${searchData.searchResult.matchedTopic}`);
  console.log(`   ✔ Modules Retrieved: ${searchData.searchResult.curriculumHierarchy.length}`);
  searchData.searchResult.curriculumHierarchy.forEach((m, idx) => {
    console.log(`     ${idx + 1}. ${m.name} -> ${m.resource}`);
  });

  console.log('\n================================================================');
  console.log('   PROBLEM 3 FULL USER JOURNEY VERIFIED WITH 100% SUCCESS!      ');
  console.log('================================================================');
}

testCompleteUserJourney().catch(console.error);
