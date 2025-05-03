import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'sonner'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'D.A.D Motors | Экспорт автомобилей из Южной Кореи',
	description:
		'D.A.D.motors - компания с 3-летним опытом экспорта автомобилей из Южной Кореи на международные рынки. Предлагаем разнообразные модели и опции, удовлетворяющие потребности клиентов. Развиваем стабильные партнерские отношения с различными странами, укрепляя позиции на глобальном автомобильном рынке.',
	keywords: [
		'D.A.D Motors',
		'автомобили из Кореи',
		'экспорт автомобилей',
		'корейские авто',
		'импорт автомобилей',
		'доставка авто из Кореи',
	],
	authors: [{ name: 'D.A.D Motors', url: 'https://dadmotors.ru' }],
	metadataBase: new URL('https://dadmotors.ru'),
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		type: 'website',
		locale: 'ru_RU',
		url: 'https://dadmotors.ru',
		siteName: 'D.A.D Motors',
		title: 'D.A.D Motors | Экспорт автомобилей из Южной Кореи',
		description:
			'D.A.D.motors - компания с 3-летним опытом экспорта автомобилей из Южной Кореи на международные рынки.',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'D.A.D Motors - экспорт автомобилей из Южной Кореи',
			},
		],
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
				suppressHydrationWarning
			>
				<Header />
				<main className='flex-grow'>{children}</main>
				<Footer />
				<Toaster position='top-right' />
			</body>
		</html>
	)
}
