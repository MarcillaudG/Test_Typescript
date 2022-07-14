import { GenericError } from "../../errors/GenericError";
import HttpStatus from 'http-status-codes'

export class UserErrors {
      static WrongToken(): GenericError {
        return GenericError.of({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'This token is wrong. Please login',
          code: 'WRONG_TOKEN'
        })
      }
    
      static UserNotFound(msg?: string): GenericError {
        return GenericError.of({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: `The user ${msg} does not exist`,
          code: 'USER_NOT_FOUND'
        })
      }
}