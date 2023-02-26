import { Request, Response } from 'express'
import UserApplication from '../../../application/user.application'
import User, { UserProperties } from '../../../domain/user'

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
      res.json(list)
   }

   listOne(req: Request, res: Response) {
      const user = this.application.getUser('guid')
      res.json(user)
   }

   insert(req: Request, res: Response) {
      const properties: UserProperties = {
         // id: 3,
         name: 'Jesus',
         lastname: 'Rico',
         email: 'jrico@gmail.com',
         password: 'jrico123',
         refreshToken: '123jrico123',
      }
      const user: User = new User(properties)
      const userInsert = this.application.insertUser(user)
      res.json(userInsert)
   }

   update(req: Request, res: Response) {
      const properties: UserProperties = {
         // id: 3,
         name: 'Jesus',
         lastname: 'Gonzalez',
         email: 'jrico@gmail.com',
         password: 'jrico123',
         refreshToken: '123jrico123',
      }
      const user: User = new User(properties)
      const userUpdate = this.application.updateUser(user)
      res.json(userUpdate)
   }
}
