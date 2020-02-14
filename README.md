# KameraLambda
[![GitHub issues](https://img.shields.io/github/issues/shakugo/KameraLambda)](https://github.com/shakugo/KameraLambda/issues)
[![codecov](https://codecov.io/gh/shakugo/KameraLambda/branch/develop/graph/badge.svg)](https://codecov.io/gh/shakugo/KameraLambda)
[![CircleCI](https://circleci.com/gh/shakugo/KameraLambda.svg?style=svg)](https://circleci.com/gh/shakugo/KameraLambda)

[モバイルアプリ「カメラ予報」](https://github.com/shakugo/KameraYohou)のインフラコード

## How to use
### Install
`yarn install`

### Test (Jest)
`yarn test`

### Build
`sam build`

### Deploy
`sam deploy`


## Function

### GET /spots
> ./getSpots/index.js

RESPONSE BODY:
```
{
  Items: [{
    spot_id: 'XXXXXXXX',
    spot_name: 'XXXXXXXX'
    }, {
    spot_id: 'XXXXXXXX',
    spot_name: 'XXXXXXXX'
  }]
}
```

### GET /user/{user_id}/subject
> ./getSubjects/index.js

RESPONSE BODY:
```
{
  Items: {
    subjects: ['aaa', 'bbb', 'ccc']
}
```


### POST /user/{user_id}/subject
> ./registerSubject/index.js

REQUEST BODY:
```
{
  subject_name: 'AAA'
}
```

RESPONSE BODY:
```
TBD
```


### DELETE /user/{user_id}/subject
> ./disableSubject/index.js

REQUEST BODY:
```
{
  subject_name: 'AAA'
}
```

RESPONSE BODY:
```
TBD
```
