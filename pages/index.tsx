import Head from "next/head";
import { useEffect, useState } from "react";
import SettingsButton from "../components/SettingsButton";
import SettingsWrapper from "../components/SettingsWrapper";

export default function Home() {
    const [gbAvailable, setGbAvailable] = useState(0);
    const [startDate, setStartDate] = useState(1);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const available = window.localStorage.getItem("gbAvailable");
            if (available) {
                setGbAvailable(parseInt(available));
            } else {
                window.localStorage.setItem("gbAvailable", "40");
                setGbAvailable(40);
            }

            const start = window.localStorage.getItem("startDate");
			if (start) {
				setStartDate(parseInt(start));
			} else {
				window.localStorage.setItem("startDate", "1");
				setStartDate(1);
			}
        }
    }, []);

	

	

    const getRemainingData = () => {
        const today = new Date();
        const currentDate = today.getDate();
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        const mbAvailable = gbAvailable * 1000;
        const mbPerDay = mbAvailable / lastDayOfMonth;
        const mbLeft = Math.round(mbAvailable - mbPerDay * currentDate) || 0;
        function numberWithCommas(x: number) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        return numberWithCommas(mbLeft);
    };

    const getPerDayData = () => {
        const today = new Date();
        const mbAvailable = gbAvailable * 1000;
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        const mbPerDay = mbAvailable / lastDayOfMonth;
        return Math.round(mbPerDay);
    };

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
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Head>
                <title>Data Usage</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                />
            </Head>
            <SettingsButton />
            <SettingsWrapper
                gbAvailable={gbAvailable}
                setGbAvailable={setGbAvailable}
                updateAvailable={updateAvailable}
				startDate={startDate}
				setStartDate={setStartDate}
            />
            <main className="flex flex-col items-center justify-center w-full flex-1 px-4 bg-white dark:bg-gray-900">
                <h1 className="text-6xl md:text-7xl font-bold flex flex-col dark:text-white">
                    <div>
                        You should have <span className="text-gradient first text-8xl">{getRemainingData()}</span> MB
                        left with
                    </div>
                    <div>
                        <span className="text-gradient second text-8xl">{getPerDayData()}</span> MB available per day
                    </div>
                </h1>
            </main>
        </div>
    );
}
