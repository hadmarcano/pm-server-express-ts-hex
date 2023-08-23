import { IEntity } from 'src/modules/shared/entity.interface'
import { EmailVO } from './value-object/email.vo'
// Types
import { UserProperties } from './types/userProperties.type'
import { UserUpdate } from './types/userUpdate.type'

// Domain model
export default class User implements IEntity<UserProperties, UserUpdate> {
   // private readonly id: number
   private readonly guid: string
   private name: string
   private lastname: string
   private readonly email: EmailVO
   private password: string
   private refreshToken: string
   private active: boolean

   constructor(userProperties: UserProperties) {
      this.active = true
      Object.assign(this, userProperties)
   }

   // Methods
   properties(): UserProperties {
      return {
         guid: this.guid,
         name: this.name,
         lastname: this.lastname,
         email: this.email,
         password: this.password,
         refreshToken: this.refreshToken,
         active: this.active,
      }
   }

   update(fields: UserUpdate) {
      Object.assign(this, fields)
   }

   delete() {
      this.active = false
   }
}
