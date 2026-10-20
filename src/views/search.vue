<template>
  <div class="min-h-screen bg-slate-50 px-5 pb-16 pt-28 md:px-10">
    <div class="mx-auto max-w-[1600px]">
      <header class="mb-9 pb-6">
        <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 class="font-semibold tracking-tight text-blue-400 md:text-4xl">
              {{ t('search.title') }}
            </h1>
          </div>
        </div>
      </header>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)] lg:items-start">
        <aside class="min-w-0">
          <div class="text-2xl mb-6 text-blue-400 font-bold">{{ $t('search.filter') }}</div>
          <div class="space-y-5">
            <section class="border-b border-slate-200 pb-2">
              <button type="button" class="mb-4 flex w-full items-center justify-between text-left"
                :aria-expanded="groupExpanded.solid" @click="groupExpanded.solid = !groupExpanded.solid">
                <span class="text-xl font-semibold text-slate-900">{{ t('search.groups.solid.title') }}</span>
                <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5 text-slate-500 transition-transform"
                  :class="groupExpanded.solid ? 'rotate-180' : ''" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
              <div v-show="groupExpanded.solid">
                <div class="grid grid-cols-1 gap-x-4 gap-y-5">
                  <div class="min-w-0">
                    <label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.rockType')
                      }}</label>
                    <el-radio-group v-model="form.rockType" class="flex flex-wrap gap-x-5 gap-y-1">
                      <el-radio value="">{{ t('search.any') }}</el-radio>
                      <el-radio value="sandstone">{{ t('search.rocks.sandstone') }}</el-radio>
                      <el-radio value="carbonate">{{ t('search.rocks.carbonate') }}</el-radio>
                      <el-radio value="shale">{{ t('search.rocks.shale') }}</el-radio>
                      <el-radio value="coal">{{ t('search.rocks.coal') }}</el-radio>
                    </el-radio-group>
                  </div>

                  <div class="min-w-0">
                    <label class="mb-2 block text-[13px] font-medium text-slate-700">{{
                      t('search.fields.mineralComposition') }}</label>
                    <div class="grid grid-cols-1 gap-3">
                      <el-input v-model="form.quartz" clearable :placeholder="t('search.minerals.quartz')">
                        <template #append><el-select v-model="form.compositionUnit" class="!w-[88px] shrink-0"><el-option label="wt%"
                              value="wt%" /><el-option label="vol%" value="vol%" /></el-select></template>
                      </el-input>
                      <el-input v-model="form.calcite" clearable :placeholder="t('search.minerals.calcite')">
                        <template #append><span class="whitespace-nowrap px-2">{{ form.compositionUnit }}</span></template>
                      </el-input>
                      <el-input v-model="form.dolomite" clearable :placeholder="t('search.minerals.dolomite')">
                        <template #append><span class="whitespace-nowrap px-2">{{ form.compositionUnit }}</span></template>
                      </el-input>
                      <el-input v-model="form.clay" clearable :placeholder="t('search.minerals.clay')">
                        <template #append><span class="whitespace-nowrap px-2">{{ form.compositionUnit }}</span></template>
                      </el-input>
                      <el-input v-model="form.feldspar" clearable :placeholder="t('search.minerals.feldspar')">
                        <template #append><span class="whitespace-nowrap px-2">{{ form.compositionUnit }}</span></template>
                      </el-input>
                    </div>
                  </div>

                  <div class="min-w-0">
                    <label class="mb-2 block text-[13px] font-medium text-slate-700">TOC</label>
                    <el-input v-model="form.toc" clearable :placeholder="t('search.placeholders.value')">
                      <template #append><el-select v-model="form.tocUnit" class="!w-[88px] shrink-0"><el-option label="wt%"
                            value="wt%" /><el-option label="%" value="%" /></el-select></template>
                    </el-input>
                  </div>
                  <div class="min-w-0">
                    <label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.porosity')
                      }}</label>
                    <el-input v-model="form.porosity" clearable :placeholder="t('search.placeholders.value')">
                      <template #append><el-select v-model="form.porosityUnit" class="!w-[96px] shrink-0"><el-option label="%"
                            value="%" /><el-option label="fraction" value="fraction" /></el-select></template>
                    </el-input>
                  </div>
                  <div class="min-w-0">
                    <label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.permeability')
                      }}</label>
                    <el-input v-model="form.permeability" clearable :placeholder="t('search.placeholders.value')">
                      <template #append><el-select v-model="form.permeabilityUnit" class="!w-[88px] shrink-0"><el-option label="mD"
                            value="mD" /><el-option label="m²" value="m²" /></el-select></template>
                    </el-input>
                  </div>
                  <div class="min-w-0">
                    <label class="mb-2 block text-[13px] font-medium text-slate-700">{{
                      t('search.fields.effectiveStress') }}</label>
                    <el-input v-model="form.effectiveStress" clearable :placeholder="t('search.placeholders.value')">
                      <template #append><el-select v-model="form.stressUnit" class="!w-[88px] shrink-0"><el-option label="MPa"
                            value="MPa" /><el-option label="bar" value="bar" /></el-select></template>
                    </el-input>
                  </div>
                </div>
              </div>
            </section>

            <section class="border-b border-slate-200 pb-2">
              <button type="button" class="mb-4 flex w-full items-center justify-between text-left"
                :aria-expanded="groupExpanded.fluid" @click="groupExpanded.fluid = !groupExpanded.fluid">
                <span class="text-xl font-semibold text-slate-900">{{ t('search.groups.fluid.title') }}</span>
                <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5 text-slate-500 transition-transform"
                  :class="groupExpanded.fluid ? 'rotate-180' : ''" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
              <div v-show="groupExpanded.fluid">

                <div class="grid grid-cols-1 gap-x-4 gap-y-5">
                  <div class="min-w-0">
                    <label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.gasPhase')
                      }}</label>
                    <el-radio-group v-model="form.gasPhase" class="flex flex-wrap gap-x-5 gap-y-1">
                      <el-radio value="">{{ t('search.any') }}</el-radio>
                      <el-radio value="H2">H₂</el-radio>
                      <el-radio value="CO2">CO₂</el-radio>
                      <el-radio value="CH4">CH₄</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="min-w-0">
                    <label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.liquidPhase')
                      }}</label>
                    <el-radio-group v-model="form.liquidPhase" class="flex flex-wrap gap-x-5 gap-y-1">
                      <el-radio value="">{{ t('search.any') }}</el-radio>
                      <el-radio value="brine">{{ t('search.fluids.brine') }}</el-radio>
                      <el-radio value="water">{{ t('search.fluids.water') }}</el-radio>
                      <el-radio value="oil">{{ t('search.fluids.oil') }}</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="min-w-0">
                    <label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.brineSalinity')
                      }}</label>
                    <el-input v-model="form.salinity" clearable :placeholder="t('search.placeholders.value')">
                      <template #append><el-select v-model="form.salinityUnit" class="!w-[96px] shrink-0"><el-option label="g/L"
                            value="g/L" /><el-option label="mol/kg" value="mol/kg" /></el-select></template>
                    </el-input>
                  </div>
                  <div class="min-w-0">
                    <label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.ionicStrength')
                      }}</label>
                    <el-input v-model="form.ionicStrength" clearable :placeholder="t('search.placeholders.value')">
                      <template #append><el-select v-model="form.ionicStrengthUnit" class="!w-[96px] shrink-0"><el-option
                            label="mol/L" value="mol/L" /><el-option label="mol/kg"
                            value="mol/kg" /></el-select></template>
                    </el-input>
                  </div>
                  <div class="min-w-0">
                    <label class="mb-2 block text-[13px] font-medium text-slate-700">{{
                      t('search.fields.hydrogenFraction')
                      }}</label>
                    <el-input v-model="form.hydrogenFraction" clearable :placeholder="t('search.placeholders.value')">
                      <template #append><el-select v-model="form.fractionUnit" class="!w-[88px] shrink-0"><el-option label="mol%"
                            value="mol%" /><el-option label="%" value="%" /></el-select></template>
                    </el-input>
                  </div>
                  <div class="min-w-0">
                    <label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.oilType')
                      }}</label>
                    <el-select v-model="form.oilType" clearable class="w-full" :placeholder="t('search.any')">
                      <el-option value="crude" :label="t('search.oils.crude')" />
                      <el-option value="diesel" :label="t('search.oils.diesel')" />
                      <el-option value="other" :label="t('search.oils.other')" />
                    </el-select>
                  </div>
                </div>
              </div>
            </section>

            <section class="border-b border-slate-200 pb-2">
              <button type="button" class="mb-4 flex w-full items-center justify-between text-left"
                :aria-expanded="groupExpanded.conditions" @click="groupExpanded.conditions = !groupExpanded.conditions">
                <span class="text-xl font-semibold text-slate-900">{{ t('search.groups.conditions.title') }}</span>
                <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5 text-slate-500 transition-transform"
                  :class="groupExpanded.conditions ? 'rotate-180' : ''" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
              <div v-show="groupExpanded.conditions">

                <div class="grid grid-cols-1 gap-x-4 gap-y-5">
                  <div class="min-w-0">
                    <label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.temperature')
                      }}</label>
                    <el-input v-model="form.temperature" clearable :placeholder="t('search.placeholders.value')">
                      <template #append><el-select v-model="form.temperatureUnit" class="!w-[88px] shrink-0"><el-option label="°C"
                            value="°C" /><el-option label="K" value="K" /></el-select></template>
                    </el-input>
                  </div>
                  <div class="min-w-0">
                    <label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.pressure')
                      }}</label>
                    <el-input v-model="form.pressure" clearable :placeholder="t('search.placeholders.value')">
                      <template #append><el-select v-model="form.pressureUnit" class="!w-[88px] shrink-0"><el-option label="MPa"
                            value="MPa" /><el-option label="bar" value="bar" /></el-select></template>
                    </el-input>
                  </div>
                  <div class="min-w-0">
                    <label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.fields.saturation')
                      }}</label>
                    <el-input v-model="form.saturation" clearable :placeholder="t('search.placeholders.value')">
                      <template #append><el-select v-model="form.saturationUnit" class="!w-[96px] shrink-0"><el-option label="%"
                            value="%" /><el-option label="fraction" value="fraction" /></el-select></template>
                    </el-input>
                  </div>
                  <div class="min-w-0">
                    <label class="mb-2 block text-[13px] font-medium text-slate-700">{{
                      t('search.fields.measurementMethod')
                      }}</label>
                    <el-radio-group v-model="form.method" class="flex flex-wrap gap-x-5 gap-y-1">
                      <el-radio value="">{{ t('search.any') }}</el-radio>
                      <el-radio value="contact-angle">{{ t('search.methods.contactAngle') }}</el-radio>
                      <el-radio value="core-flooding">{{ t('search.methods.coreFlooding') }}</el-radio>
                      <el-radio value="simulation">{{ t('search.methods.simulation') }}</el-radio>
                      <el-radio value="other">{{ t('search.methods.other') }}</el-radio>
                    </el-radio-group>
                  </div>
                </div>

                <div class="mt-6 border-t border-slate-100 pt-5">
                  <div class="mb-4">
                    <h3 class="text-xl font-semibold text-slate-800">{{ t('search.target.title') }}</h3>
                  </div>
                  <div class="min-w-0">
                    <label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.target.category')
                      }}</label>
                    <el-radio-group v-model="form.targetCategory" class="flex flex-wrap gap-x-5 gap-y-1">
                      <el-radio value="solid">{{ t('search.target.solid') }}</el-radio>
                      <el-radio value="fluid">{{ t('search.target.fluid') }}</el-radio>
                      <el-radio value="interaction">{{ t('search.target.interaction') }}</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="mt-5 border-t border-slate-100 pt-5">
                    <div class="min-w-0">
                      <label class="mb-2 block text-[13px] font-medium text-slate-700">{{ t('search.target.parameter')
                        }}</label>
                      <el-radio-group
                        v-model="form.targetParameter"
                        class="!flex !w-full !flex-col !items-start gap-y-2 [&_.el-radio]:!mr-0 [&_.el-radio]:!inline-flex [&_.el-radio]:min-w-0 [&_.el-radio__label]:whitespace-normal [&_.el-radio__label]:leading-5"
                      >
                        <el-radio class="min-w-0" value="">{{ t('search.any') }}</el-radio>
                        <el-radio v-for="parameter in targetParameters" :key="parameter.value" class="min-w-0" :value="parameter.value">
                          {{ parameter.label }}
                        </el-radio>
                      </el-radio-group>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div class="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row lg:flex-col">
            <el-button class="!ml-0" @click="resetForm">{{ t('search.reset') }}</el-button>
            <el-button type="primary"
              class="!ml-0 !border-cyan-800 !bg-cyan-800 hover:!border-cyan-700 hover:!bg-cyan-700" @click="runSearch">
              {{ t('search.submit') }}
            </el-button>
          </div>
        </aside>

        <main class="min-h-[640px] min-w-0 lg:border-l lg:border-slate-200 lg:pl-6">
          <div
            class="flex flex-col gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 class="text-lg font-semibold text-slate-900">{{ t('search.resultsTitle') }}</h2>
            </div>
            <div class="flex flex-col gap-3 md:items-end">
              <div>
                <el-radio-group v-model="form.matchMode" class="flex flex-wrap gap-x-4 gap-y-1">
                  <el-radio value="similar">{{ t('search.target.similar') }}</el-radio>
                  <el-radio value="exact">{{ t('search.target.exact') }}</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>

          <div v-if="filteredRecords.length" class="mt-2 overflow-x-auto">
            <table class="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead class="border-b border-slate-200 text-xs font-medium text-slate-500">
                <tr>
                  <th class="py-3 pr-4 font-medium">{{ t('search.resultColumns.parameter') }}</th>
                  <th class="py-3 pr-4 font-medium">{{ t('search.resultColumns.value') }}</th>
                  <th class="py-3 pr-4 font-medium">{{ t('search.resultColumns.conditions') }}</th>
                  <th class="py-3 pr-4 font-medium">{{ t('search.resultColumns.source') }}</th>
                  <th class="py-3 text-right font-medium">{{ t('search.resultColumns.actions') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(record, index) in pageRecords" :key="`${currentPage}-${index}`" class="border-b border-slate-100 align-top last:border-0">
                  <td class="py-4 pr-4 font-medium text-slate-800">{{ t('search.parameters.contactAngle') }}</td>
                  <td class="whitespace-nowrap py-4 pr-4 text-slate-700">
                    <div>θA {{ record.advancing_contact_angle_deg }}°</div>
                    <div class="mt-1 text-slate-500">θR {{ record.receding_contact_angle_deg }}°</div>
                  </td>
                  <td class="min-w-[300px] py-4 pr-4 text-xs leading-5 text-slate-600">
                    <div>TOC {{ record.toc_wt_percent }} wt% · T {{ record.temperature_C }} °C · P {{ record.pressure_MPa }} MPa</div>
                    <div class="mt-1">Qz {{ record.quartz_wt_percent }}% · Cal {{ record.calcite_wt_percent }}% · Dol {{ record.dolomite_wt_percent }}%</div>
                    <div class="mt-1">Clay {{ record.clay_wt_percent }}% · Feldspar {{ record.feldspar_wt_percent }}% · I {{ record.brine_ionic_strength_mol_L }} mol/L · Oil {{ record.oil }}</div>
                  </td>
                  <td class="whitespace-nowrap py-4 pr-4 text-slate-600">{{ t('search.sourceReference', { reference: record.reference }) }}</td>
                  <td class="py-4 text-right">
                    <button type="button" class="whitespace-nowrap text-sm font-medium text-cyan-800 hover:text-cyan-600" @click="openDetails(record)">{{ t('search.detailsButton') }}</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="flex flex-col gap-3 border-t border-slate-200 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <span>{{ t('search.resultCount', { count: filteredRecords.length }) }}</span>
              <div class="flex items-center gap-3">
                <label for="page-size" class="whitespace-nowrap">{{ t('search.pageSizeLabel') }}</label>
                <el-select id="page-size" v-model="pageSize" size="small" class="!w-20" @change="currentPage = 1">
                  <el-option v-for="size in pageSizeOptions" :key="size" :label="String(size)" :value="size" />
                </el-select>
                <button type="button" class="disabled:cursor-not-allowed disabled:text-slate-300 hover:text-cyan-800" :disabled="currentPage === 1" @click="currentPage--">{{ t('search.previousPage') }}</button>
                <span class="whitespace-nowrap">{{ t('search.pageIndicator', { current: currentPage, total: pageCount }) }}</span>
                <button type="button" class="disabled:cursor-not-allowed disabled:text-slate-300 hover:text-cyan-800" :disabled="currentPage === pageCount" @click="currentPage++">{{ t('search.nextPage') }}</button>
              </div>
            </div>
          </div>

          <div v-else class="flex min-h-[480px] flex-col items-center justify-center py-16 text-center">
            <div class="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <svg viewBox="0 0 24 24" fill="none" class="h-6 w-6" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" stroke-width="1.5" />
                <path d="m16 16 4.2 4.2M8 10.8h5.6M10.8 8v5.6" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" />
              </svg>
            </div>
            <h3 class="text-base font-medium text-slate-800">{{ t('search.emptyTitle') }}</h3>
          </div>

        </main>
      </div>
    </div>
  </div>
  <ContactAngleDetail v-model="detailVisible" :record="selectedRecord" />
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import contactAngleDataset from '../../data/contact-angle-data.json'
import ContactAngleDetail from '../components/ContactAngleDetail.vue'
import type { ContactAngleRecord } from '../types/contactAngle'

const { t } = useI18n()
const groupExpanded = reactive({ solid: true, fluid: true, conditions: true })

const initialForm = () => ({
  rockType: '', quartz: '', calcite: '', dolomite: '', clay: '', feldspar: '',
  compositionUnit: 'wt%', toc: '', tocUnit: 'wt%', porosity: '', porosityUnit: '%',
  permeability: '', permeabilityUnit: 'mD', effectiveStress: '', stressUnit: 'MPa',
  gasPhase: '', liquidPhase: '', salinity: '', salinityUnit: 'g/L', ionicStrength: '',
  ionicStrengthUnit: 'mol/L', hydrogenFraction: '', fractionUnit: 'mol%', oilType: '',
  temperature: '', temperatureUnit: '°C', pressure: '', pressureUnit: 'MPa',
  saturation: '', saturationUnit: '%', method: '', targetCategory: 'interaction',
  targetParameter: '', matchMode: 'similar',
})

const form = reactive(initialForm())
const appliedFilters = ref(initialForm())
const currentPage = ref(1)
const pageSize = ref(20)
const pageSizeOptions = [10, 20, 50, 100]
const detailVisible = ref(false)
const selectedRecord = ref<ContactAngleRecord | null>(null)

const records = contactAngleDataset.data as ContactAngleRecord[]

const filteredRecords = computed(() => {
  const filters = appliedFilters.value
  const numericFields: Array<[keyof ContactAngleRecord, string]> = [
    ['toc_wt_percent', filters.toc],
    ['quartz_wt_percent', filters.quartz],
    ['calcite_wt_percent', filters.calcite],
    ['dolomite_wt_percent', filters.dolomite],
    ['clay_wt_percent', filters.clay],
    ['feldspar_wt_percent', filters.feldspar],
    ['brine_ionic_strength_mol_L', filters.ionicStrengthUnit === 'mol/L' ? filters.ionicStrength : ''],
    ['temperature_C', filters.temperatureUnit === 'K' && filters.temperature ? String(Number(filters.temperature) - 273.15) : filters.temperature],
    ['pressure_MPa', filters.pressureUnit === 'bar' && filters.pressure ? String(Number(filters.pressure) / 10) : filters.pressure],
  ]

  return records.filter((record) => {
    if (filters.targetCategory !== 'interaction') return false
    if (filters.targetParameter && filters.targetParameter !== 'contactAngle') return false
    if (filters.method && filters.method !== 'contact-angle') return false
    const compositionUnitMatches = filters.compositionUnit === 'wt%'
    if (!compositionUnitMatches && [filters.quartz, filters.calcite, filters.dolomite, filters.clay, filters.feldspar].some(Boolean)) return false

    return numericFields.every(([field, value]) => {
      if (!value) return true
      const target = Number(value)
      return Number.isFinite(target) && Number(record[field]) === target
    })
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filteredRecords.value.length / pageSize.value)))
const pageRecords = computed(() => filteredRecords.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value))
const openDetails = (record: ContactAngleRecord) => {
  selectedRecord.value = record
  detailVisible.value = true
}

const runSearch = () => {
  appliedFilters.value = { ...form }
  currentPage.value = 1
}

const targetParameters = computed(() => {
  const optionsByCategory: Record<string, Array<[string, string]>> = {
    solid: [['porosity', 'porosity'], ['permeability', 'permeability'], ['effectiveStress', 'effectiveStress']],
    fluid: [['density', 'density'], ['viscosity', 'viscosity'], ['solubility', 'solubility'], ['diffusivity', 'diffusivity'], ['interfacialTension', 'interfacialTension']],
    interaction: [['contactAngle', 'contactAngle'], ['capillaryPressure', 'capillaryPressure'], ['relativePermeability', 'relativePermeability'], ['adsorption', 'adsorption'], ['chemicalReaction', 'chemicalReaction']],
  }

  return (optionsByCategory[form.targetCategory] ?? []).map(([value, label]) => ({
    value,
    label: t(`search.parameters.${label}`),
  }))
})

watch(() => form.targetCategory, () => {
  form.targetParameter = ''
})

const resetForm = () => {
  Object.assign(form, initialForm())
  appliedFilters.value = initialForm()
  currentPage.value = 1
}
</script>
