---
title: "Data Fetching en Astro: SSR, SSG y Client-Side"
author: "Bitkay"
description: "Explorando las diferentes estrategias de data fetching en Astro y cuándo usar cada una"
image:
  url: "https://docs.astro.build/assets/arc.webp"
  alt: "Data fetching strategies diagram with stars"
pubDate: 2026-01-29
tags: ["astro", "data-fetching", "ssr", "ssg", "javascript", "frontend"]
---

# Data Fetching en Astro: Estrategias y Casos de Uso

Como desarrollador frontend, he aprendido que la elección correcta de estrategia de data fetching puede marcar la diferencia en el rendimiento y la experiencia del usuario. Hoy exploraremos las diferentes opciones que ofrece Astro.

## 🏗️ **Estrategias Principales**

### **1. Server-Side Rendering (SSR)**

El SSR en Astro ocurre durante el build-time o en cada request:

```astro
---
// Pages/blog/[slug].astro
export async function getStaticPaths() {
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json());

  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }));
}

const { post } = Astro.props;
---

<h1>{post.title}</h1>
<p>{post.content}</p>
```

**Ventajas:**

- SEO optimizado
- Fast first paint
- Perfecto para contenido estático

**Casos de uso:**

- Blogs y documentación
- Portafolios
- Marketing sites

### **2. Client-Side Navigation**

Para contenido dinámico que necesita ser interactivo:

```astro
---
// Componente interactivo
---
<div id="app" client:load>
  <!-- El componente se hidrata en el cliente -->
  <script>
    const response = await fetch('/api/user-data');
    const data = await response.json();

    // Manipulación del DOM
    document.getElementById('app').innerHTML = `
      <h2>Bienvenido ${data.name}</h2>
    `;
  </script>
</div>
```

**Ventajas:**

- Interactividad completa
- Datos siempre actualizados
- Ideal para dashboards

### **3. Hybrid Approach**

Combinando lo mejor de ambos mundos:

```astro
---
// Posts estáticos con comentarios dinámicos
const posts = await fetch('https://api.example.com/posts')
  .then(res => res.json());
---

<h1>Posts Recientes</h1>
{posts.map(post => (
  <article>
    <h2>{post.title}</h2>
    <p>{post.excerpt}</p>

    <!-- Comentarios cargados en cliente -->
    <div client:load>
      <Comments postId={post.id} />
    </div>
  </article>
))}
```

## 🚀 **Directivas de Hidratación**

### `client:load`

```astro
<MyComponent client:load /> // Se hidrata inmediatamente
```

### `client:idle`

```astro
<MyComponent client:idle /> // Se hidrata cuando el navegador está inactivo
```

### `client:visible`

```astro
<MyComponent client:visible /> // Se hidrata cuando es visible en viewport
```

### `client:only`

```astro
<MyReactComponent client:only="react" /> // Solo se renderiza en cliente
```

## 💡 **Experiencia practica**

```astro
---
// Ejemplo real: Dashboard bancario
const { userId } = Astro.params;
const userSummary = await fetchBankingData(userId);
---

<div class="dashboard">
  <header>
    <h1>Bienvenido, {userSummary.name}</h1>
    <p class="balance">Saldo: ${formatCurrency(userSummary.balance)}</p>
  </header>

  <!-- Transacciones en tiempo real -->
  <section client:load>
    <TransactionFeed userId={userId} />
  </section>
</div>
```

## 🎯 **Best Practices**

### **1. Estrategia de Caching**

```javascript
// Cache en SSR
export async function GET({ params }) {
  const cacheKey = `user-${params.id}`;
  const cached = await cache.get(cacheKey);

  if (cached) {
    return new Response(JSON.stringify(cached));
  }

  const data = await fetchUserData(params.id);
  await cache.set(cacheKey, data, { ttl: 3600 });

  return new Response(JSON.stringify(data));
}
```

### **2. Error Boundaries**

```astro
---
let posts = [];
let error = null;

try {
  posts = await fetchPosts();
} catch (e) {
  error = e;
  console.error('Error fetching posts:', e);
}
---

{error ? (
  <div class="error-state">
    <h2>No pudimos cargar los posts</h2>
    <p>Por favor intenta más tarde</p>
  </div>
) : (
  <PostList posts={posts} />
)}
```

### **3. Loading States**

```astro
<div class="posts-grid">
  {posts.map(post => (
    <article>
      <h2>{post.title}</h2>

      <!-- Loading skeleton para comments -->
      <div class="comments-section" client:visible>
        <div class="skeleton">
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
        </div>

        <Comments postId={post.id} />
      </div>
    </article>
  ))}
</div>
```

## 🔧 **Tips Avanzados**

### **1. Pre-fetching Strategy**

```astro
---
const posts = await fetch('/api/posts').then(r => r.json());
const preloadedPosts = await Promise.all(
  posts.slice(0, 3).map(post =>
    fetch(`/api/posts/${post.id}`).then(r => r.json())
  )
);
---
```

### **2. Optimización de Imágenes**

```astro
{posts.map(post => (
  <article>
    <img
      src={post.image}
      alt={post.title}
      loading="lazy"
      width="400"
      height="300"
      decoding="async"
    />
  </article>
))}
```

### **3. Streaming Response**

```javascript
// Server-side streaming para grandes datasets
export async function GET() {
  const posts = await fetchLargeDataset();

  return new Response(
    posts.pipeThrough(
      new TransformStream({
        transform(chunk, controller) {
          // Transform data on the fly
          controller.enqueue(transformChunk(chunk));
        },
      }),
    ),
    {
      headers: { "Content-Type": "application/json" },
    },
  );
}
```

## 🎯 **Conclusiones**

La clave del data fetching en Astro está en entender **qué** necesitas mostrar y **cuándo** debe estar disponible:

- **Contenido estático** → SSR/SSG para SEO
- **Interactividad real** → Client-side con hidratación inteligente
- **Experiencia híbrida** → Combina ambas estrategias

Si me preguntas yo diria que el 70% del contenido puede ser SSR, el 20% hybrid, y solo el 10% necesita ser puramente client-side.
