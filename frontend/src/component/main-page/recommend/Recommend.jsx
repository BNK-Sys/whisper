import React from 'react';
import './Recommend.css';
import recommend from '../../../assets/recommend.png'
const Recommend = () => {

  return (
    <div className="recommend_main">
      <div className='recommend_title'>
        <img src={recommend} width={50} height={50}/>
      </div>
       <div className='recommend_content'>
        <div>금융상품추천</div>
        </div>
    </div>
  );
};

export default Recommend;