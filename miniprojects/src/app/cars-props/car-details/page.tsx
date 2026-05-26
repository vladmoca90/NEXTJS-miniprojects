import { Suspense } from "react";
import CarDetailsContent from "./CarDetailsContent";

export default function CarDetailsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CarDetailsContent />
        </Suspense>
    );
}