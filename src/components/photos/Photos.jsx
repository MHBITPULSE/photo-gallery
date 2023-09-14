import React from 'react'
import Photo from './photo/Photo'
import { PHOTOS } from '../../photosDB'

const Photos = () => {

    let Photos = PHOTOS.map(item => <Photo photo={item} key={item.id} />)
    return (
        <div className='p-3 d-flex flex-wrap gap-3 justify-content-center'>
            {Photos}
        </div>
    )
}

export default Photos