import User from '../domain/user'
import { UserRepository } from '../domain/user.repository'

export default class UserApplication {
   // Design Pattern: Injection Dependency
   constructor(private readonly userRepository: UserRepository) {}

   // when you dont make implements, you can change the name of methods
   getUser(guid: string) {
      return this.userRepository.listOne(guid)
   }

   listUsers() {
      return this.userRepository.list()
   }

   updateUser(user: User) {
      return this.userRepository.update(user)
   }

   insertUser(user: User) {
      return this.userRepository.insert(user)
   }
}
