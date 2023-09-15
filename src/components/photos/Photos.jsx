import React, { useEffect, useState } from 'react'
import Photo from './photo/Photo'
import { PHOTOS } from '../../photosDB'
import { selectPhotos, loadPhotos, selectPhotoLoading } from '../../redux/slices/photoSlice'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import { useParams } from 'react-router-dom'

const Photos = () => {
    const dispatch = useDispatch();
    const photos = useSelector(selectPhotos);
    const isLoading = useSelector(selectPhotoLoading);
    console.log(photos)
    //const [photos, setPhotos] = useState([])
    // const loadPhotos = async () => {
    //     await axios.get("https://photo-gallery-7dab5-default-rtdb.firebaseio.com/photos.json")
    //         .then(response => setPhotos(Object.values(response.data)))
    //         .catch(err => console.log(err))
    // }

    const params = useParams();
    console.log(photos)

    useEffect(() => {
        let category = params.hasOwnProperty('category') ? params.category.charAt(0).toUpperCase() +
            params.category.slice(1) : null;
        dispatch(loadPhotos(category, null))
    }, [])


    let Photos = null;
    if (isLoading) {
        Photos = <Spinner />
    } else if (photos.length === 0) {
        Photos = <h6>No Photo Found</h6>
    }
    else {
        Photos = photos.map((item, index) => <Photo photo={item} key={index} />)
    }


    return (
        <div className='p-3 bg-danger-subtle d-flex flex-wrap gap-3 justify-content-center h-auto'>
            {Photos}
        </div>
    )
}

export default Photos