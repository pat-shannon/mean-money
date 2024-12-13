import DiaryEntryForm from "../../components/DiaryEntryForm"
import { NavBar } from "../../components/NavBar";

export function DiaryEntryPage() {

    return (
        <>
        <NavBar />
        <div className="diary-entry-page">
        <h1>Add a new diary entry</h1>
        <DiaryEntryForm />
        
        </div>
        </>
);
}