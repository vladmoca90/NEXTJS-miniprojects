"use client";
import "./../styles/send-message.css";

export default function MessageDetails({ searchParams }: {
    searchParams: {
        messageText: string
    }
}) {
    return (
        <div id="sentMessage">
            <p>{searchParams.messageText}</p>
        </div>
    );
}