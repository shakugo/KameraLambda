#!/bin/bash

ApiKeyID=`aws cloudformation describe-stacks --stack-name KameraLambda | jq -r '.Stacks[].Outputs | map(select(.OutputKey == "ApiKeyID")) | .[].OutputValue'`
ApiGatewayEndpoint=`aws cloudformation describe-stacks --stack-name KameraLambda | jq -r '.Stacks[].Outputs | map(select(.OutputKey == "ApiGatewayEndpoint")) | .[].OutputValue'`
ApiKey=`aws apigateway get-api-key --api-key $ApiKeyID --include-value | jq -r .value`
echo $ApiKey

curl -X POST --data-urlencode "payload={\"text\": \"これは webhookbot という名の${ApiKey}から #aws-notice に投稿されています。\"}" $Slack_URL