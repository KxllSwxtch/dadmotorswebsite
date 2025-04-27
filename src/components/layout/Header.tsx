'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
	{
		title: 'Главная',
		href: '/',
	},
	{
		title: 'О нас',
		href: '/about',
	},
	{
		title: 'Каталог',
		href: '/catalog',
	},
	{
		title: 'Контакты',
		href: '/contacts',
	},
]

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false)

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

	return (
		<header
			className={cn(
				'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
				isScrolled
					? 'bg-white/95 backdrop-blur-sm border-neutral-200'
					: 'bg-transparent border-transparent',
			)}
		>
			<div className='container mx-auto py-4 px-4 flex items-center justify-between'>
				<Link href='/' className='flex items-center'>
					<Image
						src='https://res.cloudinary.com/dt0nkqowc/image/upload/v1745713474/DAD%20Motors/logo_c92rcj.png'
						alt='D.A.D Motors'
						width={120}
						height={50}
						className='h-10 w-auto'
						priority
					/>
				</Link>

				{/* Desktop Navigation */}
				<NavigationMenu className='hidden md:flex'>
					<NavigationMenuList>
						{navigation.map((item) => (
							<NavigationMenuItem key={item.href}>
								<Link href={item.href} className={navigationMenuTriggerStyle()}>
									{item.title}
								</Link>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>

				{/* Mobile Navigation */}
				<Sheet>
					<SheetTrigger className='md:hidden' aria-label='Меню'>
						<Menu className='h-6 w-6' />
					</SheetTrigger>
					<SheetContent side='right' className='w-[80%] sm:w-[350px]'>
						<div className='flex flex-col h-full'>
							<div className='flex items-center justify-between py-4'>
								<Link href='/' className='flex items-center'>
									<Image
										src='https://res.cloudinary.com/dt0nkqowc/image/upload/v1745713474/DAD%20Motors/logo_c92rcj.png'
										alt='D.A.D Motors'
										width={100}
										height={40}
										className='h-8 w-auto'
									/>
								</Link>
							</div>
							<nav className='flex flex-col gap-4 mt-8'>
								{navigation.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className='text-lg font-medium hover:text-red-600 transition-colors'
									>
										{item.title}
									</Link>
								))}
							</nav>

							<div className='mt-auto py-4'>
								<div className='flex flex-col gap-2'>
									<p className='text-sm text-neutral-500'>Контакты:</p>
									<a
										href='tel:+821082336313'
										className='text-sm hover:text-red-600 transition-colors'
									>
										+82 10-8233-6313
									</a>
									<a
										href='mailto:d.a.d.motorskr@gmail.com'
										className='text-sm hover:text-red-600 transition-colors'
									>
										d.a.d.motorskr@gmail.com
									</a>
								</div>
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	)
}

export default Header
