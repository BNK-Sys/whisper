import React from 'react';
import './CreditScore.css';

const CreditScore = ({ name, score, rank, grade }) => {
  const circumference = 2 * Math.PI * 35; // 원의 둘레 계산
  const offset = circumference - (score / 100) * circumference; // 점수에 따른 offset 계산

  return (
    <div className="credit_score_main">
      <div className='credit_score_title'>
        <span style={{fontWeight:"bold"}}>홍길동님</span><span>의 신용점수</span>
      </div>

       <div className='credit_score_content'>
        <div className='credit_score_col'>
            <span>97점</span>
            <svg width="80" height="80" style={{transform: "rotate(-90deg)"}}>
                <circle
                cx="40"
                cy="40"
                r="35"
                stroke="red"
                strokeWidth="5"
                fill="none"
                style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
                />
        </svg>
        </div>
        <div className='credit_score_col'>
            <div style={{marginBottom:"5px", color: "#666666", fontSize: "0.8rem"}}>상위</div>
            <div style={{marginBottom:"5px", color: "#666666", fontSize: "1.2rem", fontWeight: "bold"}} >{rank}%</div>
        </div>
        <div className='credit_score_col'>
            <div style={{marginBottom:"5px", color: "#666666", fontSize: "0.8rem"}}>등급</div>
            <div style={{marginBottom:"5px", color: "#666666", fontSize: "1.2rem", fontWeight: "bold"}} >{grade}</div>
        </div>
       </div>
    </div>
  );
};

export default CreditScore;