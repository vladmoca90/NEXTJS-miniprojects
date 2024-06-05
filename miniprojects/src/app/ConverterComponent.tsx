import { ChangeEvent, useCallback, useState } from "react";

export default function ConverterComponent() {
    const [unitCelsius, setUnitCelsius] = useState("");
    const [unitKg, setUnitKg] = useState("");

    const getCelsiusValue = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setUnitCelsius(e.target.value);
    }, []);

    const getKgValue = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setUnitKg(e.target.value);
    }, []);

    const convertCelsiusToFehrenheit = useCallback(() => {
        let fehrenheitValue = (parseInt(unitCelsius) * 1.8) + 32;

        if (parseInt(unitCelsius) === 0) {
            return 32;
        } else if (unitCelsius.length === 0 || !unitCelsius) {
            return 0;
        }
        else {
            return fehrenheitValue;
        }
    }, [unitCelsius]);

    const convertKgToGrams = useCallback(() => {
        let gramsValue = parseInt(unitKg) * 1000;

        if (unitKg.length === 0 || !unitKg) {
            return 0;
        }
        else {
            return gramsValue;
        }
    }, [unitKg]);

    return (
        <div className="converter-container">
            <div>
                <label className="converter-description">C<sup>o</sup> to F<sup>o</sup></label>
                <input onChange={getCelsiusValue} type="text" className="converter-field" />
                <span className="converter-result">{convertCelsiusToFehrenheit().toFixed(2)}</span>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow">
                    Button
                </button>
            </div>
            <div>
                <label className="converter-description">kg to g</label>
                <input onChange={getKgValue} type="text" className="converter-field" />
                <span className="converter-result">{convertKgToGrams().toFixed(2)}</span>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow">
                    Button
                </button>
            </div>
            <div>
                <label className="converter-description">kg to lbs</label>
                <input type="text" className="converter-field" />
                <span className="converter-result"></span>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow">
                    Button
                </button>
            </div>
            <div>
                <label className="converter-description">kg to st</label>
                <input type="text" className="converter-field" />
                <span className="converter-result"></span>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow">
                    Button
                </button>
            </div>
            <div>
                <label className="converter-description">cm to ft</label>
                <input type="text" className="converter-field" />
                <span className="converter-result"></span>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow">
                    Button
                </button>
            </div>
            <div>
                <label className="converter-description">m to yd</label>
                <input type="text" className="converter-field" />
                <span className="converter-result"></span>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow">
                    Button
                </button>
            </div>
        </div>
    );
}