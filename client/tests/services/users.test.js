// file: services/users.test.js

import { getUserByEmail, getUserByName, submitNewUser } from "../../src/services/users";
import { describe, it, expect, vi } from 'vitest';

global.fetch = vi.fn();

describe("User Services", () => {
    beforeEach(() => {
        fetch.mockClear();
        process.env.VITE_BACKEND_URL = "http://localhost:9000";
    });

    describe("getUserByEmail", () => {
        it("finds user by email", async () => {
            const mockToken = "token1";
            const mockEmail = "naomismith@makers.tech";
            const mockUser = { 
                id: "1", 
                name: "Naomiii", 
                email: mockEmail 
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValue(mockUser)
            });

            const result = await getUserByEmail(mockToken, mockEmail);

            expect(fetch).toHaveBeenCalledWith(
                `${process.env.VITE_BACKEND_URL}/users/find/${mockEmail}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${mockToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            expect(result).toEqual(mockUser);
        });

        it("gives an error message whne user can't be found", async () => {
            const mockToken = "token2";
            const mockEmail = "littlesharky@email.co.uk";

            global.fetch.mockResolvedValueOnce({
                ok: false,
                statusText: "Not Found"
            });

            await expect(getUserByEmail(mockToken, mockEmail))
                .rejects
                .toThrow("User not found or error: Not Found");
        });
    });

    describe("getUserByName", () => {
        it("gives us the user by name", async () => {
            const mockToken = "token3";
            const mockName = "Ezekiel";
            const mockUser = { 
                id: "34", 
                name: mockName, 
                email: "eazybreeze@email.com" 
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValue(mockUser)
            });

            const result = await getUserByName(mockToken, mockName);

            expect(fetch).toHaveBeenCalledWith(
                `${process.env.VITE_BACKEND_URL}/users/find/${mockName}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${mockToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            expect(result).toEqual(mockUser);
        });
    });

    describe("submitNewUser", () => {
        it("submits a new user", async () => {
            const mockUser = {
                name: "Geraldine",
                email: "coolgerry@email.co.uk",
                password: "password123"
            };

            const mockResponseData = {
                message: "User created successfully",
                user: {
                    ...mockUser,
                    id: "3"
                }
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValue(mockResponseData)
            });

            const result = await submitNewUser(
                mockUser.name, 
                mockUser.email, 
                mockUser.password
            );

            expect(fetch).toHaveBeenCalledWith(
                "http://localhost:9000/users",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(mockUser)
                }
            );

            expect(result).toEqual(mockResponseData);
        });

        it("gives an error when user isn't created", async () => {
            const mockUser = {
                name: "Shola",
                email: "sholalala@makers.tech",
                password: "password456"
            };

            const mockErrorResponse = {
                message: "Email already exists"
            };

            global.fetch.mockResolvedValueOnce({
                ok: false,
                json: vi.fn().mockResolvedValue(mockErrorResponse)
            });

            await expect(submitNewUser(
                mockUser.name, 
                mockUser.email, 
                mockUser.password
            ))
                .rejects
                .toThrow("Email already exists");
        });
    });
});