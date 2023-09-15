import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

import { CATEGORIES } from '../../photosDB'

const SideBar = () => {
      let categoryList = null;

      categoryList = CATEGORIES.map((item, index) => (
            <ListGroupItem
                  color="info"
                  action
                  tag="a"
                  href={`/category/${item.toLowerCase()}`}
                  key={index}
            >
                  {item}
            </ListGroupItem>
      ))
      return (
            <div className='sticky top-32 z-50'>
                  <ListGroup>
                        {categoryList}
                  </ListGroup>
            </div>

      )
}

export default SideBar