export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          role: 'user' | 'admin' | 'moderator'
          is_active: boolean
          suspended_until: string | null
          suspend_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'moderator'
          is_active?: boolean
          suspended_until?: string | null
          suspend_reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'moderator'
          is_active?: boolean
          suspended_until?: string | null
          suspend_reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tool_usage_logs: {
        Row: {
          id: string
          user_id: string | null
          tool_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          tool_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          tool_id?: string
          created_at?: string
        }
      }
      user_saved_data: {
        Row: {
          id: string
          user_id: string
          tool_id: string
          data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool_id: string
          data: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool_id?: string
          data?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
