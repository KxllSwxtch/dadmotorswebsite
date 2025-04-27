import { Metadata } from 'next'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	MapPin,
	Phone,
	Mail,
	ExternalLink,
	Instagram,
	Facebook,
	Youtube,
} from 'lucide-react'

export const metadata: Metadata = {
	title: 'Контакты | D.A.D Motors',
	description:
		'Свяжитесь с компанией D.A.D Motors для получения консультации по экспорту автомобилей из Южной Кореи.',
}

const ContactsPage = () => {
	return (
		<div className='flex flex-col min-h-screen'>
			{/* Hero Section */}
			<section className='relative py-20 bg-neutral-900 text-white'>
				<div className='absolute inset-0 z-0'>
					<Image
						src='https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=2070&auto=format&fit=crop'
						alt='Автомобили D.A.D Motors'
						fill
						className='object-cover opacity-30'
					/>
					<div className='absolute inset-0 bg-gradient-to-b from-neutral-900/70 to-neutral-900/90' />
				</div>

				<div className='container mx-auto px-4 relative z-10'>
					<div className='max-w-3xl'>
						<h1 className='text-4xl md:text-5xl font-bold mb-6'>Контакты</h1>
						<p className='text-xl md:text-2xl text-neutral-200'>
							Свяжитесь с нами для получения консультации по экспорту
							автомобилей из Южной Кореи.
						</p>
					</div>
				</div>
			</section>

			{/* Contact Information */}
			<section className='py-20 bg-white'>
				<div className='container mx-auto px-4'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
						{/* Contact Form */}
						<div>
							<h2 className='text-3xl font-bold mb-8'>Свяжитесь с нами</h2>
							<form className='space-y-6'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<Label htmlFor='firstName'>Имя</Label>
										<Input id='firstName' placeholder='Введите ваше имя' />
									</div>
									<div className='space-y-2'>
										<Label htmlFor='lastName'>Фамилия</Label>
										<Input id='lastName' placeholder='Введите вашу фамилию' />
									</div>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='email'>Email</Label>
									<Input
										id='email'
										type='email'
										placeholder='example@example.com'
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='phone'>Телефон</Label>
									<Input id='phone' placeholder='+7 (___) ___-__-__' />
								</div>

								<div className='space-y-2'>
									<Label htmlFor='message'>Сообщение</Label>
									<textarea
										id='message'
										className='w-full min-h-[120px] px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
										placeholder='Опишите, какой автомобиль вас интересует'
									/>
								</div>

								<Button
									type='submit'
									className='w-full bg-red-600 hover:bg-red-700 text-white'
								>
									Отправить сообщение
								</Button>
							</form>
						</div>

						{/* Contact Info */}
						<div className='mt-10 lg:mt-0'>
							<h2 className='text-3xl font-bold mb-8'>Контактная информация</h2>

							<div className='space-y-8'>
								<Card>
									<CardHeader>
										<CardTitle className='flex items-center'>
											<Phone className='h-5 w-5 text-red-600 mr-2' />
											Телефон
										</CardTitle>
									</CardHeader>
									<CardContent>
										<a
											href='tel:+821082336313'
											className='text-lg hover:text-red-600 transition-colors'
										>
											+82 10-8233-6313
										</a>
										<CardDescription className='mt-2'>
											Менеджер: Сон Денис Олегович
										</CardDescription>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className='flex items-center'>
											<Mail className='h-5 w-5 text-red-600 mr-2' />
											Email
										</CardTitle>
									</CardHeader>
									<CardContent>
										<a
											href='mailto:d.a.d.motorskr@gmail.com'
											className='text-lg hover:text-red-600 transition-colors'
										>
											d.a.d.motorskr@gmail.com
										</a>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className='flex items-center'>
											<MapPin className='h-5 w-5 text-red-600 mr-2' />
											Офисы
										</CardTitle>
									</CardHeader>
									<CardContent className='space-y-4'>
										<div>
											<p className='font-medium'>Головной офис:</p>
											<address className='not-italic text-neutral-600'>
												충남 아산시 탕정면 용두리 695
											</address>
										</div>
										<div>
											<p className='font-medium'>Филиал:</p>
											<address className='not-italic text-neutral-600'>
												충남 아산시 둔포면 둔포로 92-1
											</address>
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className='flex items-center'>
											<ExternalLink className='h-5 w-5 text-red-600 mr-2' />
											Социальные сети
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className='flex space-x-4'>
											<a
												href='https://www.instagram.com/dadmotorskr'
												target='_blank'
												rel='noopener noreferrer'
												className='p-2 rounded-full bg-neutral-100 hover:bg-red-100 transition-colors'
												aria-label='Instagram'
											>
												<Instagram className='h-5 w-5 text-red-600' />
											</a>
											<a
												href='https://t.me/dadmotorskr'
												target='_blank'
												rel='noopener noreferrer'
												className='p-2 rounded-full bg-neutral-100 hover:bg-red-100 transition-colors'
												aria-label='Telegram'
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='20'
													height='20'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
													className='lucide text-red-600'
												>
													<path d='M21.73 2.27a2 2 0 0 0-2.83 0L2.27 18.9a2 2 0 0 0 0 2.83 2 2 0 0 0 2.83 0L21.73 5.1a2 2 0 0 0 0-2.83Z' />
													<path d='M8.5 8.5 7 15l6.5-6.5' />
													<path d='M14 14v7h7' />
												</svg>
											</a>
											<a
												href='https://www.facebook.com/share/1AdFZpXoN7/?mibextid=wwXIfr'
												target='_blank'
												rel='noopener noreferrer'
												className='p-2 rounded-full bg-neutral-100 hover:bg-red-100 transition-colors'
												aria-label='Facebook'
											>
												<Facebook className='h-5 w-5 text-red-600' />
											</a>
											<a
												href='https://youtube.com/@dadmotorskr'
												target='_blank'
												rel='noopener noreferrer'
												className='p-2 rounded-full bg-neutral-100 hover:bg-red-100 transition-colors'
												aria-label='YouTube'
											>
												<Youtube className='h-5 w-5 text-red-600' />
											</a>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Map Section */}
			<section className='py-10 bg-neutral-50'>
				<div className='container mx-auto px-4 text-center'>
					<h2 className='text-2xl font-bold mb-8'>Расположение на карте</h2>
					<div className='aspect-video bg-neutral-200 rounded-lg overflow-hidden'>
						{/* Здесь будет карта Google Maps или аналогичный сервис */}
						<div className='w-full h-full flex items-center justify-center'>
							<p className='text-neutral-600'>Карта будет добавлена позже</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default ContactsPage
