<template>
  <section class="hero relative isolate h-[60vh] min-h-[360px] overflow-hidden">
    <div class="hero-background absolute inset-0" aria-hidden="true" />
    <div class="hero-grid absolute inset-0" aria-hidden="true" />
    <div class="hero-orb hero-orb-blue absolute" aria-hidden="true" />
    <div class="hero-orb hero-orb-orange absolute" aria-hidden="true" />
  </section>

  <div class="h-screen"></div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.hero-background {
  background:
    radial-gradient(circle at 78% 18%, rgba(125, 211, 252, 0.48), transparent 28%),
    radial-gradient(circle at 18% 82%, rgba(196, 181, 253, 0.48), transparent 32%),
    linear-gradient(132deg, #f8fafc 0%, #e0f2fe 42%, #ede9fe 70%, #ffedd5 135%);
}

.hero-grid {
  background-image: linear-gradient(rgba(71, 85, 105, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71, 85, 105, 0.1) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent 78%);
  opacity: 0.5;
}

.hero-orb {
  border-radius: 9999px;
  filter: blur(90px);
  height: 22rem;
  pointer-events: none;
  width: 22rem;
}

.hero-orb-blue {
  background: rgba(56, 189, 248, 0.38);
  left: -9rem;
  top: 16%;
}

.hero-orb-orange {
  background: rgba(251, 191, 36, 0.32);
  bottom: -8rem;
  right: -6rem;
}
</style>
