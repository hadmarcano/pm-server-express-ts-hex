import User, { UserProperties } from '../domain/user'
import { UserRepository } from '../domain/user.repository'

const users: User[] = [
   new User({
      // id: 1,
      name: 'Facundo',
      lastname: 'Ramirez',
      email: 'facuramirez@gmail.com',
      password: '12345AC',
      active: true,
      refreshToken: 'abc1234',
   }),

   new User({
      // id: 2,
      name: 'Hector',
      lastname: 'Arteaga',
      email: 'artehector@gmail.com',
      password: '1234aBC',
      active: true,
      refreshToken: 'abc1234',
   }),
]

// When i create a class implementing other like this case,
// we are complying with the solid principle: Dependency Inversion.
export default class UserInfraestructure implements UserRepository {
   list(): User[] {
      return users
   }

   listOne(guid: string): User {
      const user: User = Object.assign(
         {},
         users.find((el: User) => el.properties().guid === guid),
      )

      console.log('ListOne :', user)

      return user
   }

   insert(user: User): any {
      console.log('user inserted', user)
      return user
   }

   update(user: User): any {
      console.log('user update', user)
      return user
   }
}
