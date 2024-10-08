import 'dotenv/config'

export default {
	expo: {
		name: 'KokuTalk',
		slug: 'kokutalk',
		version: '1.0.0',
		scheme: 'kokutalk',
		web: {
			bundler: 'metro',
			output: 'static',
			favicon: './assets/favicon.png',
		},
		plugins: [
			'expo-router',
			'expo-secure-store',
			[
				'expo-updates',
				{
					username: 'mohamedo-desu',
				},
			],
			[
				'expo-notifications',
				{
					icon: './assets/notification-icon.png',
					color: '#5753C9',
					sounds: [],
				},
			],
			[
				'@sentry/react-native/expo',
				{
					url: 'https://sentry.io/',
					organization: process.env.SENTRY_ORG,
					project: process.env.EXPO_PUBLIC_SENTRY_PROJECT,
				},
			],
		],
		experiments: {
			typedRoutes: true,
			tsconfigPaths: true,
		},
		orientation: 'portrait',
		icon: './assets/icon.png',
		userInterfaceStyle: 'automatic',
		splash: {
			image: './assets/splash.png',
			resizeMode: 'cover',
			backgroundColor: '#ffffff',
		},
		assetBundlePatterns: ['**/*'],
		ios: {
			supportsTablet: true,
			bundleIdentifier: 'com.mohamedodesu.kokutalk',
		},
		android: {
			adaptiveIcon: {
				foregroundImage: './assets/adaptive-icon.png',
				backgroundColor: '#ffffff',
			},
			package: 'com.mohamedodesu.kokutalk',
			googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
		},
		extra: {
			router: {
				origin: false,
			},
			eas: {
				projectId: '911e2d2e-e548-4ba5-94ac-a87712b2bcc9',
			},
			SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
			SENTRY_DSN: process.env.SENTRY_DSN,
			SENTRY_ORG: process.env.SENTRY_ORG,
			FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
			FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
			FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
			FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
			FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
			FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
			FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
			FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
			OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
			GOOGLE_SERVICES_JSON: process.env.GOOGLE_SERVICES_JSON,
		},
		runtimeVersion: {
			policy: 'appVersion',
		},
		updates: {
			url: 'https://u.expo.dev/911e2d2e-e548-4ba5-94ac-a87712b2bcc9',
		},
	},
}
