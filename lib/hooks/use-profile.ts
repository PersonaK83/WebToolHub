'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']

export function useProfile(userId?: string) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    async function fetchProfile() {
      try {
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (fetchError) throw fetchError
        setProfile(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : '프로필을 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [userId, supabase])

  return { profile, loading, error }
}
