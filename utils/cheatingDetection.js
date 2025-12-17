import { supabase } from './supabase';

let copyPasteDetected = false;
let tabSwitchCount = 0;
let tabSwitchTimes = [];
let suspiciousPatterns = [];

// Track copy/paste events
export const trackCopyPaste = () => {
    document.addEventListener('copy', (e) => {
        copyPasteDetected = true;
        const selection = window.getSelection().toString();
        if (selection.length > 50) { // Only flag significant copy-paste
            logCheatingFlag('copy_paste', {
                text_length: selection.length,
                timestamp: new Date().toISOString()
            });
        }
    });

    document.addEventListener('paste', (e) => {
        if (copyPasteDetected) {
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            if (pastedText.length > 50) {
                logCheatingFlag('copy_paste', {
                    pasted_length: pastedText.length,
                    timestamp: new Date().toISOString()
            });
            }
        }
    });
};

// Track tab switches (focus/blur events)
export const trackTabSwitches = () => {
    let lastFocusTime = Date.now();
    
    window.addEventListener('blur', () => {
        lastFocusTime = Date.now();
    });

    window.addEventListener('focus', () => {
        const timeAway = Date.now() - lastFocusTime;
        if (timeAway > 2000) { // More than 2 seconds away
            tabSwitchCount++;
            tabSwitchTimes.push({
                timestamp: new Date().toISOString(),
                duration: timeAway
            });

            // Flag if multiple rapid tab switches
            if (tabSwitchCount >= 3) {
                logCheatingFlag('tab_switch', {
                    count: tabSwitchCount,
                    switches: tabSwitchTimes.slice(-5), // Last 5 switches
                    timestamp: new Date().toISOString()
                });
            }
        }
    });
};

// Track suspicious timing patterns (e.g., answering too quickly)
export const trackSuspiciousTiming = (activityType, questionId, timeSpent) => {
    // Flag if answering complex questions too quickly
    if (activityType === 'academic' && timeSpent < 5000) { // Less than 5 seconds
        logCheatingFlag('suspicious_timing', {
            activity_type: activityType,
            question_id: questionId,
            time_spent_ms: timeSpent,
            timestamp: new Date().toISOString()
        }, 'low');
    }
};

// Log cheating flag to database
const logCheatingFlag = async (flagType, details, severity = 'low') => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Get current course/week from context (you'll need to pass this)
        // For now, we'll store it without course/week context
        // This should be called with course/week info from the activity component

        await supabase
            .from('cheating_flags')
            .insert({
                user_id: user.id,
                flag_type: flagType,
                details: details,
                severity: severity
            });
    } catch (error) {
        console.error('Error logging cheating flag:', error);
    }
};

// Log flag with course/week context (call this from activity components)
export const logCheatingFlagWithContext = async (courseId, week, activityType, flagType, details, severity = 'low') => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        await supabase
            .from('cheating_flags')
            .insert({
                user_id: user.id,
                course_id: courseId,
                week: week,
                activity_type: activityType,
                flag_type: flagType,
                details: details,
                severity: severity
            });
    } catch (error) {
        console.error('Error logging cheating flag:', error);
    }
};

// Initialize tracking
if (typeof window !== 'undefined') {
    trackCopyPaste();
    trackTabSwitches();
}



