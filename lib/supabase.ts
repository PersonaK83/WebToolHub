import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

export function createSupabaseClient(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== 'undefined') {
      console.warn(
        '⚠️ Supabase API 키가 설정되지 않았습니다. 인증 기능을 사용할 수 없습니다.'
      )
    }
    return null
  }

  try {
    return createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Supabase 클라이언트 생성 실패:', error)
    return null
  }
}

export function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient()
  }
  return supabaseClient
}

export function isSupabaseAvailable(): boolean {
  return getSupabaseClient() !== null
}
