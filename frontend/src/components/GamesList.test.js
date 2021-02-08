import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import TestRenderer from 'react-test-renderer';
import GamesList, { GAMES_QUERY } from './GamesList';
import { GraphQLError } from 'graphql';
import { act, render } from '@testing-library/react';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const mocks = [
  {
    1: {
      request: {
        query: GAMES_QUERY,
      },
      result: {
        data: {
          games: {
            id: '1',
            name: 'Portal 2',
          },
        },
      },
    },

    2: {
      request: {
        query: GAMES_QUERY,
      },
      error: new Error('An error occurred'),
    },

    3: {
      request: {
        query: GAMES_QUERY,
      },
      result: {
        errors: [new GraphQLError('Error!')],
      },
    },
  },
];

it('returns the loading state', () => {
  render(
    <MockedProvider mocks={mocks['1']} addTypename={false}>
      <GamesList />
    </MockedProvider>,
    container
  );

  expect(document.querySelector('p').textContent).toBe('Loading...');
});

it('returns a list of games', async () => {
  render(
    <MockedProvider mocks={mocks['1']} addTypename={false}>
      <GamesList />
    </MockedProvider>,
    container
  );

  await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

  expect(document.querySelector('.content-container').textContent).toContain(
    'Portal 2'
  );
});

it('returns an error', async () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks['3']} addTypename={false}>
      <GamesList />
    </MockedProvider>
  );

  await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

  const tree = component.toJSON();
  console.log(tree);
  expect(tree[0].children).toBe('');
});
