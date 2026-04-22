import { StudentResponse } from './supabase'

// =============================================
// DATOS FICTICIOS — se activan con session = "Ficticio"
// =============================================

const NOMBRES = [
  'Valentina', 'Sebastián', 'Camila', 'Andrés', 'Isabella', 'Felipe',
  'Daniela', 'Santiago', 'Mariana', 'Julián', 'Sofía', 'Mateo',
  'Laura', 'Tomás', 'Gabriela', 'Diego', 'Natalia', 'Juan', 'Luisa', 'Alejandro',
  'Paola', 'Nicolás', 'Catalina', 'Esteban', 'Sara', 'Miguel'
]

export const MOCK_ACTIVITY_1: StudentResponse[] = [
  // Patrón intencionado: bicicleta → gato, carro → perro
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[0],  a1_ciudad: 'Bogotá',       a1_transporte: 'Bicicleta', a1_mascota: 'Gato',    a1_genero_musical: 'Rock',          a1_comida_favorita: 'Sushi',           a1_red_social: 'Instagram' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[1],  a1_ciudad: 'Medellín',     a1_transporte: 'Carro',     a1_mascota: 'Perro',   a1_genero_musical: 'Reggaetón',     a1_comida_favorita: 'Hamburguesa',     a1_red_social: 'TikTok' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[2],  a1_ciudad: 'Bogotá',       a1_transporte: 'Bicicleta', a1_mascota: 'Gato',    a1_genero_musical: 'Electrónica',   a1_comida_favorita: 'Sushi',           a1_red_social: 'Instagram' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[3],  a1_ciudad: 'Cali',         a1_transporte: 'Carro',     a1_mascota: 'Perro',   a1_genero_musical: 'Pop',           a1_comida_favorita: 'Arepa / Comida típica', a1_red_social: 'YouTube' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[4],  a1_ciudad: 'Bogotá',       a1_transporte: 'Bicicleta', a1_mascota: 'Gato',    a1_genero_musical: 'Rock',          a1_comida_favorita: 'Pizza',           a1_red_social: 'X / Twitter' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[5],  a1_ciudad: 'Barranquilla', a1_transporte: 'Moto',      a1_mascota: 'Perro',   a1_genero_musical: 'Reggaetón',     a1_comida_favorita: 'Hamburguesa',     a1_red_social: 'TikTok' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[6],  a1_ciudad: 'Bogotá',       a1_transporte: 'Bus / Transmilenio', a1_mascota: 'Ninguna', a1_genero_musical: 'Pop', a1_comida_favorita: 'Pasta',          a1_red_social: 'Instagram' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[7],  a1_ciudad: 'Medellín',     a1_transporte: 'Carro',     a1_mascota: 'Perro',   a1_genero_musical: 'Rock',          a1_comida_favorita: 'Hamburguesa',     a1_red_social: 'YouTube' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[8],  a1_ciudad: 'Bogotá',       a1_transporte: 'Bicicleta', a1_mascota: 'Gato',    a1_genero_musical: 'Electrónica',   a1_comida_favorita: 'Sushi',           a1_red_social: 'Instagram' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[9],  a1_ciudad: 'Cali',         a1_transporte: 'Carro',     a1_mascota: 'Perro',   a1_genero_musical: 'Reggaetón',     a1_comida_favorita: 'Arepa / Comida típica', a1_red_social: 'TikTok' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[10], a1_ciudad: 'Bogotá',       a1_transporte: 'A pie',     a1_mascota: 'Gato',    a1_genero_musical: 'Música clásica',a1_comida_favorita: 'Pasta',           a1_red_social: 'Ninguna' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[11], a1_ciudad: 'Medellín',     a1_transporte: 'Carro',     a1_mascota: 'Perro',   a1_genero_musical: 'Pop',           a1_comida_favorita: 'Pizza',           a1_red_social: 'Instagram' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[12], a1_ciudad: 'Bogotá',       a1_transporte: 'Bicicleta', a1_mascota: 'Gato',    a1_genero_musical: 'Rock',          a1_comida_favorita: 'Sushi',           a1_red_social: 'X / Twitter' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[13], a1_ciudad: 'Barranquilla', a1_transporte: 'Bus / Transmilenio', a1_mascota: 'Pez', a1_genero_musical: 'Reggaetón', a1_comida_favorita: 'Arepa / Comida típica', a1_red_social: 'TikTok' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[14], a1_ciudad: 'Bogotá',       a1_transporte: 'Carro',     a1_mascota: 'Perro',   a1_genero_musical: 'Pop',           a1_comida_favorita: 'Hamburguesa',     a1_red_social: 'YouTube' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[15], a1_ciudad: 'Medellín',     a1_transporte: 'Bicicleta', a1_mascota: 'Gato',    a1_genero_musical: 'Electrónica',   a1_comida_favorita: 'Sushi',           a1_red_social: 'Instagram' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[16], a1_ciudad: 'Cali',         a1_transporte: 'Moto',      a1_mascota: 'Perro',   a1_genero_musical: 'Reggaetón',     a1_comida_favorita: 'Arepa / Comida típica', a1_red_social: 'TikTok' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[17], a1_ciudad: 'Bogotá',       a1_transporte: 'Bus / Transmilenio', a1_mascota: 'Ninguna', a1_genero_musical: 'Rock', a1_comida_favorita: 'Pizza',          a1_red_social: 'YouTube' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[18], a1_ciudad: 'Bogotá',       a1_transporte: 'Bicicleta', a1_mascota: 'Gato',    a1_genero_musical: 'Música clásica',a1_comida_favorita: 'Pasta',           a1_red_social: 'Ninguna' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[19], a1_ciudad: 'Medellín',     a1_transporte: 'Carro',     a1_mascota: 'Perro',   a1_genero_musical: 'Pop',           a1_comida_favorita: 'Hamburguesa',     a1_red_social: 'Instagram' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[20], a1_ciudad: 'Bogotá',       a1_transporte: 'Carro',     a1_mascota: 'Perro',   a1_genero_musical: 'Reggaetón',     a1_comida_favorita: 'Hamburguesa',     a1_red_social: 'TikTok' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[21], a1_ciudad: 'Cali',         a1_transporte: 'Bicicleta', a1_mascota: 'Gato',    a1_genero_musical: 'Electrónica',   a1_comida_favorita: 'Sushi',           a1_red_social: 'Instagram' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[22], a1_ciudad: 'Bogotá',       a1_transporte: 'A pie',     a1_mascota: 'Gato',    a1_genero_musical: 'Rock',          a1_comida_favorita: 'Pizza',           a1_red_social: 'X / Twitter' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[23], a1_ciudad: 'Barranquilla', a1_transporte: 'Carro',     a1_mascota: 'Perro',   a1_genero_musical: 'Pop',           a1_comida_favorita: 'Arepa / Comida típica', a1_red_social: 'YouTube' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[24], a1_ciudad: 'Medellín',     a1_transporte: 'Bicicleta', a1_mascota: 'Pez',     a1_genero_musical: 'Música clásica',a1_comida_favorita: 'Sushi',           a1_red_social: 'Ninguna' },
  { session_code: 'Ficticio', activity_id: 1, student_name: NOMBRES[25], a1_ciudad: 'Bogotá',       a1_transporte: 'Bus / Transmilenio', a1_mascota: 'Ninguna', a1_genero_musical: 'Reggaetón', a1_comida_favorita: 'Arepa / Comida típica', a1_red_social: 'TikTok' },
]

export const MOCK_ACTIVITY_2: StudentResponse[] = [
  // Patrón: 2 grupos claros — "dormilones sedentarios" vs "activos con poco sueño"
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[0],  a2_horas_sueno: 8.5, a2_tazas_cafe: 0.5, a2_horas_ejercicio: 1,   a2_horas_pantalla: 4,  a2_horas_estudio: 2, a2_minutos_transporte: 30 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[1],  a2_horas_sueno: 5.0, a2_tazas_cafe: 4,   a2_horas_ejercicio: 8,   a2_horas_pantalla: 6,  a2_horas_estudio: 4, a2_minutos_transporte: 60 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[2],  a2_horas_sueno: 9.0, a2_tazas_cafe: 1,   a2_horas_ejercicio: 0.5, a2_horas_pantalla: 5,  a2_horas_estudio: 1, a2_minutos_transporte: 20 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[3],  a2_horas_sueno: 4.5, a2_tazas_cafe: 5,   a2_horas_ejercicio: 10,  a2_horas_pantalla: 7,  a2_horas_estudio: 5, a2_minutos_transporte: 90 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[4],  a2_horas_sueno: 8.0, a2_tazas_cafe: 1,   a2_horas_ejercicio: 2,   a2_horas_pantalla: 4,  a2_horas_estudio: 3, a2_minutos_transporte: 25 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[5],  a2_horas_sueno: 5.5, a2_tazas_cafe: 3.5, a2_horas_ejercicio: 7,   a2_horas_pantalla: 8,  a2_horas_estudio: 4, a2_minutos_transporte: 75 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[6],  a2_horas_sueno: 7.5, a2_tazas_cafe: 0,   a2_horas_ejercicio: 1,   a2_horas_pantalla: 3,  a2_horas_estudio: 2, a2_minutos_transporte: 15 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[7],  a2_horas_sueno: 6.0, a2_tazas_cafe: 4,   a2_horas_ejercicio: 9,   a2_horas_pantalla: 9,  a2_horas_estudio: 5, a2_minutos_transporte: 80 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[8],  a2_horas_sueno: 9.5, a2_tazas_cafe: 0.5, a2_horas_ejercicio: 0,   a2_horas_pantalla: 5,  a2_horas_estudio: 1, a2_minutos_transporte: 10 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[9],  a2_horas_sueno: 4.0, a2_tazas_cafe: 6,   a2_horas_ejercicio: 12,  a2_horas_pantalla: 7,  a2_horas_estudio: 6, a2_minutos_transporte: 100 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[10], a2_horas_sueno: 8.0, a2_tazas_cafe: 1,   a2_horas_ejercicio: 1.5, a2_horas_pantalla: 4,  a2_horas_estudio: 2, a2_minutos_transporte: 30 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[11], a2_horas_sueno: 5.0, a2_tazas_cafe: 3,   a2_horas_ejercicio: 6,   a2_horas_pantalla: 8,  a2_horas_estudio: 4, a2_minutos_transporte: 65 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[12], a2_horas_sueno: 7.0, a2_tazas_cafe: 2,   a2_horas_ejercicio: 3,   a2_horas_pantalla: 6,  a2_horas_estudio: 3, a2_minutos_transporte: 45 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[13], a2_horas_sueno: 6.5, a2_tazas_cafe: 2.5, a2_horas_ejercicio: 5,   a2_horas_pantalla: 7,  a2_horas_estudio: 3, a2_minutos_transporte: 50 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[14], a2_horas_sueno: 9.0, a2_tazas_cafe: 0,   a2_horas_ejercicio: 0.5, a2_horas_pantalla: 3,  a2_horas_estudio: 1, a2_minutos_transporte: 20 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[15], a2_horas_sueno: 4.5, a2_tazas_cafe: 5,   a2_horas_ejercicio: 11,  a2_horas_pantalla: 9,  a2_horas_estudio: 5, a2_minutos_transporte: 85 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[16], a2_horas_sueno: 8.5, a2_tazas_cafe: 1,   a2_horas_ejercicio: 2,   a2_horas_pantalla: 4,  a2_horas_estudio: 2, a2_minutos_transporte: 35 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[17], a2_horas_sueno: 5.5, a2_tazas_cafe: 3,   a2_horas_ejercicio: 8,   a2_horas_pantalla: 8,  a2_horas_estudio: 4, a2_minutos_transporte: 70 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[18], a2_horas_sueno: 7.5, a2_tazas_cafe: 1.5, a2_horas_ejercicio: 3,   a2_horas_pantalla: 5,  a2_horas_estudio: 3, a2_minutos_transporte: 40 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[19], a2_horas_sueno: 6.0, a2_tazas_cafe: 2,   a2_horas_ejercicio: 6,   a2_horas_pantalla: 7,  a2_horas_estudio: 4, a2_minutos_transporte: 55 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[20], a2_horas_sueno: 10,  a2_tazas_cafe: 0,   a2_horas_ejercicio: 0,   a2_horas_pantalla: 2,  a2_horas_estudio: 1, a2_minutos_transporte: 10 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[21], a2_horas_sueno: 3.5, a2_tazas_cafe: 7,   a2_horas_ejercicio: 14,  a2_horas_pantalla: 10, a2_horas_estudio: 6, a2_minutos_transporte: 110 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[22], a2_horas_sueno: 8.0, a2_tazas_cafe: 0.5, a2_horas_ejercicio: 1,   a2_horas_pantalla: 4,  a2_horas_estudio: 2, a2_minutos_transporte: 25 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[23], a2_horas_sueno: 5.0, a2_tazas_cafe: 4,   a2_horas_ejercicio: 9,   a2_horas_pantalla: 8,  a2_horas_estudio: 5, a2_minutos_transporte: 80 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[24], a2_horas_sueno: 7.0, a2_tazas_cafe: 2,   a2_horas_ejercicio: 4,   a2_horas_pantalla: 6,  a2_horas_estudio: 3, a2_minutos_transporte: 45 },
  { session_code: 'Ficticio', activity_id: 2, student_name: NOMBRES[25], a2_horas_sueno: 6.0, a2_tazas_cafe: 3,   a2_horas_ejercicio: 7,   a2_horas_pantalla: 7,  a2_horas_estudio: 4, a2_minutos_transporte: 60 },
]

export const MOCK_ACTIVITY_3: StudentResponse[] = [
  // Patrón: altura-peso muy correlacionados, ingresos-educación correlacionados
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[0],  a3_altura: 165, a3_peso: 58,  a3_edad: 21, a3_ingresos_mensuales: 1200, a3_horas_trabajo: 20, a3_nivel_educativo: 'Universitario',    a3_variables_elegidas: ['Edad', 'Ingresos mensuales'],          a3_razon_eleccion: 'La edad dice mucho del momento de vida y los ingresos de las posibilidades reales.' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[1],  a3_altura: 178, a3_peso: 80,  a3_edad: 35, a3_ingresos_mensuales: 4500, a3_horas_trabajo: 48, a3_nivel_educativo: 'Posgrado',         a3_variables_elegidas: ['Ingresos mensuales', 'Nivel educativo'], a3_razon_eleccion: 'Creo que con esas dos ya sabes el estatus y el contexto de la persona.' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[2],  a3_altura: 160, a3_peso: 55,  a3_edad: 19, a3_ingresos_mensuales: 800,  a3_horas_trabajo: 0,  a3_nivel_educativo: 'Universitario',    a3_variables_elegidas: ['Edad', 'Nivel educativo'],             a3_razon_eleccion: 'La educación y la edad van juntas casi siempre.' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[3],  a3_altura: 182, a3_peso: 85,  a3_edad: 42, a3_ingresos_mensuales: 6000, a3_horas_trabajo: 55, a3_nivel_educativo: 'Posgrado',         a3_variables_elegidas: ['Ingresos mensuales', 'Horas de trabajo'], a3_razon_eleccion: 'Quien más trabaja más gana, o al menos eso dicen.' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[4],  a3_altura: 168, a3_peso: 63,  a3_edad: 25, a3_ingresos_mensuales: 2000, a3_horas_trabajo: 40, a3_nivel_educativo: 'Universitario',    a3_variables_elegidas: ['Edad', 'Ingresos mensuales'],          a3_razon_eleccion: '' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[5],  a3_altura: 175, a3_peso: 75,  a3_edad: 30, a3_ingresos_mensuales: 3200, a3_horas_trabajo: 45, a3_nivel_educativo: 'Universitario',    a3_variables_elegidas: ['Altura', 'Peso'],                      a3_razon_eleccion: 'Pensé en qué variables son más difíciles de cambiar, y estas dos van siempre juntas.' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[6],  a3_altura: 158, a3_peso: 52,  a3_edad: 22, a3_ingresos_mensuales: 900,  a3_horas_trabajo: 15, a3_nivel_educativo: 'Técnico / Tecnólogo', a3_variables_elegidas: ['Nivel educativo', 'Horas de trabajo'], a3_razon_eleccion: '' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[7],  a3_altura: 180, a3_peso: 82,  a3_edad: 38, a3_ingresos_mensuales: 5500, a3_horas_trabajo: 50, a3_nivel_educativo: 'Posgrado',         a3_variables_elegidas: ['Ingresos mensuales', 'Nivel educativo'], a3_razon_eleccion: 'El nivel educativo casi determina los ingresos, son la misma variable disfrazada.' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[8],  a3_altura: 163, a3_peso: 57,  a3_edad: 20, a3_ingresos_mensuales: 700,  a3_horas_trabajo: 0,  a3_nivel_educativo: 'Universitario',    a3_variables_elegidas: ['Edad', 'Nivel educativo'],             a3_razon_eleccion: '' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[9],  a3_altura: 185, a3_peso: 88,  a3_edad: 45, a3_ingresos_mensuales: 7000, a3_horas_trabajo: 60, a3_nivel_educativo: 'Posgrado',         a3_variables_elegidas: ['Edad', 'Ingresos mensuales'],          a3_razon_eleccion: 'A más edad, más experiencia, más plata. Todo viene junto.' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[10], a3_altura: 162, a3_peso: 59,  a3_edad: 23, a3_ingresos_mensuales: 1500, a3_horas_trabajo: 30, a3_nivel_educativo: 'Universitario',    a3_variables_elegidas: ['Altura', 'Peso'],                      a3_razon_eleccion: '' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[11], a3_altura: 176, a3_peso: 78,  a3_edad: 32, a3_ingresos_mensuales: 3800, a3_horas_trabajo: 44, a3_nivel_educativo: 'Universitario',    a3_variables_elegidas: ['Ingresos mensuales', 'Nivel educativo'], a3_razon_eleccion: 'Son las dos que más dicen del lugar que ocupa alguien en la sociedad.' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[12], a3_altura: 170, a3_peso: 67,  a3_edad: 27, a3_ingresos_mensuales: 2500, a3_horas_trabajo: 40, a3_nivel_educativo: 'Universitario',    a3_variables_elegidas: ['Edad', 'Horas de trabajo'],            a3_razon_eleccion: '' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[13], a3_altura: 155, a3_peso: 50,  a3_edad: 18, a3_ingresos_mensuales: 500,  a3_horas_trabajo: 0,  a3_nivel_educativo: 'Bachiller',         a3_variables_elegidas: ['Edad', 'Nivel educativo'],             a3_razon_eleccion: 'Con esas dos sabes si está estudiando o ya trabajando.' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[14], a3_altura: 179, a3_peso: 81,  a3_edad: 40, a3_ingresos_mensuales: 5000, a3_horas_trabajo: 52, a3_nivel_educativo: 'Posgrado',         a3_variables_elegidas: ['Ingresos mensuales', 'Horas de trabajo'], a3_razon_eleccion: '' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[15], a3_altura: 166, a3_peso: 61,  a3_edad: 24, a3_ingresos_mensuales: 1800, a3_horas_trabajo: 35, a3_nivel_educativo: 'Técnico / Tecnólogo', a3_variables_elegidas: ['Altura', 'Peso'],                   a3_razon_eleccion: 'Me pareció que estas dos van siempre de la mano, no tiene sentido poner las dos.' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[16], a3_altura: 172, a3_peso: 70,  a3_edad: 29, a3_ingresos_mensuales: 3000, a3_horas_trabajo: 42, a3_nivel_educativo: 'Universitario',    a3_variables_elegidas: ['Ingresos mensuales', 'Nivel educativo'], a3_razon_eleccion: '' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[17], a3_altura: 184, a3_peso: 86,  a3_edad: 44, a3_ingresos_mensuales: 6500, a3_horas_trabajo: 58, a3_nivel_educativo: 'Posgrado',         a3_variables_elegidas: ['Edad', 'Ingresos mensuales'],          a3_razon_eleccion: 'Son las más informativas. Con esas dos puedo imaginar a la persona.' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[18], a3_altura: 161, a3_peso: 56,  a3_edad: 21, a3_ingresos_mensuales: 1000, a3_horas_trabajo: 20, a3_nivel_educativo: 'Universitario',    a3_variables_elegidas: ['Edad', 'Nivel educativo'],             a3_razon_eleccion: '' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[19], a3_altura: 177, a3_peso: 79,  a3_edad: 36, a3_ingresos_mensuales: 4200, a3_horas_trabajo: 46, a3_nivel_educativo: 'Posgrado',         a3_variables_elegidas: ['Ingresos mensuales', 'Nivel educativo'], a3_razon_eleccion: 'Creo que la educación ya contiene a los ingresos, son redundantes.' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[20], a3_altura: 169, a3_peso: 64,  a3_edad: 26, a3_ingresos_mensuales: 2200, a3_horas_trabajo: 38, a3_nivel_educativo: 'Universitario',    a3_variables_elegidas: ['Altura', 'Peso'],                      a3_razon_eleccion: '' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[21], a3_altura: 183, a3_peso: 87,  a3_edad: 43, a3_ingresos_mensuales: 6800, a3_horas_trabajo: 56, a3_nivel_educativo: 'Posgrado',         a3_variables_elegidas: ['Edad', 'Ingresos mensuales'],          a3_razon_eleccion: '' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[22], a3_altura: 164, a3_peso: 60,  a3_edad: 22, a3_ingresos_mensuales: 1100, a3_horas_trabajo: 25, a3_nivel_educativo: 'Técnico / Tecnólogo', a3_variables_elegidas: ['Nivel educativo', 'Horas de trabajo'], a3_razon_eleccion: 'Quien estudia más trabaja diferente.' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[23], a3_altura: 174, a3_peso: 73,  a3_edad: 31, a3_ingresos_mensuales: 3500, a3_horas_trabajo: 43, a3_nivel_educativo: 'Universitario',    a3_variables_elegidas: ['Ingresos mensuales', 'Horas de trabajo'], a3_razon_eleccion: '' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[24], a3_altura: 157, a3_peso: 53,  a3_edad: 19, a3_ingresos_mensuales: 600,  a3_horas_trabajo: 0,  a3_nivel_educativo: 'Bachiller',         a3_variables_elegidas: ['Edad', 'Nivel educativo'],             a3_razon_eleccion: 'A los 19 años lo que más define a alguien es qué tan lejos llegó estudiando.' },
  { session_code: 'Ficticio', activity_id: 3, student_name: NOMBRES[25], a3_altura: 171, a3_peso: 68,  a3_edad: 28, a3_ingresos_mensuales: 2800, a3_horas_trabajo: 40, a3_nivel_educativo: 'Universitario',    a3_variables_elegidas: ['Ingresos mensuales', 'Nivel educativo'], a3_razon_eleccion: '' },
]

export function getMockData(activityId: number): StudentResponse[] {
  switch (activityId) {
    case 1: return MOCK_ACTIVITY_1
    case 2: return MOCK_ACTIVITY_2
    case 3: return MOCK_ACTIVITY_3
    default: return []
  }
}

export const IS_FICTICIO = (session: string) =>
  session.toLowerCase() === 'ficticio'
