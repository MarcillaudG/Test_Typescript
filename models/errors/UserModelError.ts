import { GenericError } from "../../errors/GenericError";
import HttpStatus from 'http-status-codes'

export class UserModelErrors {
    static UserAlreadyRegistered(): GenericError {
        return GenericError.of({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'This user is already registered',
          code: 'USER_ALREADY_REGISTERED'
        })
      }
    
}