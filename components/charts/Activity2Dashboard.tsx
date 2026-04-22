'use client'
import { useState, useMemo } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { StudentResponse } from '@/lib/supabase'
import { runKMeansMultiDim, A2_VARS } from '@/lib/analytics'

interface Props { responses: StudentResponse[] }

const CLUSTER_COLORS = ['#4A7FA5', '#C4614A', '#5BA56A', '#E8C547', '#8A5BA5']

export default function Activity2Dashboard({ responses }: Props) {
  const [selectedVars, setSelectedVars] = useState<Array<keyof StudentResponse>>([
    'a2_horas_sueno', 'a2_tazas_cafe'
  ])
  const [k, setK] = useState(3)
  const [showClusters, setShowClusters] = useState(false)

  function toggleVar(key: keyof StudentResponse) {
    setSelectedVars(prev =>
      prev.includes(key)
        ? prev.length > 1 ? prev.filter(v => v !== key) : prev
        : [...prev, key]
    )
  }

  const result = useMemo(
    () => runKMeansMultiDim(responses, selectedVars, k),
    [responses, selectedVars, k]
  )

  const isMultiDim = selectedVars.length > 2
  const clusterCounts = Array.from({ length: k }, (_, i) =>
    result.points.filter(p => p.cluster === i).length
  )

  const xAxisLabel = isMultiDim
    ? 'Componente principal 1 (PC1)'
    : (A2_VARS.find(v => v.key === selectedVars[0])?.label || '')
  const yAxisLabel = isMultiDim
    ? 'Componente principal 2 (PC2)'
    : (A2_VARS.find(v => v.key === selectedVars[1])?.label || '')

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#E8C547', letterSpacing: '0.12em', marginBottom: '0.3rem' }}>ACTIVIDAD 2</div>
        <h2 style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8', fontSize: '1.8rem' }}>Agrúpate</h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#8A8578', marginTop: '0.3rem' }}>
          {responses.length} puntos · K-means {isMultiDim ? `${selectedVars.length}D → proyección PCA 2D` : '2D directo'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>

        {/* SCATTER PLOT */}
        <div>
          {isMultiDim ? (
            <div style={{ background: 'rgba(232,197,71,0.08)', border: '1px solid rgba(232,197,71,0.25)', padding: '0.65rem 1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.1rem' }}>🔬</span>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#E8C547', display: 'block' }}>
                  K-means corriendo en {selectedVars.length} dimensiones simultáneamente
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#8A8578' }}>
                  PCA comprime el resultado a 2D para visualizarlo
                  {result.varianceExplained != null && ` · ${result.varianceExplained}% varianza capturada`}
                </span>
              </div>
            </div>
          ) : (
            <div style={{ background: 'rgba(74,127,165,0.07)', border: '1px solid rgba(74,127,165,0.2)', padding: '0.65rem 1rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#4A7FA5' }}>
                📍 Modo 2D — cada eje es directamente una variable. Selecciona 3+ para modo vectorial.
              </span>
            </div>
          )}

          <div style={{ background: 'rgba(245,240,232,0.04)', border: '1px solid #222', padding: '1.2rem' }}>
            <ResponsiveContainer width="100%" height={420}>
              <ScatterChart margin={{ top: 15, right: 20, left: -10, bottom: 35 }}>
                <XAxis
                  dataKey="x" type="number" name={xAxisLabel}
                  tick={{ fontFamily: 'IBM Plex Mono', fontSize: 10, fill: '#555' }}
                  label={{ value: xAxisLabel, position: 'insideBottom', offset: -18, fill: '#8A8578', fontFamily: 'IBM Plex Mono', fontSize: 10 }}
                />
                <YAxis
                  dataKey="y" type="number" name={yAxisLabel}
                  tick={{ fontFamily: 'IBM Plex Mono', fontSize: 10, fill: '#555' }}
                  label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', offset: 18, fill: '#8A8578', fontFamily: 'IBM Plex Mono', fontSize: 10 }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3', stroke: '#333' }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null
                    const d = payload[0].payload
                    return (
                      <div style={{ background: '#1a1a1a', border: '1px solid #333', padding: '0.7rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#F5F0E8', maxWidth: 240 }}>
                        <p style={{ color: '#E8C547', marginBottom: '0.4rem', fontWeight: 700 }}>{d.studentName}</p>
                        {showClusters && (
                          <p style={{ color: CLUSTER_COLORS[d.cluster % CLUSTER_COLORS.length], marginBottom: '0.4rem' }}>
                            ● Grupo {d.cluster + 1}
                          </p>
                        )}
                        {d.originalVec && (
                          <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: '0.4rem', marginTop: '0.4rem' }}>
                            {selectedVars.map((v, i) => {
                              const meta = A2_VARS.find(a => a.key === v)
                              return (
                                <p key={String(v)} style={{ color: '#8A8578', fontSize: '0.7rem', marginBottom: '0.15rem' }}>
                                  {meta?.label}: <span style={{ color: '#F5F0E8' }}>{d.originalVec[i]} {meta?.unit}</span>
                                </p>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  }}
                />

                <Scatter
                  data={result.points}
                  shape={(props: { cx?: number; cy?: number; payload?: { cluster?: number } }) => {
                    const { cx = 0, cy = 0, payload } = props
                    const color = showClusters && payload?.cluster !== undefined
                      ? CLUSTER_COLORS[payload.cluster % CLUSTER_COLORS.length]
                      : '#4A7FA5'
                    return <circle cx={cx} cy={cy} r={9} fill={color} fillOpacity={0.8} stroke="none" />
                  }}
                />

                {showClusters && result.centroids.map((c, i) => (
                  <Scatter
                    key={`c-${i}`}
                    data={[c]}
                    shape={(props: { cx?: number; cy?: number }) => {
                      const { cx = 0, cy = 0 } = props
                      return (
                        <g>
                          <circle cx={cx} cy={cy} r={22} fill="none" stroke={CLUSTER_COLORS[i]} strokeWidth={2} strokeDasharray="5 3" opacity={0.6} />
                          <circle cx={cx} cy={cy} r={4} fill={CLUSTER_COLORS[i]} />
                          <text x={cx + 16} y={cy - 12} fill={CLUSTER_COLORS[i]} fontSize={11} fontFamily="IBM Plex Mono" fontWeight="bold">G{i+1}</text>
                        </g>
                      )
                    }}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div style={{ marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#555', background: 'rgba(245,240,232,0.02)', border: '1px solid #1e1e1e', padding: '0.7rem 1rem' }}>
            {isMultiDim
              ? `💡 Los clusters se calcularon en ${selectedVars.length} dimensiones — son matemáticamente precisos. PCA aplana el resultado para verlo, por eso algunos puntos parecen estar en el grupo "equivocado" visualmente.`
              : '💡 Activa 3 o más variables para que el algoritmo trabaje en alta dimensión. Verás cómo PCA proyecta ese espacio a 2D para poder visualizarlo.'}
          </div>
        </div>

        {/* PANEL DERECHO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Variable selector */}
          <div style={{ background: 'rgba(245,240,232,0.04)', border: '1px solid #222', padding: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#8A8578', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              Variables ({selectedVars.length} activas)
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {A2_VARS.map(v => {
                const active = selectedVars.includes(v.key)
                return (
                  <button
                    key={String(v.key)}
                    onClick={() => toggleVar(v.key)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                      padding: '0.5rem 0.75rem', cursor: 'pointer', textAlign: 'left',
                      background: active ? 'rgba(232,197,71,0.1)' : 'rgba(245,240,232,0.02)',
                      border: `1px solid ${active ? '#E8C547' : '#2a2a2a'}`,
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{
                      width: 14, height: 14, borderRadius: 2, flexShrink: 0,
                      background: active ? '#E8C547' : 'transparent',
                      border: `2px solid ${active ? '#E8C547' : '#555'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {active && <span style={{ fontSize: 9, color: '#0D0D0D', fontWeight: 900, lineHeight: 1 }}>✓</span>}
                    </div>
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.73rem', color: active ? '#F5F0E8' : '#555', display: 'block' }}>
                        {v.label}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.63rem', color: '#444' }}>{v.unit}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {isMultiDim && (
              <div style={{ marginTop: '0.6rem', padding: '0.4rem 0.6rem', background: 'rgba(232,197,71,0.06)', border: '1px solid rgba(232,197,71,0.15)', fontFamily: 'var(--font-mono)', fontSize: '0.67rem', color: '#E8C547' }}>
                Modo vectorial {selectedVars.length}D activo
              </div>
            )}
          </div>

          {/* K slider + clusters */}
          <div style={{ background: 'rgba(245,240,232,0.04)', border: '1px solid #222', padding: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#8A8578', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              Configuración
            </p>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#F5F0E8' }}>k = número de grupos</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', color: '#E8C547', fontWeight: 700, lineHeight: 1 }}>{k}</span>
              </div>
              <input type="range" min={2} max={5} value={k} onChange={e => setK(parseInt(e.target.value))} style={{ width: '100%', cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.63rem', color: '#444', marginTop: '0.15rem' }}>
                <span>2</span><span>5</span>
              </div>
            </div>

            <button
              onClick={() => setShowClusters(v => !v)}
              style={{
                width: '100%', fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.65rem',
                cursor: 'pointer', transition: 'all 0.2s',
                background: showClusters ? '#E8C547' : 'transparent',
                color: showClusters ? '#0D0D0D' : '#8A8578',
                border: `1px solid ${showClusters ? '#E8C547' : '#444'}`,
              }}
            >
              {showClusters ? '✓ Clusters activos' : 'Activar clusters'}
            </button>

            {showClusters && (
              <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {Array.from({ length: k }, (_, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.35rem 0.6rem', background: `${CLUSTER_COLORS[i]}11`, border: `1px solid ${CLUSTER_COLORS[i]}33` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: 9, height: 9, borderRadius: '50%', background: CLUSTER_COLORS[i] }} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#8A8578' }}>Grupo {i + 1}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: CLUSTER_COLORS[i], fontWeight: 700 }}>
                      {clusterCounts[i]}
                    </span>
                  </div>
                ))}
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.67rem', color: '#444', marginTop: '0.2rem' }}>
                  Convergió en {result.iterations} iteraciones
                </p>
              </div>
            )}
          </div>

          {/* PCA variance info */}
          {isMultiDim && result.varianceExplained != null && (
            <div style={{ background: 'rgba(91,166,106,0.05)', border: '1px solid rgba(91,166,106,0.18)', padding: '1rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#5BA56A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
                Calidad de proyección PCA
              </p>
              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#8A8578' }}>Varianza capturada</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#5BA56A', fontWeight: 700 }}>{result.varianceExplained}%</span>
                </div>
                <div style={{ height: 5, background: '#1a1a1a' }}>
                  <div style={{
                    height: '100%',
                    width: `${result.varianceExplained}%`,
                    background: result.varianceExplained >= 75 ? '#5BA56A' : result.varianceExplained >= 50 ? '#E8C547' : '#C4614A',
                    transition: 'width 0.6s ease',
                  }} />
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.67rem', color: '#555', lineHeight: 1.55 }}>
                {result.varianceExplained >= 75
                  ? 'Alta fidelidad — el gráfico 2D representa bien la estructura real de los datos.'
                  : result.varianceExplained >= 50
                  ? 'Fidelidad moderada — el gráfico captura parte de la historia.'
                  : 'Baja fidelidad — hay mucha información que el 2D no puede mostrar. Los clusters siguen siendo válidos.'}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
