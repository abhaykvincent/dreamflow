// API request utility function
export const sendApiRequest = async (url, params) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
      params: params,
    };
    
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };