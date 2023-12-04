import { httpRequest, httpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { EmailValidator } from "../protocols/emailValidator"
import { InvalidParamError } from '../errors/invalid-param-error';
import { ServerError } from '../errors/serverError';


export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator

    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }

    handle(httpRequest: httpRequest): httpResponse {
        try {
            const requiredField = ['name', 'email', 'password', 'passwordConfirmation']
            for (const field of requiredField) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            const isValid = this.emailValidator.isValid(httpRequest.body.email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: new ServerError
            }
        }
    }
}