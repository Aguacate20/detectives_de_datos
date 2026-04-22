'use client'
import { useState } from 'react'

interface Props {
  onSubmit: (data: Record<string, unknown>) => void
  submitting: boolean
}

const SLIDERS = [
  { key: 'a2_horas_sueno', label: '😴 Horas de sueño por noche', min: 0, max: 12, step: 0.5, unit: 'h', color: '#4A7FA5' },
  { key: 'a2_tazas_cafe', label: '☕ Tazas de café al día', min: 0, max: 10, step: 0.5, unit: 'tazas', color: '#C4614A' },
  { key: 'a2_horas_ejercicio', label: '🏃 Horas de ejercicio por semana', min: 0, max: 20, step: 0.5, unit: 'h/sem', color: '#5BA56A' },
  { key: 'a2_horas_pantalla', label: '📱 Horas frente a pantalla al día', min: 0, max: 16, step: 0.5, unit: 'h', color: '#E8C547' },
  { key: 'a2_horas_estudio', label: '📚 Horas de estudio por día', min: 0, max: 12, step: 0.5, unit: 'h', color: '#8A5BA5' },
  { key: 'a2_minutos_transporte', label: '🚌 Minutos en transporte al día', min: 0, max: 180, step: 5, unit: 'min', color: '#A58A5B' },
]

const DEFAULTS: Record<string, number> = {
  a2_horas_sueno: 7,
  a2_tazas_cafe: 1,
  a2_horas_ejercicio: 3,
  a2_horas_pantalla: 6,
  a2_horas_estudio: 2,
  a2_minutos_transporte: 45,
}

export default function Activity2Form({ onSubmit, submitting }: Props) {
  const [values, setValues] = useState<Record<string, number>>(DEFAULTS)

  function handleSubmit() {
    onSubmit(values)
  }

  return (
    <div>
      <div style={{ background: '#EDE7D5', padding: '1rem 1.2rem', borderLeft: '4px solid #C4614A', marginBottom: '2rem', fontSize: '0.88rem', lineHeight: 1.6 }}>
        <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>🕵️ Tu misión</strong>
        <p style={{ marginTop: '0.3rem', color: '#555' }}>
          Desliza cada barra hasta el valor que te represente. Estos números nos van a convertir en <em>puntos</em> en el espacio — y luego el algoritmo va a intentar agruparnos.
        </p>
      </div>

      {SLIDERS.map((s, i) => (
        <div key={s.key} style={{ marginBottom: '2rem' }} className="animate-fade-up">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {s.label}
            </label>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: s.color,
              minWidth: '4rem',
              textAlign: 'right'
            }}>
              {values[s.key]} {s.unit}
            </span>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={values[s.key]}
              onChange={e => setValues(v => ({ ...v, [s.key]: parseFloat(e.target.value) }))}
              style={{
                width: '100%',
                height: '6px',
                appearance: 'none',
                background: `linear-gradient(to right, ${s.color} 0%, ${s.color} ${((values[s.key] - s.min) / (s.max - s.min)) * 100}%, #DDD ${((values[s.key] - s.min) / (s.max - s.min)) * 100}%, #DDD 100%)`,
                cursor: 'pointer',
                borderRadius: 0,
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#8A8578', marginTop: '0.2rem' }}>
              <span>{s.min}</span><span>{s.max}</span>
            </div>
          </div>
        </div>
      ))}

      <hr className="divider" />

      <div style={{ background: '#F5F0E8', padding: '0.8rem 1rem', border: '1px dashed #8A8578', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#555' }}>
        📍 Tu punto: ({values.a2_horas_sueno}h sueño, {values.a2_tazas_cafe} cafés, {values.a2_horas_pantalla}h pantalla…)
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={submitting}
          style={{ opacity: submitting ? 0.5 : 1 }}
        >
          {submitting ? 'Guardando…' : 'Marcar mi punto →'}
        </button>
      </div>
    </div>
  )
}
