import { configureStore } from '@reduxjs/toolkit'
import photoReducer from './slices/photoSlice'
import authReducer from '../redux/slices/authSlice'

export default configureStore({
      reducer: {
            photo: photoReducer,
            auth: authReducer
      },
})