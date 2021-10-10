import authReducer from '../components/auth/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../components/counter/counterSlice'
import datahubReducer from '../components/datahub/datahubSlice'
import datasetModalReducer from '../components/datasetInfo/datasetInfoSlice'
import marketplaceReducer from '../components/marketplace/marketplaceSlice'
import sidebarReducer from '../components/sidebar/sidebarSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    sidebar: sidebarReducer,
    datahub: datahubReducer,
    marketplace: marketplaceReducer,
    datasetInfo: datasetModalReducer
  },
})
