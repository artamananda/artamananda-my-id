<script>
  import { onMount, onDestroy } from 'svelte'
  import { name } from '$lib/info.js'

  let cpuLoad = 0
  let memoryUsage = 0
  let cpuTemp = 0

  let interval

  async function fetchData() {
    try {
      const res = await fetch('/api/usage')
      const json = await res.json()

      if (json?.payload) {
        cpuLoad = parseInt(json.payload.cpu_load)
        memoryUsage = parseInt(json.payload.memory_usage)
        cpuTemp = parseInt(json.payload.cpu_temperature.split('°')[0])
      }
    } catch (error) {
      console.error('Gagal fetch data:', error)
    }
  }

  onMount(() => {
    fetchData()
    interval = setInterval(fetchData, 1000)
  })

  onDestroy(() => {
    clearInterval(interval)
  })

  function getColor(value) {
    if (value < 25) return '#4caf50' // hijau
    if (value < 50) return '#8bc34a' // hijau muda
    if (value < 75) return '#ff9800' // oranye
    return '#f44336' // merah
  }
</script>

<svelte:head>
  <title>{name} | Server Monitoring</title>
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4860979088998905"
    crossorigin="anonymous"
  ></script>
</svelte:head>

<div class="info-box">
  <h1 class="text-2xl font-bold mb-2">{`Arta's Server Monitoring 🖥️ `}</h1>
  <h4 class="text-sm font-semibold mb-8">
    {`My Home Server — 📍 Gunung Gajah, Lahat, South Sumatera, 🇮🇩 Indonesia`}
  </h4>
  <div class="info-box-item">
    <div class="label">{`CPU Load: ${cpuLoad}% of (ARM64 Quad-Core @ 1.5GHz)`}</div>
    <div class="bar-container">
      <div class="bar" style="width: {cpuLoad}%; background-color: {getColor(cpuLoad)};">
        {cpuLoad}%
      </div>
    </div>
  </div>

  <div class="info-box-item">
    <div class="label">{`Memory Usage: ${memoryUsage}% of (924MiB)`}</div>
    <div class="bar-container">
      <div class="bar" style="width: {memoryUsage}%; background-color: {getColor(memoryUsage)};">
        {memoryUsage}%
      </div>
    </div>
  </div>

  <div class="info-box-item">
    <div class="label">CPU Temperature: {cpuTemp + '°C'}</div>
    <div class="bar-container">
      <div class="bar" style="width: {cpuTemp}%; background-color: {getColor(cpuTemp)};">
        {cpuTemp + '°C'}
      </div>
    </div>
  </div>

  <div class="text-center text-sm text-zinc-500 mt-10">
    See another server's monitoring? <a
      href="https://uptime.artamananda.my.id/status/arta-prod"
      target="_blank"
      class="font-semibold text-teal-500 dark:text-teal-400"
      rel="noopener noreferrer">Click here</a
    >
  </div>
</div>

<style>
  .bar-container {
    background-color: #eee;
    width: 100%;
    height: 24px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  .bar {
    height: 100%;
    transition: width 0.3s ease;
    text-align: right;
    color: black;
    padding-right: 8px;
    line-height: 24px;
    font-weight: bold;
    border-radius: 12px 0 0 12px;
  }

  .label {
    margin-bottom: 0.25rem;
    font-weight: 500;
  }

  .info-box {
    max-width: 100%;
    margin: 2rem auto;
    font-family: system-ui, sans-serif;
  }

  .info-box-item {
    margin-bottom: 2rem;
  }
</style>
