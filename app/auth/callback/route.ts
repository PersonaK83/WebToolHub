import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL에 redirect 파라미터가 있으면 해당 경로로, 없으면 홈으로
  const redirectTo = requestUrl.searchParams.get('redirect') || '/'
  return NextResponse.redirect(`${origin}${redirectTo}`)
}
