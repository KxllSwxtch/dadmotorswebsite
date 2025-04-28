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
import { ChevronRight, Car, Building2, Shield, Globe, Star } from 'lucide-react'
import HeroSection from '@/components/layout/HeroSection'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function Home() {
	const containerRef = useRef(null)
	const aboutRef = useRef(null)
	const ctaRef = useRef(null)
	const videoRef = useRef(null)
	const processRef = useRef(null)
	const testimonialsRef = useRef(null)
	const isAboutInView = useInView(aboutRef, { once: true, amount: 0.3 })
	const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 })
	const isVideoInView = useInView(videoRef, { once: true, amount: 0.3 })
	const isProcessInView = useInView(processRef, { once: true, amount: 0.2 })
	const isTestimonialsInView = useInView(testimonialsRef, {
		once: true,
		amount: 0.2,
	})

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

	// Testimonial slider settings
	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		pauseOnHover: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}

	const testimonials = [
		{
			id: 1,
			name: 'Kia Stinger',
			city: 'Москва',
			period: '2 месяца',
			videoSrc:
				'https://scontent.cdninstagram.com/o1/v/t2/f2/m78/AQOHslgwakJQcVPpTzvXSyLoaN91FJAtEJCZWYglKT4w0AoPAk4qtWHP7vFfhZEDnKKJeK8MMF1ynPt0LCNmYyBHW5XjLmJwOE0BLic.mp4?_nc_cat=106&_nc_oc=AdmnCA6wLd4Z1mGRgXcbk8bRtjUoc6NNab5PR1F9vSHonliTmVJTCFmT9GOKytkUGc3MldiuOfUctqc82JBllXtv&_nc_sid=5e9851&_nc_ht=instagram.fmty5-1.fna.fbcdn.net&_nc_ohc=eeBfThQF33gQ7kNvwHvD2rn&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uU1RPUlkuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MTE5NTkwNTcwMTA4NzgxMywiYXNzZXRfYWdlX2RheXMiOjY1NiwidmlfdXNlY2FzZV9pZCI6MTAxMDAsImR1cmF0aW9uX3MiOjM4LCJ3YXRjaF90aW1lX3MiOjQyLCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&vs=38aa46a8c1bb562d&_nc_vs=HBksFQIYUWlnX3hwdl9wbGFjZW1lbnRfcGVybWFuZW50X3YyLzIwNDcwNTdGNDFEQjRBRTE3MjdFNEE1RUI2ODBBNkI1X3ZpZGVvX2Rhc2hpbml0Lm1wNBUAAsgBABUCGDpwYXNzdGhyb3VnaF9ldmVyc3RvcmUvR0VIY2NCVWJUN3FIXzEwQ0FEX29OWHdqcWFWdWJwa3dBQUFGFQICyAEAKAAYABsCiAd1c2Vfb2lsATEScHJvZ3Jlc3NpdmVfcmVjaXBlATEVAAAmiqn85-_qnwQVAigCQzMsF0BDKp--dsi0GBJkYXNoX2Jhc2VsaW5lXzFfdjERAHXoBwA&_nc_zt=28&oh=00_AfEpwmQ22IMbALPt8XJ8emfds5_1vXVe6wOR2YlUH0Gfmg&oe=6810BDB3',
			imageSrc:
				'https://di-shared-assets.dealerinspire.com/legacy/rackspace/ldm-images/2020-Kia-Stinger-hero.png',
			rating: 5,
		},
		{
			id: 2,
			name: 'Kia Carnival',
			city: 'Санкт-Петербург',
			period: '3 месяца',
			videoSrc:
				'https://instagram.fmty5-2.fna.fbcdn.net/o1/v/t2/f2/m78/AQPMVy3F01Bq6g37xiCpDhpaK9EGsDRBzKuZWgODQ5HcmPyQUzfjgBc6cdL_o6ZVIORc6WfvIlcfUg24WcX-GlmZZWCW-5EkBVDTZnU.mp4?_nc_cat=110&_nc_oc=AdmxJD4in28WUoPebUivXcCV03qnBPDQg6wmiKNet8oeWhW_3DNXlu72Lb_k4rmVpZQfy9ga7nHgc3Y0XZIN7KJd&_nc_sid=5e9851&_nc_ht=instagram.fmty5-2.fna.fbcdn.net&_nc_ohc=QmtP0qi5zrAQ7kNvwHyUjUo&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uU1RPUlkuQzMuNDgwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MTA5NDEwMjgyNTExNTExMiwiYXNzZXRfYWdlX2RheXMiOjQ1NCwidmlfdXNlY2FzZV9pZCI6MTAxMDAsImR1cmF0aW9uX3MiOjU5LCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&vs=ee28e286e9f7c16d&_nc_vs=HBksFQIYUWlnX3hwdl9wbGFjZW1lbnRfcGVybWFuZW50X3YyL0JENDcyNUVDMkE4NkEzNzcwNEEzRTFGOEE4QTQ4QThFX3ZpZGVvX2Rhc2hpbml0Lm1wNBUAAsgBABUCGDpwYXNzdGhyb3VnaF9ldmVyc3RvcmUvR0l4Nk5SblZGOTJGTzhvREFLd1FZMmVjU0JBaGJwa3dBQUFGFQICyAEAKAAYABsCiAd1c2Vfb2lsATEScHJvZ3Jlc3NpdmVfcmVjaXBlATEVAAAm0Pfoo5XF8QMVAigCQzMsF0BN6NT987ZGGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHXoBwA&_nc_zt=28&oh=00_AfGPoQ9xY3FghjFwwHaIQD-R-krQDsW5hO2mTTz5IQvWGQ&oe=6810A773',
			imageSrc:
				'https://www.kia.com/content/dam/kwcms/gt/en/images/showroom/Carnival-Ka4-22my-RHD/Features/360vr/EXT/01-Snow-White-Pearl-SWP/60.png',
			rating: 5,
		},
		{
			id: 3,
			name: 'Kia Mohave',
			city: 'Екатеринбург',
			period: '2.5 месяца',
			videoSrc:
				'https://scontent.cdninstagram.com/o1/v/t2/f2/m78/AQNmRFK7UW16PS4e7MRndjveDyKVSt21bnWck2CM-3uVLmbKbULPDryDx-DWIux-lkv8120XAIdvgJu8Yk0J012HHaTgE4_O75CizCA.mp4?_nc_cat=101&_nc_oc=AdmX4Ado8WcMX7SW3TpzRMO-RfZt16zRyTdUGEt_KwLeijOtSB2rb4M5eQ-5ETeyuJ-dF5o8nwsA2FtVpIFsKWAF&_nc_sid=5e9851&_nc_ht=instagram.fmty5-1.fna.fbcdn.net&_nc_ohc=rcLGdt0AHP8Q7kNvwENFQcB&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uU1RPUlkuQzMuNDgwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MTE3NjQzMjExMDAwMjc4OSwiYXNzZXRfYWdlX2RheXMiOjQ1NCwidmlfdXNlY2FzZV9pZCI6MTAxMDAsImR1cmF0aW9uX3MiOjIxLCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&vs=44fbfbe7849c7931&_nc_vs=HBksFQIYUWlnX3hwdl9wbGFjZW1lbnRfcGVybWFuZW50X3YyL0FFNDI1NDg3RjE2QUVCMjAxMDdCNjRDMTA1QTg1NTg2X3ZpZGVvX2Rhc2hpbml0Lm1wNBUAAsgBABUCGDpwYXNzdGhyb3VnaF9ldmVyc3RvcmUvR0p5QkVobUZ0bmpwSnFNQ0FQN0txSDhaNnRnZWJwa3dBQUFGFQICyAEAKAAYABsCiAd1c2Vfb2lsATEScHJvZ3Jlc3NpdmVfcmVjaXBlATEVAAAmyomnoK79lgQVAigCQzMsF0A1UOVgQYk3GBJkYXNoX2Jhc2VsaW5lXzFfdjERAHXoBwA&_nc_zt=28&oh=00_AfFqWp_Osb7BjwZWp-kSHLYHwfFZYiq17jx-AT4vsyre8A&oe=6810ACE2',
			imageSrc:
				'https://www.waynephilliskia.com.au/media-files/page-builder/content-pieces/4768d63d-ce91-4ca2-a62a-d1021f20b445/image.jpg',
			rating: 5,
		},
		{
			id: 5,
			name: 'Genesis G80',
			city: 'Казань',
			period: '1.5 месяца',
			videoSrc:
				'https://scontent.cdninstagram.com/o1/v/t2/f2/m78/AQNZ-2D7gCfan4D_QLl_oHk_WbqGpnf4ZyZbg-JzfOfWIhG84Fyx58ZYPzQRRxWO-ZXnICeECglJwDCe0vG4urqFxSvtH4_mNy7nacs.mp4?_nc_cat=110&_nc_oc=Adl0gP4MttHfl_I3siIBSVFPodX8WcCRS-iQzMFx3eV_pzkxW4FMqfx1AB_1ZZFO1bqce4z99L2xaMDJP3zb_ZqS&_nc_sid=5e9851&_nc_ht=instagram.fmty5-2.fna.fbcdn.net&_nc_ohc=7MHG9fj30rAQ7kNvwGrINHx&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uU1RPUlkuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MjIyNDc0MDU3NTI2Mzk0LCJhc3NldF9hZ2VfZGF5cyI6NDUxLCJ2aV91c2VjYXNlX2lkIjoxMDEwMCwiZHVyYXRpb25fcyI6MTUsInVybGdlbl9zb3VyY2UiOiJ3d3cifQ%3D%3D&ccb=17-1&vs=49dd6b448d8e7562&_nc_vs=HBksFQIYUWlnX3hwdl9wbGFjZW1lbnRfcGVybWFuZW50X3YyL0JDNDE5RDk4M0MxNkVGMUNGM0VEMjk5RTJGOUNFQzk3X3ZpZGVvX2Rhc2hpbml0Lm1wNBUAAsgBABUCGDpwYXNzdGhyb3VnaF9ldmVyc3RvcmUvR0piNU5obXp5LVdaOXRrQ0FKSWxqeFEtWWtGa2Jwa3dBQUFGFQICyAEAKAAYABsCiAd1c2Vfb2lsATEScHJvZ3Jlc3NpdmVfcmVjaXBlATEVAAAm9LHd8tiVZRUCKAJDMywXQC4AAAAAAAAYEmRhc2hfYmFzZWxpbmVfMV92MREAdegHAA&_nc_zt=28&oh=00_AfHCqw6Ezp81KYIboqZGQ0PVZGmB2nyDh6shw9NFW-ZJLQ&oe=6810956B',
			imageSrc:
				'https://www.genesis.com/content/dam/genesis-p2/kr/assets/models/g80/24fl/color/genesis-kr-g80-facelift-standard-color-glossy-tasman-blue-small.png',
			rating: 5,
		},
	]

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

			{/* YouTube Video Section */}
			<section
				className='py-20 relative overflow-hidden bg-gradient-to-r from-black to-red-900'
				ref={videoRef}
			>
				<motion.div
					className='absolute inset-0 z-0'
					initial={{ opacity: 0 }}
					animate={isVideoInView ? { opacity: 0.2 } : { opacity: 0 }}
					transition={{ duration: 0.8 }}
				>
					<div className="absolute inset-0 bg-[url('/car-pattern.svg')] opacity-10 bg-repeat"></div>
				</motion.div>

				<div className='container mx-auto px-4 relative z-10 mt-20'>
					<motion.div
						className='text-center mb-10'
						initial={{ opacity: 0, y: 30 }}
						animate={
							isVideoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
						}
						transition={{ duration: 0.7 }}
					>
						<motion.h2
							className='text-3xl md:text-5xl font-bold mb-4 text-white'
							initial={{ opacity: 0, y: 20 }}
							animate={
								isVideoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.7, delay: 0.2 }}
						>
							Авторынок Кореи: Лучшие цены
						</motion.h2>
						<motion.p
							className='text-lg text-gray-200 max-w-3xl mx-auto'
							initial={{ opacity: 0, y: 20 }}
							animate={
								isVideoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.7, delay: 0.3 }}
						>
							Узнайте все о ценах на автомобили из Кореи с учетом доставки и
							расходов
						</motion.p>
					</motion.div>

					<motion.div
						className='relative max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl'
						initial={{ opacity: 0, scale: 0.9 }}
						animate={
							isVideoInView
								? { opacity: 1, scale: 1 }
								: { opacity: 0, scale: 0.9 }
						}
						transition={{
							duration: 0.8,
							delay: 0.4,
							type: 'spring',
							stiffness: 100,
						}}
						whileHover={{
							scale: 1.02,
							boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
						}}
					>
						<div className='relative pb-[56.25%] h-0'>
							<iframe
								className='absolute top-0 left-0 w-full h-full'
								src='https://www.youtube.com/embed/f5O7NCIdcis?autoplay=0&rel=0'
								title='Цены на Авто из Кореи с Учетом Доставки и Всех Расходов в РФ'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen
							></iframe>
						</div>

						<motion.div
							className='absolute -bottom-2 -right-2 bg-red-600 text-white px-4 py-2 rounded-tl-lg shadow-lg'
							initial={{ x: 100, opacity: 0 }}
							animate={
								isVideoInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }
							}
							transition={{ duration: 0.5, delay: 0.9 }}
						>
							<span className='font-medium'>10:02</span>
						</motion.div>
					</motion.div>

					<motion.div
						className='text-center mt-10'
						initial={{ opacity: 0, y: 20 }}
						animate={
							isVideoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.7, delay: 0.7 }}
					>
						<Button
							asChild
							className='bg-red-600 hover:bg-red-700 text-white px-6 py-3'
							variant='default'
						>
							<Link href='/catalog'>
								Посмотреть наш каталог автомобилей
								<ChevronRight className='ml-2 h-5 w-5' />
							</Link>
						</Button>
					</motion.div>
				</div>
			</section>

			{/* About Section */}
			<section className='pb-20 mt-16 md:py-40 bg-white' ref={aboutRef}>
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

			{/* Process Section */}
			<section className='py-20 mt-16 bg-gray-50' ref={processRef}>
				<div className='container mx-auto px-4'>
					<motion.div
						className='text-center mb-16'
						initial={{ opacity: 0, y: 30 }}
						animate={
							isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
						}
						transition={{ duration: 0.6 }}
					>
						<motion.h2
							className='text-3xl md:text-4xl font-bold mb-4'
							initial={{ opacity: 0, y: 20 }}
							animate={
								isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							Процесс покупки авто
						</motion.h2>
						<motion.p
							className='text-lg text-neutral-600 max-w-3xl mx-auto'
							initial={{ opacity: 0, y: 20 }}
							animate={
								isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							Простые шаги к приобретению автомобиля из Южной Кореи
						</motion.p>
					</motion.div>

					<div className='hidden md:block relative mb-16'>
						<motion.div
							className='absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0'
							initial={{ scaleX: 0 }}
							animate={isProcessInView ? { scaleX: 1 } : { scaleX: 0 }}
							transition={{ duration: 0.8, delay: 0.3 }}
						></motion.div>

						<div className='relative z-10 grid grid-cols-5 gap-4'>
							{[
								{
									icon: '📋',
									step: 1,
									title: 'Оставляете заявку',
									description: 'Заполняете форму или связываетесь с нами',
								},
								{
									icon: '🚗',
									step: 2,
									title: 'Мы подбираем авто',
									description:
										'Предлагаем оптимальные варианты по вашим критериям',
								},
								{
									icon: '📝',
									step: 3,
									title: 'Вы утверждаете покупку',
									description: 'Заключаем договор и согласовываем условия',
								},
								{
									icon: '✈️',
									step: 4,
									title: 'Доставка и оформление',
									description:
										'Организуем транспортировку и таможенное оформление',
								},
								{
									icon: '🔑',
									step: 5,
									title: 'Вы получаете авто в РФ',
									description: 'Передаем вам ключи от вашего автомобиля',
								},
							].map((item, index) => (
								<motion.div
									key={index}
									className='flex flex-col items-center'
									initial={{ opacity: 0, y: 30 }}
									animate={
										isProcessInView
											? { opacity: 1, y: 0 }
											: { opacity: 0, y: 30 }
									}
									transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
								>
									<motion.div
										className='w-14 h-14 rounded-full bg-white border-4 border-red-600 flex items-center justify-center text-xl font-bold mb-4 z-10'
										initial={{ scale: 0 }}
										animate={isProcessInView ? { scale: 1 } : { scale: 0 }}
										transition={{
											type: 'spring',
											stiffness: 200,
											delay: 0.6 + index * 0.15,
										}}
									>
										<span>{item.step}</span>
									</motion.div>
									<motion.div
										className='text-center'
										initial={{ opacity: 0 }}
										animate={isProcessInView ? { opacity: 1 } : { opacity: 0 }}
										transition={{ duration: 0.4, delay: 0.7 + index * 0.15 }}
									>
										<div className='text-3xl mb-2'>{item.icon}</div>
										<h3 className='font-bold mb-1'>{item.title}</h3>
										<p className='text-sm text-gray-600'>{item.description}</p>
									</motion.div>
								</motion.div>
							))}
						</div>
					</div>

					{/* Mobile version */}
					<div className='md:hidden'>
						{[
							{
								icon: '📋',
								step: 1,
								title: 'Оставляете заявку',
								description: 'Заполняете форму или связываетесь с нами',
							},
							{
								icon: '🚗',
								step: 2,
								title: 'Мы подбираем авто',
								description:
									'Предлагаем оптимальные варианты по вашим критериям',
							},
							{
								icon: '📝',
								step: 3,
								title: 'Вы утверждаете покупку',
								description: 'Заключаем договор и согласовываем условия',
							},
							{
								icon: '✈️',
								step: 4,
								title: 'Доставка и оформление',
								description:
									'Организуем транспортировку и таможенное оформление',
							},
							{
								icon: '🔑',
								step: 5,
								title: 'Вы получаете авто в РФ',
								description: 'Передаем вам ключи от вашего автомобиля',
							},
						].map((item, index) => (
							<motion.div
								key={index}
								className='flex items-start mb-8 last:mb-0'
								initial={{ opacity: 0, x: -20 }}
								animate={
									isProcessInView
										? { opacity: 1, x: 0 }
										: { opacity: 0, x: -20 }
								}
								transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
							>
								<div className='flex-shrink-0 mr-4'>
									<div className='w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold'>
										{item.step}
									</div>
								</div>
								<div>
									<div className='text-2xl mb-1'>{item.icon}</div>
									<h3 className='font-bold mb-1'>{item.title}</h3>
									<p className='text-sm text-gray-600'>{item.description}</p>
								</div>
							</motion.div>
						))}
					</div>

					<motion.div
						className='text-center mt-12'
						initial={{ opacity: 0, y: 20 }}
						animate={
							isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5, delay: 1.2 }}
					>
						<Button asChild className='bg-red-600 hover:bg-red-700 text-white'>
							<Link href='/contacts'>
								Оставить заявку
								<ChevronRight className='ml-2 h-4 w-4' />
							</Link>
						</Button>
					</motion.div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className='py-20 mt-16 bg-white' ref={testimonialsRef}>
				<div className='container mx-auto px-4'>
					<motion.div
						className='text-center mb-16'
						initial={{ opacity: 0, y: 30 }}
						animate={
							isTestimonialsInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 30 }
						}
						transition={{ duration: 0.6 }}
					>
						<motion.h2
							className='text-3xl md:text-4xl font-bold mb-4'
							initial={{ opacity: 0, y: 20 }}
							animate={
								isTestimonialsInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							Наши довольные клиенты
						</motion.h2>
						<motion.p
							className='text-lg text-neutral-600 max-w-3xl mx-auto'
							initial={{ opacity: 0, y: 20 }}
							animate={
								isTestimonialsInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							Посмотрите настоящие истории наших клиентов, которые уже получили
							свои автомобили
						</motion.p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={
							isTestimonialsInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 40 }
						}
						transition={{ duration: 0.8, delay: 0.3 }}
						className='slider-container px-6 md:px-12'
					>
						<Slider {...sliderSettings}>
							{testimonials.map((testimonial) => (
								<div key={testimonial.id} className='px-2 py-4'>
									<motion.div
										className='bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col'
										whileHover={{
											scale: 1.03,
											boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.15)',
										}}
										transition={{ duration: 0.3 }}
									>
										<div className='relative aspect-[16/10] bg-gray-50'>
											{testimonial.videoSrc ? (
												<video
													src={testimonial.videoSrc}
													className='w-full h-full object-cover'
													autoPlay
													muted
													loop
													playsInline
													preload='auto'
												/>
											) : (
												<Image
													src={testimonial.imageSrc}
													alt={testimonial.name}
													fill
													className='object-contain p-2'
												/>
											)}
										</div>
										<div className='p-6 flex-grow bg-white'>
											<div className='flex items-center mb-3'>
												{[...Array(testimonial.rating)].map((_, i) => (
													<Star
														key={i}
														className='h-5 w-5 fill-yellow-400 text-yellow-400'
													/>
												))}
											</div>
											<h3 className='font-bold text-xl mb-2 text-gray-800'>
												{testimonial.name}
											</h3>
											<p className='text-neutral-600 text-sm mb-2'>
												Город:{' '}
												<span className='font-medium'>{testimonial.city}</span>
											</p>
											<p className='text-neutral-600 text-sm'>
												Срок доставки:{' '}
												<span className='font-medium'>
													{testimonial.period}
												</span>
											</p>
										</div>
									</motion.div>
								</div>
							))}
						</Slider>
					</motion.div>

					<motion.div
						className='text-center mt-12'
						initial={{ opacity: 0, y: 20 }}
						animate={
							isTestimonialsInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5, delay: 0.8 }}
					>
						<Button asChild className='bg-red-600 hover:bg-red-700 text-white'>
							<Link href='/contacts'>
								Стать нашим клиентом
								<ChevronRight className='ml-2 h-4 w-4' />
							</Link>
						</Button>
					</motion.div>
				</div>
			</section>

			{/* CTA Section */}
			<section
				className='py-24 bg-gradient-to-r from-gray-100 to-gray-200 relative overflow-hidden'
				ref={ctaRef}
			>
				<div className='absolute inset-0 bg-opacity-5 overflow-hidden'>
					<div className='absolute h-[200%] w-[200%] -rotate-12 -left-[50%] -top-[150%] bg-red-600 opacity-5'></div>
				</div>
				<div className='container mx-auto px-4 relative z-10'>
					<motion.div
						className='bg-white rounded-2xl shadow-xl overflow-hidden'
						initial={{ opacity: 0, scale: 0.95 }}
						animate={
							isCtaInView
								? { opacity: 1, scale: 1 }
								: { opacity: 0, scale: 0.95 }
						}
						transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
						whileHover={{ boxShadow: '0px 25px 50px rgba(0, 0, 0, 0.15)' }}
					>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch'>
							<motion.div
								className='p-8 md:p-12 lg:p-16 flex flex-col justify-center'
								initial={{ opacity: 0, x: -30 }}
								animate={
									isCtaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
								}
								transition={{ duration: 0.6, delay: 0.2 }}
							>
								<motion.h2
									className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight'
									initial={{ opacity: 0, y: 20 }}
									animate={
										isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
									}
									transition={{ duration: 0.4, delay: 0.3 }}
								>
									Готовы отправиться в путь на своём идеальном автомобиле?
								</motion.h2>
								<motion.p
									className='text-lg text-gray-700 mb-6'
									initial={{ opacity: 0, y: 20 }}
									animate={
										isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
									}
									transition={{ duration: 0.4, delay: 0.4 }}
								>
									Подберем для вас лучший вариант за 24 часа! Эксклюзивные
									модели и специальные условия для наших клиентов.
								</motion.p>
								<motion.div
									className='flex flex-col sm:flex-row gap-5 mt-4'
									initial={{ opacity: 0, y: 20 }}
									animate={
										isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
									}
									transition={{ duration: 0.4, delay: 0.5 }}
								>
									<motion.div
										whileHover={{ scale: 1.05, y: -5 }}
										whileTap={{ scale: 0.95 }}
										transition={{ type: 'spring', stiffness: 400 }}
									>
										<Button
											asChild
											className='bg-red-600 hover:bg-red-700 w-full sm:w-auto text-lg py-6 px-8 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-red-600/25'
										>
											<Link href='/catalog'>Выбрать автомобиль</Link>
										</Button>
									</motion.div>
									<motion.div
										whileHover={{ scale: 1.05, y: -5 }}
										whileTap={{ scale: 0.95 }}
										transition={{ type: 'spring', stiffness: 400 }}
									>
										<Button
											asChild
											variant='outline'
											className='w-full sm:w-auto text-lg py-6 px-8 rounded-xl font-medium border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300'
										>
											<Link href='/contacts'>Получить консультацию</Link>
										</Button>
									</motion.div>
								</motion.div>
							</motion.div>

							<motion.div
								className='relative h-96 md:h-auto overflow-hidden'
								initial={{ opacity: 0, scale: 0.9 }}
								animate={
									isCtaInView
										? { opacity: 1, scale: 1 }
										: { opacity: 0, scale: 0.9 }
								}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								<Image
									src='https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2564&auto=format&fit=crop'
									alt='Динамичный автомобиль на дороге'
									fill
									className='object-cover transition-transform duration-700 hover:scale-110'
									priority
								/>
								<div className='absolute inset-0 bg-gradient-to-r from-black/20 to-transparent'></div>
								<motion.div
									className='absolute bottom-8 left-8 text-white text-xl font-bold bg-red-600 rounded-lg py-2 px-4'
									initial={{ opacity: 0, x: 20 }}
									animate={
										isCtaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
									}
									transition={{ duration: 0.4, delay: 0.8 }}
								>
									Доставим за 2-3 месяца
								</motion.div>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</section>
		</motion.div>
	)
}
