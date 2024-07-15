import { useSettingsStoreSelectors } from '@/store/settingsStore'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import React, { PropsWithChildren, useEffect } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { UnistylesRuntime } from 'react-native-unistyles'

const CustomThemeProvider = ({ children }: PropsWithChildren) => {
	const theme = useSettingsStoreSelectors.use.theme()
	const colorScheme = useColorScheme()

	useEffect(() => {
		const selectedTheme: any = theme === 'system' ? colorScheme : theme

		UnistylesRuntime.setTheme(selectedTheme)
	}, [theme, colorScheme])

	const isDarkTheme = theme === 'system' ? colorScheme === 'dark' : theme === 'dark'
	const currentTheme = isDarkTheme ? DarkTheme : DefaultTheme
	const statusBarStyle = isDarkTheme ? 'light-content' : 'dark-content'

	return (
		<ThemeProvider value={currentTheme}>
			<>
				{children}
				<StatusBar barStyle={statusBarStyle} animated />
			</>
		</ThemeProvider>
	)
}

export default CustomThemeProvider
