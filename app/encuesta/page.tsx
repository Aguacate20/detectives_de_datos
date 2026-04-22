'use client'
import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Activity1Form from '@/components/surveys/Activity1Form'
import Activity2Form from '@/components/surveys/Activity2Form'
import Activity3Form from '@/components/surveys/Activity3Form'
import { submitResponse } from '@/lib/supabase'

function SurveyContent() {
  const params = useSearchParams()
  const router = useRouter()
  const session = params.get('session') || ''
  const activity = parseInt(params.get('activity') || '1')

  const [studentName, setStudentName] = useState('')
  const [step, setStep] = useState<'name' | 'form' | 'done'>('name')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(formData: Record<string, unknown>) {
    setSubmitting(true)
    setError('')
    try {
      await submitResponse({
        session_code: session,
        activity_id: activity,
        student_name: studentName || 'Anónimo',
        ...formData,
      })
      setStep('done')
    } catch (e) {
      setError('Hubo un error al guardar. Verifica tu conexión.')
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  const activityTitles: Record<number, string> = {
    1: '🏷️ El juego de las etiquetas',
    2: '📍 Agrúpate',
    3: '🔎 ¿Qué le preguntarías?',
  }

  return (
    <main style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <header style={{ background: '#0D0D0D', padding: '0.9rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8', fontSize: '1.1rem' }}>🔍 Detectives de Datos</span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#E8C547', letterSpacing: '0.1em' }}>
          SESIÓN: {session}
        </div>
      </header>

      <div style={{ maxWidth: 620, margin: '0 auto', padding: '2.5rem 1.5rem' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#8A8578' }}>
          <span>Actividad {activity}</span>
          <span>›</span>
          <span style={{ color: '#0D0D0D' }}>{activityTitles[activity]}</span>
        </div>

        {step === 'name' && (
          <div className="animate-fade-up">
            <div className="label-tag" style={{ marginBottom: '1rem' }}>Antes de comenzar</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.5rem' }}>
              ¿Cómo te llamas?
            </h1>
            <p style={{ color: '#8A8578', marginBottom: '2rem' }}>
              Puedes usar un apodo o nombre ficticio. Solo se usa para identificar tu punto en las visualizaciones.
            </p>
            <input
              className="input-field"
              placeholder="Tu nombre o apodo…"
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && setStep('form')}
              style={{ marginBottom: '1.2rem', fontSize: '1.1rem', padding: '0.8rem 1rem' }}
              autoFocus
            />
            <button className="btn-primary" onClick={() => setStep('form')} style={{ width: '100%' }}>
              Comenzar encuesta →
            </button>
          </div>
        )}

        {step === 'form' && (
          <div className="animate-fade-up">
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="label-tag" style={{ marginBottom: '0.5rem' }}>
                {studentName || 'Anónimo'}
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem' }}>
                {activityTitles[activity]}
              </h2>
            </div>

            {activity === 1 && <Activity1Form onSubmit={handleSubmit} submitting={submitting} />}
            {activity === 2 && <Activity2Form onSubmit={handleSubmit} submitting={submitting} />}
            {activity === 3 && <Activity3Form onSubmit={handleSubmit} submitting={submitting} />}

            {error && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--suspect)', marginTop: '1rem' }}>
                ⚠ {error}
              </p>
            )}
          </div>
        )}

        {step === 'done' && (
          <div className="animate-fade-up" style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.75rem' }}>
              ¡Respuestas guardadas!
            </h2>
            <p style={{ color: '#8A8578', marginBottom: '2rem', lineHeight: 1.7 }}>
              Tus datos ya hacen parte de la investigación.<br />
              El profesor los mostrará en el tablero en un momento.
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', background: '#0D0D0D', color: '#E8C547', display: 'inline-block', padding: '0.75rem 1.5rem', letterSpacing: '0.12em' }}>
              CASO EN PROGRESO<span className="blink">_</span>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}

export default function EncuestaPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', fontFamily: 'var(--font-mono)' }}>Cargando…</div>}>
      <SurveyContent />
    </Suspense>
  )
}
