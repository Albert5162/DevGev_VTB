import DatahubAuth from '../datahub/DatahubAuth'
import DatasetList from '../DatasetList'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const dataHubData = useSelector(state => state.datahub.dataHubData)

  return (
    <div className="flex flex-col py-4 px-4">
      <DatahubAuth />
      {!!dataHubData.length && (
        <h1 className="leading-7 font-bold text-2xl mt-8 mb-4 text-blue-500 text-left ml-4">Ваши датасеты</h1>
      )}
      <DatasetList list={dataHubData}/>
    </div>
  )
}
