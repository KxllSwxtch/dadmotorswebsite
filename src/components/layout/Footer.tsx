import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Youtube } from 'lucide-react'

const socialLinks = [
	{
		name: 'Instagram',
		href: 'https://www.instagram.com/dadmotorskr',
		icon: Instagram,
	},
	{
		name: 'Telegram',
		href: 'https://t.me/dadmotorskr',
		icon: () => (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='lucide'
			>
				<path d='M21.73 2.27a2 2 0 0 0-2.83 0L2.27 18.9a2 2 0 0 0 0 2.83 2 2 0 0 0 2.83 0L21.73 5.1a2 2 0 0 0 0-2.83Z' />
				<path d='M8.5 8.5 7 15l6.5-6.5' />
				<path d='M14 14v7h7' />
			</svg>
		),
	},
	{
		name: 'Facebook',
		href: 'https://www.facebook.com/share/1AdFZpXoN7/?mibextid=wwXIfr',
		icon: Facebook,
	},
	{
		name: 'YouTube',
		href: 'https://youtube.com/@dadmotorskr',
		icon: Youtube,
	},
]

const Footer = () => {
	return (
		<footer className='bg-neutral-900 text-white py-12'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					<div>
						<Link href='/' className='inline-block mb-4'>
							<Image
								src='https://res.cloudinary.com/dt0nkqowc/image/upload/v1745713474/DAD%20Motors/logo_c92rcj.png'
								alt='D.A.D Motors'
								width={120}
								height={50}
								className='h-10 w-auto'
							/>
						</Link>
						<p className='text-neutral-400 text-sm mt-4'>
							Экспорт автомобилей из Южной Кореи на международные рынки уже
							более 3 лет.
						</p>
					</div>

					<div>
						<h3 className='font-semibold text-lg mb-4'>Навигация</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/'
									className='text-neutral-400 hover:text-white transition-colors'
								>
									Главная
								</Link>
							</li>
							<li>
								<Link
									href='/about'
									className='text-neutral-400 hover:text-white transition-colors'
								>
									О нас
								</Link>
							</li>
							<li>
								<Link
									href='/catalog'
									className='text-neutral-400 hover:text-white transition-colors'
								>
									Каталог
								</Link>
							</li>
							<li>
								<Link
									href='/contacts'
									className='text-neutral-400 hover:text-white transition-colors'
								>
									Контакты
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-lg mb-4'>Контакты</h3>
						<ul className='space-y-2'>
							<li className='text-neutral-400'>
								<a
									href='tel:+821082336313'
									className='hover:text-white transition-colors'
								>
									+82 10-8233-6313
								</a>
							</li>
							<li className='text-neutral-400'>
								<a
									href='mailto:d.a.d.motorskr@gmail.com'
									className='hover:text-white transition-colors'
								>
									d.a.d.motorskr@gmail.com
								</a>
							</li>
						</ul>
						<div className='mt-4'>
							<h4 className='text-sm font-medium mb-2'>Адреса:</h4>
							<address className='text-sm text-neutral-400 not-italic'>
								<p className='mb-2'>
									Головной офис: 충남 아산시 탕정면 용두리 695
								</p>
								<p>Филиал: 충남 아산시 둔포면 둔포로 92-1</p>
							</address>
						</div>
					</div>

					<div>
						<h3 className='font-semibold text-lg mb-4'>Соцсети</h3>
						<div className='flex space-x-4'>
							{socialLinks.map((social) => (
								<a
									key={social.name}
									href={social.href}
									target='_blank'
									rel='noopener noreferrer'
									className='text-neutral-400 hover:text-white transition-colors'
									aria-label={social.name}
								>
									<social.icon className='w-6 h-6' />
								</a>
							))}
						</div>
					</div>
				</div>

				<div className='border-t border-neutral-800 mt-10 pt-6 text-center text-sm text-neutral-400'>
					<p>© {new Date().getFullYear()} D.A.D Motors. Все права защищены.</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
