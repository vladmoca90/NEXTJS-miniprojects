"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// https://everythingcs.dev/blog/nextjs-set-get-delete-cookies-server-routes-app-router/#server-components

// https://posthog.com/tutorials/react-cookie-banner 

// router.push() - adds a new entry to the browser's history stack.
// router.back() - navigates back to the previous route in the browser's history stack.
// router.forward() - navigates forward to the next page in the browser's history stack.

export default function ClientPageComponent() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter(); // hook that allows you to programmatically change routes inside Client Components.

    const setTestCookie = async () => {
        Cookies.set("name", "clickBtn", {
            expires: 60*60*24*30, // expires in 30 days.
        });

        router.refresh(); // Refreshes the current route. 
    };                   // Make a new request to the server, re-fetches data after re-rendering the Server Components.

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
                <Link href="" onClick={setTestCookie} className="bg-blue-600 rounded-md px-9 py-2 text-white">Set Cookie</Link>
            </div>
        </main>
    );
}