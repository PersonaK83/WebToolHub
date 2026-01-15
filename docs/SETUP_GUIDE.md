# 설정 가이드

## 1. Supabase SQL 스키마 실행

### ⚠️ 경고 메시지에 대해

Supabase SQL Editor에서 "destructive operation" 경고가 나타나는 이유는 스크립트에 `DROP TRIGGER` 명령이 포함되어 있기 때문입니다. 이는 **정상적인 동작**이며 안전합니다:

- `IF EXISTS`를 사용하여 기존 트리거가 없어도 에러가 발생하지 않습니다
- 새 프로젝트라면 기존 트리거가 없으므로 문제없습니다
- 트리거를 삭제한 후 바로 새 트리거를 생성합니다

### 실행 방법

**옵션 1: 원본 스키마 사용 (권장)**
1. Supabase 대시보드 → SQL Editor
2. `supabase/schema.sql` 파일 내용 복사
3. SQL Editor에 붙여넣기
4. 경고 메시지 확인 후 "Execute" 클릭
5. ✅ 정상적으로 실행됩니다

**옵션 2: 안전 버전 사용 (더 안전)**
1. `supabase/schema-safe.sql` 파일 사용
2. 이 버전은 DO 블록을 사용하여 더 안전하게 트리거를 처리합니다

### 실행 후 확인

실행 후 다음을 확인하세요:

1. **테이블 생성 확인**
   - Table Editor에서 다음 테이블이 생성되었는지 확인:
     - `profiles`
     - `user_sessions`
     - `tool_usage_logs`
     - `user_saved_data`
     - `password_reset_tokens`

2. **RLS 정책 확인**
   - 각 테이블의 "Policies" 탭에서 정책이 생성되었는지 확인

3. **트리거 확인**
   - Database → Triggers에서 다음 트리거가 있는지 확인:
     - `on_auth_user_created`
     - `update_profiles_updated_at`
     - `update_user_saved_data_updated_at`

---

## 2. .env.local 파일 생성 가이드

### Windows 환경

#### 방법 1: 파일 탐색기 사용

1. **프로젝트 폴더 열기**
   - `E:\_GYUN\AI\Web Tools Hub` 폴더를 파일 탐색기에서 엽니다

2. **새 파일 생성**
   - 빈 공간에서 우클릭 → "새로 만들기" → "텍스트 문서"
   - 파일 이름을 `.env.local`로 변경
   - ⚠️ **중요**: 파일 확장자 `.txt`를 제거해야 합니다
   - Windows가 "확장자를 변경하면 파일을 사용할 수 없게 될 수 있습니다" 경고를 표시하면 "예" 클릭

3. **파일 내용 입력**
   - `.env.local` 파일을 메모장이나 VS Code로 엽니다
   - 다음 내용을 입력:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

4. **Supabase 정보 가져오기**
   - Supabase 대시보드 → Settings → API
   - **Project URL** 복사 → `NEXT_PUBLIC_SUPABASE_URL`에 붙여넣기
   - **anon public** 키 복사 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 붙여넣기

#### 방법 2: 명령 프롬프트 사용

1. **프로젝트 폴더로 이동**
   ```cmd
cd "E:\_GYUN\AI\Web Tools Hub"
```

2. **파일 생성**
   ```cmd
echo. > .env.local
   ```

3. **파일 편집**
   - VS Code나 메모장으로 `.env.local` 파일 열기
   - 위의 내용 입력

#### 방법 3: VS Code 사용 (가장 쉬움)

1. **VS Code에서 프로젝트 열기**
   - `E:\_GYUN\AI\Web Tools Hub` 폴더를 VS Code로 엽니다

2. **새 파일 생성**
   - 좌측 파일 탐색기에서 프로젝트 루트 폴더 우클릭
   - "New File" 클릭
   - 파일 이름: `.env.local` 입력

3. **내용 입력**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Supabase 정보 입력**
   - Supabase 대시보드에서 URL과 키 복사하여 붙여넣기

### Mac/Linux 환경

#### 터미널 사용

1. **프로젝트 폴더로 이동**
   ```bash
   cd "/path/to/Web Tools Hub"
   ```

2. **파일 생성**
   ```bash
   touch .env.local
   ```

3. **파일 편집**
   ```bash
   nano .env.local
   # 또는
   code .env.local
   ```

4. **내용 입력** (위와 동일)

---

## 3. Supabase 정보 가져오기

### Step 1: Supabase 프로젝트 접속

1. https://supabase.com 에 로그인
2. 프로젝트 선택 또는 새 프로젝트 생성

### Step 2: API 키 확인

1. 좌측 메뉴에서 **Settings** (⚙️) 클릭
2. **API** 메뉴 클릭
3. 다음 정보를 복사:

   - **Project URL**: 
     ```
     https://xxxxxxxxxxxxx.supabase.co
     ```
     → `NEXT_PUBLIC_SUPABASE_URL`에 붙여넣기

   - **anon public** 키:
     ```
     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```
     → `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 붙여넣기

### Step 3: .env.local 파일 예시

최종 `.env.local` 파일은 다음과 같아야 합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **주의사항:**
- URL과 키 사이에 공백이 없어야 합니다
- 따옴표(`"` 또는 `'`)를 사용하지 마세요
- 각 값은 한 줄에 입력하세요

---

## 4. 환경 변수 확인

### 개발 서버 실행 전 확인

1. **파일 위치 확인**
   - `.env.local` 파일이 프로젝트 루트에 있는지 확인
   - `package.json`과 같은 위치에 있어야 합니다

2. **파일 내용 확인**
   - URL이 `https://`로 시작하는지 확인
   - 키가 올바르게 복사되었는지 확인 (공백 없음)

3. **Git에 커밋되지 않도록 확인**
   - `.gitignore` 파일에 `.env.local`이 포함되어 있는지 확인
   - ✅ 이미 포함되어 있습니다

### 개발 서버 실행

```bash
npm install
npm run dev
```

### 환경 변수 로드 확인

브라우저 콘솔(F12)에서 다음을 확인:

```javascript
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
// 또는
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
```

⚠️ **참고**: `NEXT_PUBLIC_` 접두사가 있는 변수만 브라우저에서 접근 가능합니다.

---

## 5. 문제 해결

### 문제 1: 파일이 보이지 않음 (Windows)

**해결 방법:**
1. 파일 탐색기 → 보기 → "숨김 항목" 체크
2. 또는 VS Code에서 파일 탐색기 사용

### 문제 2: 확장자 변경 불가 (Windows)

**해결 방법:**
1. 파일 탐색기 → 보기 → "파일 이름 확장자" 체크
2. 파일 이름을 `.env.local`로 변경 (`.txt` 제거)

### 문제 3: 환경 변수가 로드되지 않음

**해결 방법:**
1. 개발 서버 재시작 (`Ctrl+C` 후 `npm run dev`)
2. `.env.local` 파일이 프로젝트 루트에 있는지 확인
3. 변수 이름이 정확한지 확인 (`NEXT_PUBLIC_` 접두사 필수)
4. 파일 인코딩이 UTF-8인지 확인

### 문제 4: Supabase 연결 오류

**해결 방법:**
1. Supabase 프로젝트가 활성화되어 있는지 확인
2. URL과 키가 올바른지 확인 (공백, 따옴표 없음)
3. Supabase 대시보드에서 프로젝트 상태 확인

---

## 6. 완료 확인 체크리스트

- [ ] Supabase 프로젝트 생성 완료
- [ ] SQL 스키마 실행 완료 (테이블 5개 생성 확인)
- [ ] RLS 정책 생성 확인
- [ ] `.env.local` 파일 생성 완료
- [ ] Supabase URL과 키 입력 완료
- [ ] 개발 서버 실행 성공
- [ ] 브라우저에서 환경 변수 로드 확인

모든 항목을 완료하면 개발을 시작할 수 있습니다! 🎉
