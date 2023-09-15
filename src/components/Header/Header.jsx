import React, { useState } from 'react'
import {
      Navbar,
      Nav,
      NavItem,
      NavLink,

} from 'reactstrap';

import { selectToken, selectUserName, logout } from '../../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {

      const navigate = useNavigate()

      const dispatch = useDispatch()

      const token = useSelector(selectToken)
      const userName = useSelector(selectUserName)

      let navItem = null;
      if (token === null) {
            navItem = (
                  <NavItem className='mr-10 font-semibold text-xl text-rose-500 cursor-pointer' onClick={() => navigate('/login')} >
                        Login
                  </NavItem >)
      } else {
            navItem = (
                  <>
                        <NavItem className='font-semibold text-xl text-rose-500'>
                              Hello, {userName}!
                        </NavItem>
                        <NavItem className='mr-10 font-semibold text-xl text-rose-500 cursor-pointer' onClick={() => dispatch(logout())}>
                              Logout
                        </NavItem>
                  </>)
      }

      return (
            <div className='flex flex-col justify-center items-center sticky top-0 z-50'>
                  <div className='w-full justify-center items-center bg-lime-200'>
                        <h1 className='p-2 italic text-center'>Photo Gallery</h1>
                  </div>
                  <div className='w-full bg-stone-200'>
                        <Navbar className="w-full">
                              <Nav className="ml-10 me-auto w-full flex flex-row sm:flex-col gap-5 justify-between">
                                    <NavItem className='font-semibold text-xl text-rose-500 cursor-pointer' onClick={() => navigate('/')}>
                                          Home
                                    </NavItem>
                                    {navItem}
                              </Nav>
                        </Navbar>
                  </div>
            </div>
      )
}

export default Header