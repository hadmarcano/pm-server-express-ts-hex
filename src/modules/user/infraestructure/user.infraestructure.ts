import User from '../domain/user'
import { UserRepository } from '../domain/user.repository'
import { UserEntity } from './user.entity'
import DatabaseBootstrap from '../../../bootstrap/database.bootstrap'
import { Result, err, ok } from 'neverthrow'
import { EmailVO } from '../domain/value-object/email.vo'
import { UserEmailInvalidException, UserNotFoundException } from '../domain/exceptions/user.exception'
import { UserUpdate } from '../domain/types/userUpdate.type'

// When i create a class implementing other like this case,
// we are complying with the solid principle: Dependency Inversion.
export default class UserInfraestructure implements UserRepository {
   async list(): Promise<User[]> {
      const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)


      const result = await repo.find({ where: { active: true } })

      return result.map((el: UserEntity) => {
         const emailResult = EmailVO.create(el.email)

         // Optional verification by return sign in EmailVO
         if (emailResult.isErr()) {
            throw new UserEmailInvalidException()
         }

         return new User({
            guid: el.guid,
            name: el.name,
            lastname: el.lastname,
            email: emailResult.value,
            password: el.password,
            refreshToken: el.refreshToken,
            active: el.active,
         })
      })
   }

   async listOne(guid: string): Promise<Result<User, UserNotFoundException>> {
      const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)

      const result = await repo.findOne({ where: { guid } })

      if (!result) {
         console.log('ListOne Result =>', result)
         return err(new UserNotFoundException())
      }

      const emailResult = EmailVO.create(result.email)

      // Optional verification by return sign in EmailVO
      if (emailResult.isErr()) {
         return err(new UserEmailInvalidException())
      }

      return ok(
         new User({
            guid: result.guid,
            name: result.name,
            lastname: result.lastname,
            email: emailResult.value,
            password: result.password,
            refreshToken: result.refreshToken,
            active: result.active,
         }),
      )
   }

   async insert(user: User): Promise<User> {
      const userInsert = new UserEntity()
      // console.log('userInsert',userInsert)
      const { guid, name, lastname, email, password, refreshToken, active } = user.properties()
      Object.assign(userInsert, { guid, name, lastname, email: email.value, password, refreshToken, active })

      await DatabaseBootstrap.dataSource.getRepository(UserEntity).save(userInsert)

      return user
   }

   async update(guid: string, user: Partial<UserUpdate>): Promise<Result<User, UserNotFoundException>> {
      const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)

      const userFound = await repo.findOne({ where: { guid } })

      if (!userFound) {
         return err(new UserNotFoundException())
      }

      Object.assign(userFound, user)
      const userEntity = await repo.save(userFound)

      const emailResult = EmailVO.create(userEntity.email)

      // Optional verification by return sign in EmailVO
      if (emailResult.isErr()) {
         return err(new UserEmailInvalidException())
      }

      return ok(
         new User({
            guid: userEntity.guid,
            name: userEntity.name,
            lastname: userEntity.lastname,
            email: emailResult.value,
            password: userEntity.password,
            refreshToken: userEntity.refreshToken,
            active: userEntity.active,
         }),
      )
   }

   async delete(guid: string): Promise<Result<User, UserNotFoundException>> {
      const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)

      const userFound = await repo.findOne({ where: { guid } })

      if (userFound) {
         userFound.active = false
         const userEntity = await repo.save(userFound)
         const emailResult = EmailVO.create(userEntity.email)

         if (emailResult.isErr()) {
            return err(new UserEmailInvalidException())
         }

         return ok(
            new User({
               guid: userEntity.guid,
               name: userEntity.name,
               lastname: userEntity.lastname,
               email: emailResult.value,
               password: userEntity.password,
               refreshToken: userEntity.refreshToken,
               active: userEntity.active,
            }),
         )
      } else {
         return err(new UserNotFoundException())
      }
   }
}
