import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { useState } from "react";

import { setSpendingGoals } from "../../services/users"

export function SpendingGoalsPage() {

    const [currentSavings, setCurrentSavings] = useState();
    const [disposableIncome, setDisposableIncome] = useState();
    const [foodAndDrinkGoal, setFoodAndDrinkGoal] = useState();
    const [socialOutingsGoal, setSocialOutingsGoal] = useState();
    const [entertainmentAndAppsGoal, setEntertainmentAndAppsGoal] = useState();
    const [holidayAndTravelGoal, setHolidayAndTravelGoal] = useState();
    const [healthAndBeautyGoal, setHealthAndBeautyGoal] = useState();
    const [miscGoal, setMiscGoal] = useState();

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try{
            await setSpendingGoals(currentSavings, disposableIncome, foodAndDrinkGoal, socialOutingsGoal, entertainmentAndAppsGoal, holidayAndTravelGoal, healthAndBeautyGoal, miscGoal);
            navigate("/dashboard")
        } catch (err) {
            console.error(err);

        }
    }

    return (
        <>
            <NavBar />
            <h1>Spending Goals</h1>
            <h3>Let's see what we're working with</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="currentSavings">Current savings</label>
                    <input
                        id="currentSavings"
                        type="number"
                        value={currentSavings}
                        onChange={(event) => setCurrentSavings(event.target.value)}
                    />
                    <br></br>
                    <label>Monthly disposable income</label>
                    <input
                        id="disposableIncome"
                        type="number"
                        value={disposableIncome}
                        onChange={(event) => setDisposableIncome(event.target.value)}
                    />

                    <h3>How much would you like to try and spend per month on the following categories?</h3>

                    <label>Food & Drink</label>
                    <input
                        id="foodAndDrinkGoal"
                        type="number"
                        value={foodAndDrinkGoal}
                        onChange={(event) => setFoodAndDrinkGoal(event.target.value)}
                    />
                    <br></br>
                    <label>Social Outings</label>
                    <input
                        id="socialOutingsGoal"
                        type="number"
                        value={socialOutingsGoal}
                        onChange={(event) => setSocialOutingsGoal(event.target.value)}
                    />
                    <br></br>
                    <label>Entertainment & Apps</label>
                    <input
                        id="entertainmentAndAppsGoal"
                        type="number"
                        value={entertainmentAndAppsGoal}
                        onChange={(event) => setEntertainmentAndAppsGoal(event.target.value)}
                    />
                    <br></br>
                    <label>Holiday & Travel</label>
                    <input
                        id="holidayAndTravelGoal"
                        type="number"
                        value={holidayAndTravelGoal}
                        onChange={(event) => setHolidayAndTravelGoal(event.target.value)}
                    />
                    <br></br>
                    <label>Health & Beauty</label>
                    <input
                        id="healthAndBeautyGoal"
                        type="number"
                        value={healthAndBeautyGoal}
                        onChange={(event) => setHealthAndBeautyGoal(event.target.value)}
                    />
                    <br></br>
                    <label>Miscellaneous</label>
                    <input
                        id="miscGoal"
                        type="number"
                        value={miscGoal}
                        onChange={(event) => setMiscGoal(event.target.value)}
                    />
                    <br></br>
                    <input
                        role="submit-button"
                        id="submit"
                        type="submit"
                        value="Submit"
                    />
                </div>
            </form>
        </>
    );
}
