import { describe, test, expect } from 'vitest';

describe('Test ejemplo', () => {
  test('hola mundo es igual a hola mundo', () => {
    expect('hola mundo').toEqual('hola mundo');
  });
});
