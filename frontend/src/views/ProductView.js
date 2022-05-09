import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productActions';

export default function ProductView(props) {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const productId = useParams().id;
   const [quantity, setQuantity] = useState(1);
   const productDetails = useSelector((state) => state.productDetails);
   const { loading, error, product } = productDetails;

   useEffect(() => {
      dispatch(detailsProduct(productId));
   }, [dispatch, productId]);

   const addToCartHandler = () => {
      navigate(`/cart/${productId}?quantity=${quantity}`);
   };

   return (
      <div>
         {loading ? (
            <LoadingBox></LoadingBox>
         ) : error ? (
            <MessageBox variant='danger'>{error}</MessageBox>
         ) : (
            <div>
               <Link to='/'>Back to results</Link>
               <div className='row top'>
                  <div className='col-2'>
                     <img
                        className='large'
                        src={product.image}
                        alt={product.name}
                     />
                  </div>
                  <div className='col-1'>
                     <ul>
                        <li>
                           <h1>{product.name}</h1>
                        </li>
                        <li>
                           <Rating
                              rating={product.rating}
                              numReviews={product.numReviews}
                           />
                        </li>
                        <li>Price : ${product.price}</li>
                        <li>
                           Description:
                           <p>{product.description}</p>
                        </li>
                     </ul>
                  </div>
                  <div className='col-1'>
                     <div className='card card-body'>
                        <ul>
                           <li>
                              <div className='row'>
                                 <div>Price</div>
                                 <div className='price'>${product.price}</div>
                              </div>
                           </li>
                           <li>
                              <div className='row'>
                                 <div>Status</div>
                                 <div>
                                    {product.countInStock > 0 ? (
                                       <span className='success'>In Stock</span>
                                    ) : (
                                       <span className='danger'>
                                          Unavailable
                                       </span>
                                    )}
                                 </div>
                              </div>
                           </li>
                           <li>
                              {product.countInStock > 0 && (
                                 <ul>
                                    <li>
                                       <div className='row'>
                                          <select
                                             value={quantity}
                                             onChange={(e) =>
                                                setQuantity(e.target.value)
                                             }
                                          >
                                             {
                                                // Give 1 - quantity as quantity options
                                                [
                                                   ...Array(
                                                      product.countInStock
                                                   ).keys(),
                                                ].map((x) => (
                                                   <option
                                                      key={x + 1}
                                                      value={x + 1}
                                                   >
                                                      {x + 1}
                                                   </option>
                                                ))
                                             }
                                          </select>
                                       </div>
                                    </li>
                                    <li>
                                       <button
                                          className='primary block'
                                          onClick={addToCartHandler}
                                       >
                                          Add to Cart
                                       </button>
                                    </li>
                                 </ul>
                              )}
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
