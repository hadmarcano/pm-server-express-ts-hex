import { Result } from 'neverthrow'
import { EmailVO } from '../email.vo'
import { UserEmailInvalidException } from '../../exceptions/user.exception'
export type EmailResult = Result<EmailVO, UserEmailInvalidException>
