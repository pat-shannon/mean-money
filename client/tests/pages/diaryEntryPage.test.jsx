import { render, screen } from "@testing-library/react";
import { DiaryEntryPage } from "../../src/pages/DiaryEntryPage/DiaryEntryPage";


describe("Diary Entry form page", () => {
    test("All text displays", async () => {
        render(
            <DiaryEntryPage />
        );  

        
        const h1 = await screen.findByRole("heading", {level:1});
        expect(h1.textContent).toBe("Add a new diary entry")
    })
})