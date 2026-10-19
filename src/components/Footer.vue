<template>
  <footer class="bg-black px-6 py-8 text-slate-300 md:px-12">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 border-t border-white/15 pt-6 text-sm md:flex-row md:items-center md:justify-between">
      <div class="flex items-center gap-4">
        <img :src="cupLogo" alt="China University of Petroleum logo" class="h-10 w-auto object-contain" />
        <div>
          <div class="font-medium tracking-wide text-white">UHS DATA REPOSITORY</div>
          <div class="mt-1 text-xs text-slate-400">{{ t('footer.description') }}</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import cupLogo from '@/assets/pic/cup.png'

const { t } = useI18n()
</script>
