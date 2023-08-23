import { UserGuidInvalidException } from '../../exceptions/user.exception'
import { GuidVO } from '../guid.vo'
import { Result } from 'neverthrow'

export type GuidResult = Result<GuidVO, UserGuidInvalidException>
