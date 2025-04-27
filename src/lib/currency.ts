import axios from 'axios'

// Примерное соотношение между воной и долларом (может меняться со временем)
// 1 USD = примерно 1350 KRW
const KRW_TO_USD_RATIO = 1350

interface CBRResponse {
	Date: string
	Valute: {
		USD: {
			Value: number
			Previous: number
		}
		[key: string]: {
			Value: number
			Previous: number
		}
	}
}

/**
 * Получает актуальный курс валют с API ЦБ РФ
 */
export async function fetchCurrencyRates(): Promise<CBRResponse | null> {
	try {
		const response = await axios.get<CBRResponse>(
			'https://www.cbr-xml-daily.ru/daily_json.js',
		)
		return response.data
	} catch (error) {
		console.error('Ошибка при получении курса валют:', error)
		return null
	}
}

/**
 * Конвертирует корейские воны (KRW) в доллары США (USD)
 */
export function krwToUsd(krwAmount: number): number {
	return Number((krwAmount / KRW_TO_USD_RATIO).toFixed(2))
}

/**
 * Конвертирует доллары США (USD) в российские рубли (RUB) по текущему курсу
 */
export function usdToRub(usdAmount: number, usdRate: number): number {
	return Number((usdAmount * usdRate).toFixed(2))
}

/**
 * Конвертирует корейские воны (KRW) в российские рубли (RUB)
 */
export function krwToRub(krwAmount: number, usdRate: number): number {
	const usdAmount = krwToUsd(krwAmount)
	return usdToRub(usdAmount, usdRate)
}

/**
 * Форматирует цену в выбранной валюте с соответствующим символом
 */
export function formatPrice(
	amount: number,
	currency: 'USD' | 'RUB' | 'KRW',
): string {
	const formatter = new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency,
		maximumFractionDigits: currency === 'KRW' ? 0 : 2,
	})

	return formatter.format(amount)
}
