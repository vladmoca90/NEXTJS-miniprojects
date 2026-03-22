"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function ClientPageComponent(): JSX.Element {
    const router = useRouter();

    const setTestCookie = (): void => {
        Cookies.set("name", "clickBtn", {
            expires: 30, // ✅ expires in 30 days (correct format)
            path: "/",
        });

        // Optional: refresh if server components depend on this cookie
        router.refresh();
    };

    return (
        <main className="flex mx-3 flex-col items-center justify-center">
            <h1 className="my-10 text-center text-2xl font-bold">
                Getting and Setting Cookies in Next.js (Client Component)
            </h1>

            <div>
                <h2 className="mb-5 mt-3 text-center text-3xl font-semibold">
                    Set Cookie
                </h2>

                <button
                    onClick={setTestCookie}
                    className="bg-blue-600 rounded-md px-9 py-2 text-white hover:bg-blue-700 transition"
                >
                    Set Cookie
                </button>
            </div>
        </main>
    );
}