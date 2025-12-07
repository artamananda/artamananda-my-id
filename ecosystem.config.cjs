module.exports = {
  apps: [
    {
      name: 'artamananda-my-id',
      script: 'node',
      args: 'build/index.js',
      watch: false,
      exp_backoff_restart_delay: 100
    }
  ]
}
