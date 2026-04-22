'use client'
import { useState } from 'react'

interface Props {
  onSubmit: (data: Record<string, unknown>) => void
  submitting: boolean
}

const FIELDS = [
  {
    key: 'a1_ciudad',
    label: 'Ciudad donde vives',
    options: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Pereira', 'Otra'],
  },
  {
    key: 'a1_transporte',
    label: '¿Cómo te mueves principalmente?',
    options: ['Bicicleta', 'Carro', 'Bus / Transmilenio', 'Metro', 'Moto', 'A pie'],
  },
  {
    key: 'a1_mascota',
    label: '¿Qué tipo de mascota tienes?',
    options: ['Perro', 'Gato', 'Pez', 'Ave', 'Ninguna', 'Otro'],
  },
  {
    key: 'a1_genero_musical',
    label: '¿Qué género musical escuchas más?',
    options: ['Rock', 'Pop', 'Reggaetón', 'Música clásica', 'Electrónica', 'Otro'],
  },
  {
    key: 'a1_comida_favorita',
    label: 'Tu comida favorita',
    options: ['Pizza', 'Sushi', 'Arepa / Comida típica', 'Pasta', 'Hamburguesa', 'Otro'],
  },
  {
    key: 'a1_red_social',
    label: 'Red social que más usas',
    options: ['Instagram', 'TikTok', 'X / Twitter', 'YouTube', 'WhatsApp', 'Ninguna'],
  },
]

export default function Activity1Form({ onSubmit, submitting }: Props) {
  const [values, setValues] = useState<Record<string, string>>({})

  const complete = FIELDS.every(f => values[f.key])

  function handleSubmit() {
    if (!complete) return
    onSubmit(values)
  }

  return (
    <div>
      <div style={{ background: '#EDE7D5', padding: '1rem 1.2rem', borderLeft: '4px solid #4A7FA5', marginBottom: '2rem', fontSize: '0.88rem', lineHeight: 1.6 }}>
        <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>🕵️ Tu misión</strong>
        <p style={{ marginTop: '0.3rem', color: '#555' }}>
          Responde estas 6 preguntas sobre ti. Luego vamos a cruzar las respuestas del grupo para detectar patrones — ¿Los que usan bicicleta tienen más gatos? ¿Los que escuchan rock prefieren el sushi?
        </p>
      </div>

      {FIELDS.map((field, i) => (
        <div key={field.key} style={{ marginBottom: '1.8rem', animationDelay: `${i * 0.05}s` }} className="animate-fade-up">
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', display: 'block', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {i + 1}. {field.label}
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.4rem' }}>
            {field.options.map(opt => (
              <div key={opt} className="option-pill">
                <input
                  type="radio"
                  id={`${field.key}-${opt}`}
                  name={field.key}
                  checked={values[field.key] === opt}
                  onChange={() => setValues(v => ({ ...v, [field.key]: opt }))}
                />
                <label htmlFor={`${field.key}-${opt}`}>{opt}</label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <hr className="divider" />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#8A8578' }}>
          {Object.keys(values).length} / {FIELDS.length} respondidas
        </span>
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={!complete || submitting}
          style={{ opacity: (!complete || submitting) ? 0.5 : 1 }}
        >
          {submitting ? 'Guardando…' : 'Enviar mis datos →'}
        </button>
      </div>
    </div>
  )
}
