import { Metadata } from 'next'
import CatalogClient from '@/components/catalog/CatalogClient'

export const metadata: Metadata = {
	title: 'Каталог автомобилей | D.A.D Motors',
	description:
		'Широкий выбор автомобилей из Южной Кореи от компании D.A.D Motors. Подберите оптимальный вариант для своих потребностей.',
}

export default function CatalogPage() {
	return <CatalogClient />
}
