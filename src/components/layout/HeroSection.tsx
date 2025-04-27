'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Slider } from '@/components/ui/slider'

const HeroSection = () => {
	const [priceRange, setPriceRange] = useState<number[]>([7900, 2599100])

	const handlePriceRangeChange = (value: number[]) => {
		setPriceRange(value)
	}

	const formatPrice = (price: number) => {
		return `$${price.toLocaleString('en-US')}`
	}

	return (
		<section className='relative h-screen mt-0 md:mt-10 pt-20'>
			{/* Split background */}
			<div className='absolute inset-0 flex -mt-[1px]'>
				<div className='w-1/2 bg-red-600'></div>
				<div className='w-1/2 bg-black'></div>
			</div>

			{/* Content container */}
			<div className='relative z-10 h-full container mx-auto px-4 flex flex-col'>
				{/* Hero headline */}
				<div className='flex justify-center md:justify-start mt-16 md:mt-24 mb-6'>
					<h1 className='font-extrabold tracking-tight text-[60px] sm:text-[100px] md:text-[180px] lg:text-[220px] leading-none whitespace-nowrap overflow-hidden max-w-full'>
						<span
							className='text-transparent'
							style={{
								textShadow: '0px 0px 1px rgba(255,255,255,0.2)',
							}}
						>
							D.A.D
						</span>
						<span className='text-white'> MOTORS</span>
					</h1>
				</div>

				{/* Car Image */}
				<div className='absolute left-0 right-0 top-[40%] md:top-1/2 transform -translate-y-[35%] z-20 flex justify-center pointer-events-none'>
					<Image
						src='/images/homecar.webp'
						alt='Luxury Car'
						width={1300}
						height={600}
						className='object-contain w-[95%] md:w-[85%] max-w-[1000px]'
						priority
					/>
				</div>

				{/* Filter card */}
				<div className='absolute left-0 right-0 bottom-[-300px] md:bottom-[-100px] px-4 md:px-8 z-30'>
					<div className='bg-white rounded-md shadow-lg p-5 md:p-6'>
						<div className='grid grid-cols-1 md:grid-cols-4 gap-5 mb-5'>
							<div>
								<label className='block text-sm font-medium text-gray-500 mb-2'>
									Select Year
								</label>
								<div className='relative'>
									<select className='w-full p-2 pr-8 border border-gray-300 rounded-md appearance-none focus:outline-none text-gray-700'>
										<option>--Select--</option>
										<option>2023</option>
										<option>2022</option>
										<option>2021</option>
										<option>2020</option>
										<option>2019</option>
									</select>
									<div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
										<svg
											className='w-4 h-4 text-gray-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M19 9l-7 7-7-7'
											></path>
										</svg>
									</div>
								</div>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-500 mb-2'>
									Select Make
								</label>
								<div className='relative'>
									<select className='w-full p-2 pr-8 border border-gray-300 rounded-md appearance-none focus:outline-none text-gray-700'>
										<option>--Select--</option>
										<option>Audi</option>
										<option>BMW</option>
										<option>Mercedes-Benz</option>
										<option>Porsche</option>
									</select>
									<div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
										<svg
											className='w-4 h-4 text-gray-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M19 9l-7 7-7-7'
											></path>
										</svg>
									</div>
								</div>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-500 mb-2'>
									Select Model
								</label>
								<div className='relative'>
									<select className='w-full p-2 pr-8 border border-gray-300 rounded-md appearance-none focus:outline-none text-gray-700'>
										<option>--Select--</option>
										<option>Model S</option>
										<option>Model 3</option>
										<option>A4</option>
										<option>X5</option>
									</select>
									<div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
										<svg
											className='w-4 h-4 text-gray-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M19 9l-7 7-7-7'
											></path>
										</svg>
									</div>
								</div>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-500 mb-2'>
									Price: {formatPrice(priceRange[0])} -{' '}
									{formatPrice(priceRange[1])}
								</label>
								<div className='px-1 py-2'>
									<Slider
										defaultValue={priceRange}
										max={2599100}
										min={7900}
										step={100}
										onValueChange={handlePriceRangeChange}
									/>
								</div>
							</div>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
							<div>
								<label className='block text-sm font-medium text-gray-500 mb-2'>
									Select Mileage
								</label>
								<div className='relative'>
									<select className='w-full p-2 pr-8 border border-gray-300 rounded-md appearance-none focus:outline-none text-gray-700'>
										<option>--Select--</option>
										<option>0-10,000 miles</option>
										<option>10,000-50,000 miles</option>
										<option>50,000-100,000 miles</option>
										<option>100,000+ miles</option>
									</select>
									<div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
										<svg
											className='w-4 h-4 text-gray-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M19 9l-7 7-7-7'
											></path>
										</svg>
									</div>
								</div>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-500 mb-2'>
									Select Transmission
								</label>
								<div className='relative'>
									<select className='w-full p-2 pr-8 border border-gray-300 rounded-md appearance-none focus:outline-none text-gray-700'>
										<option>--Select--</option>
										<option>Automatic</option>
										<option>Manual</option>
										<option>Semi-automatic</option>
										<option>CVT</option>
									</select>
									<div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
										<svg
											className='w-4 h-4 text-gray-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M19 9l-7 7-7-7'
											></path>
										</svg>
									</div>
								</div>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-500 mb-2'>
									Select Condition
								</label>
								<div className='relative'>
									<select className='w-full p-2 pr-8 border border-gray-300 rounded-md appearance-none focus:outline-none text-gray-700'>
										<option>--Select--</option>
										<option>New</option>
										<option>Used</option>
										<option>Certified Pre-Owned</option>
									</select>
									<div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
										<svg
											className='w-4 h-4 text-gray-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M19 9l-7 7-7-7'
											></path>
										</svg>
									</div>
								</div>
							</div>

							<div className='flex items-end'>
								<button className='bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors w-full'>
									Search Inventory
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
