/* eslint-disable @next/next/no-img-element */
"use client";
import "./styles/widgets.css";
import { Widget } from "../../lib/widgets/Widget";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

export default function ProductWidgets() {
    let widgetsUrl = "https://api.mocki.io/v2/016d11e8/product-widgets";

    const [widgets, setWidgets] = useState<Widget[]>([]);
    const [changedColor, setChangedColor] = useState("");

    const getAllWidgets = useCallback(async () => {
        const res = await fetch(widgetsUrl);

        if (!res.ok) {
            throw new Error("The data is not valid!");
        } else {
            console.log("The data is valid!");
        }

        const data = await res.json();

        setWidgets(data);
    }, [widgetsUrl]);

    const changeWidgetsColor = useCallback(async (e: MouseEvent<HTMLDivElement>) => {
        const colorClass: string = e.currentTarget.classList!.toString();
        const getColor = colorClass.slice(colorClass.lastIndexOf("--"), colorClass.length);
        const colorValue = getColor.replace("--", "").toString();

        console.log(colorValue);

        setChangedColor(colorValue);
    }, []);

    useEffect(() => {
        getAllWidgets();
    }, [getAllWidgets]);

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
                                <div id={index.toString()} className={`widget-top widget--${widget.selectedColor && changedColor}`}>
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
                                        <p className="widget-content-text">Link to Public Profile <span className="profile-link">i</span></p>
                                        <div className="public-profile-card">
                                            <p>This widget links directly to your public profile so that you can easily share your
                                                impact with your customers. Turn it off here if you do not want the badge to link
                                                to it.</p>
                                            <a href="##">View Public Profile</a>
                                        </div>
                                        <label></label>
                                        <input title="" placeholder="" name={widget.type} value={index} className="widget-checkbox" type="checkbox" />
                                    </div>
                                    <div className="widget-content-section">
                                        <p className="widget-content-text">Badge color</p>
                                        <div className="widget-colors">
                                            <div id="blue" onClick={changeWidgetsColor} className="widget-box--blue"></div>
                                            <div onClick={changeWidgetsColor} className="widget-box--green"></div>
                                            <div onClick={changeWidgetsColor} className="widget-box--beige"></div>
                                            <div onClick={changeWidgetsColor} className="widget-box--white"></div>
                                            <div onClick={changeWidgetsColor} className="widget-box--black"></div>
                                        </div>
                                    </div>
                                    <div className="widget-content-section">
                                        <p className="widget-content-text">Activate badge</p>
                                        <div className="widget-badge">
                                            <label className="switch">
                                                <input title="" placeholder="" type="checkbox" />
                                                <span className="slider round">
                                                    <span className="switch-round"></span>
                                                </span>
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