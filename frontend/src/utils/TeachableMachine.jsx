import React, { useState, useEffect, useRef } from 'react';
import * as tmPose from '@teachablemachine/pose';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isRender } from '../store/Render';
import { selectType } from '../store/Teachable';

const Teachable = () => {
    const URL = "https://teachablemachine.withgoogle.com/models/6GFBNS7Sx/";
    const [model, setModel] = useState(null);
    const [maxPredictions, setMaxPredictions] = useState(0);
    const [predictions, setPredictions] = useState([]);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const requestRef = useRef(null);
    const isRunningRef = useRef(true);
    const setIsRender = useSetRecoilState(isRender);
    const setSelectType = useSetRecoilState(selectType);

    useEffect(() => {
        const loadModel = async () => {
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";
            const loadedModel = await tmPose.load(modelURL, metadataURL);
            setModel(loadedModel);
            setMaxPredictions(loadedModel.getTotalClasses());
        };

        loadModel();
    }, []);

    useEffect(() => {
        const setupWebcam = async () => {
            if (model) {
                const size = 200;
                const flip = true;
                const webcam = new tmPose.Webcam(size, size, flip);
                await webcam.setup();
                await webcam.play();
                webcamRef.current = webcam;
                window.requestAnimationFrame(loop);
                setIsRender(true);
            }
        };
        setupWebcam();
    }, [model]);

    const loop = async () => {
        if (isRunningRef.current) {
            webcamRef.current.update();
            await predict();
            requestRef.current = window.requestAnimationFrame(loop);
        }
    };

    const predict = async () => {
        const { pose, posenetOutput } = await model.estimatePose(webcamRef.current.canvas);
        const prediction = await model.predict(posenetOutput);

        const newPredictions = prediction.map(pred => ({
            className: pred.className,
            probability: Number(pred.probability.toFixed(2))
        }));

        const predict1 = newPredictions[0].probability;
        const predict2 = newPredictions[1].probability;
        const predict3 = newPredictions[2].probability;

        predictAndStopSpeech(predict1, predict2, predict3);

        setPredictions(newPredictions);
        drawPose(pose);
    };

    const predictAndStopSpeech = (predict1, predict2, predict3) => {
        if (predict1 === 1) {
            console.log("1번 모션");
        } else if (predict2 === 1) {
            console.log("2번 모션");
            isRunningRef.current = false; // 루프 중지 플래그 설정
            window.cancelAnimationFrame(requestRef.current); // 애니메이션 프레임 루프 중지
            setSelectType("no");
        } else if (predict3 === 1) {
            console.log("3번 모션");
            isRunningRef.current = false; // 루프 중지 플래그 설정
            window.cancelAnimationFrame(requestRef.current); // 애니메이션 프레임 루프 중지
            setSelectType("yes");
        }
    };

    const drawPose = (pose) => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.drawImage(webcamRef.current.canvas, 0, 0);

        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    };

    const drawStop = () => {
        console.log("애니메이션 중지");
        isRunningRef.current = false; // 루프 중지 플래그 설정
        window.cancelAnimationFrame(requestRef.current);
    };

    const drawStart = () => {
        if (!isRunningRef.current) {
            isRunningRef.current = true; // 루프 재시작 플래그 설정
            window.requestAnimationFrame(loop);
        }
    };

    useEffect(() => {
        return () => {
            if (requestRef.current) {
                window.cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    return (
        <div>
            <div style={{display:"none"}}>
                <canvas ref={canvasRef} id="canvas" width="200" height="200"></canvas>
            </div>
            {/* <div id="label-container">
                {predictions.map((pred, index) => (
                    <div key={index}>{`${pred.className}: ${pred.probability}`}</div>
                ))}
            </div> */}
        </div>
    );
};

export default Teachable;
