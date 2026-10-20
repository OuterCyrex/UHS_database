<template>
  <footer class="bg-slate-950 px-6 py-10 text-slate-300 md:px-12">
    <div class="mx-auto max-w-6xl">
      <div class="grid gap-8 border-b border-white/15 pb-8 md:grid-cols-[minmax(16rem,1fr)_minmax(0,1.2fr)] md:gap-16">
        <div>
          <div class="flex items-center gap-4">
            <img :src="cupLogo" :alt="t('footer.logoAlt')" class="h-12 w-auto object-contain" />
            <div>
              <p class="text-sm font-semibold tracking-wide text-white">{{ t('home.title') }}</p>
            </div>
          </div>
          <p class="mt-5 max-w-sm text-sm leading-6 text-slate-400">{{ t('footer.description') }}</p>
        </div>

        <dl class="grid gap-6 sm:grid-cols-2">
          <div>
            <dt class="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{{ t('footer.address') }}</dt>
            <dd class="mt-2 text-sm leading-6 text-slate-200">{{ t('footer.addressValue') }}</dd>
            <dt class="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{{ t('footer.postalCode') }}</dt>
            <dd class="mt-1 text-sm text-slate-200">102249</dd>
          </div>
          <div>
            <dt class="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{{ t('footer.administratorEmail') }}</dt>
            <dd class="mt-2 text-sm">
              <a class="text-slate-200 underline decoration-white/30 underline-offset-4 transition hover:text-white" href="mailto:baoxingwangbxw@qq.com">
                baoxingwangbxw@qq.com
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import cupLogo from '@/assets/pic/cup.png'

const { t } = useI18n()
</script>
