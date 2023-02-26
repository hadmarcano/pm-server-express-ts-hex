import { Router, Request, Response } from 'express'
import UserApplication from '../../../application/user.application'
import { UserRepository } from '../../../domain/user.repository'
import UserInfraestructure from '../../../infraestructure/user.infraestructure'
import UserController from './controller'

// Instanciation Definitions
const infraestructure: UserRepository = new UserInfraestructure()
const application = new UserApplication(infraestructure)
const controller = new UserController(application)

class UserRouter {
   readonly expressRouter: Router

   constructor() {
      this.expressRouter = Router()
      this.mountRoutes()
   }

   mountRoutes() {
      // Design Pattern: Chain Of Responsability

      // 1-Routing: with Design Pattern: Links Of Method / Method Binding
      this.expressRouter.get('/', controller.list)

      // 2-Routing: with Router context
      // this.expressRouter.get('/list', (req: Request, res: Response) => {
      //    controller.list(req, res)
      // })

      this.expressRouter.get('/:guid', controller.listOne)

      this.expressRouter.post('/', controller.insert)

      this.expressRouter.put('/:guid', controller.update)

      // this.expressRouter.delete('/:guid', controller.delete)
   }
}

export default new UserRouter().expressRouter
