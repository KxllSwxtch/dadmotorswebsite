"use client"

import { translateSmartly, translations } from "@/lib/translations"
import Link from "next/link"
import Image from "next/image"

interface CarCardProps {
  car: {
    Price: number
    FINISH?: number
    Photo?: string
    Manufacturer?: string
    Model?: string
    Year: string | number
    Mileage: number
    FuelType?: string
    Id: string
    Badge?: string
    BadgeDetail?: string
  }
  usdKrwRate: number
}

const CarCard = ({ car, usdKrwRate }: CarCardProps) => {
  const carPriceKrw = car?.Price * 10000
  const carPriceUsd = Math.round(carPriceKrw / usdKrwRate).toLocaleString()

  const carName = `${translateSmartly(
    car.Manufacturer ?? ""
  )} ${translateSmartly(car.Model ?? "")} ${translateSmartly(
    car?.Badge ?? ""
  )} ${translateSmartly(car?.BadgeDetail ?? "")}`.trim()

  const carImage =
    car.Photo !== undefined
      ? `https://ci.encar.com${car.Photo}001.jpg?impolicy=heightRate&rh=696&cw=1400&ch=696&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_04.png&t=20250401111058`
      : "https://www.nayamotorsinc.com/assets/images/car_placeholder.png"

  return (
    <div className="rounded-2xl shadow-xl bg-white overflow-hidden border border-gray-200 flex flex-col">
      {/* Оборачиваем картинку в div с относительным позиционированием */}
      <div className="relative w-full h-55 md:h-40 overflow-hidden">
        <img
          src={carImage}
          alt={`${carName} ${String(car.Year).slice(0, 4)} года - D.A.D Motors`}
          width={400}
          height={300}
          className="object-cover object-center w-full h-full"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <h2 className="text-lg font-bold text-center text-gray-900 mb-4">
            {carName}
          </h2>
          <div className="text-gray-600 text-base space-y-2">
            <div className="flex justify-between border-b border-dotted pb-1">
              <span>Год</span>
              <span className="font-medium">
                {String(car.Year).slice(0, 4)}.{String(car.Year).slice(4)} г.
              </span>
            </div>
            <div className="flex justify-between border-b border-dotted pb-1">
              <span>Пробег</span>
              <span className="font-medium">
                {car.Mileage.toLocaleString()} км
              </span>
            </div>
            <div className="flex justify-between border-b border-dotted pb-1">
              <span>Тип топлива</span>
              <span className="font-medium">
                {car.FuelType ? translations[car.FuelType] || "-" : "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4">
          <p className="text-lg font-bold text-center text-black">
            ₩{carPriceKrw.toLocaleString()}
          </p>
          <hr />
          <p className="text-center text-gray-700 font-semibold text-lg">
            ${carPriceUsd}
          </p>
        </div>

        <Link
          href={`/car/${car.Id}`}
          aria-label={`Подробная информация об автомобиле ${carName}`}
          className="mt-6 bg-black text-white font-semibold text-center py-2 rounded-md hover:bg-gray-900 transition"
        >
          Узнать подробнее
        </Link>
      </div>
    </div>
  )
}

export default CarCard
