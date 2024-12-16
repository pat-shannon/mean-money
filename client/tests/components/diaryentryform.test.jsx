import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DiaryEntryForm from "../../src/components/DiaryEntryForm"
import '@testing-library/jest-dom';
import { describe, test, expect, beforeEach, vi } from 'vitest';


describe("Diary Entry form component", () => {

    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
        vi.stubGlobal('alert', vi.fn());
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("All text displays", async () => {
        render(<DiaryEntryForm />);

        const h2 = screen.getByRole("heading", { level: 2 });
        expect(h2.textContent).toBe("New Diary Entry")
    });
    test("Input labels display", async () => {
        render(<DiaryEntryForm />);
        const expectedLabelTexts = ["Amount (£):", "Date:", "Business Name:", "Category:"]
        expectedLabelTexts.forEach((text) => {
            const label = screen.getByText(text);
            expect(label).toBeInTheDocument();
        });
    });
    test("Can type values for all input", async () => {
        render(
            <DiaryEntryForm />
        );
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
    test('defaults to todays date', () => {
        render(<DiaryEntryForm />);

        const dateInput = screen.getByLabelText('Date:');
        const today = new Date().toISOString().split('T')[0];

        expect(dateInput.value).toBe(today);
    })
    // test('amount input prevents negative numbers', () => {
    //     render(<DiaryEntryForm />);
    //     const amountInput = screen.getByLabelText('Amount:');
    //     fireEvent.change(amountInput, { target: { value: '-50' } });
    //     expect(amountInput).toBeInvalid();
    // });
    test('submits form with valid data', async () => {

        global.fetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            text: () => Promise.resolve('Success'),
            json: () => Promise.resolve({ message: 'Success' })
        });

        render(<DiaryEntryForm />);

        fireEvent.change(screen.getByLabelText('Amount (£):'), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2024-03-03' } });
        fireEvent.change(screen.getByLabelText('Business Name:'), { target: { value: 'Starbucks' } });
        fireEvent.change(screen.getByLabelText('Category:'), { target: { value: 'Food and Drink' } });

        fireEvent.click(screen.getByText('Save Diary Entry'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/server/diary-entry'),
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: expect.any(String)
                })
            );
            expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('saved successfully'));
        });
    });
    test('handles API submission error', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Network error'));

        render(<DiaryEntryForm />);

        fireEvent.change(screen.getByLabelText('Amount (£):'), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2024-03-03' } });
        fireEvent.change(screen.getByLabelText('Business Name:'), { target: { value: 'Starbucks' } });
        fireEvent.change(screen.getByLabelText('Category:'), { target: { value: 'Food and Drink' } });

        fireEvent.click(screen.getByText('Save Diary Entry'));

        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith('Failed to submit diary entry');
        });
    });
    test('validates maximum business name length', () => {
        render(<DiaryEntryForm />);
        const businessInput = screen.getByLabelText('Business Name:');

        // expect(businessInput).toHaveAttribute('maxLength', '100');

        const longBusinessName = 'A'.repeat(150);
        fireEvent.change(businessInput, { target: { value: longBusinessName } });
        expect(businessInput.value.length).toBe(50);
        // expect(businessInput.value).toBe('A'.repeat(100));
    });
})