import {configureStore} from '@reduxjs/toolkit' 
import AuthSlice from '../slices/authSlice'
import ToggleSlice from '../slices/toggleSlice'


export const Store = configureStore({
    reducer:{
        Auth:AuthSlice,
        Toggle:ToggleSlice
    }
})

export default Store;