"use client";

import { useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { ThemeContext } from "@/providers/ThemeProvider";
import axios from "axios";

/**
 * ThemeSync is a background component that fetches user settings
 * from the database and updates the global theme context.
 */
export default function ThemeSync() {
    const { status } = useSession();
    const context = useContext(ThemeContext);

    useEffect(() => {
        if (status === "authenticated" && context) {
            const fetchUserSettings = async () => {
                try {
                    const { data } = await axios.get("/api/user");
                    if (data?.colorPalette) {
                        // Prevent infinite loop or unnecessary updates if already synced
                        if (context.palette !== data.colorPalette) {
                            context.setPalette(data.colorPalette);
                        }
                    }
                } catch (error) {
                    console.error("ThemeSync: Failed to fetch user settings", error);
                }
            };

            fetchUserSettings();
        }
    }, [status, context]); // Include context to satisfy exhaustive deps

    return null;
}
