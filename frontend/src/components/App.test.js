import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('navigates home when you click the logo', () => {
  let testLocation;

  render(
    <BrowserRouter>
      <MockedProvider>
        <div>
          <App />
          <Route
            path="*"
            render={() => {
              testLocation = window.location;
              return null;
            }}
          />
        </div>
      </MockedProvider>
    </BrowserRouter>,
    container
  );

  act(() => {
    const goHomeLink = document.querySelector('.home-img');
    goHomeLink.dispatchEvent(new MouseEvent('click'));
  });

  expect(testLocation.pathname).toBe('/news/1');
  expect(document.body.textContent).toContain('News');
  expect(document.body.textContent).toContain('No news...');
});

it("navigates home when you click the site's name", () => {
  let testLocation;

  render(
    <BrowserRouter>
      <MockedProvider>
        <div>
          <App />
          <Route
            path="*"
            render={() => {
              testLocation = window.location;
              return null;
            }}
          />
        </div>
      </MockedProvider>
    </BrowserRouter>,
    container
  );

  act(() => {
    const goHomeLink = document.querySelector('.home');
    goHomeLink.dispatchEvent(new MouseEvent('click'));
  });

  expect(testLocation.pathname).toBe('/news/1');
  expect(document.body.textContent).toContain('News');
  expect(document.body.textContent).toContain('No news...');
});

it('navigates to /games when you click Games', () => {
  render(
    <BrowserRouter initialEntries={['/']}>
      <MockedProvider>
        <App />
      </MockedProvider>
    </BrowserRouter>,
    container
  );

  act(() => {
    const goHomeLink = document.querySelector('.games-nav');
    goHomeLink.dispatchEvent(new MouseEvent('click'));
  });

  expect(document.body.textContent).toContain('Games');
});

it('navigates to /contact when you click Contact', () => {
  render(
    <BrowserRouter initialEntries={['/']}>
      <MockedProvider>
        <App />
      </MockedProvider>
    </BrowserRouter>,
    container
  );

  act(() => {
    const goHomeLink = document.querySelector('.contact-nav');
    goHomeLink.dispatchEvent(new MouseEvent('click'));
  });

  expect(document.body.textContent).toContain('Contact');
});

it('navigates to /about when you click About', () => {
  render(
    <BrowserRouter initialEntries={['/']}>
      <MockedProvider>
        <App />
      </MockedProvider>
    </BrowserRouter>,
    container
  );

  act(() => {
    const goHomeLink = document.querySelector('.contact-nav');
    goHomeLink.dispatchEvent(new MouseEvent('click'));
  });

  expect(document.body.textContent).toContain('About');
});
