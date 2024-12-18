import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../FormStyling.css"
// import { Alert } from '@mui/material/';
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import ConfirmToast from "./ConfirmationToast";
import { setSpendingGoals } from "../../services/users";
import { getMyUserDetails } from "../../services/users";
export function SpendingGoalsPage() {
  const [errorStatus, setErrorStatus] = useState(false);
  // const [loading, setLoading] = useState(true);

  const [currentSavings, setCurrentSavings] = useState();
  const [disposableIncome, setDisposableIncome] = useState();
  const [foodAndDrinkGoal, setFoodAndDrinkGoal] = useState();
  const [socialAndEntertainmentGoal, setsocialAndEntertainmentGoal] =
    useState();
  const [shoppingGoal, setshoppingGoal] = useState();
  const [holidayAndTravelGoal, setHolidayAndTravelGoal] = useState();
  const [healthAndBeautyGoal, setHealthAndBeautyGoal] = useState();
  const [miscGoal, setMiscGoal] = useState();

  const navigate = useNavigate();
  let errorHelp = false;

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log('test')
    getMyUserDetails(token)
      .then((allData) => {
        localStorage.setItem("token", allData.token);
        return allData.userData;
      })
      .then(
        (data) => (
          setCurrentSavings(data.currentSavings.toFixed(2)),
          setDisposableIncome(data.disposableIncome.toFixed(2)),
          setFoodAndDrinkGoal(data.foodAndDrinkGoal.toFixed(2)),
          setsocialAndEntertainmentGoal(data.socialAndEntertainmentGoal.toFixed(2)),
          setshoppingGoal(data.shoppingGoal.toFixed(2)),
          setHolidayAndTravelGoal(data.holidayAndTravelGoal.toFixed(2)),
          setHealthAndBeautyGoal(data.healthAndBeautyGoal.toFixed(2)),
          setMiscGoal(data.miscGoal.toFixed(2))
        )
      )

      .catch((error) => {
        console.error("Error fetching user details:", error);
        // setLoading(false);
      });
  }, []);

  const handleSubmit = async (event) => {
    errorHelp = false;
    setErrorStatus(false);

    const token = localStorage.getItem("token");
    event.preventDefault();

    try {
      const inputList = [
        Number(currentSavings),
        Number(disposableIncome),
        Number(foodAndDrinkGoal),
        Number(socialAndEntertainmentGoal),
        Number(shoppingGoal),
        Number(holidayAndTravelGoal),
        Number(healthAndBeautyGoal),
        Number(miscGoal),
      ];
      inputList.forEach((value) => {
        if (value.toFixed(2) != value || value < 0) {
          errorHelp = true;
          setErrorStatus(true);
        }
      });
      if (errorHelp){
        toast.error("Please ensure all spending goals are positive, numerical amounts of money.", { 
          role: "alert",
          ariaLive: "assertive"});
        }
      else {
        await setSpendingGoals(
          token,
          Number(currentSavings),
          Number(disposableIncome),
          Number(foodAndDrinkGoal),
          Number(socialAndEntertainmentGoal),
          Number(shoppingGoal),
          Number(holidayAndTravelGoal),
          Number(healthAndBeautyGoal),
          Number(miscGoal)
        );
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkInputValid = (newValue, functionRunIfValid) => {
    // If box is empty or a number, let the value update:
    // causes issues, commented out:
    // if (newValue === "" || !isNaN(newValue) || newValue!=='-') {
    functionRunIfValid(newValue);
    // }
  };

  // if(loading){
  //     return(
  //         <>
  //         <p>loading...</p></>
  //     )
  // }
  return (
    <>
      <NavBar />
      <div className="form-container">
      <div className="form-container">
      <h2 className="form-title">Spending Goals</h2>
      <h5 style={{marginBottom: "30px", textAlign: "center", color: "#1C319C"}}>Let's see what we're working with...</h5>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="currentSavings">Current savings (£)</label>
          <input
            id="currentSavings"
            type="text"
            value={currentSavings}
            onChange={(event) =>
              checkInputValid(event.target.value, setCurrentSavings)
            }
          />
          <br></br>
          <label htmlFor="disposableIncome">Monthly disposable income (£)</label>
          <input
            style={{marginBottom: "40px"}}
            id="disposableIncome"
            type="text"
            value={disposableIncome}
            // onChange={(event) => setDisposableIncome(event.target.value)}
            onChange={(event) =>
              checkInputValid(event.target.value, setDisposableIncome)
            }
          />

          <h6 style={{marginBottom: "20px", color: "#1C319C"}}>
            How much would you like to try and spend per month on the following
            categories?
          </h6>

          <label htmlFor="foodAndDrinkGoal">Food & Drink</label>
          <input
            id="foodAndDrinkGoal"
            type="currency"
            value={foodAndDrinkGoal}
            onChange={(event) =>
              checkInputValid(event.target.value, setFoodAndDrinkGoal)
            }
          />
          <br></br>
          <label htmlFor="socialAndEntertainmentGoal">
            Social and Entertainment
          </label>
          <input
            id="socialAndEntertainmentGoal"
            type="text"
            value={socialAndEntertainmentGoal}
            onChange={(event) =>
              checkInputValid(event.target.value, setsocialAndEntertainmentGoal)
            }
          />
          <br></br>
          <label htmlFor="shoppingGoal">Shopping</label>
          <input
            id="shoppingGoal"
            type="text"
            value={shoppingGoal}
            onChange={(event) =>
              checkInputValid(event.target.value, setshoppingGoal)
            }
          />
          <br></br>
          <label htmlFor="holidayAndTravelGoal">Holiday & Travel</label>
          <input
            id="holidayAndTravelGoal"
            type="text"
            value={holidayAndTravelGoal}
            onChange={(event) =>
              checkInputValid(event.target.value, setHolidayAndTravelGoal)
            }
          />
          <br></br>
          <label htmlFor="healthAndBeautyGoal">Health & Beauty</label>
          <input
            id="healthAndBeautyGoal"
            type="text"
            value={healthAndBeautyGoal}
            onChange={(event) =>
              checkInputValid(event.target.value, setHealthAndBeautyGoal)
            }
          />
          <br></br>
          <label htmlFor="miscGoal">Miscellaneous</label>
          <input
            style={{marginBottom: "20px"}}
            id="miscGoal"
            type="text"
            value={miscGoal}
            onChange={(event) =>
              checkInputValid(event.target.value, setMiscGoal)
            }
          />
          <br></br>
          <input
            className="form-button" 
            role="submit-button"
            id="submit"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
      <div style={{justifyContent: "center", textAlign: "left", marginTop: "30px", marginLeft: "-22px", marginBottom: "8px"}}>
                    <Link className="next-button" to="/dashboard">◀ Return To Dashboard</Link>
                </div>
      </div>
      
      
      {/* {errorStatus && (
        <Alert
          severity="error"
          color="error"
          onClose={() => {
            setErrorStatus(false);
          }}
        >
          Please ensure all spending goals are positive, numerical amounts of
          money.
        </Alert>

      )}
      

      )} */}
      <ToastContainer             
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
            />
            </div>
    </>
  );
}
