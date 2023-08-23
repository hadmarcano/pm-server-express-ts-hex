import { v4 as uuidv4 } from 'uuid'
import { err, ok } from 'neverthrow'
import { UserPasswordService } from './services/user-password.service'
import User from './user'
import { EmailVO } from './value-object/email.vo'
import { UserProperties } from './types/userProperties.type'
import {
   UserLastameRequiredException,
   UserNameRequiredException,
   UserPasswordRequiredException,
   UserPasswordLengthInvalidException,
} from './exceptions/user.exception'

// Design Pattern: Abstract Factory && Method Factory
export default class UserFactory {
   async create(name: string, lastname: string, email: EmailVO, password: string) {
      if (!name || name.trim() === '') {
         return err(new UserNameRequiredException())
      }

      if (!lastname || lastname.trim() === '') {
         return err(new UserLastameRequiredException())
      }

      if (!password || password.trim() === '') {
         return err(new UserPasswordRequiredException())
      }

      if (password.length < 5) {
         return err(new UserPasswordLengthInvalidException(password))
      }

      const passwordHash = await UserPasswordService.hash(password)
      const userProperties: UserProperties = {
         name,
         lastname,
         email,
         password: passwordHash,
         guid: uuidv4(),
         refreshToken: uuidv4(),
      }

      const user = new User(userProperties)

      return ok(user)
   }
}

// Phase1
// Finish implementation of Abstract Factor Pattern
// Finish implementation of Valu-Object Abstract
// View the DTO implementation

// Phase2
// Include the bbdd with typoORM
// Include Docker
