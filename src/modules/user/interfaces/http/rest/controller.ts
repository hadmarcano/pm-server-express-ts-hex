import User, { UserProperties } from '../../../domain/user'
import { Request, Response } from 'express'
import UserApplication from '../../../application/user.application'
import UserFactory from '../../../domain/user.factory'
import { EmailVO } from '../../../domain/value-object/email.vo'
// DTOS
import { UserListDTO } from '../dto/response/user-list.dto'
import { UserListMapping } from '../dto/response/user-list.dto'
import { UserListOneDTO } from '../dto/response/user-list-one.dto'
import { UserListOneMapping } from '../dto/response/user-list-one.dto'
import { UserInsertMapping } from '../dto/response/user-insert.dto'

export default class {
   constructor(private application: UserApplication) {
      // Design Pattern: Links Of Method / Mediator Method
      // With this sentence we create a Injection Context
      this.list = this.list.bind(this) // Enable -> 1-Routing
      this.listOne = this.listOne.bind(this) // Enable -> 1-Routing
      this.insert = this.insert.bind(this) // Enable -> 1-Routing
      this.update = this.update.bind(this) // Enable -> 1-Routing
      // this.delete = this.delete.bind(this) // Enable -> 1-Routing
   }

   list(req: Request, res: Response) {
      const list = this.application.listUsers()
      const result: UserListDTO = new UserListMapping().execute(list)
      res.json(result)
   }

   listOne(req: Request, res: Response) {
      const { guid } = req.params
      const data = this.application.getUser(guid).properties()
      const result: UserListOneDTO = new UserListOneMapping().execute(data)

      res.json(result)
   }

   async insert(req: Request, res: Response) {
      const { name, lastname, email, password } = req.body

      const user: User = await new UserFactory().create(name, lastname, EmailVO.create(email), password)

      const data = this.application.insertUser(user)

      const result = new UserInsertMapping().execute(data)

      res.json(result)
   }

   update(req: Request, res: Response) {
      const properties: UserProperties = {
         // id: 3,
         name: 'Jesus',
         lastname: 'Gonzalez',
         email: EmailVO.create('jrico@gmail.com'),
         password: 'jrico123',
         refreshToken: '123jrico123',
      }
      const user: User = new User(properties)
      const userUpdate = this.application.updateUser(user)
      res.json(userUpdate)
   }
}
