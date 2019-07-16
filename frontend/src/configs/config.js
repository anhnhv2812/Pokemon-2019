const Config = {
  serverUrl: process.env.SERVER_URL || 'http://localhost:2200',
  defaultApiMountPath: process.env.DEFAULT_API_ROUTE || '/v1',
}

export default Config;