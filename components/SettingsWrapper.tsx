"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SettingsWrapperProps {
    gbAvailable: number;
    updateAvailable: (method: string) => void;
    setGbAvailable: (gbAvailable: number) => void;
    renewalDate?: number;
    setRenewalDate: (renewalDate?: number) => void;
    displayMode: "remaining" | "used";
    setDisplayMode: (mode: "remaining" | "used") => void;
    isPrettyMode: boolean;
    setIsPrettyMode: (isPrettyMode: boolean) => void;
}

export default function SettingsWrapper({
    gbAvailable,
    updateAvailable,
    setGbAvailable,
    renewalDate,
    setRenewalDate,
    displayMode,
    setDisplayMode,
    isPrettyMode,
    setIsPrettyMode,
}: SettingsWrapperProps) {
    const [useCustomRenewal, setUseCustomRenewal] = useState(!!renewalDate);
    const [inputValue, setInputValue] = useState(renewalDate?.toString() || "");

    useEffect(() => {
        if (!useCustomRenewal) {
            setRenewalDate(undefined);
            setInputValue("");
            window.localStorage.removeItem("renewalDate");
        } else if (!renewalDate) {
            setRenewalDate(20);
            setInputValue("20");
        }
    }, [useCustomRenewal]);

    function updateRenewalDate(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setInputValue(value);

        if (value === "") {
            setRenewalDate(undefined);
            window.localStorage.removeItem("renewalDate");
            return;
        }

        const updateDate = parseInt(value);
        if (isNaN(updateDate)) return;

        if (updateDate < 1) {
            setRenewalDate(1);
            setInputValue("1");
        } else if (updateDate > 31) {
            setRenewalDate(31);
            setInputValue("31");
        } else {
            setRenewalDate(updateDate);
        }
        window.localStorage.setItem("renewalDate", updateDate.toString());
    }

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <Label htmlFor="data" className="text-lg">
                        Data:
                    </Label>
                    <Input
                        id="data"
                        type="number"
                        value={gbAvailable}
                        className="w-24"
                        onChange={(e) => {
                            setGbAvailable(parseInt(e.target.value, 10));
                            window.localStorage.setItem("gbAvailable", e.target.value);
                        }}
                    />
                    <span className="text-lg">GB</span>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Switch id="custom-renewal" checked={useCustomRenewal} onCheckedChange={setUseCustomRenewal} />
                        <Label htmlFor="custom-renewal" className="text-lg">
                            Custom renewal day
                        </Label>
                    </div>
                    {useCustomRenewal && (
                        <Input
                            type="number"
                            value={inputValue}
                            className="w-24"
                            onChange={updateRenewalDate}
                            min={1}
                            max={31}
                        />
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="display-mode"
                            checked={displayMode === "used"}
                            onCheckedChange={(checked) => {
                                const newMode = checked ? "used" : "remaining";
                                setDisplayMode(newMode);
                                window.localStorage.setItem("displayMode", newMode);
                            }}
                        />
                        <Label htmlFor="display-mode" className="text-lg">
                            Show Used Amount
                        </Label>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="pretty-mode"
                            checked={isPrettyMode}
                            onCheckedChange={(checked) => {
                                setIsPrettyMode(checked);
                                window.localStorage.setItem("isPrettyMode", checked.toString());
                            }}
                        />
                        <Label htmlFor="pretty-mode" className="text-lg">
                            Pretty Mode 🌸
                        </Label>
                    </div>
                </div>
            </div>
        </div>
    );
}
