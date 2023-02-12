import User from './user'
// SOLID Principle: Inversion Dependency
// User Model Characteristics/Behaivor define

export interface UserRepository {
   list(): User[]
   listOne(id: number): User
   insert(user: User): void
   update(user: User): void
   delete(user: User): void
}
