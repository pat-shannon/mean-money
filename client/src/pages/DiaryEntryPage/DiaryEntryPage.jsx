import DiaryEntryForm from "../../components/DiaryEntry"
import SavingsGoalForm from "../../components/SavingsGoalForm";

export function DiaryEntryPage() {

    return (

        <div className="diary-entry-page">
        <h1>Add a new diary entry</h1>
        <DiaryEntryForm />
        <SavingsGoalForm />
        </div>
);
}