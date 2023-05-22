import { Rating } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
const ListReviews = ({ reviews }) => {
    const { user } = useSelector((state) => state.auth);

  return (
    <div className="px-7 md:px-24">
		<div className="reviews w-75">
            <h3 className='text-2xl gray-500 font-medium'>Product Reviews:</h3>
            <br/>
            <hr />
            {reviews && reviews.map(review => (
             <div key={review._id} className="review-card my-3">
             <div className="rating-outer">
                 <div className="rating-inner">
                    <Rating 
                    value={review.rating}
                    readOnly
                    />
                 </div>
             </div>
             <p className="review_user text-sm font-bold">{review.name}</p>
             <p className="review_comment text-sm">{review.comment}</p>

             <hr/>
         </div>

            ))}
   
    </div> 
    </div>
     )
}

export default ListReviews