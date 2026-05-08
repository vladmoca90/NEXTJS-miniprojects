"use client";
import "./styles/actors.css";
import { useCallback, useEffect, useState } from "react";
import { Actor } from "../../../data/actors/Actor";
import Image from "next/image";

export default function GetActors() {
    const actorsUrl = "http://localhost:3000/api/actors";

    const [actors, setActors] = useState<Actor[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getActors = useCallback(async () => {
        try {
            const res = await fetch(actorsUrl);

            if (!res.ok) {
                throw new Error("The data is not valid!");
            }

            const data = await res.json();

            setActors(data.body);
        } catch (error) {
            console.error("Error fetching actors:", error);
        } finally {
            setIsLoading(false);
        }
    }, [actorsUrl]);

    useEffect(() => {
        getActors();
    }, [getActors]);

    if (isLoading) {
        return (
            <div className="loading-overlay">
                <img
                    src="/loading-buffering.gif"
                    alt="Loading..."
                    width={200}
                    height={200}
                    className="loading-spinner"
                />
            </div>
        );
    }

    return (
        <section className="actors-section">
            <div className="actors-container">
                {actors.map((actor, index) => (
                    <div key={index} className="actor-card">
                        <div className="actor-image">
                            <Image
                                src={actor.img}
                                alt={actor.name}
                                width={200}
                                height={250}
                                className="actor-img"
                            />
                        </div>
                        <div className="actor-info">
                            <h3 className="actor-name">{actor.name}</h3>
                            <p className="actor-biography">{actor.biography}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}