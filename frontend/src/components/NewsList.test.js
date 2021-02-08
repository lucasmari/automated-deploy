import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import NewsList, { NEWS_QUERY } from './NewsList';

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
        query: NEWS_QUERY,
        variables: {
          first: 3,
          skip: 0,
        },
      },
      result: {
        data: {
          news: {
            id: '1',
            title: 'New Easter Egg',
            body: 'Wow, amazing',
            user: { name: 'me' },
          },
          count: {
            news: 1,
          },
        },
      },
    },

    2: {
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
  },
];

it('returns the loading state', () => {
  const component = TestRenderer.create(
    <BrowserRouter>
      <MockedProvider mocks={mocks['1']} addTypename={false}>
        <NewsList />
      </MockedProvider>
    </BrowserRouter>,
    container
  );

  const tree = component.toJSON();
  expect(tree[0].children).toContain('Loading...');
});

it('returns a list of news', async () => {
  const component = TestRenderer.create(
    <BrowserRouter>
      <MockedProvider mocks={mocks['1']} addTypename={false}>
        <NewsList />
      </MockedProvider>
    </BrowserRouter>,
    container
  );

  await new Promise((resolve) => setTimeout(resolve, 0));

  const p = component.root.findByType('p');
  expect(p.children.join('')).toContain('Buck is a poodle');
});

it('returns an error', async () => {
  const component = TestRenderer.create(
    <BrowserRouter>
      <MockedProvider mocks={mocks['2']} addTypename={false}>
        <NewsList />
      </MockedProvider>
    </BrowserRouter>,
    container
  );

  await new Promise((resolve) => setTimeout(resolve, 0));

  const tree = component.toJSON();
  expect(tree[0].children).toContain('An error occurred');
});
