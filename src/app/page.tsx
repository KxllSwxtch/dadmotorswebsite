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

export default function Home() {
	return (
		<div className='flex flex-col min-h-screen'>
			{/* Hero Section */}
			<section className='relative h-[80vh] flex items-center justify-center bg-neutral-900 text-white overflow-hidden'>
				<div className='absolute inset-0 z-0'>
					<Image
						src='https://images.unsplash.com/photo-1590213845463-c96fa7de3ba7?q=80&w=2070&auto=format&fit=crop'
						alt='Автомобили из Южной Кореи'
						fill
						priority
						className='object-cover opacity-50'
					/>
					<div className='absolute inset-0 bg-gradient-to-b from-neutral-900/70 to-neutral-900/90' />
				</div>

				<div className='container mx-auto px-4 relative z-10 text-center'>
					<h1 className='text-4xl md:text-6xl font-bold mb-6'>
						Автомобили из Южной Кореи
					</h1>
					<p className='text-xl md:text-2xl mb-8 max-w-3xl mx-auto'>
						D.A.D Motors — ваш надежный партнер в экспорте качественных
						автомобилей из Южной Кореи по выгодным ценам.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button
							asChild
							size='lg'
							className='bg-red-600 hover:bg-red-700 text-white'
						>
							<Link href='/catalog'>Перейти в каталог</Link>
						</Button>
						<Button
							asChild
							size='lg'
							variant='outline'
							className='text-white border-white hover:bg-white/10'
						>
							<Link href='/contacts'>Связаться с нами</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section className='py-20 bg-white'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
							О компании D.A.D Motors
						</h2>
						<p className='text-lg text-neutral-600 max-w-3xl mx-auto'>
							Мы специализируемся на экспорте автомобилей из Южной Кореи,
							предлагая широкий выбор моделей с уникальными опциями.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						<Card>
							<CardHeader>
								<Car className='h-10 w-10 text-red-600 mb-4' />
								<CardTitle>Широкий выбор</CardTitle>
								<CardDescription>
									Разнообразные модели и комплектации автомобилей для любых
									потребностей
								</CardDescription>
							</CardHeader>
						</Card>

						<Card>
							<CardHeader>
								<Building2 className='h-10 w-10 text-red-600 mb-4' />
								<CardTitle>3 года опыта</CardTitle>
								<CardDescription>
									Стабильная работа и сотни довольных клиентов по всему миру
								</CardDescription>
							</CardHeader>
						</Card>

						<Card>
							<CardHeader>
								<Shield className='h-10 w-10 text-red-600 mb-4' />
								<CardTitle>Гарантия качества</CardTitle>
								<CardDescription>
									Тщательная проверка каждого автомобиля перед отправкой
								</CardDescription>
							</CardHeader>
						</Card>

						<Card>
							<CardHeader>
								<Globe className='h-10 w-10 text-red-600 mb-4' />
								<CardTitle>Международная доставка</CardTitle>
								<CardDescription>
									Организация доставки в любую точку мира
								</CardDescription>
							</CardHeader>
						</Card>
					</div>

					<div className='text-center mt-12'>
						<Button asChild variant='outline' className='group'>
							<Link href='/about'>
								Узнать больше о нас
								<ChevronRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20 bg-neutral-100'>
				<div className='container mx-auto px-4'>
					<div className='bg-white rounded-lg shadow-lg p-8 md:p-12'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
							<div>
								<h2 className='text-3xl font-bold mb-4'>
									Готовы найти идеальный автомобиль?
								</h2>
								<p className='text-neutral-600 mb-6'>
									Свяжитесь с нами, чтобы получить консультацию и подобрать
									автомобиль, соответствующий вашим требованиям.
								</p>
								<div className='flex flex-col sm:flex-row gap-4'>
									<Button asChild className='bg-red-600 hover:bg-red-700'>
										<Link href='/catalog'>Перейти в каталог</Link>
									</Button>
									<Button asChild variant='outline'>
										<Link href='/contacts'>Связаться с нами</Link>
									</Button>
								</div>
							</div>

							<div className='relative h-64 md:h-80 rounded-lg overflow-hidden'>
								<Image
									src='https://images.unsplash.com/photo-1596741964346-791466b552b6?q=80&w=1933&auto=format&fit=crop'
									alt='Автомобиль из Южной Кореи'
									fill
									className='object-cover'
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
