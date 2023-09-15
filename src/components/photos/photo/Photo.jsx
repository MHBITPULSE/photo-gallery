
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Button } from 'reactstrap'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

const Photo = ({ photo }) => {
    const navigate = useNavigate();
    return (
        <div className='p-2 rounded shadow bg-info-subtle align-self-center'>
            <Card
                style={{
                    width: '18rem'
                }}
            >
                <img

                    className='w-72 h-60 hover:opacity-70 cursor-pointer'
                    alt="Not Found"
                    src={photo[1].img}
                    onClick={() => navigate(`/photo/${photo[0]}`)}
                />
                <CardBody className='bg-gray-300'>
                    <CardTitle tag="h5" className='bg-slate-200 text-center'>
                        {photo[1].title}
                    </CardTitle>
                    <div className='p-1 flex flex-row items-center justify-around bg-neutral-200'>
                        <CardSubtitle className='text-lg font-semibold'>Category : {photo[1].category}</CardSubtitle>
                        <div className='flex relative justify-center items-center'>
                            <ModeCommentOutlinedIcon style={{ fontSize: "35px" }} className='' />
                            <span className='absolute top-[2px] left-[13px]   text-green-800 '>
                                {photo[1].hasOwnProperty('comments') ? Object.keys(photo[1].comments).length : 0}
                            </span>
                        </div>
                    </div>


                    {/* <Button color="primary" outline size="sm" className='p-2' onClick={() => navigate(`/photo/${photo[0]}`)}>
                        Details
                    </Button> */}
                </CardBody>
            </Card>
        </div>
    )
}

export default Photo