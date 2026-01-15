# 웹툴 모음 (Web Tools Hub)

누구나 무료로 사용하는 간편한 웹 도구 모음 사이트입니다.

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Form Management**: React Hook Form + Zod
- **State Management**: TanStack Query

## 주요 기능

### 사용자 기능
- ✅ 회원가입 (이메일/비밀번호)
- ✅ 로그인/로그아웃
- ✅ 소셜 로그인 (GitHub)
- ✅ 아이디 찾기
- ✅ 비밀번호 찾기/재설정
- ✅ 프로필 관리
- ✅ 비밀번호 변경
- ✅ 계정 삭제

### 관리자 기능
- ✅ 사용자 목록 조회
- ✅ 사용자 검색
- ✅ 사용자 상세 정보
- ✅ 사용자 역할 변경
- ✅ 사용자 정지/해제
- ✅ 사용자 삭제
- ✅ 통계 대시보드

## 시작하기

### 설치

```bash
npm install
```

### 환경 변수 설정

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 데이터베이스 설정

1. Supabase 프로젝트 생성
2. SQL Editor에서 `supabase/schema.sql` 실행

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
├── app/
│   ├── auth/              # 인증 페이지
│   │   ├── login/         # 로그인
│   │   ├── signup/        # 회원가입
│   │   ├── forgot-password/ # 비밀번호 찾기
│   │   ├── reset-password/ # 비밀번호 재설정
│   │   ├── find-email/    # 아이디 찾기
│   │   └── callback/      # 소셜 로그인 콜백
│   ├── profile/           # 프로필 페이지
│   ├── admin/             # 관리자 대시보드
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 메인 페이지
│   └── providers.tsx      # React Query Provider
├── components/
│   ├── ui/                # UI 컴포넌트
│   ├── header.tsx         # 헤더
│   └── footer.tsx         # 푸터
├── lib/
│   ├── supabase/          # Supabase 클라이언트
│   │   ├── client.ts      # 브라우저 클라이언트
│   │   ├── server.ts      # 서버 클라이언트
│   │   └── middleware.ts  # 미들웨어
│   ├── hooks/             # 커스텀 훅
│   ├── validations/       # 폼 검증 스키마
│   └── types/             # TypeScript 타입
├── supabase/
│   └── schema.sql         # 데이터베이스 스키마
└── middleware.ts          # Next.js 미들웨어
```

## 배포

### 📚 상세 배포 가이드

- **[Vercel 배포 가이드 (상세)](./docs/VERCEL_DEPLOYMENT_GUIDE.md)** - 단계별 상세 가이드
- **[간단 배포 가이드](./DEPLOYMENT.md)** - 빠른 참조용

### Vercel 배포 (권장) - 빠른 시작

1. **GitHub에 프로젝트 푸시**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/web-tools-hub.git
   git push -u origin main
   ```

2. **Vercel에서 프로젝트 Import**
   - https://vercel.com 접속
   - "Add New..." → "Project" 클릭
   - GitHub 저장소 선택 후 Import

3. **환경 변수 설정**
   - Settings → Environment Variables
   - `NEXT_PUBLIC_SUPABASE_URL` 추가
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` 추가

4. **Supabase Redirect URLs 설정**
   - Supabase → Authentication → URL Configuration
   - Vercel 배포 URL 추가

5. **배포 완료!** 🎉

## 디자인 시스템

- **색상**: Mid-Century Modern 스타일
  - 배경: 크림색 (#FDFBF7)
  - 텍스트: 다크 차콜 (#333333)
  - 액센트: 딥 포레스트 그린, 뮤트 오렌지, 머스타드 옐로우
- **타이포그래피**: Inter / DM Sans
- **레이아웃**: 반응형 그리드 시스템

## 제공 도구

### 이미지/미디어
- QR 코드 생성기
- 유튜브 썸네일 추출기
- 이미지 용량 압축

### 텍스트/변환
- 실시간 글자수 세기
- 대소문자 변환기
- JSON 포맷터

### 생활/금융
- D-Day 계산기
- 단위 변환기
- 대출 이자 계산기

## 라이선스

MIT
