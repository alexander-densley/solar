'use client'
import { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
interface LongLat {
	lat: number
	lng: number
}

export default function Home() {
	const [value, setValue] = useState(null)
	const [longLat, setLongLat] = useState<LongLat | null>(null)
	const api_key = 'AIzaSyATXsneZIOZjpcf2072D6JtErU1QH4-_WY'

	async function getLongLat() {
		try {
			const place_id = value?.value?.place_id
			console.log(place_id)
			const geoUrl =
				'https://maps.googleapis.com/maps/api/geocode/json?place_id=' +
				place_id +
				'&key=' +
				api_key
			const response = await fetch(geoUrl)
			const data = await response.json()
			console.log(data.results[0].geometry.location)
			setLongLat(data.results[0].geometry.location)
			getSolarData()
		} catch (error) {
			console.log(error)
		}
	}

	async function getSolarData() {
		const solarUrl =
			'https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=' +
			longLat?.lat +
			'&location.longitude=' +
			longLat?.lng +
			'&requiredQuality=HIGH&key=' +
			api_key
		const response = await fetch(solarUrl)
		const data = await response.json()
		console.log(data)
	}

	return (
		<div className='flex flex-col mt-40 justify-center items-center'>
			<p className='text-4xl mb-24'>Enter address...</p>
			<div className='w-72 flex flex-col justify-center'>
				<GooglePlacesAutocomplete
					apiKey='AIzaSyATXsneZIOZjpcf2072D6JtErU1QH4-_WY'
					selectProps={{
						value,
						onChange: setValue,
					}}
				/>
				<input
					type='submit'
					className='border-black w-16 self- border-2 border-solid rounded-md hover:bg-slate-500 active:bg-slate-700 p-2'
					onClick={(e) => {
						e.preventDefault()
						getLongLat()
					}}
				/>
			</div>
		</div>
	)
}
