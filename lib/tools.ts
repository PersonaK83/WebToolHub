// 도구 데이터 구조
export interface Tool {
  id: string
  name: string
  description: string
  category: string
  icon: string
  href: string
}

export const tools: Tool[] = [
  // Category 1: 이미지 도구
  {
    id: 'all-in-one-image-editor',
    name: '메인 이미지 도구',
    description: '크기 조절, 자르기, 필터 등 모든 이미지 편집 기능을 한곳에서.',
    category: '이미지 도구',
    icon: 'Image',
    href: '/tools/image-editor',
  },
  {
    id: 'image-resize-rotate',
    name: '이미지 크기 조절 + 회전',
    description: '원하는 픽셀로 크기를 줄이고 각도를 자유롭게 회전하세요.',
    category: '이미지 도구',
    icon: 'Maximize2',
    href: '/tools/image-resizer',
  },
  {
    id: 'image-compressor',
    name: '이미지 압축',
    description: '화질은 유지하면서 용량만 획기적으로 줄여줍니다.',
    category: '이미지 도구',
    icon: 'Compress',
    href: '/tools/image-compressor',
  },
  {
    id: 'image-format-converter',
    name: '이미지 포맷 변환',
    description: 'JPG, PNG, WEBP 등 다양한 포맷을 통합 변환합니다.',
    category: '이미지 도구',
    icon: 'FileImage',
    href: '/tools/image-converter',
  },
  {
    id: 'aspect-ratio-crop',
    name: '이미지 비율 맞춤',
    description: '인스타그램, 유튜브 등 플랫폼에 맞는 비율로 자르기.',
    category: '이미지 도구',
    icon: 'Crop',
    href: '/tools/image-cropper',
  },
  {
    id: 'bulk-image-processor',
    name: '이미지 일괄 처리',
    description: '여러 장의 이미지를 한 번에 편집하고 변환하세요.',
    category: '이미지 도구',
    icon: 'Layers',
    href: '/tools/bulk-image-processor',
  },
  {
    id: 'qr-generator',
    name: 'QR 코드 생성기',
    description: 'URL, 텍스트를 담은 QR 코드를 즉시 생성합니다.',
    category: '이미지 도구',
    icon: 'QrCode',
    href: '/tools/qr-generator',
  },
  {
    id: 'image-to-text-ocr',
    name: '이미지 → 텍스트 (OCR)',
    description: '이미지 속 글자를 인식하여 텍스트로 추출합니다.',
    category: '이미지 도구',
    icon: 'FileText',
    href: '/tools/image-to-text',
  },
  {
    id: 'remove-exif',
    name: 'EXIF 메타데이터 제거',
    description: '사진에 포함된 위치 정보와 촬영 정보를 안전하게 삭제하세요.',
    category: '이미지 도구',
    icon: 'Shield',
    href: '/tools/remove-exif',
  },
  // Category 2: 동영상 도구
  {
    id: 'youtube-thumbnail',
    name: '유튜브 썸네일 다운로더',
    description: '고화질(HD) 썸네일을 클릭 한 번으로 다운로드하세요.',
    category: '동영상 도구',
    icon: 'Youtube',
    href: '/tools/youtube-thumbnail',
  },
  {
    id: 'video-to-gif',
    name: '동영상 → GIF 변환',
    description: '동영상 파일을 GIF 애니메이션으로 변환합니다.',
    category: '동영상 도구',
    icon: 'Video',
    href: '/tools/video-to-gif',
  },
  // Category 3: 텍스트/변환
  {
    id: 'text-counter',
    name: '글자수 세기',
    description: '자소서, 블로그 포스팅을 위한 공백 포함/제외 글자수 확인.',
    category: '텍스트/변환',
    icon: 'FileText',
    href: '/tools/text-counter',
  },
  {
    id: 'case-converter',
    name: '대소문자 변환',
    description: '영어 문장의 대소문자 형식을 자유자재로 변환하세요.',
    category: '텍스트/변환',
    icon: 'Type',
    href: '/tools/case-converter',
  },
  // Category 4: 생활/금융
  {
    id: 'loan-calculator',
    name: '대출 이자 계산기',
    description: '원리금 균등, 만기 일시 상환 등 대출 이자를 미리 계산해보세요.',
    category: '생활/금융',
    icon: 'Calculator',
    href: '/tools/loan-calculator',
  },
  {
    id: 'dday-calculator',
    name: 'D-Day 계산기',
    description: '중요한 일정까지 남은 날짜를 간편하게 계산하세요.',
    category: '생활/금융',
    icon: 'Calendar',
    href: '/tools/dday-calculator',
  },
  {
    id: 'unit-converter',
    name: '단위 변환기',
    description: '길이, 무게, 넓이 등 다양한 단위를 손쉽게 변환하세요.',
    category: '생활/금융',
    icon: 'Ruler',
    href: '/tools/unit-converter',
  },
  {
    id: 'currency-converter',
    name: '환율 계산기',
    description: '다양한 통화의 환율을 계산합니다.',
    category: '생활/금융',
    icon: 'DollarSign',
    href: '/tools/currency-converter',
  },
  // Category 5: IT 도구
  {
    id: 'json-formatter',
    name: 'JSON 포맷터',
    description: '복잡한 JSON 데이터를 보기 좋게 정렬하고 검증합니다.',
    category: 'IT 도구',
    icon: 'Code',
    href: '/tools/json-formatter',
  },
  {
    id: 'base64',
    name: 'Base64 인코딩/디코딩',
    description: '텍스트를 Base64로 인코딩/디코딩합니다.',
    category: 'IT 도구',
    icon: 'Lock',
    href: '/tools/base64',
  },
  {
    id: 'my-ip',
    name: '내 IP 확인',
    description: '현재 사용 중인 IP 주소를 확인합니다.',
    category: 'IT 도구',
    icon: 'Globe',
    href: '/tools/my-ip',
  },
]

export const categories = [
  '이미지 도구',
  '동영상 도구',
  '텍스트/변환',
  '생활/금융',
  'IT 도구',
]

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(tool => tool.category === category)
}
