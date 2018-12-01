exports.dbConfig = {
  connectionLimit: 10,
  user: 'adminultimate',
  password: 'sPY6q)98DQ$SYL(QExQzIg!1',
  server: 'csgoultimatedatabase.database.windows.net',
  database: 'csgoultimate',
  options: {
    encrypt: true 
  },
  pool: {
    max: 4,
    min: 0,
    idleTimeoutMillis: 30000
  }
}


exports.authTokenSuperSecret = 'VeRySeCuRe'
exports.authTokenExpiresIn = 86400

// exports.webPort = 3000; 