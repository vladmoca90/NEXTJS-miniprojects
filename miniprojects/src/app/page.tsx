"use client";
import "./styles/product-widgets.css";
import { Widget } from "../../lib/product-widgets/Widget";
import { useCallback, useEffect, useState } from "react";

export type WidgetsProps = {
    widgets: Widget[];
}

export default function ProductWidgets(props: WidgetsProps) {
    let widgetsUrl = "https://api.mocki.io/v2/016d11e8/product-widgets";

    const [widgets, setWidgets] = useState<Widget[]>([]);

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

    useEffect(() => {
        getWidgets();
    }, [getWidgets]);

    console.log(widgets);

    // const addWidgetsColors = useCallback((widgets: Widget[]) => {
    //     let color: any = `widget widget--${props.widgets[0].selectedColor}`;

    //     for (let i in widgets) {
    //         color = props.widgets[i].selectedColor;
    //     }

    //     console.log(color);

    //     return color;
    // }, [props.widgets]);

    return (
        <div id="productWidgets">
            <div className="productWidgets-top">
                <h3>Per product widgets</h3>
            </div>
            <div className="productWidgets-content">
                {
                    widgets.map((widget, index) => {
                        return (
                            <div className="widget widget--green" key={index}>
                                <div className="widget-top">
                                    <p className="widget-title">This product {widget.action}</p>
                                    <p className="widget-subtitle">{widget.amount} {widget.type}</p>
                                </div>
                                <div className="widget-content">

                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}