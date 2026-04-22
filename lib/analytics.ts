import { StudentResponse } from './supabase'

// =============================================
// ACTIVIDAD 1 — Análisis de contingencia
// =============================================

export interface ContingencyData {
  rowVar: string
  colVar: string
  matrix: Record<string, Record<string, number>>
  rowTotals: Record<string, number>
  colTotals: Record<string, number>
  grandTotal: number
}

export function buildContingencyTable(
  responses: StudentResponse[],
  varA: keyof StudentResponse,
  varB: keyof StudentResponse
): ContingencyData {
  const matrix: Record<string, Record<string, number>> = {}
  const rowTotals: Record<string, number> = {}
  const colTotals: Record<string, number> = {}
  let grandTotal = 0

  for (const r of responses) {
    const a = String(r[varA] || 'N/A')
    const b = String(r[varB] || 'N/A')

    if (!matrix[a]) matrix[a] = {}
    matrix[a][b] = (matrix[a][b] || 0) + 1
    rowTotals[a] = (rowTotals[a] || 0) + 1
    colTotals[b] = (colTotals[b] || 0) + 1
    grandTotal++
  }

  return { rowVar: String(varA), colVar: String(varB), matrix, rowTotals, colTotals, grandTotal }
}

export interface BarChartData {
  name: string
  count: number
  percentage: number
}

export function getFrequencyData(responses: StudentResponse[], variable: keyof StudentResponse): BarChartData[] {
  const counts: Record<string, number> = {}
  for (const r of responses) {
    const val = String(r[variable] || 'N/A')
    counts[val] = (counts[val] || 0) + 1
  }
  const total = responses.length
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count, percentage: Math.round((count / total) * 100) }))
    .sort((a, b) => b.count - a.count)
}

// =============================================
// ACTIVIDAD 2 — K-means simplificado
// =============================================

export interface Point2D {
  x: number
  y: number
  label?: string
  cluster?: number
  studentName?: string
}

export interface KMeansResult {
  points: Point2D[]
  centroids: Point2D[]
  iterations: number
}

function euclidean(a: Point2D, b: Point2D) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

export function runKMeans(points: Point2D[], k: number, maxIter = 20): KMeansResult {
  if (points.length < k) return { points, centroids: [], iterations: 0 }

  // Inicializar centroides aleatoriamente desde puntos existentes
  const shuffled = [...points].sort(() => Math.random() - 0.5)
  let centroids: Point2D[] = shuffled.slice(0, k).map((p, i) => ({ ...p, cluster: i }))

  let assigned = points.map(p => ({ ...p, cluster: 0 }))
  let iterations = 0

  for (let iter = 0; iter < maxIter; iter++) {
    iterations++
    // Asignar cada punto al centroide más cercano
    const newAssigned = assigned.map(p => {
      let minDist = Infinity
      let nearest = 0
      centroids.forEach((c, i) => {
        const d = euclidean(p, c)
        if (d < minDist) { minDist = d; nearest = i }
      })
      return { ...p, cluster: nearest }
    })

    // Calcular nuevos centroides
    const newCentroids = centroids.map((_, i) => {
      const clusterPoints = newAssigned.filter(p => p.cluster === i)
      if (clusterPoints.length === 0) return centroids[i]
      return {
        x: clusterPoints.reduce((s, p) => s + p.x, 0) / clusterPoints.length,
        y: clusterPoints.reduce((s, p) => s + p.y, 0) / clusterPoints.length,
        cluster: i
      }
    })

    // Verificar convergencia
    const converged = newCentroids.every((c, i) => euclidean(c, centroids[i]) < 0.001)
    assigned = newAssigned
    centroids = newCentroids
    if (converged) break
  }

  return { points: assigned, centroids, iterations }
}

export function getScatterData(
  responses: StudentResponse[],
  xVar: keyof StudentResponse,
  yVar: keyof StudentResponse
): Point2D[] {
  return responses
    .filter(r => r[xVar] != null && r[yVar] != null)
    .map(r => ({
      x: Number(r[xVar]),
      y: Number(r[yVar]),
      studentName: r.student_name || 'Anónimo',
    }))
}

// =============================================
// ACTIVIDAD 3 — Correlaciones para intuir PCA
// =============================================

export interface CorrelationEntry {
  varA: string
  varB: string
  correlation: number
  label: string
}

export function pearsonCorrelation(xs: number[], ys: number[]): number {
  const n = xs.length
  if (n < 2) return 0
  const meanX = xs.reduce((a, b) => a + b, 0) / n
  const meanY = ys.reduce((a, b) => a + b, 0) / n
  const num = xs.reduce((s, x, i) => s + (x - meanX) * (ys[i] - meanY), 0)
  const denX = Math.sqrt(xs.reduce((s, x) => s + (x - meanX) ** 2, 0))
  const denY = Math.sqrt(ys.reduce((s, y) => s + (y - meanY) ** 2, 0))
  if (denX === 0 || denY === 0) return 0
  return num / (denX * denY)
}

const A3_VARS: Array<{ key: keyof StudentResponse; label: string }> = [
  { key: 'a3_altura', label: 'Altura' },
  { key: 'a3_peso', label: 'Peso' },
  { key: 'a3_edad', label: 'Edad' },
  { key: 'a3_ingresos_mensuales', label: 'Ingresos' },
  { key: 'a3_horas_trabajo', label: 'Hrs trabajo' },
]

export function buildCorrelationMatrix(responses: StudentResponse[]): CorrelationEntry[] {
  const result: CorrelationEntry[] = []
  for (let i = 0; i < A3_VARS.length; i++) {
    for (let j = i + 1; j < A3_VARS.length; j++) {
      const varA = A3_VARS[i]
      const varB = A3_VARS[j]
      const pairs = responses.filter(r => r[varA.key] != null && r[varB.key] != null)
      const xs = pairs.map(r => Number(r[varA.key]))
      const ys = pairs.map(r => Number(r[varB.key]))
      const correlation = pearsonCorrelation(xs, ys)
      result.push({ varA: varA.label, varB: varB.label, correlation: Math.round(correlation * 100) / 100, label: `${varA.label} vs ${varB.label}` })
    }
  }
  return result.sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation))
}

export function getVotedVariables(responses: StudentResponse[]): BarChartData[] {
  const counts: Record<string, number> = {}
  for (const r of responses) {
    if (Array.isArray(r.a3_variables_elegidas)) {
      for (const v of r.a3_variables_elegidas) {
        counts[v] = (counts[v] || 0) + 1
      }
    }
  }
  const total = responses.length
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count, percentage: Math.round((count / total) * 100) }))
    .sort((a, b) => b.count - a.count)
}
