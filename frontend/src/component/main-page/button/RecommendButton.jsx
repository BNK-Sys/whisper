import React from 'react';
import './RecommendButton.css';
import recommend from '../../../assets/recommend.png'
import { Link } from 'react-router-dom';
const Recommend = () => {

  return (
    <Link to={"/recommend"} style={{ textDecoration: "none", color: "black"}}> 
      <div className="recommend_main">
        <div className='recommend_title'>
          <img src={recommend} width={50} height={50}/>
        </div>
        <div className='recommend_content'>
          <div>금융상품추천</div>
          </div>
      </div>
    </Link>
  );
};

export default Recommend;