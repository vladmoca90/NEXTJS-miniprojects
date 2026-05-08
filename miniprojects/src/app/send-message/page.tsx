"use client";
import "../styles/send-message.css";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function SendMessage() {
    const [message, setMessage] = useState<string>("");
    const router = useRouter();

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setMessage(e.target.value);
        },
        []
    );

    const handleSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!message.trim()) return;

            router.push(
                `/send-message/message-value?messageText=${encodeURIComponent(message)}`
            );
        },
        [message, router]
    );

    return (
        <div id="sendText">
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Your message
                </label>

                <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleChange}
                    placeholder="Leave a comment..."
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />

                <button type="submit" className="messageBtn">
                    Submit
                </button>
            </form>

            <p id="yourText">{message}</p>
        </div>
    );
}