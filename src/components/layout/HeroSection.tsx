'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Slider } from '@/components/ui/slider'
import { motion } from 'framer-motion'

const HeroSection = () => {
	const [priceRange, setPriceRange] = useState<number[]>([7900, 2599100])
	const sectionRef = useRef(null)

	const handlePriceRangeChange = (value: number[]) => {
		setPriceRange(value)
	}

	const formatPrice = (price: number) => {
		return `$${price.toLocaleString('en-US')}`
	}

	const filterOptions = [
		{
			label: 'Select Year',
			options: ['--Select--', '2023', '2022', '2021', '2020', '2019'],
		},
		{
			label: 'Select Make',
			options: ['--Select--', 'Audi', 'BMW', 'Mercedes-Benz', 'Porsche'],
		},
		{
			label: 'Select Model',
			options: ['--Select--', 'Model S', 'Model 3', 'A4', 'X5'],
		},
	]

	const filterOptions2 = [
		{
			label: 'Select Mileage',
			options: [
				'--Select--',
				'0-10,000 miles',
				'10,000-50,000 miles',
				'50,000-100,000 miles',
				'100,000+ miles',
			],
		},
		{
			label: 'Select Transmission',
			options: ['--Select--', 'Automatic', 'Manual', 'Semi-automatic', 'CVT'],
		},
		{
			label: 'Select Condition',
			options: ['--Select--', 'New', 'Used', 'Certified Pre-Owned'],
		},
	]

	return (
		<motion.section
			className='relative h-screen mt-0 md:mt-10 pt-20'
			ref={sectionRef}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6 }}
		>
			{/* Split background */}
			<div className='absolute inset-0 flex -mt-[1px]'>
				<motion.div
					className='w-1/2 bg-red-600'
					initial={{ x: -100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
				></motion.div>
				<motion.div
					className='w-1/2 bg-black'
					initial={{ x: 100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
				></motion.div>
			</div>

			{/* Content container */}
			<div className='relative z-10 h-full container mx-auto px-4 flex flex-col'>
				{/* Hero headline */}
				<div className='flex justify-center md:justify-start mt-16 md:mt-24 mb-6'>
					<motion.h1
						className='font-extrabold tracking-tight text-[60px] sm:text-[100px] md:text-[180px] lg:text-[220px] leading-none whitespace-nowrap overflow-hidden max-w-full'
						initial={{ y: -50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.7, delay: 0.2 }}
					>
						<motion.span
							className='text-transparent'
							style={{
								textShadow: '0px 0px 1px rgba(255,255,255,0.2)',
							}}
							initial={{ x: -50 }}
							animate={{ x: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
						>
							D.A.D
						</motion.span>
						<motion.span
							className='text-white'
							initial={{ x: 50 }}
							animate={{ x: 0 }}
							transition={{ duration: 0.5, delay: 0.7 }}
						>
							{' '}
							MOTORS
						</motion.span>
					</motion.h1>
				</div>

				{/* Car Image */}
				<motion.div
					className='absolute left-0 right-0 top-[40%] md:top-1/2 transform -translate-y-[35%] z-20 flex justify-center pointer-events-none'
					initial={{ scale: 0.8, opacity: 0, y: 30 }}
					animate={{ scale: 1, opacity: 1, y: 0 }}
					transition={{
						duration: 0.8,
						delay: 0.9,
						type: 'spring',
						stiffness: 100,
					}}
					whileHover={{
						y: -10,
						transition: { duration: 0.3 },
					}}
				>
					<Image
						src='/images/homecar.webp'
						alt='Luxury Car'
						width={1300}
						height={600}
						className='object-contain w-[95%] md:w-[85%] max-w-[1000px]'
						priority
					/>
				</motion.div>

				{/* Filter card */}
				<motion.div
					className='absolute left-0 right-0 bottom-[-300px] md:bottom-[-100px] px-4 md:px-8 z-30'
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{
						duration: 0.7,
						delay: 1.2,
						type: 'spring',
						stiffness: 50,
					}}
				>
					<motion.div
						className='bg-white rounded-md shadow-lg p-5 md:p-6'
						whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
						transition={{ duration: 0.3 }}
					>
						<div className='grid grid-cols-1 md:grid-cols-4 gap-5 mb-5'>
							{filterOptions.map((filter, index) => (
								<motion.div
									key={`filter-1-${index}`}
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{
										duration: 0.4,
										delay: 1.4 + index * 0.1,
									}}
								>
									<label className='block text-sm font-medium text-gray-500 mb-2'>
										{filter.label}
									</label>
									<div className='relative'>
										<select className='w-full p-2 pr-8 border border-gray-300 rounded-md appearance-none focus:outline-none text-gray-700'>
											{filter.options.map((option, i) => (
												<option key={`option-${index}-${i}`}>{option}</option>
											))}
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
								</motion.div>
							))}

							<motion.div
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{
									duration: 0.4,
									delay: 1.7,
								}}
							>
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
							</motion.div>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
							{filterOptions2.map((filter, index) => (
								<motion.div
									key={`filter-2-${index}`}
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{
										duration: 0.4,
										delay: 1.8 + index * 0.1,
									}}
								>
									<label className='block text-sm font-medium text-gray-500 mb-2'>
										{filter.label}
									</label>
									<div className='relative'>
										<select className='w-full p-2 pr-8 border border-gray-300 rounded-md appearance-none focus:outline-none text-gray-700'>
											{filter.options.map((option, i) => (
												<option key={`option2-${index}-${i}`}>{option}</option>
											))}
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
								</motion.div>
							))}

							<motion.div
								className='flex items-end'
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{
									duration: 0.4,
									delay: 2.1,
								}}
							>
								<motion.button
									className='bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors w-full'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Search Inventory
								</motion.button>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</motion.section>
	)
}

export default HeroSection
