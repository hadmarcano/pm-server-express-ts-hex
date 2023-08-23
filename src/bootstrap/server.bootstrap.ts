import http from 'http'
import { Application } from 'express'
import { Bootstrap } from './class.bootstrap'
import { AppService } from './services/app.services'

export default class extends Bootstrap {
   constructor(private readonly app: Application) {
      super()
   }

   initialize() {
      return new Promise<string | Error>((resolve, reject) => {
         const server = http.createServer(this.app)

         server
            .listen(3000)
            .on('listening', () => {
               resolve('Server started successfully')
               console.log(`Server listening on port ${AppService.PORT}`)
            })
            .on('error', error => {
               reject(error)
               console.log(`Error on port ${AppService.PORT}`)
            })
      })
   }
}
