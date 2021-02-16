require('dotenv').config()

module.exports = {
  apps: [{
    name: "Express Environment",
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
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_HOST,
      port: process.env.DEPLOY_PORT,
      key: '~/.ssh/deploy.key',
      ref: 'origin/main',
      repo: 'git@github.com:kangketikonlen/express-env.git',
      path: '/home/akasakaryu/Projects/Express-ENV',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
