<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useBooks } from '@/composables/useBooks'

const { books, loading, error, load, refresh } = useBooks()
onMounted(load)

const rows = computed(() =>
  books.value.map(b => ({
    ...b,
    average_display:
      b.average_rating === null ? '—' : Number(b.average_rating).toFixed(2),
  })),
)
</script>

<template>
  <section class="container">
    <header class="header">
      <h1>Libros</h1>
      <button class="btn" :disabled="loading" @click="refresh">
        {{ loading ? 'Actualizando...' : 'Refrescar' }}
      </button>
    </header>

    <p v-if="error" class="error">⚠️ {{ error }}</p>

    <table class="table" v-if="rows.length">
      <thead>
        <tr>
          <th>Título</th>
          <th>Autor</th>
          <th>Año</th>
          <th>Promedio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in rows" :key="b.title + b.published_year">
          <td>{{ b.title }}</td>
          <td>{{ b.author }}</td>
          <td>{{ b.published_year }}</td>
          <td>{{ b.average_display }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="!loading && !rows.length && !error">Sin datos.</p>
  </section>
</template>

<style scoped>
.container { max-width: 860px; margin: 2rem auto; padding: 0 1rem; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.btn { padding: .5rem 1rem; border: 1px solid #ddd; border-radius: .5rem; cursor: pointer; }
.btn:disabled { opacity: .6; cursor: not-allowed; }
.table { width: 100%; border-collapse: collapse; }
.table th, .table td { padding: .6rem .8rem; border-bottom: 1px solid #eee; text-align: left; }
.error { color: #b00020; margin-bottom: 1rem; }
</style>
