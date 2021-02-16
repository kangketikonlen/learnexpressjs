module.exports = {
  apps: [{
    script: 'index.js',
    watch: '.',
    env: {
      "NODE_ENV": "development",
    },
    env_production: {
      "NODE_ENV": "production"
    },
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
    time: true
  }],

  deploy: {
    production: {
      user: 'akasakaryu',
      host: '151.106.113.4',
      ref: 'origin/main',
      repo: 'https://github.com/fathtech/aretha-api',
      path: '~/',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};