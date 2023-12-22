import * as matchers from '@testing-library/jest-dom';
import { render, screen, fireEvent, within, waitFor, cleanup, act } from '@testing-library/svelte';
import { expect } from 'vitest';

expect.extend(matchers);

beforeAll(() => {
  globalThis.render = render;
  globalThis.screen = screen;
  globalThis.fireEvent = fireEvent;
  globalThis.within = within;
  globalThis.waitFor = waitFor;
  globalThis.act = act;
});

beforeEach(() => {
  cleanup();
});

afterAll(() => {
  delete globalThis.render;
  delete globalThis.screen;
  delete globalThis.fireEvent;
  delete globalThis.within;
  delete globalThis.waitFor;
});
