import { useState } from "react";
import { createSavingsGoal } from "../services/savings_goal";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export function NewSavingsGoal({ handleReloadGoal }) {
    const [savingsGoalContent, setSavingsGoalContent] = useState('');

    const handlePostContent = (event) => {
        setPostContent(event.target.value);
    }

    const submitContent = async () => {
        const token = localStorage.getItem('token');
        console.log(savingsGoalContent)
    }
}