import { useAuthStoreSelectors } from '@/store/authStore'
import { DEVICE_WIDTH } from '@/utils'
import { ForwardedRef, forwardRef, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { RulerPicker } from 'react-native-ruler-picker'
import { moderateScale } from 'react-native-size-matters'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

const AgeSetup = forwardRef(
	({ activeIndex }: { activeIndex: number }, ref: ForwardedRef<FlatList<any> | null>) => {
		const { theme, styles } = useStyles(stylesheet)

		const updateUser = useAuthStoreSelectors.use.updateUser()
		const { age } = useAuthStoreSelectors.use.currentUser()

		const [isValid, setIsValid] = useState(age?.trim().length > 0 ? true : false)

		const handleSelectAge = (age: string) => {
			updateUser({ age: Math.round(parseInt(age)).toString() })

			setIsValid(true)
		}

		const handleGoNext = async () => {
			if (ref && 'current' in ref && ref.current) {
				ref?.current?.scrollToIndex({ index: activeIndex + 1, animated: true })
			}
		}
		const handleGoBack = async () => {
			if (ref && 'current' in ref && ref.current) {
				ref?.current?.scrollToIndex({ index: activeIndex - 1, animated: true })
			}
		}

		return (
			<View style={styles.container}>
				<View style={styles.content}>
					<RulerPicker
						min={18}
						max={81}
						step={1}
						fractionDigits={0}
						initialValue={parseFloat(age) || 18}
						gapBetweenSteps={moderateScale(35)}
						indicatorColor={theme.colors.white}
						longStepColor={theme.colors.primary[400]}
						longStepHeight={moderateScale(80)}
						shortStepHeight={moderateScale(40)}
						indicatorHeight={moderateScale(40)}
						shortStepColor={'rgba(255,255,255,.2)'}
						valueTextStyle={{ fontSize: moderateScale(40), color: theme.colors.white }}
						unitTextStyle={{ fontSize: moderateScale(20), color: theme.colors.white }}
						stepWidth={moderateScale(3)}
						onValueChangeEnd={(number) => handleSelectAge(number)}
						unit="years old"
					/>
				</View>

				<View style={styles.footer}>
					<TouchableOpacity
						onPress={handleGoBack}
						activeOpacity={0.7}
						style={[styles.button, { backgroundColor: theme.colors.primary[400] }]}>
						<Text style={[styles.buttonText, { color: theme.colors.white }]}>BACK</Text>
					</TouchableOpacity>
					<TouchableOpacity
						disabled={!isValid}
						activeOpacity={0.7}
						onPress={handleGoNext}
						style={[styles.button, { backgroundColor: theme.colors.primary[400] }]}>
						<Text style={[styles.buttonText, { color: theme.colors.white }]}>NEXT</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	},
)

export default AgeSetup

const stylesheet = createStyleSheet({
	button: {
		width: moderateScale(100),
		aspectRatio: 1,
		borderRadius: moderateScale(50),
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontFamily: 'Medium',
		fontSize: moderateScale(18),
		letterSpacing: 1,
	},
	container: {
		flex: 1,
		flexGrow: 1,
		width: DEVICE_WIDTH,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		flexGrow: 1,
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'row',
		alignContent: 'center',
		flexWrap: 'wrap',
		gap: moderateScale(15),
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '95%',
	},
})
