import User from '../domain/user'
import { UserRepository } from '../domain/user.repository'
import { UserUpdate } from '../domain/types/userUpdate.type'

export default class UserApplication {
   // Design Pattern: Injection Dependency
   constructor(private readonly userRepository: UserRepository) {}

   // when you dont make implements, you can change the name of methods
   listUsers() {
      return this.userRepository.list()
   }

   getUser(guid: string) {
      return this.userRepository.listOne(guid)
   }

   insertUser(user: User) {
      return this.userRepository.insert(user)
   }

   updateUser(guid: string, user: Partial<UserUpdate>) {
      return this.userRepository.update(guid, user)
   }

   deleteUser(guid: string) {
      return this.userRepository.delete(guid)
   }
}
