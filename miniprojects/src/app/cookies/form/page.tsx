import { cookies } from "next/headers";

export default function FormCookieComponent() {
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(event.currentTarget); // Get the form data
        const email = String(formData.get("email"));
        const password = String(formData.get("password"));

        // Perform database operations
        // Get the auth token
        // For example, let's simulate getting a token after login
        const authToken = "VladCookie"; // This should be replaced with actual token retrieval logic

        cookies().set("token", authToken, {
            maxAge: 48 * 60 * 60,
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
        });
    };

    const token = cookies().get("token");

    return (
        <main className="flex mx-3 flex-col items-center justify-center">
            <h1 className="my-5 text-center text-2xl font-bold">
                Getting and Setting Cookies in Next.js
            </h1>
            <div>
                <h2 className="mt-10 text-center text-3xl font-semibold">Set Cookie</h2>
                <form onSubmit={handleLogin}> {/* Use onSubmit instead of action */}
                    <input
                        type="email"
                        className="bg-transparent px-2 py-2 block my-2 border-2 border-slate-800 rounded-md"
                        placeholder="email"
                        name="email"
                        required // Optional: Use required to ensure field is filled
                    />
                    <input
                        type="password"
                        className="bg-transparent px-2 py-2 block my-2 border-2 border-slate-800 rounded-md"
                        placeholder="password"
                        name="password"
                        required // Optional: Use required to ensure field is filled
                    />
                    <button className="bg-blue-600 rounded-md px-6 py-2 w-full text-white">
                        Login
                    </button>
                </form>
            </div>
            <div className="mt-5">
                <h2 className="mt-10 text-center text-3xl font-semibold">
                    Cookie Value
                </h2>
                {token?.name && (
                    <p className="mt-5 text-xl">
                        {token.name + ": " + token.value}
                    </p>
                )}
            </div>
        </main>
    );
}
