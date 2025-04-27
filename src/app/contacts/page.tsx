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
	Send,
} from 'lucide-react'

export const metadata: Metadata = {
	title: 'Контакты | D.A.D Motors',
	description:
		'Свяжитесь с компанией D.A.D Motors для получения консультации по экспорту автомобилей из Южной Кореи.',
}

const ContactsPage = () => {
	return (
		<div className='flex flex-col min-h-screen pt-15'>
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
											Сон Денис Олегович
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
												<Send className='h-5 w-5 text-red-600' />
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
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						<div>
							<h3 className='text-xl font-medium mb-4'>Головной офис</h3>
							<div
								className='aspect-video rounded-lg overflow-hidden'
								dangerouslySetInnerHTML={{
									__html: `<div style="font:normal normal 400 12px/normal dotum, sans-serif; width:100%; height:392px; color:#333; position:relative"><div style="height: 360px;"><a href="https://map.kakao.com/?urlX=510630.9999999991&amp;urlY=915816.9999999984&amp;name=%EC%B6%A9%EB%82%A8%20%EC%95%84%EC%82%B0%EC%8B%9C%20%ED%83%95%EC%A0%95%EB%A9%B4%20%EC%9A%A9%EB%91%90%EB%A6%AC%20695&amp;map_type=TYPE_MAP&amp;from=roughmap" target="_blank"><img class="map" src="http://t1.daumcdn.net/roughmap/imgmap/9acbeb2b080b862684c8f286b90b6bcfa0a4a49d531822f03b220a1ad71371c7" width="100%" height="358px" style="border:1px solid #ccc;"></a></div><div style="overflow: hidden; padding: 7px 11px; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 0px 0px 2px 2px; background-color: rgb(249, 249, 249);"><a href="https://map.kakao.com" target="_blank" style="float: left;"><img src="//t1.daumcdn.net/localimg/localimages/07/2018/pc/common/logo_kakaomap.png" width="72" height="16" alt="카카오맵" style="display:block;width:72px;height:16px"></a><div style="float: right; position: relative; top: 1px; font-size: 11px;"><a target="_blank" href="https://map.kakao.com/?from=roughmap&amp;srcid=&amp;confirmid=&amp;q=%EC%B6%A9%EB%82%A8%20%EC%95%84%EC%82%B0%EC%8B%9C%20%ED%83%95%EC%A0%95%EB%A9%B4%20%EC%9A%A9%EB%91%90%EB%A6%AC%20695&amp;rv=on" style="float:left;height:15px;padding-top:1px;line-height:15px;color:#000;text-decoration: none;">로드뷰</a><span style="width: 1px;padding: 0;margin: 0 8px 0 9px;height: 11px;vertical-align: top;position: relative;top: 2px;border-left: 1px solid #d0d0d0;float: left;"></span><a target="_blank" href="https://map.kakao.com/?from=roughmap&amp;eName=%EC%B6%A9%EB%82%A8%20%EC%95%84%EC%82%B0%EC%8B%9C%20%ED%83%95%EC%A0%95%EB%A9%B4%20%EC%9A%A9%EB%91%90%EB%A6%AC%20695&amp;eX=510630.9999999991&amp;eY=915816.9999999984" style="float:left;height:15px;padding-top:1px;line-height:15px;color:#000;text-decoration: none;">길찾기</a></div></div></div>`,
								}}
							/>
							<p className='mt-2 text-sm text-neutral-600'>
								충남 아산시 탕정면 용두리 695
							</p>
						</div>

						<div>
							<h3 className='text-xl font-medium mb-4'>Филиал</h3>
							<div
								className='aspect-video rounded-lg overflow-hidden'
								dangerouslySetInnerHTML={{
									__html: `<div style="font:normal normal 400 12px/normal dotum, sans-serif; width:100%; height:392px; color:#333; position:relative"><div style="height: 360px;"><a href="https://map.kakao.com/?urlX=509842.00000000215&amp;urlY=951888.9999999979&amp;name=%EC%B6%A9%EB%82%A8%20%EC%95%84%EC%82%B0%EC%8B%9C%20%EB%91%94%ED%8F%AC%EB%A9%B4%20%EB%91%94%ED%8F%AC%EB%A1%9C%2092-1&amp;map_type=TYPE_MAP&amp;from=roughmap" target="_blank"><img class="map" src="http://t1.daumcdn.net/roughmap/imgmap/d56e4b18d1639f24c988090c8d415d923cc8e1585da7923876bf6e46fe8f1efa" width="100%" height="358px" style="border:1px solid #ccc;"></a></div><div style="overflow: hidden; padding: 7px 11px; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 0px 0px 2px 2px; background-color: rgb(249, 249, 249);"><a href="https://map.kakao.com" target="_blank" style="float: left;"><img src="//t1.daumcdn.net/localimg/localimages/07/2018/pc/common/logo_kakaomap.png" width="72" height="16" alt="카카오맵" style="display:block;width:72px;height:16px"></a><div style="float: right; position: relative; top: 1px; font-size: 11px;"><a target="_blank" href="https://map.kakao.com/?from=roughmap&amp;srcid=&amp;confirmid=&amp;q=%EC%B6%A9%EB%82%A8%20%EC%95%84%EC%82%B0%EC%8B%9C%20%EB%91%94%ED%8F%AC%EB%A9%B4%20%EB%91%94%ED%8F%AC%EB%A1%9C%2092-1&amp;rv=on" style="float:left;height:15px;padding-top:1px;line-height:15px;color:#000;text-decoration: none;">로드뷰</a><span style="width: 1px;padding: 0;margin: 0 8px 0 9px;height: 11px;vertical-align: top;position: relative;top: 2px;border-left: 1px solid #d0d0d0;float: left;"></span><a target="_blank" href="https://map.kakao.com/?from=roughmap&amp;eName=%EC%B6%A9%EB%82%A8%20%EC%95%84%EC%82%B0%EC%8B%9C%20%EB%91%94%ED%8F%AC%EB%A9%B4%20%EB%91%94%ED%8F%AC%EB%A1%9C%2092-1&amp;eX=509842.00000000215&amp;eY=951888.9999999979" style="float:left;height:15px;padding-top:1px;line-height:15px;color:#000;text-decoration: none;">길찾기</a></div></div></div>`,
								}}
							/>
							<p className='mt-2 text-sm text-neutral-600'>
								충남 아산시 둔포면 둔포로 92-1
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default ContactsPage
