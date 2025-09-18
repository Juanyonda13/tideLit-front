import { ref } from 'vue'
import { fetchBooks } from '@/services/booksApi'
import type { BookDto } from '@/types/book'

export function useBooks() {
  const books = ref<BookDto[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const load = async () => {
    loading.value = true
    error.value = null
    try {
      books.value = await fetchBooks()
    } catch (e: any) {
      error.value = e?.message ?? 'Error al cargar libros'
    } finally {
      loading.value = false
    }
  }

  const refresh = () => load()

  return { books, loading, error, load, refresh }
}
