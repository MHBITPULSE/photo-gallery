import React, { useState } from 'react'
import {
      Navbar,
      Nav,
      NavItem,
      NavLink,

} from 'reactstrap';

import { selectToken, selectUserName, logout } from '../../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {

      const dispatch = useDispatch()

      const token = useSelector(selectToken)
      const userName = useSelector(selectUserName)

      let navItem = null;
      if (token === null) {
            navItem = (<NavItem>
                  <NavLink href="/login">
                        Login
                  </NavLink>
            </NavItem>)
      } else {
            navItem = (
                  <>
                        <NavItem>
                              <NavLink href="#">Hello, {userName}!</NavLink>
                        </NavItem>
                        <NavItem>
                              <NavLink className='cursor-pointer' onClick={() => dispatch(logout())}>
                                    Logout
                              </NavLink>
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
                              <Nav className="me-auto w-full flex gap-5 justify-between">
                                    <NavItem>
                                          <NavLink href="/">Home</NavLink>
                                    </NavItem>
                                    {navItem}
                              </Nav>
                        </Navbar>
                  </div>
            </div>
      )
}

export default Header