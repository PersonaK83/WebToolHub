import { createClient } from '@supabase/supabase-js'

// Supabase 클라이언트를 안전하게 생성 (API 키가 없어도 앱이 크래시되지 않도록)
export function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // API 키가 없는 경우 null 반환
  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== 'undefined') {
      console.warn('⚠️ Supabase API 키가 설정되지 않았습니다. 인증 기능을 사용할 수 없습니다.')
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

// 클라이언트 인스턴스 (싱글톤 패턴)
let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient()
  }
  return supabaseClient
}

// Supabase 사용 가능 여부 확인
export function isSupabaseAvailable(): boolean {
  return getSupabaseClient() !== null
}
