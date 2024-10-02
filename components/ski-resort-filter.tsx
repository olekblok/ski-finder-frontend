'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { LoadingOverlay } from './loading-overlay'
import { MountainBackground } from './mountain-background'
import { Snowflake } from 'lucide-react'

const countries = ['Austria', 'Slovakia', 'Czech Republic', 'Slovenia', 'Poland', 'Lithuania', 'Latvia']

export default function SkiResortFilter() {
  const router = useRouter()
  const [totalSlopes, setTotalSlopes] = useState([0, 500])
  const [totalLifts, setTotalLifts] = useState([0, 100])
  const [maxTravelTime, setMaxTravelTime] = useState(24)
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.currentTarget)
  
    formData.append('total_slopes_min', totalSlopes[0].toString())
    formData.append('total_slopes_max', totalSlopes[1].toString())
    formData.append('total_lifts_min', totalLifts[0].toString())
    formData.append('total_lifts_max', totalLifts[1].toString())
  
    formData.append('filter_countries', JSON.stringify(selectedCountries))
  
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        body: formData,
      })
  
      if (!response.ok) {
        throw new Error('Search failed')
      }
  
      const results = await response.json()
      router.push(`/results?data=${encodeURIComponent(JSON.stringify(results))}`)
    } catch (error) {
      console.error('Error:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleCountry = (country: string, isChecked: boolean) => {
    setSelectedCountries(prev => 
      isChecked ? [...prev, country] : prev.filter(c => c !== country)
    )
  }

  const toggleAllCountries = (isChecked: boolean) => {
    setSelectedCountries(isChecked ? [...countries] : [])
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <MountainBackground />
      <div className="absolute top-4 left-4 flex items-center space-x-2 text-gray-800 z-10">
        <Snowflake className="w-6 h-6" />
        <span className="text-xl font-bold">SkiFinder</span>
      </div>
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 w-full max-w-6xl relative z-10 overflow-hidden">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Find your ski resort</h1>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/3 px-2 mb-4">
              <div className="mb-4">
                <Label htmlFor="city" className="text-sm text-gray-700">City</Label>
                <Input id="city" name="city" placeholder="Enter city" required className="bg-white border-gray-300 mt-1" />
              </div>
              <div className="mb-4">
                <Label htmlFor="origin_country" className="text-sm text-gray-700">Origin Country</Label>
                <Input id="origin_country" name="origin_country" placeholder="Enter origin country" required className="bg-white border-gray-300 mt-1" />
              </div>
              <div>
                <Label htmlFor="max_travel_time" className="text-sm text-gray-700">Maximum Travel Time (hours)</Label>
                <Input
                  id="max_travel_time"
                  name="max_travel_time"
                  type="number"
                  min={0}
                  step={0.5}
                  value={maxTravelTime}
                  onChange={(e) => setMaxTravelTime(parseFloat(e.target.value))}
                  className="bg-white border-gray-300 mt-1"
                />
              </div>
            </div>
            <div className="w-full md:w-1/3 px-2 mb-4">
              <div className="mb-4">
                <Label className="text-sm text-gray-700">Total Slopes (km)</Label>
                <Slider
                  min={0}
                  max={500}
                  step={1}
                  value={totalSlopes}
                  onValueChange={setTotalSlopes}
                  className="mt-2"
                />
                <div className="text-xs text-gray-600 mt-1">
                  Min: {totalSlopes[0]} km, Max: {totalSlopes[1]} km
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-700">Total Lifts</Label>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={totalLifts}
                  onValueChange={setTotalLifts}
                  className="mt-2"
                />
                <div className="text-xs text-gray-600 mt-1">
                  Min: {totalLifts[0]}, Max: {totalLifts[1]}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-2 mb-4">
              <Label className="text-sm text-gray-700">Filter Countries</Label>
              <div className="mt-1 space-y-2 max-h-48 overflow-y-auto">
                <div className="flex items-center">
                  <Checkbox
                    id="all-countries"
                    checked={selectedCountries.length === countries.length}
                    onCheckedChange={(checked) => toggleAllCountries(checked as boolean)}
                  />
                  <label htmlFor="all-countries" className="ml-2 text-sm text-gray-700">All Countries</label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {countries.map((country) => (
                    <div key={country} className="flex items-center">
                      <Checkbox
                        id={country}
                        checked={selectedCountries.includes(country)}
                        onCheckedChange={(checked) => toggleCountry(country, checked as boolean)}
                      />
                      <label htmlFor={country} className="ml-2 text-sm text-gray-700">{country}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-700 text-white mt-4" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </div>
      </div>
      {isLoading && <LoadingOverlay />}
    </div>
  )
}