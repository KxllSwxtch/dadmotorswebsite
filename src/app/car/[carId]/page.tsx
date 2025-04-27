'use client'

import { use } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
// Import Swiper properly for Next.js compatibility
import { Swiper as SwiperClass } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper modules
import { Navigation, Pagination, Thumbs } from 'swiper/modules'
// Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/pagination'
// React icons - only import what's actually used
import { FaInstagram, FaWhatsapp, FaYoutube, FaFacebook } from 'react-icons/fa'
import { FaTelegram } from 'react-icons/fa6'
// Framer Motion
import { motion } from 'framer-motion'

// Custom components
import { CarInspection } from '@/components'
import Loader from '@/components/Loader'

// Translation dictionaries for Korean to Russian
const translations = {
	price: 'Цена в Корее (₩)',
	연식: 'Год выпуска',
	최초등록일: 'Дата первой регистрации',
	연료: 'Тип топлива',
	휘발유: 'Бензин',
	가솔린: 'Бензин',
	경유: 'Дизель',
	전기: 'Электро',
	하이브리드: 'Гибрид',
	변속기: 'Трансмиссия',
	오토: 'Автомат',
	수동: 'Механика',
	색상: 'Цвет',
	흰색: 'Белый',
	검정색: 'Чёрный',
	회색: 'Серый',
	파란색: 'Синий',
	빨간색: 'Красный',
	주행거리: 'Пробег',
	차량번호: 'Гос. номер',
	차대번호: 'VIN-номер',
	'압류｜저당': 'Был в ДТП',
	'0건｜0건': 'Нет',
	모델명: 'Модель',
	세금미납: 'Задолженность по налогам',
	없음: 'Отсутствует',
	제시번호: 'Номер предложения',
	보험사보증: 'Гарантия страховой компании',
	양호: 'Хорошее состояние',
}

const colorTranslations = {
	흰색: 'Белый',
	검정색: 'Чёрный',
	회색: 'Серый',
	파란색: 'Синий',
	빨간색: 'Красный',
	은색: 'Серебристый',
	녹색: 'Зелёный',
	노란색: 'Жёлтый',
	주황색: 'Оранжевый',
	보라색: 'Фиолетовый',
	갈색: 'Коричневый',
	베이지색: 'Бежевый',
	분홍색: 'Розовый',
	금색: 'Золотой',
	청록색: 'Бирюзовый',
	기타: 'Другой',
	쥐색: 'Тёмно-серый',
}

const formatDate = (rawDate: string) => {
	if (!rawDate || rawDate.length !== 8) return rawDate
	const year = rawDate.slice(0, 4)
	const month = rawDate.slice(4, 6)
	const day = rawDate.slice(6, 8)
	return `${day}.${month}.${year}`
}

// Helper function to calculate vehicle age category
const calculateAge = (year: string, month: string) => {
	const currentDate = new Date()
	const carDate = new Date(parseInt(year), parseInt(month) - 1, 1)

	const ageInMonths =
		(currentDate.getFullYear() - carDate.getFullYear()) * 12 +
		(currentDate.getMonth() - carDate.getMonth())

	if (ageInMonths < 36) {
		return '0-3'
	} else if (ageInMonths < 60) {
		return '3-5'
	} else if (ageInMonths < 84) {
		return '5-7'
	} else {
		return '7-0'
	}
}

// Define types for the car data
interface CarPhoto {
	path: string
}

interface CarDetails {
	vehicleId: string
	photos: CarPhoto[]
	advertisement: {
		price: number
	}
	category: {
		manufacturerEnglishName: string
		modelGroupEnglishName: string
		gradeEnglishName: string
		formYear: string
		yearMonth: string
	}
	spec: {
		displacement: number
		mileage: number
		transmissionName: string
		fuelName: string
		colorName: string
	}
	inspectionSummaries?: Array<Record<string, unknown>>
}

interface CalculationResult {
	tax: number
	sbor: number
	util: number
	total: number
	logisticsCostRub: number
	logisticsCostKrw: number
	logisticsCostUsd: number
	totalWithLogisticsRub: number
	totalCarWithLogisticsRub: number
	totalCarWithLogisticsUsd: number
	totalCarWithLogisticsUsdt: number
}

interface InspectionData {
	master: {
		detail: {
			vin: string
			mileage: number
			firstRegistrationDate: string
			transmissionType: {
				title: string
			}
			guarantyType: {
				title: string
			}
			carStateType: {
				title: string
			}
			engineCheck: string
			trnsCheck: string
			tuning: boolean
			recall: boolean
			modelYear: string
			issueDate: string
			motorType: string
			version: string
		}
		accdient: boolean
		simpleRepair: boolean
	}
}

export default function CarDetailPage({
	params,
}: {
	params: Promise<{ carId: string }>
}) {
	const [vehicleId, setVehicleId] = useState<string | null>(null)
	const [inspectionData, setInspectionData] = useState<InspectionData | null>(
		null,
	)
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)

	const [usdKrwRate, setUsdKrwRate] = useState<number | null>(null)
	const [usdRubRate, setUsdRubRate] = useState<number | null>(null)
	const [usdtRubRates, setUsdtRubRates] = useState<number | null>(null)
	const [usdtKrwRate, setUsdtKrwRate] = useState<number | null>(null)

	const [car, setCar] = useState<CarDetails | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
	const [loadingCalc, setLoadingCalc] = useState(false)
	const [errorCalc, setErrorCalc] = useState('')
	const [calculatedResult, setCalculatedResult] =
		useState<CalculationResult | null>(null)

	const { carId } = use(params)

	// Fetch car data
	useEffect(() => {
		const fetchCar = async () => {
			try {
				setLoading(true)
				const response = await axios.get(
					`https://api.encar.com/v1/readside/vehicle/${carId}`,
				)

				setCar(response.data)
				setVehicleId(response.data?.vehicleId)
			} catch (err) {
				setError('Ошибка при загрузке данных')
				console.error(err)
			} finally {
				setLoading(false)
			}
		}

		if (carId) fetchCar()
	}, [carId])

	// Fetch inspection data
	useEffect(() => {
		const fetchInspectionData = async () => {
			try {
				const response = await axios.get(
					`https://api.encar.com/v1/readside/inspection/vehicle/${vehicleId}`,
				)
				setInspectionData(response.data)
			} catch (error) {
				console.error('Ошибка при загрузке отчёта осмотра:', error)
			}
		}

		if (vehicleId) fetchInspectionData()
	}, [vehicleId])

	// Fetch currency rates
	useEffect(() => {
		const fetchUsdKrwRate = async () => {
			try {
				const response = await axios.get(
					'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
				)

				if (response.status === 200) {
					const jsonData = response.data
					setUsdKrwRate(jsonData.usd.krw)
					setUsdRubRate(jsonData.usd.rub)
				}
			} catch (e) {
				console.error('Error fetching currency rates:', e)
			}
		}

		fetchUsdKrwRate()
	}, [])

	// Fetch USDT-RUB rates
	useEffect(() => {
		const fetchUsdtRubRates = async () => {
			try {
				const response = await axios.get(
					'https://api.coinbase.com/v2/prices/USDT-RUB/spot',
				)

				if (response.data && response.data.data && response.data.data.amount) {
					const rate = parseFloat(response.data.data.amount)
					const formattedRate = parseFloat(rate.toFixed(2))
					const rateWithFivePercent = formattedRate + formattedRate * 0.05
					setUsdtRubRates(rateWithFivePercent)
				}
			} catch (error) {
				console.error('Error fetching USDT-RUB rate:', error)
			}
		}

		fetchUsdtRubRates()
	}, [])

	// Fetch USDT-KRW rates
	useEffect(() => {
		const fetchUsdtKrwRate = async () => {
			try {
				// Since the Bithumb API may not work directly from client side due to CORS,
				// we'll use a simulated value for demonstration
				// In a real app, this would be fetched from a backend or proxy
				setUsdtKrwRate(1350) // Example value
			} catch (error) {
				console.error('Error fetching USDT-KRW rate:', error)
			}
		}

		fetchUsdtKrwRate()
	}, [])

	// Calculate full price to Russia
	const handleCalculate = async () => {
		setLoadingCalc(true)
		setErrorCalc('')

		if (!car || !usdKrwRate || !usdRubRate || !usdtRubRates) {
			setErrorCalc('Не все данные доступны для расчёта')
			setLoadingCalc(false)
			return
		}

		// Logistics cost calculation
		const logisticsCostKrw = 2040000 // Default for all sanctioned vehicles
		let logisticsCostUsd = logisticsCostKrw / usdKrwRate
		const logisticsCostRub = logisticsCostUsd * usdRubRate

		// Add surcharge for vehicles with engine displacement > 2000cc
		if (car?.spec?.displacement > 2000) {
			logisticsCostUsd = logisticsCostUsd + 200
		}

		try {
			// Simulate calculation for customs duties
			// In a real app, this would make an API call to a customs calculation service

			// Simplified calculation for demo purposes
			const age = calculateAge(
				car?.category?.formYear,
				car?.category?.yearMonth?.substring(4, 6),
			)

			// Basic duty rates based on vehicle age and engine type
			let dutyRatePercent = 0

			if (age === '0-3') dutyRatePercent = 48
			else if (age === '3-5') dutyRatePercent = 42
			else if (age === '5-7') dutyRatePercent = 36
			else dutyRatePercent = 30

			// If engine is diesel, add extra 5%
			if (car?.spec?.fuelName === '경유') {
				dutyRatePercent += 5
			}

			const carPriceRub =
				((car?.advertisement?.price * 10000) / usdKrwRate) * usdRubRate
			const tax = carPriceRub * (dutyRatePercent / 100)
			const sbor = 20000 // Fixed customs processing fee
			const util = car?.spec?.displacement > 2500 ? 600000 : 400000 // Recycling fee

			const total = tax + sbor + util // Total customs payments
			const totalWithLogisticsRub = total + logisticsCostRub
			const totalCarWithLogisticsRub = carPriceRub + totalWithLogisticsRub
			const totalCarWithLogisticsUsd = totalCarWithLogisticsRub / usdRubRate
			const totalCarWithLogisticsUsdt = totalCarWithLogisticsRub / usdtRubRates

			setCalculatedResult({
				tax,
				sbor,
				util,
				total,
				logisticsCostRub,
				logisticsCostKrw,
				logisticsCostUsd,
				totalWithLogisticsRub,
				totalCarWithLogisticsRub,
				totalCarWithLogisticsUsd,
				totalCarWithLogisticsUsdt,
			})
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error ? err.message : 'Ошибка при расчёте'
			setErrorCalc(errorMessage)
		} finally {
			setLoadingCalc(false)
		}
	}

	if (loading) return <Loader />
	if (error) return <p className='text-center text-red-500'>{error}</p>
	if (!car) return <p className='text-center text-lg'>Автомобиль не найден</p>

	// Helper function to get the full photo URL
	const getPhotoUrl = (path: string) =>
		`https://ci.encar.com/carpicture${path}?impolicy=heightRate&rh=696&cw=1400&ch=696&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_04.png&t=20250401111058`
	const sortedPhotos = car?.photos?.sort((a, b) => (a.path > b.path ? 1 : -1))
	const uniquePhotos = [
		...new Map(car?.photos?.map((photo) => [photo.path, photo])).values(),
	]

	const formattedYearMonth = `${car?.category?.yearMonth.substring(
		4,
	)}/${car?.category?.yearMonth.substring(0, 4)}`

	const carPriceKorea = car?.advertisement?.price * 10000
	const carPriceUsd = Math.round(
		(car?.advertisement?.price * 10000) / (usdKrwRate || 1),
	)
	const carPriceRub = carPriceUsd * (usdRubRate || 1)

	return (
		<div className='container mx-auto mt-30 p-6 bg-white shadow-lg rounded-lg'>
			<h1 className='text-3xl font-bold text-center mb-6'>
				{car?.category?.manufacturerEnglishName}{' '}
				{car?.category?.modelGroupEnglishName} {car?.category?.gradeEnglishName}
			</h1>

			<div className='md:flex md:gap-8'>
				{/* Image slider */}
				<div className='max-w-3xl mx-auto mb-10 md:w-1/2'>
					{sortedPhotos?.length > 0 && (
						<div className='max-w-3xl mx-auto mb-10'>
							<Swiper
								modules={[Navigation, Pagination, Thumbs]}
								spaceBetween={10}
								slidesPerView={1}
								navigation
								pagination={{ clickable: true }}
								thumbs={{ swiper: thumbsSwiper }}
								className='rounded-lg shadow-lg mb-4'
							>
								{uniquePhotos.map((photo: unknown, index: number) => (
									<SwiperSlide key={index}>
										<img
											src={getPhotoUrl(photo.path)}
											alt={`Car image ${index + 1}`}
											className='w-full h-auto rounded-lg object-cover max-h-[500px]'
										/>
									</SwiperSlide>
								))}
							</Swiper>

							{/* Thumbnails */}
							<Swiper
								onSwiper={setThumbsSwiper}
								spaceBetween={10}
								slidesPerView={Math.min(uniquePhotos.length, 5)}
								watchSlidesProgress={true}
								className='cursor-pointer'
							>
								{uniquePhotos.map((photo: unknown, index: number) => (
									<SwiperSlide key={index}>
										<img
											src={getPhotoUrl(photo.path)}
											alt={`Thumbnail ${index + 1}`}
											className='w-full h-[70px] object-cover rounded border transition border-gray-300'
										/>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					)}
				</div>

				{/* Car details */}
				<motion.div
					initial='hidden'
					whileInView='visible'
					variants={{
						hidden: { opacity: 0, y: 30 },
						visible: {
							opacity: 1,
							y: 0,
							transition: {
								staggerChildren: 0.15,
								when: 'beforeChildren',
							},
						},
					}}
					viewport={{ once: true, amount: 0.2 }}
					className='mt-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl rounded-xl md:mt-0 md:w-1/2 border border-gray-300'
				>
					<h2 className='text-2xl font-bold text-gray-900 mb-6 border-b pb-2 border-gray-300'>
						Характеристики автомобиля
					</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-sm'>
						{[
							['Дата регистрации', formattedYearMonth],
							[
								'Объём двигателя',
								`${car?.spec?.displacement.toLocaleString()} см³`,
							],
							['Пробег', `${car?.spec?.mileage.toLocaleString()} км`],
							[
								'Трансмиссия',
								translations[
									car?.spec?.transmissionName as keyof typeof translations
								] || car?.spec?.transmissionName,
							],
							[
								'Тип топлива',
								translations[
									car?.spec?.fuelName as keyof typeof translations
								] || car?.spec?.fuelName,
							],
							[
								'Цвет',
								colorTranslations[
									car?.spec?.colorName as keyof typeof colorTranslations
								] || car?.spec?.colorName,
							],
						].map(([label, value], idx) => (
							<motion.div
								key={idx}
								variants={{
									hidden: { opacity: 0, y: 20 },
									visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
								}}
								className='flex items-start gap-2'
							>
								<div className='mt-1 w-2 h-2 bg-blue-500 rounded-full'></div>
								<p>
									<span className='font-medium'>{label}:</span> {value}
								</p>
							</motion.div>
						))}
					</div>

					<div className='mt-6 border-t pt-4 border-gray-300'>
						<motion.h3
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
							}}
							className='text-md font-semibold text-gray-900 mb-1'
						>
							Текущие курсы
						</motion.h3>
						<motion.p
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
							}}
							className='text-sm text-gray-600'
						>
							USDT - KRW:{' '}
							<span className='font-medium'>
								₩{usdtKrwRate ? usdtKrwRate.toLocaleString() : '--'}
							</span>
						</motion.p>
						<motion.p
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
							}}
							className='text-sm text-gray-600'
						>
							USDT - RUB: <span className='font-medium'>{usdtRubRates} ₽</span>{' '}
						</motion.p>
					</div>

					<motion.div
						initial='hidden'
						whileInView='visible'
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: {
								opacity: 1,
								y: 0,
								transition: {
									staggerChildren: 0.15,
									when: 'beforeChildren',
								},
							},
						}}
						viewport={{ once: true, amount: 0.2 }}
						className='mt-6 border-t pt-4 border-gray-300'
					>
						<motion.h3
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
							}}
							className='text-md font-semibold text-gray-900 mb-1'
						>
							Цена в Корее
						</motion.h3>
						<motion.p
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
							}}
							className='text-gray-800 font-bold text-lg'
						>
							₩{carPriceKorea.toLocaleString()} | $
							{carPriceUsd.toLocaleString()} |{' '}
							{Math.round(carPriceRub).toLocaleString()} ₽
						</motion.p>
					</motion.div>
				</motion.div>
			</div>

			{/* Car inspection report */}
			<div>
				<CarInspection car={car} />
			</div>

			{/* Inspection data from Encar */}
			{inspectionData && (
				<motion.div
					initial='hidden'
					whileInView='visible'
					variants={{
						hidden: { opacity: 0, y: 40 },
						visible: {
							opacity: 1,
							y: 0,
							transition: {
								staggerChildren: 0.15,
								when: 'beforeChildren',
							},
						},
					}}
					viewport={{ once: true, amount: 0.2 }}
					className='mt-10'
				>
					<h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
						🔍 Диагностика автомобиля
					</h2>
					<div className='bg-white p-6 rounded-xl shadow-lg border border-gray-200'>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800'>
							{[
								['VIN', inspectionData?.master?.detail?.vin],
								[
									'Пробег',
									`${inspectionData?.master?.detail?.mileage?.toLocaleString()} км`,
								],
								[
									'Дата 1-й регистрации',
									formatDate(
										inspectionData?.master?.detail?.firstRegistrationDate,
									),
								],
								[
									'Тип коробки передач',
									translations[
										inspectionData?.master?.detail?.transmissionType
											?.title as keyof typeof translations
									] || inspectionData?.master?.detail?.transmissionType?.title,
								],
								[
									'Гарантийное покрытие',
									translations[
										inspectionData?.master?.detail?.guarantyType
											?.title as keyof typeof translations
									] || inspectionData?.master?.detail?.guarantyType?.title,
								],
								[
									'Состояние автомобиля',
									translations[
										inspectionData?.master?.detail?.carStateType
											?.title as keyof typeof translations
									] || inspectionData?.master?.detail?.carStateType?.title,
								],
								[
									'Проверка двигателя',
									inspectionData?.master?.detail?.engineCheck === 'Y'
										? 'Пройдена'
										: 'Нет',
								],
								[
									'Проверка коробки передач',
									inspectionData?.master?.detail?.trnsCheck === 'Y'
										? 'Пройдена'
										: 'Нет',
								],
								[
									'Участие в ДТП',
									inspectionData?.master?.accdient ? 'Да' : 'Нет',
								],
								[
									'Тюнинг',
									inspectionData?.master?.detail?.tuning ? 'Да' : 'Нет',
								],
								['Ремонт', inspectionData?.master?.simpleRepair ? 'Да' : 'Нет'],
								[
									'Наличие отзывов',
									inspectionData?.master?.detail?.recall ? 'Да' : 'Нет',
								],
								['Модельный год', inspectionData?.master?.detail?.modelYear],
								[
									'Дата отчёта',
									formatDate(inspectionData?.master?.detail?.issueDate),
								],
								['Модель двигателя', inspectionData?.master?.detail?.motorType],
								['Версия отчёта', inspectionData?.master?.detail?.version],
							].map(([label, value], idx) => (
								<motion.div
									key={idx}
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: {
											opacity: 1,
											y: 0,
											transition: { duration: 0.4 },
										},
									}}
									className='flex items-start gap-2'
								>
									<div className='mt-1 w-2 h-2 bg-blue-500 rounded-full'></div>
									<p>
										<span className='font-medium'>{label}:</span> {value}
									</p>
								</motion.div>
							))}
						</div>

						<a
							href={`https://fem.encar.com/cars/report/inspect/${vehicleId}`}
							target='_blank'
							rel='noopener noreferrer'
							className='mt-8 inline-block bg-black text-white text-sm px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300 text-center'
						>
							Посмотреть полный технический отчёт
						</a>
					</div>
				</motion.div>
			)}

			{/* Contact information */}
			<div className='mt-6 p-5 bg-white shadow-md rounded-lg text-center'>
				<h2 className='text-xl font-semibold mb-4'>Контактная информация</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='p-4 border rounded-lg'>
						<h3 className='font-medium mb-2'>Телефон</h3>
						<p className='text-gray-700'>
							<strong>Сон Денис Олегович:</strong>{' '}
							<a
								href='tel:+821082336313'
								className='text-blue-600 hover:underline'
							>
								+82 10-8233-6313
							</a>
						</p>
						<p className='text-gray-700 mt-2'>
							<a
								target='_blank'
								href='https://wa.me/821082336313'
								className='text-blue-600 hover:underline flex justify-center items-center'
							>
								<FaWhatsapp className='text-green-600 text-xl mr-1' />
								+82 10-8233-6313
							</a>
						</p>
					</div>

					<div className='p-4 border rounded-lg'>
						<h3 className='font-medium mb-2'>Email</h3>
						<p className='text-gray-700'>
							<a
								href='mailto:d.a.d.motorskr@gmail.com'
								className='text-blue-600 hover:underline'
							>
								d.a.d.motorskr@gmail.com
							</a>
						</p>
					</div>

					<div className='p-4 border rounded-lg'>
						<h3 className='font-medium mb-2'>Офисы</h3>
						<div>
							<p className='font-medium'>Головной офис:</p>
							<address className='not-italic text-gray-600'>
								충남 아산시 탕정면 용두리 695
							</address>
						</div>
						<div className='mt-2'>
							<p className='font-medium'>Филиал:</p>
							<address className='not-italic text-gray-600'>
								충남 아산시 둔포면 둔포로 92-1
							</address>
						</div>
					</div>

					<div className='p-4 border rounded-lg'>
						<h3 className='font-medium mb-2'>Социальные сети</h3>
						<div className='flex justify-center space-x-4 mt-2'>
							<a
								target='_blank'
								href='https://www.instagram.com/dadmotorskr'
								className='text-pink-600 hover:text-pink-700 text-2xl'
								aria-label='Instagram'
							>
								<FaInstagram />
							</a>
							<a
								target='_blank'
								href='https://t.me/dadmotorskr'
								className='text-blue-500 hover:text-blue-600 text-2xl'
								aria-label='Telegram'
							>
								<FaTelegram />
							</a>
							<a
								target='_blank'
								href='https://www.facebook.com/share/1AdFZpXoN7/?mibextid=wwXIfr'
								className='text-blue-600 hover:text-blue-700 text-2xl'
								aria-label='Facebook'
							>
								<FaFacebook />
							</a>
							<a
								target='_blank'
								href='https://youtube.com/@dadmotorskr'
								className='text-red-600 hover:text-red-700 text-2xl'
								aria-label='YouTube'
							>
								<FaYoutube />
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Country selection for price calculation */}
			<div className='mt-6 p-6 bg-white shadow-lg rounded-lg text-center border border-gray-200'>
				<h2 className='text-2xl font-semibold mb-6 text-gray-800'>
					Рассчитать стоимость до:
				</h2>
				<div className='flex justify-center gap-6 flex-wrap'>
					<button
						onClick={() => setSelectedCountry('russia')}
						className={`px-6 py-3 rounded-lg shadow-md text-lg font-semibold transition duration-300 border-2 cursor-pointer
              ${
								selectedCountry === 'russia'
									? 'bg-blue-700 text-white border-blue-700'
									: 'bg-white text-blue-700 border-blue-500 hover:bg-blue-100'
							}`}
					>
						🇷🇺 Россия
					</button>
				</div>
			</div>

			{/* Russia calculation */}
			{selectedCountry === 'russia' && (
				<div className='mt-8 flex justify-center'>
					<button
						className={`cursor-pointer relative py-3 px-10 rounded-lg shadow-xl text-lg font-semibold transition-all duration-300 border-2 flex items-center gap-2
              ${
								loadingCalc
									? 'bg-gray-600 border-gray-700 text-gray-300 opacity-60 cursor-not-allowed'
									: 'bg-gradient-to-r from-red-600 to-red-700 border-red-800 text-white hover:from-red-700 hover:to-red-800 hover:border-red-900 hover:scale-105'
							}`}
						onClick={handleCalculate}
						disabled={loadingCalc}
					>
						{loadingCalc ? (
							<>
								<span className='animate-spin border-t-2 border-white border-solid rounded-full w-5 h-5'></span>
								<span>Расчёт...</span>
							</>
						) : (
							<>
								📊 <span>Рассчитать стоимость</span>
							</>
						)}
					</button>
				</div>
			)}

			{calculatedResult && selectedCountry === 'russia' && (
				<div className='mt-6 p-5 bg-gray-50 shadow-md rounded-lg text-center'>
					<h2 className='text-xl font-semibold mb-4'>Расчёт для России</h2>
					<p className='text-gray-600'>
						Стоимость автомобиля: ₩{carPriceKorea.toLocaleString()} | $
						{carPriceUsd.toLocaleString()} |{' '}
						{Math.round(carPriceRub).toLocaleString()} ₽
					</p>
					<br />
					<p className='text-gray-600'>
						Расходы по Корее: ₩
						{calculatedResult?.logisticsCostKrw.toLocaleString()} | $
						{calculatedResult?.logisticsCostUsd.toLocaleString()} |{' '}
						{calculatedResult?.logisticsCostRub.toLocaleString()} ₽
					</p>
					<br />
					<br />
					<h3 className='font-bold text-xl'>Расходы во Владивостоке</h3>
					<p className='text-gray-600'>
						Таможенная пошлина: {calculatedResult?.tax?.toLocaleString()} ₽
					</p>
					<p className='text-gray-600'>
						Таможенный сбор: {calculatedResult?.sbor?.toLocaleString()} ₽
					</p>
					<p className='text-gray-600'>
						Утилизационный сбор: {calculatedResult?.util?.toLocaleString()} ₽
					</p>
					<p className='text-black font-medium text-lg mx-auto mt-10'>
						Стоимость автомобиля под ключ во Владивостоке: <br />$
						{Math.round(
							calculatedResult?.totalCarWithLogisticsUsd,
						).toLocaleString('en-US')}{' '}
						|{' '}
						{calculatedResult?.totalCarWithLogisticsRub?.toLocaleString(
							'ru-RU',
						)}{' '}
						₽
					</p>
					<p className='text-black font-medium text-lg mx-auto mt-10'>
						Стоимость автомобиля под ключ во Владивостоке (USDT): <br />$
						{Math.round(
							calculatedResult?.totalCarWithLogisticsUsdt,
						).toLocaleString('en-US')}{' '}
					</p>
				</div>
			)}

			{errorCalc && <p className='text-center text-red-500'>{errorCalc}</p>}
		</div>
	)
}
