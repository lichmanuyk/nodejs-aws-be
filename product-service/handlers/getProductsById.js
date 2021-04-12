import { Client } from 'pg';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000,
};

export const getProductsById = async (event) => {
  const client = new Client(dbOptions);
  await client.connect();

  try {
    const productId = event.pathParameters.productId;
    const { rows: products } = await client.query(`select * from products left join stocks on products.id = stocks.product_id and products.id = '${productId}'`);

    if (!products) {
      throw Error;
    }
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(products[0])
    };
  } catch (err) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify('Product not found', err)
    };
  } finally {
    client.end();
  }
};
