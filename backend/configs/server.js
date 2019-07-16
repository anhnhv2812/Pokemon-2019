const config = {
  port: process.env.PORT || 2200,
  connectionString: process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/pokemon?connectTimeoutMS=10000&3t.uriVersion=3',
  passwordPolicy: /(?=.{3,}$)/,
  passwordSecret: process.env.PASSWORD_SECRET || 'udBsSEQHw2Qg1AObfUj5nVk2CjfBkmby',
  tokenSecret: process.env.TOKEN_SECRET || 'fw2dSEO1AObbQHQgb2CjfB1Bkymuw2QgsA'
}

module.exports = config;