'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/lib/hooks/use-auth'
import { useProfile } from '@/lib/hooks/use-profile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Users, Shield, Ban, CheckCircle, XCircle, Eye, Edit } from 'lucide-react'
import { format } from 'date-fns'
import type { Database } from '@/lib/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']

export default function AdminPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { profile } = useProfile(user?.id)
  const [users, setUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null)
  const [showUserDetail, setShowUserDetail] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    if (profile && profile.role !== 'admin') {
      router.push('/')
      return
    }

    fetchUsers()
  }, [user, profile, router])

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (err) {
      console.error('사용자 목록 불러오기 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchUsers()
      return
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .or(`email.ilike.%${searchTerm}%,username.ilike.%${searchTerm}%,full_name.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (err) {
      console.error('검색 실패:', err)
    }
  }

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin' | 'moderator') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)

      if (error) throw error
      await fetchUsers()
      if (selectedUser?.id === userId) {
        setSelectedUser({ ...selectedUser, role: newRole })
      }
    } catch (err) {
      alert('역할 변경에 실패했습니다.')
    }
  }

  const handleSuspendUser = async (userId: string, suspend: boolean, reason?: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          is_active: !suspend,
          suspended_until: suspend ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null,
          suspend_reason: suspend ? reason || '관리자에 의해 정지됨' : null,
        })
        .eq('id', userId)

      if (error) throw error
      await fetchUsers()
      if (selectedUser?.id === userId) {
        setSelectedUser({
          ...selectedUser,
          is_active: !suspend,
          suspended_until: suspend ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null,
          suspend_reason: suspend ? reason || '관리자에 의해 정지됨' : null,
        })
      }
    } catch (err) {
      alert('사용자 정지/해제에 실패했습니다.')
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('정말로 이 사용자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return
    }

    try {
      // 관련 데이터 삭제
      await supabase.from('user_saved_data').delete().eq('user_id', userId)
      await supabase.from('tool_usage_logs').delete().eq('user_id', userId)
      await supabase.from('user_sessions').delete().eq('user_id', userId)
      await supabase.from('profiles').delete().eq('id', userId)

      // Auth 사용자 삭제 (관리자 권한 필요)
      const { error: deleteError } = await supabase.auth.admin.deleteUser(userId)
      if (deleteError) {
        console.error('Auth 사용자 삭제 실패:', deleteError)
      }

      await fetchUsers()
      if (selectedUser?.id === userId) {
        setShowUserDetail(false)
        setSelectedUser(null)
      }
    } catch (err) {
      alert('사용자 삭제에 실패했습니다.')
    }
  }

  if (loading || !profile || profile.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-charcoal/70">로딩 중...</div>
      </div>
    )
  }

  const filteredUsers = users.filter((user) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      user.email?.toLowerCase().includes(term) ||
      user.username?.toLowerCase().includes(term) ||
      user.full_name?.toLowerCase().includes(term)
    )
  })

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-charcoal mb-2">관리자 대시보드</h1>
            <p className="text-charcoal/70">사용자 관리 및 통계</p>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-forest-green" />
            <span className="text-charcoal font-medium">관리자</span>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-charcoal/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal/70 mb-1">전체 사용자</p>
                <p className="text-2xl font-bold text-charcoal">{users.length}</p>
              </div>
              <Users className="w-8 h-8 text-forest-green" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-charcoal/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal/70 mb-1">활성 사용자</p>
                <p className="text-2xl font-bold text-charcoal">
                  {users.filter((u) => u.is_active).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-forest-green" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-charcoal/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal/70 mb-1">정지된 사용자</p>
                <p className="text-2xl font-bold text-charcoal">
                  {users.filter((u) => !u.is_active).length}
                </p>
              </div>
              <Ban className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-charcoal/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal/70 mb-1">관리자</p>
                <p className="text-2xl font-bold text-charcoal">
                  {users.filter((u) => u.role === 'admin').length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-forest-green" />
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white rounded-lg border border-charcoal/10 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
              <Input
                type="text"
                placeholder="이메일, 사용자명, 이름으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch}>검색</Button>
            <Button variant="outline" onClick={() => {
              setSearchTerm('')
              fetchUsers()
            }}>
              초기화
            </Button>
          </div>
        </div>

        {/* 사용자 목록 */}
        <div className="bg-white rounded-lg border border-charcoal/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-charcoal/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-charcoal uppercase tracking-wider">
                    사용자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-charcoal uppercase tracking-wider">
                    역할
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-charcoal uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-charcoal uppercase tracking-wider">
                    가입일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-charcoal uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-charcoal/5">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-charcoal">
                          {user.full_name || user.username || user.email}
                        </div>
                        <div className="text-sm text-charcoal/60">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          user.role === 'admin'
                            ? 'bg-forest-green/20 text-forest-green'
                            : 'bg-charcoal/10 text-charcoal'
                        }`}
                      >
                        {user.role === 'admin' ? '관리자' : user.role === 'moderator' ? '모더레이터' : '사용자'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.is_active ? (
                        <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
                          활성
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-800">
                          정지
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal/70">
                      {format(new Date(user.created_at), 'yyyy-MM-dd')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user)
                            setShowUserDetail(true)
                          }}
                          className="text-forest-green hover:text-forest-green/80"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 사용자 상세 모달 */}
        {showUserDetail && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-charcoal/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-charcoal">사용자 상세 정보</h2>
                  <button
                    onClick={() => {
                      setShowUserDetail(false)
                      setSelectedUser(null)
                    }}
                    className="text-charcoal/70 hover:text-charcoal"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-charcoal/70 mb-2">기본 정보</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-charcoal/60">이메일:</span>
                      <span className="ml-2 text-charcoal">{selectedUser.email}</span>
                    </div>
                    <div>
                      <span className="text-sm text-charcoal/60">사용자명:</span>
                      <span className="ml-2 text-charcoal">{selectedUser.username || '-'}</span>
                    </div>
                    <div>
                      <span className="text-sm text-charcoal/60">이름:</span>
                      <span className="ml-2 text-charcoal">{selectedUser.full_name || '-'}</span>
                    </div>
                    <div>
                      <span className="text-sm text-charcoal/60">가입일:</span>
                      <span className="ml-2 text-charcoal">
                        {format(new Date(selectedUser.created_at), 'yyyy-MM-dd HH:mm')}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-charcoal/70 mb-2">역할 변경</h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={selectedUser.role === 'user' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleRoleChange(selectedUser.id, 'user')}
                    >
                      사용자
                    </Button>
                    <Button
                      variant={selectedUser.role === 'moderator' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleRoleChange(selectedUser.id, 'moderator')}
                    >
                      모더레이터
                    </Button>
                    <Button
                      variant={selectedUser.role === 'admin' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleRoleChange(selectedUser.id, 'admin')}
                    >
                      관리자
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-charcoal/70 mb-2">계정 상태</h3>
                  <div className="space-y-2">
                    {selectedUser.is_active ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          const reason = prompt('정지 사유를 입력하세요:')
                          if (reason) {
                            handleSuspendUser(selectedUser.id, true, reason)
                          }
                        }}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Ban className="w-4 h-4 mr-2" />
                        사용자 정지
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleSuspendUser(selectedUser.id, false)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        정지 해제
                      </Button>
                    )}
                    {selectedUser.suspend_reason && (
                      <p className="text-sm text-red-600">정지 사유: {selectedUser.suspend_reason}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-charcoal/70 mb-2 text-red-600">위험 작업</h3>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDeleteUser(selectedUser.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    사용자 삭제
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
