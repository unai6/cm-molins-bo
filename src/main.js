import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import { definePreset, palette } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// https://v4.primevue.org/theming/styled/#architecture
const StylePreset = definePreset(Aura, {
  primitive: {
    cartera: palette('#014CB1'), // Define "cartera" color palette as a primitive tokens.
  },
  semantic: {
    primary: {
      50: '{cartera.50}',
      100: '{cartera.100}',
      200: '{cartera.200}',
      300: '{cartera.300}',
      400: '{cartera.400}',
      500: '{cartera.500}',
      600: '{cartera.600}',
      700: '{cartera.700}',
      800: '{cartera.800}',
      900: '{cartera.900}',
      950: '{cartera.950}',
    },
  },
  components: {
    tabs: {
      tablist: {
        background: 'transparent',
      },
      tabpanel: {
        background: 'transparent',
      },
    },
    card: {
      root: {
        shadow: 'none',
      },
    },
    datatable: {
      paginatorBottom: {
        borderWidth: '0px',
      },
    },
    paginator: {
      root: {
        padding: '1rem 1rem 0rem',
      },
    },
  },
})

app.use(PrimeVue, {
  theme: {
    preset: StylePreset,
    options: {
      // Disable dark mode until LTS version is released and better theme tokens for dark mode toggling become available.
      darkModeSelector: '',
    },
  },
  ripple: false,
})



router.isReady().then(() => app.mount('#app')).catch(e => console.error(e))
