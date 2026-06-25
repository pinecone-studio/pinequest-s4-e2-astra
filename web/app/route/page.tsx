import HomeBackdrop from '@/components/home/HomeBackdrop'
import PhoneFrame from '@/components/home/PhoneFrame'
import RouteMap from '@/app/route/components/RouteMap'
import React from 'react'

export const page = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <HomeBackdrop active={true} />
      <div className="relative z-10">
        <PhoneFrame>
          <RouteMap />
        </PhoneFrame>
      </div>
    </div>
  )
}

export default page
