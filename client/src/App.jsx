import { useState } from 'react'
import placeholderImg from './assets/placeholder_img.png'

import { NavBar } from './components/NavBar'

import './App.css'
import DiaryEntryForm from './components/DiaryEntry'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <NavBar /> */}
      <div>
        <NavBar />
        <a href="https://react.dev" target="_blank">
          <img src={placeholderImg} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>MeanMoney</h1>
      <h3>The budgeting app that bites</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <h1>Add a new diary entry</h1>
        <DiaryEntryForm />
      </div>
    </>
  )
}

export default App
