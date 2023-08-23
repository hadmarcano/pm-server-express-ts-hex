import { ValueObject } from './vo.class'
import { validate as uuidValidate } from 'uuid'
import { UserGuidInvalidException } from '../exceptions/user.exception'
import { err, ok } from 'neverthrow'
import { GuidResult } from './types/guidResult.type'
import { GuidProps } from './interfaces/guidProps.interface'

export class GuidVO extends ValueObject<GuidProps> {
   private constructor(props: GuidProps) {
      super(props)
   }

   static create(guid: string): GuidResult {
      // console.log('guid =>', uuidValidate(guid))
      if (!uuidValidate(guid)) {
         return err(new UserGuidInvalidException())
      }

      return ok(new GuidVO({ value: guid }))
   }

   get value(): string {
      return this.props.value
   }
}
