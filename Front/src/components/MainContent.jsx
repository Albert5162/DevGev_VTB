import DatasetInfo from './datasetInfo/DatasetInfo'
import Marketplace from './marketplace/Marketplace'
import Profile from './Profile/Profile'
import React from 'react'
import { useSelector } from 'react-redux'

const pageToComponent = {
  "Профиль": Profile,
  "Каталог": Marketplace,
  "Датасет": DatasetInfo
}

export default function MainContent() {
  const currentPage = useSelector(state => state.sidebar.currentPage)

  return React.createElement(
    pageToComponent[currentPage]
  )
}
