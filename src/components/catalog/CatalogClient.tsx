'use client'

import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { translations, translateSmartly } from '@/lib/translations'
import { formatDate, transformBadgeValue } from '@/lib/utils'
import CarCard from '@/components/catalog/CarCard'
import Loader from '@/components/Loader'

// Type definitions for the filter items
interface FilterItem {
	Value: string
	Count: number
	IsSelected?: boolean
	Refinements?: {
		Nodes: Array<{
			Facets: FilterItem[]
		}>
	}
	Metadata?: {
		ModelStartDate: string[]
		ModelEndDate: string[]
	}
}

// Интерфейс для URL параметров
interface UrlParams {
	manufacturer: string | null
	modelGroup: string | null
	model: string | null
	configuration?: string | null
	badge?: string | null
	badgeDetail?: string | null
}

// Interface for car items
interface CarItem {
	Id: string
	Price: number
	FINISH?: number
	Photo?: string
	Manufacturer?: string
	Model?: string
	Year: string | number
	Mileage: number
	FuelType?: string
	Badge?: string
	BadgeDetail?: string
}

const CatalogClient = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const filtersReady = useRef(true)
	const urlParams = useRef<UrlParams>({
		manufacturer: null,
		modelGroup: null,
		model: null,
		configuration: null,
		badge: null,
		badgeDetail: null,
	})

	const [sortOption, setSortOption] = useState('newest')

	const [loading, setLoading] = useState(false)
	const [searchByNumber, setSearchByNumber] = useState('')

	const [currentPage, setCurrentPage] = useState(1)
	const [totalCars, setTotalCars] = useState(0)

	const [priceStart, setPriceStart] = useState('')
	const [priceEnd, setPriceEnd] = useState('')

	const [mileageStart, setMileageStart] = useState('')
	const [mileageEnd, setMileageEnd] = useState('')

	const [endYear, setEndYear] = useState('')
	const [endMonth, setEndMonth] = useState('00')

	const [startYear, setStartYear] = useState('')
	const [startMonth, setStartMonth] = useState('00')

	const [usdKrwRate, setUsdKrwRate] = useState<number | null>(null)

	const [cars, setCars] = useState<CarItem[]>([])

	const [manufacturers, setManufacturers] = useState<FilterItem[] | null>(null)
	const [selectedManufacturer, setSelectedManufacturer] = useState('')

	const [modelGroups, setModelGroups] = useState<FilterItem[] | null>(null)
	const [selectedModelGroup, setSelectedModelGroup] = useState('')

	const [models, setModels] = useState<FilterItem[] | null>(null)
	const [selectedModel, setSelectedModel] = useState('')

	const [configurations, setConfigurations] = useState<FilterItem[] | null>(
		null,
	)
	const [selectedConfiguration, setSelectedConfiguration] = useState('')

	const [badges, setBadges] = useState<FilterItem[] | null>(null)
	const [selectedBadge, setSelectedBadge] = useState('')

	const [badgeDetails, setBadgeDetails] = useState<FilterItem[] | null>(null)
	const [selectedBadgeDetails, setSelectedBadgeDetails] = useState('')

	const [error, setError] = useState('')

	const sortOptions = {
		newest: '|ModifiedDate',
		priceAsc: '|PriceAsc',
		priceDesc: '|PriceDesc',
		mileageAsc: '|MileageAsc',
		mileageDesc: '|MileageDesc',
		yearDesc: '|Year',
	}

	const fetchCars = async () => {
		setLoading(true)
		setError('')

		const queryParts = []
		const filters = []

		if (searchByNumber) {
			queryParts.push(
				`(And.Hidden.N._.CarType.A._.Simple.keyword(${searchByNumber}).)`,
			)
		} else {
			queryParts.push('(And.Hidden.N._.SellType.일반._.')
		}

		if (selectedManufacturer) {
			if (
				selectedModelGroup &&
				selectedModel &&
				selectedConfiguration &&
				selectedBadge &&
				selectedBadgeDetails
			) {
				const badgeValue = transformBadgeValue(selectedBadge)
				queryParts.push(
					`(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.(C.ModelGroup.${selectedModelGroup}._.(C.Model.${selectedModel}._.(C.BadgeGroup.${selectedConfiguration}._.(C.Badge.${badgeValue}._.BadgeDetail.${selectedBadgeDetails}.))))))`,
				)
			} else if (
				selectedModelGroup &&
				selectedModel &&
				selectedConfiguration &&
				selectedBadge
			) {
				const badgeValue = transformBadgeValue(selectedBadge)
				queryParts.push(
					`(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.(C.ModelGroup.${selectedModelGroup}._.(C.Model.${selectedModel}._.(C.BadgeGroup.${selectedConfiguration}._.Badge.${badgeValue}.)))))`,
				)
			} else if (selectedModelGroup && selectedModel && selectedConfiguration) {
				queryParts.push(
					`(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.(C.ModelGroup.${selectedModelGroup}._.(C.Model.${selectedModel}._.BadgeGroup.${selectedConfiguration}.))))`,
				)
			} else if (selectedModelGroup && selectedModel) {
				queryParts.push(
					`(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.(C.ModelGroup.${selectedModelGroup}._.Model.${selectedModel}.)))`,
				)
			} else if (selectedModelGroup) {
				queryParts.push(
					`(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.ModelGroup.${selectedModelGroup}.))`,
				)
			} else {
				queryParts.push(`(C.CarType.A._.Manufacturer.${selectedManufacturer}.)`)
			}
		} else {
			queryParts.push('CarType.A.')
		}

		if (mileageStart && mileageEnd) {
			filters.push(`Mileage.range(${mileageStart}..${mileageEnd}).`)
		} else if (mileageStart) {
			filters.push(`Mileage.range(${mileageStart}..).`)
		} else if (mileageEnd) {
			filters.push(`Mileage.range(..${mileageEnd}).`)
		}

		if (startYear && startMonth && endYear && endMonth) {
			filters.push(
				`Year.range(${startYear}${startMonth}..${endYear}${endMonth}).`,
			)
		} else if (startYear && startMonth) {
			filters.push(`Year.range(${startYear}${startMonth}..).`)
		} else if (endYear && endMonth) {
			filters.push(`Year.range(..${endYear}${endMonth}).`)
		} else if (startYear && endYear) {
			filters.push(`Year.range(${startYear}00..${endYear}99).`)
		} else if (startYear) {
			filters.push(`Year.range(${startYear}00..).`)
		} else if (endYear) {
			filters.push(`Year.range(..${endYear}99).`)
		}

		if (priceStart && priceEnd) {
			filters.push(`Price.range(${priceStart}..${priceEnd}).`)
		} else if (priceStart) {
			filters.push(`Price.range(${priceStart}..).`)
		} else if (priceEnd) {
			filters.push(`Price.range(..${priceEnd}).`)
		}

		const query =
			queryParts.join('') +
			(filters.length ? `_.${filters.join('_.')}` : '') +
			')'

		const itemsPerPage = 20
		const offset = (currentPage - 1) * itemsPerPage

		const sortValue = sortOptions[sortOption as keyof typeof sortOptions]
		const url = `https://encar-proxy.onrender.com/api/catalog?count=true&q=${query}&sr=${sortValue}|${offset}|${itemsPerPage}`

		console.log('Raw query URL:', url)

		try {
			const response = await axios.get(encodeURI(url))

			if (response.data && response.data.error) {
				console.error('Получен ответ с ошибкой:', response.data.error)
				setError(
					'На сайте ведутся технические работы. Пожалуйста, попробуйте позже.',
				)
				setCars([])
				setLoading(false)
				return
			}

			setCars(response.data?.SearchResults || [])
			setLoading(false)
			window.scrollTo({ top: 0, behavior: 'smooth' })
		} catch (error) {
			console.error('Ошибка при загрузке автомобилей:', error)
			setError(
				'На сайте ведутся технические работы. Пожалуйста, попробуйте позже.',
			)
			setCars([])
			setLoading(false)
		}
	}

	useEffect(() => {
		// Get parameters directly from Next.js searchParams
		const manufacturer = searchParams.get('manufacturer')
		const modelGroup = searchParams.get('modelGroup')
		const model = searchParams.get('model')
		const configuration = searchParams.get('configuration')
		const badge = searchParams.get('badge')
		const badgeDetail = searchParams.get('badgeDetail')

		urlParams.current = {
			manufacturer,
			modelGroup,
			model,
			configuration,
			badge,
			badgeDetail,
		}

		// Устанавливаем значения из URL только если они есть
		if (manufacturer) {
			setSelectedManufacturer(manufacturer)
		}

		// Параметры ниже установим после загрузки соответствующих списков
		// в соответствующих useEffect функциях
	}, [searchParams])

	useEffect(() => {
		const savedFiltersRaw = localStorage.getItem('exportCatalogFilters')
		if (!savedFiltersRaw) {
			filtersReady.current = true
			return
		}

		try {
			const savedFilters = JSON.parse(savedFiltersRaw)

			setSelectedManufacturer(
				urlParams.current.manufacturer ||
					savedFilters.selectedManufacturer ||
					'',
			)
			setSelectedConfiguration(savedFilters.selectedConfiguration || '')
			setSelectedBadge(savedFilters.selectedBadge || '')
			setSelectedBadgeDetails(savedFilters.selectedBadgeDetails || '')
			setStartYear(savedFilters.startYear || '')
			setStartMonth(savedFilters.startMonth || '00')
			setEndYear(savedFilters.endYear || '')
			setEndMonth(savedFilters.endMonth || '00')
			setMileageStart(savedFilters.mileageStart || '')
			setMileageEnd(savedFilters.mileageEnd || '')
			setPriceStart(savedFilters.priceStart || '')
			setPriceEnd(savedFilters.priceEnd || '')
			setSearchByNumber(savedFilters.searchByNumber || '')

			setTimeout(() => {
				filtersReady.current = true
			}, 0)
		} catch (e) {
			console.error('Ошибка при чтении фильтров из localStorage', e)
			filtersReady.current = true
		}
	}, [])

	useEffect(() => {
		const filters = {
			selectedManufacturer,
			selectedModelGroup,
			selectedModel,
			selectedConfiguration,
			selectedBadge,
			selectedBadgeDetails,
			startYear,
			startMonth,
			endYear,
			endMonth,
			mileageStart,
			mileageEnd,
			priceStart,
			priceEnd,
			searchByNumber,
		}
		localStorage.setItem('exportCatalogFilters', JSON.stringify(filters))
	}, [
		selectedManufacturer,
		selectedModelGroup,
		selectedModel,
		selectedConfiguration,
		selectedBadge,
		selectedBadgeDetails,
		startYear,
		startMonth,
		endYear,
		endMonth,
		mileageStart,
		mileageEnd,
		priceStart,
		priceEnd,
		searchByNumber,
	])

	useEffect(() => {
		const fetchUsdKrwRate = async () => {
			try {
				const response = await axios.get(
					'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
				)

				if (response.status === 200) {
					const jsonData = response.data
					const rate = jsonData['usd']['krw']

					console.log(rate)

					setUsdKrwRate(rate)
				}
			} catch (e) {
				console.error(e)
			}
		}

		fetchUsdKrwRate()
	}, [])

	useEffect(() => {
		// Запускаем первоначальную загрузку автомобилей после инициализации
		if (filtersReady.current) {
			fetchCars()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) // Только при монтировании компонента

	useEffect(() => {
		if (filtersReady.current) {
			fetchCars()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		selectedManufacturer,
		selectedModelGroup,
		selectedModel,
		selectedConfiguration,
		selectedBadge,
		selectedBadgeDetails,
		startYear,
		startMonth,
		endYear,
		endMonth,
		mileageStart,
		mileageEnd,
		priceStart,
		priceEnd,
		searchByNumber,
		currentPage,
		sortOption,
	])

	useEffect(() => {
		const fetchManufacturers = async () => {
			setCurrentPage(1)
			const url = `https://api.encar.com/search/car/list/general?count=true&q=(And.Hidden.N._.SellType.%EC%9D%BC%EB%B0%98._.CarType.A.)&inav=%7CMetadata%7CSort`

			const response = await axios.get(url)

			const data = response.data
			const count = data?.Count

			setTotalCars(count)

			const manufacturers =
				data?.iNav?.Nodes[2]?.Facets[0]?.Refinements?.Nodes[0]?.Facets

			setManufacturers(manufacturers)
		}

		fetchManufacturers()
	}, [])

	useEffect(() => {
		const fetchModelGroups = async () => {
			if (!selectedManufacturer) return

			setCurrentPage(1)

			const url = `https://api.encar.com/search/car/list/general?count=true&q=(And.Hidden.N._.SellType.%EC%9D%BC%EB%B0%98._.(C.CarType.A._.Manufacturer.${selectedManufacturer}.))&inav=%7CMetadata%7CSort`

			try {
				const response = await axios.get(url)
				const data = response?.data
				const count = data?.Count

				setTotalCars(count)

				const allManufacturers =
					data?.iNav?.Nodes[2]?.Facets[0]?.Refinements?.Nodes[0]?.Facets

				const filteredManufacturer = allManufacturers.filter(
					(item: FilterItem) => item.IsSelected === true,
				)[0]

				const models = filteredManufacturer?.Refinements?.Nodes[0]?.Facets

				setModelGroups(models)

				if (urlParams.current.modelGroup) {
					const modelExists = models?.some(
						(model: FilterItem) => model.Value === urlParams.current.modelGroup,
					)
					if (modelExists) {
						setSelectedModelGroup(urlParams.current.modelGroup)
					}
				}
			} catch (error) {
				console.error('Ошибка при загрузке моделей:', error)
			}
		}

		fetchModelGroups()
	}, [selectedManufacturer])

	useEffect(() => {
		const fetchModelGroups = async () => {
			if (!selectedModelGroup) return
			setCurrentPage(1)

			const url = `https://api.encar.com/search/car/list/general?count=true&q=(And.Hidden.N._.SellType.%EC%9D%BC%EB%B0%98._.(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.ModelGroup.${selectedModelGroup}.)))&inav=%7CMetadata%7CSort`
			const response = await axios.get(url)

			const data = response?.data
			const count = data?.Count

			setTotalCars(count)

			const allManufacturers =
				data?.iNav?.Nodes[2]?.Facets[0]?.Refinements?.Nodes[0]?.Facets

			const filteredManufacturer = allManufacturers.filter(
				(item: FilterItem) => item.IsSelected === true,
			)[0]

			const modelGroup = filteredManufacturer?.Refinements?.Nodes[0]?.Facets
			const filteredModel = modelGroup.filter(
				(item: FilterItem) => item.IsSelected === true,
			)[0]
			const models = filteredModel?.Refinements?.Nodes[0]?.Facets

			setModels(models)

			if (urlParams.current.model) {
				const modelExists = models?.some(
					(model: FilterItem) => model.Value === urlParams.current.model,
				)
				if (modelExists) {
					setSelectedModel(urlParams.current.model)
				}
				urlParams.current = {
					manufacturer: null,
					modelGroup: null,
					model: null,
				}
			}
		}

		fetchModelGroups()
	}, [selectedManufacturer, selectedModelGroup])

	useEffect(() => {
		const fetchConfigurations = async () => {
			if (!selectedModel) return
			setCurrentPage(1)

			const url = `https://api.encar.com/search/car/list/general?count=true&q=(And.Hidden.N._.(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.(C.ModelGroup.${selectedModelGroup}._.Model.${selectedModel}.))))&inav=%7CMetadata%7CSort`

			try {
				const response = await axios.get(encodeURI(url))

				const data = response?.data
				const count = data?.Count

				setTotalCars(count)

				const allManufacturers =
					data?.iNav?.Nodes[1]?.Facets[0]?.Refinements?.Nodes[0]?.Facets

				const filteredManufacturer = allManufacturers.filter(
					(item: FilterItem) => item.IsSelected === true,
				)[0]

				const modelGroup = filteredManufacturer?.Refinements?.Nodes[0]?.Facets

				const filteredModel = modelGroup?.filter(
					(item: FilterItem) => item.IsSelected === true,
				)[0]

				const models = filteredModel?.Refinements?.Nodes[0]?.Facets
				const filteredConfiguration = models?.filter(
					(item: FilterItem) => item.IsSelected === true,
				)[0]

				const configurations =
					filteredConfiguration?.Refinements?.Nodes[0]?.Facets

				setConfigurations(configurations)

				// Устанавливаем конфигурацию из URL, если она указана
				if (urlParams.current.configuration) {
					const configExists = configurations?.some(
						(config: FilterItem) =>
							config.Value === urlParams.current.configuration,
					)
					if (configExists) {
						setSelectedConfiguration(urlParams.current.configuration!)
						// Очищаем, чтобы не применялась повторно
						urlParams.current.configuration = null
					}
				}
			} catch (error) {
				console.error('Ошибка при загрузке конфигураций:', error)
			}
		}

		fetchConfigurations()
	}, [selectedManufacturer, selectedModelGroup, selectedModel])

	useEffect(() => {
		if (!selectedConfiguration) return
		setCurrentPage(1)

		const fetchBadges = async () => {
			const url = `https://api.encar.com/search/car/list/general?count=true&q=(And.Hidden.N._.(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.(C.ModelGroup.${selectedModelGroup}._.(C.Model.${selectedModel}._.BadgeGroup.${selectedConfiguration}.)))))&inav=%7CMetadata%7CSort`

			try {
				const response = await axios.get(encodeURI(url))

				const data = response?.data
				const count = data?.Count

				setTotalCars(count)

				const allManufacturers =
					data?.iNav?.Nodes[1]?.Facets[0]?.Refinements?.Nodes[0]?.Facets

				const filteredManufacturer = allManufacturers.filter(
					(item: FilterItem) => item.IsSelected === true,
				)[0]

				const modelGroup = filteredManufacturer?.Refinements?.Nodes[0]?.Facets

				const filteredModel = modelGroup?.filter(
					(item: FilterItem) => item.IsSelected === true,
				)[0]

				const models = filteredModel?.Refinements?.Nodes[0]?.Facets
				const filteredConfiguration = models?.filter(
					(item: FilterItem) => item.IsSelected === true,
				)[0]

				const configurations =
					filteredConfiguration?.Refinements?.Nodes[0]?.Facets

				const filteredBadgeGroup = configurations?.filter(
					(item: FilterItem) => item.IsSelected === true,
				)[0]

				const badges = filteredBadgeGroup?.Refinements?.Nodes[0]?.Facets

				setBadges(badges)

				// Устанавливаем badge из URL, если он указан
				if (urlParams.current.badge) {
					const badgeExists = badges?.some(
						(badge: FilterItem) => badge.Value === urlParams.current.badge,
					)
					if (badgeExists) {
						setSelectedBadge(urlParams.current.badge!)
						// Не очищаем, так как нужно для загрузки badge details
					}
				}
			} catch (error) {
				console.error('Ошибка при загрузке бэджей:', error)
			}
		}

		fetchBadges()
	}, [
		selectedManufacturer,
		selectedModelGroup,
		selectedModel,
		selectedConfiguration,
	])

	useEffect(() => {
		const fetchBadgeDetails = async () => {
			if (!selectedBadge) return
			setCurrentPage(1)

			// Формируем URL без двойного кодирования
			const badgeValue = transformBadgeValue(selectedBadge)

			// Используем encodeURI для всего URL вместо кодирования отдельных параметров
			const url = `https://api.encar.com/search/car/list/general?count=true&q=(And.Hidden.N._.SellType.일반._.(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.(C.ModelGroup.${selectedModelGroup}._.(C.Model.${selectedModel}._.(C.BadgeGroup.${selectedConfiguration}._.Badge.${badgeValue}.))))))&inav=%7CMetadata%7CSort`

			console.log('Raw URL:', url)

			try {
				// Используем axios.get с encodeURI для правильного кодирования URL
				const response = await axios.get(encodeURI(url))

				const data = response?.data

				const count = data?.Count

				setTotalCars(count)

				const allManufacturers =
					data?.iNav?.Nodes[2]?.Facets[0]?.Refinements?.Nodes[0]?.Facets

				const filteredManufacturer = allManufacturers?.find(
					(item: FilterItem) => item.IsSelected,
				)
				const modelGroup = filteredManufacturer?.Refinements?.Nodes[0]?.Facets
				const filteredModel = modelGroup?.find(
					(item: FilterItem) => item.IsSelected,
				)

				const models = filteredModel?.Refinements?.Nodes[0]?.Facets
				const filteredConfiguration = models?.find(
					(item: FilterItem) => item.IsSelected,
				)

				const configurations =
					filteredConfiguration?.Refinements?.Nodes[0]?.Facets
				const filteredBadgeGroup = configurations?.find(
					(item: FilterItem) => item.IsSelected,
				)

				const badges = filteredBadgeGroup?.Refinements?.Nodes[0]?.Facets
				const filteredBadge = badges?.find(
					(item: FilterItem) => item.IsSelected,
				)

				const badgeDetails = filteredBadge?.Refinements?.Nodes[0]?.Facets

				setBadgeDetails(badgeDetails)

				// Устанавливаем badgeDetail из URL, если он указан
				if (urlParams.current.badgeDetail) {
					const detailExists = badgeDetails?.some(
						(detail: FilterItem) =>
							detail.Value === urlParams.current.badgeDetail,
					)
					if (detailExists) {
						setSelectedBadgeDetails(urlParams.current.badgeDetail!)
						// Очищаем, чтобы не применялась повторно
						urlParams.current.badge = null
						urlParams.current.badgeDetail = null
					}
				}
			} catch (error) {
				console.error('Ошибка при получении badgeDetails:', error)
			}
		}

		fetchBadgeDetails()
	}, [
		selectedManufacturer,
		selectedModelGroup,
		selectedModel,
		selectedConfiguration,
		selectedBadge,
	])

	useEffect(() => {
		if (!selectedManufacturer) {
			setSelectedModelGroup('')
			setSelectedModel('')
			setSelectedConfiguration('')
			setSelectedBadge('')
			setSelectedBadgeDetails('')
		}
	}, [selectedManufacturer])

	useEffect(() => {
		if (!selectedModelGroup) {
			setSelectedModel('')
			setSelectedConfiguration('')
			setSelectedBadge('')
			setSelectedBadgeDetails('')
		}
	}, [selectedModelGroup])

	useEffect(() => {
		if (!selectedModel) {
			setSelectedConfiguration('')
			setSelectedBadge('')
			setSelectedBadgeDetails('')
		}
	}, [selectedModel])

	useEffect(() => {
		if (!selectedConfiguration) {
			setSelectedBadge('')
			setSelectedBadgeDetails('')
		}
	}, [selectedConfiguration])

	useEffect(() => {
		if (!selectedBadge) {
			setSelectedBadgeDetails('')
		}
	}, [selectedBadge])

	const handleManufacturerChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const value = e.target.value
		setSelectedModelGroup('')
		setSelectedModel('')
		setSelectedConfiguration('')
		setSelectedBadge('')
		setSelectedBadgeDetails('')
		setSelectedManufacturer(value)
		setCurrentPage(1)

		if (value) {
			router.push(`/catalog?manufacturer=${value}`, { scroll: false })
		} else {
			router.push('/catalog', { scroll: false })
		}
	}

	const handleModelGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		setSelectedModel('')
		setSelectedConfiguration('')
		setSelectedBadge('')
		setSelectedBadgeDetails('')
		setSelectedModelGroup(value)
		setCurrentPage(1)

		if (value) {
			router.push(
				`/catalog?manufacturer=${
					selectedManufacturer || ''
				}&modelGroup=${value}`,
				{ scroll: false },
			)
		} else {
			router.push(`/catalog?manufacturer=${selectedManufacturer || ''}`, {
				scroll: false,
			})
		}
	}

	const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		setSelectedConfiguration('')
		setSelectedBadge('')
		setSelectedBadgeDetails('')
		setSelectedModel(value)
		setCurrentPage(1)

		if (value) {
			router.push(
				`/catalog?manufacturer=${selectedManufacturer || ''}&modelGroup=${
					selectedModelGroup || ''
				}&model=${value}`,
				{ scroll: false },
			)
		} else {
			router.push(
				`/catalog?manufacturer=${selectedManufacturer || ''}&modelGroup=${
					selectedModelGroup || ''
				}`,
				{ scroll: false },
			)
		}
	}

	const handleConfigurationChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const value = e.target.value
		setSelectedBadge('')
		setSelectedBadgeDetails('')
		setSelectedConfiguration(value)
		setCurrentPage(1)

		if (value) {
			router.push(
				`/catalog?manufacturer=${selectedManufacturer || ''}&modelGroup=${
					selectedModelGroup || ''
				}&model=${selectedModel || ''}&configuration=${value}`,
				{ scroll: false },
			)
		} else {
			router.push(
				`/catalog?manufacturer=${selectedManufacturer || ''}&modelGroup=${
					selectedModelGroup || ''
				}&model=${selectedModel || ''}`,
				{ scroll: false },
			)
		}
	}

	const handleBadgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		setSelectedBadgeDetails('')
		setSelectedBadge(value)
		setCurrentPage(1)

		if (value) {
			router.push(
				`/catalog?manufacturer=${selectedManufacturer || ''}&modelGroup=${
					selectedModelGroup || ''
				}&model=${selectedModel || ''}&configuration=${
					selectedConfiguration || ''
				}&badge=${value}`,
				{ scroll: false },
			)
		} else {
			router.push(
				`/catalog?manufacturer=${selectedManufacturer || ''}&modelGroup=${
					selectedModelGroup || ''
				}&model=${selectedModel || ''}&configuration=${
					selectedConfiguration || ''
				}`,
				{ scroll: false },
			)
		}
	}

	const handleBadgeDetailsChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const value = e.target.value
		setSelectedBadgeDetails(value)
		setCurrentPage(1)

		if (value) {
			router.push(
				`/catalog?manufacturer=${selectedManufacturer || ''}&modelGroup=${
					selectedModelGroup || ''
				}&model=${selectedModel || ''}&configuration=${
					selectedConfiguration || ''
				}&badge=${selectedBadge || ''}&badgeDetail=${value}`,
				{ scroll: false },
			)
		} else {
			router.push(
				`/catalog?manufacturer=${selectedManufacturer || ''}&modelGroup=${
					selectedModelGroup || ''
				}&model=${selectedModel || ''}&configuration=${
					selectedConfiguration || ''
				}&badge=${selectedBadge || ''}`,
				{ scroll: false },
			)
		}
	}

	return (
		<div className='md:mt-40 mt-35 px-6'>
			<h1 className='text-3xl font-bold text-center mb-5'>
				Каталог автомобилей
			</h1>
			<div className='md:flex flex-col items-end md:mr-20 md:block hidden'>
				<label htmlFor='sortOptions'>Сортировать по</label>
				<select
					className='border border-gray-300 rounded-md px-4 py-2 shadow-sm'
					value={sortOption}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
						setSortOption(e.target.value)
						setCurrentPage(1)
					}}
				>
					<option value='newest'>Сначала новые</option>
					<option value='priceAsc'>Цена: по возрастанию</option>
					<option value='priceDesc'>Цена: по убыванию</option>
					<option value='mileageAsc'>Пробег: по возрастанию</option>
					<option value='mileageDesc'>Пробег: по убыванию</option>
					<option value='yearDesc'>Год: от новых</option>
				</select>
			</div>
			<div className='container m-auto grid grid-cols-1 md:grid-cols-5 md:gap-15'>
				<div className='md:col-span-1.5'>
					<select
						className='w-full border border-gray-300 rounded-md px-3 py-2 mt-4'
						value={selectedManufacturer}
						onChange={handleManufacturerChange}
					>
						<option value=''>Марка</option>
						{manufacturers
							?.filter((manufacturer: FilterItem) => manufacturer.Count > 0)
							.map((manufacturer: FilterItem, index: number) => (
								<option key={index} value={manufacturer.Value}>
									{translateSmartly(manufacturer.Value)} ({manufacturer.Count}{' '}
									автомобилей)
								</option>
							))}
					</select>
					<select
						disabled={selectedManufacturer.length === 0}
						className='w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200'
						value={selectedModelGroup}
						onChange={handleModelGroupChange}
					>
						<option value=''>Модель</option>
						{modelGroups
							?.filter((modelGroup: FilterItem) => modelGroup.Count > 0)
							.map((modelGroup: FilterItem, index: number) => (
								<option key={index} value={modelGroup.Value}>
									{translateSmartly(modelGroup.Value)} ({modelGroup.Count}{' '}
									автомобилей)
								</option>
							))}
					</select>
					<select
						disabled={selectedModelGroup.length === 0}
						className='w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200'
						value={selectedModel}
						onChange={handleModelChange}
					>
						<option value=''>Поколение</option>
						{models
							?.filter((model: FilterItem) => model.Count > 0)
							.map((model: FilterItem, index: number) => (
								<option key={index} value={model.Value}>
									{translations[model.Value] ||
										translateSmartly(model.Value) ||
										model.Value}{' '}
									({formatDate(model?.Metadata?.ModelStartDate?.[0] || '')} -{' '}
									{formatDate(model?.Metadata?.ModelEndDate?.[0] || '')}) (
									{model.Count} автомобилей )
								</option>
							))}
					</select>
					<select
						disabled={selectedModel.length === 0}
						className='w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200'
						value={selectedConfiguration}
						onChange={handleConfigurationChange}
					>
						<option value=''>Конфигурация</option>
						{configurations
							?.filter((configuration: FilterItem) => configuration.Count > 0)
							.map((configuration: FilterItem, index: number) => (
								<option key={index} value={configuration.Value}>
									{translateSmartly(configuration.Value)} ({configuration.Count}
									)
								</option>
							))}
					</select>
					<select
						disabled={selectedConfiguration.length === 0}
						className='w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200'
						value={selectedBadge}
						onChange={handleBadgeChange}
					>
						<option value=''>Выберите конфигурацию</option>
						{badges
							?.filter((badge: FilterItem) => badge.Count > 0)
							.map((badge: FilterItem, index: number) => (
								<option key={index} value={badge.Value}>
									{translateSmartly(badge.Value)} ({badge.Count})
								</option>
							))}
					</select>

					<select
						disabled={selectedBadge.length === 0}
						className='w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200'
						value={selectedBadgeDetails}
						onChange={handleBadgeDetailsChange}
					>
						<option value=''>Выберите комплектацию</option>
						{badgeDetails
							?.filter((badgeDetails: FilterItem) => badgeDetails.Count > 0)
							.map((badgeDetail: FilterItem, index: number) => (
								<option key={index} value={badgeDetail.Value}>
									{translateSmartly(badgeDetail.Value)} ({badgeDetail.Count})
								</option>
							))}
					</select>

					<div className='grid grid-cols-2 gap-3'>
						<select
							className='w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200'
							value={startYear}
							onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
								setStartYear(e.target.value)
							}
						>
							<option value=''>Год от</option>
							{Array.from(
								{
									length:
										(endYear ? parseInt(endYear) : new Date().getFullYear()) -
										1979,
								},
								(_, i) => 1980 + i,
							)
								.reverse()
								.map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
						</select>

						<select
							className='w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200'
							value={startMonth}
							onChange={(e) => setStartMonth(e.target.value)}
						>
							<option value=''>Месяц от</option>
							{Array.from({ length: 12 }, (_, i) => {
								const value = (i + 1).toString().padStart(2, '0')
								const monthNames = [
									'Январь',
									'Февраль',
									'Март',
									'Апрель',
									'Май',
									'Июнь',
									'Июль',
									'Август',
									'Сентябрь',
									'Октябрь',
									'Ноябрь',
									'Декабрь',
								]
								return (
									<option key={value} value={value}>
										{monthNames[i]}
									</option>
								)
							})}
						</select>
					</div>
					<div className='grid grid-cols-2 gap-3'>
						<select
							className='w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200'
							value={endYear}
							onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
								setEndYear(e.target.value)
							}
						>
							<option value=''>Год до</option>
							{Array.from(
								{
									length:
										new Date().getFullYear() -
										(startYear ? parseInt(startYear) : 1980) +
										1,
								},
								(_, i) => (startYear ? parseInt(startYear) : 1980) + i,
							)
								.reverse()
								.map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
						</select>

						<select
							className='w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200'
							value={endMonth}
							onChange={(e) => setEndMonth(e.target.value)}
						>
							<option value=''>Месяц до</option>
							{Array.from({ length: 12 }, (_, i) => {
								const value = (i + 1).toString().padStart(2, '0')
								return { value, i }
							})
								.filter(
									({ value }) =>
										!startMonth || parseInt(value) >= parseInt(startMonth),
								)
								.map(({ value, i }) => {
									const monthNames = [
										'Январь',
										'Февраль',
										'Март',
										'Апрель',
										'Май',
										'Июнь',
										'Июль',
										'Август',
										'Сентябрь',
										'Октябрь',
										'Ноябрь',
										'Декабрь',
									]
									return (
										<option key={value} value={value}>
											{monthNames[i]}
										</option>
									)
								})}
						</select>
					</div>

					<select
						className='w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200'
						value={mileageStart}
						onChange={(e) => setMileageStart(e.target.value)}
					>
						<option value=''>Пробег от</option>
						{Array.from({ length: 20 }, (_, i) => {
							const mileage = (i + 1) * 10000
							return (
								<option key={mileage} value={mileage}>
									{mileage.toLocaleString()} км
								</option>
							)
						})}
					</select>

					<select
						className='w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200'
						value={mileageEnd}
						onChange={(e) => setMileageEnd(e.target.value)}
					>
						<option value=''>Пробег До</option>
						{Array.from({ length: 20 }, (_, i) => {
							const mileage = (i + 1) * 10000
							return (
								<option key={mileage} value={mileage}>
									{mileage.toLocaleString()} км
								</option>
							)
						})}
					</select>

					<div className='grid grid-cols-2 gap-3 mt-4'>
						<select
							className='w-full border border-gray-300 rounded-md px-3 py-2'
							value={priceStart}
							onChange={(e) => {
								const value = e.target.value
								setPriceStart(value)
								if (priceEnd && parseInt(value) > parseInt(priceEnd)) {
									setPriceEnd('')
								}
							}}
						>
							<option value=''>Цена от</option>
							{Array.from({ length: 100 }, (_, i) => (i + 1) * 100)
								.filter((price) => !priceEnd || price <= parseInt(priceEnd))
								.map((price) => (
									<option key={price} value={price}>
										₩{(price * 10000).toLocaleString()}
									</option>
								))}
						</select>

						<select
							className='w-full border border-gray-300 rounded-md px-3 py-2'
							value={priceEnd}
							onChange={(e) => {
								const value = e.target.value
								setPriceEnd(value)
								if (priceStart && parseInt(value) < parseInt(priceStart)) {
									setPriceStart('')
								}
							}}
						>
							<option value=''>Цена до</option>
							{Array.from({ length: 100 }, (_, i) => (i + 1) * 100)
								.filter((price) => !priceStart || price >= parseInt(priceStart))
								.map((price) => (
									<option key={price} value={price}>
										₩{(price * 10000).toLocaleString()}
									</option>
								))}
						</select>
					</div>

					<input
						type='text'
						placeholder='Поиск по номеру авто (например, 49сер0290)'
						className='w-full border border-gray-300 rounded-md px-3 py-2 mt-5'
						value={searchByNumber}
						onChange={(e) => {
							setSearchByNumber(e.target.value)
							setCurrentPage(1)
						}}
					/>

					<button
						className='w-full bg-red-500 text-white py-2 px-4 mt-5 rounded hover:bg-red-600 transition cursor-pointer'
						onClick={() => {
							setSelectedManufacturer('')
							setSelectedModelGroup('')
							setSelectedModel('')
							setSelectedConfiguration('')
							setSelectedBadge('')
							setSelectedBadgeDetails('')
							setStartYear('')
							setStartMonth('00')
							setEndYear('')
							setEndMonth('00')
							setMileageStart('')
							setMileageEnd('')
							setPriceStart('')
							setPriceEnd('')
							setSearchByNumber('')
							setCurrentPage(1)
							router.push('/catalog', { scroll: false })
						}}
					>
						Сбросить фильтры
					</button>
				</div>

				{loading ? (
					<div className='flex justify-center items-center h-screen'>
						<Loader />
					</div>
				) : cars.length > 0 ? (
					<div className='md:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8'>
						<div className='w-full md:hidden'>
							<label htmlFor='sortOptions' className='mb-2 block text-center'>
								Сортировать по
							</label>
							<select
								className='border border-gray-300 rounded-md px-4 py-2 shadow-sm w-full'
								value={sortOption}
								onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
									setSortOption(e.target.value)
									setCurrentPage(1)
								}}
							>
								<option value='newest'>Сначала новые</option>
								<option value='priceAsc'>Цена: по возрастанию</option>
								<option value='priceDesc'>Цена: по убыванию</option>
								<option value='mileageAsc'>Пробег: по возрастанию</option>
								<option value='mileageDesc'>Пробег: по убыванию</option>
								<option value='yearDesc'>Год: от новых</option>
							</select>
						</div>
						{cars.map((car) => (
							<CarCard key={car.Id} car={car} usdKrwRate={usdKrwRate || 0} />
						))}
					</div>
				) : (
					<div className='flex justify-center items-center h-32'>
						<p className='text-xl font-semibold text-gray-700'>
							{error || 'Автомобили не найдены'}
						</p>
					</div>
				)}
			</div>
			{cars.length > 0 && totalCars > 20 && (
				<div className='flex justify-center mt-10 mb-10'>
					<div className='flex flex-wrap justify-center items-center gap-2 px-4 max-w-full'>
						{currentPage > 1 && (
							<button
								onClick={() => setCurrentPage(currentPage - 1)}
								className='cursor-pointer w-10 h-10 flex items-center justify-center border rounded-md text-sm font-medium shadow-sm bg-white text-gray-800 hover:bg-gray-100'
							>
								‹
							</button>
						)}
						{Array.from({ length: Math.ceil(totalCars / 20) }, (_, i) => i + 1)
							.filter((page) => {
								if (currentPage <= 3) return page <= 5
								const lastPage = Math.ceil(totalCars / 20)
								if (currentPage >= lastPage - 2) return page >= lastPage - 4
								return page >= currentPage - 2 && page <= currentPage + 2
							})
							.map((page) => (
								<button
									key={page}
									onClick={() => setCurrentPage(page)}
									className={`cursor-pointer w-10 h-10 flex items-center justify-center border rounded-md text-sm font-medium shadow-sm transition-all duration-200 ${
										currentPage === page
											? 'bg-black text-white'
											: 'bg-white text-gray-800 hover:bg-gray-100'
									}`}
								>
									{page}
								</button>
							))}
						{currentPage < Math.ceil(totalCars / 20) && (
							<button
								onClick={() => setCurrentPage(currentPage + 1)}
								className='cursor-pointer w-10 h-10 flex items-center justify-center border rounded-md text-sm font-medium shadow-sm bg-white text-gray-800 hover:bg-gray-100'
							>
								›
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default CatalogClient
