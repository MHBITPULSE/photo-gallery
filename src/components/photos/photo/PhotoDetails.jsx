import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../Header/Header';
import { Button, Card, CardBody, CardSubtitle, CardTitle, Form, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loadPhotos, selectPhotos } from '../../../redux/slices/photoSlice';
import axios from 'axios';
import { selectUserId, selectUserName } from '../../../redux/slices/authSlice';
import Comment from '../../Comment/Comment';

const PhotoDetails = () => {
      const userName = useSelector(selectUserName)
      const userId = useSelector(selectUserId)
      const navigate = useNavigate();
      const params = useParams();
      const [photo, setphoto] = useState(null)
      const [comments, setComments] = useState([])
      const dispatch = useDispatch()

      const [userComment, setcomment] = useState("")




      const fetchPhoto = async () => {
            await axios.get("https://photo-gallery-7dab5-default-rtdb.firebaseio.com/photos/" + params.photoId + ".json?")
                  .then(response => {
                        //console.log(Object.values(response.data.comments))
                        setphoto(response.data)
                        if (Object.hasOwn(response.data, 'comments'))
                              setComments(Object.values(response.data.comments))
                  })
                  .catch(err => console.log(err))
      }
      useEffect(() => {
            fetchPhoto()
      }, []);


      const handleCommentSubmit = async (e) => {
            e.preventDefault();

            const comment = {
                  userName: userName,
                  userId: userId,
                  comment: userComment,
                  date: new Date()
            }
            await axios.post("https://photo-gallery-7dab5-default-rtdb.firebaseio.com/photos/" + params.photoId + "/comments.json?", comment)
                  .then(response => {
                        setcomment("")
                        fetchPhoto()
                  })
                  .catch(err => console.log(err))
      }

      return (
            <div >
                  <Header />
                  {photo !== null && <div className='flex flex-col justify-center items-center w-screen '>
                        <div className='flex w-screen justify-center  items-center '>
                              <div className='p-2 flex w-screen justify-center items-center '>
                                    <Card
                                          style={{
                                                width: '100vh',
                                                display: "flex",
                                                justifyContent: "center"
                                          }}
                                          className='p-2 flex flex-col justify-center items-center bg-slate-500'
                                    >
                                          <img
                                                className='w-[60%] h-[40%]'
                                                alt="Sample"
                                                src={photo.img}
                                          />
                                          <CardBody className='flex flex-col items-center'>
                                                <CardTitle tag="h5" className='p-2'>
                                                      {photo.title}
                                                </CardTitle>
                                                <CardSubtitle className='p-2'>Category : {photo.category}</CardSubtitle>

                                          </CardBody>
                                    </Card>
                              </div>
                        </div>
                        <div className='w-[100vh]'>
                              <div>
                                    <div className='p-2 font-bold'>
                                          {userName !== null ?
                                                `Hi ${userName}! Please share your thought below`
                                                :
                                                "Please Login to share your thought!"
                                          }
                                    </div>
                                    <div className=''>
                                          <Form className='p-2 flex  flex-col gap-2' onSubmit={handleCommentSubmit}>
                                                <Input
                                                      id="exampleEmail"
                                                      name="comment"
                                                      placeholder="Your Comment Here"
                                                      value={userComment}
                                                      type="textarea"
                                                      onChange={(e) => setcomment(e.target.value)}
                                                      className='p-2'
                                                />
                                                <Button disabled={userName === null} className='p-2 w-auto' type='submit'>
                                                      Submit
                                                </Button>
                                          </Form>
                                    </div>
                              </div>
                              <h4 className='p-2 text-center'>Feedbacks</h4>
                              <div>
                                    {
                                          comments.length > 0 ? comments.map((item, index) => <Comment key={index} comment={item} />)
                                                :
                                                <h6>No feedback yet. You can place a comment if you want!</h6>
                                    }
                              </div>
                        </div>
                  </div>}

            </div>
      )
}

export default PhotoDetails