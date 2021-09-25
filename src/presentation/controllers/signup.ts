import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { BadRequestError } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return BadRequestError(new MissingParamError('Missing param: name'))
    } else if (!httpRequest.body.email) {
      return BadRequestError(new MissingParamError('Missing param: email'))
    }

    return { statusCode: 200, body: {} }
  }
}
