"use client";
import { useCallback } from "react";

export default function CookieForm() {
    const formUrl = "http://localhost:3000/api/cookies/form";

    const getFormCookie = useCallback(async () => {
        await fetch(formUrl);
    }, []);

    return (
        <main className="flex mt-5 flex-col items-center justify-center">
            <h1 className="my-5 text-center text-2xl font-bold">
                Getting and Setting Cookies in Next.js
            </h1>
            <div>
                <h2 className="m-5 text-center text-3xl font-semibold">Set Cookie</h2>
                <form action={getFormCookie}>
                    <input type="email" className="bg-transparent px-2 py-2 block my-2 border-2 border-slate-800 rounded-md" placeholder="email" name="email" />
                    <input type="password" className="bg-transparent px-2 py-2 block my-2 border-2 border-slate-800 rounded-md" placeholder="password" name="password" />
                    <button className="bg-blue-600 rounded-md px-6 py-2 w-full text-white">Login</button>
                </form>
            </div>
        </main>
    );
}