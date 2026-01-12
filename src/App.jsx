import React, { useState, useRef, useEffect } from "react";
import {
  Copy,
  Check,
  Twitter,
  Send,
  Heart,
  Users,
  Flame,
  ExternalLink,
  Menu,
  X,
  Instagram,
  Facebook,
} from "lucide-react";

// Custom TikTok Icon
const TikTokIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [copied, setCopied] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const CA = "AumaQ5bXzpd5xjsR6snS34FbRGVNNtCF2z2QgVEmpump";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navigate = (page) => {
    setActivePage(page);
    setMobileMenu(false);
    window.scrollTo(0, 0);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenu]);

  // --- ENTRANCE GATE ---
  if (!hasEntered) {
    return (
      <div
        className="fixed inset-0 z-[100] w-full h-full flex items-center justify-center bg-cover bg-center bg-no-repeat cursor-pointer"
        style={{ backgroundImage: "url('/gate.jpg')" }}
        onClick={() => setHasEntered(true)}
      >
        <div className="absolute bottom-20 animate-pulse text-yellow-500 font-black tracking-[0.5em] uppercase text-xs bg-black/60 px-8 py-3 rounded-full border border-yellow-500/20 backdrop-blur-sm">
          Click Anywhere to Enter
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-yellow-500">
      {/* FIXED NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-xl border-b border-yellow-500/10 px-6 py-4 flex justify-between items-center">
        {/* LEFT: Logo */}
        <div className="flex-1 flex justify-start">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-8 md:h-12 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate("home")}
          />
        </div>

        {/* CENTER: Desktop Navigation */}
        <div className="hidden md:flex gap-10 font-black uppercase text-sm tracking-[0.2em]">
          {["home", "story", "roadmap", "generator"].map((page) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className={`transition-all hover:scale-110 ${
                activePage === page
                  ? "text-yellow-500"
                  : "text-white hover:text-yellow-500"
              }`}
            >
              {page === "generator" ? "Meme Gen" : page}
            </button>
          ))}
        </div>

        {/* RIGHT: Mobile Toggle & Desktop Spacer */}
        <div className="flex-1 flex justify-end">
          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-yellow-500 p-2 hover:bg-zinc-900 rounded-lg transition-colors"
            onClick={() => setMobileMenu(true)}
          >
            <Menu size={32} />
          </button>

          {/* Hidden spacer on desktop to maintain perfect centering */}
          <div className="hidden md:block w-12 h-12"></div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenu && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-8 text-3xl font-black uppercase italic tracking-tighter animate-in fade-in duration-300">
          <button
            onClick={() => setMobileMenu(false)}
            className="absolute top-6 right-6 text-yellow-500 p-2 hover:rotate-90 transition-transform"
          >
            <X size={48} />
          </button>

          {["home", "story", "roadmap", "generator"].map((page) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className={`transition-transform active:scale-90 ${
                activePage === page ? "text-yellow-500" : "text-white"
              }`}
            >
              {page === "generator" ? "Meme Gen" : page}
            </button>
          ))}
        </div>
      )}

      {/* PAGE CONTENT */}
      <main className="pt-24">
        {activePage === "home" && (
          <HomePage
            navigate={navigate}
            copy={copyToClipboard}
            copied={copied}
            CA={CA}
          />
        )}
        {activePage === "story" && <StoryPage />}
        {activePage === "roadmap" && <RoadmapPage />}
        {activePage === "generator" && <MemeGenerator />}
      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-950 border-t border-yellow-500/10 py-20 px-6 text-center">
        <h3 className="text-4xl font-black italic mb-8 uppercase text-yellow-500">
          Join the $W Community
        </h3>
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <a
            href="https://t.co/YCjwjmLrPF"
            target="_blank"
            className="p-4 bg-zinc-900 rounded-2xl hover:text-yellow-500 transition-all hover:scale-110"
          >
            <Twitter />
          </a>
          <a
            href="https://t.me/+RgPyZn-u1_BmZDA6"
            target="_blank"
            className="p-4 bg-zinc-900 rounded-2xl hover:text-yellow-500 transition-all hover:scale-110"
          >
            <Send />
          </a>
          <a
            href="https://t.co/xayRxuGusj"
            target="_blank"
            className="p-4 bg-zinc-900 rounded-2xl hover:text-yellow-500 transition-all hover:scale-110"
          >
            <Facebook />
          </a>
          <a
            href="https://t.co/w8lcPevoNS"
            target="_blank"
            className="p-4 bg-zinc-900 rounded-2xl hover:text-yellow-500 transition-all hover:scale-110"
          >
            <Instagram />
          </a>
          <a
            href="https://t.co/7rfL21uu4j"
            target="_blank"
            className="p-4 bg-zinc-900 rounded-2xl hover:text-yellow-500 transition-all hover:scale-110"
          >
            <TikTokIcon />
          </a>
        </div>
        <p className="text-zinc-600 text-xs font-bold uppercase tracking-[0.3em] max-w-md mx-auto">
          Community = the team. $W is a memecoin. Always do your own research.
        </p>
      </footer>
    </div>
  );
}

// --- PAGE COMPONENTS ---

function HomePage({ navigate, copy, copied, CA }) {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="py-10 flex flex-col items-center text-center px-6">
        <img
          src="/logo.png"
          alt="$W Logo"
          className="w-40 md:w-64 h-auto mb-6 md:mb-8 transition-transform hover:scale-105 duration-500"
        />
        <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-yellow-500 uppercase italic mb-3">
          Everybody Wins
        </h2>
        <p className="text-zinc-400 max-w-lg mb-10 text-base md:text-lg">
          A community-taken-over memecoin built on one mission: Giving Back.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12 max-w-3xl w-full">
          {[
            { icon: <Heart size={18} />, label: "$2,500+ Donated" },
            { icon: <Users size={18} />, label: "Community CTO" },
            { icon: <Flame size={18} />, label: "5M $W Burnt" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-zinc-900/40 p-5 rounded-2xl border border-yellow-500/10 flex items-center justify-center gap-3"
            >
              <span className="text-yellow-500">{item.icon}</span>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto px-10">
          <a
            href="https://t.me/+RgPyZn-u1_BmZDA6"
            target="_blank"
            className="bg-yellow-500 text-black px-10 py-4 rounded-full font-black uppercase text-sm hover:bg-yellow-400 hover:scale-105 transition-all active:scale-95 text-center shadow-lg"
          >
            Join Telegram
          </a>
          <button
            onClick={() =>
              document
                .getElementById("chart")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-white text-black px-10 py-4 rounded-full font-black uppercase text-sm hover:bg-yellow-500 hover:scale-105 transition-all active:scale-95"
          >
            Live Chart
          </button>
          <button
            onClick={() => navigate("story")}
            className="bg-zinc-800 text-white px-10 py-4 rounded-full font-black uppercase text-sm hover:bg-zinc-700 hover:scale-105 transition-all active:scale-95"
          >
            Our Story
          </button>
        </div>
      </section>

      {/* CHART SECTION */}
      <section id="chart" className="py-10 px-4 md:px-6 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl font-black italic text-yellow-500 mb-8 uppercase text-center">
            Live Chart 📈
          </h2>

          {/* FIXED: Improved container height and mobile padding */}
          <div className="w-full h-[500px] md:h-auto md:aspect-video bg-zinc-900 rounded-2xl md:rounded-3xl overflow-hidden border border-yellow-500/20 mb-8 shadow-2xl">
            <iframe
              className="w-full h-full"
              src={`https://dexscreener.com/solana/${CA}?embed=1&theme=dark&trades=0&info=0`}
              title="DEX Screener Chart"
            ></iframe>
          </div>

          <a
            href="https://dexscreener.com/solana/AumaQ5bXzpd5xjsR6snS34FbRGVNNtCF2z2QgVEmpump"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 text-black px-12 py-4 rounded-full font-black uppercase text-sm flex items-center gap-2 hover:scale-105 transition-all active:scale-95 shadow-lg"
          >
            Open on Dexscreener <ExternalLink size={16} />
          </a>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-10 bg-zinc-950 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-black italic text-yellow-500 mb-12 uppercase">
            Impact So Far 💛
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { val: "$2,500+", sub: "Real World Causes" },
              { val: "$500", sub: "Small Streamer Subs" },
              { val: "$500", sub: "Community Giveaways" },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-zinc-900 p-10 rounded-[2.5rem] border-b-4 border-yellow-500 shadow-xl hover:-translate-y-2 transition-transform"
              >
                <div className="text-4xl font-black mb-2">{card.val}</div>
                <div className="text-zinc-500 uppercase text-xs tracking-widest font-bold">
                  {card.sub}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900/30 p-8 rounded-3xl border border-white/5 text-left">
            <h4 className="font-bold uppercase mb-6 text-yellow-500 tracking-widest">
              Proof of Impact:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 text-xs">
              {[
                { label: "Receipt 1", url: "https://t.co/xq7baS1BS8" },
                { label: "Receipt 2", url: "https://t.co/bF5wSoZPYN" },
                { label: "Receipt 3", url: "https://t.co/p9coPp7t5v" },
                { label: "Receipt 4", url: "#" },
                { label: "Receipt 5", url: "#" },
                { label: "Receipt 6", url: "#" },
              ].map((receipt, index) => (
                <a
                  key={index}
                  href={receipt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-yellow-500 flex items-center gap-2 transition-colors border-l border-zinc-800 pl-3 hover:border-yellow-500"
                >
                  {receipt.label} <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CA & BUY SECTION */}
      <section className="py-10 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black italic text-yellow-500 mb-8 uppercase">
            Contract Address
          </h2>
          <div className="relative inline-block w-full">
            <div
              className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-black text-xs uppercase tracking-widest transition-all duration-300 pointer-events-none ${
                copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              Copied!
            </div>
            <div
              onClick={copy}
              className="flex items-center gap-4 bg-zinc-900 p-2 pl-6 rounded-full border border-yellow-500/30 mb-4 cursor-pointer hover:border-yellow-500 transition-all group"
            >
              <code className="text-xs md:text-sm text-yellow-500 truncate w-full font-mono">
                {CA}
              </code>
              <button className="bg-zinc-800 text-white p-4 rounded-full flex-shrink-0 flex items-center justify-center border border-white/10 group-hover:bg-yellow-500 group-hover:text-black transition-colors shadow-lg">
                {copied ? (
                  <Check size={20} className="stroke-[3px]" />
                ) : (
                  <Copy size={20} className="stroke-[3px]" />
                )}
              </button>
            </div>
          </div>

          <p className="text-zinc-600 text-[10px] uppercase font-bold mb-16 italic tracking-widest">
            Always verify the contract address before buying.
          </p>

          <h2 className="text-4xl font-black italic text-yellow-500 mb-8 uppercase">
            How to Buy $W
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-left mb-12">
            {[
              {
                s: "1",
                t: "Setup Wallet",
                d: "Download Phantom or Solflare and load with SOL.",
              },
              {
                s: "2",
                t: "Visit Pump.fun",
                d: "Go to our project page link below.",
              },
              {
                s: "3",
                t: "Swap & Win",
                d: "Swap SOL for $W and start giving back.",
              },
            ].map((step) => (
              <div
                key={step.s}
                className="bg-zinc-900 p-8 rounded-3xl border border-white/5"
              >
                <div className="w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-black mb-4">
                  {step.s}
                </div>
                <div className="font-black uppercase text-sm mb-2">
                  {step.t}
                </div>
                <div className="text-xs text-zinc-500 leading-relaxed">
                  {step.d}
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://t.co/882TZEQRfU"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-black px-16 py-6 rounded-full font-black uppercase text-lg shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:bg-yellow-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all duration-300 active:scale-95"
          >
            Buy on Pump.fun
          </a>
        </div>
      </section>
    </div>
  );
}

function StoryPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-6xl md:text-8xl font-black italic text-yellow-500 uppercase mb-12 leading-none">
        Our Story
      </h1>

      <div className="space-y-20">
        {/* THE ORIGIN */}
        <div className="border-l-4 border-yellow-500 pl-8">
          <h2 className="text-3xl font-black uppercase mb-4 text-white">
            The Phoenix Moment
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            $W didn't start in a boardroom—it started in the trenches. After the
            original developer abandoned the project, the community faced a
            choice: let it die, or take the wheel. We chose to drive. Today, $W
            is a 100% Community-Taken-Over (CTO) project, meaning the holders
            are the team, and the mission is ours to define.
          </p>
        </div>

        {/* MISSION GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-zinc-900/50 p-10 rounded-[3rem] border border-white/5">
            <Heart className="text-yellow-500 mb-4" size={32} />
            <h2 className="text-2xl font-black uppercase mb-4 text-white">
              Transparency First
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              In a space full of empty promises, $W stands for radical honesty.
              Every donation, every burn, and every major decision is logged
              on-chain and verified by the community.
            </p>
          </div>
          <div className="bg-zinc-900/50 p-10 rounded-[3rem] border border-white/5">
            <Users className="text-yellow-500 mb-4" size={32} />
            <h2 className="text-2xl font-black uppercase mb-4 text-white">
              Real Impact
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              We aren't just another meme. We leverage the power of crypto to
              fund real-world good—from supporting small creators to animal
              welfare. When $W grows, the world wins.
            </p>
          </div>
        </div>

        {/* THE "LOCKED" SECTION */}
        <div className="relative overflow-hidden bg-zinc-900 p-12 rounded-[3rem] border border-yellow-500/20">
          <div className="relative z-10">
            <h2 className="text-4xl font-black italic text-yellow-500 uppercase mb-6">
              Security & Trust
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8">
              We believe in the long game. That’s why we’ve taken aggressive
              steps to secure the future of $W.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-black/50 p-6 rounded-2xl border border-white/5">
                <div className="text-yellow-500 text-3xl font-black">
                  67.5M $W
                </div>
                <div className="text-xs font-bold uppercase text-zinc-500 tracking-widest mt-1">
                  Locked Until 2030 🔒
                </div>
              </div>
              <div className="bg-black/50 p-6 rounded-2xl border border-white/5">
                <div className="text-yellow-500 text-3xl font-black">
                  5 Million
                </div>
                <div className="text-xs font-bold uppercase text-zinc-500 tracking-widest mt-1">
                  Burned Forever 🔥
                </div>
              </div>
            </div>
          </div>
          <Flame
            className="absolute -right-10 -bottom-10 text-yellow-500/5"
            size={300}
          />
        </div>

        {/* CALL TO ACTION */}
        <div className="text-center py-10">
          <h2 className="text-3xl font-black uppercase mb-6 text-white italic">
            Want to help us write the next chapter?
          </h2>
          <a
            href="https://t.me/+RgPyZn-u1_BmZDA6"
            target="_blank"
            className="inline-block bg-yellow-500 text-black px-12 py-5 rounded-full font-black uppercase text-sm hover:scale-110 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all"
          >
            Join the Movement
          </a>
        </div>
      </div>
    </div>
  );
}

function RoadmapPage() {
  const phases = [
    {
      p: "Phase 1",
      g: "Foundation",
      d: "CTO structure and transparent operations.",
    },
    {
      p: "Phase 2",
      g: "Visibility",
      d: "Consistent content and improved social presence.",
    },
    { p: "Phase 3", g: "Strength", d: "Turning holders into active builders." },
    {
      p: "Phase 4",
      g: "Expansion",
      d: "Organic influencer and community partnerships.",
    },
    {
      p: "Phase 5",
      g: "Sustainability",
      d: "Major IRL Giving Back initiatives.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 text-center">
      <h1 className="text-6xl font-black italic text-yellow-500 uppercase mb-20 tracking-tighter">
        The Roadmap
      </h1>
      <div className="relative space-y-12">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-zinc-800 hidden md:block"></div>
        {phases.map((phase, i) => (
          <div key={i} className="relative md:pl-24 group text-left">
            <div className="absolute left-6 top-2 w-5 h-5 bg-yellow-500 rounded-full hidden md:block group-hover:scale-150 transition-transform"></div>
            <div className="bg-zinc-900/50 p-10 rounded-[2rem] border border-white/5 hover:border-yellow-500/30 transition-all">
              <span className="text-yellow-500 font-black uppercase text-xs tracking-widest">
                {phase.p}
              </span>
              <h2 className="text-2xl font-black uppercase mt-2 mb-4">
                {phase.g}
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">{phase.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MemeGenerator() {
  const canvasRef = useRef(null);
  const [userImg, setUserImg] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const frame = new Image();
      frame.src = "/frame.png";
      frame.onload = () => {
        ctx.clearRect(0, 0, 500, 500);
        if (userImg) {
          const img = new Image();
          img.src = userImg;
          img.onload = () => {
            ctx.drawImage(img, 0, 0, 500, 500);
            ctx.drawImage(frame, 0, 0, 500, 500);
          };
        } else {
          ctx.fillStyle = "#111";
          ctx.fillRect(0, 0, 500, 500);
          ctx.drawImage(frame, 0, 0, 500, 500);
        }
      };
    }
  }, [userImg]);

  return (
    <div className="py-20 flex flex-col items-center px-6">
      <h1 className="text-5xl font-black italic text-yellow-500 uppercase mb-12">
        Meme Factory
      </h1>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="w-full max-w-md bg-zinc-900 rounded-3xl border-4 border-yellow-500/20"
      />
      <div className="mt-12 flex gap-4">
        <input
          type="file"
          id="up"
          hidden
          onChange={(e) => setUserImg(URL.createObjectURL(e.target.files[0]))}
        />
        <label
          htmlFor="up"
          className="bg-white text-black px-10 py-4 rounded-full font-black uppercase cursor-pointer hover:bg-yellow-500 transition-colors"
        >
          Upload
        </label>
        <button
          onClick={() => {
            const link = document.createElement("a");
            link.download = "W-Meme.png";
            link.href = canvasRef.current.toDataURL();
            link.click();
          }}
          className="bg-yellow-500 text-black px-10 py-4 rounded-full font-black uppercase hover:bg-yellow-400 transition-colors"
        >
          Download
        </button>
      </div>
    </div>
  );
}
