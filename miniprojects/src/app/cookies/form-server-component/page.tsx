import { cookies } from "next/headers";

// THis is using a server component ("use server") --> it will be different for client components ("use client")

export default function Home() {
    const handleLogin = async (formData: FormData) => {
        "use server";

        const email = String(formData.get("email"));
        const password = String(formData.get("password"));

        // perform database operations
        // get the auth token

        cookies().set("name-token", "Vlad Token", {
            maxAge: 48 * 60 * 60,
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
        });
    };

    // const fetchUserInfo = async () => {
    //     const authToken = cookies().get("name-token")?.value;
    // };

    return (
        <main className="flex mx-3 flex-col items-center justify-center">
            <h1 className="my-5 text-center text-2xl font-bold">
                Getting and Setting Cookies in Next.js
            </h1>

            <div>
                <h2 className="mt-10 text-center text-3xl font-semibold">Set Cookie</h2>
                <form action={handleLogin}>
                    <input
                        type="email"
                        className="bg-transparent px-2 py-2 block my-2 border-2 border-slate-800 rounded-md"
                        placeholder="email"
                        name="email"
                    />
                    <input
                        type="password"
                        className="bg-transparent px-2 py-2 block my-2 border-2 border-slate-800 rounded-md"
                        placeholder="password"
                        name="password"
                    />
                    <button className="bg-blue-600 rounded-md px-6 py-2 w-full text-white">
                        Login
                    </button>
                </form>
            </div>

            <div className="mt-5">
                <h2 className="mt-10 text-center text-3xl font-semibold">
                    {" "}
                    Cookie Value
                </h2>

                {cookies().get("name-token")?.name && (
                    <p className="mt-5 text-xl">
                        {cookies().get("name-token")?.name +
                            ": " +
                            cookies()?.get("name-token")?.value}
                    </p>
                )}
            </div>
        </main>
    );
}