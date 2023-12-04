import { httpRequest, httpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from "../helpers/http-helper";

export class SignUpController {
    handle(httpRequest: httpRequest): httpResponse {
        const requiredField = ['name', 'email', 'password']
        for (const field of requiredField) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }
    }
}