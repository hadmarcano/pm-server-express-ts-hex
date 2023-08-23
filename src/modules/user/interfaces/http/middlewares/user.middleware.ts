import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { UserListOneValidator } from '../validators/userListOne.validator'

class UserMiddleware {
   // Puedes tener más de un middlewares para listOne
   // 1-
   static async ValidateListOne(req: Request, res: Response, next: NextFunction) {
      const { guid } = req.params
      const userListOneValidator = new UserListOneValidator()
      userListOneValidator.guid = guid

      const errors = await validate(userListOneValidator)
      // console.log(guid)

      if (errors.length > 0) {
         console.log(errors)
         return next(new Error('Invalid request'))
      }

      next()
   }
}

// Luego puedes crear una lista de middlewares para
// implementarlos de la siguiente manera:
// this.expressRouter.get('/:guid', ...MiddlewareListOne, controller.listOne)

export const MiddlewareListOne: ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] = [
   UserMiddleware.ValidateListOne,
]
