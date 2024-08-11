import {calculateInvestmentResults, formatter} from "../../util/investment.js";

import './Results.css'

export default function Results({userInput}) {
    if (userInput.numberOfYears < 1)
        return (
            <p className="center">Please enter a valid number of years</p>
        )

    const annualData = calculateInvestmentResults(userInput)
    const initialInvestment = userInput.initialInvestment

    return (
        <>
            <table id="result">
                <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
                </thead>
                <tbody>
                {annualData.map(data => {
                        const totalInterest = data.valueEndOfYear - data.annualInvestment * data.year - initialInvestment
                        const totalInvestedCapital = data.valueEndOfYear - totalInterest

                        return (
                            <tr key={data.year}>
                                <td>{data.year}</td>
                                <td>{formatter.format(data.valueEndOfYear)}</td>
                                <td>{formatter.format(data.interest)}</td>
                                <td>{formatter.format(totalInterest)}</td>
                                <td>{formatter.format(totalInvestedCapital)}</td>
                            </tr>
                        )
                    }
                )}
                </tbody>
            </table>
        </>
    )
}