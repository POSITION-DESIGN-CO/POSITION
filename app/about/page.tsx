export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 mt-16">
          <h1 className="text-3xl font-bold">ABOUT</h1>
        </div>

        <div className="prose max-w-none">
          <p className="text-lg">
            Founded in Brooklyn, New York by Poyao Shih, POSITION is an architectural practice that explores ideas
            across disciplines and scales, focusing on contemporary architectural challenges through innovative forms
            and materials.
          </p>

          <p className="mt-6">
            The studio explores ideas across different disciplines and scales, focusing on responding to contemporary
            architectural issues through innovative forms and materials.
          </p>

          <div className="mt-12">
            <h2 className="text-xl font-semibold">Contact</h2>
            <div className="mt-4 space-y-2">
              <p>New York / Taipei</p>
              <p>+1(323)600-5582</p>
              <p>pshih@positiondesign.co</p>
              <p>Instagram</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

