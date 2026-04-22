'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { StudentResponse } from '@/lib/supabase'
import { buildContingencyTable, getFrequencyData } from '@/lib/analytics'

interface Props { responses: StudentResponse[] }

const VARS: Array<{ key: keyof StudentResponse; label: string }> = [
  { key: 'a1_transporte', label: 'Transporte' },
  { key: 'a1_mascota', label: 'Mascota' },
  { key: 'a1_genero_musical', label: 'Música' },
  { key: 'a1_comida_favorita', label: 'Comida' },
  { key: 'a1_red_social', label: 'Red social' },
  { key: 'a1_ciudad', label: 'Ciudad' },
]

const COLORS = ['#4A7FA5', '#C4614A', '#5BA56A', '#E8C547', '#8A5BA5', '#A58A5B', '#5BABA5']

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#1a1a1a', border: '1px solid #333', padding: '0.6rem 0.9rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#F5F0E8' }}>
        <p style={{ color: '#E8C547', marginBottom: '0.2rem' }}>{label}</p>
        <p>{payload[0].value} respuestas</p>
      </div>
    )
  }
  return null
}

export default function Activity1Dashboard({ responses }: Props) {
  const [varA, setVarA] = useState<keyof StudentResponse>('a1_transporte')
  const [varB, setVarB] = useState<keyof StudentResponse>('a1_mascota')
  const [view, setView] = useState<'frecuencias' | 'contingencia'>('frecuencias')
  const [focusVar, setFocusVar] = useState<keyof StudentResponse>('a1_transporte')

  const freqData = useMemo(() => getFrequencyData(responses, focusVar), [responses, focusVar])
  const contingency = useMemo(() => buildContingencyTable(responses, varA, varB), [responses, varA, varB])

  const rowKeys = Object.keys(contingency.matrix)
  const colKeys = Object.keys(contingency.colTotals)

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#E8C547', letterSpacing: '0.12em', marginBottom: '0.3rem' }}>ACTIVIDAD 1</div>
        <h2 style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8', fontSize: '1.8rem' }}>El juego de las etiquetas</h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#8A8578', marginTop: '0.3rem' }}>
          {responses.length} estudiantes · Cruce de variables categóricas
        </p>
      </div>

      {/* View toggle */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {(['frecuencias', 'contingencia'] as const).map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em',
              padding: '0.5rem 1rem', cursor: 'pointer',
              background: view === v ? '#E8C547' : 'transparent',
              color: view === v ? '#0D0D0D' : '#8A8578',
              border: `1px solid ${view === v ? '#E8C547' : '#333'}`,
              transition: 'all 0.2s',
            }}
          >
            {v === 'frecuencias' ? '📊 Una variable' : '🔀 Cruce de variables'}
          </button>
        ))}
      </div>

      {view === 'frecuencias' && (
        <div>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {VARS.map(v => (
              <button
                key={String(v.key)}
                onClick={() => setFocusVar(v.key)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.72rem', padding: '0.35rem 0.8rem',
                  background: focusVar === v.key ? '#4A7FA5' : 'rgba(245,240,232,0.06)',
                  color: focusVar === v.key ? 'white' : '#8A8578',
                  border: `1px solid ${focusVar === v.key ? '#4A7FA5' : '#333'}`,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div style={{ background: 'rgba(245,240,232,0.04)', border: '1px solid #222', padding: '1.2rem', marginBottom: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#8A8578', marginBottom: '1rem' }}>
              Distribución: {VARS.find(v => v.key === focusVar)?.label}
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={freqData} margin={{ top: 5, right: 10, left: -10, bottom: 40 }}>
                <XAxis dataKey="name" tick={{ fontFamily: 'IBM Plex Mono', fontSize: 11, fill: '#8A8578' }} angle={-30} textAnchor="end" interval={0} />
                <YAxis tick={{ fontFamily: 'IBM Plex Mono', fontSize: 11, fill: '#8A8578' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={0}>
                  {freqData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.5rem' }}>
            {freqData.map((d, i) => (
              <div key={d.name} style={{ background: 'rgba(245,240,232,0.04)', border: '1px solid #222', padding: '0.75rem', borderLeft: `3px solid ${COLORS[i % COLORS.length]}` }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#8A8578', marginBottom: '0.2rem' }}>{d.name}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: COLORS[i % COLORS.length] }}>{d.percentage}%</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#555' }}>{d.count} estudiantes</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'contingencia' && (
        <div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {(['varA', 'varB'] as const).map((which, idx) => (
              <div key={which}>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#8A8578', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {idx === 0 ? 'Variable fila (↓)' : 'Variable columna (→)'}
                </label>
                <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                  {VARS.map(v => {
                    const current = which === 'varA' ? varA : varB
                    const other = which === 'varA' ? varB : varA
                    const isSelected = current === v.key
                    const isOther = other === v.key
                    return (
                      <button
                        key={String(v.key)}
                        disabled={isOther}
                        onClick={() => which === 'varA' ? setVarA(v.key) : setVarB(v.key)}
                        style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.72rem', padding: '0.3rem 0.7rem',
                          background: isSelected ? '#E8C547' : isOther ? 'rgba(245,240,232,0.02)' : 'rgba(245,240,232,0.06)',
                          color: isSelected ? '#0D0D0D' : isOther ? '#333' : '#8A8578',
                          border: `1px solid ${isSelected ? '#E8C547' : '#333'}`,
                          cursor: isOther ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {v.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contingency table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
              <thead>
                <tr>
                  <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', color: '#E8C547', borderBottom: '1px solid #333', background: 'rgba(232,197,71,0.08)' }}>
                    {VARS.find(v => v.key === varA)?.label} ↓ / {VARS.find(v => v.key === varB)?.label} →
                  </th>
                  {colKeys.map(c => (
                    <th key={c} style={{ padding: '0.6rem 0.8rem', color: '#4A7FA5', borderBottom: '1px solid #333', background: 'rgba(74,127,165,0.08)', textAlign: 'center' }}>{c}</th>
                  ))}
                  <th style={{ padding: '0.6rem 0.8rem', color: '#8A8578', borderBottom: '1px solid #333', textAlign: 'center' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {rowKeys.map((row, ri) => (
                  <tr key={row} style={{ background: ri % 2 === 0 ? 'rgba(245,240,232,0.02)' : 'transparent' }}>
                    <td style={{ padding: '0.6rem 0.8rem', color: '#E8C547', borderBottom: '1px solid #1a1a1a', fontWeight: 600 }}>{row}</td>
                    {colKeys.map(col => {
                      const count = contingency.matrix[row]?.[col] || 0
                      const pct = contingency.rowTotals[row] > 0 ? Math.round((count / contingency.rowTotals[row]) * 100) : 0
                      const intensity = count / Math.max(...Object.values(contingency.rowTotals))
                      return (
                        <td key={col} style={{ padding: '0.6rem 0.8rem', textAlign: 'center', borderBottom: '1px solid #1a1a1a', background: count > 0 ? `rgba(74,127,165,${intensity * 0.5})` : 'transparent', color: '#F5F0E8' }}>
                          {count > 0 ? (
                            <>
                              <span style={{ fontSize: '1rem', fontWeight: 700 }}>{count}</span>
                              <span style={{ display: 'block', fontSize: '0.65rem', color: '#8A8578' }}>{pct}%</span>
                            </>
                          ) : (
                            <span style={{ color: '#333' }}>—</span>
                          )}
                        </td>
                      )
                    })}
                    <td style={{ padding: '0.6rem 0.8rem', textAlign: 'center', borderBottom: '1px solid #1a1a1a', color: '#8A8578', fontSize: '0.85rem' }}>
                      {contingency.rowTotals[row]}
                    </td>
                  </tr>
                ))}
                <tr style={{ borderTop: '1px solid #444' }}>
                  <td style={{ padding: '0.6rem 0.8rem', color: '#8A8578', fontSize: '0.8rem' }}>Total</td>
                  {colKeys.map(col => (
                    <td key={col} style={{ padding: '0.6rem 0.8rem', textAlign: 'center', color: '#8A8578', fontSize: '0.8rem' }}>
                      {contingency.colTotals[col]}
                    </td>
                  ))}
                  <td style={{ padding: '0.6rem 0.8rem', textAlign: 'center', color: '#E8C547', fontWeight: 700 }}>
                    {contingency.grandTotal}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#555', background: 'rgba(245,240,232,0.03)', border: '1px solid #222', padding: '0.8rem 1rem' }}>
            💡 Las celdas más oscuras indican combinaciones frecuentes. ¿Hay algún patrón que te llame la atención?
          </div>
        </div>
      )}
    </div>
  )
}
