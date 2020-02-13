const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-1'
});

exports.handler = async (event, context) => {
  const query = event.pathParameters;
  const obj = JSON.parse(event.body);

  const newSubject = {
    'subject_id': obj.subject_id,
    'subject_name': obj.subject_name,
    'available_flag': true,
  };
  const params = {
    TableName: 'user',
    Key:{ user_id: query.user_id },
    ExpressionAttributeNames: {
        '#s': 'subjects'
    },
    ExpressionAttributeValues: {
        ':newSubject': [newSubject]
    },
    UpdateExpression: 'SET #s = list_append(#s, :newSubject)'
  };

  let response = {
    "headers": {},
    "isBase64Encoded": false
  };

  try {
    const data = await dynamo.update(params).promise();
    response.statusCode = 200;
    response.body = JSON.stringify(params);
  } catch(e) {
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }

  return response;
};