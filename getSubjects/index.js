var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-1'
});

exports.handler = (event, context, callback) => {
  var params = {
    TableName: "subject",
    FilterExpression : "subject_flag = :val",
    ExpressionAttributeValues : {":val" : true}
  };
  var response = {
    "headers": {},
    "isBase64Encoded": false
  };

  dynamo.scan(params, function (err, data) {
    if (err) {
      console.log(err);
      response.statusCode = 400;
      response.body = JSON.stringify(err);
    } else {
      response.statusCode = 200;
      response.body = JSON.stringify(data);
    }
    context.done(null, response);
  });
};