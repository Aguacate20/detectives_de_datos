'use client'
import { Suspense, useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { getSessionResponses, StudentResponse } from '@/lib/supabase'
import Activity1Dashboard from '@/components/charts/Activity1Dashboard'
import Activity2Dashboard from '@/components/charts/Activity2Dashboard'
import Activity3Dashboard from '@/components/charts/Activity3Dashboard'

function DashboardContent() {
  const params = useSearchParams()
  const session = params.get('session') || ''
  const initialActivity = parseInt(params.get('activity') || '1')

  const [activity, setActivity] = useState(initialActivity)
  const [responses, setResponses] = useState<StudentResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [lastFetch, setLastFetch] = useState<Date | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const data = await getSessionResponses(session, activity)
      setResponses(data)
      setLastFetch(new Date())
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [session, activity])

  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (!autoRefresh) return
    const interval = setInterval(fetchData, 8000)
    return () => clearInterval(interval)
  }, [autoRefresh, fetchData])

  const activityMeta = [
    { id: 1, emoji: '🏷️', label: 'Etiquetas', concept: 'Contingencia' },
    { id: 2, emoji: '📍', label: 'Agrúpate', concept: 'K-means' },
    { id: 3, emoji: '🔎', label: 'Preguntas', concept: 'PCA' },
  ]

  return (
    <main style={{ minHeight: '100vh', background: '#0D0D0D', color: '#F5F0E8' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(245,240,232,0.1)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>🔍 Detectives de Datos</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', background: '#E8C547', color: '#0D0D0D', padding: '0.15rem 0.6rem', letterSpacing: '0.12em' }}>
            PANEL PROFESOR
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#E8C547' }}>
            SESIÓN: {session}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: responses.length > 0 ? '#5BA56A' : '#8A8578' }}>
            {responses.length} respuestas
          </div>
          <button
            onClick={() => setAutoRefresh(v => !v)}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', background: 'transparent', color: autoRefresh ? '#5BA56A' : '#8A8578', border: `1px solid ${autoRefresh ? '#5BA56A' : '#8A8578'}`, padding: '0.3rem 0.7rem', cursor: 'pointer' }}
          >
            {autoRefresh ? '⟳ Auto' : '⏸ Pausado'}
          </button>
          <button onClick={fetchData} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', background: 'rgba(245,240,232,0.08)', color: '#F5F0E8', border: '1px solid rgba(245,240,232,0.2)', padding: '0.3rem 0.7rem', cursor: 'pointer' }}>
            Actualizar
          </button>
        </div>
      </header>

      {/* Activity switcher */}
      <div style={{ borderBottom: '1px solid rgba(245,240,232,0.1)', padding: '0 1.5rem', display: 'flex', gap: 0 }}>
        {activityMeta.map(a => (
          <button
            key={a.id}
            onClick={() => setActivity(a.id)}
            style={{
              padding: '0.85rem 1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              background: 'transparent',
              color: activity === a.id ? '#E8C547' : 'rgba(245,240,232,0.4)',
              border: 'none',
              borderBottom: activity === a.id ? '2px solid #E8C547' : '2px solid transparent',
              cursor: 'pointer',
              letterSpacing: '0.06em',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            {a.emoji} {a.label}
            <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>· {a.concept}</span>
          </button>
        ))}
      </div>

      {/* Main content */}
      <div style={{ padding: '1.5rem', maxWidth: 1200, margin: '0 auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem', fontFamily: 'var(--font-mono)', color: '#8A8578' }}>
            <div style={{ fontSize: '0.85rem', letterSpacing: '0.1em' }}>Cargando datos<span className="blink">_</span></div>
          </div>
        ) : responses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <h2 style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8', fontSize: '1.8rem', marginBottom: '0.75rem' }}>
              Esperando respuestas…
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#8A8578', lineHeight: 1.7 }}>
              Pide a los estudiantes que entren en:<br />
              <span style={{ color: '#E8C547' }}>esta-url.vercel.app/encuesta?session={session}&activity={activity}</span>
            </p>
          </div>
        ) : (
          <>
            {activity === 1 && <Activity1Dashboard responses={responses} />}
            {activity === 2 && <Activity2Dashboard responses={responses} />}
            {activity === 3 && <Activity3Dashboard responses={responses} />}
          </>
        )}

        {lastFetch && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'rgba(245,240,232,0.25)', textAlign: 'right', marginTop: '1.5rem' }}>
            Última actualización: {lastFetch.toLocaleTimeString('es-CO')}
          </p>
        )}
      </div>
    </main>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', fontFamily: 'var(--font-mono)', background: '#0D0D0D', color: '#F5F0E8', minHeight: '100vh' }}>Cargando panel…</div>}>
      <DashboardContent />
    </Suspense>
  )
}
