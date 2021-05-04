const { expect } = require('chai')
const { schema } = require('./index')

describe('Prescription Schema Spec', () => {
  const prescriptionSchema = schema.paths
  describe('User Id', () => {
    const userId = prescriptionSchema.user_id
    it('should be an objectId', () => expect(userId.instance).to.equal('ObjectID'))

    it('should be required', () => expect(userId.isRequired).to.be.true)
  })

  describe('Image Url', () => {
    const imageUrl = prescriptionSchema.image_url
    it('should be a String', () => expect(imageUrl.instance).to.equal('String'))
    it('should be required', () => expect(imageUrl.isRequired).to.be.true)
  })

  describe('Note', () => {
    const { note } = prescriptionSchema
    it('should be a String', () => expect(note.instance).to.be.equal('String'))
    it('should not be required', () => expect(note.isRequired).to.be.false)
  })

  describe('Created At', () => {
    const createdAt = prescriptionSchema.created_at
    it('should exist', async () => expect(createdAt.options.type()).to.be.a('string'))
    it('should be a date', async () => expect(Date.parse(createdAt.options.type())).to.not.be.NaN)
  })

  describe('Updated At', () => {
    const updatedAt = prescriptionSchema.updated_at
    it('should exist', async () => expect(updatedAt.options.type()).to.be.a('string'))
    it('should be a date', async () => expect(Date.parse(updatedAt.options.type())).to.not.be.NaN)
  })
})
