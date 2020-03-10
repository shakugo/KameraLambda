const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-1'
});

exports.handler = async (event, context) => {
  const obj = JSON.parse(event.body);
  const subjectList = obj.subjects;
  let params = { TableName: "spot" };

  if(Array.isArray(subjectList) && subjectList.length > 0){
    let filter = '';
    let attributeValues = {};

    subjectList.forEach((subject, index) => {
      filter += 'contains(#subjects, :subject' + index +') OR ';
      attributeValues[":subject" + index] = subject;
    });
    filter = filter.slice(0, -4);

    params["ExpressionAttributeNames"] = {"#subjects": "subjects"}
    params["ExpressionAttributeValues"] = attributeValues
    params["FilterExpression"] = filter
  }

  let response = {
    "headers": {},
    "isBase64Encoded": false
  };

  try {
    const data = await dynamo.scan(params).promise();
    response.statusCode = 200;
    response.body = JSON.stringify(data);
  }catch(e){
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }

  return response;
};