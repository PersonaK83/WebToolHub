# 배포 가이드

## Vercel 배포

### 1. 사전 준비

1. **GitHub 저장소 생성**
   - 프로젝트를 GitHub에 푸시합니다.

2. **Supabase 프로젝트 생성**
   - https://supabase.com 에서 새 프로젝트 생성
   - 프로젝트 설정에서 URL과 Anon Key 복사

3. **데이터베이스 스키마 설정**
   - Supabase 대시보드 → SQL Editor로 이동
   - `supabase/schema.sql` 파일의 내용을 복사하여 실행

### 2. Vercel 배포

1. **Vercel 계정 생성**
   - https://vercel.com 에서 GitHub 계정으로 로그인

2. **프로젝트 Import**
   - "New Project" 클릭
   - GitHub 저장소 선택
   - 프로젝트 설정:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **환경 변수 설정**
   - Vercel 프로젝트 설정 → Environment Variables
   - 다음 변수 추가:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **배포**
   - "Deploy" 버튼 클릭
   - 배포 완료 후 자동으로 도메인 생성됨

### 3. Supabase 설정

1. **인증 설정**
   - Supabase 대시보드 → Authentication → URL Configuration
   - Site URL: `https://your-vercel-app.vercel.app`
   - Redirect URLs: `https://your-vercel-app.vercel.app/auth/callback`

2. **소셜 로그인 설정 (선택사항)**
   - GitHub: Authentication → Providers → GitHub
   - Client ID와 Secret 설정
   - Google: Authentication → Providers → Google
   - Client ID와 Secret 설정

3. **Row Level Security (RLS) 확인**
   - 모든 테이블에 RLS가 활성화되어 있는지 확인
   - 정책이 올바르게 설정되어 있는지 확인

### 4. 도메인 연결 (선택사항)

1. **커스텀 도메인 추가**
   - Vercel 프로젝트 설정 → Domains
   - 도메인 추가 및 DNS 설정

2. **Supabase Redirect URL 업데이트**
   - 새 도메인으로 Redirect URLs 업데이트

## 로컬 개발 환경 설정

### 1. 환경 변수 설정

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

## 문제 해결

### 인증 오류
- 환경 변수가 올바르게 설정되었는지 확인
- Supabase Redirect URLs이 올바른지 확인

### 데이터베이스 오류
- RLS 정책이 올바르게 설정되었는지 확인
- 스키마가 올바르게 적용되었는지 확인

### 빌드 오류
- Node.js 버전 확인 (18.x 이상 권장)
- 의존성 재설치: `rm -rf node_modules package-lock.json && npm install`
