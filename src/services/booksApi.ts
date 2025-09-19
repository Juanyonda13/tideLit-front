import axios from 'axios'
import type { BookDto } from '@/types/book'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 8000,
})

export async function fetchBooks(): Promise<BookDto[]> {
  const { data } = await http.get<BookDto[]>('/books')
  return data
}