# 🔍 Detectives de Datos

App interactiva para que estudiantes descubran patrones estadísticos a través de encuestas en tiempo real.

**Stack:** Next.js 14 + Supabase + Recharts + Vercel

---

## 🚀 Setup en 5 pasos

### 1. Supabase — crea la tabla

1. Ve a tu proyecto en [supabase.com](https://supabase.com)
2. Abre **SQL Editor** y ejecuta todo el contenido de `supabase/schema.sql`
3. Ve a **Project Settings → API** y copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### 3. GitHub

```bash
git init
git add .
git commit -m "feat: detectives de datos initial setup"
git remote add origin https://github.com/TU_USUARIO/detectives-datos.git
git push -u origin main
```

### 4. Vercel

1. Ve a [vercel.com](https://vercel.com) → **New Project** → importa el repo de GitHub
2. En **Environment Variables** agrega las dos variables del paso 2
3. Deploy → Vercel detecta Next.js automáticamente

### 5. ¡Listo!

Tu app estará en `https://detectives-datos.vercel.app` (o el nombre que Vercel asigne).

---

## 📱 Cómo usar en clase

### El profesor:
1. Define un código de sesión (ej: `clase-oct-23`)
2. Comparte el link de **estudiante** en el tablero:
   ```
   https://tu-app.vercel.app/encuesta?session=clase-oct-23&activity=1
   ```
3. Abre el **dashboard** en su pantalla:
   ```
   https://tu-app.vercel.app/dashboard?session=clase-oct-23&activity=1
   ```
4. El dashboard se actualiza automáticamente cada 8 segundos
5. Puede cambiar entre los 3 análisis sin recargar

### Los estudiantes:
1. Abren el link (o escanean QR)
2. Ingresan su nombre / apodo
3. Responden la encuesta de su actividad
4. Ven el mensaje de confirmación y esperan al profesor

---

## 🎓 Las 3 actividades

| # | Nombre | Concepto | Tipo de datos |
|---|--------|----------|---------------|
| 1 | El juego de las etiquetas | Tablas de contingencia | Categórico |
| 2 | Agrúpate | K-means clustering | Numérico continuo |
| 3 | ¿Qué le preguntarías? | Intuición PCA | Mixto |

### Dashboard Actividad 1
- **Una variable:** gráfico de barras por frecuencia de cualquier variable
- **Cruce de variables:** tabla de contingencia interactiva con intensidad de color
- Cambia las variables con un clic sin recargar

### Dashboard Actividad 2
- Diagrama de dispersión con ejes intercambiables (6 variables)
- K-means en vivo: ajusta `k` con un slider y activa/desactiva los clusters
- Muestra los centroides con círculos punteados

### Dashboard Actividad 3
- Ranking de las variables más votadas por el grupo
- Mapa de correlaciones entre variables numéricas (Pearson)
- Feed de razones escritas por los estudiantes

---

## 🔧 Desarrollo local

```bash
npm install
cp .env.local.example .env.local
# Edita .env.local con tus credenciales de Supabase
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 📁 Estructura del proyecto

```
/
├── app/
│   ├── page.tsx              # Landing — selector de rol y actividad
│   ├── encuesta/page.tsx     # Formulario del estudiante
│   ├── dashboard/page.tsx    # Panel del profesor
│   └── globals.css           # Estilos globales (tema detective)
├── components/
│   ├── surveys/
│   │   ├── Activity1Form.tsx # Formulario variables categóricas
│   │   ├── Activity2Form.tsx # Formulario sliders numéricos
│   │   └── Activity3Form.tsx # Formulario mixto + elección PCA
│   └── charts/
│       ├── Activity1Dashboard.tsx  # Contingencia
│       ├── Activity2Dashboard.tsx  # K-means scatter
│       └── Activity3Dashboard.tsx  # Correlaciones + votos
├── lib/
│   ├── supabase.ts           # Cliente y tipos
│   └── analytics.ts          # Contingencia, k-means, correlaciones
└── supabase/
    └── schema.sql            # Esquema de la base de datos
```

---

## 💡 Tips pedagógicos

- Empieza siempre con pocas respuestas (5-10) para que los estudiantes vean cómo cambia la visualización en vivo
- En Act. 2, muestra primero sin clusters y pregunta "¿dónde ven grupos?" antes de activarlos
- En Act. 3, esconde las correlaciones hasta después de que voten — la sorpresa genera discusión
- El código de sesión puede reutilizarse en distintas clases para comparar grupos

---

Hecho con ❤️ para hacer la estadística menos aterradora.
