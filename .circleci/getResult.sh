#!/bin/bash

ApiKeyID=`aws cloudformation describe-stacks --stack-name KameraLambda | jq -r '.Stacks[].Outputs | map(select(.OutputKey == "ApiKeyID")) | .[].OutputValue'`
ApiGatewayID=`aws cloudformation describe-stacks --stack-name KameraLambda | jq -r '.Stacks[].Outputs | map(select(.OutputKey == "ApiGatewayID")) | .[].OutputValue'`
ApiKey=`aws apigateway get-api-key --api-key $ApiKeyID --include-value | jq -r .value`

curl -X POST --data-urlencode "payload={\"text\": \"API_BASE_URL=https://${ApiGatewayID}.execute-api.ap-northeast-1.amazonaws.com/develop
\n API_KEY=${ApiKey}\"}" $Slack_URL

