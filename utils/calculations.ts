/**
 * Calculates the daily data allowance in MB based on the total plan size and current date
 * @param totalPlanSizeGB - Total plan size in gigabytes
 * @param currentDate - Current date to calculate allowance for
 * @param renewalDate - Optional date of the month when subscription renews (1-31). If not provided, uses the last day of the current month.
 * @returns Daily allowance in MB
 */
export function calculateDailyAllowance({
    totalPlanSizeGB,
    currentDate,
    renewalDate,
}: {
    totalPlanSizeGB: number;
    currentDate: Date;
    renewalDate?: number;
}): number {
    // Convert GB to MB
    const totalPlanSizeMB = totalPlanSizeGB * 1000;

    if (renewalDate === undefined) {
        // When no renewal date is provided, use the total days in the current month
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        return Math.round(totalPlanSizeMB / lastDayOfMonth);
    }

    // Calculate the current period's renewal date and next period's renewal date
    let currentPeriodRenewal: Date;
    let nextPeriodRenewal: Date;

    if (currentDate.getDate() >= renewalDate) {
        // If we're past the renewal date, current period started this month
        currentPeriodRenewal = new Date(currentDate.getFullYear(), currentDate.getMonth(), renewalDate);
        nextPeriodRenewal = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, renewalDate);
    } else {
        // If we're before the renewal date, current period started last month
        currentPeriodRenewal = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, renewalDate);
        nextPeriodRenewal = new Date(currentDate.getFullYear(), currentDate.getMonth(), renewalDate);
    }

    // Calculate the total days in the billing period
    const totalDaysInPeriod = Math.round(
        (nextPeriodRenewal.getTime() - currentPeriodRenewal.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Calculate daily allowance in MB
    const dailyAllowanceMB = totalPlanSizeMB / totalDaysInPeriod;

    return Math.round(dailyAllowanceMB);
}

/**
 * Calculates the remaining data allowance in MB for the current period
 * @param totalPlanSizeGB - Total plan size in gigabytes
 * @param currentDate - Current date to calculate allowance for
 * @param dailyAllowanceMB - Daily allowance in MB
 * @param renewalDate - Optional date of the month when subscription renews (1-31). If not provided, uses the last day of the current month.
 * @returns Remaining data allowance in MB
 */
export function calculateRemainingAllowance({
    totalPlanSizeGB,
    currentDate,
    dailyAllowanceMB,
    renewalDate,
}: {
    totalPlanSizeGB: number;
    currentDate: Date;
    dailyAllowanceMB: number;
    renewalDate?: number;
}): number {
    // Calculate the start date of the current period
    let periodStartDate: Date;
    if (renewalDate === undefined) {
        // If no renewal date and it's the first day of the month, use the current date
        if (currentDate.getDate() === 1) {
            periodStartDate = currentDate;
        } else {
            // Otherwise use the first day of the current month
            periodStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        }
    } else {
        // If we're past the renewal date, period started this month
        if (currentDate.getDate() >= renewalDate) {
            periodStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), renewalDate);
        } else {
            // If we're before the renewal date, period started last month
            periodStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, renewalDate);
        }
    }

    // Calculate the number of days used in the current period (including current day)
    const daysUsed = Math.floor((currentDate.getTime() - periodStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    // Calculate remaining allowance in MB
    return Math.round(totalPlanSizeGB * 1000 - dailyAllowanceMB * daysUsed);
}
