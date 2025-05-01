declare module '@/components' {
	export interface CarInspectionProps {
		car: {
			vehicleId: string
			vehicleNo?: string
			[key: string]: unknown
		}
	}

	export const CarInspection: React.FC<CarInspectionProps>
}
