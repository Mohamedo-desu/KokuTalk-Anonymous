import { Ionicons } from '@expo/vector-icons'
import { useCallback } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { moderateScale } from 'react-native-size-matters'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

const AnimatedMenu = ({
	options,
}: {
	options: {
		title: string
		onPress: () => Promise<void>
		icon: (typeof Ionicons)['name']
	}[]
}) => {
	const { theme, styles } = useStyles(stylesheet)

	const animatedMenuWidth = useSharedValue(0)
	const rnMenuStyles = useAnimatedStyle(() => {
		return {
			width: withTiming(animatedMenuWidth.value, { duration: 300 }),
			opacity: withTiming(animatedMenuWidth.value > 0 ? 1 : 0, { duration: 200 }),
		}
	}, [animatedMenuWidth])
	const toggleMenu = useCallback(() => {
		animatedMenuWidth.value = animatedMenuWidth.value > 0 ? 0 : moderateScale(130)
	}, [animatedMenuWidth])

	return (
		<View style={styles.menu}>
			<Animated.View style={[styles.optionsCon, rnMenuStyles]}>
				{options.map((option) => (
					<TouchableOpacity
						key={option.title}
						onPress={() => {
							toggleMenu()
							option.onPress()
						}}
						activeOpacity={0.8}
						style={[
							styles.row,
							{
								borderColor: theme.colors.primary[500],
								backgroundColor: theme.colors.background,
							},
						]}>
						<Text style={[styles.rowText, { color: theme.colors.primary[500] }]}>
							{option.title}
						</Text>
						<Ionicons
							name={option.icon}
							size={moderateScale(15)}
							color={theme.colors.primary[500]}
						/>
					</TouchableOpacity>
				))}
			</Animated.View>
			<TouchableOpacity activeOpacity={0.8} onPress={toggleMenu}>
				<Ionicons name={'ellipsis-vertical-sharp'} size={18} color={theme.colors.gray[400]} />
			</TouchableOpacity>
		</View>
	)
}

export default AnimatedMenu

const stylesheet = createStyleSheet({
	menu: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	optionsCon: {
		position: 'absolute',
		right: '60%',
		overflow: 'hidden',
		gap: moderateScale(3),
		height: '100%',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: moderateScale(10),
		borderWidth: 1,
		paddingVertical: moderateScale(5),
		paddingHorizontal: moderateScale(10),
		borderRadius: moderateScale(2),
		height: '85%',
	},
	rowText: {
		fontWeight: '500',
		textAlign: 'center',
		fontSize: moderateScale(12),
	},
})
