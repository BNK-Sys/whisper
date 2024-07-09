import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingView from "../component/sub-page/loading-page/LoadingView";

const RecognitionLoadingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isSamePerson } = location.state || {};

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isSamePerson) {
                // 같은 사람일 때 처리
                navigate('/compeletion'); // 같은 사람일 때 이동할 페이지
            } else {
                // 다른 사람일 때 처리
                navigate('/check/face'); // 다른 사람일 때 이동할 페이지
            }
        }, 3500); // 3.5초

        return () => clearTimeout(timer); // 타이머 정리
    }, [isSamePerson, navigate]);

    return (
        <div>
            <LoadingView/>
        </div>
    );
};

export default RecognitionLoadingPage;
