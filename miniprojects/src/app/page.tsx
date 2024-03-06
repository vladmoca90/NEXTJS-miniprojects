/* eslint-disable @next/next/no-img-element */
"use client";
import "./styles/product-widgets.css";
import { Widget } from "../../lib/product-widgets/Widget";
import { MouseEvent, useCallback, useEffect, useState } from "react";

export type WidgetsProps = {
    widgets: Widget[];
}

export enum extraColors {
    White = "white",
    Beige = "beige",
}

export default function ProductWidgets(props: WidgetsProps) {
    let widgetsUrl = "https://api.mocki.io/v2/016d11e8/product-widgets";

    const [widgets, setWidgets] = useState<Widget[]>([]);
    const [checkWidget, isCheckWidget] = useState(false);

    const getWidgets = useCallback(async () => {
        const res = await fetch(widgetsUrl);

        if (!res.ok) {
            throw new Error("The data is not valid!");
        } else {
            console.log("The data is valid!");
        }

        const data = await res.json();

        setWidgets(data);
    }, [widgetsUrl]);

    useEffect(() => {
        getWidgets();
    }, [getWidgets]);

    const addWidgetsColors = useCallback((widget: Widget) => {
        return `widget-top widget--${widget.selectedColor}`;
    }, []);

    const onCheckedWidget = useCallback((e: MouseEvent<HTMLInputElement>) => {
        const value = e.currentTarget.checked;
        isCheckWidget(checkWidget);
    }, [checkWidget]);

    return (
        <div id="productWidgets">
            <div className="productWidgets-top">
                <h3>Per product widgets</h3>
            </div>
            <div className="productWidgets-content">
                {
                    widgets.map((widget, index) => {
                        return (
                            <div className="widget" key={index}>
                                <div className={addWidgetsColors(widget)}>
                                    <div className="widget-top-logo">
                                        <img alt={widget.type} className="logo" src="/images/widgets/logo-white.png" />
                                    </div>
                                    <div className="widget-top-text">
                                        <p className="widget-title">This product {widget.action}</p>
                                        <p className="widget-subtitle">{widget.amount} {widget.type}</p>
                                    </div>
                                </div>
                                <div className="widget-content">
                                    <div className="widget-content-section">
                                        <p className="widget-content-text">Link to Public Profile</p>
                                        <input onClick={onCheckedWidget} className="widget-checkbox" type="checkbox" />
                                    </div>
                                    <div className="widget-content-section">
                                        <p className="widget-content-text">Badge color</p>
                                        <div className="widget-colors">
                                            <div className="widget-colors--blue"></div>
                                            <div className="widget-colors--green"></div>
                                            <div className="widget-colors--beige"></div>
                                            <div className="widget-colors--white"></div>
                                            <div className="widget-colors--black"></div>
                                        </div>
                                    </div>
                                    <div className="widget-content-section">
                                        <p className="widget-content-text">Activate badge</p>
                                        <div className="widget-badge">
                                            <label className="switch">
                                                <input type="checkbox" />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}