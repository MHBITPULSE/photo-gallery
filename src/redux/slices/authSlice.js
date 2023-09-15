import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const authSlice = createSlice({
      name: "auth",
      initialState: {
            userName: null,
            token: null,
            userId: null,
            authFailedMsg: null
      },
      reducers: {
            authSuccess: (state, action) => {
                  state.userName = action.payload.displayName;
                  state.token = action.payload.token;
                  state.userId = action.payload.userId
            },
            authFailed: (state, action) => {
                  state.token = action.payload.token;
                  state.userId = action.payload.userId
            },
            logout: (state) => {
                  localStorage.removeItem('useName')
                  localStorage.removeItem('token')
                  localStorage.removeItem('userId')
                  localStorage.removeItem('expirationTime')
                  state.userName = null;
                  state.token = null;
                  state.userId = null
            }
      }
})

export const { authSuccess, authFailed, logout } = authSlice.actions

export const selectToken = (state) => state.auth.token
export const selectUserId = (state) => state.auth.userId
export const selectUserName = (state) => state.auth.userName

export const auth = (isSignIn, values) => async (dispatch) => {
      const user = {
            email: values.email,
            password: values.password,
            returnSecureToken: true
      }
      const API_KEY = "AIzaSyD1Ub2SB1ZoBp7PsEAX_0uAPIDJdUwC8tk"
      let url = isSignIn ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + API_KEY : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY

      await axios.post(url, user)
            .then(async (response) => {
                  console.log(response)
                  if (!isSignIn) {
                        const userUpdate = {
                              idToken: response.data.idToken,
                              displayName: values.displayName,
                              returnSecureToken: false
                        }
                        await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + API_KEY, userUpdate)
                              .then(res => {
                                    console.log(res)
                                    localStorage.setItem('userName', res.data.displayName)
                                    localStorage.setItem('token', res.data.idToken)
                                    localStorage.setItem('userId', res.data.localId)
                                    let expirationTime = new Date(new Date().getTime() + res.data.expiresIn * 1000);

                                    localStorage.setItem('expirationTime', expirationTime)
                                    dispatch(authSuccess(res.data))

                              })
                              .catch(err => {
                                    console.log(err)
                              })
                  } else {
                        localStorage.setItem('userName', response.data.displayName)
                        localStorage.setItem('token', response.data.idToken)
                        localStorage.setItem('userId', response.data.localId)
                        let expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                        localStorage.setItem('expirationTime', expirationTime)
                        dispatch(authSuccess(response.data))
                  }
            })
            .catch(err => {
                  console.log(err.response.data.error.message)
            })


}

export const authCheck = () => (dispatch) => {
      const token = localStorage.getItem('token');
      if (!token) {
            //logout
            dispatch(logout())
      } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'))
            if (expirationTime <= new Date()) {
                  //logout
                  dispatch(logout())
            } else {
                  const userId = localStorage.getItem('userId');
                  const userName = localStorage.getItem('userName')
                  dispatch(authSuccess({ token: token, userId: userId, displayName: userName }))
            }
      }
}

export default authSlice.reducer