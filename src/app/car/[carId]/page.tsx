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
// Next.js navigation
import { notFound } from 'next/navigation'

// Custom components
import { CarInspection } from '@/components'
import Loader from '@/components/Loader'
import { Maximize } from 'lucide-react'

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
	inspectionSummaries?: {
		inspectionDate: string
		inspectionType: string
		totalScore: number
		exteriorScore: number
		interiorScore: number
		mechanicalScore: number
		comments?: string
	}[]
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
	brokerServices: number
	transportToMoscowStandard: number
	transportToMoscowTruck: number
	totalWithMoscowDeliveryStandard: number
	totalWithMoscowDeliveryTruckRub: number
	totalWithMoscowDeliveryStandardUsd: number
	totalWithMoscowDeliveryTruckUsd: number
	totalWithMoscowDeliveryStandardUsdt: number
	totalWithMoscowDeliveryTruckUsdt: number
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
	const [fullScreenMode, setFullScreenMode] = useState<boolean>(false)
	const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
	const [fullscreenSwiperRef, setFullscreenSwiperRef] =
		useState<SwiperClass | null>(null)

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

	// Helper function to get the full photo URL
	const getPhotoUrl = (path: string) =>
		`https://ci.encar.com/carpicture${path}?impolicy=heightRate&rh=696&cw=1400&ch=696&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_04.png&t=20250401111058`

	const openFullScreen = (index: number) => {
		setActiveImageIndex(index)
		setFullScreenMode(true)
		document.body.style.overflow = 'hidden' // Prevent scrolling when fullscreen
	}

	const closeFullScreen = () => {
		setFullScreenMode(false)
		document.body.style.overflow = 'auto' // Re-enable scrolling
	}

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
				const response = await axios.get(
					'https://api.bithumb.com/v1/ticker?markets=KRW-USDT',
				)

				if (response.data && response.data[0] && response.data[0].trade_price) {
					// Получаем курс из ответа API и вычитаем 20 пунктов
					const rawRate = parseFloat(response.data[0].trade_price)
					const adjustedRate = rawRate - 20

					// Форматируем до целого числа
					const formattedRate = Math.round(adjustedRate)

					// Сохраняем в состояние
					setUsdtKrwRate(formattedRate)
				}
			} catch (error) {
				console.error('Ошибка при получении курса USDT-KRW:', error)
			}
		}

		fetchUsdtKrwRate()
	}, [])

	// Handle keyboard events for fullscreen navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!fullScreenMode || !fullscreenSwiperRef) return

			if (e.key === 'Escape') {
				closeFullScreen()
			} else if (e.key === 'ArrowRight') {
				fullscreenSwiperRef.slideNext()
			} else if (e.key === 'ArrowLeft') {
				fullscreenSwiperRef.slidePrev()
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [fullScreenMode, fullscreenSwiperRef, closeFullScreen])

	// Calculate full price to Russia
	const handleCalculate = async () => {
		setLoadingCalc(true)
		setErrorCalc('')

		if (!car || !usdKrwRate || !usdRubRate || !usdtRubRates) {
			setErrorCalc('Не все данные доступны для расчёта')
			setLoadingCalc(false)
			return
		}

		// Логика расчёта логистики
		const logisticsCostKrw = 2040000 // По умолчанию для всех санкционных авто
		let logisticsCostUsd = logisticsCostKrw / usdKrwRate
		const logisticsCostRub = logisticsCostUsd * usdRubRate

		// Add surcharge for vehicles with engine displacement > 2000cc
		if (car.spec?.displacement && car.spec.displacement > 2000) {
			logisticsCostUsd = logisticsCostUsd + 200
		}

		// Broker services cost (fixed)
		const brokerServices = 100000 // рублей

		// Auto transportation to Moscow costs
		const transportToMoscowStandard = 180000 // рублей (автовоз)
		const transportToMoscowTruck = 220000 // рублей (фура)

		try {
			const yearMonth = car.category?.yearMonth
			const formYear = car.category?.formYear

			if (
				!yearMonth ||
				!formYear ||
				!car.spec?.displacement ||
				!car.advertisement?.price
			) {
				throw new Error('Недостаточно данных для расчёта')
			}

			const ageCategory = calculateAge(formYear, yearMonth.substring(4, 6))

			const response = await axios.post(
				'https://corsproxy.io/?key=28174bc7&url=https://calcus.ru/calculate/Customs',
				new URLSearchParams({
					owner: '1',
					age: ageCategory,
					engine: car.spec.fuelName === '가솔린' ? '1' : '2',
					power: '1',
					power_unit: '1',
					value: car.spec.displacement.toString(),
					price: (car.advertisement.price * 10000).toString(),
					curr: 'KRW',
				}).toString(),
				{
					withCredentials: false,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				},
			)

			if (response.status !== 200) throw new Error('Ошибка при расчёте')

			const data = await response.data

			const formattedTotal = parseInt(
				data.total.split(',')[0].split(' ').join(''),
			)
			const formattedTotal2 = parseInt(
				data.total2.split(',')[0].split(' ').join(''),
			)

			const totalWithLogisticsRub = formattedTotal + logisticsCostRub
			const totalCarWithLogisticsRub = formattedTotal2 + logisticsCostRub

			// Calculate total with Moscow delivery for both transport options
			const totalWithMoscowDeliveryStandard =
				totalCarWithLogisticsRub + brokerServices + transportToMoscowStandard
			const totalWithMoscowDeliveryTruckRub =
				totalCarWithLogisticsRub + brokerServices + transportToMoscowTruck

			const totalWithMoscowDeliveryStandardUsd =
				totalWithMoscowDeliveryStandard / usdRubRate
			const totalWithMoscowDeliveryTruckUsd =
				totalWithMoscowDeliveryTruckRub / usdRubRate

			const totalWithMoscowDeliveryStandardUsdt =
				totalWithMoscowDeliveryStandard / usdtRubRates
			const totalWithMoscowDeliveryTruckUsdt =
				totalWithMoscowDeliveryTruckRub / usdtRubRates

			const totalCarWithLogisticsUsd = totalCarWithLogisticsRub / usdRubRate
			const totalCarWithLogisticsUsdt = totalCarWithLogisticsRub / usdtRubRates

			setCalculatedResult({
				...data,
				logisticsCostRub,
				logisticsCostKrw,
				logisticsCostUsd,
				totalWithLogisticsRub,
				totalCarWithLogisticsRub,
				totalCarWithLogisticsUsd,
				totalCarWithLogisticsUsdt,
				brokerServices,
				transportToMoscowStandard,
				transportToMoscowTruck,
				totalWithMoscowDeliveryStandard,
				totalWithMoscowDeliveryTruckRub,
				totalWithMoscowDeliveryStandardUsd,
				totalWithMoscowDeliveryTruckUsd,
				totalWithMoscowDeliveryStandardUsdt,
				totalWithMoscowDeliveryTruckUsdt,
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
	if (error) return notFound()
	if (!car) return notFound()

	const sortedPhotos = car.photos?.sort((a, b) => (a.path > b.path ? 1 : -1))
	const uniquePhotos = [
		...new Map(car.photos?.map((photo) => [photo.path, photo])).values(),
	]

	const formattedYearMonth = `${car.category?.yearMonth?.substring(
		4,
	)}/${car.category?.yearMonth?.substring(0, 4)}`

	const carPriceKorea = car.advertisement?.price * 10000
	const carPriceUsd = Math.round(
		(car.advertisement?.price * 10000) / (usdKrwRate || 1),
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
								onSlideChange={(swiper) =>
									setActiveImageIndex(swiper.activeIndex)
								}
							>
								{uniquePhotos.map((photo: { path: string }, index: number) => (
									<SwiperSlide key={index}>
										<div className='relative'>
											<img
												src={getPhotoUrl(photo.path)}
												alt={`Car image ${index + 1}`}
												className='w-full h-auto rounded-lg object-cover max-h-[500px] cursor-pointer'
												onClick={() => openFullScreen(index)}
											/>
											<button
												className='absolute bottom-4 right-4 bg-black bg-opacity-60 text-white p-2 rounded-md flex items-center gap-1 hover:bg-opacity-80 transition-all cursor-pointer'
												onClick={() => openFullScreen(index)}
											>
												<Maximize />
												<span>На весь экран</span>
											</button>
										</div>
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
								{uniquePhotos.map((photo: { path: string }, index: number) => (
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
							USDT - RUB:{' '}
							<span className='font-medium'>
								{usdtRubRates ? usdtRubRates.toLocaleString() : '--'} ₽
							</span>{' '}
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
				{/* @ts-expect-error - Type issue with index signature */}
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
							className='mt-8 inline-block bg-black text-white text-sm px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300 text-center w-full'
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
							<strong>Сон Денис Олегович:</strong>
							<br />

							<a
								href='tel:+821082336313'
								className='text-blue-600 hover:underline'
							>
								Звонок: +82 10-8233-6313
							</a>
						</p>
						<p className='text-gray-700'>
							<a
								target='_blank'
								href='https://wa.me/821082336313'
								className='text-blue-600 hover:underline flex justify-center items-center'
							>
								<FaWhatsapp className='text-green-600 text-xl mr-1' />
								WhatsApp: +82 10-8233-6313
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

					<div className='p-4 border rounded-lg flex justify-center items-center flex-col'>
						<h3 className='font-medium mb-2'>Социальные сети</h3>
						<div className='flex justify-center items-center space-x-4 mt-2'>
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
						onClick={() => {
							setSelectedCountry('russia')
							handleCalculate()
						}}
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

			{/* Remove the second calculation button and just show a loading indicator if needed */}
			{loadingCalc && selectedCountry === 'russia' && (
				<div className='mt-8 flex justify-center'>
					<div className='cursor-not-allowed relative py-3 px-10 rounded-lg shadow-xl text-lg font-semibold transition-all duration-300 border-2 flex items-center gap-2 bg-gray-600 border-gray-700 text-gray-300 opacity-60'>
						<span className='animate-spin border-t-2 border-white border-solid rounded-full w-5 h-5'></span>
						<span>Расчёт...</span>
					</div>
				</div>
			)}

			{calculatedResult && selectedCountry === 'russia' && (
				<div className='mt-6 bg-gray-50 shadow-lg rounded-xl overflow-hidden'>
					<div className='bg-blue-700 text-white py-4 px-5'>
						<h2 className='text-2xl font-bold text-center'>
							Расчёт для России
						</h2>
					</div>

					<div className='p-6'>
						{/* Car Price Section */}
						<div className='mb-8 pb-6 border-b border-gray-200'>
							<div className='flex flex-col items-center justify-center mb-4'>
								<span className='text-gray-500 mb-1 text-sm'>
									Стоимость автомобиля
								</span>
								<span className='text-3xl font-bold text-gray-800'>
									₩{carPriceKorea.toLocaleString()}
								</span>
								<div className='mt-1 text-gray-600 text-sm flex gap-2'>
									<span>${carPriceUsd.toLocaleString()}</span>
									<span>|</span>
									<span>{Math.round(carPriceRub).toLocaleString()} ₽</span>
								</div>
							</div>

							<div className='flex flex-col items-center justify-center'>
								<span className='text-gray-500 mb-1 text-sm'>
									Расходы по Корее
								</span>
								<span className='text-xl font-semibold text-gray-800'>
									₩{calculatedResult?.logisticsCostKrw.toLocaleString()}
								</span>
								<div className='mt-1 text-gray-600 text-sm flex gap-2'>
									<span>
										${calculatedResult?.logisticsCostUsd.toLocaleString()}
									</span>
									<span>|</span>
									<span>
										{calculatedResult?.logisticsCostRub.toLocaleString()} ₽
									</span>
								</div>
							</div>
						</div>

						{/* Customs Fees Section */}
						<div className='mb-8 pb-6 border-b border-gray-200'>
							<h3 className='text-center font-bold text-xl mb-5 text-gray-800'>
								Расходы во Владивостоке
							</h3>

							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
									<div className='text-center'>
										<span className='text-gray-500 text-sm'>
											Таможенная пошлина
										</span>
										<p className='text-xl font-semibold text-gray-800 mt-1'>
											{calculatedResult?.tax?.toLocaleString()} ₽
										</p>
									</div>
								</div>

								<div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
									<div className='text-center'>
										<span className='text-gray-500 text-sm'>
											Таможенный сбор
										</span>
										<p className='text-xl font-semibold text-gray-800 mt-1'>
											{calculatedResult?.sbor?.toLocaleString()} ₽
										</p>
									</div>
								</div>

								<div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
									<div className='text-center'>
										<span className='text-gray-500 text-sm'>
											Утилизационный сбор
										</span>
										<p className='text-xl font-semibold text-gray-800 mt-1'>
											{calculatedResult?.util?.toLocaleString()} ₽
										</p>
									</div>
								</div>
							</div>

							<div className='mt-6 p-5 bg-white rounded-lg shadow-sm border border-gray-200 text-center'>
								<h4 className='text-gray-500 text-sm mb-1'>
									Стоимость автомобиля под ключ во Владивостоке
								</h4>
								<p className='text-2xl font-bold text-gray-800'>
									{calculatedResult?.totalCarWithLogisticsRub?.toLocaleString(
										'ru-RU',
									)}{' '}
									₽
								</p>
								<div className='mt-1 text-gray-600 flex justify-center gap-2 text-sm'>
									<span>
										$
										{Math.round(
											calculatedResult?.totalCarWithLogisticsUsd,
										).toLocaleString('en-US')}
									</span>
									<span>|</span>
									<span>
										USDT: $
										{Math.round(
											calculatedResult?.totalCarWithLogisticsUsdt,
										).toLocaleString('en-US')}
									</span>
								</div>
							</div>
						</div>

						{/* Additional Costs Section */}
						<div className='mb-8 pb-2'>
							<h3 className='text-center font-bold text-xl mb-5 text-gray-800'>
								Дополнительные расходы по России
							</h3>

							<div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-5'>
								<div className='text-center'>
									<span className='text-gray-500 text-sm'>Услуги брокера</span>
									<p className='text-xl font-semibold text-gray-800 mt-1'>
										{calculatedResult?.brokerServices?.toLocaleString()} ₽
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
								<div className='bg-white rounded-xl shadow-md overflow-hidden border-2 border-blue-100 hover:border-blue-300 transition-colors'>
									<div className='bg-blue-600 text-white py-3 px-4 text-center'>
										<h4 className='font-semibold text-lg'>Автовоз до Москвы</h4>
									</div>
									<div className='p-5'>
										<div className='text-center mb-4'>
											<span className='text-gray-500 text-sm'>
												Стоимость доставки
											</span>
											<p className='text-xl font-semibold text-gray-800 mt-1'>
												{calculatedResult?.transportToMoscowStandard?.toLocaleString()}{' '}
												₽
											</p>
										</div>

										<div className='pt-4 border-t border-gray-200'>
											<div className='text-center'>
												<span className='text-gray-500 text-sm'>
													Итоговая стоимость под ключ в Москве
												</span>
												<p className='text-2xl font-bold text-blue-800 mt-2'>
													{calculatedResult?.totalWithMoscowDeliveryStandard?.toLocaleString(
														'ru-RU',
													)}{' '}
													₽
												</p>
												<p className='text-lg font-semibold text-gray-700 mt-1'>
													$
													{Math.round(
														calculatedResult?.totalWithMoscowDeliveryStandardUsd,
													).toLocaleString('en-US')}
												</p>
												<p className='text-gray-500 text-sm mt-1'>
													USDT: $
													{Math.round(
														calculatedResult?.totalWithMoscowDeliveryStandardUsdt,
													).toLocaleString('en-US')}
												</p>
											</div>
										</div>
									</div>
								</div>

								<div className='bg-white rounded-xl shadow-md overflow-hidden border-2 border-red-100 hover:border-red-300 transition-colors'>
									<div className='bg-red-600 text-white py-3 px-4 text-center'>
										<h4 className='font-semibold text-lg'>Фура до Москвы</h4>
									</div>
									<div className='p-5'>
										<div className='text-center mb-4'>
											<span className='text-gray-500 text-sm'>
												Стоимость доставки
											</span>
											<p className='text-xl font-semibold text-gray-800 mt-1'>
												{calculatedResult?.transportToMoscowTruck?.toLocaleString()}{' '}
												₽
											</p>
										</div>

										<div className='pt-4 border-t border-gray-200'>
											<div className='text-center'>
												<span className='text-gray-500 text-sm'>
													Итоговая стоимость под ключ в Москве
												</span>
												<p className='text-2xl font-bold text-red-800 mt-2'>
													{calculatedResult?.totalWithMoscowDeliveryTruckRub?.toLocaleString(
														'ru-RU',
													)}{' '}
													₽
												</p>
												<p className='text-lg font-semibold text-gray-700 mt-1'>
													$
													{Math.round(
														calculatedResult?.totalWithMoscowDeliveryTruckUsd,
													).toLocaleString('en-US')}
												</p>
												<p className='text-gray-500 text-sm mt-1'>
													USDT: $
													{Math.round(
														calculatedResult?.totalWithMoscowDeliveryTruckUsdt,
													).toLocaleString('en-US')}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{errorCalc && <p className='text-center text-red-500'>{errorCalc}</p>}

			{/* Fullscreen Gallery Modal */}
			{fullScreenMode && uniquePhotos && (
				<motion.div
					className='fixed inset-0 bg-black z-50 flex flex-col items-center justify-center'
					onClick={closeFullScreen}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					<motion.button
						className='absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 z-50'
						onClick={closeFullScreen}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={2}
							stroke='currentColor'
							className='w-6 h-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18 18 6M6 6l12 12'
							/>
						</svg>
					</motion.button>

					<div
						className='w-full h-full flex items-center justify-center p-4 md:p-10'
						onClick={(e) => e.stopPropagation()}
					>
						<Swiper
							modules={[Navigation, Pagination]}
							spaceBetween={0}
							slidesPerView={1}
							pagination={{
								clickable: true,
								el: '.swiper-pagination',
							}}
							initialSlide={activeImageIndex}
							className='w-full max-w-5xl h-full'
							onSwiper={setFullscreenSwiperRef}
							onSlideChange={(swiper) =>
								setActiveImageIndex(swiper.activeIndex)
							}
							effect='fade'
							speed={300}
						>
							{uniquePhotos.map((photo: { path: string }, index: number) => (
								<SwiperSlide
									key={index}
									className='flex items-center justify-center'
								>
									<motion.div
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.3 }}
										className='w-full h-full flex items-center justify-center'
									>
										<img
											src={getPhotoUrl(photo.path)}
											alt={`Car image ${index + 1}`}
											className='max-w-full max-h-[80vh] object-contain mx-auto'
										/>
									</motion.div>
								</SwiperSlide>
							))}
						</Swiper>

						{/* Custom navigation buttons */}
						<motion.div
							className='absolute left-4 md:left-10 z-10 text-white bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer'
							whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.7)' }}
							whileTap={{ scale: 0.9 }}
							onClick={(e) => {
								e.stopPropagation()
								if (fullscreenSwiperRef) fullscreenSwiperRef.slidePrev()
							}}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={2}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15.75 19.5L8.25 12l7.5-7.5'
								/>
							</svg>
						</motion.div>

						<motion.div
							className='absolute right-4 md:right-10 z-10 text-white bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer'
							whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.7)' }}
							whileTap={{ scale: 0.9 }}
							onClick={(e) => {
								e.stopPropagation()
								if (fullscreenSwiperRef) fullscreenSwiperRef.slideNext()
							}}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={2}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M8.25 4.5l7.5 7.5-7.5 7.5'
								/>
							</svg>
						</motion.div>
					</div>

					<div className='absolute bottom-6 left-0 right-0 z-10'>
						<div className='swiper-pagination flex justify-center gap-1'></div>
						<p className='text-sm text-white text-center mt-2'>
							{activeImageIndex + 1} / {uniquePhotos.length} • Используйте
							стрелки для навигации или свайп на телефоне
						</p>
					</div>
				</motion.div>
			)}
		</div>
	)
}
