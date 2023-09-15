import React from 'react'
import { Formik } from 'formik';
import axios from 'axios';

const AddPhoto = () => {

      return (
            <div>
                  <Formik
                        initialValues={{ title: '', category: 'Flower', img: '' }}
                        validate={values => {
                              const errors = {};
                              if (!values.title) {
                                    errors.title = 'Required';
                              }
                              if (!values.category) {
                                    errors.category = 'Required';
                              }
                              if (!values.img) {
                                    errors.img = 'Required';
                              }
                              return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                              axios.post('https://photo-gallery-7dab5-default-rtdb.firebaseio.com/photos.json', values)
                                    .then(response => console.log(response))
                                    .catch(err => console.log(err))

                              setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
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
                                    <h4>Add a new Photo</h4>
                                    <input
                                          type="text"
                                          name="title"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.title}
                                          placeholder='Input Title'
                                          className='p-2 border-1 border-slate-600 rounded-lg'
                                    />
                                    <h6 className='p-2 text-red-700'>{errors.title && touched.title && errors.title}</h6>
                                    <input
                                          type="text"
                                          name="img"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.img}
                                          placeholder='Input Image Link'
                                          className='p-2 border-1 border-slate-600 rounded-lg'
                                    />
                                    <h6 className='p-2 text-red-700'>{errors.img && touched.img && errors.img}</h6>

                                    <select
                                          type="text"
                                          name="category"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.category}
                                          className='p-2 border-1 border-slate-600 rounded-lg'>
                                          <option value="Flower">Flower</option>
                                          <option value="Animal">Animal</option>
                                          <option value="Nature">Nature</option>
                                          <option value="Food">Food</option>
                                          <option value="Bird">Bird</option>
                                    </select>
                                    <h6 className='p-2 text-red-700'>{errors.category && touched.category && errors.category}</h6>
                                    <button className='btn btn-success' type="submit" disabled={isSubmitting}>
                                          Submit
                                    </button>
                              </form>
                        )}
                  </Formik>
            </div>
      )
}

export default AddPhoto