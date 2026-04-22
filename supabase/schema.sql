-- =============================================
-- DETECTIVES DE DATOS — Schema Supabase
-- =============================================

-- Tabla principal de respuestas de estudiantes
CREATE TABLE IF NOT EXISTS student_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_code TEXT NOT NULL,          -- código de sesión del profesor (ej: "clase-oct-23")
  activity_id INTEGER NOT NULL,        -- 1, 2, o 3
  student_name TEXT,                   -- opcional, puede ser apodo

  -- Actividad 1: El juego de las etiquetas (variables categóricas)
  a1_ciudad TEXT,
  a1_transporte TEXT,                  -- bicicleta, carro, bus, metro, moto, a pie
  a1_mascota TEXT,                     -- perro, gato, pez, ninguna, otro
  a1_genero_musical TEXT,              -- rock, pop, reggaeton, clasica, electronica, otro
  a1_comida_favorita TEXT,             -- pizza, sushi, arepa, pasta, hamburguesa, otro
  a1_red_social TEXT,                  -- instagram, tiktok, twitter, youtube, ninguna

  -- Actividad 2: Agrúpate (k-means — variables numéricas continuas)
  a2_horas_sueno NUMERIC(4,1),         -- 0.0 a 24.0
  a2_tazas_cafe NUMERIC(4,1),          -- 0 a 20
  a2_horas_ejercicio NUMERIC(4,1),     -- 0 a 24
  a2_horas_pantalla NUMERIC(4,1),      -- 0 a 24
  a2_horas_estudio NUMERIC(4,1),       -- 0 a 24
  a2_minutos_transporte NUMERIC(6,1),  -- 0 a 300

  -- Actividad 3: ¿Qué le preguntarías? (intuición PCA)
  a3_altura NUMERIC(5,1),              -- cm, ej: 170.5
  a3_peso NUMERIC(5,1),               -- kg
  a3_edad INTEGER,
  a3_ingresos_mensuales INTEGER,       -- en miles de pesos o dólares (rango)
  a3_horas_trabajo INTEGER,
  a3_nivel_educativo TEXT,             -- bachiller, tecnico, universitario, posgrado
  a3_variables_elegidas TEXT[],        -- cuáles 2 variables elegiría para describir a alguien
  a3_razon_eleccion TEXT               -- texto libre: por qué esas variables
);

-- Índices para consultas frecuentes
CREATE INDEX IF NOT EXISTS idx_responses_session ON student_responses(session_code);
CREATE INDEX IF NOT EXISTS idx_responses_activity ON student_responses(activity_id);
CREATE INDEX IF NOT EXISTS idx_responses_created ON student_responses(created_at DESC);

-- Row Level Security: lectura pública (todos pueden ver), escritura pública (para encuestas sin login)
ALTER TABLE student_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública" ON student_responses
  FOR SELECT USING (true);

CREATE POLICY "Inserción pública" ON student_responses
  FOR INSERT WITH CHECK (true);

-- Vista auxiliar: conteo por sesión y actividad
CREATE OR REPLACE VIEW session_summary AS
SELECT
  session_code,
  activity_id,
  COUNT(*) as total_responses,
  MIN(created_at) as primera_respuesta,
  MAX(created_at) as ultima_respuesta
FROM student_responses
GROUP BY session_code, activity_id
ORDER BY ultima_respuesta DESC;
