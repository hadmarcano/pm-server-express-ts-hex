import User, { UserProperties } from '../domain/user'
import UserFactory from '../domain/user.factory'
import { UserRepository } from '../domain/user.repository'
import { EmailVO } from '../domain/value-object/email.vo'

let users: User[] = []

const promisesUsers = [
   new UserFactory().create('Hector', 'Arteaga', EmailVO.create('harteaga@gmail.com'), 'harteaga123'),
   new UserFactory().create('Javier', 'Cuevas', EmailVO.create('jcuevas@gmail.com'), 'jcuevas123'),
]

Promise.all(promisesUsers).then(result => (users = result))

// When i create a class implementing other like this case,
// we are complying with the solid principle: Dependency Inversion.
export default class UserInfraestructure implements UserRepository {
   list(): UserProperties[] {
      return users.filter((el: User) => el.properties().active).map((el: User) => el.properties())
   }

   listOne(guid: string): User {
      const user: User = Object.assign(
         {},
         users.filter((el: User) => el.properties().active).find((el: User) => el.properties().guid === guid),
      )

      console.log('ListOne :', user)

      return user
   }

   insert(user: User): UserProperties {
      users.push(user)
      return user.properties()
   }

   update(user: User): User {
      const { guid } = user.properties()
      const userIndex: number = users.findIndex((el: User) => el.properties().guid === guid)
      users[userIndex] = user
      return user
   }
}
