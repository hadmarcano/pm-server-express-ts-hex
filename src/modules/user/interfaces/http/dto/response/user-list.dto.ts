import { UserProperties } from 'src/modules/user/domain/types/userProperties.type'
import { DTO } from './interfaces/dto.interface'
import { UserDTO } from './interfaces/userDto.interface'

export type UserListDTO = UserDTO[]

export class UserListMapping extends DTO<UserProperties[], UserListDTO> {
   execute(data: UserProperties[]): UserListDTO {
      return data.map((user: UserProperties) => {
         return {
            guid: user.guid,
            name: user.name,
            lastname: user.lastname,
            email: user.email.value,
            // password: user.password,
         }
      })
   }
}
