import React from 'react';

export default function Rating(props) {
   const { rating, numReviews } = props;
   return (
      <div className='rating'>
         {[...Array(5).keys()].map((num) => (
            <span key={num}>
               <i
                  className={
                     rating >= num + 1
                        ? 'fa fa-star'
                        : rating >= num + 0.5
                        ? 'fa fa-star-half-o'
                        : 'fa fa-star-o'
                  }
               ></i>
            </span>
         ))}
         <span>{numReviews + ' reviews'}</span>
      </div>
   );
}
