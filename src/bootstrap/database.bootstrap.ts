import { Bootstrap } from './class.bootstrap'
import { DataSource } from 'typeorm'
import { AppService } from './services/app.services'
import { DB_CONFIG } from './interfaces/dbConfig.interface'
// import { UserEntity } from '../modules/user/infraestructure/user.entity'

let appDataSource: DataSource

export default class extends Bootstrap {
   initialize(): Promise<DataSource> {
      // const dbConfig= AppService.DBConfig
      const dbConfig: DB_CONFIG = AppService.DBConfig

      const AppDataSource = new DataSource({
         type: 'mysql',
         ...dbConfig,
      })

      appDataSource = AppDataSource

      return AppDataSource.initialize()
   }

   // Cuando se define un método como static, este se puede llamar sin tener que implementar una instancia.
   // Cuando se define un método como tipo get (getter) este se puede invocar sin los paréntesis, ésto se puede definir de esta manera siempre y cuando el método no reciba parámetros.
   static get dataSource(): DataSource {
      return appDataSource
   }
}
