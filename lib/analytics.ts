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
// ACTIVIDAD 2 — K-means N-dimensional + PCA 2D
// =============================================

export interface Point2D {
  x: number
  y: number
  cluster?: number
  studentName?: string
  originalVec?: number[]   // vector original N-dim normalizado
}

export interface KMeansResult {
  points: Point2D[]
  centroids: Point2D[]
  iterations: number
  varianceExplained?: number  // % varianza explicada por los 2 componentes PCA
  isMultiDim: boolean
}

// --- Helpers vectoriales ---

function euclideanND(a: number[], b: number[]): number {
  return Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0))
}

function meanVec(vecs: number[][]): number[] {
  if (vecs.length === 0) return []
  const dim = vecs[0].length
  return Array.from({ length: dim }, (_, i) =>
    vecs.reduce((s, v) => s + v[i], 0) / vecs.length
  )
}

// Normalización z-score por columna (para que todas las variables pesen igual)
function zScoreNormalize(matrix: number[][]): { normalized: number[][]; means: number[]; stds: number[] } {
  const n = matrix.length
  const dim = matrix[0].length
  const means = Array.from({ length: dim }, (_, j) =>
    matrix.reduce((s, r) => s + r[j], 0) / n
  )
  const stds = Array.from({ length: dim }, (_, j) => {
    const variance = matrix.reduce((s, r) => s + (r[j] - means[j]) ** 2, 0) / n
    return Math.sqrt(variance) || 1
  })
  const normalized = matrix.map(row => row.map((v, j) => (v - means[j]) / stds[j]))
  return { normalized, means, stds }
}

// PCA manual: devuelve proyección 2D y varianza explicada
function pca2D(matrix: number[][]): { projected: Array<[number, number]>; varianceExplained: number } {
  const n = matrix.length
  const dim = matrix[0].length

  // Centrar
  const means = Array.from({ length: dim }, (_, j) =>
    matrix.reduce((s, r) => s + r[j], 0) / n
  )
  const centered = matrix.map(row => row.map((v, j) => v - means[j]))

  // Matriz de covarianza dim x dim
  const cov: number[][] = Array.from({ length: dim }, () => Array(dim).fill(0))
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      cov[i][j] = centered.reduce((s, row) => s + row[i] * row[j], 0) / (n - 1)
    }
  }

  // Power iteration para los 2 primeros eigenvectores
  function powerIterate(mat: number[][], deflate?: number[]): number[] {
    let v = Array.from({ length: dim }, () => Math.random() - 0.5)
    const norm = (u: number[]) => Math.sqrt(u.reduce((s, x) => s + x * x, 0))
    const normalize = (u: number[]) => { const n = norm(u); return u.map(x => x / n) }
    const matVec = (m: number[][], u: number[]) =>
      m.map(row => row.reduce((s, val, k) => s + val * u[k], 0))

    v = normalize(v)
    for (let iter = 0; iter < 100; iter++) {
      let w = matVec(mat, v)
      if (deflate) {
        const dot = w.reduce((s, x, i) => s + x * deflate[i], 0)
        w = w.map((x, i) => x - dot * deflate[i])
      }
      const newV = normalize(w)
      if (newV.reduce((s, x, i) => s + Math.abs(x - v[i]), 0) < 1e-8) break
      v = newV
    }
    return v
  }

  const pc1 = powerIterate(cov)
  const pc2 = powerIterate(cov, pc1)

  // Eigenvalores aproximados (varianza explicada)
  const matVec = (m: number[][], u: number[]) =>
    m.map(row => row.reduce((s, val, k) => s + val * u[k], 0))
  const dot = (a: number[], b: number[]) => a.reduce((s, x, i) => s + x * b[i], 0)

  const lambda1 = dot(matVec(cov, pc1), pc1)
  const lambda2 = dot(matVec(cov, pc2), pc2)
  const totalVar = cov.reduce((s, row, i) => s + row[i], 0)
  const varianceExplained = totalVar > 0 ? Math.round(((lambda1 + lambda2) / totalVar) * 100) : 0

  const projected: Array<[number, number]> = centered.map(row => [
    dot(row, pc1),
    dot(row, pc2),
  ])

  return { projected, varianceExplained }
}

// K-means en espacio N-dimensional
function kMeansND(vecs: number[][], k: number, maxIter = 30): { clusters: number[]; centroids: number[][]; iterations: number } {
  if (vecs.length < k) return { clusters: vecs.map(() => 0), centroids: [], iterations: 0 }

  const shuffled = [...vecs].sort(() => Math.random() - 0.5)
  let centroids = shuffled.slice(0, k).map(v => [...v])
  let clusters = vecs.map(() => 0)
  let iterations = 0

  for (let iter = 0; iter < maxIter; iter++) {
    iterations++
    const newClusters = vecs.map(v => {
      let minDist = Infinity
      let nearest = 0
      centroids.forEach((c, i) => {
        const d = euclideanND(v, c)
        if (d < minDist) { minDist = d; nearest = i }
      })
      return nearest
    })

    const newCentroids = centroids.map((_, i) => {
      const pts = vecs.filter((_, idx) => newClusters[idx] === i)
      return pts.length > 0 ? meanVec(pts) : centroids[i]
    })

    const converged = newCentroids.every((c, i) => euclideanND(c, centroids[i]) < 1e-6)
    clusters = newClusters
    centroids = newCentroids
    if (converged) break
  }

  return { clusters, centroids, iterations }
}

export const A2_VARS: Array<{ key: keyof StudentResponse; label: string; unit: string }> = [
  { key: 'a2_horas_sueno', label: 'Horas de sueño', unit: 'h' },
  { key: 'a2_tazas_cafe', label: 'Tazas de café', unit: 'tazas' },
  { key: 'a2_horas_ejercicio', label: 'Horas de ejercicio', unit: 'h/sem' },
  { key: 'a2_horas_pantalla', label: 'Horas de pantalla', unit: 'h' },
  { key: 'a2_horas_estudio', label: 'Horas de estudio', unit: 'h' },
  { key: 'a2_minutos_transporte', label: 'Min. transporte', unit: 'min' },
]

// Función principal: recibe respuestas y variables seleccionadas, devuelve puntos 2D con clusters
export function runKMeansMultiDim(
  responses: StudentResponse[],
  selectedVars: Array<keyof StudentResponse>,
  k: number
): KMeansResult {
  if (selectedVars.length === 0 || responses.length < k) {
    return { points: [], centroids: [], iterations: 0, isMultiDim: false }
  }

  // Filtrar filas con todos los valores presentes
  const valid = responses.filter(r => selectedVars.every(v => r[v] != null && !isNaN(Number(r[v]))))
  if (valid.length < k) return { points: [], centroids: [], iterations: 0, isMultiDim: false }

  const matrix = valid.map(r => selectedVars.map(v => Number(r[v])))
  const { normalized } = zScoreNormalize(matrix)

  const isMultiDim = selectedVars.length > 2

  // K-means en N dimensiones
  const { clusters, centroids: centroidVecs, iterations } = kMeansND(normalized, k)

  let points2D: Array<[number, number]>
  let centroidPts2D: Array<[number, number]>
  let varianceExplained: number | undefined

  if (isMultiDim) {
    // PCA para proyectar a 2D
    const allVecs = [...normalized, ...centroidVecs]
    const { projected, varianceExplained: ve } = pca2D(allVecs)
    varianceExplained = ve
    points2D = projected.slice(0, normalized.length) as Array<[number, number]>
    centroidPts2D = projected.slice(normalized.length) as Array<[number, number]>
  } else {
    // Con 2 variables, X e Y directamente (más intuitivo pedagógicamente)
    points2D = normalized.map(v => [v[0], v[1]])
    centroidPts2D = centroidVecs.map(v => [v[0], v[1]])
  }

  const points: Point2D[] = valid.map((r, i) => ({
    x: points2D[i][0],
    y: points2D[i][1],
    cluster: clusters[i],
    studentName: r.student_name || 'Anónimo',
    originalVec: matrix[i],
  }))

  const centroids: Point2D[] = centroidPts2D.map(([x, y], i) => ({ x, y, cluster: i }))

  return { points, centroids, iterations, varianceExplained, isMultiDim }
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
