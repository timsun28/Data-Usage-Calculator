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
}

export default function SettingsButton({
    gbAvailable,
    setGbAvailable,
    updateAvailable,
    renewalDate,
    setRenewalDate,
}: SettingsButtonProps) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline" size="icon" className="fixed top-4 right-4">
                    <Settings className="h-4 w-4" />
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
