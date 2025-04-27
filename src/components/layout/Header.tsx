'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
} from '@/components/ui/sheet'
import { Menu, Home, Info, Grid, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 10) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const closeMenu = () => setIsMenuOpen(false)

	return (
		<header
			className={cn(
				'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
				isScrolled ? 'bg-white shadow-md' : 'bg-transparent',
			)}
		>
			<div className='flex'>
				{/* Левая (черная) часть */}
				<div
					className={cn(
						'flex-1 transition-all duration-300 flex items-center justify-start',
						isScrolled ? 'bg-white' : 'bg-black',
					)}
				>
					<div className='container mx-auto px-4 py-4'>
						<Link href='/' className='flex items-center'>
							<Image
								src='https://res.cloudinary.com/dt0nkqowc/image/upload/v1745713474/DAD%20Motors/logo_c92rcj.png'
								alt='D.A.D Motors'
								width={140}
								height={50}
								className='h-15 w-auto rounded-sm'
								priority
							/>
						</Link>
					</div>
				</div>

				{/* Правая (черная) часть */}
				<div
					className={cn(
						'flex-1 transition-all duration-300 flex items-center justify-end',
						isScrolled ? 'bg-white' : 'bg-black',
					)}
				>
					<div className='container mx-auto px-4 py-4 flex items-center justify-end'>
						{/* Actions */}
						<div className='flex items-center space-x-6'>
							{/* Desktop Navigation - visible on md and up */}
							<nav className='hidden md:flex items-center space-x-8'>
								{['Главная', 'О нас', 'Каталог', 'Контакты'].map(
									(item, idx) => (
										<Link
											key={idx}
											href={
												idx === 0
													? '/'
													: idx === 1
													? '/about'
													: idx === 2
													? '/catalog'
													: '/contacts'
											}
											className={cn(
												'font-medium transition-colors',
												isScrolled
													? 'text-neutral-800 hover:text-red-600'
													: 'text-white hover:text-red-500',
											)}
										>
											{item}
										</Link>
									),
								)}
							</nav>

							{/* Mobile menu button */}
							<Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
								<SheetTrigger
									className='md:hidden focus:outline-none'
									aria-label='Меню'
								>
									<Menu
										className={cn(
											'h-6 w-6 transition-colors',
											isScrolled ? 'text-neutral-800' : 'text-white',
										)}
									/>
								</SheetTrigger>
								<SheetContent
									side='right'
									className='w-[80%] sm:w-[350px] bg-black text-white p-0 overflow-y-auto border-l-0'
								>
									<SheetTitle className='sr-only'>Меню сайта</SheetTitle>
									<div className='flex flex-col h-full'>
										<div className='flex items-center justify-start p-6 border-b border-zinc-800'>
											<Link
												href='/'
												className='flex items-center'
												onClick={closeMenu}
											>
												<Image
													src='https://res.cloudinary.com/dt0nkqowc/image/upload/v1745713474/DAD%20Motors/logo_c92rcj.png'
													alt='D.A.D Motors'
													width={120}
													height={40}
													className='h-8 w-auto'
												/>
											</Link>
										</div>
										<nav className='flex flex-col mt-6 px-6'>
											<div className='space-y-1 w-full'>
												<Link
													href='/'
													className='flex items-center gap-3 py-3 px-4 rounded-md hover:bg-zinc-800 transition-colors w-full'
													onClick={closeMenu}
												>
													<Home size={20} className='text-red-500' />
													<span className='text-base font-medium'>Главная</span>
												</Link>
												<Link
													href='/about'
													className='flex items-center gap-3 py-3 px-4 rounded-md hover:bg-zinc-800 transition-colors w-full'
													onClick={closeMenu}
												>
													<Info size={20} className='text-red-500' />
													<span className='text-base font-medium'>О нас</span>
												</Link>
												<Link
													href='/catalog'
													className='flex items-center gap-3 py-3 px-4 rounded-md hover:bg-zinc-800 transition-colors w-full'
													onClick={closeMenu}
												>
													<Grid size={20} className='text-red-500' />
													<span className='text-base font-medium'>Каталог</span>
												</Link>
												<Link
													href='/contacts'
													className='flex items-center gap-3 py-3 px-4 rounded-md hover:bg-zinc-800 transition-colors w-full'
													onClick={closeMenu}
												>
													<Phone size={20} className='text-red-500' />
													<span className='text-base font-medium'>
														Контакты
													</span>
												</Link>
											</div>
										</nav>

										<div className='mt-auto p-6 border-t border-zinc-800'>
											<h3 className='text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4'>
												Контакты
											</h3>
											<div className='space-y-4'>
												<a
													href='tel:+821082336313'
													className='flex items-center gap-2 text-base hover:text-red-500 transition-colors'
												>
													<Phone size={16} className='text-zinc-400' />
													+82 10-8233-6313
												</a>
												<a
													href='mailto:d.a.d.motorskr@gmail.com'
													className='flex items-center gap-2 text-base hover:text-red-500 transition-colors'
												>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														width='16'
														height='16'
														viewBox='0 0 24 24'
														fill='none'
														stroke='currentColor'
														stroke-width='2'
														stroke-linecap='round'
														stroke-linejoin='round'
														className='text-zinc-400'
													>
														<rect width='20' height='16' x='2' y='4' rx='2' />
														<path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
													</svg>
													d.a.d.motorskr@gmail.com
												</a>
											</div>
										</div>
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
