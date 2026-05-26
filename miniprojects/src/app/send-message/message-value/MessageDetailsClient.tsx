"use client";

import { useSearchParams } from "next/navigation";

export default function MessageDetailsClient() {
    const searchParams = useSearchParams();
    const message = searchParams.get("messageText");

    return (
        <div id="sentMessage" aria-live="polite">
            <p>{message || "No message provided."}</p>
        </div>
    );
}
