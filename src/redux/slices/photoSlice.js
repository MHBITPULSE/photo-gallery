import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const photoSlice = createSlice({
      name: 'photo',
      initialState: {
            photos: [],
            isAdding: false,
            photoErrorMsg: null,
            isLoading: false
      },
      reducers: {
            photoLoaded: (state, action) => {
                  state.photos = action.payload
                  state.isLoading = false
            },
            photoLoadError: (state) => {
                  state.photoErrorMsg = "Something went wrong"
                  state.isLoading = false
            },
            photoAddSuccess: (state, action) => {
                  state.value += action.payload
            },
            photoLoading: (state) => {
                  state.isLoading = true
            },
      },
})

// Action creators are generated for each case reducer function
export const { photoLoaded, photoLoadError, photoAddSuccess, photoLoading } = photoSlice.actions

export const selectPhotoErrorMsg = (state) => state.photo.photoErrorMsg
export const selectPhotos = (state) => state.photo.photos
export const selectPhotoLoading = (state) => state.photo.isLoading

export const loadPhotos = (category, photoId) => async (dispatch) => {
      dispatch(photoLoading())

      let url = null

      if (category !== null)
            url = "https://photo-gallery-7dab5-default-rtdb.firebaseio.com/photos.json?" + 'orderBy="category"&equalTo="' + category + '"'
      else if (photoId !== null)
            url = "https://photo-gallery-7dab5-default-rtdb.firebaseio.com/photos/" + photoId + ".json?"
      else
            url = "https://photo-gallery-7dab5-default-rtdb.firebaseio.com/photos.json"

      await axios.get(url)
            .then(response => dispatch(photoLoaded(Object.entries(response.data))))
            .catch(err => dispatch(photoLoadError(err)))
}

export default photoSlice.reducer