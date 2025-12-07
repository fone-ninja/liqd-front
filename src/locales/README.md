# Locales

This folder contains translations used by `vue-i18n`.

Files:

- `en.json` — English translations
- `es.json` — Spanish translations

How to add translations:

1. Add keys to both `en.json` and `es.json` (keep the same key structure).
2. Use the key in components with the `t()` function from `useI18n()` or with `$t('key')` in templates.

Example in `script setup`:

```ts
import { useI18n } from "vue-i18n";
const { t } = useI18n();
// in template: {{ t('home.title') }}
```

Install dependency (if not already installed):

```bash
# with npm
npm install vue-i18n@9

# or pnpm
pnpm add vue-i18n@9
```

The app is configured in `src/main.ts` and a simple language selector was added to `Header.vue` to switch between `en` and `es`.
