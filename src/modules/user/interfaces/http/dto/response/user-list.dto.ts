import { UserProperties } from 'src/modules/user/domain/user'
import { DTO } from './dto.interface'

interface UserDTO {
   name: string
   lastname: string
   email: string
   password: string
   guid: string
}

export type UserListDTO = UserDTO[]

export class UserListMapping extends DTO<UserProperties[], UserListDTO> {
   execute(data: UserProperties[]): UserListDTO {
      return data.map((user: UserProperties) => {
         return {
            name: user.name,
            lastname: user.lastname,
            email: user.email.value,
            password: user.password,
            guid: user.guid,
         }
      })
   }
}
