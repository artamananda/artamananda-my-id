<script>
  import { page } from '$app/stores'
</script>

<svelte:head>
  <title>404 - Page Not Found</title>
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4860979088998905"
    crossorigin="anonymous"
  ></script>
</svelte:head>

<div class="not-found-container">
  <h1 class="title">404 Not Found</h1>
  <p class="message">Oops! The page "<strong>{$page.url.pathname}</strong>" doesn't exist.</p>
  <a class="back-link" href="/">← Back to Home</a>
</div>

<style>
  .not-found-container {
    max-width: 600px;
    margin: 5rem auto;
    text-align: center;
    font-family: system-ui, sans-serif;
    padding: 1rem;
  }

  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .message {
    font-size: 1.25rem;
    color: #666;
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
