import CarClient from './CarClient'
import { Metadata } from 'next'

export const generateMetadata = ({
	params,
}: {
	params: { carId: string }
}): Metadata => {
	// Extract car name from carId (e.g., bmw-x5 → BMW X5)
	const carName = params.carId
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')

	return {
		title: `${carName} | D.A.D Motors`,
		description: `Подробная информация об автомобиле ${carName}. Цена, характеристики, фотографии и возможность заказа из Южной Кореи.`,
		openGraph: {
			title: `${carName} | D.A.D Motors`,
			description: `Подробная информация об автомобиле ${carName}. Цена, характеристики, фотографии и возможность заказа из Южной Кореи.`,
			type: 'article',
		},
	}
}

export async function generateStaticParams() {
	const carIds = ['bmw-x5', 'audi-a6']
	return Promise.resolve(carIds.map((id) => ({ carId: id })))
}

export default function Page({ params }: { params: { carId: string } }) {
	return <CarClient params={params} />
}
