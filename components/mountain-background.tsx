export function MountainBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <svg
        className="w-full h-full"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="1920" height="1080" fill="#E5E7EB" />
        <path d="M0 476L320 286L640 381L960 286L1280 381L1600 286L1920 381V1080H0V476Z" fill="#D1D5DB" />
        <path d="M0 571L320 381L640 476L960 381L1280 476L1600 381L1920 476V1080H0V571Z" fill="#9CA3AF" />
        <path d="M0 666L320 476L640 571L960 476L1280 571L1600 476L1920 571V1080H0V666Z" fill="#6B7280" />
        <path d="M0 1080L320 870L640 965L960 870L1280 965L1600 870L1920 965V1080H0Z" fill="#4B5563" />
        <path d="M0 1080L320 965L640 1080H0Z" fill="#374151" />
        <path d="M640 1080L960 965L1280 1080H640Z" fill="#374151" />
        <path d="M1280 1080L1600 965L1920 1080H1280Z" fill="#374151" />
        <path d="M140 965L180 945L220 965L260 945L300 965V1080H140V965Z" fill="#374151" />
        <path d="M780 965L820 945L860 965L900 945L940 965V1080H780V965Z" fill="#374151" />
        <path d="M1420 965L1460 945L1500 965L1540 945L1580 965V1080H1420V965Z" fill="#374151" />
        <circle cx="200" cy="200" r="60" fill="#D1D5DB" />
      </svg>
    </div>
  );
}