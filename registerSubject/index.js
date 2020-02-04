const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-1'
});

exports.handler = async (event, context) => {
  const obj = JSON.parse(event.body);
  const params = {
    TableName: 'subject',
    Item: {
      'subject_name': obj.subject_name,
      'subject_id': obj.subject_id,
      'available_flag': true,
    }
  };

  let response = {
    "headers": {},
    "isBase64Encoded": false
  };

  try {
    const data = await dynamo.put(params).promise();
    response.statusCode = 200;
    response.body = JSON.stringify(params);
  } catch(e) {
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }

  return response;
};