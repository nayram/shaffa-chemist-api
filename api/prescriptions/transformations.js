const prescriptonTransformation = (prescription) => ({
  id: prescription._id,
  user_id: prescription.user_id,
  note: prescription.note || '',
  image_url: prescription.image_url,
  created_at: prescription.created_at,
  updated_at: prescription.updated_at
})

module.exports = prescriptonTransformation
