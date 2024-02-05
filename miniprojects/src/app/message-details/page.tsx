"use client";
import "./../styles/send-message.css";

export default function MessageDetails({}: {
    searchParams: {
        message: string
    }
}) {
    return (
        <div id="sentMessage">
            <p>{message}</p>
        </div>
    );
}