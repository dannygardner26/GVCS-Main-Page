// School day calculation utilities
// School year starts Tuesday after Labor Day 2025

export const SCHOOL_START_DATE = new Date('2025-09-02T00:00:00');

export const getSchoolDayNumber = (date) => {
    let count = 0;
    let current = new Date(SCHOOL_START_DATE);
    const target = new Date(date);

    current.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    if (target < current) return 0;

    while (current <= target) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) {
            count++;
        }
        current.setDate(current.getDate() + 1);
    }
    return count;
};

export const getDateFromSchoolDay = (dayNumber) => {
    let count = 0;
    let current = new Date(SCHOOL_START_DATE);

    while (count < dayNumber) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) {
            count++;
        }
        if (count < dayNumber) {
            current.setDate(current.getDate() + 1);
        }
    }
    return current;
};
