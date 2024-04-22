// import { UserEntity } from '../../modules/user/infraestructure/user.entity'
import { DB_CONFIG } from '../interfaces/dbConfig.interface'
import yenv from 'yenv'

const env = yenv('.env')

export class AppService {
   static get PORT(): number {
      return +env.PORT || 3000
      // If not use yenv, you can do this:
      // return +process.env.PORT || 3000

   }

   static get DBConfig(): DB_CONFIG {
      return {
         host: env.DB_HOST || 'localhost',
         port: +env.DB_PORT || 3310,
         username: env.DB_USER || 'user',
         password: env.DB_PASS || 'password',
         database: env.DB_NAME || 'prueba',
         // For DEV:
         // entities: [process.env.DB_ENTITIES || 'src/**/*.entity{.ts,.js}'],
         // For PROD:
         entities: [env.DB_ENTITIES || 'dist/**/*.entity.js'],
         synchronize: env.DB_SYNC === 'true' ? true : true,
         logging: env.DB_LOGG === 'true' ? true : false,
      }
   }
}

// For DEV:
// 1 - use this line
//  entities: [process.env.DB_ENTITIES || 'src/**/*.entity{.ts,.js}'],
// 2 - npm run dev

// For PROD:
// 1 - use this line
// entities: [process.env.DB_ENTITIES || 'dist/**/*.entity.js'],
// 2 - npm run build
// 3 - npm run prod

// For create DOCKER IMAGE:
// 1 - run this comand from comand line:
// docker build -t app-node-express:1.0.0 .
