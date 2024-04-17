// Técnicamente, las entidades se definen en la capa de infraestructura, estas interactúan con elementos externos o puertos externos a la aplicación.

// Todo lo que interacúe con algún elemento externo va en la capa de infraestructura. En este caso se interactúa con un elemento externo como lo es la bbdd mediante un intermediario que viene siendo el ORM.

import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('users')
export class UserEntity {
   @PrimaryColumn()
   guid: string

   @Column({ type: 'varchar', length: 100 })
   name: string

   @Column({ type: 'varchar', length: 100 })
   lastname: string

   @Column({ type: 'varchar', length: 100 })
   email: string

   @Column({ type: 'varchar', length: 100 })
   password: string

   @Column({ type: 'varchar', length: 100 })
   refreshToken: string

   @Column({ type: 'boolean', default: true })
   active: boolean
}
