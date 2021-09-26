import { MissingParamError, InvalidParamError } from '../../errors'
import { BadRequestError, SuccessRequest, ServerRequestError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, EmailValidator, AddAccount } from './signup.protocols'

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

      const account = this.addAccount.add({
        name,
        email,
        password
      })

      return SuccessRequest(account)
    } catch (err) {
      return ServerRequestError()
    }
  }
}
