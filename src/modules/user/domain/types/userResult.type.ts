import { Result } from 'neverthrow'
import User from '../user'
import {
   UserLastameRequiredException,
   UserNameRequiredException,
   UserPasswordLengthInvalidException,
   UserPasswordRequiredException,
} from '../exceptions/user.exception'

export type UserResult = Result<
   User,
   | UserLastameRequiredException
   | UserNameRequiredException
   | UserPasswordRequiredException
   | UserPasswordLengthInvalidException
>
