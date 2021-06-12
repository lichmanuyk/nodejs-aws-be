const defaultHeaders = {
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*'
};

const createResponse = ({statusCode = 200, body, headers = {}}) => {
    return {
        statusCode,
        body: JSON.stringify(body),
        headers: {
            ...headers,
            ...defaultHeaders,
        },
    }
}

export default createResponse;