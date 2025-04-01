"use client";

import "@/styles/globals.css";

import { useEffect, useState } from "react";
import SettingsButton from "@/components/SettingsButton";
import { calculateDailyAllowance, calculateRemainingAllowance } from "@/utils/calculations";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { AuroraText } from "@/components/magicui/aurora-text";

export default function Home() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [gbAvailable, setGbAvailable] = useState(0);
    const [renewalDate, setRenewalDate] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentDate(new Date());
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const available = window.localStorage.getItem("gbAvailable");
            if (available) {
                setGbAvailable(parseInt(available));
            } else {
                window.localStorage.setItem("gbAvailable", "40");
                setGbAvailable(40);
            }

            const renewal = window.localStorage.getItem("renewalDate");
            if (renewal) {
                setRenewalDate(parseInt(renewal));
            }
        }
    }, []);

    const updateAvailable = (method: string) => {
        if (method === "up") {
            setGbAvailable(gbAvailable + 1);
            window.localStorage.setItem("gbAvailable", (gbAvailable + 1).toString());
        } else {
            if (gbAvailable === 0) {
                return;
            }
            setGbAvailable(gbAvailable - 1);
            window.localStorage.setItem("gbAvailable", (gbAvailable - 1).toString());
        }
    };

    const dailyAllowance = calculateDailyAllowance({
        totalPlanSizeGB: gbAvailable,
        currentDate,
        renewalDate,
    });

    const remainingAllowance = calculateRemainingAllowance({
        totalPlanSizeGB: gbAvailable,
        currentDate,
        dailyAllowanceMB: dailyAllowance,
        renewalDate,
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <SettingsButton
                gbAvailable={gbAvailable}
                setGbAvailable={setGbAvailable}
                updateAvailable={updateAvailable}
                renewalDate={renewalDate}
                setRenewalDate={setRenewalDate}
            />
            <main className="flex flex-col items-center justify-center flex-1 w-full px-4 bg-white">
                <h1 className="flex flex-col text-6xl font-bold md:text-7xl ">
                    <div>
                        You should have{" "}
                        <NumberTicker
                            value={remainingAllowance}
                            className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black "
                        />{" "}
                        MB left with
                    </div>
                    <div>
                        <NumberTicker
                            value={dailyAllowance}
                            className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black "
                        />{" "}
                        MB available per day
                    </div>
                </h1>
            </main>
        </div>
    );
}
