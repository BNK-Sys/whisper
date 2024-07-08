import axiosInstance from './axiosConfig';

export const sendTranscript = async (transcript, navigate) => {
  try {
    console.log(transcript);
    const response = await axiosInstance.get('/normalization/menu', {
      params: { data: transcript }
    });
    const { menu } = response.data;
    switch (menu) {
      case '이체':
        navigate('/find/account');
        break;
      case '계좌조회':
        navigate('/account-view');
        break;
      case '거래내역':
        navigate('/transaction-history');
        break;
      default:
        console.log('Unknown menu:', menu);
        break;
    }
  } catch (error) {
    console.error('Error sending transcript:', error);
  }
};
