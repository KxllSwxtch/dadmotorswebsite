'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface CarInspectionProps {
	car: {
		inspectionSummaries: {
			inspectionDate: string
			inspectionType: string
			totalScore: number
			exteriorScore: number
			interiorScore: number
			mechanicalScore: number
			comments?: string
		}[]
		vehicleId: string
	}
}

const CarInspection = ({ car }: CarInspectionProps) => {
	const [showFullReport, setShowFullReport] = useState(false)

	if (
		!car ||
		!car.inspectionSummaries ||
		car.inspectionSummaries.length === 0
	) {
		return null
	}

	const inspection = car.inspectionSummaries[0]

	return (
		<motion.div
			className='mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<h2 className='text-2xl font-bold mb-4 text-center'>
				Инспекция автомобиля
			</h2>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div>
					<h3 className='text-lg font-semibold mb-3 border-b pb-2'>
						Основная информация
					</h3>
					<ul className='space-y-2'>
						<li className='flex items-start'>
							<span className='font-medium mr-2'>Дата инспекции:</span>
							<span>{inspection.inspectionDate}</span>
						</li>
						<li className='flex items-start'>
							<span className='font-medium mr-2'>Тип инспекции:</span>
							<span>{inspection.inspectionType}</span>
						</li>
						<li className='flex items-start'>
							<span className='font-medium mr-2'>Общая оценка:</span>
							<span
								className={`font-semibold ${getScoreColor(
									inspection.totalScore,
								)}`}
							>
								{inspection.totalScore} / 5
							</span>
						</li>
					</ul>
				</div>

				<div>
					<h3 className='text-lg font-semibold mb-3 border-b pb-2'>
						Детальная оценка
					</h3>
					<ul className='space-y-2'>
						<li className='flex items-start'>
							<span className='font-medium mr-2'>Внешний вид:</span>
							<span className={getScoreColor(inspection.exteriorScore)}>
								{inspection.exteriorScore} / 5
							</span>
						</li>
						<li className='flex items-start'>
							<span className='font-medium mr-2'>Внутреннее состояние:</span>
							<span className={getScoreColor(inspection.interiorScore)}>
								{inspection.interiorScore} / 5
							</span>
						</li>
						<li className='flex items-start'>
							<span className='font-medium mr-2'>Техническое состояние:</span>
							<span className={getScoreColor(inspection.mechanicalScore)}>
								{inspection.mechanicalScore} / 5
							</span>
						</li>
					</ul>
				</div>
			</div>

			{inspection.comments && (
				<div className='mt-6'>
					<h3 className='text-lg font-semibold mb-3 border-b pb-2'>
						Комментарии инспектора
					</h3>
					<p className={`${showFullReport ? '' : 'line-clamp-3'}`}>
						{inspection.comments}
					</p>
					{inspection.comments.length > 200 && (
						<button
							onClick={() => setShowFullReport(!showFullReport)}
							className='mt-2 text-blue-600 hover:text-blue-800 font-medium'
						>
							{showFullReport ? 'Свернуть' : 'Читать полностью'}
						</button>
					)}
				</div>
			)}

			<div className='mt-6 text-center'>
				<button
					onClick={() =>
						window.open(
							`https://fem.encar.com/cars/report/inspect/${car.vehicleId}`,
						)
					}
					className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors'
				>
					Полный отчет инспекции
				</button>
			</div>
		</motion.div>
	)
}

const getScoreColor = (score: number) => {
	if (score >= 4) return 'text-green-600'
	if (score >= 3) return 'text-yellow-600'
	return 'text-red-600'
}

export default CarInspection
