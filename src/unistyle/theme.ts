export const Colors = {
	primary: {
		500: '#5753C9',
		400: '#6E7FF3',
		300: '#3D4E81',
	},

	white: '#ffffff',
	black: '#141414',
	success: '#096826',
	error: '#680909',
	warning: '#ad9e13',
	disliked: '#c95353',
} as const

const margins = {
	sm: 2,
	md: 4,
	lg: 8,
	xl: 12,
}
export const lightTheme = {
	colors: {
		typography: 'black',
		background: '#ffffff',
		gray: {
			500: '#9E9E9E',
			400: '#BDBDBD',
			300: '#E0E0E0',
			200: '#EEEEEE',
			100: '#F5F5F5',
			50: '#fafafa',
		},
		...Colors,
	},
	components: {
		screen: {
			flex: 1,
			flexGrow: 1,
			backgroundColor: Colors.white,
		},
	},

	margins,
} as const

export const darkTheme = {
	colors: {
		typography: 'white',
		background: '#141414',
		gray: {
			500: '#B0B0B0',
			400: '#8A8A8A',
			300: '#545454',
			200: '#333333',
			100: '#1B1B1B',
			50: '#1b1a1a',
		},
		...Colors,
	},
	components: {
		screen: {
			flex: 1,
			flexGrow: 1,
			backgroundColor: Colors.black,
		},
	},

	margins,
} as const
