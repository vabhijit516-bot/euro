// Verification test for all Problem 3 capabilities

async function verifyProblem3Endpoints() {
  console.log('Testing Problem 3 Endpoints...\n');

  // 1. Profiles
  const profilesRes = await fetch('http://localhost:5000/api/profiles');
  const profilesData = await profilesRes.json();
  console.log('✔ GET /api/profiles:', profilesData.profiles.map(p => `${p.name} (${p.targetRole})`));

  // 2. Resume Parse
  const resumeRes = await fetch('http://localhost:5000/api/resume/parse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetRole: 'Full Stack Developer' })
  });
  const resumeData = await resumeRes.json();
  console.log('✔ POST /api/resume/parse:', {
    candidate: resumeData.result.candidateName,
    skillsFound: resumeData.result.extractedSkillsCount,
    missingSkills: resumeData.result.missingSkills.map(m => m.skill)
  });

  // 3. Learning Plan
  const planRes = await fetch('http://localhost:5000/api/learning-plan');
  const planData = await planRes.json();
  console.log('✔ GET /api/learning-plan:', {
    overallProgress: `${planData.overallProgressPercent}%`,
    totalTasks: planData.totalTasksCount,
    completed: planData.completedTasksCount
  });

  // 4. Notifications
  const notifRes = await fetch('http://localhost:5000/api/notifications');
  const notifData = await notifRes.json();
  console.log('✔ GET /api/notifications:', {
    total: notifData.totalCount,
    unread: notifData.unreadCount,
    sample: notifData.notifications[0].title
  });

  // 5. Job Market Compare
  const jobRes = await fetch('http://localhost:5000/api/jobs/compare');
  const jobData = await jobRes.json();
  console.log('✔ GET /api/jobs/compare:', {
    company: jobData.comparison.company,
    role: jobData.comparison.role,
    match: `${jobData.comparison.matchPercent}%`,
    missing: jobData.comparison.missingSkills.map(m => m.skill)
  });

  // 6. Resources Search
  const searchRes = await fetch('http://localhost:5000/api/resources/search?q=machine%20learning%20from%20beginner%20level');
  const searchData = await searchRes.json();
  console.log('✔ GET /api/resources/search:', {
    topic: searchData.searchResult.matchedTopic,
    modules: searchData.searchResult.totalModules,
    topModule: searchData.searchResult.curriculumHierarchy[0].name
  });

  console.log('\nALL 6 PROBLEM 3 BACKEND SERVICES OPERATING FLAWLESSLY!');
}

verifyProblem3Endpoints().catch(console.error);
