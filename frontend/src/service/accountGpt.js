import axiosInstance from './axiosConfig';

export const getAccountNum = async (data) => {

  try {
    const params = { data:data };
    const response = await axiosInstance.get('/normalization/accountNumber', {params});
    console.log(response.data);
    
    return response.data.accountNumber;

  } catch (error) {
    throw error;
  }
};