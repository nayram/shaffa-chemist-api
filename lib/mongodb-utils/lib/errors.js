const { customError } = require('../../express-error')

module.exports = {
  removeCriteriaCannotBeEmpty: () => customError({
    name: 'RemoveCriteriaCannotBeEmptyError',
    message: 'Criteria for removing documents must be a non-empty object'
  }),
  limitNaNError: () => customError({
    name: 'LimitNotANumber',
    message: 'Limit must be a number'
  })
}
