// JavaScript File
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
var dynamo = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-1'
});

exports.handler = (event, context, callback) => {
  var obj = JSON.parse(event.body);
  var params = {
    TableName: 'subject',
    Item: {
      'subject_name': obj.subject_name,
      'subject_id': obj.subject_id,
      'subject_flag':true,
    }
  };

  var response = {
    "headers": {},
    "isBase64Encoded": false
  };

  dynamo.put(params, function (err, data) {
    if (err) {
      console.log(err);
      response.statusCode = 400;
      response.body = JSON.stringify(err);
    } else {
      response.statusCode = 200;
      response.body = JSON.stringify(params);
    }
    context.done(null, response);
  });
};