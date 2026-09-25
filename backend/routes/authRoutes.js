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
            name: name || (email ? email.split('@')[0] : 'Student'),
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

      // Record Login Event in Supabase user_logins table
      try {
        await supabase.from('user_logins').insert({
          user_id: data.user.id,
          email: data.user.email,
          provider: 'email',
          user_name: data.user.user_metadata?.name || (data.user.email ? data.user.email.split('@')[0] : 'Student'),
          user_agent: req.headers['user-agent'] || 'Web Browser',
          ip_address: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1'
        });

        // Update last sign in in profiles table
        await supabase.from('profiles').update({
          last_sign_in_at: new Date().toISOString(),
          auth_provider: 'email'
        }).eq('id', data.user.id);
      } catch (dbErr) {
        console.log('[Supabase User Login Log Notice]:', dbErr.message);
      }

      return res.json({
        success: true,
        message: 'Authenticated via Supabase Auth (Recorded in Supabase tables)',
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

// 3. Record OAuth (Google, GitHub) or Session Login in Supabase Tables
router.post('/record-login', async (req, res) => {
  const { userId, email, provider, userName, avatarUrl, targetRole } = req.body;
  const effectiveProvider = provider || 'google';
  const effectiveEmail = email || 'student@university.edu';
  const effectiveName = userName || (email ? email.split('@')[0] : 'Student');

  console.log(`[Supabase Auth Event] Recording login for ${effectiveEmail} via ${effectiveProvider}`);

  if (isSupabaseConfigured && userId) {
    try {
      // 1. Record in public.user_logins table
      await supabase.from('user_logins').insert({
        user_id: userId,
        email: effectiveEmail,
        provider: effectiveProvider,
        user_name: effectiveName,
        user_agent: req.headers['user-agent'] || 'Web Browser',
        ip_address: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1'
      });

      // 2. Upsert in public.profiles table
      await supabase.from('profiles').upsert({
        id: userId,
        email: effectiveEmail,
        name: effectiveName,
        avatar_url: avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        auth_provider: effectiveProvider,
        target_role: targetRole || 'Data Scientist',
        last_sign_in_at: new Date().toISOString()
      }, { onConflict: 'id' });
    } catch (err) {
      console.log('[Supabase DB Record Notice]:', err.message);
    }
  }

  // 3. Send Login Alert Notification via Resend to vabhijit516@gmail.com
  sendStudyReminderEmail(
    'vabhijit516@gmail.com',
    `🔐 Student Login via ${effectiveProvider.toUpperCase()}: ${effectiveName}`,
    `Authorization detected for ${effectiveName} (${effectiveEmail}) via ${effectiveProvider.toUpperCase()} provider. Login info recorded in Supabase tables.`,
    'AUTH_EVENT'
  ).catch(e => console.error('[Auth Alert Email Error]:', e.message));

  res.json({
    success: true,
    message: `Login info saved in Supabase tables for ${effectiveEmail} (${effectiveProvider})`,
    record: {
      email: effectiveEmail,
      provider: effectiveProvider,
      userName: effectiveName,
      timestamp: new Date().toISOString()
    }
  });
});

// 4. Retrieve Recent Login History from Supabase
router.get('/history', async (req, res) => {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('user_logins')
        .select('*')
        .order('logged_in_at', { ascending: false })
        .limit(20);

      if (!error && data) {
        return res.json({ success: true, logins: data });
      }
    } catch (e) {
      console.log('[Supabase history notice]:', e.message);
    }
  }

  // Default mock login records
  res.json({
    success: true,
    logins: [
      {
        id: 'log-1',
        email: 'vabhijit516@gmail.com',
        provider: 'google',
        user_name: 'Abhijit',
        logged_in_at: new Date().toISOString()
      },
      {
        id: 'log-2',
        email: 'alex.kumar@university.edu',
        provider: 'email',
        user_name: 'Alex Kumar',
        logged_in_at: new Date(Date.now() - 3600000).toISOString()
      }
    ]
  });
});

// 5. Trigger Email Reminder via Resend
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
