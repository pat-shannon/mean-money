const JWT = require("jsonwebtoken");
const { generateToken, decodeToken } = require("../../lib/token");

jest.mock("jsonwebtoken");

describe("Token Module", () => {
    const mockSecret = "mockSecret";
    const mockUserId = "mockUserId";
    const mockToken = "mockGeneratedToken";

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.JWT_SECRET = mockSecret;
    });

    describe("generateToken Function", () => {
        // test("should generate a token with correct payload", () => {
        //     const mockPayload = {
        //         user_id: mockUserId,
        //         iat: expect.any(Number),
        //         exp: expect.any(Number),
        //     };

        //     JWT.sign.mockReturnValue(mockToken);

        //     const token = generateToken(mockUserId);

        //     expect(JWT.sign).toHaveBeenCalledWith(
        //         expect.objectContaining(mockPayload),
        //         mockSecret
        //     );
        //     expect(token).toBe(mockToken);
        // });

        test("should set token to expire in 10 minutes", () => {
            const now = Math.floor(Date.now() / 1000);
            JWT.sign.mockImplementation((payload, secret) => {
                return `mockTokenWithExp_${payload.exp}`;
            });

            const token = generateToken(mockUserId);
            const expectedExp = now + 10 * 60;

            expect(token).toContain(expectedExp.toString());
        });
    });

    // describe("decodeToken Function", () => {
//         test("should decode token with correct secret", () => {
//             const mockDecodedPayload = { user_id: mockUserId };

//             // Mock JWT.decode to return mockDecodedPayload
//             JWT.decode.mockReturnValue(mockDecodedPayload);

//             const decoded = decodeToken(mockToken);

//             // Check that JWT.decode was called with the correct token and secret
//             expect(JWT.decode).toHaveBeenCalledWith(mockToken, mockSecret);
//             expect(decoded).toEqual(mockDecodedPayload); // Ensure the decoded payload matches
//         });

//         test("should return null if token is invalid", () => {
//             JWT.decode.mockReturnValue(null);

//             const decoded = decodeToken("invalidToken");

//             // Check that JWT.decode was called with the invalid token and secret
//             expect(JWT.decode).toHaveBeenCalledWith("invalidToken", mockSecret);
//             expect(decoded).toBeNull(); // Ensure that an invalid token returns null
//         });
//     });
});
