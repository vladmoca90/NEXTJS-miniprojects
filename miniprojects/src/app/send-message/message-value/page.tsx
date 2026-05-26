import { Suspense } from "react";
import MessageDetailsClient from "./MessageDetailsClient";

export default function MessageValuePage() {
    return (
        <Suspense fallback={<div>Loading message...</div>}>
            <MessageDetailsClient />
        </Suspense>
    );
}