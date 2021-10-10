import React, {useEffect} from 'react'

import MainContent from '../components/MainContent'
import Sidebar from '../components/sidebar/Sidebar'
import axios from 'axios'

export default function Main() {

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  }, [])

  return (
    <>
      <Sidebar />
      <div className="ml-80 h-screen removeScroll">
        <MainContent />
      </div>
    </>
  )
}
