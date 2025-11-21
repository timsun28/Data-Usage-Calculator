import React from "react";
import { NumberTicker } from "@/components/magicui/number-ticker";

interface PrettyViewProps {
    displayMode: "remaining" | "used";
    remainingAllowance: number;
    usedAllowance: number;
    dailyAllowance: number;
}

export default function PrettyView({
    displayMode,
    remainingAllowance,
    usedAllowance,
    dailyAllowance,
}: PrettyViewProps) {
    return (
        <main className="flex flex-col items-center justify-center flex-1 w-full px-2 md:px-4 text-center font-[family-name:var(--font-dancing)] text-[#8b4b6e] overflow-hidden">
            <div className="relative z-10 p-6 md:p-10 bg-white/40 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] border-4 border-white/60 shadow-[0_0_40px_rgba(255,182,193,0.6)] max-w-full mx-2">
                <h1 className="flex flex-col text-5xl md:text-8xl drop-shadow-sm">
                    <div className="flex flex-col mb-2 md:mb-4">
                        <span className="text-3xl md:text-5xl mb-1 md:mb-2">You</span>
                        <span className="italic text-6xl md:text-9xl font-bold text-[#d63384] drop-shadow-md">
                            {displayMode === "remaining" ? "should" : "could"}
                        </span>
                        <span className="text-3xl md:text-5xl mt-1 md:mt-2">{displayMode === "remaining" ? "have" : "have used"}</span>
                    </div>
                    <div className="my-4 md:my-6 flex flex-col items-center">
                        <div className="w-[280px] md:w-[500px] flex justify-center">
                            <NumberTicker
                                value={displayMode === "remaining" ? remainingAllowance : usedAllowance}
                                className="whitespace-pre-wrap text-7xl md:text-9xl font-bold tracking-wider text-[#d63384] drop-shadow-sm"
                            />
                        </div>
                        <span className="block text-2xl md:text-4xl mt-2">MB {displayMode === "remaining" ? "left with" : "already with"}</span>
                    </div>
                    <div className="mt-2 md:mt-4 flex flex-col items-center">
                         <div className="w-[200px] md:w-[400px] flex justify-center">
                            <NumberTicker
                                value={dailyAllowance}
                                className="whitespace-pre-wrap text-6xl md:text-8xl font-bold tracking-wider text-[#d63384] drop-shadow-sm"
                            />
                        </div>
                        <span className="block text-2xl md:text-4xl mt-2">MB available per day</span>
                    </div>
                </h1>
                <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 text-6xl md:text-8xl opacity-50 animate-bounce duration-[3000ms]">🌸</div>
                <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 text-6xl md:text-8xl opacity-50 animate-bounce duration-[4000ms]">✨</div>
                <div className="absolute top-1/2 -right-8 md:-right-16 text-4xl md:text-6xl opacity-40 animate-pulse">💖</div>
                <div className="absolute top-1/4 -left-6 md:-left-12 text-4xl md:text-6xl opacity-40 animate-pulse delay-700">🎀</div>
            </div>
        </main>
    );
}
