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

export const createProduct = async (event) => {
  console.log(event);
  const client = new Client(dbOptions);
  await client.connect();

  try {
    try {
      const body = JSON.parse(event.body);
      console.log(body)
      const { title, description, price, image } = body;

      const { rows: product } = await client.query(`insert into products (title, description, price, image) values ('${title}', '${description}', ${price}, '${image}') returning *`);

      if (!product) {
        throw Error;
      }

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(product)
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
  } catch (err) {
    console.log('Error during database request executing:', err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    };
  }
};
