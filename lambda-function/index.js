exports.handler = async (event) => {
    const message = {
        statusCode: 200,
        body: JSON.stringify('A GET request has been made from Lambda')
    }
    
    return message;
};
