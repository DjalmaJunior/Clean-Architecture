import { MissingParamError, InvalidParamError } from '../errors'
import { BadRequestError, ServerRequestError } from '../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'

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

      const { email, password, password_confirmation } = httpRequest.body

      if (password !== password_confirmation) {
        return BadRequestError(new InvalidParamError('password_confirmation'))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return BadRequestError(new InvalidParamError('email'))
      }

      return { statusCode: 200, body: {} }
    } catch (err) {
      return ServerRequestError()
    }
  }
}
