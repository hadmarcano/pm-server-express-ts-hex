import { UserProperties } from 'src/modules/user/domain/types/userProperties.type'
import { DTO } from './interfaces/dto.interface'
import { UserDTO } from './interfaces/userDto.interface'

export type UserListOneDTO = UserDTO

export class UserListOneMapping extends DTO<UserProperties, UserDTO> {
   execute(data: UserProperties): UserListOneDTO {
      return {
         name: data.name,
         lastname: data.lastname,
         email: data.email.value,
         guid: data.guid,
      }
   }
}
