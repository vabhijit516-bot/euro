// Notification and Reminder Service
// Implements Section 10 of Problem 3:
// Automated study reminders, upcoming milestones, prerequisite warnings, and course progression alerts.

export let NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'REMINDER',
    priority: 'HIGH',
    title: 'Daily Study Session Reminder',
    message: 'You planned to complete "Python Pandas Basics & Vectorized Ops" today.',
    progress: 70,
    actionText: 'Continue Learning',
    actionRoute: '/learning-path',
    timestamp: '15m ago',
    isRead: false
  },
  {
    id: 'notif-2',
    type: 'PREREQUISITE_ALERT',
    priority: 'HIGH',
    title: 'Prerequisite Dependency Warning',
    message: 'Deep Learning requires Level 3 Statistics & Probability. Complete Unit 2 first to avoid comprehension bottlenecks.',
    actionText: 'View Skill Graph',
    actionRoute: '/my-career',
    timestamp: '2h ago',
    isRead: false
  },
  {
    id: 'notif-3',
    type: 'PROJECT_DEADLINE',
    priority: 'MEDIUM',
    title: 'Portfolio Milestone Gate Approaching',
    message: 'Target completion for "Supervised ML Customer Churn Predictor" is set for Nov 05, 2024.',
    actionText: 'Inspect Blueprint',
    actionRoute: '/learning-path',
    timestamp: '1d ago',
    isRead: false
  },
  {
    id: 'notif-4',
    type: 'RESUME_UPDATE',
    priority: 'LOW',
    title: 'Resume ATS Alignment Insight',
    message: 'You recently validated Relational SQL! Upload an updated resume to sync your new verified credentials.',
    actionText: 'Open Resume Studio',
    actionRoute: '/resume',
    timestamp: '2d ago',
    isRead: true
  }
];

export function getNotifications() {
  const unreadCount = NOTIFICATIONS.filter(n => !n.isRead).length;
  return {
    notifications: NOTIFICATIONS,
    unreadCount,
    totalCount: NOTIFICATIONS.length
  };
}

export function markNotificationAsRead(id) {
  const notif = NOTIFICATIONS.find(n => n.id === id);
  if (notif) {
    notif.isRead = true;
  }
  return getNotifications();
}

export function addNotification(newNotif) {
  const notif = {
    id: `notif-${Date.now()}`,
    timestamp: 'Just now',
    isRead: false,
    ...newNotif
  };
  NOTIFICATIONS.unshift(notif);
  return getNotifications();
}
