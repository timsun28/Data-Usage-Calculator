"use client";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer";
import { Settings } from "lucide-react";
import SettingsWrapper from "./SettingsWrapper";

interface SettingsButtonProps {
    gbAvailable: number;
    setGbAvailable: (gbAvailable: number) => void;
    updateAvailable: (method: string) => void;
    renewalDate?: number;
    setRenewalDate: (renewalDate?: number) => void;
    displayMode: "remaining" | "used";
    setDisplayMode: (mode: "remaining" | "used") => void;
    isPrettyMode: boolean;
    setIsPrettyMode: (isPrettyMode: boolean) => void;
}

export default function SettingsButton({
    gbAvailable,
    setGbAvailable,
    updateAvailable,
    renewalDate,
    setRenewalDate,
    displayMode,
    setDisplayMode,
    isPrettyMode,
    setIsPrettyMode,
}: SettingsButtonProps) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="fixed top-6 right-6 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 shadow-lg hover:bg-white/90 transition-all duration-300 hover:scale-110 hover:shadow-xl rounded-full"
                >
                    <Settings className="h-5 w-5 text-gray-600" />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Settings</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <SettingsWrapper
                            gbAvailable={gbAvailable}
                            setGbAvailable={setGbAvailable}
                            updateAvailable={updateAvailable}
                            renewalDate={renewalDate}
                            setRenewalDate={setRenewalDate}
                            displayMode={displayMode}
                            setDisplayMode={setDisplayMode}
                            isPrettyMode={isPrettyMode}
                            setIsPrettyMode={setIsPrettyMode}
                        />
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
