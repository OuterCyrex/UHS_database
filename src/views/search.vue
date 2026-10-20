<template>
  <div class="min-h-screen bg-slate-50 px-5 pb-16 pt-28 md:px-10">
    <div class="mx-auto max-w-7xl">
      <header class="mb-10 border-b border-slate-200 pb-6">
        <h1 class="font-semibold tracking-tight text-cyan-800 md:text-4xl mb-2">{{ t('search.parameterIndex.title') }}</h1>
        <p class="text-xl font-semibold tracking-tight text-slate-700">{{ t('search.parameterIndex.description') }}</p>
      </header>

      <div class="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
        <section v-for="group in parameterGroups" :key="group.key" class="min-w-0">
          <div class="mb-4 border-b-2 border-slate-800 pb-3">
            <p class="mb-1 font-mono text-xs text-slate-400">{{ group.number }}</p>
            <h2 class="text-xl font-semibold text-slate-900">{{ t(`search.parameterIndex.groups.${group.key}`) }}</h2>
          </div>
          <ul class="divide-y divide-slate-200">
            <li v-for="parameter in group.parameters" :key="parameter.key">
              <button
                type="button"
                class="group flex w-full items-center justify-between gap-3 py-4 text-left transition-colors hover:text-cyan-800"
                @click="goToConditions(group.key, parameter.key)"
              >
                <span>
                  <span class="block text-sm font-medium text-slate-800 group-hover:text-cyan-800">{{ t(`search.parameterIndex.parameters.${parameter.key}.name`) }}</span>
                  <span v-if="parameter.notation" class="mt-1 block font-mono text-xs text-slate-500">{{ parameter.notation }}</span>
                </span>
                <span class="shrink-0 text-xs text-cyan-800 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{{ t('search.parameterIndex.select') }} →</span>
              </button>
            </li>
          </ul>
        </section>
      </div>

      <div class="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-end">
        <RouterLink to="/search/conditions" class="w-fit border-b border-slate-400 pb-1 font-medium text-slate-700 hover:border-cyan-800 hover:text-cyan-800">
          {{ t('search.parameterIndex.browseAll') }} →
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const parameterGroups = computed(() => [
  {
    key: 'solid', number: '01', parameters: [
      { key: 'absolutePermeability', notation: 'kₐ' },
      { key: 'effectivePorosity', notation: 'Pₑff' },
      { key: 'effectiveStress', notation: 'σ′' },
    ],
  },
  {
    key: 'fluid', number: '02', parameters: [
      { key: 'density', notation: 'ρ' },
      { key: 'viscosity', notation: 'μ' },
      { key: 'fluidFluidInterfacialTension', notation: 'γFF' },
      { key: 'solubility', notation: '' },
      { key: 'diffusivity', notation: 'D' },
    ],
  },
  {
    key: 'interaction', number: '03', parameters: [
      { key: 'wettability', notation: 'θ' },
      { key: 'solidFluidInterfacialTension', notation: 'γSF' },
      { key: 'capillaryPressure', notation: 'Pₑ' },
      { key: 'relativePermeability', notation: 'kᵣ' },
      { key: 'mobilityRatio', notation: 'M' },
      { key: 'saturation', notation: 'S' },
      { key: 'adsorptionDesorption', notation: '' },
      { key: 'chemicalReactions', notation: '' },
      { key: 'biologyBacteria', notation: '' },
    ],
  },
])

const goToConditions = (category: string, parameter: string) => {
  router.push({ name: 'SearchConditions', query: { category, parameter } })
}
</script>
