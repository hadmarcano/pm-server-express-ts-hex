import { ValueObject } from './vo.class'
import { validate as uuidValidate } from 'uuid'

interface GuidProps {
   value: string
}

export class GuidVO extends ValueObject<GuidProps> {
   private constructor(props: GuidProps) {
      super(props)
   }

   static create(guid: string) {
      if (!uuidValidate(guid)) {
         throw new Error('Its not a uuid valid')
      }

      return new GuidVO({ value: guid })
   }

   get value(): string {
      return this.props.value
   }
}
