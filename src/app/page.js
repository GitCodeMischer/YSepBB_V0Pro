'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  // Redirect to the finance tracker dashboard
  useEffect(() => {
    router.push('/finance-tracker/dashboard');
  }, [router]);
  
  // Loading state while redirecting
  return (
    <div className="flex min-h-screen bg-[#0A0A0A] items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-[#50E3C2] to-[#3CCEA7] flex items-center justify-center shadow-lg mb-4">
          <span className="font-bold text-black text-3xl">Y</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">YSep<span className="text-[#50E3C2]">BB</span></h1>
        <p className="text-gray-400">Redirecting to dashboard...</p>
        <div className="mt-4 w-12 h-1 bg-[#50E3C2]/20 mx-auto rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-4 bg-[#50E3C2] rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
}
