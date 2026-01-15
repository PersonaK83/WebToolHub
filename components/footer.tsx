export default function Footer() {
  return (
    <footer className="bg-charcoal/5 border-t border-charcoal/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-charcoal mb-4">웹툴 모음</h3>
            <p className="text-charcoal/70 text-sm">
              누구나 무료로 사용하는 간편한 웹 도구 모음
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-charcoal mb-4">카테고리</h3>
            <ul className="space-y-2 text-sm text-charcoal/70">
              <li><a href="#image-media" className="hover:text-forest-green transition-colors">이미지/미디어</a></li>
              <li><a href="#text-convert" className="hover:text-forest-green transition-colors">텍스트/변환</a></li>
              <li><a href="#life-finance" className="hover:text-forest-green transition-colors">생활/금융</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-charcoal mb-4">연락처</h3>
            <p className="text-charcoal/70 text-sm">
              문의사항이 있으시면 언제든지 연락주세요.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-charcoal/10 text-center text-sm text-charcoal/60">
          <p>&copy; {new Date().getFullYear()} 웹툴 모음. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
