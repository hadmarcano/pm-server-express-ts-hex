import { UserProperties } from 'src/modules/user/domain/types/userProperties.type'
import { DTO } from './interfaces/dto.interface'
import { UserUpdateDTO } from './types/userUpdateDto.type'

export class UserUpdateMapping extends DTO<UserProperties, UserUpdateDTO> {
   execute(data: UserProperties): UserUpdateDTO {
      return { name: data.name, lastname: data.lastname, email: data.email.value, guid: data.guid }
   }
}
