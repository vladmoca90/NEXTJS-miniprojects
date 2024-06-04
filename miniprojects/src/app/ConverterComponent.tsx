export default function ConverterComponent() {
    return (
        <div className="converter-container">
            <div>
                <label className="converter-description">C<sup>o</sup> to F<sup>o</sup></label>
                <input type="text" className="converter-field" />
                <span className="converter-result"></span>
            </div>
            <div>
                <label className="converter-description">kg to g</label>
                <input type="text" className="converter-field" />
                <span className="converter-result"></span>
            </div>
            <div>
                <label className="converter-description">kg to lbs</label>
                <input type="text" className="converter-field" />
                <span className="converter-result"></span>
            </div>
            <div>
                <label className="converter-description">kg to st</label>
                <input type="text" className="converter-field" />
                <span className="converter-result"></span>
            </div>
            <div>
                <label className="converter-description">cm to ft</label>
                <input type="text" className="converter-field" />
                <span className="converter-result"></span>
            </div>
            <div>
                <label className="converter-description">m to yd</label>
                <input type="text" className="converter-field" />
                <span className="converter-result"></span>
            </div>
        </div>
    );
}