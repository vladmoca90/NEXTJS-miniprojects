"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientPageComponent() {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter(); // Hook to programmatically change routes inside Client Components.

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const setTestCookie = () => {
        Cookies.set("name", "clickBtn", {
            expires: 60 * 60 * 24 * 30, // Expires in 30 days.
        });

        router.refresh(); // Refreshes the current route.
    };

    if (!isMounted) {
        return null;
    }

    return (
        <main className="flex mx-3 flex-col items-center justify-center">
            <h1 className="my-10 text-center text-2xl font-bold">
                Getting and Setting Cookies in Next.js (Client Component)
            </h1>
            <div>
                <h2 className="mb-5 mt-3 text-center text-3xl font-semibold">Set Cookie</h2>
                <button 
                    onClick={setTestCookie} 
                    className="bg-blue-600 rounded-md px-9 py-2 text-white"
                >
                    Set Cookie
                </button>
            </div>
        </main>
    );
}
