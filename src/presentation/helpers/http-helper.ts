import { HttpResponse } from '../protocols/http'

export const BadRequestError = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
