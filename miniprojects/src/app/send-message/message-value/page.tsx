"use client";

interface MessageDetailsProps {
    searchParams: {
        messageText?: string; // Make it optional
    };
}

export default function MessageDetails({ searchParams }: MessageDetailsProps) {
    return (
        <div id="sentMessage" aria-live="polite">
            <p>{searchParams.messageText || "No message provided."}</p> {/* Fallback message */}
        </div>
    );
}
