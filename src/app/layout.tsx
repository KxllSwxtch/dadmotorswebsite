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
	title: 'D.A.D Motors',
	description:
		'D.A.D.motors - компания с 3-летним опытом экспорта автомобилей из Южной Кореи на международные рынки. Предлагаем разнообразные модели и опции, удовлетворяющие потребности клиентов. Развиваем стабильные партнерские отношения с различными странами, укрепляя позиции на глобальном автомобильном рынке.',
	icons: {
		icon: '/favicon.ico',
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
			>
				<Header />
				<main className='flex-grow'>{children}</main>
				<Footer />
				<Toaster position='top-right' />
			</body>
		</html>
	)
}
