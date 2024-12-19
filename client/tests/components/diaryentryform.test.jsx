import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DiaryEntryForm from "../../src/components/DiaryEntryForm"
import '@testing-library/jest-dom';
import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

vi.mock('react-toastify', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
    ToastContainer: vi.fn(() => null),
}));


const mockCreateDiaryEntry = vi.fn();
vi.mock('../../src/services/diary_entry', () => ({
    createDiaryEntry: () => mockCreateDiaryEntry()
}));

const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe("Diary Entry form component", () => {

    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
        vi.clearAllMocks();
        localStorage.clear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        localStorage.clear();
        mockCreateDiaryEntry.mockReset();
    });

    test("All text displays", async () => {
        renderWithRouter(<DiaryEntryForm />);

        const h2 = screen.getByRole("heading", { level: 2 });
        expect(h2.textContent).toBe("New Diary Entry")
    });
    test("Input labels display", async () => {
        renderWithRouter(<DiaryEntryForm />);
        const expectedLabelTexts = ["Amount (£):", "Date:", "Business Name:", "Category:"]
        expectedLabelTexts.forEach((text) => {
            const label = screen.getByText(text);
            expect(label).toBeInTheDocument();
        });
    });
    test("Can type values for all input", async () => {
        renderWithRouter(<DiaryEntryForm />);
        const amountInput = screen.getByLabelText("Amount (£):");
        fireEvent.change(amountInput, { target: { value: "50" } });
        expect(amountInput.value).toBe("50");

        const dateInput = screen.getByLabelText("Date:");
        fireEvent.change(dateInput, { target: { value: "2024-03-03" } });
        expect(dateInput.value).toBe("2024-03-03");

        const businessInput = screen.getByLabelText("Business Name:");
        fireEvent.change(businessInput, { target: { value: "Pret" } });
        expect(businessInput.value).toBe("Pret");

        const categorySelect = screen.getByLabelText("Category:");
        fireEvent.change(categorySelect, { target: { value: 'Food and Drink' } });
        expect(categorySelect.value).toBe('Food and Drink');
    })
    test('prevents negative amounts', () => {
        renderWithRouter(<DiaryEntryForm />);
        const amountInput = screen.getByLabelText('Amount (£):');
        
        fireEvent.change(amountInput, { target: { value: '-50' } });
        
        expect(toast.error).toHaveBeenCalledWith(
            "Amount must be a positive number",
            expect.any(Object)
        );
        expect(amountInput.value).toBe('');
    });
    test('validates maximum business name length', () => {
        renderWithRouter(<DiaryEntryForm />);
        const businessInput = screen.getByLabelText('Business Name:');
        const longBusinessName = 'A'.repeat(150);
        fireEvent.change(businessInput, { target: { value: longBusinessName } });
        expect(businessInput.value.length).toBe(50);
    });
    test('defaults to todays date', () => {
        renderWithRouter(<DiaryEntryForm />);

        const dateInput = screen.getByLabelText('Date:');
        const today = new Date().toISOString().split('T')[0];

        expect(dateInput.value).toBe(today);
    })

    test('submits form with valid data', async () => {

        localStorage.setItem('token', 'mock-token');
        mockCreateDiaryEntry.mockResolvedValueOnce({ message: 'Success' });

        renderWithRouter(<DiaryEntryForm />);

        fireEvent.change(screen.getByLabelText('Amount (£):'), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2024-03-03' } });
        fireEvent.change(screen.getByLabelText('Business Name:'), { target: { value: 'Starbucks' } });
        fireEvent.change(screen.getByLabelText('Category:'), { target: { value: 'Food and Drink' } });

        fireEvent.click(screen.getByText('Save Diary Entry'));

        await waitFor(() => {
            expect(mockCreateDiaryEntry).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalledWith(
                'Diary entry saved successfully!',
                {
                    role: "alert",
                    ariaLive: "polite"
                }
            );
        });
    });

    test('handles API submission error', async () => {
        localStorage.setItem('token', 'mock-token');
        mockCreateDiaryEntry.mockRejectedValueOnce(new Error('Network error'));

        renderWithRouter(<DiaryEntryForm />);

        fireEvent.change(screen.getByLabelText('Amount (£):'), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2024-03-03' } });
        fireEvent.change(screen.getByLabelText('Business Name:'), { target: { value: 'Starbucks' } });
        fireEvent.change(screen.getByLabelText('Category:'), { target: { value: 'Food and Drink' } });

        fireEvent.click(screen.getByText('Save Diary Entry'));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Failed to submit diary entry: Network error', 
                {
                    role: "alert",
                    ariaLive: "assertive"
                }
            );
        });
    });
    test('prevents submission when no token exists', async () => {
        localStorage.clear();
        
        renderWithRouter(<DiaryEntryForm />);

        fireEvent.change(screen.getByLabelText('Amount (£):'), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2024-03-03' } });
        fireEvent.change(screen.getByLabelText('Business Name:'), { target: { value: 'Starbucks' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Food and Drink' } });

        fireEvent.click(screen.getByText('Save Diary Entry'));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(
                'Session timed out. Please log in again.',
                {
                    role: "alert",
                    ariaLive: "assertive"
                }
            );
            expect(global.fetch).not.toHaveBeenCalled();
        });
})
test('handles successful submission', async () => {
    localStorage.setItem('token', 'mock-token');
    
    global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: () => Promise.resolve('Success'),
        json: () => Promise.resolve({ message: 'Success' })
    });

    renderWithRouter(<DiaryEntryForm />);

    fireEvent.change(screen.getByLabelText('Amount (£):'), { target: { value: '50' } });
    fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2024-03-03' } });
    fireEvent.change(screen.getByLabelText('Business Name:'), { target: { value: 'Starbucks' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Food and Drink' } });

    fireEvent.click(screen.getByText('Save Diary Entry'));

    await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
            'Diary entry saved successfully!',
            {
                role: "alert",
                ariaLive: "polite"
            }
        );
    });
});
});
