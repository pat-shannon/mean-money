function passwordValidator(req, res, next) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#])[a-zA-Z\d@$!%*?&#]{8,}$/;
    const {password} = req.body

    if(!password || !passwordRegex.test(password)){
        return res.status(400).json({message: "Password is not valid"})
    }

    next()

}

module.exports = passwordValidator