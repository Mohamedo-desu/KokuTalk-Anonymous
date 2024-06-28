import * as Yup from 'yup'

export const SignUpValidationSchema = Yup.object().shape({
	displayName: Yup.string().min(3).max(15).required().label('display name'),
	userName: Yup.string()
		.test('no-white-space', 'user name cannot contain white spaces', (value) => {
			return !/\s/.test(value as string)
		}) // Test if value contains white spaces
		.test('no-special-chars', 'user name cannot contain special characters', (value) => {
			return /^[a-zA-Z0-9]+$/.test(value as string)
		}) // Test if value contains special characters
		.min(3)
		.max(15)
		.required()
		.label('user name'),
	password: Yup.string()
		.min(8)
		.max(35)
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
			'password must contain at least one uppercase letter, one lowercase letter, and one number',
		)
		.required()
		.label('password'),
})
export const SignInValidationSchema = Yup.object().shape({
	userName: Yup.string().min(3).max(15).required().label('user name'),
	password: Yup.string().min(8).max(35).required().label('password'),
})