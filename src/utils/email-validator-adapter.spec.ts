import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
    isEmail(): boolean {
        return true
    }
}))

describe('EmailValidator Adapter', () => {
    test('should return false if validator returns false', () => {
        const sut = new EmailValidatorAdapter()
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
        const isValid = sut.isValid('invalid_email@email.com')
        expect(isValid).toBe(false)
    })

    test('should return true if validator returns true', () => {
        const sut = new EmailValidatorAdapter()
        const isValid = sut.isValid('valid_email@email.com')
        expect(isValid).toBe(true)
    })

    test('should call validator with correct email', () => {
        const sut = new EmailValidatorAdapter()
        const isEmailspy = jest.spyOn(validator, 'isEmail')
        sut.isValid('any_email@email.com')
        expect(isEmailspy).toHaveBeenCalledWith('any_email@email.com')
    })
})

