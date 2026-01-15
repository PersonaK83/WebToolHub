# 빠른 배포 가이드 (5분 완성)

이 가이드는 최소한의 단계로 빠르게 배포하는 방법을 안내합니다.

## 전제 조건

- ✅ Supabase 프로젝트 생성 완료
- ✅ GitHub 계정 보유
- ✅ 로컬에서 프로젝트가 정상 작동

## 1단계: GitHub에 푸시 (2분)

```bash
# 프로젝트 폴더에서 실행
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/web-tools-hub.git
git push -u origin main
```

## 2단계: Vercel 배포 (2분)

1. https://vercel.com 접속 → GitHub로 로그인
2. "Add New..." → "Project" 클릭
3. GitHub 저장소 선택 → "Import" 클릭
4. "Deploy" 클릭 (설정 변경 불필요)

## 3단계: 환경 변수 추가 (1분)

1. 배포 완료 후 "Settings" → "Environment Variables"
2. 다음 2개 변수 추가:
   - `NEXT_PUBLIC_SUPABASE_URL` = Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Supabase Anon Key
3. "Deployments" → 최신 배포 → "Redeploy"

## 4단계: Supabase 설정 (1분)

1. Supabase → "Authentication" → "URL Configuration"
2. Site URL: `https://your-project.vercel.app`
3. Redirect URLs에 추가:
   ```
   https://your-project.vercel.app
   https://your-project.vercel.app/auth/callback
   ```

## 완료! 🎉

이제 사이트가 정상 작동합니다.

**상세 가이드가 필요하면**: [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) 참조
