<script>
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'

  const GOOGLE_TRANSLATE_SCRIPT_ID = 'google-translate-script'
  const STORAGE_KEY = 'siteLanguage'
  const SUPPORTED_LANGUAGES = ['en', 'id']

  let selectedLanguage = 'en'

  function setGoogTransCookie(language) {
    const cookieValue = `/auto/${language}`
    document.cookie = `googtrans=${cookieValue};path=/`

    const hostname = window.location.hostname
    if (hostname.includes('.')) {
      document.cookie = `googtrans=${cookieValue};path=/;domain=.${hostname}`
    }
  }

  function applyLanguage(language) {
    const combo = document.querySelector('.goog-te-combo')

    if (!combo) {
      return false
    }

    combo.value = language
    combo.dispatchEvent(new Event('change'))
    return true
  }

  function ensureGoogleTranslateLoaded() {
    if (!browser || document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) {
      return
    }

    window.googleTranslateElementInit = () => {
      // Keep Google widget hidden; we only use it as translation engine.
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: SUPPORTED_LANGUAGES.join(','),
          autoDisplay: false
        },
        'google_translate_element'
      )

      const language = localStorage.getItem(STORAGE_KEY) || 'en'
      setGoogTransCookie(language)
      window.setTimeout(() => {
        applyLanguage(language)
      }, 200)
    }

    const script = document.createElement('script')
    script.id = GOOGLE_TRANSLATE_SCRIPT_ID
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)
  }

  function changeLanguage(language) {
    if (!browser || !SUPPORTED_LANGUAGES.includes(language)) {
      return
    }

    selectedLanguage = language
    localStorage.setItem(STORAGE_KEY, language)
    setGoogTransCookie(language)

    if (!applyLanguage(language)) {
      // If widget is not ready yet, reload once so cookie-based translation applies.
      window.location.reload()
    }
  }

  onMount(() => {
    if (!browser) {
      return
    }

    const savedLanguage = localStorage.getItem(STORAGE_KEY)
    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      selectedLanguage = savedLanguage
    }

    setGoogTransCookie(selectedLanguage)
    ensureGoogleTranslateLoaded()
  })
</script>

<div class="notranslate flex items-center rounded-full border border-zinc-200 dark:border-zinc-700 p-0.5">
  <button
    type="button"
    class="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold transition"
    class:bg-teal-500={selectedLanguage === 'en'}
    class:text-white={selectedLanguage === 'en'}
    class:text-zinc-600={selectedLanguage !== 'en'}
    class:dark:text-zinc-300={selectedLanguage !== 'en'}
    on:click={() => changeLanguage('en')}
    aria-label="Switch language to English"
  >
    <span aria-hidden="true">🇬🇧</span>
    <span>ENG</span>
  </button>

  <button
    type="button"
    class="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold transition"
    class:bg-teal-500={selectedLanguage === 'id'}
    class:text-white={selectedLanguage === 'id'}
    class:text-zinc-600={selectedLanguage !== 'id'}
    class:dark:text-zinc-300={selectedLanguage !== 'id'}
    on:click={() => changeLanguage('id')}
    aria-label="Switch language to Indonesian"
  >
    <span aria-hidden="true">🇮🇩</span>
    <span>ID</span>
  </button>
</div>

<div id="google_translate_element" class="hidden"></div>
