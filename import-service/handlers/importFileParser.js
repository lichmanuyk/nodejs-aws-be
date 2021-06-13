import AWS from 'aws-sdk';
import csvParser from "csv-parser";
import { BUCKET_NAME, SQS_URL } from "../constants/index";
import createResponse from "../utils/createResponse";

const sentDataToQueue = (sqs, data) => {
    return new Promise((resolve, reject) => {
        sqs.sendMessage({
            QueueUrl: SQS_URL,
            MessageBody: JSON.stringify(data)
        }, (err, result) => {
            if (err) {
                console.log('error while send', err);
                reject(err);
            }
            console.log('sent data', result);
            resolve();
        })
    })
}

export const importFileParser = async (event) => {
    try {
        const s3 = new AWS.S3({region: 'eu-west-1'});
        const sqs = new AWS.SQS({region: 'eu-west-1'});
        const promise = new Promise((res, rej) => {
            const fileName = event.Records[0].s3.object.key;
            const params = {
                Bucket: BUCKET_NAME,
                Key: fileName,
            }

            const s3Stream = s3.getObject(params).createReadStream();

            s3Stream
                .pipe(csvParser())
                .on('data', async (data) => {
                    await sentDataToQueue(sqs, data);
                })
                .on('error', (error) => {console.log("Error", error); rej();})
                .on('end', async () => {
                    console.log('end file processing');

                    await s3.copyObject({
                        Bucket: BUCKET_NAME,
                        CopySource: BUCKET_NAME + '/' + fileName,
                        Key: fileName.replace('uploaded', 'parsed'),
                    }).promise();

                    console.log(`Copied file ${fileName} from ${BUCKET_NAME}`);

                    await s3.deleteObject({
                        Bucket: BUCKET_NAME,
                        Key: fileName,
                    }).promise();
                    console.log(`Deleted file ${fileName} from ${BUCKET_NAME}`);

                    res();
                });
        })
        await promise;

        return createResponse({statusCode: 200});
    } catch (e) {
        return createResponse({statusCode: 500, body: {message: 'Internal error'}});
    }
}