import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DatasetList from '../DatasetList'
import MarketplaceFilters from './MarketplaceFilters'
import { getMarketData } from './marketplaceSlice'

export default function Marketplace() {
  const dispatch = useDispatch()
  const marketplaceData = useSelector(state => state.marketplace.marketplaceData)

  useEffect(() => {
    dispatch(getMarketData())
  }, [])

  return (
    <div className="flex">
      <div className="mr-80 py-4 px-4 w-full">
        <h1 className="leading-7 font-bold text-2xl mb-4 mt-2 text-blue-500 text-left ml-4">Каталог датасетов</h1>
        {marketplaceData.length > 0 && (
          <DatasetList list={marketplaceData}/>
        )}
      </div>
      <MarketplaceFilters />
    </div>
  )
}
