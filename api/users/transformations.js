const userTransformations = (user) => ({
  id: user._id,
  phone_number: user.phone_number,
  email: user.email && user.email,
  created_at: user.created_at,
  updated_at: user.updated_at
})

module.exports = userTransformations
