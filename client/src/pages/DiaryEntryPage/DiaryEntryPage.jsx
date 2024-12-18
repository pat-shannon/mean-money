import DiaryEntryForm from "../../components/DiaryEntryForm"
import { NavBar } from "../../components/NavBar";
import { Link } from "react-router-dom";

export function DiaryEntryPage() {

    return (
        <>
        <NavBar />
        <div className="diary-entry-page">
        <DiaryEntryForm />
        
        </div>
        </>
);
}