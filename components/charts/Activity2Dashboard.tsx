'use client'
import { useState, useMemo } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { StudentResponse } from '@/lib/supabase'
import { getScatterData, runKMeans } from '@/lib/analytics'

interface Props { responses: StudentResponse[] }

const AXIS_OPTIONS: Array<{ key: keyof StudentResponse; label: string; unit: string }> = [
  { key: 'a2_horas_sueno', label: 'Horas de sueño', unit: 'h' },
  { key: 'a2_tazas_cafe', label: 'Tazas de café', unit: 'tazas' },
  { key: 'a2_horas_ejercicio', label: 'Horas de ejercicio', unit: 'h/sem' },
  { key: 'a2_horas_pantalla', label: 'Horas de pantalla', unit: 'h' },
  { key: 'a2_horas_estudio', label: 'Horas de estudio', unit: 'h' },
  { key: 'a2_minutos_transporte', label: 'Min. transporte', unit: 'min' },
]

const CLUSTER_COLORS = ['#4A7FA5', '#C4614A', '#5BA56A', '#E8C547']

export default function Activity2Dashboard({ responses }: Props) {
  const [xVar, setXVar] = useState<keyof StudentResponse>('a2_horas_sueno')
  const [yVar, setYVar] = useState<keyof StudentResponse>('a2_tazas_cafe')
  const [k, setK] = useState(3)
  const [showClusters, setShowClusters] = useState(false)

  const rawPoints = useMemo(() => getScatterData(responses, xVar, yVar), [responses, xVar, yVar])
  const kmeansResult = useMemo(() => runKMeans(rawPoints, k), [rawPoints, k])

  const displayPoints = showClusters ? kmeansResult.points : rawPoints

  const xLabel = AXIS_OPTIONS.find(o => o.key === xVar)?.label || ''
  const yLabel = AXIS_OPTIONS.find(o => o.key === yVar)?.label || ''

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#E8C547', letterSpacing: '0.12em', marginBottom: '0.3rem' }}>ACTIVIDAD 2</div>
        <h2 style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8', fontSize: '1.8rem' }}>Agrúpate</h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#8A8578', marginTop: '0.3rem' }}>
          {responses.length} puntos · Clustering K-means
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* X axis */}
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#8A8578', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.5rem' }}>
            Eje X →
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {AXIS_OPTIONS.map(o => (
              <button
                key={String(o.key)}
                onClick={() => o.key !== yVar && setXVar(o.key)}
                disabled={o.key === yVar}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textAlign: 'left', padding: '0.4rem 0.7rem',
                  background: xVar === o.key ? '#4A7FA5' : 'rgba(245,240,232,0.04)',
                  color: xVar === o.key ? 'white' : o.key === yVar ? '#333' : '#8A8578',
                  border: `1px solid ${xVar === o.key ? '#4A7FA5' : '#222'}`,
                  cursor: o.key === yVar ? 'not-allowed' : 'pointer',
                }}
              >
                {o.label} ({o.unit})
              </button>
            ))}
          </div>
        </div>

        {/* Y axis */}
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#8A8578', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.5rem' }}>
            Eje Y ↑
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {AXIS_OPTIONS.map(o => (
              <button
                key={String(o.key)}
                onClick={() => o.key !== xVar && setYVar(o.key)}
                disabled={o.key === xVar}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textAlign: 'left', padding: '0.4rem 0.7rem',
                  background: yVar === o.key ? '#C4614A' : 'rgba(245,240,232,0.04)',
                  color: yVar === o.key ? 'white' : o.key === xVar ? '#333' : '#8A8578',
                  border: `1px solid ${yVar === o.key ? '#C4614A' : '#222'}`,
                  cursor: o.key === xVar ? 'not-allowed' : 'pointer',
                }}
              >
                {o.label} ({o.unit})
              </button>
            ))}
          </div>
        </div>

        {/* K-means settings */}
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#8A8578', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.5rem' }}>
            Configuración k-means
          </label>
          <div style={{ background: 'rgba(245,240,232,0.04)', border: '1px solid #222', padding: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#F5F0E8' }}>k = número de grupos</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: '#E8C547', fontWeight: 700 }}>{k}</span>
              </div>
              <input
                type="range" min={2} max={5} value={k}
                onChange={e => setK(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#555', marginTop: '0.2rem' }}>
                <span>2</span><span>5</span>
              </div>
            </div>

            <button
              onClick={() => setShowClusters(v => !v)}
              style={{
                width: '100%', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em',
                padding: '0.6rem', cursor: 'pointer',
                background: showClusters ? '#E8C547' : 'transparent',
                color: showClusters ? '#0D0D0D' : '#8A8578',
                border: `1px solid ${showClusters ? '#E8C547' : '#555'}`,
                transition: 'all 0.2s',
              }}
            >
              {showClusters ? '✓ Clusters activos' : 'Activar clusters'}
            </button>

            {showClusters && (
              <div style={{ marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#555', lineHeight: 1.6 }}>
                Convergió en {kmeansResult.iterations} iteraciones
              </div>
            )}
          </div>

          {showClusters && (
            <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {Array.from({ length: k }, (_, i) => {
                const count = kmeansResult.points.filter(p => p.cluster === i).length
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: CLUSTER_COLORS[i] }} />
                    <span style={{ color: '#8A8578' }}>Grupo {i + 1}:</span>
                    <span style={{ color: CLUSTER_COLORS[i] }}>{count} estudiantes</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Scatter plot */}
      <div style={{ background: 'rgba(245,240,232,0.04)', border: '1px solid #222', padding: '1.5rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#555', marginBottom: '1rem' }}>
          {xLabel} vs. {yLabel} · {displayPoints.length} puntos
        </p>
        <ResponsiveContainer width="100%" height={380}>
          <ScatterChart margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
            <XAxis dataKey="x" type="number" name={xLabel} tick={{ fontFamily: 'IBM Plex Mono', fontSize: 11, fill: '#555' }} label={{ value: xLabel, position: 'insideBottom', offset: -5, fill: '#8A8578', fontFamily: 'IBM Plex Mono', fontSize: 11 }} />
            <YAxis dataKey="y" type="number" name={yLabel} tick={{ fontFamily: 'IBM Plex Mono', fontSize: 11, fill: '#555' }} label={{ value: yLabel, angle: -90, position: 'insideLeft', offset: 15, fill: '#8A8578', fontFamily: 'IBM Plex Mono', fontSize: 11 }} />
            <Tooltip
              cursor={{ strokeDasharray: '3 3', stroke: '#333' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload
                  return (
                    <div style={{ background: '#1a1a1a', border: '1px solid #333', padding: '0.6rem 0.9rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#F5F0E8' }}>
                      <p style={{ color: '#E8C547', marginBottom: '0.3rem' }}>{d.studentName}</p>
                      <p>{xLabel}: {d.x}</p>
                      <p>{yLabel}: {d.y}</p>
                      {showClusters && <p style={{ color: CLUSTER_COLORS[d.cluster] }}>Grupo {d.cluster + 1}</p>}
                    </div>
                  )
                }
                return null
              }}
            />
            <Scatter data={displayPoints} shape={(props: { cx?: number; cy?: number; payload?: { cluster?: number } }) => {
              const { cx = 0, cy = 0, payload } = props
              const color = showClusters && payload?.cluster !== undefined ? CLUSTER_COLORS[payload.cluster % CLUSTER_COLORS.length] : '#4A7FA5'
              return <circle cx={cx} cy={cy} r={8} fill={color} fillOpacity={0.8} stroke={color} strokeWidth={1} />
            }} />
            {showClusters && kmeansResult.centroids.map((c, i) => (
              <Scatter
                key={`centroid-${i}`}
                data={[c]}
                shape={(props: { cx?: number; cy?: number }) => {
                  const { cx = 0, cy = 0 } = props
                  return (
                    <g>
                      <circle cx={cx} cy={cy} r={16} fill="none" stroke={CLUSTER_COLORS[i]} strokeWidth={2} strokeDasharray="4 2" />
                      <text x={cx} y={cy + 4} textAnchor="middle" fill={CLUSTER_COLORS[i]} fontSize={10} fontFamily="IBM Plex Mono">C{i+1}</text>
                    </g>
                  )
                }}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#555', background: 'rgba(245,240,232,0.03)', border: '1px solid #222', padding: '0.8rem 1rem' }}>
        💡 Cambia los ejes para explorar distintas combinaciones. Prueba distintos valores de k — ¿cuándo los grupos dejan de tener sentido?
      </div>
    </div>
  )
}
