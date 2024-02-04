"use client";
import "./../styles/send-message.css";

export default function MessageDetails({}: {
    searchParams: {
        messageText: string
    }
}) {
    return (
        <div id="sentMessage">
            <p></p>
        </div>
    );
}