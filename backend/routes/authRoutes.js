// Supabase Authentication & Database Integration Routes
// Implements Signup, Login, Session Verification, and Resend Email Triggers

import express from 'express';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { sendStudyReminderEmail } from '../services/resendService.js';

const router = express.Router();

// 1. Sign Up
router.post('/signup', async (req, res) => {
  const { email, password, name, degree, targetRole } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || split_part(email, '@', 1),
            degree: degree || 'B.Tech in Computer Science',
            targetRole: targetRole || 'Data Scientist'
          }
        }
      });

      if (error) throw error;

      // Send Welcome / Reminder Email via Resend
      await sendStudyReminderEmail(
        email,
        'Welcome to CareerAI!',
        `Your personalized career intelligence account is ready. Your target role is set to ${targetRole || 'Data Scientist'}.`,
        'WELCOME'
      );

      return res.json({
        success: true,
        message: 'Account created successfully in Supabase',
        user: data.user,
        session: data.session
      });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  // In-Memory Fallback if Supabase keys pending
  res.json({
    success: true,
    simulated: true,
    message: 'Simulated Signup Successful (Configure SUPABASE_URL & SUPABASE_ANON_KEY in .env for live cloud DB)',
    user: {
      id: `usr_${Date.now()}`,
      email,
      name: name || 'Student',
      targetRole: targetRole || 'Data Scientist'
    }
  });
});

// 2. Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      return res.json({
        success: true,
        message: 'Authenticated via Supabase Auth',
        user: data.user,
        session: data.session
      });
    } catch (err) {
      return res.status(401).json({ success: false, message: err.message });
    }
  }

  // In-Memory Fallback
  res.json({
    success: true,
    simulated: true,
    message: 'Simulated Login Successful',
    user: {
      id: 'usr_ak9941',
      email,
      name: 'Alex Kumar',
      targetRole: 'Data Scientist'
    }
  });
});

// 3. Trigger Email Reminder via Resend
router.post('/send-email-reminder', async (req, res) => {
  const { email, title, message, type } = req.body;
  const targetEmail = email || 'student@university.edu';
  const result = await sendStudyReminderEmail(
    targetEmail,
    title || 'Daily Study Session Reminder',
    message || 'You planned to complete "Python Pandas Basics & Vectorized Ops" today.',
    type || 'REMINDER'
  );

  res.json(result);
});

export default router;
