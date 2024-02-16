import { cookies } from "next/headers";

export default function CookieBanner() {
    const cookieStore = cookies();

    cookieStore.set({
        httpOnly: true,
        name: "name",
        path: "/",
        secure: true,
        value: "VladCookie",
    });
}