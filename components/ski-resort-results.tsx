'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star, ChevronUp, ChevronDown, Snowflake } from 'lucide-react'
import { MountainBackground } from './mountain-background'

type Resort = {
  ski_resort_name: string
  city: string
  country: string
  rating: string
  elevation_info: string
  total_slopes: number
  blue_slopes: number
  red_slopes: number
  black_slopes: number
  total_lifts: number
  total_big_gondolas: number
  total_gondolas: number
  total_chairlifts: number
  total_t_bars: number
  total_moving_carpets: number
  travel_time: number
  distance: number
}

type SortKey = 'rating' | 'total_slopes' | 'total_lifts' | 'travel_time' | 'distance'

export default function SkiResortResults() {
  const searchParams = useSearchParams()
  const [resorts, setResorts] = useState<Resort[]>([])
  const [sortedResorts, setSortedResorts] = useState<Resort[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('rating')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    const data = searchParams.get('data')
    if (data) {
      const parsedData = JSON.parse(decodeURIComponent(data)) as Resort[]
      setResorts(parsedData)
      setSortedResorts(parsedData)
    }
  }, [searchParams])

  useEffect(() => {
    sortResorts(sortKey, sortOrder)
  }, [sortKey, sortOrder, resorts])

  const sortResorts = (key: SortKey, order: 'asc' | 'desc') => {
    const sorted = [...resorts].sort((a, b) => {
      let aValue = a[key]
      let bValue = b[key]

      if (key === 'rating') {
        aValue = parseFloat(a.rating.split(' ')[0])
        bValue = parseFloat(b.rating.split(' ')[0])
      }

      if (order === 'asc') {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })
    setSortedResorts(sorted)
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const renderStars = (rating: string) => {
    const numStars = parseFloat(rating.split(' ')[0])
    return Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(numStars)) {
        return <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
      } else if (i === Math.floor(numStars) && numStars % 1 >= 0.5) {
        return (
          <div key={i} className="relative">
            <Star className="h-4 w-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
            </div>
          </div>
        )
      } else {
        return <Star key={i} className="h-4 w-4 text-gray-300" />
      }
    })
  }

  if (resorts.length === 0) {
    return (
      <div className="min-h-screen relative">
        <MountainBackground />
        <div className="absolute inset-0 flex items-center justify-center">
          <Card className="bg-white bg-opacity-90 p-8 text-center">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">No results found.</h2>
              <p className="mb-6">Try adjusting your search criteria to find more ski resorts.</p>
              <Link href="/" passHref>
                <Button variant="secondary">Back to Search</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <MountainBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2 text-gray-800">
            <Snowflake className="w-6 h-6" />
            <span className="text-xl font-bold">SkiFinder</span>
          </div>
          <Link href="/" passHref>
            <Button variant="secondary">Back to Search</Button>
          </Link>
        </div>
        <div className="flex justify-center items-center space-x-4 mb-8">
          <Select value={sortKey} onValueChange={(value) => setSortKey(value as SortKey)}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="total_slopes">Total Slopes</SelectItem>
              <SelectItem value="total_lifts">Total Lifts</SelectItem>
              <SelectItem value="travel_time">Travel Time</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={toggleSortOrder} variant="outline" className="bg-white">
            {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedResorts.map((resort, index) => (
            <Card key={index} className="overflow-hidden bg-white bg-opacity-90">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">{resort.ski_resort_name}</h2>
                <p className="text-sm text-gray-600 mb-2">{resort.city}, {resort.country}</p>
                <div className="flex items-center mb-2">
                  {renderStars(resort.rating)}
                  <span className="ml-2">{resort.rating}</span>
                </div>
                <p className="text-sm mb-2">{resort.elevation_info}</p>
                <p className="font-semibold mb-2">Total slopes: {resort.total_slopes} km</p>
                <div className="space-y-2 mb-4">
                  <div>
                    <span className="text-sm">Blue: {resort.blue_slopes} km</span>
                    <Progress value={(resort.blue_slopes / resort.total_slopes) * 100} className="h-2 bg-blue-100" indicatorClassName="bg-blue-600" />
                  </div>
                  <div>
                    <span className="text-sm">Red: {resort.red_slopes} km</span>
                    <Progress value={(resort.red_slopes / resort.total_slopes) *100} className="h-2 bg-red-100" indicatorClassName="bg-red-600" />
                  </div>
                  <div>
                    <span className="text-sm">Black: {resort.black_slopes} km</span>
                    <Progress value={(resort.black_slopes / resort.total_slopes) * 100} className="h-2 bg-gray-100" indicatorClassName="bg-gray-600" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <p>Total lifts: {resort.total_lifts}</p>
                  <p>Big Gondolas: {resort.total_big_gondolas}</p>
                  <p>Gondolas: {resort.total_gondolas}</p>
                  <p>Chairlifts: {resort.total_chairlifts}</p>
                  <p>T-Bars: {resort.total_t_bars}</p>
                  <p>Moving Carpets: {resort.total_moving_carpets}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 border-t pt-2">
                  <p>Travel time: {resort.travel_time.toFixed(2)} hours</p>
                  <p>Distance: {resort.distance.toFixed(2)} km</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}