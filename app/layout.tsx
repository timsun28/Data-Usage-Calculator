import type { Metadata, Viewport } from "next";

import { Montserrat, Dancing_Script } from "next/font/google";

const APP_NAME = "Data Usage";
const APP_DEFAULT_TITLE = "Data Usage";
const APP_TITLE_TEMPLATE = "%s - Data Usage";
const APP_DESCRIPTION = "Data Usage Tracker for Mobile Data";

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
};

export const viewport: Viewport = {
    themeColor: "#FFFFFF",
};

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });
const dancingScript = Dancing_Script({ subsets: ["latin"], display: "swap", variable: "--font-dancing" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${montserrat.className} ${dancingScript.variable}`}>{children}</body>
        </html>
    );
}
