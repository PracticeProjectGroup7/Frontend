import { describe, expect, test } from 'vitest';

import { createPatch } from './utils';

describe('createPatch', () => {
  test.each([
    { oldObj: {}, newObj: {}, patch: {} },
    { oldObj: { a: 1 }, newObj: {}, patch: {} },
    { oldObj: { a: 1 }, newObj: { a: 2 }, patch: { a: 2 } },
    { oldObj: { a: 1 }, newObj: { b: 2 }, patch: { b: 2 } },
    { oldObj: { a: 1 }, newObj: { a: undefined }, patch: { } },
    { oldObj: { a: 1 }, newObj: { a: null }, patch: { a: null } },
  ])('createPatch #%#', ({ oldObj, newObj, patch }) => {
    expect(createPatch(oldObj, newObj)).toStrictEqual(patch);
  });
});
