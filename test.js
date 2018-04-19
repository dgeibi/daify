/* eslint-env jest */

const { arrayify, dictify } = require('./src')

test('just works', () => {
  const opts = {
    by: 'id',
    include: {
      lists: 'id',
      'namespace.inners': 'id',
    },
  }

  const getData = () => [
    { id: 1, hello: 1, lists: [{ id: 1, hello: 2 }] },
    { id: 2, hello: 1, lists: [{ id: 1, hello: 2 }] },
    {
      id: 3,
      hello: 1,
      lists: [{ id: 1, hello: 2 }],
      namespace: {
        inners: [{ id: 1, hello: 2 }, { id: 2, hello: 2 }, { id: 3, hello: 2 }],
      },
    },
  ]

  expect(dictify(getData(), opts)).toMatchSnapshot()
  expect(arrayify(dictify(getData(), opts), opts)).toEqual(getData())
})

test('inner key', () => {
  const opts = 'ns.id'

  const getData = () => [
    { ns: { id: 1 } },
    { ns: { id: 2 } },
    { ns: { id: 3 }, yes: true },
  ]
  expect(dictify(getData(), opts)).toMatchSnapshot()
  expect(arrayify(dictify(getData(), opts), opts)).toEqual(getData())
})

test('set key by function', () => {
  const opts = {
    by: x => x.ns.id,
  }

  const getData = () => [
    { ns: { id: 1 } },
    { ns: { id: 2 } },
    { ns: { id: 3 }, yes: true },
  ]
  expect(dictify(getData(), opts)).toMatchSnapshot()
  expect(arrayify(dictify(getData(), opts), opts)).toEqual(getData())
})

test('nested include', () => {
  const opts = {
    by: 'id',
    include: {
      lists: {
        by: 'id',
        include: {
          cards: 'id',
        },
      },
    },
  }

  const getData = () => [
    {
      id: 1,
      lists: [
        {
          id: 1,
          hello: 2,
          cards: [{ id: 99 }, { id: 101 }, { id: 111 }],
        },
      ],
    },
    { id: 2, lists: [{ id: 1, hello: 2 }] },
  ]

  expect(dictify(getData(), opts)).toMatchSnapshot()
  expect(arrayify(dictify(getData(), opts), opts)).toEqual(getData())
})
