import { HttpResponse } from '../protocols/http'
import { ServerError } from '../errors/server-error'

export const BadRequestError = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const ServerRequestError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})
