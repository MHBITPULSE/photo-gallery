import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { auth, selectToken } from '../../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
      const dispatch = useDispatch()
      const token = useSelector(selectToken)
      const [isSignIn, setIsSignIn] = useState(true)

      const navigate = useNavigate()

      useEffect(() => {
            if (token !== null) navigate('/')
      }, [token])

      return (
            <div>
                  <Formik
                        initialValues={{ displayName: '', email: '', password: '' }}
                        validate={values => {
                              const errors = {};
                              if (!values.displayName && !isSignIn) {
                                    errors.displayName = 'Required';
                              } else if (!values.email) {
                                    errors.email = 'Required';
                              } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                              ) {
                                    errors.email = 'Invalid email address';
                              }
                              return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                              dispatch(auth(isSignIn, values))
                              setTimeout(() => {
                                    setSubmitting(false);
                                    //navigate('/')
                              }, 400);
                        }}
                  >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                              /* and other goodies */
                        }) => (
                              <form onSubmit={handleSubmit} className='p-4 flex flex-col'>
                                    <h4>{isSignIn ? "Sign In" : "Sign Up"} with Email and Password</h4>
                                    {!isSignIn && <>
                                          <input
                                                type="trxt"
                                                name="displayName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.displayName}
                                                placeholder='Your Name'
                                                className='p-2 border-1 border-slate-600 rounded-lg'
                                          />
                                          <h6 className='p-2 text-red-700'>{errors.displayName && touched.displayName && errors.displayName}</h6>
                                    </>}
                                    <input
                                          type="email"
                                          name="email"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.email}
                                          placeholder='Your Email'
                                          className='p-2 border-1 border-slate-600 rounded-lg'
                                    />
                                    <h6 className='p-2 text-red-700'>{errors.email && touched.email && errors.email}</h6>
                                    <input
                                          type="password"
                                          name="password"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.password}
                                          placeholder='Your Password'
                                          className='p-2 border-1 border-slate-600 rounded-lg'
                                    />
                                    <h6 className='p-2 text-red-700'>{errors.password && touched.password && errors.password}</h6>


                                    <button className='btn btn-success' type="submit" disabled={isSubmitting}>
                                          {isSignIn ? "Sign In" : "Sign Up"}
                                    </button>
                                    <h6 className='p-4 cursor-pointer text-teal-600 justify-center text-center' onClick={() => setIsSignIn(!isSignIn)}>{isSignIn ? "New Member? Please Sign Up!" : "Already a Member? Please Sign In!"}</h6>
                              </form>
                        )}
                  </Formik>
            </div>
      )
}

export default Login