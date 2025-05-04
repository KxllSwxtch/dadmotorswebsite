'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'

export default function NotFound() {
	return (
		<motion.div
			className='flex min-h-[calc(100vh-300px)] flex-col items-center justify-center px-4 py-20 text-center'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className='relative mb-8 h-32 w-32'>
				<Image
					src='/logo.png'
					alt='D.A.D Motors'
					fill
					className='object-contain'
					priority
				/>
			</div>

			<motion.h1
				className='mb-4 text-4xl font-bold text-gray-900 md:text-5xl'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5 }}
			>
				404
			</motion.h1>

			<motion.h2
				className='mb-6 text-2xl font-semibold'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3, duration: 0.5 }}
			>
				Страница не найдена
			</motion.h2>

			<motion.p
				className='mb-8 max-w-lg text-lg text-gray-600'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3, duration: 0.5 }}
			>
				Страница, которую вы ищете, не существует или была перемещена. Возможно,
				вы ввели неверный адрес или страница была удалена.
			</motion.p>

			<motion.div
				className='mb-8 rounded-xl bg-gray-50 p-6 shadow-sm'
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.4, duration: 0.5 }}
			>
				<p className='mb-2 text-gray-700'>Связаться с менеджером:</p>
				<div className='flex items-center justify-center gap-2 text-xl font-medium text-red-600'>
					<Phone className='h-5 w-5' />
					<span>+82 10-8233-6313</span>
				</div>
				<p className='mt-1 text-sm text-gray-600'>Сон Денис Олегович</p>
			</motion.div>

			<div className='flex flex-col sm:flex-row gap-4'>
				<Button
					asChild
					variant='default'
					size='lg'
					className='bg-red-600 hover:bg-red-700'
				>
					<Link href='/'>Вернуться на главную</Link>
				</Button>
				<Button asChild variant='outline' size='lg'>
					<Link href='/catalog'>Перейти в каталог</Link>
				</Button>
			</div>
		</motion.div>
	)
}
