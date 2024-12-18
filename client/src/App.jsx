import './App.css'
import { DiaryEntryPage } from './pages/DiaryEntryPage/DiaryEntryPage';
import { LoginPage } from './pages/Login/LoginPage';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Homepage } from './pages/Homepage/Homepage';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { SpendingGoalsPage } from './pages/SpendingGoals/SpendingGoalsPage';
import { SavingsGoalPage } from './pages/SavingsGoal/SavingsGoalPage';
import { QuizMainPage } from "./pages/Quiz/QuizMainPage";
import { ProtectedRoute } from './components/ProtectedRoute';
// import quiz components:
import Quiz from "./components/Quiz";
import QuizResult from "./components/QuizResult";

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


// react routes:
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },

  {
    path: "/login",
    element: <LoginPage />
  },

  {
    path: "/signup",
    element: <SignUpPage />
  },

  {
    path: "/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
  },

  {
    path: "/spending-goals",
    element: <ProtectedRoute><SpendingGoalsPage /></ProtectedRoute>
  },
  
  {
    path: "/new-savings-goal",
    element: <ProtectedRoute><SavingsGoalPage /></ProtectedRoute>
  },
  {
    path: "/new-diary-entry",
    element: <ProtectedRoute><DiaryEntryPage /></ProtectedRoute>
  },
  {
    path:"/quizstart",
    element: <ProtectedRoute><QuizMainPage /></ProtectedRoute>
  },
  {
    path: "/quizquestions",
    element: <ProtectedRoute><Quiz /></ProtectedRoute>
  },
  {
    path: "/result",
    element: <ProtectedRoute><QuizResult /></ProtectedRoute>
  }
]);

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
        {/* <a href="https://react.dev" target="_blank">
          <img src={placeholderImg} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>MeanMoney</h1>
      <h3>The budgeting app that bites</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <h1>Add a new diary entry</h1> */}
        {/* <DiaryEntryForm /> */}
        <RouterProvider router={router} />
    </>
  )
}

export default App


// import { LoginPage } from './pages/Login/LoginPage'; 
// import { Dashboard } from './pages/Dashboard/Dashboard'; 
// import { Homepage } from './pages/Homepage/Homepage'; 
// import { SignUpPage } from './pages/SignUpPage/SignUpPage'; 
// import { SavingsGoalPage } from './pages/SavingsGoal/SavingsGoalPage';  
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import NavBar from './components/NavBar'; // Make sure to import NavBar

// const router = createBrowserRouter([   
//   {     
//     path: "/",     
//     element: (
//       <>
//         <NavBar />
//         <Homepage /> 
//       </>
//     ),   
//   },    
//   {     
//     path: "/login",     
//     element: (
//       <>
//         <NavBar />
//         <LoginPage /> 
//       </>
//     ),   
//   },    
//   {     
//     path: "/signup",     
//     element: (
//       <>
//         <NavBar />
//         <SignUpPage /> 
//       </>
//     ),   
//   },    
//   {     
//     path: "/dashboard",     
//     element: (
//       <>
//         <NavBar />
//         <Dashboard /> 
//       </>
//     ),   
//   },    
//   {     
//     path: "/new-savings-goal",     
//     element: (
//       <>
//         <NavBar />
//         <SavingsGoalPage /> 
//       </>
//     ),   
//   }, 
// ]);

// function App() {
//   return <RouterProvider router={router} />
// }

// export default App