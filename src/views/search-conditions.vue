<template>
  <div class="min-h-screen bg-slate-50 px-5 pb-10 pt-28 md:px-10">
    <div class="mx-auto max-w-7xl">
      <header class="border-b border-slate-200 pb-6">
        <RouterLink to="/search" class="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-800">
          <el-icon class="el-icon--right">
            <ArrowLeft />
          </el-icon> {{ t('search.parameterIndex.back') }}
        </RouterLink>
        <h1 class="mt-2 text-4xl font-semibold tracking-tight text-slate-900">{{ selectedParameterName }}</h1>
        <p class="mt-3 text-sm leading-6 text-slate-600">{{ t('search.parameterIndex.conditionsTitle') }}</p>
      </header>

      <section class="py-6">
        <div>
          <details open class="group border-b border-slate-200">
            <summary class="flex cursor-pointer list-none items-center justify-between py-4 text-2xl font-semibold mb-2 [&::-webkit-details-marker]:hidden">
              <span class="flex items-center gap-3 text-cyan-700">{{ t('search.groups.solid.title') }}</span>
              <svg class="h-4 w-4 text-slate-500 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 7.5 5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </summary>
            <div class="pb-7">
            <div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <div class="sm:col-span-2 lg:col-span-3">
                <label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.rockType') }}</label>
                <el-radio-group v-model="filters.rockType" class="flex flex-wrap gap-x-5 gap-y-1">
                  <el-radio value="">{{ t('search.any') }}</el-radio>
                  <el-radio v-for="rock in rocks" :key="rock" :value="rock">{{ t(`search.rocks.${rock}`) }}</el-radio>
                </el-radio-group>
              </div>
              <div class="sm:col-span-2 lg:col-span-3">
                <label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.mineralComposition') }}</label>
                <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  <el-input v-model="filters.quartz" clearable :placeholder="t('search.minerals.quartz')"><template #append>{{ filters.compositionUnit }}</template></el-input>
                  <el-input v-model="filters.calcite" clearable :placeholder="t('search.minerals.calcite')"><template #append>{{ filters.compositionUnit }}</template></el-input>
                  <el-input v-model="filters.dolomite" clearable :placeholder="t('search.minerals.dolomite')"><template #append>{{ filters.compositionUnit }}</template></el-input>
                  <el-input v-model="filters.clay" clearable :placeholder="t('search.minerals.clay')"><template #append>{{ filters.compositionUnit }}</template></el-input>
                  <el-input v-model="filters.feldspar" clearable :placeholder="t('search.minerals.feldspar')"><template #append>{{ filters.compositionUnit }}</template></el-input>
                </div>
                <div class="mt-3 flex max-w-xs items-center gap-3"><label class="shrink-0 text-[13px] font-medium text-slate-700">{{ t('search.unitLabel') }}</label><el-select v-model="filters.compositionUnit" class="w-full"><el-option label="wt%" value="wt%" /><el-option label="vol%" value="vol%" /></el-select></div>
              </div>
              <div class="sm:col-span-2 lg:col-span-3 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">TOC</label><el-input v-model="filters.toc" clearable :placeholder="t('search.placeholders.value')"><template #append>{{ filters.tocUnit }}</template></el-input></div>
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.porosity') }}</label><el-input v-model="filters.porosity" clearable :placeholder="t('search.placeholders.value')"><template #append>{{ filters.porosityUnit }}</template></el-input></div>
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.permeability') }}</label><el-input v-model="filters.permeability" clearable :placeholder="t('search.placeholders.value')"><template #append>{{ filters.permeabilityUnit }}</template></el-input></div>
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.effectiveStress') }}</label><el-input v-model="filters.effectiveStress" clearable :placeholder="t('search.placeholders.value')"><template #append>{{ filters.stressUnit }}</template></el-input></div>
              </div>
              <div class="sm:col-span-2 lg:col-span-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.unitLabel') }} · TOC</label><el-select v-model="filters.tocUnit" class="w-full"><el-option label="wt%" value="wt%" /><el-option label="%" value="%" /></el-select></div>
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.unitLabel') }} · {{ t('search.fields.porosity') }}</label><el-select v-model="filters.porosityUnit" class="w-full"><el-option label="%" value="%" /><el-option label="fraction" value="fraction" /></el-select></div>
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.unitLabel') }} · {{ t('search.fields.permeability') }}</label><el-select v-model="filters.permeabilityUnit" class="w-full"><el-option label="mD" value="mD" /><el-option label="m²" value="m²" /></el-select></div>
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.unitLabel') }} · {{ t('search.fields.effectiveStress') }}</label><el-select v-model="filters.stressUnit" class="w-full"><el-option label="MPa" value="MPa" /><el-option label="bar" value="bar" /></el-select></div>
              </div>
            </div>
            </div>
          </details>

          <details open class="group border-b border-slate-200">
            <summary class="flex cursor-pointer list-none items-center justify-between py-4 text-2xl font-semibold text-cyan-700 mb-2 [&::-webkit-details-marker]:hidden">
              <span class="flex items-center gap-3">{{ t('search.groups.fluid.title') }}</span>
              <svg class="h-4 w-4 text-slate-500 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 7.5 5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </summary>
            <div class="pb-7">
            <div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <div class="sm:col-span-2 lg:col-span-3"><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.gasPhase') }}</label><el-radio-group v-model="filters.gasPhase" class="flex flex-wrap gap-x-5 gap-y-1"><el-radio value="">{{ t('search.any') }}</el-radio><el-radio value="H2">H₂</el-radio><el-radio value="CO2">CO₂</el-radio><el-radio value="CH4">CH₄</el-radio></el-radio-group></div>
              <div class="sm:col-span-2 lg:col-span-3"><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.liquidPhase') }}</label><el-radio-group v-model="filters.liquidPhase" class="flex flex-wrap gap-x-5 gap-y-1"><el-radio value="">{{ t('search.any') }}</el-radio><el-radio value="brine">{{ t('search.fluids.brine') }}</el-radio><el-radio value="water">{{ t('search.fluids.water') }}</el-radio><el-radio value="oil">{{ t('search.fluids.oil') }}</el-radio></el-radio-group></div>
              <div class="sm:col-span-2 lg:col-span-3 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.brineSalinity') }}</label><el-input v-model="filters.salinity" clearable :placeholder="t('search.placeholders.value')"><template #append>{{ filters.salinityUnit }}</template></el-input></div>
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.ionicStrength') }}</label><el-input v-model="filters.ionicStrength" clearable :placeholder="t('search.placeholders.value')"><template #append>{{ filters.ionicStrengthUnit }}</template></el-input></div>
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.hydrogenFraction') }}</label><el-input v-model="filters.hydrogenFraction" clearable :placeholder="t('search.placeholders.value')"><template #append>{{ filters.hydrogenFractionUnit }}</template></el-input></div>
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fluidComposition.oilContent') }}</label><el-input v-model="filters.oil" clearable :placeholder="t('search.placeholders.value')"><template #append>{{ filters.oilUnit }}</template></el-input></div>
              </div>
              <div class="sm:col-span-2 lg:col-span-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.unitLabel') }} · {{ t('search.fields.brineSalinity') }}</label><el-select v-model="filters.salinityUnit" class="w-full"><el-option label="g/L" value="g/L" /><el-option label="mol/kg" value="mol/kg" /></el-select></div>
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.unitLabel') }} · {{ t('search.fields.ionicStrength') }}</label><el-select v-model="filters.ionicStrengthUnit" class="w-full"><el-option label="mol/L" value="mol/L" /><el-option label="mol/kg" value="mol/kg" /></el-select></div>
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.unitLabel') }} · {{ t('search.fields.hydrogenFraction') }}</label><el-select v-model="filters.hydrogenFractionUnit" class="w-full"><el-option label="mol%" value="mol%" /><el-option label="%" value="%" /></el-select></div>
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.unitLabel') }} · {{ t('search.fluidComposition.oilContent') }}</label><el-select v-model="filters.oilUnit" class="w-full"><el-option label="wt%" value="wt%" /><el-option label="vol%" value="vol%" /></el-select></div>
              </div>
              <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.oilType') }}</label><el-select v-model="filters.oilType" clearable class="w-full" :placeholder="t('search.any')"><el-option v-for="oil in oils" :key="oil" :value="oil" :label="t(`search.oils.${oil}`)" /></el-select></div>
            </div>
            </div>
          </details>

          <details open class="group">
            <summary class="flex cursor-pointer list-none items-center justify-between py-4 text-2xl font-semibold text-cyan-700 mb-2 [&::-webkit-details-marker]:hidden">
              <span class="flex items-center gap-3">{{ t('search.groups.conditions.title') }}</span>
              <svg class="h-4 w-4 text-slate-500 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 7.5 5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </summary>
            <div class="pb-2">
            <div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <div class="sm:col-span-2 lg:col-span-3 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.temperature') }}</label><el-input v-model="filters.temperature" clearable :placeholder="t('search.placeholders.value')"><template #append>{{ filters.temperatureUnit }}</template></el-input></div>
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.pressure') }}</label><el-input v-model="filters.pressure" clearable :placeholder="t('search.placeholders.value')"><template #append>{{ filters.pressureUnit }}</template></el-input></div>
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.saturation') }}</label><el-input v-model="filters.saturation" clearable :placeholder="t('search.placeholders.value')"><template #append>{{ filters.saturationUnit }}</template></el-input></div>
              </div>
              <div class="sm:col-span-2 lg:col-span-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.unitLabel') }} · {{ t('search.fields.temperature') }}</label><el-select v-model="filters.temperatureUnit" class="w-full"><el-option label="°C" value="°C" /><el-option label="K" value="K" /></el-select></div>
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.unitLabel') }} · {{ t('search.fields.pressure') }}</label><el-select v-model="filters.pressureUnit" class="w-full"><el-option label="MPa" value="MPa" /><el-option label="bar" value="bar" /></el-select></div>
                <div><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.unitLabel') }} · {{ t('search.fields.saturation') }}</label><el-select v-model="filters.saturationUnit" class="w-full"><el-option label="%" value="%" /><el-option label="fraction" value="fraction" /></el-select></div>
              </div>
              <div class="sm:col-span-2 lg:col-span-3"><label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.measurementMethod') }}</label><el-radio-group v-model="filters.method" class="flex flex-wrap gap-x-5 gap-y-1"><el-radio value="">{{ t('search.any') }}</el-radio><el-radio value="contact-angle">{{ t('search.methods.contactAngle') }}</el-radio><el-radio value="core-flooding">{{ t('search.methods.coreFlooding') }}</el-radio><el-radio value="simulation">{{ t('search.methods.simulation') }}</el-radio><el-radio value="other">{{ t('search.methods.other') }}</el-radio></el-radio-group></div>
            </div>
            </div>
          </details>
        </div>
        <p v-if="unsupportedCriteria.length" role="status" class="mt-3 text-xs leading-5 text-amber-800">{{ t('search.parameterIndex.unsupportedCriteria', { fields: unsupportedCriteria.join('、') }) }}</p>
        <div class="flex flex-wrap justify-end pt-8 gap-3 border-t border-slate-200">
          <el-button type="primary" class="!border-cyan-800 !bg-cyan-800" @click="applyFilters">{{ t('search.submit') }}</el-button>
          <el-button @click="resetFilters">{{ t('search.reset') }}</el-button>
        </div>
      </section>

      <section class="mt-10">
        <div class="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 class="text-xl font-semibold text-slate-900">{{ t('search.resultsTitle') }}</h2>
            <p v-if="hasSearched" class="mt-2 text-sm text-slate-500">{{ t('search.resultCount', { count: filteredRecords.length }) }}</p>
          </div>
          <div v-if="hasSearched && isAvailableParameter && filteredRecords.length" class="flex items-center gap-2 text-sm text-slate-600">
            <label for="page-size">{{ t('search.pageSizeLabel') }}</label>
            <el-select id="page-size" v-model="pageSize" class="!w-20" @change="currentPage = 1"><el-option v-for="n in [10, 20, 50, 100]" :key="n" :value="n" :label="String(n)" /></el-select>
          </div>
        </div>

        <p v-if="hasSearched && !isAvailableParameter" class="border-b border-slate-200 py-5 text-sm text-amber-800">{{ t('search.parameterIndex.noParameterData') }}</p>
        <div v-else-if="hasSearched && pageRecords.length" class="overflow-x-auto">
          <table class="w-full min-w-[760px] text-left text-sm">
            <thead class="border-b border-slate-200 text-xs text-slate-500"><tr><th class="py-3 pr-4 font-medium">{{ t('search.resultColumns.parameter') }}</th><th class="py-3 pr-4 font-medium">{{ t('search.resultColumns.value') }}</th><th class="py-3 pr-4 font-medium">{{ t('search.resultColumns.conditions') }}</th><th class="py-3 pr-4 font-medium">{{ t('search.resultColumns.source') }}</th><th class="py-3 text-right font-medium">{{ t('search.resultColumns.actions') }}</th></tr></thead>
            <tbody>
              <tr v-for="(record, i) in pageRecords" :key="`${currentPage}-${i}`" class="border-b border-slate-100 align-top">
                <td class="py-4 pr-4 font-medium">{{ selectedParameterName }}</td>
                <td class="whitespace-nowrap py-4 pr-4">θA {{ record.advancing_contact_angle_deg }}°<br><span class="text-slate-500">θR {{ record.receding_contact_angle_deg }}°</span></td>
                <td class="py-4 pr-4 text-xs leading-5 text-slate-600">TOC {{ record.toc_wt_percent }} wt% · T {{ record.temperature_C }} °C · P {{ record.pressure_MPa }} MPa<br>Calcite {{ record.calcite_wt_percent }} wt% · I {{ record.brine_ionic_strength_mol_L }} mol/L · Oil {{ record.oil }} wt%</td>
                <td class="whitespace-nowrap py-4 pr-4">{{ t('search.sourceReference', { reference: record.reference }) }}</td>
                <td class="py-4 text-right"><button class="text-cyan-800 hover:text-cyan-600" @click="showDetails(record)">{{ t('search.detailsButton') }}</button></td>
              </tr>
            </tbody>
          </table>
          <div class="flex justify-end gap-4 border-t border-slate-200 py-4 text-sm text-slate-600"><button :disabled="currentPage === 1" class="disabled:text-slate-300" @click="currentPage--">{{ t('search.previousPage') }}</button><span>{{ t('search.pageIndicator', { current: currentPage, total: pageCount }) }}</span><button :disabled="currentPage === pageCount" class="disabled:text-slate-300" @click="currentPage++">{{ t('search.nextPage') }}</button></div>
        </div>
        <div v-else-if="hasSearched" class="py-16 text-center text-sm text-slate-500">{{ t('search.emptyTitle') }}</div>
        <div v-else class="py-16 text-center text-sm text-slate-400">{{ t('search.parameterIndex.searchPrompt') }}</div>
      </section>
    </div>
    <ContactAngleDetail v-model="detailVisible" :record="selectedRecord" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import dataset from '../../data/contact-angle-data.json'
import ContactAngleDetail from '../components/ContactAngleDetail.vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import type { ContactAngleRecord } from '../types/contactAngle'

const { t } = useI18n()
const route = useRoute()
const records = dataset.data as ContactAngleRecord[]
const category = computed(() => String(route.query.category ?? 'interaction'))
const parameter = computed(() => String(route.query.parameter ?? 'wettability'))
const selectedParameterName = computed(() => t(`search.parameterIndex.parameters.${parameter.value}.name`))
const isAvailableParameter = computed(() => category.value === 'interaction' && parameter.value === 'wettability')
const rocks = ['sandstone', 'carbonate', 'shale', 'coal'] as const
const oils = ['crude', 'diesel', 'other'] as const
const initialFilters = () => ({
  rockType: '', quartz: '', calcite: '', dolomite: '', clay: '', feldspar: '', compositionUnit: 'wt%',
  toc: '', tocUnit: 'wt%', porosity: '', porosityUnit: '%', permeability: '', permeabilityUnit: 'mD', effectiveStress: '', stressUnit: 'MPa',
  gasPhase: '', liquidPhase: '', salinity: '', salinityUnit: 'g/L', ionicStrength: '', ionicStrengthUnit: 'mol/L',
  hydrogenFraction: '', hydrogenFractionUnit: 'mol%', oilType: '', oil: '', oilUnit: 'wt%',
  temperature: '', temperatureUnit: '°C', pressure: '', pressureUnit: 'MPa', saturation: '', saturationUnit: '%', method: '',
})
const filters = reactive(initialFilters())
const appliedFilters = ref(initialFilters())
const hasSearched = ref(false)
const currentPage = ref(1)
const pageSize = ref(20)
const detailVisible = ref(false)
const selectedRecord = ref<ContactAngleRecord | null>(null)

const unsupportedCriteria = computed(() => {
  const f = hasSearched.value ? appliedFilters.value : filters
  const unsupported = [
    ['rockType', 'search.fields.rockType'], ['porosity', 'search.fields.porosity'], ['permeability', 'search.fields.permeability'],
    ['effectiveStress', 'search.fields.effectiveStress'], ['gasPhase', 'search.fields.gasPhase'], ['liquidPhase', 'search.fields.liquidPhase'],
    ['salinity', 'search.fields.brineSalinity'], ['hydrogenFraction', 'search.fields.hydrogenFraction'], ['oilType', 'search.fields.oilType'],
    ['saturation', 'search.fields.saturation'], ['method', 'search.fields.measurementMethod'],
  ] as const
  const fields = unsupported.filter(([key]) => Boolean(f[key])).map(([, label]) => t(label))
  if (f.compositionUnit !== 'wt%' && [f.quartz, f.calcite, f.dolomite, f.clay, f.feldspar].some(Boolean)) fields.push(t('search.fields.mineralComposition'))
  if (f.toc && f.tocUnit !== 'wt%') fields.push('TOC')
  if (f.oil && f.oilUnit !== 'wt%') fields.push(t('search.fluidComposition.oilContent'))
  if (f.ionicStrength && f.ionicStrengthUnit !== 'mol/L') fields.push(t('search.fields.ionicStrength'))
  return fields
})

const numberInSourceUnit = (value: string, unit: string, kind: string) => {
  if (!value) return undefined
  const n = Number(value)
  if (!Number.isFinite(n)) return Number.NaN
  if (kind === 'temperature' && unit === 'K') return n - 273.15
  if ((kind === 'pressure' || kind === 'stress') && unit === 'bar') return n / 10
  if (kind === 'porosity' && unit === 'fraction') return n * 100
  return n
}

const matches = (actual: number, value: string, unit: string, kind: string) => {
  const expected = numberInSourceUnit(value, unit, kind)
  return expected === undefined || (Number.isFinite(expected) && Math.abs(actual - expected) < 1e-6)
}

const filteredRecords = computed(() => records.filter((r) => {
  const f = appliedFilters.value
  return matches(r.toc_wt_percent, f.toc, f.tocUnit, 'toc')
    && matches(r.quartz_wt_percent, f.compositionUnit === 'wt%' ? f.quartz : '', 'wt%', 'composition')
    && matches(r.calcite_wt_percent, f.compositionUnit === 'wt%' ? f.calcite : '', 'wt%', 'composition')
    && matches(r.dolomite_wt_percent, f.compositionUnit === 'wt%' ? f.dolomite : '', 'wt%', 'composition')
    && matches(r.clay_wt_percent, f.compositionUnit === 'wt%' ? f.clay : '', 'wt%', 'composition')
    && matches(r.feldspar_wt_percent, f.compositionUnit === 'wt%' ? f.feldspar : '', 'wt%', 'composition')
    && matches(r.brine_ionic_strength_mol_L, f.ionicStrengthUnit === 'mol/L' ? f.ionicStrength : '', 'mol/L', 'ionicStrength')
    && matches(r.oil, f.oilUnit === 'wt%' ? f.oil : '', 'wt%', 'oil')
    && matches(r.temperature_C, f.temperature, f.temperatureUnit, 'temperature')
    && matches(r.pressure_MPa, f.pressure, f.pressureUnit, 'pressure')
}))

const pageCount = computed(() => Math.max(1, Math.ceil(filteredRecords.value.length / pageSize.value)))
const pageRecords = computed(() => filteredRecords.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value))
const applyFilters = () => { appliedFilters.value = { ...filters }; currentPage.value = 1; hasSearched.value = true }
const resetFilters = () => { Object.assign(filters, initialFilters()); appliedFilters.value = initialFilters(); hasSearched.value = false; currentPage.value = 1 }
const showDetails = (record: ContactAngleRecord) => { selectedRecord.value = record; detailVisible.value = true }
</script>
