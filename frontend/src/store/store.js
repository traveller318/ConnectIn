import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user/user.js"
export default configureStore({
  reducer: {
    user: userReducer
  }
})