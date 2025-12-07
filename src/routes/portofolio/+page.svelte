<script>
  import { name } from '$lib/info.js'
</script>

<svelte:head>
  <title>{name} | Coming Soon</title>
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4860979088998905"
    crossorigin="anonymous"
  ></script>
</svelte:head>

<div class="coming-soon-container">
  <h1 class="title">🚧 Coming Soon</h1>
  <p class="subtitle">We're working on something awesome. Stay tuned!</p>
  <p class="eta">📅 Estimated Launch: September 2025</p>

  <a href="/" class="back-link">← Back to Home</a>
</div>

<style>
  .coming-soon-container {
    max-width: 600px;
    margin: 5rem auto;
    text-align: center;
    font-family: system-ui, sans-serif;
    padding: 1rem;
  }

  .title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.25rem;
    color: #666;
    margin-bottom: 0.5rem;
  }

  .eta {
    font-size: 1rem;
    color: #999;
    margin-bottom: 2rem;
  }

  .back-link {
    text-decoration: none;
    color: #0d9488;
    font-weight: 600;
  }

  .back-link:hover {
    text-decoration: underline;
  }
</style>
