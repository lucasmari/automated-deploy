import { MockedProvider } from '@apollo/client/testing';
import { act, render } from '@testing-library/react';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import NewsList, { NEWS_QUERY } from './NewsList';

let container = null;
let consoleOutput = [];
const mockedLog = (output) => consoleOutput.push(output);
const originalLog = console.log;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  console.log = mockedLog;
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  console.log = originalLog;
});

function mockHistory() {
  const original = require.requireActual('react-router-dom');
  return {
    ...original,
    useHistory: jest.fn().mockReturnValue({
      location: {
        pathname: '/new',
      },
      push: '/',
    }),
  };
}

jest.mock('react-router-dom', () => mockHistory());

const mocks = [
  {
    request: {
      query: NEWS_QUERY,
      variables: {
        first: 3,
        skip: 0,
      },
    },
    result: {
      data: {
        news: [
          {
            id: '1',
            title: 'New Easter Egg',
            body: 'Wow, amazing',
            user: { name: 'me' },
          },
        ],
        count: {
          news: 1,
        },
      },
    },
  },

  {
    request: {
      query: NEWS_QUERY,
      variables: {
        first: 3,
        skip: 0,
      },
    },
    networkError: {
      result: {
        user_not_found: true,
      },
    },
  },
];

it('returns the loading state', () => {
  render(
    <MockedProvider mocks={[mocks[0]]} addTypename={false}>
      <NewsList />
    </MockedProvider>,
    container
  );

  expect(document.querySelector('p').textContent).toBe('Loading...');
});

it('returns a list of news', async () => {
  render(
    <MockedProvider mocks={[mocks[0]]} addTypename={false}>
      <NewsList />
    </MockedProvider>,
    container
  );

  await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

  expect(document.querySelector('.content-container').textContent).toBe(
    'NewsNo news...'
  );
});

it('returns an error', async () => {
  render(
    <MockedProvider mocks={[mocks[1]]} addTypename={false}>
      <NewsList />
    </MockedProvider>,
    container
  );

  await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

  expect(document.querySelector('p').textContent).toBe('Error :(');
});
