import { Bootstrap } from './bootstrap/class.bootstrap'
import ServerBootstrap from './bootstrap/server.bootstrap'
import DatabaseBootstrap from './bootstrap/database.bootstrap'
import Application from './app'

const serverBootstrap: Bootstrap = new ServerBootstrap(Application)
const databaseBootstrap: Bootstrap = new DatabaseBootstrap()

;(async () => {
   try {
      // Por convención del clean code, si hay una variable/constante que no tiene utilidad, debe abreviarse, por ejemplo, el siguiente caso:
      await databaseBootstrap.initialize(); console.log('Database started successfully') // Se usará el propio logger del ORM.
      await serverBootstrap.initialize()
   } catch (error) {
      console.log(error)
   }
})()
