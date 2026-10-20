<template>
  <main>
    <section
      class="relative flex min-h-[25rem] items-center justify-center overflow-hidden px-5 py-20 md:min-h-[34rem]">
      <img class="absolute inset-0 h-full w-full object-cover object-top" src="../assets/pic/home-bg-6.jpg"
        :alt="t('database.heroAlt')" />
      <div class="absolute inset-0 bg-slate-950/20" aria-hidden="true" />

      <div class="relative z-10 w-full max-w-2xl text-center text-white">
        <p class="text-sm font-medium tracking-wide text-white/85">{{ t('home.title') }}</p>
        <h1 class="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">{{ t('database.title') }}</h1>
        <RouterLink to="/search"
          class="mt-7 inline-flex min-w-44 items-center justify-center gap-3 bg-cyan-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-cyan-700">
          {{ t('database.browse') }} <span aria-hidden="true">&rarr;</span>
        </RouterLink>
      </div>
    </section>

    <section class="bg-white px-6 py-14 md:px-12 md:py-20">
      <div class="mx-auto max-w-4xl">
        <article>
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800">{{ t('database.academicLabel') }}
          </p>
          <h2 class="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">{{
            t('database.academicTitle') }}</h2>
          <p class="mt-6 text-base leading-8 text-slate-700">{{ t('database.academicText') }}</p>
        </article>

        <article class="mt-12 border-t border-slate-200 pt-8">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800">{{ t('database.coverageTitle') }}
          </p>
          <p class="mt-4 text-base leading-8 text-slate-700">
            {{ t('database.datasetPrefix') }}
            <span class="font-semibold tabular-nums text-slate-900">{{ records.length }}</span>
            {{ t('database.datasetMiddle') }}
            <span class="font-semibold tabular-nums text-slate-900">{{ sourceCount }}</span>
            {{ t('database.datasetSuffix') }}
          </p>

          <p class="mt-5 leading-7 text-slate-700"><span class="font-medium text-slate-900">{{ t('database.solid') }} —
            </span>{{ t('database.solidValue') }}</p>
          <p class="mt-2 leading-7 text-slate-700"><span class="font-medium text-slate-900">{{ t('database.fluid') }} —
            </span>{{ t('database.fluidValue') }}</p>
          <p class="mt-2 leading-7 text-slate-700"><span class="font-medium text-slate-900">{{ t('database.experiment')
              }} — </span>{{ temperatureRange }} °C, {{ pressureRange }} MPa</p>
          <p class="mt-2 leading-7 text-slate-700"><span class="font-medium text-slate-900">{{
            t('database.measurementsTitle') }} — </span>{{ t('database.advancingAngle') }} {{ advancingRange }}°; {{
                t('database.recedingAngle') }} {{ recedingRange }}°</p>

          <RouterLink to="/search"
            class="mt-7 inline-flex items-center gap-2 text-sm font-medium text-cyan-800 hover:text-cyan-600">
            {{ t('database.browse') }} <span aria-hidden="true">&rarr;</span>
          </RouterLink>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import dataset from '../../data/contact-angle-data.json'
import type { ContactAngleRecord } from '../types/contactAngle'

const { t } = useI18n()
const records = dataset.data as ContactAngleRecord[]
const sourceCount = new Set(records.map((record) => record.reference).filter((reference) => reference !== null)).size
const range = (values: number[]) => `${Math.min(...values)}–${Math.max(...values)}`
const temperatureRange = computed(() => range(records.map((record) => record.temperature_C)))
const pressureRange = computed(() => range(records.map((record) => record.pressure_MPa)))
const advancingRange = computed(() => range(records.map((record) => record.advancing_contact_angle_deg)))
const recedingRange = computed(() => range(records.map((record) => record.receding_contact_angle_deg)))
</script>
