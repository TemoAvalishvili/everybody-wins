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
  Calendar,
  Zap,
} from "lucide-react";
import MemeGenerator from "./MemeGenerator"; // Add this line here
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
        <div className="flex-1 flex justify-start">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-8 md:h-12 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate("home")}
          />
        </div>

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

        <div className="flex-1 flex justify-end">
          <button
            className="md:hidden text-yellow-500 p-2 hover:bg-zinc-900 rounded-lg transition-colors"
            onClick={() => setMobileMenu(true)}
          >
            <Menu size={32} />
          </button>
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
            { icon: <Users size={18} />, label: "110+ Days Active" },
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
            onClick={() => navigate("roadmap")}
            className="bg-zinc-800 text-white px-10 py-4 rounded-full font-black uppercase text-sm hover:bg-zinc-700 hover:scale-105 transition-all active:scale-95"
          >
            Roadmap
          </button>
        </div>
      </section>

      {/* CHART SECTION */}
      <section id="chart" className="py-10 px-4 md:px-6 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl font-black italic text-yellow-500 mb-8 uppercase text-center">
            Live Chart 📈
          </h2>
          <div className="w-full h-[500px] md:h-auto md:aspect-video bg-zinc-900 rounded-2xl md:rounded-3xl overflow-hidden border border-yellow-500/20 mb-8 shadow-2xl">
            <iframe
              className="w-full h-full"
              src={`https://dexscreener.com/solana/${CA}?embed=1&theme=dark&trades=0&info=0`}
              title="DEX Screener Chart"
              loading="lazy"
            ></iframe>
          </div>
          <a
            href={`https://dexscreener.com/solana/${CA}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 text-black px-12 py-4 rounded-full font-black uppercase text-sm flex items-center gap-2 hover:scale-105 transition-all active:scale-95 shadow-lg"
          >
            Open on Dexscreener <ExternalLink size={16} />
          </a>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="py-10 bg-zinc-950 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-black italic text-yellow-500 mb-12 uppercase">
            Key Milestones 🏆
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-10 rounded-[2.5rem] border-b-4 border-yellow-500 shadow-xl">
              <div className="text-4xl font-black mb-2">110+</div>
              <div className="text-zinc-500 uppercase text-xs tracking-widest font-bold font-mono italic">
                Consecutive Days Active
              </div>
            </div>
            <div className="bg-zinc-900 p-10 rounded-[2.5rem] border-b-4 border-green-500 shadow-xl">
              <div className="text-4xl font-black mb-2">$2,500+</div>
              <div className="text-zinc-500 uppercase text-xs tracking-widest font-bold">
                Donated to Real Causes
              </div>
            </div>
            <div className="bg-zinc-900 p-10 rounded-[2.5rem] border-b-4 border-blue-500 shadow-xl">
              <div className="text-4xl font-black mb-2">6/6</div>
              <div className="text-zinc-500 uppercase text-xs tracking-widest font-bold">
                Social Platforms Live
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO BUY SECTION */}
      <section className="py-10 max-w-5xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black italic uppercase text-center mb-16 tracking-tighter text-yellow-500">
          How to Buy $W
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              step: "1",
              title: "Setup Wallet",
              desc: "Download Phantom or Solflare and load it with some SOL.",
            },
            {
              step: "2",
              title: "Visit Dex",
              desc: "Go to Dexscreener or Jupiter and paste our Contract Address.",
            },
            {
              step: "3",
              title: "Swap & Win",
              desc: "Swap your SOL for $W and join the movement where everybody wins.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-zinc-900/40 border border-yellow-500/10 p-8 rounded-[40px] relative group hover:border-yellow-500/30 transition-all"
            >
              <div className="w-10 h-10 bg-yellow-500 text-black rounded-full flex items-center justify-center font-black mb-6 text-sm">
                {item.step}
              </div>
              <h3 className="text-xl font-black mb-4 uppercase italic tracking-tight">
                {item.title}
              </h3>
              <p className="text-zinc-500 text-sm font-bold tracking-tight leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CA SECTION */}
      <section className="py-10 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black italic text-yellow-500 mb-8 uppercase">
            Contract Address
          </h2>
          <div className="relative inline-block w-full">
            <div
              className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-black text-xs uppercase transition-all ${
                copied ? "opacity-100" : "opacity-0"
              }`}
            >
              Copied!
            </div>
            <div
              onClick={copy}
              className="flex items-center gap-4 bg-zinc-900 p-2 pl-6 rounded-full border border-yellow-500/30 cursor-pointer hover:border-yellow-500 transition-all group"
            >
              <code className="text-xs md:text-sm text-yellow-500 truncate w-full font-mono">
                {CA}
              </code>
              <button className="bg-zinc-800 text-white p-4 rounded-full flex-shrink-0 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
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
        <div className="border-l-4 border-yellow-500 pl-8">
          <h2 className="text-3xl font-black uppercase mb-4 text-white">
            The Phoenix Moment
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            $W didn't start in a boardroom—it started in the trenches. After the
            original developer abandoned the project, the community chose to
            take the wheel. Today, $W is a 100% Community-Taken-Over (CTO)
            project.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-zinc-900/50 p-10 rounded-[3rem] border border-white/5">
            <Heart className="text-yellow-500 mb-4" size={32} />
            <h2 className="text-2xl font-black uppercase mb-4 text-white">
              Transparency First
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              On-chain and community verified. Every major decision is
              transparent.
            </p>
          </div>
          <div className="bg-zinc-900/50 p-10 rounded-[3rem] border border-white/5">
            <Users className="text-yellow-500 mb-4" size={32} />
            <h2 className="text-2xl font-black uppercase mb-4 text-white">
              Real Impact
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              We fund real-world good—from supporting small creators to animal
              welfare.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoadmapPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-6xl font-black italic text-yellow-500 uppercase mb-16 text-center tracking-tighter">
        The Roadmap
      </h1>

      <div className="space-y-12">
        {/* Phase 1 */}
        <div className="relative pl-8 border-l-2 border-green-500">
          <div className="absolute -left-[11px] top-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.5)]">
            <Check size={12} className="text-black font-bold" />
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-2xl border border-green-500/20">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h3 className="text-2xl font-black text-white uppercase italic">
                Phase 1 — Foundation ✅
              </h3>
              <span className="text-[10px] font-black px-2 py-1 bg-green-500 text-black rounded italic uppercase">
                Completed · CTO: 19.09.2025
              </span>
            </div>
            <ul className="text-zinc-400 space-y-2 text-sm">
              <li>• Community takeover finalized</li>
              <li>• Transparent operations established</li>
              <li>• Core wallets secured and publicly verifiable</li>
              <li>• Initial X and Telegram communities formed</li>
              <li>• Commitment to long-term stewardship set from day one</li>
            </ul>
            <p className="mt-4 text-xs italic text-yellow-500/70">
              "This phase began the moment the community took responsibility for
              $W."
            </p>
          </div>
        </div>

        {/* Phase 2 */}
        <div className="relative pl-8 border-l-2 border-yellow-500">
          <div className="absolute -left-[11px] top-0 w-5 h-5 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
          <div className="bg-zinc-900/50 p-6 rounded-2xl border border-yellow-500/20">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h3 className="text-2xl font-black text-white uppercase italic">
                Phase 2 — Consistency
              </h3>
              <span className="text-[10px] font-black px-2 py-1 bg-yellow-500 text-black rounded italic uppercase">
                Ongoing since 19.09.2025
              </span>
            </div>
            <ul className="text-zinc-400 space-y-2 text-sm">
              <li>• Daily presence across X and Telegram</li>
              <li>• Clear narrative and tone established</li>
              <li>• Organic community growth without paid hype</li>
              <li>• First real-world donations executed</li>
              <li>• Early supporters organically becoming contributors</li>
            </ul>
          </div>
        </div>

        {/* Phase 3 */}
        <div className="relative pl-8 border-l-2 border-yellow-500/30">
          <div className="absolute -left-[11px] top-0 w-5 h-5 bg-zinc-700 rounded-full" />
          <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h3 className="text-2xl font-black text-white uppercase italic">
                Phase 3 — Visibility
              </h3>
              <span className="text-[10px] font-black px-2 py-1 bg-zinc-800 text-zinc-400 rounded italic uppercase">
                Active
              </span>
            </div>
            <ul className="text-zinc-400 space-y-2 text-sm">
              <li>• Refined branding and visual identity</li>
              <li>• Consistent long-form and short-form content</li>
              <li>• Community Spaces and open discussions</li>
              <li>• Increased organic reach and repeat engagement</li>
              <li>• Growing awareness without urgency or pressure</li>
            </ul>
          </div>
        </div>

        {/* Phase 4 */}
        <div className="relative pl-8 border-l-2 border-yellow-500/10">
          <div className="absolute -left-[11px] top-0 w-5 h-5 bg-zinc-800 rounded-full" />
          <div className="bg-zinc-900/20 p-6 rounded-2xl border border-white/5">
            <h3 className="text-2xl font-black text-white uppercase italic mb-4 opacity-70">
              Phase 4 — Participation
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Encouraging holders to become active contributors. Community-led
              initiatives and feedback loops. Broader collaboration with aligned
              creators.
            </p>
          </div>
        </div>

        {/* Phase 5 */}
        <div className="relative pl-8 border-l-2 border-yellow-500/10">
          <div className="absolute -left-[11px] top-0 w-5 h-5 bg-zinc-800 rounded-full" />
          <div className="bg-zinc-900/20 p-6 rounded-2xl border border-white/5">
            <h3 className="text-2xl font-black text-white uppercase italic mb-4 opacity-70">
              Phase 5 — Sustainability
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Sustainability is measured in years, not weeks. Continued
              real-life giving initiatives. Support for small creators and
              communities. Long-term supply discipline.
            </p>
          </div>
        </div>
      </div>

      {/* ADDITIONAL MILESTONES GRID */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "TikTok", date: "27.09.2025" },
          { label: "Instagram", date: "08.12.2025" },
          { label: "Facebook", date: "08.12.2025" },
          { label: "Donations", date: "Ongoing" },
        ].map((m, i) => (
          <div
            key={i}
            className="bg-zinc-900 p-4 rounded-xl border border-white/5 text-center"
          >
            <div className="text-yellow-500 font-black text-xs uppercase mb-1">
              {m.label}
            </div>
            <div className="text-[10px] text-zinc-500 font-bold uppercase">
              {m.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
