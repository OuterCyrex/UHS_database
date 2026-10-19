<template>
  <img class="hero relative isolate h-[60vh] min-h-90 w-full overflow-hidden object-cover"
    src="../assets/pic/home-bg-3.jpg" />

  <section class="overview relative overflow-hidden bg-white px-6 py-12 md:px-12 md:py-28">

    <article class="relative mx-auto max-w-5xl">
      <h2 class="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
        {{ t('home.overview.title') }}
      </h2>

      <div class="my-10 h-px bg-linear-to-r from-cyan-200 via-slate-200 to-transparent" aria-hidden="true" />

      <p class="max-w-4xl text-base leading-8 text-slate-600 md:text-lg md:leading-9">
        {{ t('home.overview.description') }}
      </p>
    </article>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped></style>
