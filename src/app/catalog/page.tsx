'use client'

import CatalogClient from '@/components/catalog/CatalogClient'
import { Suspense } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Каталог автомобилей | D.A.D Motors',
	description:
		'Широкий выбор автомобилей из Южной Кореи. Найдите идеальный автомобиль для импорта с доставкой по выгодной цене.',
	openGraph: {
		title: 'Каталог автомобилей | D.A.D Motors',
		description:
			'Широкий выбор автомобилей из Южной Кореи. Найдите идеальный автомобиль для импорта с доставкой по выгодной цене.',
		type: 'website',
	},
}

export default function CatalogPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<CatalogClient />
		</Suspense>
	)
}
