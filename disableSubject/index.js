var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-1'
});

exports.handler = (event, context, callback) => {
  var params = {
    TableName: "subject",
    Key:{//更新したい項目をプライマリキー(及びソートキー)によって１つ指定
        subject_id: event.subject_id
    },
    ExpressionAttributeNames: {
        '#f': 'available_flag'
    },
    ExpressionAttributeValues: {
        ':newFlag': false
    },
    UpdateExpression: 'SET #f = :newFlag'
  };
  var response = {
    "headers": {},
    "isBase64Encoded": false
  };

  var response = {
    "headers": {},
    "isBase64Encoded": false
  };

  dynamo.update(params, function (err, data) {
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
}
