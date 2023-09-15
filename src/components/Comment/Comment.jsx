
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const Comment = (comment) => {

      const date = new Date(comment.comment.date).toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' })
      return (
            <div className='mb-4 p-2 flex flex-col w-auto border rounded-lg border-slate-900'>
                  <div>
                        <CommentOutlinedIcon />
                        <span className='text-green-600'>  {comment.comment.userName}</span > commented on <span className='text-orange-400'>{date}</span> :</div>
                  <div className='ml-12 flex items-center'>
                        <PersonRoundedIcon /><ChevronRightRoundedIcon />{comment.comment.comment}
                  </div>
            </div>
      )
}

export default Comment