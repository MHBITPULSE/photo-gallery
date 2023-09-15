import React, { useEffect } from 'react'

import Photos from './components/photos/Photos'
import Header from './components/Header/Header'
import SideBar from './components/SideBar/SideBar'
import { authCheck, selectToken } from './redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
      const dispatch = useDispatch();
      const token = useSelector(selectToken);
      useEffect(() => {
            dispatch(authCheck())
      }, [])
      return (
            <div>
                  <Header />
                  <div className='flex'>
                        <div className='w-1/6 bg-cyan-100'>
                              <SideBar />
                        </div>
                        <div className='w-5/6'>
                              <Photos />
                        </div>
                  </div>

            </div>
      )
}

export default Home