import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { BadRequestError } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFileds = ['name', 'email', 'password', 'password confimation']

    for (const field of requiredFileds) {
      if (!httpRequest.body[field]) {
        return BadRequestError(new MissingParamError(field))
      }
    }

    return { statusCode: 200, body: {} }
  }
}
