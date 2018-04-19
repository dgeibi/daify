const isPrimitive = require('is-primitive')
const getValue = require('get-value')
const setValue = require('set-value')

const emptyArray = []
function normalize(opts) {
  if (isPrimitive(opts)) {
    return { by: opts, paths: emptyArray }
  }
  const { by, include } = opts
  const paths = !isPrimitive(include) ? Object.keys(include) : emptyArray
  return { by, paths, include }
}

function getDictKey(item, by) {
  return typeof by === 'function' ? by(item) : getValue(item, by)
}

function dictify(array, opts) {
  if (!Array.isArray(array)) return array
  const dict = {}
  const { by, paths, include } = normalize(opts)
  array.forEach(item => {
    if (item != null) {
      dict[getDictKey(item, by)] = item
      paths.forEach(path => {
        const value = getValue(item, path)
        if (Array.isArray(value)) {
          setValue(item, path, dictify(value, include[path]))
        }
      })
    }
  })
  return dict
}

function arrayify(dict, opts) {
  if (isPrimitive(dict)) return dict
  const array = []
  const { paths, include } = normalize(opts)
  Object.keys(dict).forEach(key => {
    const item = dict[key]
    array.push(item)
    paths.forEach(path => {
      const value = getValue(item, path)
      if (!isPrimitive(value)) {
        setValue(item, path, arrayify(value, include[path]))
      }
    })
  })
  return array
}

module.exports = {
  dictify,
  arrayify,
}
