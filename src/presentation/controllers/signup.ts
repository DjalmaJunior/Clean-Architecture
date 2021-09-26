import { AddAccount } from '../../domain/usecases/add-account'
import { MissingParamError, InvalidParamError } from '../errors'
import { BadRequestError, ServerRequestError } from '../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFileds = ['name', 'email', 'password', 'password_confirmation']

      for (const field of requiredFileds) {
        if (!httpRequest.body[field]) {
          return BadRequestError(new MissingParamError(field))
        }
      }

      const { name, email, password, password_confirmation } = httpRequest.body

      if (password !== password_confirmation) {
        return BadRequestError(new InvalidParamError('password_confirmation'))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return BadRequestError(new InvalidParamError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })

      return { statusCode: 200, body: {} }
    } catch (err) {
      return ServerRequestError()
    }
  }
}
