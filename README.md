# daify

dictify and arrayify

## API

### opts

#### `Object`

<dl>
<dt><code>opts.by</code></dt>
<dd><code>string</code>: specify the path to get key of a item, example: <code>`id`</code>, <code>`n.id`</code></dd>
<dd><code>function</code>: specify the function to get key of a item, example: <code>item => item.id</code>
</dd>

<dt><code>opts.include[path]</code></dt>
<dd><code>opts</code> for inner object</dd>
<dd><code>path</code> can have dot like <code>opts.by</code>, which specifies the path to a inner array or dict.</dd>
</dl>

#### `string`

shortcut for `opts.by`

### dictify(array, opts)

Make `array` into `dict`

```js
const opts = {
  by: "id",
  include: {
    lists: "id",
    "namespace.inners": "id"
  }
};

const array = [
  { id: 1, lists: [{ id: 1 }] },
  { id: 2, lists: [{ id: 1 }] },
  {
    id: 3,
    lists: [{ id: 1 }],
    namespace: {
      inners: [{ id: 1 }, { id: 2 }, { id: 3 }]
    }
  }
];

log(dictify(array, opts));
/*
{
  "1": {
    "id": 1,
    "lists": {
      "1": {
        "id": 1
      }
    }
  },
  "2": {
    "id": 2,
    "lists": {
      "1": {
        "id": 1
      }
    }
  },
  "3": {
    "id": 3,
    "lists": {
      "1": {
        "id": 1
      }
    },
    "namespace": {
      "inners": {
        "1": {
          "id": 1
        },
        "2": {
          "id": 2
        },
        "3": {
          "id": 3
        }
      }
    }
  }
}
*/
```

### arrayify(dict, opts)

Make `dict` into `array`

```js
const opts = {
  by: "id", // by is useless here
  include: {
    lists: "id",
    "namespace.inners": "id"
  }
};
const dict = {
  "1": {
    id: 1,
    lists: {
      "1": { id: 1 }
    }
  },
  "2": {
    id: 2,
    lists: {
      "1": { id: 1 }
    }
  },
  "3": {
    id: 3,
    lists: { "1": { id: 1 } },
    namespace: {
      inners: {
        "1": { id: 1 },
        "2": { id: 2 },
        "3": { id: 3 }
      }
    }
  }
};

log(arrayify(dict, opts));
/*
[
  {
    "id": 1,
    "lists": [
      {
        "id": 1
      }
    ]
  },
  {
    "id": 2,
    "lists": [
      {
        "id": 1
      }
    ]
  },
  {
    "id": 3,
    "lists": [
      {
        "id": 1
      }
    ],
    "namespace": {
      "inners": [
        {
          "id": 1
        },
        {
          "id": 2
        },
        {
          "id": 3
        }
      ]
    }
  }
]
*/
```

## LICENSE

[MIT](LICENSE)