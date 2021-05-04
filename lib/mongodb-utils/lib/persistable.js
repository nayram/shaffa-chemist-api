/* eslint-disable consistent-return */
const { handleAndThrowMongooseError } = require('./mongoose-errors')
const { required, isNonEmptyObject } = require('../../utils')
const { removeCriteriaCannotBeEmpty } = require('./errors')

const persistable = {}

const save = async ({ model, populate = '' }) => {
  try {
    let document = await model.save()
    if (populate) document = await document.populate(populate).execPopulate()

    return document.toObject()
  } catch (error) {
    handleAndThrowMongooseError({ error })
  }
}

const create = async ({ model, document, populate = '' }) => {
  try {
    let createdDocument = await model.create(document)
    if (populate) {
      createdDocument = await createdDocument.populate(populate).execPopulate()
    }
    return createdDocument.toObject()
  } catch (error) {
    handleAndThrowMongooseError({ error })
  }
}

const get = async ({
  model, query, fields = {}, populate = ''
}) => {
  try {
    const document = await model.findOne(query, fields).populate(populate).lean().exec()
    return document
  } catch (error) {
    handleAndThrowMongooseError({ error })
  }
}

const remove = async ({ model, query = required('query') }) => {
  try {
    if (!isNonEmptyObject(query)) throw removeCriteriaCannotBeEmpty()

    const result = await model.deleteOne(query)

    return result
  } catch (error) {
    handleAndThrowMongooseError({ error })
  }
}

const updateDoc = async ({
  model,
  query,
  update,
  populate = '',
  options = {}
}) => {
  const opts = { new: true, runValidators: true, ...options }
  try {
    const updatedDoc = await model.findOneAndUpdate(query, update, opts)
      .populate(populate).lean().exec()
    return updatedDoc
  } catch (error) {
    handleAndThrowMongooseError({ error })
  }
}

const fetch = ({
  model,
  query,
  fields = {},
  timeout = false,
  populate = '',
  transform
}) => model.find(query, fields).batchSize(100).lean().populate(populate)
  .cursor()
  .addCursorFlag('noCursorTimeout', timeout)
  .map(transform || ((doc) => doc))

const count = async ({ model, query = {} }) => {
  try {
    const countDocs = model.countDocuments
      ? await model.countDocuments(query).exec() : await model.count(query).exec()
    return countDocs
  } catch (error) {
    handleAndThrowMongooseError({ error })
  }
}

persistable.save = save
persistable.create = create
persistable.get = get
persistable.remove = remove
persistable.update = updateDoc
persistable.fetch = fetch
persistable.count = count

module.exports = {
  createBaseModel: () => Object.create(persistable)
}
