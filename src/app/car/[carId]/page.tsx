import CarClient from './CarClient'

export async function generateStaticParams() {
	const carIds = ['bmw-x5', 'audi-a6']
	return Promise.resolve(carIds.map((id) => ({ carId: id })))
}

export default function Page({
	params,
}: {
	params: Promise<{ carId: string }>
}) {
	return <CarClient params={params} />
}
