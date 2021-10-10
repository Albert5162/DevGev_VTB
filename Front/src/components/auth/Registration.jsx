import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, useRef } from 'react'
import { clearState, signup } from './authSlice'
import { useDispatch, useSelector } from 'react-redux';

import registrationImage from '../../images/registration.svg'
import styles from './auth.module.css'
import toast from 'react-hot-toast'

export default function Registration() {
  const dispatch = useDispatch()
  const history = useHistory()
  const isError = useSelector(state => state.auth.isError)
  const isFetching = useSelector(state => state.auth.isFetching)
  const isSuccess = useSelector(state => state.auth.isSuccess)

  const companyRef = useRef(null)
  const loginRef = useRef(null)
  const passwordRef = useRef(null)
  const loading = useRef(null)

  useEffect(() => {
    return () => {
      dispatch(clearState())
    }
  }, [])

  useEffect(() => {
    if (isError) {
      if (loading.current) toast.dismiss(loading.current)
      toast.error("Произошла ошибка. Повторите попытку")
      companyRef.current.value = null
      loginRef.current.value = null
      passwordRef.current.value = null
    }
  }, [isError])
  
  useEffect(() => {
    if (isFetching) {
      if (loading.current) toast.dismiss(loading.current)
      loading.current = toast.loading('Загрузка...')
    }
  }, [isFetching])

  useEffect(() => {
    if (isSuccess) {
      if (loading.current) toast.dismiss(loading.current)
      history.push('/')
    }
  }, [isSuccess])


  const submitHandler = (e) => {
    e.preventDefault()
    const companyName = companyRef.current.value
    const login = loginRef.current.value
    const password = passwordRef.current.value

    if (!companyName || !login || !password) {
      toast.error("Заполните все поля")
    } else {
      dispatch(signup({companyName, login, password}))
    }
  }

  return (
    <div className={`${styles.authBg}`}>
      <div className="w-full h-screen filter blur-3xl absolute opacity-70 bg-white">&nbsp;</div>
      <div className="min-h-screen flex justify-center items-center py-12 px-6 lg:px-8">
        <div className="flex justify-center shadow-xl border border-gray-100 rounded-lg overflow-hidden z-50">

          <div className="sm:max-w-md bg-white border-r border-gray-100 py-2 px-4 flex flex-col">
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">Создайте Аккаунт</h2>
            <p className="mt-2 text-center text-sm text-gray-600 max-w">
              Уже Зарегестрированны?
              <Link to="/sign-in" className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"> Войти</Link>
            </p>
            <div className="my-auto w-72">
              <img className="w-full" src={registrationImage} alt="Workflow" />
            </div>
          </div>

          <div className="">
            <div className="bg-white py-8 px-6 sm:px-10">
              <form className="mb-0 space-y-6" onSubmit={submitHandler}>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">Компания</label>
                  <div className="mt-1">
                    <input ref={companyRef} id="company" name="company" type="text" autoComplete="vtb-company" />
                  </div>
                </div>
                <div>
                  <label htmlFor="login" className="block text-sm font-medium text-gray-700">Логин</label>
                  <div className="mt-1">
                    <input ref={loginRef} id="login" name="login" type="text" autoComplete="vtb-login" />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
                  <div className="mt-1">
                    <input ref={passwordRef} id="password" name="password" type="password" autoComplete="vtb-password" />
                  </div>
                </div>
                <div>
                  <button type="submit" className="mt-20 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Зарегестрироваться</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
