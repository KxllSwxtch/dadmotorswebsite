'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const HeroSection = () => {
	const router = useRouter()

	return (
		<motion.section
			className='relative h-screen mt-0 md:mt-10 pt-20 	'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6 }}
		>
			{/* Decorative elements */}
			<div className='absolute w-[300px] h-[300px] rounded-full bg-red-500/10 -top-20 -left-20 blur-3xl z-0'></div>
			<div className='absolute w-[200px] h-[200px] rounded-full bg-white/5 bottom-40 left-1/4 blur-2xl z-0'></div>
			<div className='absolute w-[150px] h-[150px] rounded-full bg-red-600/10 top-40 right-20 blur-xl z-0'></div>

			{/* Split background with gradient overlay */}
			<div className='absolute inset-0 flex -mt-[1px]'>
				<motion.div
					className='w-1/2 bg-gradient-to-br from-black to-gray-900'
					initial={{ x: -100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
				></motion.div>
				<motion.div
					className='w-1/2 bg-gradient-to-bl from-red-700 to-red-600'
					initial={{ x: 100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
				></motion.div>
			</div>

			{/* Content container */}
			<div className='relative z-10 h-full container mx-auto px-4 flex flex-col'>
				{/* Main content - Desktop view: car image left, filters right */}
				<div className='flex flex-col md:flex-row md:items-center md:justify-between w-full h-full mt-6 md:mt-4'>
					{/* Left column with title and car image */}
					<div className='md:w-1/2 flex flex-col pt-10 md:pt-0'>
						{/* Hero headline - now smaller and above car image */}
						<motion.h1
							className='
								font-extrabold tracking-tight text-[40px] 
								xs:text-[30px] sm:text-[40px] md:text-[50px] 
								lg:text-[70px] xl:text-[80px] 2xl:text-[90px] leading-none mb-4 text-center  
								drop-shadow-lg md:text-left
							'
							initial={{ y: -30, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.7, delay: 0.2 }}
						>
							<motion.span
								className='text-transparent inline-block'
								style={{
									textShadow: '0px 0px 20px rgba(255,0,0,0.3)',
									background: 'linear-gradient(to right, #ff0000, #ff3333)',
									WebkitBackgroundClip: 'text',
									backgroundClip: 'text',
								}}
								initial={{ x: -30 }}
								animate={{ x: 0 }}
								transition={{ duration: 0.5, delay: 0.5 }}
							>
								D.A.D
							</motion.span>{' '}
							<motion.span
								className='text-white inline-block'
								style={{ textShadow: '0px 4px 8px rgba(0,0,0,0.3)' }}
								initial={{ x: 30 }}
								animate={{ x: 0 }}
								transition={{ duration: 0.5, delay: 0.7 }}
							>
								MOTORS
							</motion.span>
						</motion.h1>

						{/* Tagline */}
						<motion.p
							className='text-white/80 text-lg md:text-xl mb-6 text-center md:text-left'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.8, duration: 0.5 }}
						>
							Премиальные автомобили из Южной Кореи с гарантией и поддержкой
						</motion.p>

						{/* Car Image - Left side on desktop */}
						<motion.div
							className='flex justify-center md:justify-start mb-20 md:mb-0 relative z-20'
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
							<div className='relative'>
								{/* Shadow effect */}
								<div className='absolute bottom-0 w-3/4 h-[20px] bg-black/20 blur-xl mx-auto left-0 right-0 rounded-[50%] z-0'></div>

								<Image
									src='https://static.tcimg.net/vehicles/primary/30c887a55b468037/2025-Mercedes-Benz-G-Class-white-full_color-driver_side_front_quarter.png'
									alt='Luxury Car'
									width={1300}
									height={600}
									className='object-contain w-[95%] md:w-full max-w-[700px] drop-shadow-2xl'
									priority
								/>
							</div>
						</motion.div>
					</div>

					{/* Action buttons and call-to-action - Right side on desktop */}
					<motion.div
						className='md:w-[45%] z-30'
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
							className='bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-8 border border-white/20'
							whileHover={{
								boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
							}}
							transition={{ duration: 0.3 }}
						>
							<h3 className='text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center'>
								Премиальные автомобили из Южной Кореи
							</h3>

							<div className='grid grid-cols-1 gap-5'>
								{/* Catalog Button */}
								<motion.div
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{
										duration: 0.4,
										delay: 1.4,
									}}
								>
									<motion.button
										className='bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-4 px-6 rounded-lg transition-all w-full cursor-pointer shadow-lg shadow-red-500/30 hover:shadow-red-500/50 flex items-center justify-center space-x-3 text-lg'
										whileHover={{
											scale: 1.03,
											boxShadow: '0 10px 25px -5px rgba(220, 38, 38, 0.4)',
										}}
										whileTap={{ scale: 0.98 }}
										onClick={() => router.push('/catalog')}
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-6 w-6'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M4 6h16M4 12h16M4 18h7'
											/>
										</svg>
										<span>Каталог автомобилей</span>
									</motion.button>
								</motion.div>

								{/* Contact Button */}
								<motion.div
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{
										duration: 0.4,
										delay: 1.5,
									}}
								>
									<motion.button
										className='bg-white text-gray-800 border-2 border-red-500 font-medium py-4 px-6 rounded-lg transition-all w-full cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 text-lg'
										whileHover={{
											scale: 1.03,
											boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
										}}
										whileTap={{ scale: 0.98 }}
										onClick={() => router.push('/contacts')}
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-6 w-6'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
											/>
										</svg>
										<span>Связаться с нами</span>
									</motion.button>
								</motion.div>
							</div>
						</motion.div>

						{/* Trust badges */}
						<motion.div
							className='justify-between mt-4 text-white/70 text-xs hidden md:flex'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 1.8 }}
						>
							<div className='flex items-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-4 w-4 mr-1'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
									/>
								</svg>
								Официальная гарантия
							</div>
							<div className='flex items-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-4 w-4 mr-1'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
									/>
								</svg>
								Чистота и безопасность
							</div>
							<div className='flex items-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-4 w-4 mr-1'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M5 13l4 4L19 7'
									/>
								</svg>
								Быстрая доставка
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</motion.section>
	)
}

export default HeroSection
