export function UserHeader() {
    return (
      <div className="flex justify-end p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 rounded-full p-1">
            <div className="bg-gray-800 text-white rounded-full h-8 w-8 flex items-center justify-center">
              <span className="text-sm">TH</span>
            </div>
          </div>
          <div className="text-sm">
            <div className="font-medium">TANJIN HOSSAIN</div>
            <div className="text-xs text-gray-500">MEMBER</div>
          </div>
        </div>
      </div>
    )
  }
  