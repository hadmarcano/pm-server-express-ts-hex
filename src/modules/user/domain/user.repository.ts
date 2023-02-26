import User, { UserProperties } from './user'
// SOLID Principle: Inversion Dependency
// User Model Characteristics/Behaivor define

export interface UserRepository {
   // Design Pattern Fachade
   list(): User[]
   listOne(guid: string): User
   insert(user: User): UserProperties
   update(user: User): UserProperties
}
