import { IEntity } from 'src/modules/shared/entity.interface'
import { EmailVO } from './value-object/email.vo'

// Interfaces
interface UserRequired {
   // id: number
   name: string
   lastname: string
   email: EmailVO
   password: string
}

interface UserOptional {
   guid: string
   refreshToken: string
   active: boolean
}

type UserUpdate = {
   name: string
   email: EmailVO
   lastname: string
   password: string
}

export type UserProperties = Required<UserRequired> & Partial<UserOptional>

// Domain model
export default class User implements IEntity<UserProperties, UserUpdate> {
   // private readonly id: number
   private readonly guid: string
   private name: string
   private lastname: string
   private readonly email: EmailVO
   private password: string
   private refreshtoken: string
   private active: boolean

   constructor(userProperties: UserProperties) {
      this.active = true
      Object.assign(this, userProperties)
   }

   // Methods
   properties(): UserProperties {
      return {
         // id: this.id,
         name: this.name,
         lastname: this.lastname,
         email: this.email,
         password: this.password,
         refreshToken: this.refreshtoken,
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
