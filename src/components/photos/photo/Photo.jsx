
import React from 'react'
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Button } from 'reactstrap'

const Photo = ({ photo }) => {
    return (
        <div className='p-2 rounded shadow align-self-center'>
            <Card
                style={{
                    width: '18rem'
                }}
            >
                <img
                    width={288}
                    height={200}
                    style={{
                        objectFit: 'cover'
                    }}
                    alt="Sample"
                    src={photo.img}
                />
                <CardBody>
                    <CardTitle tag="h5" className='p-2'>
                        Title: {photo.title}
                    </CardTitle>
                    <CardSubtitle className='p-2'>Category : {photo.category}</CardSubtitle>
                    <Button color="primary" outline size="sm" className='p-2'>
                        Details
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default Photo