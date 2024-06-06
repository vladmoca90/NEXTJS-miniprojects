import { ChangeEvent, useCallback, useState } from "react";

export default function ConverterComponent() {
    const [unitCelsius, setUnitCelsius] = useState("");
    const [unitKg, setUnitKg] = useState("");
    const [unitLbs, setUnitLbs] = useState("");
    const [unitStones, setUnitStones] = useState("");
    const [unitFt, setUnitFt] = useState("");
    const [unitYd, setUnitYs] = useState("");

    const grams = 1000;
    const pounds = 0.45359237;
    const stones = 0.15747;
    const feet = 30.48;
    const yards = 1.0936;

    const getCelsiusValue = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        setUnitCelsius(e.target.value);
    }, []);

    const getKgValue = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        setUnitKg(e.target.value);
    }, []);

    const getKgToLbsValue = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        setUnitLbs(e.target.value);
    }, []);

    const getKgToStonesValue = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        setUnitStones(e.target.value);
    }, []);

    const getFtValue = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        setUnitFt(e.target.value);
    }, []);

    const getYdValue = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        setUnitYd(e.target.value);
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
        let gramsValue = parseInt(unitKg) * grams;

        if (unitKg.length === 0 || !unitKg) {
            return 0;
        }
        else {
            return gramsValue;
        }
    }, [unitKg]);

    const convertKgToLbs = useCallback(() => {
        let lbsValue = (parseInt(unitLbs) / pounds);

        if (parseInt(unitLbs) === pounds) {
            return 1;
        } else if (unitLbs.length === 0 || !unitLbs) {
            return 0;
        } else {
            return lbsValue;
        }
    }, [unitLbs]);

    const convertKgToStones = useCallback(() => {
        let stonesValue = (parseInt(unitStones) * stones);

        if (parseInt(unitStones) === 0) {
            return 0;
        } else if (unitStones.length === 0 || !unitStones) {
            return 0;
        } else {
            return stonesValue;
        }
    }, [unitStones]);

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
                <span className="converter-result">{convertKgToGrams().toFixed(0)}</span>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow">
                    Button
                </button>
            </div>
            <div>
                <label className="converter-description">kg to lbs</label>
                <input onChange={getKgToLbsValue} type="text" className="converter-field" />
                <span className="converter-result">{convertKgToLbs().toFixed(2)}</span>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow">
                    Button
                </button>
            </div>
            <div>
                <label className="converter-description">kg to st</label>
                <input onChange={getKgToStonesValue} type="text" className="converter-field" />
                <span className="converter-result">{convertKgToStones().toFixed(2)}</span>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow">
                    Button
                </button>
            </div>
            <div>
                <label className="converter-description">cm to ft</label>
                <input onChange={getFtValue} type="text" className="converter-field" />
                <span className="converter-result">{convertCmToFt().toFixed(2)}</span>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow">
                    Button
                </button>
            </div>
            <div>
                <label className="converter-description">m to yd</label>
                <input onChange={getYdValue} type="text" className="converter-field" />
                <span className="converter-result">{convertMToYd().toFixed(2)}</span>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow">
                    Button
                </button>
            </div>
        </div>
    );
}