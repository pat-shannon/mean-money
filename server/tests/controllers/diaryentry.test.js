const mongoose = require('mongoose');
const { createDiaryEntry } = require('../../controllers/diaryEntry'); 
const DiaryEntry = require('../../models/diary_entry.js');
const httpMocks = require('node-mocks-http'); 

jest.mock('../../models/diary_entry.js'); 

describe('createDiaryEntry Controller', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    it('should create a new diary entry with valid data', async () => {
        req.body = {
            amount: 100,
            date: new Date(),
            businessName: 'SuperMart',
            category: 'Shopping'
        };
        req.user_id = new mongoose.Types.ObjectId();

        DiaryEntry.prototype.save = jest.fn().mockResolvedValue({
            user_id: req.user_id,
            amount: 100,
            date: req.body.date,
            businessName: req.body.businessName,
            category: req.body.category
        });

        await createDiaryEntry(req, res);

        expect(res.statusCode).toBe(201);
        expect(JSON.parse(res._getData())).toEqual({
            message: "Diary entry created",
            token: expect.any(String),
        });
        expect(DiaryEntry.prototype.save).toHaveBeenCalledTimes(1);
    });

    it('should return 400 if any required field is missing', async () => {
        req.body = { amount: 100 }; 
        req.user_id = new mongoose.Types.ObjectId();

        await createDiaryEntry(req, res);

        expect(res.statusCode).toBe(400);
        expect(JSON.parse(res._getData())).toEqual({
            message: 'All fields are required.',
            token: expect.any(String), 
        });
    });

    it('should return 500 on error', async () => {
        req.body = {
            amount: 100,
            date: new Date(),
            businessName: 'SuperMart',
            category: 'Shopping'
        };
        req.user_id = new mongoose.Types.ObjectId();

        DiaryEntry.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

        await createDiaryEntry(req, res);

        expect(res.statusCode).toBe(500);
        expect(JSON.parse(res._getData())).toEqual({
            message: 'Failed to create diary entry',
            error: 'Database error',
            token: expect.any(String),
        });
    });

    it('should return 500 if category is invalid', async () => {
        req.body = {
            amount: 100,
            date: new Date(),
            businessName: 'SuperMart',
            category: 'InvalidCategory' 
        };
        req.user_id = new mongoose.Types.ObjectId();

        DiaryEntry.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

        await createDiaryEntry(req, res);

        expect(res.statusCode).toBe(500);
        expect(JSON.parse(res._getData())).toEqual({
            message: 'Failed to create diary entry',
            error: 'Database error',
            token: expect.any(String),
        });
    });
});