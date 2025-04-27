'use client'

/**
 * Advanced loading animation component
 */
const Loader: React.FC = () => {
	return (
		<div className='flex justify-center items-center h-screen w-full'>
			<div className='relative'>
				<div className='animate-ping absolute h-16 w-16 rounded-full bg-red-400 opacity-30'></div>
				<div className='animate-spin relative rounded-full h-14 w-14 border-4 border-transparent border-t-red-600 border-r-red-600'></div>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full opacity-75 animate-pulse'></div>
			</div>
		</div>
	)
}

export default Loader
