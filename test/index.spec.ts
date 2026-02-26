import { describe, it, expect } from 'vitest';
import { hello } from '../src/index'; 

describe('hello function', () => {
  it('should return a greeting with the name', () => {
    const result = hello('Vitest');
    expect(result).toBe('Hola, Vitest!');
  });
});
