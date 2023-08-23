import { DataSource } from 'typeorm'

// Se abstrae esta clase para poder heredar de esta y poder inizializar algun proceso. En este caso poder inicializar tanto el servidor como la base de datos.
export abstract class Bootstrap {
   abstract initialize(): Promise<string | Error | DataSource>
}
