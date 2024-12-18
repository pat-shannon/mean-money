import 'react';

const ConfirmToast = ({ closeToast, onConfirm }) => {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-sm">Are you sure you want to delete this entry?</p>
            <div className="flex gap-2">
                <button
                    onClick={() => {
                        onConfirm();
                        closeToast();
                    }}
                    className="px-3 py-1 bg-red-500 text-gray-700 rounded hover:bg-red-600"
                >
                    Delete
                </button>
                <button
                    onClick={closeToast}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ConfirmToast;