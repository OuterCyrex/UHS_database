<template>
  <el-dialog v-model="visible" :title="t('search.detailTitle')" width="min(92vw, 640px)">
    <dl v-if="record" class="grid grid-cols-1 gap-x-8 sm:grid-cols-2 p-4">
      <div
        v-for="item in detailItems"
        :key="item.label"
        class="flex justify-between gap-4 border-b border-slate-100 py-3 text-sm"
      >
        <dt class="text-slate-500">{{ item.label }}</dt>
        <dd class="text-right font-medium text-slate-800">{{ item.value }}</dd>
      </div>
    </dl>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ContactAngleRecord } from '../types/contactAngle'

const props = defineProps<{ modelValue: boolean; record: ContactAngleRecord | null }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
const { t } = useI18n()

const visible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

const detailItems = computed(() => {
  if (!props.record) return []
  const record = props.record

  return [
    [t('search.detailFields.reference'), t('search.sourceReference', { reference: record.reference })],
    [t('search.detailFields.toc'), `${record.toc_wt_percent} wt%`],
    [t('search.minerals.quartz'), `${record.quartz_wt_percent} wt%`],
    [t('search.minerals.calcite'), `${record.calcite_wt_percent} wt%`],
    [t('search.minerals.dolomite'), `${record.dolomite_wt_percent} wt%`],
    [t('search.minerals.clay'), `${record.clay_wt_percent} wt%`],
    [t('search.minerals.feldspar'), `${record.feldspar_wt_percent} wt%`],
    [t('search.detailFields.ionicStrength'), `${record.brine_ionic_strength_mol_L} mol/L`],
    [t('search.detailFields.oil'), String(record.oil)],
    [t('search.fields.temperature'), `${record.temperature_C} °C`],
    [t('search.fields.pressure'), `${record.pressure_MPa} MPa`],
    [t('search.detailFields.advancingAngle'), `${record.advancing_contact_angle_deg}°`],
    [t('search.detailFields.recedingAngle'), `${record.receding_contact_angle_deg}°`],
  ].map(([label, value]) => ({ label, value }))
})
</script>
