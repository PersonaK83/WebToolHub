export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-charcoal mb-8">이용약관</h1>
        <div className="bg-white rounded-lg border border-charcoal/10 p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">제1조 (목적)</h2>
            <p className="text-charcoal/70 leading-relaxed">
              본 약관은 웹툴 모음(이하 &quot;서비스&quot;)이 제공하는 서비스의 이용과 관련하여 서비스와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">제2조 (정의)</h2>
            <p className="text-charcoal/70 leading-relaxed">
              1. &quot;서비스&quot;란 웹툴 모음이 제공하는 모든 온라인 서비스를 의미합니다.
              <br />
              2. &quot;이용자&quot;란 본 약관에 따라 서비스를 이용하는 회원 및 비회원을 의미합니다.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">제3조 (서비스의 제공)</h2>
            <p className="text-charcoal/70 leading-relaxed">
              서비스는 무료로 제공되며, 이용자는 언제든지 서비스를 이용할 수 있습니다.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">제4조 (이용자의 의무)</h2>
            <p className="text-charcoal/70 leading-relaxed">
              이용자는 서비스를 이용함에 있어 다음 행위를 하여서는 안 됩니다.
              <br />
              1. 법령 또는 본 약관에 위반하는 행위
              <br />
              2. 서비스의 안정적 운영을 방해하는 행위
              <br />
              3. 타인의 정보를 도용하는 행위
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
