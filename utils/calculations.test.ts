import "@testing-library/jest-dom";
import { calculateDailyAllowance, calculateRemainingAllowance } from "./calculations";

describe("calculateDailyAllowance", () => {
    it("should calculate correct daily allowance for 31GB plan in 31-day month", () => {
        const result = calculateDailyAllowance({
            totalPlanSizeGB: 31,
            currentDate: new Date("2024-01-15"),
            renewalDate: 1,
        });
        expect(result).toBe(1000); // 31GB / 31 days = 1GB per day = 1000MB per day
    });

    it("should calculate correct daily allowance for 31GB plan in 28-day month", () => {
        const result = calculateDailyAllowance({
            totalPlanSizeGB: 31,
            currentDate: new Date("2024-02-15"),
            renewalDate: 1,
        });
        expect(result).toBe(1069); // 31GB / 30 days ≈ 1.033GB per day = 1033MB per day
    });
    it("should calculate correct daily allowance for 31GB plan in 30-day month", () => {
        const result = calculateDailyAllowance({
            totalPlanSizeGB: 31,
            currentDate: new Date("2024-04-15"),
            renewalDate: 1,
        });
        expect(result).toBe(1033); // 31GB / 30 days ≈ 1.033GB per day = 1033MB per day
    });
});

describe("calculateRemainingAllowance", () => {
    it("should calculate correct remaining allowance for 31GB plan in 31-day month", () => {
        const dailyAllowance = calculateDailyAllowance({
            totalPlanSizeGB: 40,
            currentDate: new Date("2025-04-01"),
        });
        expect(dailyAllowance).toBe(1333);
        const result = calculateRemainingAllowance({
            totalPlanSizeGB: 40,
            currentDate: new Date("2025-04-01"),
            dailyAllowanceMB: dailyAllowance,
        });
        expect(result).toBe(38667);
    });
});
