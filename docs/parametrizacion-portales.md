# Parametrización de portales — InfoCasas Paraguay · Clasipar

Investigación de los formularios/taxonomías de los dos portales para dejar el
modelo de propiedades de PUBLIK bien parametrizado (que un aviso cargado una vez
mapee limpio a cada portal).

Fuentes: infocasas.com.py (home, /soyinmobiliaria, /venta/casas-y-departamentos, filtros)
· clasipar.paraguay.com/inmuebles (categorías + campos).

---

## 1. Operación

| PUBLIK (actual) | InfoCasas | Clasipar |
|---|---|---|
| `venta` | Venta | Vendo |
| `alquiler` | Alquiler | Doy en alquiler |
| `alquiler_temporal` | Alquiler Temporal | Temporario / Vacacional |

✅ **Ya está bien.** No requiere cambios.

## 2. Tipo de inmueble

| PUBLIK (actual) | InfoCasas | Clasipar |
|---|---|---|
| `casa` | Casa | Casas · Residencias/Mansiones |
| `departamento` | Departamento | Departamentos |
| — | — | **Dúplex** |
| `terreno` | Terreno | Terrenos |
| `oficina` | Oficina | (en Locales/Oficinas/Salones) |
| `local` | Local | Locales/Oficinas/Salones |
| `deposito` | — | Depósitos |
| — | — | **Propiedades rurales** (campo/quinta) |
| — | — | **Habitaciones/Dormitorios** |
| — | — | **Otros inmuebles** |

⚠️ **Agregar a PUBLIK:** `duplex`, `quinta_campo` (propiedad rural), `habitacion`, `otro`.
Sugerido: `casa · departamento · duplex · terreno · oficina · local · deposito · quinta_campo · habitacion · otro`.

## 3. Moneda

| PUBLIK | InfoCasas | Clasipar |
|---|---|---|
| `USD` · `PYG` | US$ · Gs. | US$ · Gs. |

✅ **Ya está bien.**

## 4. Dormitorios / Baños / Cocheras

- **Dormitorios**: InfoCasas usa `Monoambiente · 1 · 2 · 3 · 3+`. En PUBLIK es `int` → **0 = monoambiente**. ✅ (agregar helper de UI para 0 = "Monoambiente").
- **Baños**: `int` (1 · 2 · 3+). ✅
- **Cocheras/Garaje**: `int`. ✅ (InfoCasas lo filtra como "con garaje").

## 5. Superficie

- `superficie_terreno_m2` + `superficie_construida_m2`. ✅ Ambos portales los usan.

## 6. Condición / Antigüedad  ⚠️ FALTA

InfoCasas filtra por **"A estrenar"** vs **"Usados"** (y "En construcción"). PUBLIK no lo tiene.

⚠️ **Agregar campo** `condicion`: `a_estrenar · en_construccion · usado`.

## 7. Características / Amenities  ⚠️ ESTANDARIZAR

Hoy PUBLIK guarda `amenities text[]` libre. InfoCasas usa **checkboxes fijos** (para poder mapear el aviso, conviene un set canónico):

| Clave PUBLIK sugerida | InfoCasas / Clasipar |
|---|---|
| `piscina` | Piscina |
| `cochera` | Cochera / Garaje |
| `seguridad_24h` | Seguridad 24h |
| `gimnasio` | Gimnasio |
| `ascensor` | Ascensor |
| `aire_acondicionado` | Aire acondicionado |
| `balcon_terraza` | Balcón / Terraza |
| `jardin` | Jardín |
| `parrilla_quincho` | Parrilla / Quincho |
| `amoblado` | Amoblado (Clasipar también: semi-amoblado) |
| `playroom` | Playroom |
| `lavadero` | Lavadero |

⚠️ **Recomendación:** un enum canónico de amenities (checkboxes) + un campo libre "otras" para extras. Así el aviso mapea 1:1 a los checkboxes de cada portal.

## 8. Ubicación  ⚠️ FALTA `departamento`

PUBLIK tiene `pais · ciudad · barrio · direccion · lat · lng`. InfoCasas exige **Departamento** (región) además de ciudad/barrio.

⚠️ **Agregar campo** `departamento` con enum de los 18 departamentos de Paraguay:
`Asunción · Central · Cordillera · Alto Paraná · Itapúa · Guairá · Caaguazú · Caazapá · Misiones · Paraguarí · Ñeembucú · San Pedro · Concepción · Amambay · Canindeyú · Presidente Hayes · Boquerón · Alto Paraguay` (+ Internacional).

## 9. Multimedia

- **Fotos**: ambos requieren. ✅ (PUBLIK usa Supabase Storage). Recomendado **mínimo 3–5 fotos** por aviso.
- **Video**: InfoCasas soporta **link de YouTube**. ⚠️ **Agregar campo** `video_url` (opcional).

---

## Resumen: cambios sugeridos al modelo `Property` de PUBLIK

| Cambio | Detalle |
|---|---|
| ➕ Tipos | agregar `duplex`, `quinta_campo`, `habitacion`, `otro` |
| ➕ `condicion` | `a_estrenar · en_construccion · usado` |
| ♻️ `amenities` | pasar a **enum canónico** (checkboxes) + "otras" libre |
| ➕ `departamento` | enum de 18 departamentos PY (obligatorio para InfoCasas) |
| ➕ `video_url` | link de YouTube (opcional) |
| 📸 Fotos | validar mínimo 3–5 |

Lo que **ya está OK**: operación, moneda, dormitorios/baños/cocheras, superficies (terreno + construida), precio, título, descripción.

> Nota: los portales no publican una API abierta de "campos requeridos"; esto se
> derivó de sus formularios/filtros públicos. Al integrar cada adapter conviene
> confirmar los campos exactos y obligatorios contra el aviso real de cada portal.
