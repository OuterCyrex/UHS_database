export interface ContactAngleRecord {
  reference: string | number | null
  toc_wt_percent: number
  quartz_wt_percent: number
  calcite_wt_percent: number
  dolomite_wt_percent: number
  clay_wt_percent: number
  feldspar_wt_percent: number
  brine_ionic_strength_mol_L: number
  oil: number
  temperature_C: number
  pressure_MPa: number
  advancing_contact_angle_deg: number
  receding_contact_angle_deg: number
}
