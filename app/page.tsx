'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ACTIVITIES = [
  {
    id: 1,
    emoji: '🏷️',
    title: 'El juego de las etiquetas',
    subtitle: 'Cruce de variables categóricas',
    duration: '15–20 min',
    description: 'Descubre cómo dos variables juntas revelan patrones que ninguna muestra sola.',
    color: '#4A7FA5',
    concept: 'Tablas de contingencia',
  },
  {
    id: 2,
    emoji: '📍',
    title: 'Agrúpate',
    subtitle: 'K-means paso a paso',
    duration: '20 min',
    description: 'Siente en tu propio cuerpo cómo un algoritmo de clustering converge.',
    color: '#C4614A',
    concept: 'Clustering / K-means',
  },
  {
    id: 3,
    emoji: '🔎',
    title: '¿Qué le preguntarías?',
    subtitle: 'Motivación para PCA',
    duration: '10 min',
    description: 'Aprende a identificar cuándo las variables se repiten entre sí.',
    color: '#5BA56A',
    concept: 'Reducción de dimensionalidad',
  },
]

export default function HomePage() {
  const router = useRouter()
  const [sessionCode, setSessionCode] = useState('')
  const [mode, setMode] = useState<'student' | 'teacher' | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null)
  const [error, setError] = useState('')

  function handleGo() {
    if (!sessionCode.trim()) { setError('Ingresa el código de sesión'); return }
    if (!selectedActivity) { setError('Elige una actividad'); return }
    setError('')
    const path = mode === 'student'
      ? `/encuesta?session=${encodeURIComponent(sessionCode.trim())}&activity=${selectedActivity}`
      : `/dashboard?session=${encodeURIComponent(sessionCode.trim())}&activity=${selectedActivity}`
    router.push(path)
  }

  return (
    <main style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <header style={{ borderBottom: '2px solid #0D0D0D', padding: '1.2rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem', background: '#0D0D0D' }}>
        <span style={{ fontSize: '1.4rem' }}>🔍</span>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8', fontSize: '1.4rem', lineHeight: 1 }}>
            Detectives de Datos
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', color: '#E8C547', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Estadística multivariada sin fórmulas
          </p>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Hero */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div className="label-tag" style={{ marginBottom: '1rem' }}>Caso abierto</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15, marginBottom: '1rem' }}>
            ¿Qué patrones<br /><em>ocultos</em> tienen tus datos?
          </h2>
          <p style={{ color: '#8A8578', maxWidth: 480, margin: '0 auto', fontSize: '1.05rem' }}>
            Ingresa tu código de sesión, elige tu papel y comienza la investigación.
          </p>
        </div>

        {/* Actividades */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem', color: '#8A8578' }}>
            — Elige la actividad
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {ACTIVITIES.map(act => (
              <div
                key={act.id}
                onClick={() => setSelectedActivity(act.id)}
                className="card"
                style={{
                  cursor: 'pointer',
                  outline: selectedActivity === act.id ? `3px solid ${act.color}` : '3px solid transparent',
                  outlineOffset: 2,
                  transition: 'all 0.2s',
                  borderLeft: `4px solid ${act.color}`,
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{act.emoji}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: act.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
                  Actividad {act.id} · {act.duration}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '0.3rem' }}>{act.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#8A8578', lineHeight: 1.5, marginBottom: '0.7rem' }}>{act.description}</p>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', background: '#F5F0E8', padding: '0.15rem 0.5rem', border: `1px solid ${act.color}`, color: act.color }}>
                  {act.concept}
                </span>
                {selectedActivity === act.id && (
                  <div style={{ marginTop: '0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: act.color }}>
                    ✓ Seleccionada
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Código de sesión + modo */}
        <div className="card" style={{ maxWidth: 480, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem', color: '#8A8578' }}>
            — Acceso a la sesión
          </p>

          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>
            Código de sesión
          </label>
          <input
            className="input-field"
            placeholder="Ej: clase-oct-23"
            value={sessionCode}
            onChange={e => setSessionCode(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleGo()}
            style={{ marginBottom: '1.2rem' }}
          />

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '0.6rem' }}>Soy…</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.2rem' }}>
            {(['student', 'teacher'] as const).map(m => (
              <div key={m} className="option-pill">
                <input type="radio" id={`mode-${m}`} name="mode" checked={mode === m} onChange={() => setMode(m)} />
                <label htmlFor={`mode-${m}`} style={{ padding: '0.7rem' }}>
                  {m === 'student' ? '👩‍🎓 Estudiante' : '👩‍🏫 Profesor/a'}
                </label>
              </div>
            ))}
          </div>

          {error && (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--suspect)', marginBottom: '0.8rem' }}>
              ⚠ {error}
            </p>
          )}

          <button
            className="btn-primary"
            onClick={handleGo}
            disabled={!mode}
            style={{ width: '100%', opacity: !mode ? 0.5 : 1 }}
          >
            {mode === 'teacher' ? 'Ver dashboard →' : 'Ir a la encuesta →'}
          </button>
        </div>

        {/* Footer */}
        <p style={{ textAlign: 'center', marginTop: '3rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#8A8578', letterSpacing: '0.06em' }}>
          Los datos se guardan en Supabase y solo son accesibles con el código de sesión.
        </p>
      </div>
    </main>
  )
}
