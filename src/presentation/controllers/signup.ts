import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return { statusCode: 400, body: new MissingParamError('Missing param: name') }
    } else if (!httpRequest.body.email) {
      return { statusCode: 400, body: new MissingParamError('Missing param: email') }
    }

    return { statusCode: 200, body: {} }
  }
}
