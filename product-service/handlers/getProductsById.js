import { productList } from '../productList';

export const getProductsById = async (event) => {
  try {
    const productId = event.pathParameters.productId;
    const result = productList.find(product => product.id === productId);
    if (!result) {
      throw Error;
    }
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result)
    };
  } catch (err) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify('Product not found')
    };
  }
};
