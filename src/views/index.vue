<template>
  <main>
    <section class="relative flex min-h-[25rem] items-center justify-center overflow-hidden px-5 py-20 md:min-h-[34rem]">
      <img
        class="absolute inset-0 h-full w-full object-cover object-top"
        src="../assets/pic/home-bg-6.jpg"
        :alt="t('database.heroAlt')"
      />
      <div class="absolute inset-0 bg-slate-950/20" aria-hidden="true" />

      <div class="relative z-10 w-full max-w-2xl text-center text-white">
        <p class="text-sm font-medium tracking-wide text-white/85">{{ t('home.title') }}</p>
        <h1 class="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">{{ t('database.title') }}</h1>
        <RouterLink
          to="/search"
          class="mt-7 inline-flex min-w-44 items-center justify-center gap-3 bg-cyan-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-cyan-700"
        >
          {{ t('database.searchData') }} <span aria-hidden="true">&rarr;</span>
        </RouterLink>
      </div>
    </section>

    <section class="bg-white px-6 py-14 text-slate-900 md:px-12 md:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="border-b border-slate-300 pb-10 md:pb-14">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800">{{ t('database.aboutLabel') }}</p>
          <h2 class="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-tight md:text-4xl">{{ t('database.aboutTitle') }}</h2>
          <p class="mt-6 max-w-3xl text-base leading-8 text-slate-700 md:text-lg">{{ t('database.aboutText') }}</p>
          <RouterLink to="/search" class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-900 hover:text-cyan-700">
            {{ t('database.searchData') }} <span aria-hidden="true">&rarr;</span>
          </RouterLink>
        </div>

        <dl class="grid grid-cols-1 gap-x-6 border-b border-slate-300 sm:grid-cols-3">
          <div class="flex flex-col-reverse py-6 sm:py-8">
            <dt class="mt-2 text-sm text-slate-600">{{ t('database.stats.records') }}</dt>
            <dd class="text-4xl font-medium tabular-nums tracking-tight md:text-5xl text-cyan-600">{{ records.length }}</dd>
          </div>
          <div class="flex flex-col-reverse py-6 sm:py-8">
            <dt class="mt-2 text-sm text-slate-600">{{ t('database.stats.dois') }}</dt>
            <dd class="text-4xl font-medium tabular-nums tracking-tight md:text-5xl text-cyan-600">0</dd>
          </div>
          <div class="flex flex-col-reverse py-6 sm:py-8">
            <dt class="mt-2 text-sm text-slate-600">{{ t('database.stats.contributors') }}</dt>
            <dd class="text-4xl font-medium tabular-nums tracking-tight md:text-5xl text-cyan-600">0</dd>
          </div>
        </dl>

        <section class="pt-10 md:pt-14">
          <header class="pb-2">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800">{{ t('database.recentEyebrow') }}</p>
            <h2 class="mt-3 text-2xl font-medium leading-snug tracking-tight md:text-3xl">{{ t('database.recentTitle') }}</h2>
          </header>

          <div class="mt-6 grid grid-cols-1 gap-4">
            <article
              v-for="item in recentUploads"
              :key="item.doi"
              class="grid grid-cols-1 gap-5 rounded-md bg-white p-5 shadow-sm ring-1 ring-slate-300 transition-shadow hover:shadow-md md:grid-cols-[minmax(14rem,1fr)_minmax(0,2fr)] md:items-center md:gap-8"
            >
              <div>
                <p class="text-xs tracking-wide text-slate-500">{{ t('database.recentFields.uploadedAt') }} · {{ item.uploadedAt }}</p>
                <h3 class="mt-2 text-base font-medium leading-6 text-cyan-700">{{ item.title }}</h3>
              </div>
              <dl class="grid grid-cols-1 gap-4 border-t border-slate-200 pt-4 sm:grid-cols-3 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                <div class="min-w-0">
                  <dt class="text-xs text-slate-500">{{ t('database.recentFields.doi') }}</dt>
                  <dd class="mt-1 break-all font-mono text-xs leading-5 text-cyan-900">{{ item.doi }}</dd>
                </div>
                <div class="min-w-0">
                  <dt class="text-xs text-slate-500">{{ t('database.recentFields.contributors') }}</dt>
                  <dd class="mt-1 text-sm leading-5 text-slate-700">{{ item.contributors }}</dd>
                </div>
                <div>
                  <dt class="text-xs text-slate-500">{{ t('database.recentFields.dataVolume') }}</dt>
                  <dd class="mt-1 text-sm font-semibold tabular-nums text-slate-900">{{ item.records }} {{ t('database.recentFields.recordsUnit') }}</dd>
                </div>
              </dl>
            </article>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import dataset from '../../data/contact-angle-data.json'
import type { ContactAngleRecord } from '../types/contactAngle'

const { t } = useI18n()
const records = dataset.data as ContactAngleRecord[]
const recentUploads = [
  { uploadedAt: '2026-10-16', title: 'Pore-scale wettability of sandstone during underground hydrogen storage', doi: '10.0000/uhs.2026.041', contributors: 'Y. Liu · M. Zhang · H. Chen', records: 128 },
  { uploadedAt: '2026-10-12', title: 'Hydrogen–brine interfacial behavior in saline porous media', doi: '10.0000/uhs.2026.038', contributors: 'Q. Wang · L. Xu', records: 86 },
  { uploadedAt: '2026-10-09', title: 'Contact-angle response of carbonate rocks under reservoir conditions', doi: '10.0000/uhs.2026.035', contributors: 'J. Zhao · X. Sun · R. Ma', records: 214 },
  { uploadedAt: '2026-10-04', title: 'Influence of brine salinity on hydrogen wettability in sandstone', doi: '10.0000/uhs.2026.031', contributors: 'W. Li · C. Zhou', records: 96 },
  { uploadedAt: '2026-09-28', title: 'Temperature-dependent wettability in hydrogen–brine–rock systems', doi: '10.0000/uhs.2026.027', contributors: 'F. Gao · Y. Lin · T. He', records: 147 },
  { uploadedAt: '2026-09-21', title: 'Hydrogen–brine–oil interactions in water-wet porous media', doi: '10.0000/uhs.2026.022', contributors: 'P. Sun · D. Luo', records: 72 },
]
</script>
