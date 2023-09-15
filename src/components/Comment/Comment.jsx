import React from 'react'

const Comment = (comment) => {
      console.log(comment)
      return (
            <div className='p-1 flex flex-col w-auto border rounded-lg border-slate-900'>
                  <div>{comment.comment.userName} commented on {comment.comment.date}</div>
                  <div>{comment.comment.comment}</div>
            </div>
      )
}

export default Comment