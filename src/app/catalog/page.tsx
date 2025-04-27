import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
	title: 'Каталог автомобилей | D.A.D Motors',
	description:
		'Широкий выбор автомобилей из Южной Кореи от компании D.A.D Motors. Подберите оптимальный вариант для своих потребностей.',
}

export default function CatalogPage() {
	return (
		<div className='flex flex-col min-h-screen'>
			{/* Hero Section */}
			<section className='relative py-20 bg-neutral-900 text-white'>
				<div className='absolute inset-0 z-0'>
					<Image
						src='https://images.unsplash.com/photo-1596741964346-791466b552b6?q=80&w=1933&auto=format&fit=crop'
						alt='Каталог автомобилей D.A.D Motors'
						fill
						className='object-cover opacity-30'
					/>
					<div className='absolute inset-0 bg-gradient-to-b from-neutral-900/70 to-neutral-900/90' />
				</div>

				<div className='container mx-auto px-4 relative z-10'>
					<div className='max-w-3xl'>
						<h1 className='text-4xl md:text-5xl font-bold mb-6'>
							Каталог автомобилей
						</h1>
						<p className='text-xl md:text-2xl text-neutral-200'>
							Широкий выбор автомобилей из Южной Кореи для любых потребностей.
						</p>
					</div>
				</div>
			</section>

			{/* Catalog Section */}
			<section className='py-20 bg-white'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl font-bold mb-4'>Наши автомобили</h2>
						<p className='text-lg text-neutral-600 max-w-3xl mx-auto'>
							Здесь будет располагаться компонент каталога с возможностью
							фильтрации и просмотра детальной информации об автомобилях.
						</p>
					</div>

					{/* Заглушка для компонента каталога */}
					<div className='bg-neutral-100 p-12 rounded-lg text-center'>
						<p className='text-neutral-500 text-xl'>
							Компонент каталога будет добавлен позже
						</p>
					</div>
				</div>
			</section>
		</div>
	)
}
