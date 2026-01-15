import React, { useState, useRef, useEffect } from "react";
import { Upload, Download, Twitter, Move, Shield } from "lucide-react";

export default function MemeGenerator() {
  const canvasRef = useRef(null);
  const [staticImages, setStaticImages] = useState({
    upper: null,
    lower: null,
  });
  const [logoImg, setLogoImg] = useState(null);

  // User Uploads & Transforms
  const [userUpper, setUserUpper] = useState(null);
  const [userLower, setUserLower] = useState(null);
  const [upperTransform, setUpperTransform] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });
  const [lowerTransform, setLowerTransform] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });
  const [upperText, setUpperText] = useState("");
  const [lowerText, setLowerText] = useState("");

  // Dragging State
  const [isDragging, setIsDragging] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Load Assets
  useEffect(() => {
    // Static Memes
    const img1 = new Image();
    img1.src = "/test.jpeg";
    const img2 = new Image();
    img2.src = "/test1.jpeg";
    img1.onload = () => setStaticImages((prev) => ({ ...prev, upper: img1 }));
    img2.onload = () => setStaticImages((prev) => ({ ...prev, lower: img2 }));

    // Watermark Logo
    const logo = new Image();
    logo.src = "/logo.png";
    logo.onload = () => setLogoImg(logo);
  }, []);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1000, 1000);

    // 1. Draw Static Left Side
    if (staticImages.upper) ctx.drawImage(staticImages.upper, 0, 0, 500, 500);
    if (staticImages.lower) ctx.drawImage(staticImages.lower, 0, 500, 500, 500);

    const drawUserSection = (img, transform, yOffset, text) => {
      ctx.save();
      ctx.beginPath();
      ctx.rect(500, yOffset, 500, 500);
      ctx.clip();

      if (img) {
        const drawW = 500 * transform.scale;
        const drawH = 500 * (img.height / img.width) * transform.scale;
        const posX = 750 - drawW / 2 + transform.x;
        const posY = yOffset + 250 - drawH / 2 + transform.y;
        ctx.drawImage(img, posX, posY, drawW, drawH);
      } else {
        ctx.fillStyle = "#111111";
        ctx.fillRect(500, yOffset, 500, 500);
      }

      if (text) {
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 7;
        ctx.lineJoin = "round";
        ctx.font = "bold 55px Impact, sans-serif";
        ctx.textAlign = "center";
        ctx.strokeText(text.toUpperCase(), 750, yOffset + 70);
        ctx.fillText(text.toUpperCase(), 750, yOffset + 70);
      }
      ctx.restore();
    };

    drawUserSection(userUpper, upperTransform, 0, upperText);
    drawUserSection(userLower, lowerTransform, 500, lowerText);

    // --- LOGO WATERMARK ---
    if (logoImg) {
      const padding = 20;
      const logoWidth = 60; // Adjust size here
      const logoHeight = logoImg.height * (logoWidth / logoImg.width);

      // Positioned at the very bottom right
      const x = 1000 - logoWidth - padding;
      const y = 1000 - logoHeight - padding;

      ctx.globalAlpha = 0.8; // Subtle transparency
      ctx.drawImage(logoImg, x, y, logoWidth, logoHeight);
      ctx.globalAlpha = 1.0;
    }

    // Grid Overlay
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, 1000, 1000);
    ctx.beginPath();
    ctx.moveTo(500, 0);
    ctx.lineTo(500, 1000);
    ctx.moveTo(0, 500);
    ctx.lineTo(1000, 500);
    ctx.stroke();
  };

  useEffect(() => {
    draw();
  }, [
    staticImages,
    logoImg,
    userUpper,
    userLower,
    upperTransform,
    lowerTransform,
    upperText,
    lowerText,
  ]);

  const handleStart = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = ((clientX - rect.left) / rect.width) * 1000;
    const y = ((clientY - rect.top) / rect.height) * 1000;
    if (x > 500) {
      const target = y < 500 ? "upper" : "lower";
      setIsDragging(target);
      const current = target === "upper" ? upperTransform : lowerTransform;
      setDragStart({ x: x - current.x, y: y - current.y });
    }
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = ((clientX - rect.left) / rect.width) * 1000;
    const y = ((clientY - rect.top) / rect.height) * 1000;
    const newPos = { x: x - dragStart.x, y: y - dragStart.y };
    if (isDragging === "upper") setUpperTransform((p) => ({ ...p, ...newPos }));
    else setLowerTransform((p) => ({ ...p, ...newPos }));
  };

  return (
    <div className="py-12 flex flex-col items-center px-4 min-h-screen bg-black text-white selection:bg-yellow-500">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-black text-yellow-500 italic uppercase tracking-tighter">
          MEME FACTORY
        </h1>
        <p className="text-zinc-500 font-bold text-xs tracking-[0.4em] mt-2 italic flex items-center justify-center gap-2">
          <Shield size={14} className="text-yellow-500" /> BRANDED FOR SUCCESS
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center w-full max-w-7xl gap-10">
        <div className="flex-shrink-0 shadow-[0_0_60px_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden">
          <canvas
            ref={canvasRef}
            width={1000}
            height={1000}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={() => setIsDragging(null)}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={() => setIsDragging(null)}
            className="w-full max-w-[500px] md:max-w-[600px] h-auto border-2 border-white/5 cursor-move bg-zinc-900"
          />
        </div>

        <div className="w-full lg:w-[420px] space-y-6">
          {[
            {
              id: "upper",
              label: "Top Section",
              transform: upperTransform,
              set: setUpperTransform,
              text: upperText,
              setText: setUpperText,
              upload: setUserUpper,
              hid: "h1",
            },
            {
              id: "lower",
              label: "Bottom Section",
              transform: lowerTransform,
              set: setLowerTransform,
              text: lowerText,
              setText: setLowerText,
              upload: setUserLower,
              hid: "h2",
            },
          ].map((sec) => (
            <div
              key={sec.id}
              className="bg-zinc-900/60 border border-white/10 p-6 rounded-3xl space-y-4 backdrop-blur-sm"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-yellow-500 font-black text-[10px] uppercase tracking-widest">
                  {sec.label}
                </span>
                <input
                  type="file"
                  id={sec.hid}
                  hidden
                  onChange={(e) => {
                    const f = e.target.files[0];
                    if (f) {
                      const i = new Image();
                      i.src = URL.createObjectURL(f);
                      i.onload = () => sec.upload(i);
                    }
                  }}
                />
                <label
                  htmlFor={sec.hid}
                  className="text-[10px] bg-yellow-500 text-white px-3 py-1 rounded font-black cursor-pointer hover:bg-white hover:text-black transition-all uppercase"
                >
                  Upload
                </label>
              </div>
              <input
                type="text"
                placeholder="Caption..."
                value={sec.text}
                onChange={(e) => sec.setText(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-yellow-500 outline-none"
              />
              <div className="space-y-4 pt-2">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[9px] font-bold text-zinc-500 uppercase">
                    <span>Scale</span>
                    <span>{Math.round(sec.transform.scale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.01"
                    value={sec.transform.scale}
                    onChange={(e) =>
                      sec.set((p) => ({
                        ...p,
                        scale: parseFloat(e.target.value),
                      }))
                    }
                    className="w-full accent-yellow-500 h-1.5"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase">
                      Horizontal
                    </span>
                    <input
                      type="range"
                      min="-500"
                      max="500"
                      value={sec.transform.x}
                      onChange={(e) =>
                        sec.set((p) => ({ ...p, x: parseInt(e.target.value) }))
                      }
                      className="w-full accent-zinc-600 h-1"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase">
                      Vertical
                    </span>
                    <input
                      type="range"
                      min="-500"
                      max="500"
                      value={sec.transform.y}
                      onChange={(e) =>
                        sec.set((p) => ({ ...p, y: parseInt(e.target.value) }))
                      }
                      className="w-full accent-zinc-600 h-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.download = "meme-factory.png";
                link.href = canvasRef.current.toDataURL("image/png");
                link.click();
              }}
              className="flex-1 py-4 bg-yellow-500 hover:bg-yellow-400 text-white font-black uppercase rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_0_rgb(161,98,7)] active:translate-y-1 active:shadow-none"
            >
              <Download size={20} strokeWidth={3} /> Download
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    "Freshly minted $W Meme! 🔥"
                  )}`,
                  "_blank"
                )
              }
              className="flex-1 py-4 bg-zinc-800 hover:bg-[#1DA1F2] text-white font-black uppercase rounded-2xl flex items-center justify-center gap-2 transition-all"
            >
              <Twitter size={20} fill="currentColor" /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
