import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos TypeScript para las respuestas
export interface StudentResponse {
  id?: string
  created_at?: string
  session_code: string
  activity_id: number
  student_name?: string

  // Actividad 1
  a1_ciudad?: string
  a1_transporte?: string
  a1_mascota?: string
  a1_genero_musical?: string
  a1_comida_favorita?: string
  a1_red_social?: string

  // Actividad 2
  a2_horas_sueno?: number
  a2_tazas_cafe?: number
  a2_horas_ejercicio?: number
  a2_horas_pantalla?: number
  a2_horas_estudio?: number
  a2_minutos_transporte?: number

  // Actividad 3
  a3_altura?: number
  a3_peso?: number
  a3_edad?: number
  a3_ingresos_mensuales?: number
  a3_horas_trabajo?: number
  a3_nivel_educativo?: string
  a3_variables_elegidas?: string[]
  a3_razon_eleccion?: string
}

export async function submitResponse(data: StudentResponse) {
  const { data: result, error } = await supabase
    .from('student_responses')
    .insert([data])
    .select()
  if (error) throw error
  return result
}

export async function getSessionResponses(sessionCode: string, activityId?: number) {
  // Datos ficticios — sin llamada a Supabase
  if (sessionCode.toLowerCase() === 'ficticio') {
    const { getMockData } = await import('./mockData')
    const mock = getMockData(activityId || 1)
    return activityId ? mock.filter(r => r.activity_id === activityId) : mock
  }

  let query = supabase
    .from('student_responses')
    .select('*')
    .eq('session_code', sessionCode)
    .order('created_at', { ascending: true })

  if (activityId) {
    query = query.eq('activity_id', activityId)
  }

  const { data, error } = await query
  if (error) throw error
  return data as StudentResponse[]
}

export async function getSessionSummary(sessionCode: string) {
  const { data, error } = await supabase
    .from('session_summary')
    .select('*')
    .eq('session_code', sessionCode)
  if (error) throw error
  return data
}
