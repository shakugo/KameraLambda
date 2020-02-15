const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-1'
});

exports.handler = async (event) => {
  const query = event.pathParameters;
  const params = {
    TableName: 'user',
    Key: {
      'user_id': query.user_id
    },
    ProjectionExpression: 'subjects'
  };
  let response = {
    "headers": {},
    "isBase64Encoded": false
  };

  try {
    const data = await dynamo.get(params).promise();
    response.statusCode = 200;
    response.body = JSON.stringify(data);
  }catch(e){
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }

  return response;
};