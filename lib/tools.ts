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
  // Category 1: 이미지/미디어
  {
    id: 'qr-generator',
    name: 'QR 코드 생성기',
    description: 'URL, 텍스트를 입력하여 즉시 사용 가능한 QR 코드를 생성하세요.',
    category: '이미지/미디어',
    icon: 'QrCode',
    href: '/tools/qr-generator',
  },
  {
    id: 'youtube-thumbnail',
    name: '유튜브 썸네일 추출기',
    description: '고화질(HD) 썸네일을 클릭 한 번으로 다운로드하세요.',
    category: '이미지/미디어',
    icon: 'Youtube',
    href: '/tools/youtube-thumbnail',
  },
  {
    id: 'image-compressor',
    name: '이미지 용량 압축',
    description: '화질 저하 없이 이미지 파일 용량만 가볍게 줄이세요.',
    category: '이미지/미디어',
    icon: 'Image',
    href: '/tools/image-compressor',
  },
  // Category 2: 텍스트/변환
  {
    id: 'text-counter',
    name: '실시간 글자수 세기',
    description: '자소서, 블로그 포스팅을 위한 공백 포함/제외 글자수 확인.',
    category: '텍스트/변환',
    icon: 'FileText',
    href: '/tools/text-counter',
  },
  {
    id: 'case-converter',
    name: '대소문자 변환기',
    description: '영어 문장의 대소문자 형식을 자유자재로 변환하세요.',
    category: '텍스트/변환',
    icon: 'Type',
    href: '/tools/case-converter',
  },
  {
    id: 'json-formatter',
    name: 'JSON 포맷터',
    description: '복잡한 JSON 데이터를 보기 좋게 정렬하고 검증합니다.',
    category: '텍스트/변환',
    icon: 'Code',
    href: '/tools/json-formatter',
  },
  // Category 3: 생활/금융
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
    id: 'loan-calculator',
    name: '대출 이자 계산기',
    description: '원리금 균등, 만기 일시 상환 등 대출 이자를 미리 계산해보세요.',
    category: '생활/금융',
    icon: 'Calculator',
    href: '/tools/loan-calculator',
  },
]

export const categories = [
  '이미지/미디어',
  '텍스트/변환',
  '생활/금융',
]

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(tool => tool.category === category)
}
