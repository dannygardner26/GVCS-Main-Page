import { supabase } from './supabase';

let currentSessionId = null;
let sessionStartTime = null;
let inactivityTimer = null;
const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

// Start tracking a new session
export const startSession = async (pagePath = window.location.pathname) => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        sessionStartTime = Date.now();
        const sessionStart = new Date().toISOString();

        const { data, error } = await supabase
            .from('user_sessions')
            .insert({
                user_id: user.id,
                session_start: sessionStart,
                page_path: pagePath
            })
            .select()
            .single();

        if (error) {
            console.error('Error starting session:', error);
            return;
        }

        currentSessionId = data.id;
        setupInactivityTracking();
    } catch (error) {
        console.error('Error in startSession:', error);
    }
};

// End the current session
export const endSession = async () => {
    if (!currentSessionId || !sessionStartTime) return;

    try {
        const duration = Math.round((Date.now() - sessionStartTime) / 1000 / 60); // minutes

        await supabase
            .from('user_sessions')
            .update({
                session_end: new Date().toISOString(),
                duration_minutes: duration
            })
            .eq('id', currentSessionId);

        currentSessionId = null;
        sessionStartTime = null;
        clearInactivityTimer();
    } catch (error) {
        console.error('Error ending session:', error);
    }
};

// Update session on page navigation
export const updateSessionPage = async (pagePath) => {
    if (!currentSessionId) {
        await startSession(pagePath);
        return;
    }

    try {
        await supabase
            .from('user_sessions')
            .update({ page_path: pagePath })
            .eq('id', currentSessionId);
    } catch (error) {
        console.error('Error updating session page:', error);
    }
};

// Setup inactivity tracking
const setupInactivityTracking = () => {
    const handleActivity = () => {
        clearInactivityTimer();
        inactivityTimer = setTimeout(() => {
            endSession();
        }, INACTIVITY_TIMEOUT);
    };

    // Track various user activities
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, handleActivity, { passive: true });
    });

    // Track visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            endSession();
        } else {
            startSession();
        }
    });

    // Track page unload
    window.addEventListener('beforeunload', () => {
        endSession();
    });
};

const clearInactivityTimer = () => {
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
        inactivityTimer = null;
    }
};

// Initialize session tracking on page load
if (typeof window !== 'undefined') {
    startSession();
}

