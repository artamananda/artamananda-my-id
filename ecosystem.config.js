module.exports = {
  apps: [
    {
      name: 'artamananda-my-id',
      script: 'node build/index.js',
      watch: false,
      exp_backoff_restart_delay: 100,
    }
  ]
}
