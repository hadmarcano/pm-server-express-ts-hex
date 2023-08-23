import { EmailVO } from '../value-object/email.vo'

export interface UserRequired {
   // id: number
   name: string
   lastname: string
   email: EmailVO
   password: string
}
