import React, { useRef } from "react";

import { parseDatahub } from "./datahubSlice";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";

export default function DatahubAuth() {
  const dispatch = useDispatch()
  const urlRef = useRef(null)
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  
  const submitHandler = () => {
    const url = urlRef.current.value
    const username = usernameRef.current.value
    const password = passwordRef.current.value

    if (!url || !username || !password) {
      toast.error("Заполните все поля")
    } else {
      dispatch(parseDatahub({url, username, password}))
    }
  }

  return (
      <div className="mx-4 inline-block p-6 overflow-hidden text-left align-middle transition-all transform bg-white rounded-3xl border">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Введите данные своего Datahub Аккаунта
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            После авторизации вашего datahub вы сможете манипулировать своими датасетами на нешй платформе.
          </p>
        </div>
        <div className="mt-4">
          <label htmlFor="link" className="font-semibold text-sm text-gray-600 pb-1 block">Ссылка на datahub</label>
          <input
            ref={urlRef}
            type="text"
            name="link"
            className="w-full md:w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={localStorage.getItem('dataHubUrl')}
          />
        </div>
        
        <div className="mt-2 flex">
          <div className="flex-1 mt-2 mr-4">
            <label htmlFor="login" className="font-semibold text-sm text-gray-600 pb-1 block">Логин</label>
            <input
              ref={usernameRef}
              type="text"
              name="login"
              className="w-full md:w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 mt-2 ml-4">
            <label htmlFor="pass" className="font-semibold text-sm text-gray-600 pb-1 block">Пароль</label>
            <input
              ref={passwordRef}
              type="password"
              name="pass"
              className=" w-full md:w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="cursor-pointer inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            onClick={submitHandler}
          >
            Отправить
          </button>
        </div>
      </div>
  )
}
