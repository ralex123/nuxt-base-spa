import os from 'os';

const devEnv = (os.hostname() === 'lenovo-apc')

export default {

  mariaDb : {
    host: 'localhost',
    port: (devEnv) ? 3309 : 3306,
    database: 'baseapp',
    user: (devEnv) ? 'root' : 'dbuser',
    password: (devEnv) ? 'root' : 'mariapass',
    connectionLimit: 5
  }

}
