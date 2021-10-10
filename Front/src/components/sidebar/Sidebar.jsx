import { useDispatch, useSelector } from 'react-redux'

import { RadioGroup } from '@headlessui/react'
import logo from '../../images/logo.svg'
import { setPage } from './sidebarSlice'
import { useHistory } from 'react-router'

export default function Sidebar() {

  const dispatch = useDispatch()
  const history = useHistory()
  const currentPage = useSelector(state => state.sidebar.currentPage)

  const signOutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('dataHubUrl')
    history.push('sign-in')
  }

  return (
    <div className="fixed inset-y-0 left-0 max-w-full flex">
      <div className="relative w-screen max-w-xs">
        <div className="h-full flex flex-col pt-6 bg-white border-r overflow-y-scroll">
          <div className="px-4 sm:px-6 flex w-full justify-around items-center">
            <img src={logo} alt="logo" className="h-6"/>
            <h1 className="text-lg font-medium text-gray-900">{localStorage.getItem('companyName')}</h1>
          </div>
          <div className="mt-6 relative flex-1 px-4 sm:px-6">
            <RadioGroup value={currentPage} onChange={(page) => dispatch(setPage(page))}>
              <RadioGroup.Option value="Профиль" className="outline-none">
                {({ checked }) => (
                  <button className={`${checked ? 'bg-blue-500' : 'hover:bg-blue-500 text-gray-800 hover:text-white transition duration-150 ease-in-out'} text-white py-5 px-3 rounded w-full`}>Профиль</button>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="Каталог" className="mt-4 outline-none">
                {({ checked }) => (
                  <button className={`${checked ? 'bg-blue-500' : 'hover:bg-blue-500 text-gray-800 hover:text-white transition duration-150 ease-in-out'} text-white py-5 px-3 rounded w-full`}>Каталог</button>
                )}
              </RadioGroup.Option>
            </RadioGroup>
          </div>
          <button onClick={signOutHandler} className="text-gray-800 transition duration-150 ease-in-out bg-gray-50 hover:bg-gray-200 py-5 px-3 w-full">Выйти</button>
        </div>
      </div>
    </div>
  )
}