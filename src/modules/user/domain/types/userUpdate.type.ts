import { EmailVO } from '../value-object/email.vo'

export type UserUpdate = {
   name: string
   email: EmailVO
   lastname: string
   password: string
}
