const DiaryEntry = require('../models/diary_entry');
const User = require('../models/user');
const SavingsGoal = require('../models/savings_goal');
const jwt = require('jsonwebtoken')

class FinancialAdvisorService {
    constructor(token) {
        this.token = token;
        this.userId = this._decodeUserId();
    }

    _decodeUserId () {
        try {
            const decoded = jwt.verify(this.token, process.env.JWT_SECRET);
            return decoded.user_id;
        } catch (error) {
            console.error('Token verification failed:', error);
            throw new Error ('Invalid Token')
        }
    }

    async generateAdvice() {
        try {
            const user = await User.findById(this.userId)
            if (!user) throw new Error('User not found');

            const diaryEntries = await DiaryEntry.find({
                date: {$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
            });

            const savingsGoals = await SavingsGoal.find();

            const advice = [];
            advice.push(...this._analyseSpendingPatterns(user, diaryEntries));
            advice.push(...this._checkSavingGoalProgress(user, savingsGoals));
            advice.push(...this._checkBudgetGoals(user, diaryEntries));

            return this._formatAdvice(advice);
        } catch (error) {
            console.error('Advice generation failed:', error);
        }
    }

    _analyseSpendingPatterns(user, diaryEntries){
        const advice = [];
        const categorySpending = this._calculateCategorySpending(diaryEntries);

        if(categorySpending['Food and Drink'] > user.foodAndDrinkGoal * 1.2) {
            advice.push("Whoa, big spender! Your food budget is eating your wallet. Maybe cook at home once in a while?")
        }

        return advice;
    }

    _checkSavingGoalProgress(user, savingsGoals) {
        const advice = [];
        savingsGoals.forEach(goal => {
            const daysRemaining = math.ceil((goal.endDate - Date.now()) / (24 * 60 * 60 * 1000));
            const progressPercentage = (user.currentSavings / goal.savingsTarget) * 100;

            if (daysRemaining < 30 && progressPercentage < 50) {
                advice.push(`Your ${goal.savingsTitle} goal is looking slim. Panic mode: activated! 🚨`)
            }
        });
        return advice
    }

    _checkBudgetGoals(user, diaryEntries) {
        const advice = [];
        const monthlyDisposableIncome = user.disposableIncome;
        const totalSpending = diaryEntries.reduce((sum, entry) => sum + entry.amount, 0);

        if(totalSpending > monthlyDisposableIncome * 0.8) {
            advice.push("💸 Slow down, money magician! You're burning through cash faster than a lottery winner.");
        }
        return advice;
    }

    _calculateCategorySpending(diaryEntries) {
        return diaryEntries.reduce((acc, entry) => {
            acc[entry.category] = (acc[entry.category] || 0) + entry.amount;
            return acc;
        }, {});
    }

    _formatAdvice(adviceArray) {
        if (adviceArray.length === 0 ) {
            return ["Looking good! Your finances are so on point, even I'm impressed."]
        }
        return adviceArray;
    }
}

module.exports = FinancialAdvisorService