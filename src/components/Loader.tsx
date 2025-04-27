'use client'

import { motion } from 'framer-motion'

/**
 * Advanced loading animation component
 * Full-screen version
 */
const Loader = () => {
	return (
		<div className='fixed inset-0 flex justify-center items-center bg-white bg-opacity-80 z-50'>
			<motion.div
				className='w-16 h-16 border-4 border-gray-300 border-t-red-600 rounded-full'
				animate={{ rotate: 360 }}
				transition={{
					duration: 1,
					repeat: Infinity,
					ease: 'linear',
				}}
			/>
		</div>
	)
}

export default Loader
