'use client'
import { useState } from 'react'

interface Props {
  onSubmit: (data: Record<string, unknown>) => void
  submitting: boolean
}

const VARIABLES_LIST = [
  'Altura', 'Peso', 'Edad', 'Ingresos mensuales', 'Horas de trabajo',
  'Nivel educativo', 'Horas de ejercicio', 'Horas de sueño',
  'Número de hijos', 'Años de experiencia laboral',
]

const NIVELES = ['Bachiller', 'Técnico / Tecnólogo', 'Universitario', 'Posgrado']

export default function Activity3Form({ onSubmit, submitting }: Props) {
  const [values, setValues] = useState({
    a3_altura: '',
    a3_peso: '',
    a3_edad: '',
    a3_ingresos_mensuales: '',
    a3_horas_trabajo: '',
    a3_nivel_educativo: '',
  })
  const [selectedVars, setSelectedVars] = useState<string[]>([])
  const [razon, setRazon] = useState('')

  function toggleVar(v: string) {
    setSelectedVars(prev =>
      prev.includes(v)
        ? prev.filter(x => x !== v)
        : prev.length < 2
        ? [...prev, v]
        : prev
    )
  }

  const basicComplete = values.a3_altura && values.a3_edad && values.a3_nivel_educativo
  const varsComplete = selectedVars.length === 2

  function handleSubmit() {
    if (!basicComplete || !varsComplete) return
    onSubmit({
      a3_altura: parseFloat(values.a3_altura) || null,
      a3_peso: parseFloat(values.a3_peso) || null,
      a3_edad: parseInt(values.a3_edad) || null,
      a3_ingresos_mensuales: parseInt(values.a3_ingresos_mensuales) || null,
      a3_horas_trabajo: parseInt(values.a3_horas_trabajo) || null,
      a3_nivel_educativo: values.a3_nivel_educativo,
      a3_variables_elegidas: selectedVars,
      a3_razon_eleccion: razon,
    })
  }

  return (
    <div>
      <div style={{ background: '#EDE7D5', padding: '1rem 1.2rem', borderLeft: '4px solid #5BA56A', marginBottom: '2rem', fontSize: '0.88rem', lineHeight: 1.6 }}>
        <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>🕵️ Tu misión</strong>
        <p style={{ marginTop: '0.3rem', color: '#555' }}>
          Primero cuéntanos sobre ti, luego elige las <strong>2 variables</strong> que usarías para describir a alguien si solo pudieras escoger dos. ¿Por qué esas? Eso es exactamente lo que hace PCA — pero con matemáticas.
        </p>
      </div>

      {/* Datos personales */}
      <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.2rem', color: '#8A8578' }}>
        Parte 1 — Tus datos
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
        {[
          { key: 'a3_altura', label: 'Altura (cm)', placeholder: '170' },
          { key: 'a3_peso', label: 'Peso (kg)', placeholder: '65' },
          { key: 'a3_edad', label: 'Edad', placeholder: '22' },
          { key: 'a3_horas_trabajo', label: 'Horas trabajo / semana', placeholder: '40' },
          { key: 'a3_ingresos_mensuales', label: 'Ingresos mensuales (miles $)', placeholder: '1500' },
        ].map(f => (
          <div key={f.key}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.3rem' }}>
              {f.label}
            </label>
            <input
              type="number"
              className="input-field"
              placeholder={f.placeholder}
              value={values[f.key as keyof typeof values]}
              onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))}
            />
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.5rem' }}>
          Nivel educativo
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.4rem' }}>
          {NIVELES.map(n => (
            <div key={n} className="option-pill">
              <input type="radio" id={`nivel-${n}`} name="nivel" checked={values.a3_nivel_educativo === n} onChange={() => setValues(v => ({ ...v, a3_nivel_educativo: n }))} />
              <label htmlFor={`nivel-${n}`}>{n}</label>
            </div>
          ))}
        </div>
      </div>

      <hr className="divider" />

      {/* Elección de variables */}
      <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: '#8A8578' }}>
        Parte 2 — Si solo pudieras elegir 2…
      </h3>
      <p style={{ fontSize: '0.88rem', color: '#555', marginBottom: '1.2rem', lineHeight: 1.6 }}>
        De esta lista de características, ¿cuáles 2 usarías para describir mejor a una persona desconocida?
        <br /><span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#8A8578' }}>({selectedVars.length}/2 seleccionadas)</span>
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))', gap: '0.4rem', marginBottom: '1.5rem' }}>
        {VARIABLES_LIST.map(v => {
          const selected = selectedVars.includes(v)
          const disabled = !selected && selectedVars.length >= 2
          return (
            <button
              key={v}
              onClick={() => !disabled && toggleVar(v)}
              style={{
                border: `2px solid ${selected ? '#5BA56A' : 'rgba(13,13,13,0.2)'}`,
                background: selected ? '#5BA56A' : 'white',
                color: selected ? 'white' : disabled ? '#CCC' : '#0D0D0D',
                padding: '0.6rem 0.8rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              {selected && '✓ '}{v}
            </button>
          )
        })}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.4rem' }}>
          ¿Por qué esas dos? (opcional)
        </label>
        <textarea
          className="input-field"
          placeholder="Porque creo que… / Me parece que estas dos variables ya cubren…"
          value={razon}
          onChange={e => setRazon(e.target.value)}
          rows={3}
          style={{ resize: 'vertical', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}
        />
      </div>

      <hr className="divider" />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        {varsComplete && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#5BA56A' }}>
            ✓ Elegiste: {selectedVars.join(' + ')}
          </div>
        )}
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={!basicComplete || !varsComplete || submitting}
          style={{ opacity: (!basicComplete || !varsComplete || submitting) ? 0.5 : 1, marginLeft: 'auto' }}
        >
          {submitting ? 'Guardando…' : 'Enviar mis datos →'}
        </button>
      </div>
    </div>
  )
}
