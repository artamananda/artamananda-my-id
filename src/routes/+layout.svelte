<script>
  import '../app.css'
  import '../prism.css'
  import { MoonIcon, SunIcon } from 'heroicons-svelte/24/solid'
  import { browser } from '$app/environment'
  import { name } from '$lib/info'
  import { page } from '$app/stores'

  let isDarkMode = browser ? Boolean(document.documentElement.classList.contains('dark')) : true

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  let year = new Date().getFullYear()
</script>

<div class="flex flex-col min-h-screen">
  <div class="flex flex-col flex-grow w-full px-4 py-2">
    <header class="flex items-center justify-between w-full max-w-2xl py-4 mx-auto lg:pb-8">
      <a href="/">
        <div class="shiny-wrapper flex">
          <img
            src="/favicon.png"
            alt="Arta's Blog Logo"
            class="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
          />
          <div
            class="shiny-text text-lg font-bold sm:text-2xl !text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600 dark:to-teal-400"
          >
            {name.slice(1)}
          </div>
        </div>
      </a>

      <button
        type="button"
        role="switch"
        aria-label="Toggle Dark Mode"
        aria-checked={isDarkMode}
        class="w-5 h-5 sm:h-8 sm:w-8 sm:p-1"
        on:click={() => {
          isDarkMode = !isDarkMode
          localStorage.setItem('isDarkMode', isDarkMode.toString())

          disableTransitionsTemporarily()

          if (isDarkMode) {
            document.querySelector('html').classList.add('dark')
          } else {
            document.querySelector('html').classList.remove('dark')
          }
        }}
      >
        <MoonIcon class="hidden text-zinc-500 dark:block" />
        <SunIcon class="block text-zinc-400 dark:hidden" />
      </button>
    </header>
    <main
      class="flex flex-col flex-grow w-full mx-auto"
      class:max-w-2xl={!$page.data.layout?.fullWidth}
    >
      <slot />
    </main>
    <footer>
      <div class="text-center w-full max-w-2xl py-4 mx-auto text-xs text-zinc-500">
        <span
          >{`Made with Svelte + Vite © ${year} Arta's Blog v${
            import.meta.env.VITE_APP_VERSION
          } Self Hosted with `}
        </span>
        <a class="font-semibold text-teal-500 dark:text-teal-400" href="/server-monitoring">
          Indihome & Armbian ❤️
        </a>
      </div>
    </footer>
  </div>
</div>

<style>
  @keyframes shimmer-wrapper {
    0% {
      filter: brightness(1);
    }
    50% {
      filter: brightness(1.6) saturate(1.3);
    }
    100% {
      filter: brightness(1);
    }
  }

  .shiny-wrapper {
    animation: shimmer-wrapper 5s ease-in-out infinite;
  }
</style>
