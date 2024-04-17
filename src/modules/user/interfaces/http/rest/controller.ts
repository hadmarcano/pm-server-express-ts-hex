import { NextFunction, Request, Response } from 'express'
import UserApplication from '../../../application/user.application'
import UserFactory from '../../../domain/user.factory'
import { EmailVO } from '../../../domain/value-object/email.vo'
import { GuidVO } from '../../../domain/value-object/guid.vo'
import { IError } from '../../helper/ierror'
// DTOS
import { UserListMapping } from '../dto/response/user-list.dto'
import { UserListOneMapping } from '../dto/response/user-list-one.dto'
import { UserInsertMapping } from '../dto/response/user-insert.dto'
import { UserUpdateMapping } from '../dto/response/user-update.dto'
import { UserDeleteMappingDTO } from '../dto/response/user-delete.dto'

export default class {
   constructor(private application: UserApplication) {
      // Design Pattern: Links Of Method / Mediator Method
      // With this sentence we create a Injection Context
      this.list = this.list.bind(this) // Enable -> 1-Routing
      this.listOne = this.listOne.bind(this) // Enable -> 1-Routing
      this.insert = this.insert.bind(this) // Enable -> 1-Routing
      this.update = this.update.bind(this) // Enable -> 1-Routing
      this.delete = this.delete.bind(this) // Enable -> 1-Routing
   }

   async list(req: Request, res: Response) {
      const list = await this.application.listUsers()
      const result = new UserListMapping().execute(list.map(user => user.properties()))
      res.json(result)
   }

   async listOne(req: Request, res: Response, next: NextFunction) {
      const { guid } = req.params

      const guidResult = GuidVO.create(guid)
      if (guidResult.isErr()) {
         const err: IError = new Error(guidResult.error.message)
         err.status = 411
         return next(err)
      }

      const userResult = await this.application.getUser(guid)
      if (userResult.isErr()) {
         return res.status(400).send(userResult.error.message)
      }

      if (userResult.isOk()) {
         const result = new UserListOneMapping().execute(userResult.value.properties())

         return res.json(result)
      }
   }

   async insert(req: Request, res: Response, next: NextFunction) {
      const { name, lastname, email, password } = req.body
      // console.log(name, lastname, email, password)

      const emailResult = EmailVO.create(email)
      if (emailResult.isErr()) {
         const err: IError = new Error(emailResult.error.message)
         err.status = 411
         return next(err)
      }
      const userResult = await new UserFactory().create(name, lastname, emailResult.value, password)

      if (userResult.isErr()) {
         const err: IError = new Error(userResult.error.message)
         err.status = 411
         return next(err)
      } else {
         // console.log('userResult', userResult)

         const data = await this.application.insertUser(userResult.value)

         const result = new UserInsertMapping().execute(data.properties())

         res.json(result)
      }
   }

   async update(req: Request, res: Response, next: NextFunction) {
      const { guid } = req.params
      const fieldsToUpdate = req.body
      // console.log('fieldsToUpdate ==>', fieldsToUpdate)

      const guidResult = GuidVO.create(guid)
      if (guidResult.isErr()) {
         const err: IError = new Error(guidResult.error.message)
         err.status = 411
         return next(err)
      }

      const dataResult = await this.application.updateUser(guid, fieldsToUpdate)
      if (dataResult.isErr()) {
         const err: IError = new Error(dataResult.error.message)
         err.status = 400
         return next(err)
      }

      if (dataResult.isOk()) {
         const result = new UserUpdateMapping().execute(dataResult.value.properties())

         return res.json(result)
      }
   }

   async delete(req: Request, res: Response, next: NextFunction) {
      const { guid } = req.params

      const guidResult = GuidVO.create(guid)

      if (guidResult.isErr()) {
         const err: IError = new Error(guidResult.error.message)
         err.status = 411
         return next(err)
      }
      const dataResult = await this.application.deleteUser(guid)

      if (dataResult.isErr()) {
         const err: IError = new Error(dataResult.error.message)
         err.status = 404
         return next(err)
      } else {
         const result = new UserDeleteMappingDTO().execute(dataResult.value.properties())

         return res.json(result)
      }
   }
}
