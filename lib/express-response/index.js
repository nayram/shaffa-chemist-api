const { required } = require('../utils')

const respond = ({
  res = required('res'),
  status = required('status')
}) => (
  data = required('data')
) => res.status(status).json({ data: data.data ? data.data : data })

module.exports = respond
