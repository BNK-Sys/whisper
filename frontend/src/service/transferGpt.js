import axiosInstance from './axiosConfig';

export const getAmountNum = async (data) => {

  try {
    const params = { data:data };
    const response = await axiosInstance.get('/normalization/amount', {params});
    console.log(response);
    
    return response.data.amount;

  } catch (error) {
    throw error;
  }
};