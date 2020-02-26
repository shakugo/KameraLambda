// Import dynamodb from aws-sdk
const dynamodb = require('aws-sdk/clients/dynamodb');

// Import all functions from get-all-items.js
const lambda = require('../../getSpots/index.js');

// This includes all tests for getAllItemsHandler
describe('Test getAllItemsHandler', () => {
  let scanSpy;

  // One-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown
  beforeAll(() => {
    // Mock DynamoDB scan method
    // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
    scanSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'scan');
  });

  // Clean up mocks
  afterAll(() => {
    scanSpy.mockRestore();
  });

  // This test invokes getAllItemsHandler and compares the result
  it('should return ids', async () => {
    const event = {
      httpMethod: 'POST',
      body: '{\"subjects\":[\"test1\",\"test2\"]}'
    };
    const items = {
      Items: [{
        id: 'id1'
      }, {
        id: 'id2'
      }]
    };

    // Return the specified value whenever the spied scan function is called
    scanSpy.mockReturnValue({
      promise: () => Promise.resolve(items),
    });

    // Invoke getAllItemsHandler
    const result = await lambda.handler(event);

    const expectedResult = {
      headers: {},
      statusCode: 200,
      "isBase64Encoded": false,
      body: JSON.stringify(items),
    };

    // Compare the result with the expected result
    expect(result).toEqual(expectedResult);
  });

  // This test invokes getAllItemsHandler and compares the result
  it('should return Error', async () => {
    const event = {
      httpMethod: 'POST',
      body: '{\"subjects\":[\"test1\",\"test2\"]}'
    };

    const message = "something Oops!"
    // Return the specified value whenever the spied scan function is called
    scanSpy.mockImplementation(() => { throw new Error(message)});

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