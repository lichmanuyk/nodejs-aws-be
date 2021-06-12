import AWS from 'aws-sdk';
import {BUCKET_NAME, CATALOG_PATH} from '../constants/index';
import createResponse from "../utils/createResponse";

export const importProductsFile = async (event) => {
    try {
        const fileName = event && event.queryStringParameters && event.queryStringParameters.name;

        if (!fileName || typeof fileName !== "string") {
            return createResponse({statusCode: 400, body: {message: 'fileName is not provided'}});
        }

        const s3 = new AWS.S3({region: 'eu-west-1', signatureVersion: 'v4'});

        const params = {
            Bucket: BUCKET_NAME,
            Key: `${CATALOG_PATH}${fileName}`,
            Expires: 60,
            ContentType: 'text/csv',
        }

        const url = await s3.getSignedUrlPromise('putObject', params);

        return createResponse({body: url});
    } catch (e) {
        return createResponse({statusCode: 500, body: {message: "Internal server error"}});
    }
}