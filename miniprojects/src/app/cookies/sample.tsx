"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// https://everythingcs.dev/blog/nextjs-set-get-delete-cookies-server-routes-app-router/#server-components

// https://posthog.com/tutorials/react-cookie-banner 

export default function ClientPage() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();

    const setCookie = async () => {
        Cookies.set("name", "closeBanner", {
            expires: 2,
        });

        router.refresh();
    };

    if (!isMounted) {
        return null;
    }

    return (
        <main className="flex mx-3 flex-col items-center justify-center">
            <h1 className="my-5 text-center text-2xl font-bold">
                Getting and Setting Cookies in Next.js (Client Component)
            </h1>
            <div>
                <h2 className="mt-10 text-center text-3xl font-semibold">Set Cookie</h2>
                <button onClick={setCookie} className="bg-blue-600 rounded-md px-6 py-2  mt-5 text-white">Set Cookie</button>
            </div>
        </main>
    );
}