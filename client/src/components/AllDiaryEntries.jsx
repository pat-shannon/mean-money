import { useState, useEffect } from "react";
import { getDiaryEntries, deleteDiaryEntry } from "../services/diary_entry";
import "./AllDiaryEntries.css"
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ConfirmToast from "./ConfirmationToast";
import { Link } from "react-router-dom";

function AllDiaryEntries() {
    const [diaryEntries, setDiaryEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        const loadDiaryEntries = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem('token');

                if (!token) {
                    toast.error('Please log in to view your diary entries', {
                        role: "alert",
                        ariaLive: "assertive"
                    });
                    return;
                }

                const response = await getDiaryEntries(token);
                setDiaryEntries(response.entries || []);
            } catch (error) {
            const errorMessage = error.message || 'Failed to load diary entries. Please try again later.';
                toast.error(errorMessage, {
                    role: "alert",
                    ariaLive: "assertive"
                });
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

                await deleteDiaryEntry(token, entryId);
                toast.success("Entry deleted successfully", { 
                    role: "alert",
                    ariaLive: "polite"});
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);

            } catch (error) {
                toast.error("Failed to delete entry" + error, {
                    role: "alert",
                    ariaLive: "assertive"
                });
            }
    };

    return (
        <section className="diary-container">
            <ToastContainer             
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
            />
        <header className="diary-header">
            <h1 className="diary-title">Your Diary Entries</h1>
        </header>

        {diaryEntries.length === 0 ? (
            <div className="empty-state">
                <p>No diary entries found.</p>
                <p className="empty-state-subtitle">Track your spending by adding a diary entry.</p>
                <Link to="/new-diary-entry">
                <button>Add a diary entry</button>
            </Link>
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