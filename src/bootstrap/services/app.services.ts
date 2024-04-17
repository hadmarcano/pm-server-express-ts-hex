// import { UserEntity } from '../../modules/user/infraestructure/user.entity'
import { DB_CONFIG } from '../interfaces/dbConfig.interface'

export class AppService {
   static get PORT(): number {
      return +process.env.PORT || 3000
      // return Number(process.env.PORT) || 3000
   }

   static get DBConfig(): DB_CONFIG {
      return {
         host: process.env.DB_HOST || 'localhost',
         port: +process.env.DB_PORT || 3310,
         username: process.env.DB_USER || 'user',
         password: process.env.DB_PASS || 'password',
         database: process.env.DB_NAME || 'prueba',
         // For DEV:
         entities: [process.env.DB_ENTITIES || 'src/**/*.entity{.ts,.js}'],
         // For PROD:
         // entities: [process.env.DB_ENTITIES || 'dist/**/*.entity.js'],
         synchronize: process.env.DB_SYNC === 'true' ? true : true,
         logging: process.env.DB_LOGG === 'true' ? true : false,
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
