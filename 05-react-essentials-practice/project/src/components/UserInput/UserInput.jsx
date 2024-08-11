import './UserInput.css'

export default function UserInput({inputOnClick, userInput}) {
    return (
        <section id="user-input">
            <div className="input-group">
                <p>
                    <label>Initial Investment</label>
                    <input
                        type="number"
                        id="initial-investment"
                        defaultValue={userInput.initialInvestment}
                        onChange={e => inputOnClick(e.target.id, e.target.value)}
                        required/>
                </p>
                <p>
                    <label>Annual Investment</label>
                    <input
                        type="number"
                        id="annual-investment"
                        defaultValue={userInput.annualInvestment}
                        onChange={e => inputOnClick(e.target.id, e.target.value)}
                        required/>
                </p>
            </div>

            <div className="input-group">
                <p>
                    <label>Interest Rate</label>
                    <input
                        type="number"
                        id="interest-rate"
                        defaultValue={userInput.interestRate}
                        onChange={e => inputOnClick(e.target.id, e.target.value)}
                        required/>
                </p>
                <p>
                    <label>Number of Years</label>
                    <input
                        type="number"
                        id="number-of-years"
                        defaultValue={userInput.numberOfYears}
                        min="1"
                        onChange={e => inputOnClick(e.target.id, e.target.value)}
                        required/>
                </p>
            </div>
        </section>
    )
}