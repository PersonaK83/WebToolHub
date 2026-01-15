'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfileSchema, changePasswordSchema, type UpdateProfileInput, type ChangePasswordInput } from '@/lib/validations/auth'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/lib/hooks/use-auth'
import { useProfile } from '@/lib/hooks/use-profile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, Mail, Lock, Save, LogOut, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const { profile, loading: profileLoading } = useProfile(user?.id)
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'delete'>('profile')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const supabase = createClient()

  const profileForm = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: profile?.username || '',
      fullName: profile?.full_name || '',
      avatarUrl: profile?.avatar_url || '',
    },
  })

  const passwordForm = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  })

  useEffect(() => {
    if (profile) {
      profileForm.reset({
        username: profile.username || '',
        fullName: profile.full_name || '',
        avatarUrl: profile.avatar_url || '',
      })
    }
  }, [profile, profileForm])

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [user, router])

  const onUpdateProfile = async (data: UpdateProfileInput) => {
    if (!user) return

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          username: data.username || null,
          full_name: data.fullName || null,
          avatar_url: data.avatarUrl || null,
        })
        .eq('id', user.id)

      if (updateError) throw updateError

      setSuccess('프로필이 업데이트되었습니다.')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : '프로필 업데이트에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const onChangePassword = async (data: ChangePasswordInput) => {
    if (!user) return

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // 현재 비밀번호 확인
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password: data.currentPassword,
      })

      if (signInError) {
        throw new Error('현재 비밀번호가 올바르지 않습니다.')
      }

      // 새 비밀번호로 변경
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.newPassword,
      })

      if (updateError) throw updateError

      setSuccess('비밀번호가 변경되었습니다.')
      passwordForm.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : '비밀번호 변경에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const onDeleteAccount = async () => {
    if (!user) return

    const confirmed = confirm(
      '정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.'
    )

    if (!confirmed) return

    setLoading(true)
    setError(null)

    try {
      // 사용자 데이터 삭제
      await supabase.from('user_saved_data').delete().eq('user_id', user.id)
      await supabase.from('tool_usage_logs').delete().eq('user_id', user.id)
      await supabase.from('user_sessions').delete().eq('user_id', user.id)
      await supabase.from('profiles').delete().eq('id', user.id)

      // Auth 사용자 삭제
      const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id)

      if (deleteError) {
        // 관리자 권한이 없는 경우 일반 삭제
        await supabase.auth.signOut()
      }

      router.push('/')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : '계정 삭제에 실패했습니다.')
      setLoading(false)
    }
  }

  if (!user || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-charcoal/70">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-charcoal mb-8">프로필 설정</h1>

        <div className="bg-white rounded-lg border border-charcoal/10 shadow-lg">
          {/* 탭 메뉴 */}
          <div className="border-b border-charcoal/10">
            <div className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'profile'
                    ? 'text-forest-green border-b-2 border-forest-green'
                    : 'text-charcoal/70 hover:text-charcoal'
                }`}
              >
                프로필 정보
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'password'
                    ? 'text-forest-green border-b-2 border-forest-green'
                    : 'text-charcoal/70 hover:text-charcoal'
                }`}
              >
                비밀번호 변경
              </button>
              <button
                onClick={() => setActiveTab('delete')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'delete'
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-charcoal/70 hover:text-charcoal'
                }`}
              >
                계정 삭제
              </button>
            </div>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                {success}
              </div>
            )}

            {/* 프로필 정보 탭 */}
            {activeTab === 'profile' && (
              <form onSubmit={profileForm.handleSubmit(onUpdateProfile)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    이메일
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                    <Input
                      type="email"
                      value={user.email || ''}
                      disabled
                      className="pl-10 bg-charcoal/5"
                    />
                  </div>
                  <p className="mt-1 text-sm text-charcoal/60">이메일은 변경할 수 없습니다.</p>
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-charcoal mb-2">
                    사용자명
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="사용자명"
                      className="pl-10"
                      {...profileForm.register('username')}
                    />
                  </div>
                  {profileForm.formState.errors.username && (
                    <p className="mt-1 text-sm text-red-600">
                      {profileForm.formState.errors.username.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-charcoal mb-2">
                    이름
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="이름"
                    {...profileForm.register('fullName')}
                  />
                  {profileForm.formState.errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">
                      {profileForm.formState.errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="avatarUrl" className="block text-sm font-medium text-charcoal mb-2">
                    아바타 URL
                  </label>
                  <Input
                    id="avatarUrl"
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    {...profileForm.register('avatarUrl')}
                  />
                  {profileForm.formState.errors.avatarUrl && (
                    <p className="mt-1 text-sm text-red-600">
                      {profileForm.formState.errors.avatarUrl.message}
                    </p>
                  )}
                </div>

                <Button type="submit" disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? '저장 중...' : '저장'}
                </Button>
              </form>
            )}

            {/* 비밀번호 변경 탭 */}
            {activeTab === 'password' && (
              <form onSubmit={passwordForm.handleSubmit(onChangePassword)} className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-charcoal mb-2">
                    현재 비밀번호
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="현재 비밀번호"
                      className="pl-10"
                      {...passwordForm.register('currentPassword')}
                    />
                  </div>
                  {passwordForm.formState.errors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordForm.formState.errors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-charcoal mb-2">
                    새 비밀번호
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="새 비밀번호 (최소 8자, 영문+숫자+특수문자)"
                      className="pl-10"
                      {...passwordForm.register('newPassword')}
                    />
                  </div>
                  {passwordForm.formState.errors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-charcoal mb-2">
                    새 비밀번호 확인
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="새 비밀번호 확인"
                      className="pl-10"
                      {...passwordForm.register('confirmPassword')}
                    />
                  </div>
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button type="submit" disabled={loading}>
                  <Lock className="w-4 h-4 mr-2" />
                  {loading ? '변경 중...' : '비밀번호 변경'}
                </Button>
              </form>
            )}

            {/* 계정 삭제 탭 */}
            {activeTab === 'delete' && (
              <div className="space-y-6">
                <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">계정 삭제</h3>
                  <p className="text-red-700 text-sm mb-4">
                    계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
                    <br />
                    다음 데이터가 삭제됩니다:
                  </p>
                  <ul className="list-disc list-inside text-red-700 text-sm space-y-1 mb-4">
                    <li>프로필 정보</li>
                    <li>저장된 데이터</li>
                    <li>사용 로그</li>
                    <li>세션 정보</li>
                  </ul>
                  <Button
                    variant="secondary"
                    onClick={onDeleteAccount}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {loading ? '삭제 중...' : '계정 삭제'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
