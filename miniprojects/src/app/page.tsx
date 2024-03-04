"use client";
import "./styles/product-widgets.css";
import { useCallback, useEffect, useState } from "react";

export default function ProductWidgets() {
    let widgetsUrl = "https://api.mocki.io/v2/016d11e8/product-widgets";

    const [widgets, setWidgets] = useState([]);

    const getWidgets = useCallback(async () => {
        const res = await fetch(widgetsUrl);

        if (!res.ok) {
            throw new Error("The data is not valid!");
        } else {
            console.log("The data is valid!");
        }

        const data = await res.json();

        console.log(data);

        setWidgets(data);
    }, [widgetsUrl]);

    console.log(widgets);

    useEffect(() => {
        getWidgets();
    }, [getWidgets]);

    return (
        <div id="productWidgets">
            {
                widgets.map((widget, index) => {
                    return (
                        <div className="widget widget--green" key={index}>
                            <div className="widget-top">

                            </div>
                            <div className="widget-content">

                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}