import { GET_LIST } from 'ra-core';
import { getResponseParser } from '../getResponseParser';
import introspectionResults from './introspectionResults.json';
import listPosts from './listPosts.json';

describe('getResponseParser', () => {
  test('should format items as expected', () => {
    expect(
      getResponseParser(introspectionResults)(
        GET_LIST,
        { type: { name: 'Post', fields: [] } },
        { name: `listPosts` },
        {}
      )(listPosts)
    ).toBe(expectedResponse);
  });
});

const expectedResponse = {
  data: [
    {
      id: '2e1749a3-7e1b-4cda-90ac-dfe45e9b4b46',
      title: 'Wild shit',
      categories: [
        {
          id: '1f742d47-644f-4092-8459-000fdcccb912',
          title: 'Stones',
        },
      ],
      owner: 'harley',
      comments: [{}],
    },
  ],
  nextToken: null,
  total: 9999,
};
