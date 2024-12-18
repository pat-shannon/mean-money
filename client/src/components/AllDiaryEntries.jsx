import { useState, useEffect } from "react";
import { getDiaryEntries, deleteDiaryEntry } from "../services/diary_entry";
import "./AllDiaryEntries.css"
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ConfirmToast from "./ConfirmationToast";

function AllDiaryEntries() {
    const [diaryEntries, setDiaryEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDiaryEntries = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem('token');

                if (!token) {
                    setError('Please log in to view your diary entries');
                    toast.error('Please log in to view your diary entries', {
                        role: "alert",
                        ariaLive: "assertive"
                    });
                    return;
                }

                const response = await getDiaryEntries(token);
                setDiaryEntries(response.entries || []);
                setError(null);
            } catch (err) {
            const errorMessage = err.message || 'Failed to load diary entries. Please try again later.';
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        loadDiaryEntries();
    }, []);

    if (isLoading) {
        return (
            <div className="loading-container">
                <p className="loading-text">Loading your entries...</p>
            </div>
        );
    }

    const handleDelete = async (entryId) => {
        // if (window.confirm("Are you sure you want to delete this entry?")) {
            const confirmDeletion = () => {
                return new Promise((resolve) => {
                    toast.warn(
                        ({ closeToast }) => (
                            <ConfirmToast 
                                closeToast={closeToast}
                                onConfirm={() => resolve(true)}
                            />
                        ),
                        {
                            autoClose: false,
                            closeOnClick: false,
                            draggable: false,
                            closeButton: false
                        }
                    );
                });
            };
            try {
                const confirmed = await confirmDeletion();
                if (!confirmed) return;

                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error("No authentication token found. Please log in again,", { 
                        role: "alert",
                        ariaLive: "assertive"});
                    return;
                }

                const deleteReturned = await deleteDiaryEntry(token, entryId);
                localStorage.setItem("token", deleteReturned.token);
                
                toast.success("Entry deleted successfully", { 
                    role: "alert",
                    ariaLive: "assertive"});
                    setTimeout(() => {
                        window.location.reload();
                    }, 1100);
      

            } catch (err) {
                toast.error("Failed to delete entry. Please try again", {
                    role: "alert",
                    ariaLive: "assertive"
                });
            }
    };

    return (
        <section className="diary-container">
            <ToastContainer /> 
        <header className="diary-header">
            <h1 className="diary-title">Your Diary Entries</h1>
        </header>

        {diaryEntries.length === 0 ? (
            <div className="empty-state">
                <p>No diary entries found.</p>
                <p className="empty-state-subtitle">Start adding entries to see them here!</p>
            </div>
        ) : (
            <div className="entries-container">
                {diaryEntries.map((entry) => (
                    <article key={entry._id} className="entry-card">
                        <h3 className="entry-title">
                            {entry.businessName}
                        </h3>
                        <div className="entry-details">
                            <p>
                                Amount: £{Number(entry.amount).toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                            </p>
                            <p>Category: {entry.category}</p>
                            <p>
                                Date: {new Date(entry.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                            </div>
                                    <div className="entry-actions">
                                        <button onClick={() => handleDelete(entry._id)} className="delete-button">
                                            Delete
                                        </button>
                                    </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export default AllDiaryEntries;