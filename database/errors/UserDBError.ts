import { GenericError } from "../../errors/GenericError";
import HttpStatus from 'http-status-codes'

export class UserDBErrors {
    static UserAlreadyExisting(): GenericError {
        return GenericError.of({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'This user already exist, creation impossible try update',
          code: 'USER_ALREADY_EXISTING'
        })
      }

      static UserNotExisting(): GenericError {
        return GenericError.of({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'This user doesn ot exist, update impossible try creation',
          code: 'USER_NOT_EXISTING'
        })
      }
    
}