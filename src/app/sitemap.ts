import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://dadmotors.ru',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: 'https://dadmotors.ru/about',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: 'https://dadmotors.ru/catalog',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: 'https://dadmotors.ru/contacts',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: 'https://dadmotors.ru/car/bmw-x5',
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.6,
		},
		{
			url: 'https://dadmotors.ru/car/audi-a6',
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.6,
		},
	]
}
