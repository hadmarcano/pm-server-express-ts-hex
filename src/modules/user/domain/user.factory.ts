import { v4 as uuidv4 } from 'uuid'
import { UserPasswordService } from './services/user-password.service'
import User, { UserProperties } from './user'

// Design Pattern: Abstract Factory
export default class UserFactory {
   async create(name: string, lastname: string, email: string, password: string) {
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

      return user
   }
}

// Phase1
// Finish implementation of Abstract Factor Pattern
// Finish implementation of Valu-Object Abstract
// View the DTO implementation

// Phase2
// Include the bbdd with typoORM
// Include Docker
