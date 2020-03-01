const mapKeys = (keys, queryMap) => {
  return keys.map((key) => (queryMap[key] === undefined ? [] : queryMap[key]))
}

const mapManyToMany = (keys, queries) => {
  const queryMap = {}
  queries.forEach((query) => {
    const { relative, id } = query
    if (queryMap[id] === undefined) {
      queryMap[id] = [relative]
    } else {
      queryMap[id].push(relative)
    }
  })
  return mapKeys(keys, queryMap)
}

const mapManyToOne = (keys, queries) => {
  const queryMap = {}
  queries.forEach((query) => {
    const { id } = query
    queryMap[id] = query
  })
  return mapKeys(keys, queryMap)
}

const mapOneToMany = (keys, queries, foreignId) => {
  const queryMap = {}
  queries.forEach((query) => {
    const id = query[foreignId]
    if (queryMap[id] === undefined) {
      queryMap[id] = [query]
    } else {
      queryMap[id].push(query)
    }
  })
  return mapKeys(keys, queryMap)
}

const nextOrder = async (Schema, objectId = false, field = 'order') => {
  const objectValue = objectId[Object.keys(objectId)[0]]
  if (objectValue === undefined || objectValue === null) return false
  const query = await Schema.aggregate([{ $match: objectId }, { $group: { _id: null, highestOrder: { $max: `$${field}` } } }])
  const nextOrder = query.length === 0 ? 0 : query[0].highestOrder + 1
  const obj = {}
  obj[field] = nextOrder
  return obj
}

const queryManyToOne = async (Schema, keys) => {
  const query = await Schema.find({ _id: { $in: keys } })
  return mapManyToOne(keys, query)
}

const queryOneToMany = async (Schema, keys, field) => {
  const match = {}
  match[field] = { $in: keys }
  const queries = await Schema.find(match)
  return mapOneToMany(keys, queries, field)
}

const queryManyToMany = async (Schema, keys, match, from, localField) => {
  const $match = {}
  $match[match] = { $in: keys }
  const query = await Schema.aggregate([
    { $match },
    { $lookup: { from, localField, foreignField: '_id', as: 'relative' } },
    { $project: { _id: 0, id: `$${match}`, relative: { $arrayElemAt: ['$relative', 0] } } },
  ])
  console.log(query)
  return mapManyToMany(keys, query)
}

const reorder = async (Schema, _id, currentIndex, newIndex, objectId, order = 'order') => {
  const objectValue = objectId[Object.keys(objectId)[0]]
  if (objectValue === undefined || objectValue === null) return false
  if (currentIndex !== newIndex) return false
  const matchOrder = {}
  matchOrder[order] = newIndex < currentIndex ? { $gte: newIndex, $lt: currentIndex } : { $gt: currentIndex, $lte: newIndex }
  const $inc = {}
  $inc[order] = newIndex < currentIndex ? 1 : -1
  const $set = {}
  $set[order] = newIndex
  const promises = [Schema.updateOne({ _id }, { $set }), Schema.updateMany({ $and: [{ _id: { $ne: _id } }, objectId, matchOrder] }, { $inc })]
  await Promise.all(promises)
  return true
}

const queryByFields = (Schema, field) => {
  const $and = Object.keys(field || {}).map((key) => {
    const condition = {}
    condition[key] = field[key]
    return condition
  })
  return $and.length === 0 ? Schema.find() : Schema.find({ $and })
}

module.exports = { queryManyToOne, queryOneToMany, queryManyToMany, nextOrder, reorder, queryByFields }
