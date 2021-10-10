import { AdjustmentsIcon, LinkIcon, UserIcon } from '@heroicons/react/outline'

import React from 'react'
import { openDataset } from './datasetInfo/datasetInfoSlice'
import { setPage } from './sidebar/sidebarSlice'
import { useDispatch } from 'react-redux'

export default function DatasetList({list}) {
  const dispatch = useDispatch()

  const setDataset = (dataset) => {
    dispatch(openDataset(dataset.urn))
    dispatch(setPage("Датасет"))
  }

  if (!list) return null

  return (
    <div className="flex w-full flex-col h-screen text-left overflow-y-scroll removeScroll px-4">
      {list.map(dataset => (
        <div onClick={()=>setDataset(dataset)} key={dataset._id} className="h-24 px-8 bg-white rounded-3xl hover:shadow-lg border mb-4 cursor-pointer transition duration-200 ease-in-out">
          <div className="flex h-full items-center justify-between">
            <div className="flex flex-col">
              <h3>{dataset.name}</h3>
              <p className="text-sm text-gray-600">{dataset.description}</p>
            </div>
            <p className="text-sm text-green-600">{dataset.ordered}</p>
            <div className="flex pl-4">
              {dataset?.fichers > 0 && (
                <div className="mr-2 flex items-center">
                  <AdjustmentsIcon className="w-5 h-5 mr-1"/>
                  {dataset.fichers}
                </div>
              )}
              {dataset?.fk > 0 && (
                <div className=" flex items-center">
                  <LinkIcon className="w-5 h-5 mr-1"/>
                  {dataset.fk}
                </div>
              )}
              {dataset?.user && (
                <div className="flex items-center ">
                  <UserIcon className="ml-2 h-5 w-5 mr-1"/>
                  <h3 className="cursor-pointer hover:underline">{dataset.user}</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
