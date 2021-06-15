import AWS from 'aws-sdk';
import createResponse from "../utils/createResponse";
import { SNS_ARN } from "../constants/index";
import { createProduct } from "../handler";

export const catalogBatchProcess = async (event) => {
    const sns = new AWS.SNS({region: 'eu-west-1'});
    const productsRecords = event.Records.map(({body}) => JSON.parse(body));

    try {
        const productsTitles = [];
        for (const product of productsRecords) {
            const {description, title, price, count, image} = product;
            console.log('product', product);
            productsTitles.push(title);

            const productRecord = await createProduct({body: JSON.stringify({image, description, title, price: parseInt(price)})});
            console.log('Product added', productRecord);
        }
        const promise = new Promise((resolve, reject) => {
            sns.publish({
                Subject: 'Products were added',
                Message: `Products with titles: ${productsTitles.join(',')} were added`,
                TopicArn: SNS_ARN
            }, (err, data) => {
                if (err) {
                    console.log('Error while publish', err);
                    reject(err);
                }
                console.log('Sent information', data);
                resolve();
            })
        })
        await promise;
        return createResponse({body: {message: 'Products added'}});
    } catch (e) {
        console.log(e);
        return createResponse({statusCode: 500, body: {message: 'Internal Server Error'}});
    }
}