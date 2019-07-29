import server from './server';

const commonConfig = {
  version: '3.3.0',
  appName: 'EZADMIN',
  tableDefaultLimit: 100,
};

if (process.env.NODE_ENV === 'production' && !window.__APP_CONFIG__) {
  throw new Error('Invalid app state, __APP_CONFIG__ is missing!');
}

export default (process.env.NODE_ENV !== 'production'
  ? {
      ...commonConfig,
      authServer: server.dev_auth,
    }
  : {
      ...commonConfig,
      authServer: window.__APP_CONFIG__.authServer,
      version: window.__APP_CONFIG__.version || commonConfig.version,
      tableDefaultLimit:
        window.__APP_CONFIG__.tableDefaultLimit ||
        commonConfig.tableDefaultLimit,
    });
