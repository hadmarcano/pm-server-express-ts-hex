import User from '../domain/user'
import { UserRepository } from '../domain/user.repository'

export default class UserApplication {
   constructor(private readonly userRepository: UserRepository) {}

   // when you dont make implements, you can change the name of methods
   getUser(id: number) {
      return this.userRepository.listOne(id)
   }

   listUsers() {
      return this.userRepository.list()
   }

   updateUser(user: User) {
      return this.userRepository.update(user)
   }

   deleteUser(user: User) {
      return this.userRepository.delete(user)
   }
}
