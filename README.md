# SPA_PXAA - Academic Leads Dashboard

Single Page Application (SPA) diseñada en React para explorar, filtrar y gestionar oferta académica (carreras), con formulario de contacto / lead.

## Requisitos

- [Node.js](https://nodejs.org/) **20 LTS o superior** (recomendado para Vite 8 y el ecosistema actual del proyecto)
- npm (incluido con Node)

## Ejecución local

1. **Instalar dependencias**

   ```bash
   npm install
   ```

2. **Modo desarrollo** (recarga en caliente, URL por defecto `http://localhost:5173`)

   ```bash
   npm run dev
   ```

## Tecnologías Principales (Stack)


| Tecnología        | Comportamiento                                             |
| ------------------| -----------------------------------------------------------|
| React / TypeScript| Garantizar un homogenidad de los datos de la API, y        |
|                   | eficiencia en interfaces      dinammicas                   |
| Redux Toolkit     | Manejo de estado global, asincronía con extraReducers      |
| React Hook Form   | Gestion de formularios, con persistencia de datos en       |
|                   | localStorage                                               |
| Mockaroo          | Mock de API, con soporte de filtros                        |
| Tailwind CSS      | capacidad para prototipar interfaces personalizadas        |


## Características (Features)

- Filtros Dinámicos: Filtrado por facultad, tipo y estado directamente desde la API.
- Persistencia de Formularios: Guardado automático en el navegador para evitar pérdida de datos.
- Paginación: Mejor visual de los datos obtenidos

### Datos de carreras

El listado se obtiene por HTTP desde [Mockaroo](https://www.mockaroo.com/) (`careersApi.ts`). Hace falta **conexión a internet** para que la sección de carreras cargue. Si la petición falla (clave, cuota o red), verás el mensaje de error manejado en el estado de Redux.

### Rutas

| Ruta        | Comportamiento                          |
| ----------- | --------------------------------------- |
| `/`         | Redirige a `/home`                      |
| `/home`     | Página principal (hero + carreras)      |
| `/carreras` | Redirige a `/home#carreras` (ancla)     |


