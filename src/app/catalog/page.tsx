'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Search } from 'lucide-react'

// Example car data (in a real app, this would come from an API)
const demoCarData = [
	{
		id: '123456',
		title: 'Hyundai Grandeur',
		year: 2022,
		mileage: 15000,
		price: 32000,
		imageUrl:
			'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2128&auto=format&fit=crop',
	},
	{
		id: '234567',
		title: 'KIA K5',
		year: 2021,
		mileage: 22000,
		price: 25000,
		imageUrl:
			'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop',
	},
	{
		id: '345678',
		title: 'Genesis G80',
		year: 2023,
		mileage: 8000,
		price: 55000,
		imageUrl:
			'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
	},
	{
		id: '456789',
		title: 'Hyundai Santa Fe',
		year: 2020,
		mileage: 35000,
		price: 28000,
		imageUrl:
			'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop',
	},
]

export default function CatalogPage() {
	const [searchTerm, setSearchTerm] = useState('')

	// Filter cars based on search term
	const filteredCars = demoCarData.filter(
		(car) =>
			car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			car.year.toString().includes(searchTerm),
	)

	return (
		<div className='container mx-auto px-4 py-12'>
			<h1 className='text-3xl font-bold mb-8 text-center'>
				Каталог автомобилей
			</h1>

			{/* Search filters */}
			<div className='mb-8 max-w-md mx-auto'>
				<div className='relative'>
					<Label htmlFor='search' className='sr-only'>
						Поиск
					</Label>
					<Search
						className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
						size={18}
					/>
					<Input
						type='text'
						id='search'
						placeholder='Поиск по марке, модели или году'
						className='pl-10'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			{/* Car grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
				{filteredCars.map((car) => (
					<motion.div
						key={car.id}
						className='bg-white shadow-md rounded-lg overflow-hidden'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						whileHover={{ y: -5, transition: { duration: 0.2 } }}
					>
						<div className='relative h-48'>
							<Image
								src={car.imageUrl}
								alt={car.title}
								fill
								className='object-cover'
							/>
						</div>
						<div className='p-4'>
							<h2 className='text-xl font-semibold mb-2'>{car.title}</h2>
							<div className='flex justify-between text-sm text-gray-600 mb-3'>
								<span>{car.year}</span>
								<span>{car.mileage.toLocaleString()} км</span>
							</div>
							<div className='flex justify-between items-center'>
								<p className='text-lg font-bold'>
									${car.price.toLocaleString()}
								</p>
								<Button asChild size='sm'>
									<Link href={`/car/${car.id}`}>Подробнее</Link>
								</Button>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{filteredCars.length === 0 && (
				<div className='text-center py-12'>
					<p className='text-gray-500'>
						По вашему запросу не найдено автомобилей.
					</p>
				</div>
			)}
		</div>
	)
}
