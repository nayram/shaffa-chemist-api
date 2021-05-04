const { expect } = require('chai')
const { schema } = require('./index')

describe('User Schema Spec', () => {
  const userSchema = schema.paths
  describe('Name', () => {
    const { name } = userSchema
    it('should be a string', () => expect(name.instance).to.be.equal('String'))
    it('should be required', () => expect(name.isRequired).to.be.true)
  })
  describe('Phone number', () => {
    const phoneNumber = userSchema.phone_number
    it('should be a string', () => expect(phoneNumber.instance).to.be.equal('String'))
    it('should be required', () => expect(phoneNumber.isRequired).to.be.true)
  })
  describe('Email', () => {
    const { email } = userSchema
    it('should be a string', () => expect(email.instance).to.be.equal('String'))
    it('should not be required', () => expect(email.isRequired).to.be.false)
  })
  describe('Password', () => {
    const { password } = userSchema
    it('should be a string', () => expect(password.instance).to.be.equal('String'))
    it('should not be required', () => expect(password.isRequired).to.be.true)
  })
})
