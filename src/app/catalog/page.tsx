'use client'

import CatalogClient from '@/components/catalog/CatalogClient'
import { Suspense } from 'react'

export default function CatalogPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<CatalogClient />
		</Suspense>
	)
}
