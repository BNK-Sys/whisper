import { useSpeechRecognition } from 'react-speech-recognition';

const useSpeechRecognitionHandler = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  return {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  };
};

export default useSpeechRecognitionHandler;
