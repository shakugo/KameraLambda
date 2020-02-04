const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-1'
});

exports.handler = async (event, context) => {
  const query = event.pathParameters;
  const params = {
    TableName: "subject",
    Key:{//更新したい項目をプライマリキー(及びソートキー)によって１つ指定
        subject_id: query.subject_id
    },
    ExpressionAttributeNames: {
        '#f': 'available_flag'
    },
    ExpressionAttributeValues: {
        ':newFlag': false
    },
    UpdateExpression: 'SET #f = :newFlag'
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
}
