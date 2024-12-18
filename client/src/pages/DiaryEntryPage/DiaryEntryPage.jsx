import DiaryEntryForm from "../../components/DiaryEntryForm"
import { NavBar } from "../../components/NavBar";

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