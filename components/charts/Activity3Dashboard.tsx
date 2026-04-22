'use client'
import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { StudentResponse } from '@/lib/supabase'
import { buildCorrelationMatrix, getVotedVariables } from '@/lib/analytics'

interface Props { responses: StudentResponse[] }

function correlationColor(r: number): string {
  const abs = Math.abs(r)
  if (r > 0) return `rgba(91,166,106,${0.2 + abs * 0.8})`
  return `rgba(196,97,74,${0.2 + abs * 0.8})`
}

export default function Activity3Dashboard({ responses }: Props) {
  const correlations = useMemo(() => buildCorrelationMatrix(responses), [responses])
  const votedVars = useMemo(() => getVotedVariables(responses), [responses])
  const reasonsList = useMemo(
    () => responses.filter(r => r.a3_razon_eleccion && r.a3_razon_eleccion.length > 5).map(r => ({ name: r.student_name || 'Anónimo', razon: r.a3_razon_eleccion!, vars: r.a3_variables_elegidas || [] })),
    [responses]
  )

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#E8C547', letterSpacing: '0.12em', marginBottom: '0.3rem' }}>ACTIVIDAD 3</div>
        <h2 style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8', fontSize: '1.8rem' }}>¿Qué le preguntarías?</h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#8A8578', marginTop: '0.3rem' }}>
          {responses.length} estudiantes · Intuición para PCA
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>

        {/* Variables más votadas */}
        <div style={{ background: 'rgba(245,240,232,0.04)', border: '1px solid #222', padding: '1.2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#E8C547', marginBottom: '1rem' }}>
            Variables más elegidas por el grupo
          </h3>
          {votedVars.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#555' }}>Sin datos aún.</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={votedVars.slice(0, 8)} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                  <XAxis type="number" tick={{ fontFamily: 'IBM Plex Mono', fontSize: 10, fill: '#555' }} />
                  <YAxis type="category" dataKey="name" tick={{ fontFamily: 'IBM Plex Mono', fontSize: 10, fill: '#8A8578' }} width={80} />
                  <Tooltip
                    content={({ active, payload, label }) => active && payload?.length ? (
                      <div style={{ background: '#1a1a1a', border: '1px solid #333', padding: '0.6rem 0.9rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#F5F0E8' }}>
                        <p style={{ color: '#5BA56A' }}>{label}</p>
                        <p>{payload[0].value} votos · {(payload[0].payload as { percentage: number }).percentage}%</p>
                      </div>
                    ) : null}
                  />
                  <Bar dataKey="count">
                    {votedVars.slice(0, 8).map((_, i) => <Cell key={i} fill={i < 2 ? '#5BA56A' : '#4A7FA5'} fillOpacity={i < 2 ? 1 : 0.5} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#555' }}>
                💡 Las barras verdes son las más votadas — ¿coinciden con las que tienen mayor correlación?
              </div>
            </>
          )}
        </div>

        {/* Correlaciones */}
        <div style={{ background: 'rgba(245,240,232,0.04)', border: '1px solid #222', padding: '1.2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#E8C547', marginBottom: '1rem' }}>
            Correlaciones entre variables numéricas
          </h3>
          {correlations.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#555' }}>Necesitas más datos para calcular correlaciones.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {correlations.slice(0, 10).map(c => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#8A8578', minWidth: 140, flexShrink: 0 }}>{c.label}</span>
                  <div style={{ flex: 1, height: 20, background: '#1a1a1a', position: 'relative', overflow: 'hidden' }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: c.correlation >= 0 ? '50%' : `${50 + c.correlation * 50}%`,
                      width: `${Math.abs(c.correlation) * 50}%`,
                      background: correlationColor(c.correlation),
                    }} />
                    <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: '#333' }} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700,
                    color: Math.abs(c.correlation) > 0.5 ? (c.correlation > 0 ? '#5BA56A' : '#C4614A') : '#555',
                    minWidth: 42, textAlign: 'right',
                  }}>
                    {c.correlation > 0 ? '+' : ''}{c.correlation}
                  </span>
                </div>
              ))}
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#555' }}>
                <span><span style={{ color: '#C4614A' }}>■</span> Negativa</span>
                <span><span style={{ color: '#5BA56A' }}>■</span> Positiva</span>
                <span>±1 = perfecta, 0 = sin relación</span>
              </div>
            </div>
          )}
        </div>

        {/* Razones escritas */}
        <div style={{ background: 'rgba(245,240,232,0.04)', border: '1px solid #222', padding: '1.2rem', gridColumn: '1 / -1' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#E8C547', marginBottom: '1rem' }}>
            ¿Por qué eligieron esas variables? — Respuestas del grupo
          </h3>
          {reasonsList.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#555' }}>Ningún estudiante escribió una razón aún.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem' }}>
              {reasonsList.map((r, i) => (
                <div key={i} style={{ background: 'rgba(245,240,232,0.03)', border: '1px solid #2a2a2a', padding: '0.8rem', borderLeft: '3px solid #5BA56A' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#8A8578' }}>{r.name}</span>
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      {r.vars.map(v => (
                        <span key={v} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', background: 'rgba(91,166,106,0.15)', color: '#5BA56A', padding: '0.1rem 0.4rem', border: '1px solid rgba(91,166,106,0.3)' }}>
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#C8C2B5', lineHeight: 1.5, fontStyle: 'italic' }}>
                    "{r.razon}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <div style={{ marginTop: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#555', background: 'rgba(245,240,232,0.03)', border: '1px solid #222', padding: '0.8rem 1rem' }}>
        💡 PCA hace exactamente esto de forma matemática: identifica cuáles variables "se parecen" (alta correlación) y las fusiona en una sola. Las más votadas por el grupo, ¿tienen alta correlación entre sí?
      </div>
    </div>
  )
}
