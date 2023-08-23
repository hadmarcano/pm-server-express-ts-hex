import { UserProperties } from 'src/modules/user/domain/types/userProperties.type'
import { DTO } from './interfaces/dto.interface'
import { UserDTO } from './interfaces/userDto.interface'

export type UserDeleteDTO = UserDTO

export class UserDeleteMappingDTO extends DTO<UserProperties, UserDeleteDTO> {
   execute(data: UserProperties): UserDeleteDTO {
      return {
         name: data.name,
         lastname: data.lastname,
         email: data.email.value,
         guid: data.guid,
      }
   }
}
