import User from '../domain/user'
import { UserRepository } from '../domain/user.repository'

const users: User[] = [
   new User({
      id: 1,
      name: 'Facundo',
      lastname: 'Ramirez',
      email: 'facuramirez@gmail.com',
      password: '12345AC',
      active: true,
      refreshToken: 'abc1234',
   }),

   new User({
      id: 1,
      name: 'Hector',
      lastname: 'Arteaga',
      email: 'artehector@gmail.com',
      password: '1234aBC',
      active: true,
      refreshToken: 'abc1234',
   }),
]

export default class UserInfraestructure implements UserRepository {
   list(): User[] {
      return users
   }

   listOne(id: number): User {
      return Object.assign(
         {},
         users.find((el: User) => el.properties().id === id),
      )
   }

   insert(user: User): void {
      console.log('user inserted', user)
   }

   update(user: User): void {
      console.log('user update', user)
   }

   delete(user: User): void {
      console.log('user deleted', user)
      user.delete()
   }
}
