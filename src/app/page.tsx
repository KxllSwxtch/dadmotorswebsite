'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ChevronRight, Car, Building2, Shield, Globe } from 'lucide-react'
import HeroSection from '@/components/layout/HeroSection'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Home() {
	const containerRef = useRef(null)
	const aboutRef = useRef(null)
	const ctaRef = useRef(null)
	const isAboutInView = useInView(aboutRef, { once: true, amount: 0.3 })
	const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 })

	// Card hover animation variants
	const cardVariants = {
		initial: { scale: 1 },
		hover: {
			scale: 1.05,
			boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
			transition: { type: 'spring', stiffness: 300 },
		},
	}

	// Text animation variants
	const titleVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (custom: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: 0.1 * custom,
				duration: 0.5,
			},
		}),
	}

	return (
		<motion.div
			className='flex flex-col min-h-screen'
			ref={containerRef}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
		>
			{/* Hero Section */}
			<HeroSection />

			{/* About Section */}
			<section className='pt-90 pb-20 md:py-40 bg-white' ref={aboutRef}>
				<div className='container mx-auto px-4'>
					<motion.div
						className='text-center mb-16'
						initial={{ opacity: 0, y: 50 }}
						animate={
							isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
						}
						transition={{ duration: 0.6 }}
					>
						<motion.h2
							className='text-3xl md:text-4xl font-bold mb-4'
							variants={titleVariants}
							custom={0}
							initial='hidden'
							animate={isAboutInView ? 'visible' : 'hidden'}
						>
							О компании D.A.D Motors
						</motion.h2>
						<motion.p
							className='text-lg text-neutral-600 max-w-3xl mx-auto'
							variants={titleVariants}
							custom={1}
							initial='hidden'
							animate={isAboutInView ? 'visible' : 'hidden'}
						>
							Мы специализируемся на экспорте автомобилей из Южной Кореи,
							предлагая широкий выбор моделей с уникальными опциями.
						</motion.p>
					</motion.div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						{[
							{
								icon: <Car className='h-10 w-10 text-red-600 mb-4' />,
								title: 'Широкий выбор',
								description:
									'Разнообразные модели и комплектации автомобилей для любых потребностей',
							},
							{
								icon: <Building2 className='h-10 w-10 text-red-600 mb-4' />,
								title: '3 года опыта',
								description:
									'Стабильная работа и сотни довольных клиентов по всему миру',
							},
							{
								icon: <Shield className='h-10 w-10 text-red-600 mb-4' />,
								title: 'Гарантия качества',
								description:
									'Тщательная проверка каждого автомобиля перед отправкой',
							},
							{
								icon: <Globe className='h-10 w-10 text-red-600 mb-4' />,
								title: 'Международная доставка',
								description: 'Организация доставки в любую точку мира',
							},
						].map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								animate={
									isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
								}
								transition={{
									duration: 0.5,
									delay: 0.15 * index,
									type: 'spring',
									stiffness: 100,
								}}
								whileHover='hover'
								variants={cardVariants}
							>
								<Card className='h-full transition-all duration-300'>
									<CardHeader>
										<motion.div
											initial={{ scale: 1 }}
											animate={{ scale: [1, 1.2, 1] }}
											transition={{
												duration: 0.6,
												delay: 0.3 + 0.1 * index,
												times: [0, 0.5, 1],
											}}
										>
											{item.icon}
										</motion.div>
										<CardTitle>{item.title}</CardTitle>
										<CardDescription>{item.description}</CardDescription>
									</CardHeader>
								</Card>
							</motion.div>
						))}
					</div>

					<motion.div
						className='text-center mt-12'
						initial={{ opacity: 0 }}
						animate={isAboutInView ? { opacity: 1 } : { opacity: 0 }}
						transition={{ duration: 0.5, delay: 0.8 }}
						whileHover={{ scale: 1.05 }}
					>
						<Button asChild variant='outline' className='group'>
							<Link href='/about'>
								Узнать больше о нас
								<motion.div
									animate={{ x: [0, 5, 0] }}
									transition={{
										duration: 1.5,
										repeat: Infinity,
										repeatType: 'loop',
										ease: 'easeInOut',
										times: [0, 0.5, 1],
									}}
								>
									<ChevronRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
								</motion.div>
							</Link>
						</Button>
					</motion.div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20 bg-neutral-100' ref={ctaRef}>
				<div className='container mx-auto px-4'>
					<motion.div
						className='bg-white rounded-lg shadow-lg p-8 md:p-12'
						initial={{ opacity: 0, scale: 0.95 }}
						animate={
							isCtaInView
								? { opacity: 1, scale: 1 }
								: { opacity: 0, scale: 0.95 }
						}
						transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
						whileHover={{ boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.1)' }}
					>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
							<motion.div
								initial={{ opacity: 0, x: -30 }}
								animate={
									isCtaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
								}
								transition={{ duration: 0.6, delay: 0.2 }}
							>
								<motion.h2
									className='text-3xl font-bold mb-4'
									initial={{ opacity: 0, y: 20 }}
									animate={
										isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
									}
									transition={{ duration: 0.4, delay: 0.3 }}
								>
									Готовы найти идеальный автомобиль?
								</motion.h2>
								<motion.p
									className='text-neutral-600 mb-6'
									initial={{ opacity: 0, y: 20 }}
									animate={
										isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
									}
									transition={{ duration: 0.4, delay: 0.4 }}
								>
									Свяжитесь с нами, чтобы получить консультацию и подобрать
									автомобиль, соответствующий вашим требованиям.
								</motion.p>
								<motion.div
									className='flex flex-col sm:flex-row gap-4'
									initial={{ opacity: 0, y: 20 }}
									animate={
										isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
									}
									transition={{ duration: 0.4, delay: 0.5 }}
								>
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Button
											asChild
											className='bg-red-600 hover:bg-red-700 w-full sm:w-auto'
										>
											<Link href='/catalog'>Перейти в каталог</Link>
										</Button>
									</motion.div>
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Button
											asChild
											variant='outline'
											className='w-full sm:w-auto'
										>
											<Link href='/contacts'>Связаться с нами</Link>
										</Button>
									</motion.div>
								</motion.div>
							</motion.div>

							<motion.div
								className='relative h-64 md:h-80 rounded-lg overflow-hidden'
								initial={{ opacity: 0, x: 30 }}
								animate={
									isCtaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
								}
								transition={{ duration: 0.6, delay: 0.4 }}
								whileHover={{ scale: 1.03 }}
							>
								<Image
									src='https://images.unsplash.com/photo-1596741964346-791466b552b6?q=80&w=1933&auto=format&fit=crop'
									alt='Автомобиль из Южной Кореи'
									fill
									className='object-cover transition-transform duration-500 hover:scale-110'
								/>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</section>
		</motion.div>
	)
}
