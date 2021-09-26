import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError, InvalidParamError } from '../errors'
import { BadRequestError, ServerRequestError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFileds = ['name', 'email', 'password', 'password_confirmation']

      for (const field of requiredFileds) {
        if (!httpRequest.body[field]) {
          return BadRequestError(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) {
        return BadRequestError(new InvalidParamError('email'))
      }

      return { statusCode: 200, body: {} }
    } catch (err) {
      return ServerRequestError()
    }
  }
}
