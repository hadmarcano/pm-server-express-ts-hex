import { UserProperties } from 'src/modules/user/domain/types/userProperties.type'
import { DTO } from './interfaces/dto.interface'
import { UserDTO } from './interfaces/userDto.interface'

export type UserInsertOneDTO = UserDTO

export class UserInsertMapping extends DTO<UserProperties, UserDTO> {
   execute(data: UserProperties): UserInsertOneDTO {
      return { name: data.name, lastname: data.lastname, email: data.email.value, guid: data.guid }
   }
}
