# Vercel 배포 가이드 (상세 버전)

이 가이드는 웹툴 모음 프로젝트를 Vercel에 배포하는 전체 과정을 단계별로 안내합니다.

---

## 📋 목차

1. [사전 준비사항](#1-사전-준비사항)
2. [GitHub 저장소 준비](#2-github-저장소-준비)
3. [Vercel 계정 생성 및 프로젝트 연결](#3-vercel-계정-생성-및-프로젝트-연결)
4. [환경 변수 설정](#4-환경-변수-설정)
5. [Supabase 설정 업데이트](#5-supabase-설정-업데이트)
6. [배포 확인](#6-배포-확인)
7. [도메인 연결 (선택사항)](#7-도메인-연결-선택사항)
8. [문제 해결](#8-문제-해결)

---

## 1. 사전 준비사항

배포를 시작하기 전에 다음 항목을 확인하세요:

### ✅ 체크리스트

- [ ] Supabase 프로젝트 생성 완료
- [ ] Supabase 데이터베이스 스키마 실행 완료
- [ ] 로컬에서 `npm run dev` 정상 작동 확인
- [ ] `.env.local` 파일에 Supabase 정보 입력 완료
- [ ] GitHub 계정 보유 (또는 GitLab, Bitbucket)

### 필요한 정보

1. **Supabase 정보** (이미 준비되어 있어야 함)
   - Project URL: `https://xxxxx.supabase.co`
   - Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

2. **GitHub 저장소** (다음 단계에서 생성)

---

## 2. GitHub 저장소 준비

### Step 1: Git 저장소 초기화 (아직 안 했다면)

프로젝트 폴더에서 다음 명령어 실행:

```bash
# Git 초기화 (이미 초기화되어 있다면 생략)
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: Web Tools Hub project"
```

### Step 2: GitHub 저장소 생성

1. GitHub 접속: https://github.com
2. 우측 상단 **"+"** 버튼 클릭 → **"New repository"** 선택
3. 저장소 설정:
   - **Repository name**: `web-tools-hub` (또는 원하는 이름)
   - **Description**: "웹툴 모음 - 무료 웹 도구 모음 사이트"
   - **Visibility**: Public 또는 Private 선택
   - **Initialize this repository with**: 체크하지 않음 (이미 로컬에 파일이 있으므로)
4. **"Create repository"** 클릭

### Step 3: 로컬 저장소를 GitHub에 연결

GitHub에서 생성된 저장소 페이지에서 표시되는 명령어를 사용하거나, 아래 명령어 사용:

```bash
# GitHub 저장소 URL을 원격 저장소로 추가
git remote add origin https://github.com/your-username/web-tools-hub.git

# 브랜치 이름을 main으로 설정 (필요한 경우)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

**참고**: `your-username`을 본인의 GitHub 사용자명으로 변경하세요.

### Step 4: 푸시 확인

GitHub 저장소 페이지에서 파일들이 올라갔는지 확인하세요.

---

## 3. Vercel 계정 생성 및 프로젝트 연결

### Step 1: Vercel 계정 생성

1. **Vercel 접속**: https://vercel.com
2. **"Sign Up"** 클릭
3. **GitHub 계정으로 로그인** 선택 (권장)
   - GitHub OAuth를 통해 자동으로 연결됩니다
   - 다른 방법(GitLab, Bitbucket, 이메일)도 가능합니다

### Step 2: 프로젝트 Import

1. Vercel 대시보드에서 **"Add New..."** → **"Project"** 클릭
2. **"Import Git Repository"** 섹션에서 GitHub 저장소 선택
   - 저장소가 보이지 않으면 **"Adjust GitHub App Permissions"** 클릭하여 권한 설정
3. 저장소 선택 후 **"Import"** 클릭

### Step 3: 프로젝트 설정

Vercel이 자동으로 프로젝트 설정을 감지합니다:

- **Framework Preset**: Next.js (자동 감지)
- **Root Directory**: `./` (기본값)
- **Build Command**: `npm run build` (자동 설정)
- **Output Directory**: `.next` (자동 설정)
- **Install Command**: `npm install` (자동 설정)

**변경할 필요 없음** - 그대로 **"Deploy"** 클릭하면 됩니다.

**⚠️ 주의**: 이 단계에서는 아직 환경 변수를 설정하지 않습니다. 먼저 배포를 완료한 후 환경 변수를 추가합니다.

---

## 4. 환경 변수 설정

### Step 1: 첫 배포 완료 대기

첫 배포가 완료되면 (약 1-2분 소요) 배포가 실패할 것입니다. 이는 환경 변수가 없기 때문입니다. 정상입니다.

### Step 2: 환경 변수 추가

1. Vercel 프로젝트 대시보드에서 **"Settings"** 탭 클릭
2. 좌측 메뉴에서 **"Environment Variables"** 클릭
3. 다음 환경 변수를 추가:

#### 변수 1: NEXT_PUBLIC_SUPABASE_URL

- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: Supabase Project URL (예: `https://xxxxx.supabase.co`)
- **Environment**: 
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- **"Add"** 클릭

#### 변수 2: NEXT_PUBLIC_SUPABASE_ANON_KEY

- **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Supabase Anon Key (긴 문자열)
- **Environment**: 
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- **"Add"** 클릭

### Step 3: 환경 변수 확인

추가한 변수가 목록에 표시되는지 확인하세요.

### Step 4: 재배포

1. **"Deployments"** 탭으로 이동
2. 최신 배포 항목의 **"..."** 메뉴 클릭
3. **"Redeploy"** 선택
4. **"Redeploy"** 버튼 클릭

또는 간단하게:
- **"Deployments"** 탭에서 최신 배포 항목의 **"Redeploy"** 버튼 클릭

---

## 5. Supabase 설정 업데이트

Vercel 배포가 완료되면 Supabase의 Redirect URLs을 업데이트해야 합니다.

### Step 1: Vercel 배포 URL 확인

1. Vercel 프로젝트 대시보드에서 **"Deployments"** 탭 확인
2. 최신 배포 항목의 **"Visit"** 버튼 옆 URL 복사
   - 예: `https://web-tools-hub.vercel.app`

### Step 2: Supabase Redirect URLs 설정

1. **Supabase 대시보드** 접속: https://supabase.com
2. 프로젝트 선택
3. 좌측 메뉴에서 **"Authentication"** → **"URL Configuration"** 클릭
4. 다음 설정 업데이트:

#### Site URL
```
https://your-project.vercel.app
```
(또는 커스텀 도메인을 사용하는 경우 해당 도메인)

#### Redirect URLs
다음 URL들을 추가 (각 줄에 하나씩):

```
https://your-project.vercel.app
https://your-project.vercel.app/auth/callback
https://your-project.vercel.app/**
```

**⚠️ 중요**: 
- `your-project.vercel.app`을 실제 Vercel 배포 URL로 변경하세요
- 여러 줄에 하나씩 입력하세요
- 와일드카드(`**`)는 모든 경로를 허용합니다

5. **"Save"** 클릭

### Step 3: 소셜 로그인 설정 (선택사항)

GitHub 로그인을 사용하는 경우:

1. **Supabase 대시보드** → **"Authentication"** → **"Providers"**
2. **"GitHub"** 클릭
3. **"Enable GitHub provider"** 토글 활성화
4. GitHub OAuth App 생성:
   - https://github.com/settings/developers 접속
   - **"New OAuth App"** 클릭
   - **Application name**: `Web Tools Hub`
   - **Homepage URL**: `https://your-project.vercel.app`
   - **Authorization callback URL**: `https://your-project.supabase.co/auth/v1/callback`
   - **"Register application"** 클릭
5. **Client ID**와 **Client Secret** 복사
6. Supabase에 **Client ID**와 **Client Secret** 입력
7. **"Save"** 클릭

---

## 6. 배포 확인

### Step 1: 사이트 접속

1. Vercel 대시보드에서 **"Visit"** 버튼 클릭
2. 또는 배포 URL로 직접 접속

### Step 2: 기능 테스트

다음 항목들을 확인하세요:

- [ ] 메인 페이지가 정상적으로 로드되는가?
- [ ] 도구 카드들이 표시되는가?
- [ ] 로그인 버튼이 작동하는가?
- [ ] 회원가입 페이지가 로드되는가?
- [ ] 로그인 후 프로필 페이지가 작동하는가?

### Step 3: 콘솔 오류 확인

1. 브라우저 개발자 도구 열기 (F12)
2. **Console** 탭 확인
3. Supabase 관련 오류가 없는지 확인

### Step 4: 네트워크 확인

1. 개발자 도구 → **Network** 탭
2. 페이지 새로고침
3. Supabase API 호출이 정상적으로 이루어지는지 확인

---

## 7. 도메인 연결 (선택사항)

커스텀 도메인을 사용하려면:

### Step 1: 도메인 구매

- Namecheap, GoDaddy, Google Domains 등에서 도메인 구매

### Step 2: Vercel에 도메인 추가

1. Vercel 프로젝트 → **"Settings"** → **"Domains"**
2. 도메인 입력 (예: `webtools.example.com`)
3. **"Add"** 클릭

### Step 3: DNS 설정

Vercel이 제공하는 DNS 레코드를 도메인 제공업체에 추가:

1. Vercel에서 표시되는 DNS 레코드 복사
2. 도메인 제공업체의 DNS 설정 페이지로 이동
3. 레코드 추가:
   - **Type**: A 또는 CNAME
   - **Name**: `@` 또는 서브도메인
   - **Value**: Vercel이 제공한 값
4. 저장

### Step 4: SSL 인증서

Vercel이 자동으로 SSL 인증서를 발급합니다 (몇 분 소요).

### Step 5: Supabase Redirect URLs 업데이트

커스텀 도메인을 Supabase Redirect URLs에 추가:

```
https://your-custom-domain.com
https://your-custom-domain.com/auth/callback
```

---

## 8. 문제 해결

### 문제 1: 배포 실패

**증상**: 배포가 실패하고 빌드 에러가 발생

**해결 방법**:
1. **"Deployments"** 탭에서 실패한 배포 클릭
2. **"Build Logs"** 확인
3. 일반적인 원인:
   - 환경 변수 누락 → 환경 변수 추가 후 재배포
   - TypeScript 오류 → 로컬에서 `npm run build` 실행하여 확인
   - 의존성 문제 → `package.json` 확인

### 문제 2: 환경 변수가 로드되지 않음

**증상**: 사이트는 로드되지만 Supabase 연결 실패

**해결 방법**:
1. Vercel → **"Settings"** → **"Environment Variables"** 확인
2. 변수 이름이 정확한지 확인 (`NEXT_PUBLIC_` 접두사 필수)
3. 모든 환경(Production, Preview, Development)에 추가되었는지 확인
4. 재배포 실행

### 문제 3: 인증 오류

**증상**: 로그인/회원가입이 작동하지 않음

**해결 방법**:
1. Supabase → **"Authentication"** → **"URL Configuration"** 확인
2. Redirect URLs에 Vercel URL이 추가되었는지 확인
3. Site URL이 올바른지 확인
4. 브라우저 콘솔에서 오류 메시지 확인

### 문제 4: CORS 오류

**증상**: 브라우저 콘솔에 CORS 관련 오류

**해결 방법**:
1. Supabase → **"Settings"** → **"API"**
2. **"Allowed Origins"**에 Vercel URL 추가
3. 저장 후 재시도

### 문제 5: 이미지나 정적 파일이 로드되지 않음

**증상**: 이미지나 CSS가 표시되지 않음

**해결 방법**:
1. `public` 폴더에 파일이 있는지 확인
2. 파일 경로가 올바른지 확인 (`/image.png` 형식)
3. 빌드 로그에서 경고 확인

---

## 9. 자동 배포 설정

### GitHub Push 시 자동 배포

기본적으로 Vercel은 GitHub에 푸시할 때마다 자동으로 배포합니다:

1. **Production 배포**: `main` 브랜치에 푸시
2. **Preview 배포**: 다른 브랜치에 푸시

### 자동 배포 비활성화 (필요한 경우)

1. Vercel → **"Settings"** → **"Git"**
2. **"Deploy Hooks"** 또는 **"Auto-deploy"** 설정 변경

---

## 10. 배포 후 체크리스트

배포가 완료된 후 다음을 확인하세요:

- [ ] 메인 페이지 정상 로드
- [ ] 모든 도구 카드 표시
- [ ] 로그인/회원가입 기능 작동
- [ ] 프로필 페이지 접근 가능
- [ ] 관리자 페이지 접근 가능 (관리자 계정으로)
- [ ] 모바일 반응형 작동
- [ ] 브라우저 콘솔에 오류 없음
- [ ] Supabase 연결 정상

---

## 11. 추가 리소스

### 유용한 링크

- **Vercel 문서**: https://vercel.com/docs
- **Next.js 배포 가이드**: https://nextjs.org/docs/deployment
- **Supabase 문서**: https://supabase.com/docs

### Vercel 무료 플랜 제한

- **대역폭**: 월 100GB
- **함수 실행 시간**: 100GB-초
- **빌드 시간**: 월 6000분

대부분의 소규모 프로젝트에는 충분합니다.

---

## 완료! 🎉

축하합니다! 웹툴 모음 사이트가 성공적으로 배포되었습니다.

추가 질문이나 문제가 있으면 언제든지 문의하세요.
