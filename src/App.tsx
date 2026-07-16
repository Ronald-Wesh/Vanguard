import { useState } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  void setMenuOpen; // Used in Task 5

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full flex-col">
        <nav />
        <div className="flex flex-1 flex-col justify-center px-6 sm:px-10 lg:px-16" />
      </div>

      <div className="fixed inset-0 z-50 hidden">
        {menuOpen && null}
      </div>
    </div>
  );
}

export default App;
