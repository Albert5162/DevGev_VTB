import { Disclosure, Switch } from '@headlessui/react'
import React, {useState} from 'react'

import { CheckIcon } from '@heroicons/react/outline'
import { ChevronUpIcon } from '@heroicons/react/solid'

const filters = [
  {
    id: 'companies',
    name: 'companies',
    options: [
      { value: 'ВТБ', label: 'ВТБ', checked: false },
      { value: 'ФинТех', label: 'ФинТех', checked: false },
      { value: 'SERGEY', label: 'SERGEY', checked: true },
      { value: 'Sushi-Wok', label: 'Sushi-Wok', checked: false },
    ],
  },
]

export default function MarketplaceFilters() {
  const [enabled, setEnabled] = useState(false)
  return (
    <aside className="w-80 rounded-tl-3xl h-screen fixed right-0 bg-gray-100 ml-auto px-6">
        <h1 className="leading-7 font-bold text-2xl text-gray-800 mt-6">Фильтры</h1>
        <div className="w-full mt-4">
          <div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl">
            <Disclosure defaultOpen>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                    <span>Компания</span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-blue-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-left text-gray-500">
                    {filters[0].options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-left">
                        <input
                          id={`filter-mobile--${optionIdx}`}
                          name={`[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={option.checked}
                          className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`filter-mobile-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-500"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                    <span>Цена</span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-blue-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 text-left">
                    Фильтры по цене
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                    <span>Дата</span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-blue-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-left text-gray-500">
                    <label htmlFor="ot" value="От">От</label>
                    <input name="ot" type="date" className="py-1 mb-2"/>
                    <label value="До">До</label>
                    <input htmlFor="do" name="do" type="date" className="py-1"/>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                    <span>Размер</span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-blue-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 text-left">
                      Фильтры по цене
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
        <button className="mt-4 flex items-center w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
          <CheckIcon className="w-4 h-4 mr-2" />
          Подтвердить
        </button>
    </aside>
  )
}
