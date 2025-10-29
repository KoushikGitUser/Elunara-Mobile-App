import {configureStore} from '@reduxjs/toolkit' 
import AuthSlice from '../slices/authSlice'
import ToggleSlice from '../slices/toggleSlice'
import GlobalDataSlice from '../slices/globalDataSlice'


export const Store = configureStore({
    reducer:{
        Auth:AuthSlice,
        Toggle:ToggleSlice,
        Global:GlobalDataSlice,
    }
})

export default Store;