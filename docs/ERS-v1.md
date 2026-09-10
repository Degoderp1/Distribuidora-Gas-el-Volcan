# Especificación de Requisitos de Software (ERS)

**Proyecto:** Plataforma web Distribuidora de Gas El Volcán  
**Asignatura:** DSY1104 — Desarrollo FullStack II  
**Evaluación:** Parcial N° 1 — Versión 1 (propuesta previa)  
**Caso:** Forma C  
**Equipo:** [Nombre 1] · [Nombre 2] · [Nombre 3]  
**Fecha:** agosto 2026

---

## 1. Introducción

### 1.1 Propósito

Este documento define los requerimientos, herramientas y la propuesta de solución para digitalizar el pedido y despacho de gas licuado de **Distribuidora de Gas El Volcán**. Es la versión 1 del ERS: cubre el análisis del caso y el prototipo frontend de la Evaluación Parcial 1. Las capas de backend, autenticación real, base de datos y despliegue en la nube se detallan como alcance de las evaluaciones siguientes.

El documento está dirigido al docente de la asignatura y al equipo de desarrollo.

### 1.2 Alcance del producto

El sistema permitirá a los clientes crear un pedido web (cilindro, dirección y tipo de tarifa), a la operadora ver y asignar los pedidos del día, al repartidor actualizar el estado desde el celular y a la administradora controlar stock y pagos. En esta entrega se construye la **base del canal web**: sitio HTML5, CSS externo, formularios validados con JavaScript, catálogo, zonas de despacho y un mapa de seguimiento de demostración.

Nombre tentativo del producto: **Gas El Volcán Web**.

### 1.3 Definiciones

| Término | Significado |
| --- | --- |
| GLP | Gas licuado de petróleo, distribuido en cilindros |
| EP1 | Evaluación Parcial 1: bases HTML, CSS y JavaScript |
| RBAC | Control de acceso por roles |
| ERS | Especificación de Requisitos del Software |
| SPA | Single Page Application (React, evaluaciones posteriores) |
| API REST | Interfaz HTTP/JSON entre frontend y microservicios |

### 1.4 Referencias

- DSY1104 Evaluación Parcial 1 (rúbrica estudiante)
- Documento de contexto Forma C: Distribuidora de Gas El Volcán
- Catálogo de productos, tarifas y zonas de despacho (Excel Forma C)

---

## 2. Descripción general

### 2.1 Contexto de la empresa

Empresa familiar de Chillán (Ñuble), fundada en 1998. Distribuye cilindros de 5, 11 y 15 kg (y 45 kg comercial) con 2 camiones, 3 repartidores, 1 operadora y 1 administradora. Recibe entre 80 y 120 pedidos diarios. Hoy el proceso es telefónico y en papel.

### 2.2 Problemática

1. El cliente no conoce la hora de llegada y llama varias veces.
2. En alta demanda los pedidos se anotan en hojas sueltas: se pierden o se duplican.
3. No hay historial por cliente.
4. Los pagos en efectivo no siempre se registran; hay diferencias al cierre.
5. El stock se cuenta a mano; si se agota, el camión vuelve a bodega.

### 2.3 Visión de la solución

- Pedido web sin teléfono y seguimiento en tiempo real.
- Vista centralizada para la operadora.
- App liviana para el repartidor (Android de gama media, señal inestable).
- Stock visible para la administradora.
- Pago registrado al confirmar la entrega.

### 2.4 Actores y roles del sistema

| Actor | Rol en el sistema | Permisos |
| --- | --- | --- |
| Administradora | Gestiona el sistema | Usuarios, roles, reportes, stock y todos los pedidos |
| Operadora / Despachadora | Recibe y asigna | Pedidos del día, asignación y cambio de estado. No gestiona usuarios |
| Repartidor | Entrega a domicilio | Solo sus pedidos. Estados “en camino” y “entregado” |
| Cliente | Solicita gas | Crear pedido, ver seguimiento y su historial |

Regla de seguridad (caso): ninguna vista ni endpoint interno sin autenticación, excepto login y registro público.

### 2.5 Restricciones del contexto

- Señal intermitente en ruta: interfaz simple y liviana.
- Repartidores solo con Android de gama media-baja.
- Operadora y repartidores con poca experiencia digital: pocos pasos.
- Datos de clientes y pedidos confidenciales.
- Motor de BD a elección: se propone MySQL.

---

## 3. Requisitos técnicos del semestre (caso, sección 0)

Estos requisitos son obligatorios para el proyecto completo. En EP1 se **diseñan y se prototipan** en frontend; la implementación total se reparte en las tres evaluaciones.

| Capa | Tecnología | Estado en EP1 |
| --- | --- | --- |
| Frontend final | React (SPA) | Prototipo HTML/CSS/JS. Migración a React en evaluaciones siguientes |
| Diseño responsive | CSS propio | Implementado: 360 px, 768 px y 1280 px, menú hamburguesa |
| Backend | Spring Boot, microservicios, API REST/JSON | Documentado. Aún no implementado |
| Seguridad | Autenticación + roles | Formulario de ingreso por rol (demostración) |
| Panel admin | Módulo React | Alcance futuro |
| Mapas | Leaflet | Implementado en Seguimiento (OpenStreetMap) |
| Pedidos | Flujo completo | Formulario de pedido + seguimiento demo |
| Base de datos | MySQL (3FN) | Modelo propuesto en esta versión |
| Cloud | AWS + Docker | Alcance futuro |

**Decisión de EP1:** la rúbrica de la Evaluación Parcial 1 evalúa HTML5 semántico, CSS externo, páginas enlazadas, video, formularios y validación JavaScript. Por eso esta entrega es un sitio multipágina que construye las bases. El ERS deja fijado React + Spring Boot + MySQL + AWS para no omitir la sección 0 del caso.

---

## 4. Requisitos funcionales

Los RF se priorizan con MoSCoW. **Must** = núcleo del negocio. **Should** = importante. **Could** = mejora.

| ID | Requisito | Actor | Prioridad | EP1 |
| --- | --- | --- | --- | --- |
| RF-01 | Registrar pedido con nombre, RUT, contacto, dirección, comuna, tipo de cliente, producto y cantidad | Cliente | Must | Sí |
| RF-02 | Validar datos del formulario (RUT chileno, teléfono +56 9, correo, comuna de cobertura) | Sistema | Must | Sí |
| RF-03 | Consultar catálogo con precio residencial, comercial y stock | Cliente | Must | Sí |
| RF-04 | Consultar estado de un pedido y ver mapa (repartidor + punto de entrega) | Cliente | Must | Demo |
| RF-05 | Listar pedidos del día y asignarlos a un repartidor | Operadora | Must | Futuro |
| RF-06 | Cambiar estado a “en camino” o “entregado” | Repartidor | Must | Futuro |
| RF-07 | Registrar el pago al confirmar la entrega | Sistema | Must | Futuro |
| RF-08 | Descontar stock al despachar / entregar | Sistema | Must | Futuro |
| RF-09 | Ver stock actual por tipo de cilindro | Administradora | Must | Catálogo muestra stock |
| RF-10 | Crear, editar, desactivar usuarios y asignar roles | Administradora | Must | Formulario de roles |
| RF-11 | Iniciar sesión y restringir rutas por rol | Todos | Must | Prototipo login |
| RF-12 | Registrar cliente (alta pública) | Cliente | Should | Sí |
| RF-13 | Contactar a la operadora por formulario | Cliente | Should | Sí |
| RF-14 | Filtrar productos por categoría y texto | Cliente | Should | Sí |
| RF-15 | Ver zonas, días, horario y tiempo estimado | Cliente | Should | Sí |
| RF-16 | Historial de pedidos por cliente | Cliente / Admin | Should | Futuro |
| RF-17 | Mapa con todos los pedidos del día | Operadora | Should | Futuro |
| RF-18 | Funcionar con conexión lenta (pocos pasos, poco peso) | Repartidor | Must | Diseño liviano |

### 4.1 Flujo de pedido (núcleo)

1. Cliente crea el pedido (dirección + cilindro).
2. Operadora lo asigna a un repartidor.
3. Repartidor marca “en camino” y luego “entregado”.
4. Cliente ve el estado actualizado (en el mapa, en tiempo real cuando exista backend).
5. El pago y el stock se actualizan al confirmar la entrega.

---

## 5. Requisitos no funcionales

| ID | Tipo | Descripción |
| --- | --- | --- |
| RNF-01 | Usabilidad | Máximo de pasos posible para registrar un pedido o una entrega. Textos en español claro. |
| RNF-02 | Responsive | Correcto en 360 px (hamburguesa), 768 px y 1280 px. |
| RNF-03 | Seguridad | Contraseñas protegidas; RBAC; datos confidenciales. |
| RNF-04 | Interoperabilidad | Frontend y backend solo por HTTP REST/JSON. |
| RNF-05 | Disponibilidad en ruta | Interfaz usable con señal intermitente. |
| RNF-06 | Mantenibilidad | CSS externo, HTML semántico, JS separado por responsabilidad. |
| RNF-07 | Legal / privacidad | Acceso solo de personal autorizado. |
| RNF-08 | Normalización | Modelo relacional mínimo en 3FN. |

---

## 6. Requisitos de interfaz (EP1)

La rúbrica exige, y el prototipo implementa:

- Estructura HTML5: `header`, `nav`, `main`, `section`, `article`, `footer`, `aside`.
- Hipervínculos entre todas las páginas.
- Imágenes locales (logo, cilindro, hero).
- Botones de acción (pedir, buscar, ingresar).
- Video embebido de uso seguro del cilindro (página Nosotros).
- Formularios interactivos: pedido, contacto, login, registro y seguimiento.
- Footer informativo en todas las páginas.
- Una sola hoja de estilos externa (`css/estilos.css`).
- Validación JavaScript con mensajes de error junto al campo, sugerencias (`datalist`, textos de ayuda) y `autocomplete`.

Páginas del prototipo:

| Página | Función |
| --- | --- |
| `index.html` | Portada y propuesta de valor |
| `catalogo.html` | 14 productos del Excel |
| `pedido.html` | Flujo núcleo de negocio |
| `seguimiento.html` | Estado + mapa Leaflet |
| `zonas.html` | Cobertura y horarios |
| `nosotros.html` | Empresa + video |
| `contacto.html` | Mensaje a operadora |
| `login.html` | Ingreso por rol y registro |

---

## 7. Catálogo y zonas (datos del caso)

### 7.1 Productos

Cilindros CL001–CL004 (5, 11, 15 y 45 kg), reguladores RG001–RG003, mangueras y conexiones MG001–MG004, accesorios AC001–AC003. Cada ítem tiene precio residencial, precio comercial y stock.

### 7.2 Zonas

Centro (Chillán), Oriente (Chillán Viejo), Rural (El Carmen, Pinto, San Ignacio), Sur (Bulnes, Quillón) y Comercial (parques industriales), con días y ventanas horarias distintas.

---

## 8. Modelo de datos propuesto (visión 3FN)

Entidades principales para el backend posterior:

- **Usuario** (id, nombre, email, hash_clave, activo)
- **Rol** (id, nombre)
- **UsuarioRol** (usuario_id, rol_id)
- **Cliente** (id, usuario_id, rut, telefono, tipo: residencial/comercial)
- **Direccion** (id, cliente_id, calle, comuna, zona_id)
- **Producto** (codigo, categoria, nombre, unidad, precio_residencial, precio_comercial)
- **Stock** (producto_codigo, cantidad) — separado para no mezclar precio y existencias
- **Zona** (id, nombre, dias, horario, tiempo_estimado)
- **Pedido** (id, codigo, cliente_id, direccion_id, estado, fecha, repartidor_id, operadora_id)
- **DetallePedido** (pedido_id, producto_codigo, cantidad, precio_unitario)
- **Pago** (id, pedido_id, monto, medio, fecha)
- **Seguimiento** (id, pedido_id, lat, lng, timestamp)

Estados de pedido: Recibido → Asignado → En camino → Entregado / Cancelado.

Esto evita datos repetidos de cliente en cada pedido y separa stock, pago y ubicación.

---

## 9. Arquitectura propuesta (semestre)

```
[React / hoy HTML] --HTTPS JSON--> [API Gateway / CORS]
        |                                |
        |                    +-----------+-----------+
        |                    |                       |
        v                    v                       v
   Leaflet mapa     ms-usuarios (auth, roles)   ms-pedidos (pedidos, stock, pagos)
                    MySQL                        MySQL
```

Mínimo dos microservicios Spring Boot, cada uno con su configuración y su API (`/api/usuarios`, `/api/pedidos`). Respuestas siempre en JSON, incluidos los errores.

Despliegue objetivo: contenedores Docker en AWS.

---

## 10. Herramientas

| Uso | Herramienta | Motivo |
| --- | --- | --- |
| Estructura | HTML5 | Exigido en EP1; semántica y accesibilidad |
| Presentación | CSS3 externo | Un solo archivo, fácil de mantener |
| Comportamiento | JavaScript (ES6) | Validaciones, catálogo y mapa |
| Mapa | Leaflet 1.9 + OSM | Gratis, liviano, cumple el caso |
| Video | YouTube embebido | Requisito de rúbrica |
| Versionado | Git + GitHub público | Entregable y trabajo colaborativo |
| Editor | Visual Studio Code / Cursor | Desarrollo del equipo |
| Diseño | Figma (opcional) | Bocetos si el equipo lo necesita |
| Backend futuro | Java 17+, Spring Boot 3, Maven | Caso obligatorio |
| BD futura | MySQL 8 | Preferida por el caso |
| Contenedores | Docker | Exigido junto a AWS |
| Nube | AWS (cuenta del equipo) | Despliegue del semestre |

---

## 11. Propuesta de la Evaluación Parcial 1

Se entrega un prototipo navegable de tienda / canal de pedidos que:

1. Explica el negocio y el cambio del cuaderno al sistema.
2. Publica el catálogo y las zonas reales del Excel.
3. Permite crear un pedido con validación estricta (incluye RUT chileno).
4. Muestra seguimiento sobre Chillán con Leaflet.
5. Anticipa roles (administradora, operadora, repartidor, cliente).
6. Queda versionado en GitHub con commits descriptivos.

Limitaciones conscientes de la v1: no hay backend, el “login” es demostración, el mapa usa pedidos de ejemplo (`GV-1042`, `GV-1043`) y el stock no se descuenta en servidor.

---

## 12. Organización del repositorio y del equipo

Estructura:

- `index.html` y páginas del sitio
- `css/estilos.css`
- `js/` (datos, validaciones, catálogo, pedido, seguimiento, auth)
- `assets/`
- `docs/` (este ERS y la guía de presentación)

Sugerencia de commits (mensajes claros, un tema por commit):

1. `docs: agregar ERS v1 y alcance de EP1`
2. `feat: estructura HTML semántica y navegación`
3. `style: hoja de estilos responsive externa`
4. `feat: catálogo y zonas según Excel Forma C`
5. `feat: formularios con validación JavaScript`
6. `feat: mapa Leaflet de seguimiento`

Distribución sugerida (ajustar a 2 o 3 integrantes):

| Integrante | Encargo | Evidencia |
| --- | --- | --- |
| A | HTML semántico, navegación, páginas de contenido | Commits de estructura |
| B | CSS responsive y consistencia visual | Commits de estilos |
| C | JavaScript, validaciones y mapa | Commits de `js/` |

Si el equipo es de dos personas, A+B se unen en maquetación.

---

## 13. Criterios de aceptación de EP1

- Se navega entre todas las páginas desde el menú y el footer.
- El CSS no está embebido ni inline de forma masiva.
- Un pedido inválido no se envía; el error aparece junto al campo.
- El video se reproduce en Nosotros.
- El mapa carga en Seguimiento.
- El sitio se ve usable en 360, 768 y 1280 px.
- El ERS v1 describe requerimientos, herramientas y propuesta.
- El repositorio GitHub es público y tiene historial con mensajes claros.

---

## 14. Riesgos

| Riesgo | Impacto | Mitigación |
| --- | --- | --- |
| Confundir alcance EP1 con React/Spring | Baja nota de rúbrica | Prototipo HTML ahora; arquitectura documentada |
| Señal del mapa bloqueada sin internet | Demo falla | Tener captura de pantalla de respaldo |
| Equipo sin commits individuales | Pierde IE1.3.1 | Cada integrante sube su parte |
| Profesor exige React ya en EP1 | Retrabajo | El sitio se puede migrar a Vite+React reutilizando CSS y validaciones |

---

## 15. Conclusión

La EP1 deja construidas las **bases del canal web** de Gas El Volcán: información del negocio, catálogo real, pedido validado, seguimiento con mapa y un ERS que no omite el stack obligatorio del semestre. Las siguientes evaluaciones deben reemplazar el prototipo estático por React, exponer microservicios Spring Boot y persistir pedidos, stock y pagos en MySQL.
