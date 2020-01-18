FROM python:3.8.1

RUN pip install awscli aws-sam-cli
RUN apt update && apt install -y nodejs npm && apt clean -y
LABEL com.circleci.preserve-entrypoint=true
