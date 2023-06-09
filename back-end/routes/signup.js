const router = require('express').Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const {User,validate}=require('./models/user');
const validate1 = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};
// const validate1 = (data) => {
// 	const schema = Joi.object({
// 		firstName: Joi.string().required().label("First Name"),
// 		lastName: Joi.string().required().label("Last Name"),
// 		email: Joi.string().email().required().label("Email"),
//         password: passwordComplexity().required().label("Password"),
// 	});
// 	return schema.validate(data);
// };
router.post('/signup',async(req,res)=>{
    try {
		console.log(req.body)
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email }); 
		console.log(user)
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
console.log(user)
		await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
router.post('/login',async(req,res) => {
    try {
		const { error } = validate1(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid  Password" });
            console.log(user);
            const token = user.generateAuthToken();
            console.log(token);
            res.status(200).send({ data: token, message: "logged in successfully" });
        } catch (error) {
            res.status(500).send({ message: "Internal Server Error" });
        }


});

module.exports = router;//
