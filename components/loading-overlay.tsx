export function LoadingOverlay() {
    return (
      <div className="fixed inset-0 bg-[url('/mountains-bg.jpg')] bg-cover bg-center flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl text-center relative z-10">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-2xl font-semibold text-gray-800">Finding the best ski resorts</p>
        </div>
      </div>
    )
  }