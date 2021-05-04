const { always } = require('ramda')
const { create } = require('../../../models/prescriptions')
const { asyncPipe, required } = require('../../../lib/utils')
const ensureUserAlreadyExists = require('../../common/ensure-user-already-exists')

const addNewPrescription = ({
  user_id = required('user_id'),
  image_url = required('image_url'),
  note
}) => asyncPipe(
  always(user_id),
  ensureUserAlreadyExists,
  () => create({ user_id, image_url, note })
)()

module.exports = addNewPrescription
