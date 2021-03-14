import { productList } from '../productList';

export const getProductsById = async (event) => {
  const productId = event.pathParameters.productId;
  const result = productList.find(product => product.id === productId);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(result)
  };
};
