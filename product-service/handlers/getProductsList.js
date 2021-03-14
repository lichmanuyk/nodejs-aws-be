import { productList } from '../productList';

export const getProductsList = async (event) => {
  const result = JSON.stringify(productList);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: result
  };
};
