import React from 'react'
import { getProviderGear } from './_actions/getProvidersGear'

const MyGearsPage = async() => {
  const providerGears = await getProviderGear();
  console.log(providerGears);
  return (
    <div>
      <div>
        title and subtitle here
      </div>
      //? ekta option rakhbo create gears
      <div>

      </div>

      //? je gear gual ache aegula show korbo
      
    </div>
  )
}

export default MyGearsPage
