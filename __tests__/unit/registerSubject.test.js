// Import dynamodb from aws-sdk
const dynamodb = require('aws-sdk/clients/dynamodb');

// Import all functions from get-all-items.js
const lambda = require('../../registerSubject/index.js');

// This includes all tests for getAllItemsHandler
describe('Test add subject in user table', () => {
  let scanSpy;

  // One-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown
  beforeAll(() => {
    // Mock DynamoDB scan method
    // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
    scanSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'update');
  });

  // Clean up mocks
  afterAll(() => {
    scanSpy.mockRestore();
  });

  // This test invokes getAllItemsHandler and compares the result
  it('should return params', async () => {
    const user_id = "test_id";
    const subject_name = "test_name";

    // Return the specified value whenever the spied scan function is called
    scanSpy.mockReturnValue({
      promise: () => Promise.resolve({}),
    });

    const event = {
      pathParameters: {
        user_id: user_id
      },
      body: JSON.stringify({subject_name: subject_name})
    };

    // Invoke getAllItemsHandler
    const result = await lambda.handler(event);
    const expectedParams = {
      TableName: 'user',
      Key:{ user_id: user_id },
      ExpressionAttributeNames: {
          '#s': 'subjects'
      },
      ExpressionAttributeValues: {
          ':newSubject': [ subject_name ]
      },
      UpdateExpression: 'add #s :newSubject'
    };
    const expectedResult = {
      statusCode: 200,
      headers: {},
      "isBase64Encoded": false,
      body: JSON.stringify(expectedParams),
    };

    // Compare the result with the expected result
    expect(result).toEqual(expectedResult);
  });

  // This test invokes getAllItemsHandler and compares the result
  it('should return Error', async () => {
    const user_id = "test_id";
    const subject_name = "test_name";

    const message = "something Oops!"
    // Return the specified value whenever the spied scan function is called
    scanSpy.mockImplementation(() => {
      throw new Error(message)
    });


    const event = {
      pathParameters: {
        user_id: user_id
      },
      body: JSON.stringify({subject_name: subject_name})
    };

    // Invoke getAllItemsHandler
    const result = await lambda.handler(event);

    const expectedResult = {
      headers: {},
      statusCode: 500,
      "isBase64Encoded": false,
      body: JSON.stringify(message),
    };

    // Compare the result with the expected result
    expect(result).toEqual(expectedResult);
  });
});