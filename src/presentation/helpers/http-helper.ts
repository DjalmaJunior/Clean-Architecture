import { HttpResponse } from '../protocols/http'
import { ServerError } from '../errors'

export const BadRequestError = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const ServerRequestError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

export const SuccessRequest = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
