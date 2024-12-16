const FinancialAdvisorService = require ('../lib/FinancialAdviceService')

async function getFinancialAdvice(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const advisorService = new FinancialAdvisorService(token);
        const advice = await advisorService.generateAdvice();
        res.status(200).json({ advice });
    } catch (error) {
        console.error('Error generating financial advice:', error);
        res.status(500).json({message: "Failed to generate advice"})
    }
}

const FinancialAdvisorController = {
    getFinancialAdvice: getFinancialAdvice
};

module.exports = FinancialAdvisorController