import { z } from 'zod'

// 회원가입 스키마
export const signUpSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .regex(/[A-Za-z]/, '비밀번호에 영문이 포함되어야 합니다.')
    .regex(/[0-9]/, '비밀번호에 숫자가 포함되어야 합니다.')
    .regex(/[^A-Za-z0-9]/, '비밀번호에 특수문자가 포함되어야 합니다.'),
  confirmPassword: z.string(),
  username: z.string().min(2, '사용자명은 최소 2자 이상이어야 합니다.').max(20, '사용자명은 최대 20자까지 가능합니다.').optional(),
  fullName: z.string().min(1, '이름을 입력해주세요.').optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, '약관에 동의해주세요.'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword'],
})

// 로그인 스키마
export const signInSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
  rememberMe: z.boolean().optional(),
})

// 비밀번호 재설정 요청 스키마
export const forgotPasswordSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
})

// 비밀번호 재설정 스키마
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .regex(/[A-Za-z]/, '비밀번호에 영문이 포함되어야 합니다.')
    .regex(/[0-9]/, '비밀번호에 숫자가 포함되어야 합니다.')
    .regex(/[^A-Za-z0-9]/, '비밀번호에 특수문자가 포함되어야 합니다.'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword'],
})

// 프로필 수정 스키마
export const updateProfileSchema = z.object({
  username: z.string().min(2, '사용자명은 최소 2자 이상이어야 합니다.').max(20, '사용자명은 최대 20자까지 가능합니다.').optional(),
  fullName: z.string().min(1, '이름을 입력해주세요.').optional(),
  avatarUrl: z.string().url('올바른 URL 형식이 아닙니다.').optional().or(z.literal('')),
})

// 비밀번호 변경 스키마
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, '현재 비밀번호를 입력해주세요.'),
  newPassword: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .regex(/[A-Za-z]/, '비밀번호에 영문이 포함되어야 합니다.')
    .regex(/[0-9]/, '비밀번호에 숫자가 포함되어야 합니다.')
    .regex(/[^A-Za-z0-9]/, '비밀번호에 특수문자가 포함되어야 합니다.'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword'],
})

export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
