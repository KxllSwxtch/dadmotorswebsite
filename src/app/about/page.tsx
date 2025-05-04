import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin, Users, Clock, Truck } from 'lucide-react'

export const metadata = {
	title: 'О нас | D.A.D Motors',
	description:
		'D.A.D Motors - компания с 3-летним опытом экспорта автомобилей из Южной Кореи на международные рынки.',
}

export default function AboutPage() {
	return (
		<div className='flex flex-col min-h-screen pt-15'>
			{/* Hero Section */}
			<section className='relative py-20 bg-neutral-900 text-white'>
				<div className='absolute inset-0 z-0'>
					<Image
						src='/images/palisade.png'
						alt='Команда D.A.D Motors'
						fill
						className='object-cover opacity-30'
					/>
					<div className='absolute inset-0 bg-gradient-to-b from-neutral-900/70 to-neutral-900/90' />
				</div>

				<div className='container mx-auto px-4 relative z-10'>
					<div className='max-w-3xl'>
						<h1 className='text-4xl md:text-5xl font-bold mb-6'>
							О компании D.A.D Motors
						</h1>
						<p className='text-xl md:text-2xl text-neutral-200 mb-8'>
							Мы компания, занимающаяся экспортом автомобилей из Южной Кореи.
							C 2022 года активно экспортируем свою продукцию на
							различные рынки.
						</p>
					</div>
				</div>
			</section>

			{/* Company Story */}
			<section className='py-20 bg-white'>
				<div className='container mx-auto px-4'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
						<div>
							<h2 className='text-3xl font-bold mb-6'>Наша История</h2>
							<p className='text-neutral-600 mb-4'>
								D.A.D Motors была основана с целью предоставления клиентам по
								всему миру доступа к качественным автомобилям из Южной Кореи. Мы
								начали свою деятельность в 2022 году и за это время создали
								надежную сеть партнеров и наработали опыт в экспорте
								автомобилей.
							</p>
							<p className='text-neutral-600 mb-4'>
								Мы стремимся удовлетворить потребности и предпочтения клиентов,
								предлагая разнообразные модели и опции. Наша команда
								профессионалов тщательно подбирает каждый автомобиль, гарантируя
								его качество и надежность.
							</p>
							<p className='text-neutral-600'>
								D.A.D Motors продолжает развиваться на международном рынке и
								устанавливает стабильные партнерские отношения с различными
								странами, продолжая экспортировать свою продукцию и укреплять
								свою позицию на рынке автомобилей.
							</p>
						</div>
						<div className='relative h-80 md:h-96 rounded-lg overflow-hidden'>
							<Image
								src='/images/palisade.png'
								alt='Автомобиль из Южной Кореи'
								fill
								className='object-cover'
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Our Advantages */}
			<section className='py-20 bg-neutral-50'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl font-bold mb-4'>Наши преимущества</h2>
						<p className='text-neutral-600 max-w-3xl mx-auto'>
							Мы предлагаем комплексный подход к экспорту автомобилей,
							обеспечивая высокое качество продукции и обслуживания на каждом
							этапе.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						<div className='bg-white p-6 rounded-lg shadow-sm'>
							<div className='bg-red-100 p-3 rounded-full w-fit mb-4'>
								<Users className='h-6 w-6 text-red-600' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>Опытная команда</h3>
							<p className='text-neutral-600'>
								Наши специалисты имеют богатый опыт в автомобильной индустрии и
								экспорте
							</p>
						</div>

						<div className='bg-white p-6 rounded-lg shadow-sm'>
							<div className='bg-red-100 p-3 rounded-full w-fit mb-4'>
								<Clock className='h-6 w-6 text-red-600' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>3 года на рынке</h3>
							<p className='text-neutral-600'>
								Стабильная работа и положительная репутация на международном
								рынке
							</p>
						</div>

						<div className='bg-white p-6 rounded-lg shadow-sm'>
							<div className='bg-red-100 p-3 rounded-full w-fit mb-4'>
								<Truck className='h-6 w-6 text-red-600' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>Полный цикл</h3>
							<p className='text-neutral-600'>
								От подбора автомобиля до доставки в пункт назначения
							</p>
						</div>

						<div className='bg-white p-6 rounded-lg shadow-sm'>
							<div className='bg-red-100 p-3 rounded-full w-fit mb-4'>
								<MapPin className='h-6 w-6 text-red-600' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>
								Удобное расположение
							</h3>
							<p className='text-neutral-600'>
								Офисы в стратегически важных районах Южной Кореи
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Offices */}
			<section className='py-20 bg-white'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl font-bold mb-4'>Наши офисы</h2>
						<p className='text-neutral-600 max-w-3xl mx-auto'>
							D.A.D Motors располагает представительствами в ключевых регионах
							Южной Кореи, что позволяет нам эффективно организовывать экспорт
							автомобилей.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<div className='bg-neutral-50 p-6 rounded-lg'>
							<h3 className='text-xl font-semibold flex items-center mb-4'>
								<MapPin className='h-5 w-5 text-red-600 mr-2' />
								Головной офис
							</h3>
							<address className='text-neutral-600 not-italic mb-4'>
								충남 아산시 탕정면 용두리 695
							</address>
						</div>

						<div className='bg-neutral-50 p-6 rounded-lg'>
							<h3 className='text-xl font-semibold flex items-center mb-4'>
								<MapPin className='h-5 w-5 text-red-600 mr-2' />
								Филиал
							</h3>
							<address className='text-neutral-600 not-italic mb-4'>
								충남 아산시 둔포면 둔포로 92-1
							</address>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className='py-20 bg-neutral-900 text-white'>
				<div className='container mx-auto px-4 text-center'>
					<h2 className='text-3xl font-bold mb-6'>
						Готовы начать сотрудничество?
					</h2>
					<p className='text-xl text-neutral-300 mb-8 max-w-2xl mx-auto'>
						Свяжитесь с нами, чтобы получить консультацию и узнать больше о
						наших услугах по экспорту автомобилей из Южной Кореи.
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
							className='text-black border-white'
						>
							<Link href='/contacts'>Связаться с нами</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	)
}
