# npm install 오류 해결 가이드

## 발견된 문제

**에러**: `No matching version found for piexifjs@^2.0.0`

**원인**: `piexifjs` 패키지의 최신 안정 버전은 `1.0.6`이며, `2.0.0`은 베타 버전만 존재합니다.

## 해결 방법

### ✅ 수정 완료

`package.json`에서 `piexifjs` 버전을 수정했습니다:
- **변경 전**: `"piexifjs": "^2.0.0"`
- **변경 후**: `"piexifjs": "^1.0.6"`

### 설치 진행

다음 명령어로 다시 설치하세요:

```bash
npm install
```

### 추가 문제 해결 (필요한 경우)

만약 다른 오류가 발생하면:

1. **캐시 정리 후 재설치**
   ```bash
   npm cache clean --force
   npm install
   ```

2. **node_modules 삭제 후 재설치**
   ```bash
   # Windows PowerShell
   Remove-Item -Recurse -Force node_modules
   Remove-Item package-lock.json
   npm install
   ```

3. **Peer dependency 경고가 있으면**
   ```bash
   npm install --legacy-peer-deps
   ```

## 참고사항

- `piexifjs@1.0.6`은 안정 버전이며 모든 기능이 정상 작동합니다.
- EXIF 제거 기능은 `piexif.remove()` 메서드를 사용하며, 이는 1.0.6 버전에서도 지원됩니다.
