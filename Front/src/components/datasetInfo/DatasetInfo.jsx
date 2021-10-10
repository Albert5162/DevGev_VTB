import { CogIcon, PlusIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import { addField, getDataset, removeField } from './datasetInfoSlice'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../Loader'
import {orderDataset} from '../datahub/datahubSlice'

const typeToColor = {
  NUMBER: "bg-green-100 text-green-800",
  STRING: "bg-red-100 text-red-800",
  BOOLEAN: "bg-indigo-100 text-indigo-800",
  DATE: "bg-blue-100 text-blue-800",
  STRUCT: "bg-gray-100 text-gray-800"
}

export default function DatasetInfo() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOrdered, setIsOrdered] = useState(false)
  const dispatch = useDispatch()
  const urn = useSelector(state => state.datasetInfo.urn)
  const dataset = useSelector(state => state.datasetInfo.dataset)
  const loading = useSelector(state => state.datasetInfo.loading)
  const selectedFields = useSelector(state => state.datasetInfo.selectedFields)
  console.log(selectedFields)

  useEffect(() => {
    dispatch(getDataset(urn))
  }, [urn])

  const checkboxHandler = (e, field) => {
    if (e.target.checked) {
      dispatch(addField(field))
    } else {
      dispatch(removeField(field))
    }
  }

  return (
    <>
    {loading ? (
      <div className="flex flex-col items-center justify-center h-screen w-full p-4">
        <Loader />
      </div>
    ) : (
      <div className="flex flex-col p-4 text-left">
        {dataset.name && (
          <>
            <div className="flex items-center mt-2">
              <div className="flex flex-col ">
                <h1 className="leading-7 font-bold text-2xl text-blue-500 ">{dataset.name}</h1>
                <p className="text-md text-gray-600">{dataset.description}</p>
              </div>
              {isOrdered && (
                <p className="ml-4 text-md text-green-600">Заказан</p>
              )}
            </div>

            <div className="flex flex-col mt-4 justify-between">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 rounded-3xl">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Поле
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Тип
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Цена
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dataset.schemaMetadata.fields.map((field,idx) => (
                          <tr key={idx}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                <input className="rounded focus:outline-none focus:ring-0 text-blue-500" type="checkbox" onChange={(e)=>checkboxHandler(e, field)} />
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{field.fieldPath.split('.').join(' → ')}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${typeToColor[field.type]}`}>
                                {field.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-900`}>
                                {idx+1 * 4 /10}﹩
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {isOpen ? (
                      <div className="w-full py-2 px-8 border-t text-gray-800 flex items-center">
                        <label htmlFor="field" className="mr-2">Поле:</label>
                        <input name="field" type="text" className="py-2 px-4 w-48 rounded-xl" />
                        <label htmlFor="select" className="mr-2 ml-4">Тип:</label>
                        <select name="select" className="w-48 rounded-xl">
                          <option value="value 1">NUMBER</option>
                          <option value="value 1" selected>STRING</option>
                          <option value="value 1">BOOLEAN</option>
                          <option value="value 1">DATE</option>
                          <option value="value 1">STRUCT</option>
                        </select>
                        <button className="ml-2 h-full p-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg flex items-center">
                          <CogIcon className="w-5 h-5 mr-1"/>
                          Настройки
                        </button>
                        <button onClick={()=>setIsOpen(false)} className="ml-auto py-2 px-4 bg-red-400 hover:bg-red-500 text-white rounded-xl">
                          Отменить
                        </button>
                        <button className="ml-2 py-2 px-4 bg-blue-400 hover:bg-blue-500 text-white rounded-xl">
                          Подтвердить
                        </button>
                      </div>
                    ) : (
                      <button onClick={()=>setIsOpen(true)} className="w-full py-2 px-8 bg-blue-400 hover:bg-blue-500 text-white flex items-center justify-center">
                        <PlusIcon className="w-8 h-8"/>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {!isOrdered && (
                <button onClick={()=>setIsOrdered(true)} className="mt-4 w-full py-3 rounded-2xl px-8 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center">
                  Заказать
                </button>
              )}
            </div>
          </>
        )}
      </div>
    )}
    </>
  )
}
