import ToolCard from '@/components/tool-card'
import { categories, getToolsByCategory } from '@/lib/tools'
import { Image, FileText, Calculator, Zap, Shield, Download } from 'lucide-react'

const categoryIcons = {
  '이미지/미디어': Image,
  '텍스트/변환': FileText,
  '생활/금융': Calculator,
}

const categoryIds = {
  '이미지/미디어': 'image-media',
  '텍스트/변환': 'text-convert',
  '생활/금융': 'life-finance',
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-charcoal mb-6">
          웹툴 모음
        </h1>
        <p className="text-xl md:text-2xl text-charcoal/70 mb-8">
          업무 효율을 높이는 모든 도구, 여기서 무료로 시작하세요.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <div className="px-4 py-2 bg-muted-orange/20 text-muted-orange rounded-lg text-sm font-medium">
            무료
          </div>
          <div className="px-4 py-2 bg-forest-green/20 text-forest-green rounded-lg text-sm font-medium">
            보안
          </div>
          <div className="px-4 py-2 bg-mustard-yellow/20 text-mustard-yellow rounded-lg text-sm font-medium">
            빠른
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.map((category) => {
          const tools = getToolsByCategory(category)
          const IconComponent = categoryIcons[category as keyof typeof categoryIcons]
          const categoryId = categoryIds[category as keyof typeof categoryIds]

          return (
            <div key={category} id={categoryId} className="mb-16 scroll-mt-20">
              <div className="flex items-center space-x-3 mb-6">
                {IconComponent && (
                  <IconComponent className="w-6 h-6 text-forest-green" />
                )}
                <h2 className="text-3xl font-bold text-charcoal">{category}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            이 서비스를 사용하는 이유는 무엇인가요?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg border border-charcoal/10 p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-forest-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-forest-green" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-4">빠른 클라이언트 측 처리</h3>
            <p className="text-charcoal/70 leading-relaxed">
              모든 처리는 브라우저에서 즉시 실행됩니다. 서버로 데이터를 전송하지 않아
              개인정보가 완벽하게 보호되며, 초고속으로 결과를 확인할 수 있습니다.
            </p>
          </div>
          <div className="bg-white rounded-lg border border-charcoal/10 p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-forest-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-forest-green" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-4">완벽한 개인정보 보호</h3>
            <p className="text-charcoal/70 leading-relaxed">
              모든 작업은 사용자의 기기에서 처리됩니다. 파일이나 데이터가 서버로
              전송되지 않아 민감한 정보도 안심하고 사용할 수 있습니다.
            </p>
          </div>
          <div className="bg-white rounded-lg border border-charcoal/10 p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-forest-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Download className="w-8 h-8 text-forest-green" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-4">설치 불필요</h3>
            <p className="text-charcoal/70 leading-relaxed">
              별도의 소프트웨어나 앱 설치 없이 브라우저만으로 모든 기능을 사용할 수 있습니다.
              언제 어디서나 인터넷 연결만 있으면 바로 시작하세요.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white/50 rounded-lg my-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-charcoal mb-6">소개</h2>
          <p className="text-lg text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
            웹툴 모음은 업무 효율을 높이는 다양한 웹 도구를 한 곳에 모아
            무료로 제공하는 서비스입니다. 이미지 처리, 텍스트 변환, 생활 및 금융 계산기 등
            다양한 카테고리의 도구를 제공하며, 별도의 가입 없이 바로 사용할 수 있습니다.
          </p>
        </div>
      </section>
    </div>
  )
}
