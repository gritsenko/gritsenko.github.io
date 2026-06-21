// tests/pilimtrem/game.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Disc, Wind, Coffee, Zap, Droplets, Lock, ArrowUpCircle, Settings } from "lucide-react";
var SawIcon = ({ className, size = 24 }) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 509.498 509.498",
    className,
    fill: "currentColor"
  },
  /* @__PURE__ */ React.createElement("g", null, /* @__PURE__ */ React.createElement("path", { d: "M509.185,134.412c-1.384-9.878-7.178-18.323-15.898-23.167l-54.759-30.421c-8.816-4.898-13.781-14.896-12.355-24.88\r\n        l1.411-9.879c1.04-7.283-1.445-14.737-6.647-19.939c-9.161-9.162-24.069-9.162-33.23,0L257.597,156.234L6.883,406.947\r\n        C2.445,411.385,0,417.287,0,423.564s2.445,12.179,6.883,16.617c0.035,0.035,0.071,0.069,0.106,0.104l49.806,47.865\r\n        c0.046,0.044,0.095,0.081,0.142,0.124c0.118,0.108,0.237,0.215,0.363,0.316c0.083,0.067,0.169,0.128,0.255,0.19\r\n        c0.107,0.079,0.213,0.158,0.325,0.231c0.12,0.079,0.244,0.15,0.367,0.221c0.084,0.048,0.166,0.099,0.252,0.144\r\n        c0.165,0.087,0.334,0.164,0.504,0.238c0.046,0.02,0.088,0.044,0.134,0.063c0.01,0.004,0.02,0.006,0.03,0.01\r\n        c0.176,0.072,0.354,0.132,0.534,0.19c0.055,0.018,0.11,0.04,0.165,0.056c0.149,0.044,0.3,0.077,0.451,0.112\r\n        c0.089,0.021,0.177,0.046,0.267,0.063c0.075,0.014,0.151,0.021,0.227,0.033c0.394,0.063,0.788,0.102,1.18,0.102\r\n        c0.025,0,0.05-0.005,0.075-0.006c0.296-0.003,0.592-0.028,0.886-0.065c0.09-0.012,0.178-0.025,0.267-0.04\r\n        c0.309-0.051,0.615-0.115,0.917-0.205c0.006-0.002,0.013-0.003,0.019-0.005c0.316-0.095,0.625-0.217,0.929-0.354\r\n        c0.062-0.028,0.123-0.058,0.185-0.088c0.259-0.126,0.512-0.266,0.759-0.423c0.04-0.026,0.082-0.048,0.122-0.074\r\n        c0.264-0.176,0.518-0.372,0.763-0.586c0.073-0.063,0.141-0.132,0.211-0.198c0.093-0.087,0.189-0.169,0.279-0.262\r\n        c0.08-0.083,0.149-0.173,0.225-0.259c0.064-0.073,0.129-0.144,0.191-0.219c0.207-0.255,0.396-0.519,0.565-0.793\r\n        c0.026-0.043,0.049-0.089,0.075-0.132c0.163-0.277,0.306-0.562,0.43-0.854c0.012-0.029,0.03-0.054,0.042-0.083l9.446-22.939\r\n        l16.067,2.515c3.923,0.616,7.641-1.934,8.487-5.811l3.297-15.111l14.92,2.339c3.928,0.615,7.643-1.933,8.489-5.811l3.298-15.111\r\n        l14.916,2.34c3.924,0.619,7.645-1.932,8.49-5.812l3.294-15.104l14.904,2.344c3.93,0.618,7.647-1.932,8.493-5.811l3.293-15.104\r\n        l14.903,2.344c3.926,0.616,7.651-1.934,8.494-5.818l3.274-15.079l14.9,2.342c3.928,0.616,7.648-1.934,8.493-5.814l3.284-15.089\r\n        l14.88,2.35c3.923,0.621,7.658-1.934,8.5-5.821l3.262-15.061l14.875,2.348c3.931,0.623,7.653-1.931,8.498-5.813l3.284-15.091\r\n        l14.89,2.347c3.928,0.62,7.657-1.936,8.498-5.823l3.255-15.048l14.842,2.358c3.93,0.622,7.661-1.928,8.505-5.814l3.28-15.086\r\n        l14.892,2.346c3.92,0.618,7.652-1.932,8.496-5.816l3.278-15.086l14.906,2.341c3.926,0.617,7.648-1.935,8.493-5.817l3.277-15.082\r\n        l14.859,2.342c0.002,0,0.004,0.001,0.007,0.001l0.021,0.003c0.354,0.056,0.704,0.077,1.052,0.083\r\n        c0.038,0.001,0.077,0.009,0.115,0.009c0.054,0,0.107-0.007,0.16-0.008c0.138-0.003,0.275-0.01,0.412-0.02\r\n        c0.101-0.008,0.202-0.017,0.302-0.029c0.149-0.017,0.297-0.039,0.444-0.065c0.089-0.016,0.177-0.033,0.265-0.052\r\n        c0.152-0.033,0.302-0.07,0.451-0.112c0.084-0.024,0.168-0.049,0.252-0.076c0.146-0.047,0.291-0.098,0.433-0.154\r\n        c0.086-0.033,0.17-0.068,0.255-0.105c0.136-0.059,0.27-0.122,0.402-0.188c0.087-0.044,0.173-0.089,0.258-0.136\r\n        c0.126-0.07,0.25-0.144,0.371-0.221c0.085-0.053,0.168-0.108,0.251-0.165c0.12-0.083,0.236-0.17,0.351-0.259\r\n        c0.077-0.06,0.153-0.119,0.227-0.182c0.118-0.1,0.232-0.204,0.344-0.312c0.041-0.039,0.084-0.073,0.124-0.112l79.325-79.325\r\n        C507.317,154.001,510.568,144.29,509.185,134.412z" }))
);
var INGREDIENTS = {
  ivan: { id: "ivan", name: "\u0418\u0432\u0430\u043D-\u0447\u0430\u0439", color: "#8b5cf6", dx: 0, dy: -5, cost: 0, desc: "\u041E\u0441\u043D\u043E\u0432\u0430 \u0432\u0441\u0435\u0433\u043E" },
  dushica: { id: "dushica", name: "\u0414\u0443\u0448\u0438\u0446\u0430", color: "#ec4899", dx: 10, dy: 2, cost: 50, desc: "\u0414\u043B\u044F \u0443\u044E\u0442\u0430" },
  chabrec: { id: "chabrec", name: "\u0427\u0430\u0431\u0440\u0435\u0446", color: "#10b981", dx: -8, dy: 5, cost: 150, desc: "\u0413\u043E\u0440\u043D\u0430\u044F \u0441\u0432\u0435\u0436\u0435\u0441\u0442\u044C" },
  limonnik: { id: "limonnik", name: "\u041B\u0438\u043C\u043E\u043D\u043D\u0438\u043A", color: "#f59e0b", dx: 2, dy: -12, cost: 400, desc: "\u0417\u0430\u0440\u044F\u0434 \u0431\u043E\u0434\u0440\u043E\u0441\u0442\u0438" },
  eleutero: { id: "eleutero", name: "\u042D\u043B\u0435\u0443\u0442\u0435\u0440\u043E\u043A\u043E\u043A\u043A", color: "#ef4444", dx: -5, dy: -8, cost: 1e3, desc: "\u0421\u0438\u043B\u0430 \u043A\u043E\u0440\u043D\u0435\u0439" }
};
var RECIPES = [
  { name: "\u0421\u0442\u0430\u0440\u0442 \u041F\u043E\u0434\u043A\u0430\u0441\u0442\u0430", x: 20, y: -30, radius: 15, unlocked: true },
  { name: "\u0413\u043B\u0443\u0431\u043E\u043A\u0438\u0439 \u0420\u0430\u0437\u0431\u043E\u0440", x: -40, y: -60, radius: 12, unlocked: false },
  { name: "\u0418\u0434\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u0422\u0440\u0451\u043C", x: 60, y: 10, radius: 10, unlocked: false },
  { name: "\u041D\u0438\u0440\u0432\u0430\u043D\u0430 \u0432 \u0433\u043E\u043B\u043E\u0432\u0435", x: 0, y: -90, radius: 8, unlocked: false }
];
var ZOOM = 0.5;
var audioCtx = typeof window !== "undefined" ? new (window.AudioContext || window.webkitAudioContext)() : null;
var playSound = (type) => {
  if (!audioCtx) return;
  if (audioCtx.state === "suspended") audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  if (type === "saw") {
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } else if (type === "grind") {
    const bufferSize = audioCtx.sampleRate * 0.1;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1e3;
    noise.connect(filter);
    filter.connect(gain);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    noise.start();
  } else if (type === "pop") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } else if (type === "success") {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
  }
};
var TutorialPointer = ({ text, className }) => /* @__PURE__ */ React.createElement("div", { className: `absolute z-50 flex flex-col items-center pointer-events-none transition-opacity duration-300 ${className}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-xl mb-2 whitespace-nowrap shadow-lg animate-pulse" }, text), /* @__PURE__ */ React.createElement("div", { className: "text-4xl animate-bounce filter drop-shadow-md" }, "\u{1F447}"));
var App = () => {
  const [leaves, setLeaves] = useState(0);
  const [extract, setExtract] = useState(0);
  const [unlockedIngredients, setUnlockedIngredients] = useState(["ivan"]);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [brewing, setBrewing] = useState([]);
  const [discoveredRecipes, setDiscoveredRecipes] = useState([]);
  const [sawPower, setSawPower] = useState(1);
  const [grindMult, setGrindMult] = useState(1);
  const [autoSaw, setAutoSaw] = useState(0);
  const [autoGrind, setAutoGrind] = useState(0);
  const [isSawing, setIsSawing] = useState(false);
  const [isGrinding, setIsGrinding] = useState(false);
  const [pulseLeaves, setPulseLeaves] = useState(0);
  const [pulseExtract, setPulseExtract] = useState(0);
  const sawBtnRef = useRef(null);
  const leavesRef = useRef(null);
  const grindBtnRef = useRef(null);
  const extractRef = useRef(null);
  const [tutStep, setTutStep] = useState(0);
  const [tutHidden, setTutHidden] = useState(false);
  useEffect(() => {
    let newStep = tutStep;
    if (tutStep === 0 && leaves >= 5) newStep = 1;
    if (tutStep === 1 && extract >= 10) newStep = 2;
    if (tutStep === 2 && brewing.length > 0) newStep = 3;
    if (tutStep === 3 && discoveredRecipes.length > 0) newStep = -1;
    if (newStep !== tutStep) {
      setTutStep(newStep);
      setTutHidden(false);
    }
  }, [leaves, extract, brewing, discoveredRecipes, tutStep]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoSaw > 0) {
        setLeaves((l) => l + autoSaw);
        setPulseLeaves(Date.now());
      }
      if (autoGrind > 0) {
        setLeaves((l) => {
          const possibleBatches = Math.floor(l / 5);
          const batchesToProcess = Math.min(possibleBatches, autoGrind);
          if (batchesToProcess > 0) {
            setExtract((e) => e + batchesToProcess * 5 * grindMult);
            setPulseExtract(Date.now());
            return l - batchesToProcess * 5;
          }
          return l;
        });
      }
    }, 1e3);
    return () => clearInterval(interval);
  }, [autoSaw, autoGrind, grindMult]);
  const spawnFlyingParticles = useCallback((startEl, endEl, color, symbol, onArrive) => {
    if (!startEl || !endEl) return;
    const startRect = startEl.getBoundingClientRect();
    const endRect = endEl.getBoundingClientRect();
    const el = document.createElement("div");
    el.innerHTML = symbol;
    el.style.position = "fixed";
    el.style.left = `${startRect.left + startRect.width / 2}px`;
    el.style.top = `${startRect.top + startRect.height / 2}px`;
    el.style.color = color;
    el.style.pointerEvents = "none";
    el.style.zIndex = "9999";
    el.style.fontWeight = "bold";
    el.style.transition = "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
    el.style.transform = "translate(-50%, -50%) scale(1.5)";
    document.body.appendChild(el);
    for (let i = 0; i < 4; i++) {
      const spark = document.createElement("div");
      spark.style.position = "fixed";
      spark.style.left = `${startRect.left + startRect.width / 2}px`;
      spark.style.top = `${startRect.top + startRect.height / 2}px`;
      spark.style.width = "8px";
      spark.style.height = "8px";
      spark.style.borderRadius = "50%";
      spark.style.backgroundColor = color;
      spark.style.pointerEvents = "none";
      spark.style.zIndex = "9998";
      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 50;
      spark.style.transition = "all 0.4s ease-out";
      document.body.appendChild(spark);
      requestAnimationFrame(() => {
        spark.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
        spark.style.opacity = "0";
      });
      setTimeout(() => spark.remove(), 400);
    }
    requestAnimationFrame(() => {
      el.style.left = `${endRect.left + endRect.width / 2}px`;
      el.style.top = `${endRect.top + endRect.height / 2}px`;
      el.style.transform = "translate(-50%, -50%) scale(0.5)";
      el.style.opacity = "0.5";
    });
    setTimeout(() => {
      el.remove();
      if (onArrive) onArrive();
    }, 500);
  }, []);
  const handleSawClick = () => {
    setTutHidden(true);
    playSound("saw");
    setIsSawing(true);
    setTimeout(() => setIsSawing(false), 100);
    spawnFlyingParticles(sawBtnRef.current, leavesRef.current, "#4ade80", "\u{1F343}", () => {
      setLeaves((prev) => prev + sawPower);
      playSound("pop");
      setPulseLeaves(Date.now());
    });
  };
  const handleGrindClick = () => {
    if (leaves >= 5) {
      setTutHidden(true);
      playSound("grind");
      setIsGrinding(true);
      setLeaves((prev) => prev - 5);
      setTimeout(() => setIsGrinding(false), 200);
      spawnFlyingParticles(grindBtnRef.current, extractRef.current, "#60a5fa", "\u{1F4A7}", () => {
        setExtract((prev) => prev + 5 * grindMult);
        playSound("pop");
        setPulseExtract(Date.now());
      });
    }
  };
  const addIngredientClick = (ingId) => {
    const ing = INGREDIENTS[ingId];
    if (extract >= 10) {
      setTutHidden(true);
      setExtract((prev) => prev - 10);
      setBrewing((prev) => [...prev, ing.name]);
      setPos((prev) => ({
        x: Math.max(-200, Math.min(200, prev.x + ing.dx)),
        y: Math.max(-200, Math.min(200, prev.y + ing.dy))
      }));
      playSound("pop");
    }
  };
  const resetBrew = () => {
    setPos({ x: 0, y: 0 });
    setBrewing([]);
  };
  const finishBrewClick = () => {
    setTutHidden(true);
    const found = RECIPES.find((r) => {
      const dist = Math.sqrt(Math.pow(pos.x - r.x, 2) + Math.pow(pos.y - r.y, 2));
      return dist <= r.radius;
    });
    if (found) {
      playSound("success");
      if (!discoveredRecipes.includes(found.name)) {
        setDiscoveredRecipes((prev) => [...prev, found.name]);
      }
      alert(`\u{1F389} \u0412\u044B \u0441\u043E\u0437\u0434\u0430\u043B\u0438 \u043A\u0443\u043F\u0430\u0436: ${found.name}! \u041F\u043E\u0434\u043A\u0430\u0441\u0442 \u0437\u0430\u0438\u0433\u0440\u0430\u043B \u0432 \u0433\u043E\u043B\u043E\u0432\u0435.`);
    } else {
      alert("\u0412\u043A\u0443\u0441 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0441\u044F... \u0441\u0442\u0440\u0430\u043D\u043D\u044B\u043C. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.");
    }
    resetBrew();
  };
  const buyIngredient = (id) => {
    const ing = INGREDIENTS[id];
    if (extract >= ing.cost && !unlockedIngredients.includes(id)) {
      setExtract((prev) => prev - ing.cost);
      setUnlockedIngredients((prev) => [...prev, id]);
      playSound("success");
    }
  };
  const costSawPower = sawPower * 50;
  const costGrindMult = grindMult * 50;
  const costAutoSaw = (autoSaw + 1) * 100;
  const costAutoGrind = (autoGrind + 1) * 150;
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-[#1a0b2e] text-white font-sans p-4 md:p-8 flex flex-col items-center overflow-x-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-6xl mb-6 text-center md:text-left" }, /* @__PURE__ */ React.createElement("h1", { className: "text-4xl md:text-5xl font-black text-[#f59e0b] uppercase tracking-tighter italic drop-shadow-lg" }, "\u041F\u0438\u043B\u0438\u043C \u0422\u0440\u0451\u043C"), /* @__PURE__ */ React.createElement("p", { className: "text-[#8b5cf6] font-bold tracking-widest uppercase mt-1" }, "\u0427\u0430\u0439\u043D\u044B\u0439 \u041A\u0440\u0430\u0444\u0442")), /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 relative" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-4 space-y-6" }, /* @__PURE__ */ React.createElement("section", { className: "bg-[#2d1b4d] p-6 rounded-3xl border-2 border-orange-500/20 relative shadow-lg" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold mb-4 flex items-center gap-2 italic" }, /* @__PURE__ */ React.createElement(SawIcon, { size: 20, className: "text-orange-500" }), " 1. \u041F\u0418\u041B\u0418\u041C"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, !tutHidden && tutStep === 0 && /* @__PURE__ */ React.createElement(TutorialPointer, { text: "\u041D\u0430\u0447\u043D\u0438 \u043F\u0438\u043B\u0438\u0442\u044C!", className: "-top-16 left-1/2 -translate-x-1/2" }), /* @__PURE__ */ React.createElement(
    "button",
    {
      ref: sawBtnRef,
      onClick: handleSawClick,
      className: `w-full py-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 shadow-[0_10px_20px_rgba(249,115,22,0.3)] active:scale-95 transition-all flex flex-col items-center group relative z-10 ${isSawing ? "rotate-2 brightness-110" : ""}`
    },
    /* @__PURE__ */ React.createElement(SawIcon, { size: 64, className: `text-white group-hover:rotate-12 transition-transform ${isSawing ? "animate-pulse" : ""}` }),
    /* @__PURE__ */ React.createElement("span", { className: "mt-4 font-black uppercase text-white tracking-wider" }, "\u0417\u0430\u0433\u043E\u0442\u043E\u0432\u0438\u0442\u044C (+", sawPower, ")")
  ))), /* @__PURE__ */ React.createElement("section", { className: "bg-[#2d1b4d] p-6 rounded-3xl border-2 border-purple-500/20 relative shadow-lg" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-4" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold flex items-center gap-2 italic" }, /* @__PURE__ */ React.createElement(Disc, { size: 20, className: "text-purple-500" }), " 2. \u0422\u0420\u0401\u041C"), /* @__PURE__ */ React.createElement(
    "div",
    {
      key: pulseLeaves,
      ref: leavesRef,
      className: "flex items-center gap-2 bg-black/30 px-3 py-2 rounded-xl text-green-400 border border-green-500/30 animate-bump"
    },
    /* @__PURE__ */ React.createElement(Wind, { size: 18 }),
    /* @__PURE__ */ React.createElement("span", { className: "font-mono font-bold text-xl" }, Math.floor(leaves))
  )), /* @__PURE__ */ React.createElement("div", { className: "relative" }, !tutHidden && tutStep === 1 && /* @__PURE__ */ React.createElement(TutorialPointer, { text: "\u041F\u0435\u0440\u0435\u0442\u0440\u0438 \u0432 \u044D\u043A\u0441\u0442\u0440\u0430\u043A\u0442!", className: "-top-16 left-1/2 -translate-x-1/2" }), /* @__PURE__ */ React.createElement(
    "button",
    {
      ref: grindBtnRef,
      disabled: leaves < 5,
      onClick: handleGrindClick,
      className: `w-full py-8 rounded-2xl border-4 transition-all flex flex-col items-center gap-2 relative z-10
                  ${leaves >= 5 ? "border-purple-500 bg-purple-900/40 hover:bg-purple-600/40 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.4)]" : "border-purple-900/50 bg-black/20 opacity-50 cursor-not-allowed"}
                  ${isGrinding ? "scale-105 border-white brightness-150" : ""}
                `
    },
    /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 rounded-full border-4 border-dotted border-purple-400 flex items-center justify-center animate-spin-slow" }, /* @__PURE__ */ React.createElement(Zap, { size: 24, className: "text-purple-400" })),
    /* @__PURE__ */ React.createElement("span", { className: "font-bold text-purple-200" }, "\u041F\u0435\u0440\u0435\u0442\u0435\u0440\u0435\u0442\u044C (5 \u043B. \u2192 ", 5 * grindMult, " \u044D.)")
  ))), /* @__PURE__ */ React.createElement("section", { className: "bg-gradient-to-b from-[#2d1b4d] to-[#1e1038] p-5 rounded-3xl border border-white/10 shadow-lg relative" }, /* @__PURE__ */ React.createElement("h2", { className: "text-sm font-black opacity-50 mb-3 uppercase tracking-widest text-center flex items-center justify-center gap-2" }, /* @__PURE__ */ React.createElement(Settings, { size: 14 }), " \u0423\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u044F"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        if (leaves >= costSawPower) {
          setLeaves((l) => l - costSawPower);
          setSawPower((p) => p + 1);
          playSound("success");
        }
      },
      disabled: leaves < costSawPower,
      className: `p-3 rounded-xl text-xs flex flex-col items-center gap-1 transition-all border ${leaves >= costSawPower ? "bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20 active:scale-95" : "bg-black/30 border-white/5 opacity-50 cursor-not-allowed"}`
    },
    /* @__PURE__ */ React.createElement("span", { className: "font-bold text-orange-300" }, "\u041E\u0441\u0442\u0440\u0430\u044F \u043F\u0438\u043B\u0430"),
    /* @__PURE__ */ React.createElement("span", { className: "opacity-70" }, "+", sawPower + 1, " \u0437\u0430 \u043A\u043B\u0438\u043A"),
    /* @__PURE__ */ React.createElement("span", { className: "font-mono mt-1 px-2 py-0.5 bg-black/50 rounded-md text-green-400" }, costSawPower, " \u{1F343}")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        if (extract >= costGrindMult) {
          setExtract((e) => e - costGrindMult);
          setGrindMult((m) => m + 1);
          playSound("success");
        }
      },
      disabled: extract < costGrindMult,
      className: `p-3 rounded-xl text-xs flex flex-col items-center gap-1 transition-all border ${extract >= costGrindMult ? "bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20 active:scale-95" : "bg-black/30 border-white/5 opacity-50 cursor-not-allowed"}`
    },
    /* @__PURE__ */ React.createElement("span", { className: "font-bold text-purple-300" }, "\u041C\u043E\u0449\u043D\u0430\u044F \u0442\u0435\u0440\u043A\u0430"),
    /* @__PURE__ */ React.createElement("span", { className: "opacity-70" }, "x", grindMult + 1, " \u044D\u043A\u0441\u0442\u0440\u0430\u043A\u0442\u0430"),
    /* @__PURE__ */ React.createElement("span", { className: "font-mono mt-1 px-2 py-0.5 bg-black/50 rounded-md text-blue-400" }, costGrindMult, " \u{1F4A7}")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        if (leaves >= costAutoSaw) {
          setLeaves((l) => l - costAutoSaw);
          setAutoSaw((a) => a + 1);
          playSound("success");
        }
      },
      disabled: leaves < costAutoSaw,
      className: `p-3 rounded-xl text-xs flex flex-col items-center gap-1 transition-all border ${leaves >= costAutoSaw ? "bg-green-500/10 border-green-500/30 hover:bg-green-500/20 active:scale-95" : "bg-black/30 border-white/5 opacity-50 cursor-not-allowed"}`
    },
    /* @__PURE__ */ React.createElement("span", { className: "font-bold text-green-300" }, "\u0410\u0432\u0442\u043E-\u043F\u0438\u043B\u0430"),
    /* @__PURE__ */ React.createElement("span", { className: "opacity-70" }, "+", autoSaw + 1, " \u{1F343}/\u0441\u0435\u043A"),
    /* @__PURE__ */ React.createElement("span", { className: "font-mono mt-1 px-2 py-0.5 bg-black/50 rounded-md text-green-400" }, costAutoSaw, " \u{1F343}")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        if (extract >= costAutoGrind) {
          setExtract((e) => e - costAutoGrind);
          setAutoGrind((a) => a + 1);
          playSound("success");
        }
      },
      disabled: extract < costAutoGrind,
      className: `p-3 rounded-xl text-xs flex flex-col items-center gap-1 transition-all border ${extract >= costAutoGrind ? "bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 active:scale-95" : "bg-black/30 border-white/5 opacity-50 cursor-not-allowed"}`
    },
    /* @__PURE__ */ React.createElement("span", { className: "font-bold text-blue-300" }, "\u0410\u0432\u0442\u043E-\u0442\u0435\u0440\u043A\u0430"),
    /* @__PURE__ */ React.createElement("span", { className: "opacity-70 text-center leading-tight" }, "+", autoGrind + 1, " \u0446\u0438\u043A\u043B/\u0441\u0435\u043A"),
    /* @__PURE__ */ React.createElement("span", { className: "font-mono mt-1 px-2 py-0.5 bg-black/50 rounded-md text-blue-400" }, costAutoGrind, " \u{1F4A7}")
  )))), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-5 flex flex-col gap-4" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      key: pulseExtract,
      ref: extractRef,
      className: "w-full bg-gradient-to-r from-blue-900 to-[#2d1b4d] rounded-[32px] p-6 border-4 border-blue-500/40 flex items-center justify-between shadow-[0_10px_30px_rgba(59,130,246,0.3)] animate-bump relative overflow-hidden"
    },
    /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-blue-500/10 animate-pulse pointer-events-none" }),
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 z-10" }, /* @__PURE__ */ React.createElement(Droplets, { className: "text-blue-400", size: 32 }), /* @__PURE__ */ React.createElement("span", { className: "text-xl md:text-2xl uppercase font-black tracking-widest text-blue-200" }, "\u042D\u043A\u0441\u0442\u0440\u0430\u043A\u0442")),
    /* @__PURE__ */ React.createElement("div", { className: "text-5xl font-mono font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10" }, Math.floor(extract))
  ), /* @__PURE__ */ React.createElement("div", { className: "relative bg-[#0f071a] aspect-square rounded-[40px] border-4 border-[#8b5cf6]/40 overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.15)] flex-1" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "absolute inset-0 pointer-events-none transition-transform duration-700 ease-out",
      style: { backgroundPosition: `calc(50% + ${-pos.x * ZOOM * 4}px) calc(50% + ${-pos.y * ZOOM * 4}px)`, backgroundImage: "radial-gradient(#8b5cf6 1.5px, transparent 1.5px)", backgroundSize: "24px 24px", opacity: 0.1 }
    }
  ), RECIPES.map((r, i) => {
    const leftPos = `calc(50% + ${(r.x - pos.x) * ZOOM}%)`;
    const topPos = `calc(50% + ${(r.y - pos.y) * ZOOM}%)`;
    const size = `${r.radius * 2 * ZOOM}%`;
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: i,
        className: "absolute flex items-center justify-center transition-all duration-700 ease-out",
        style: { left: leftPos, top: topPos, width: size, height: size, transform: "translate(-50%, -50%)" }
      },
      /* @__PURE__ */ React.createElement("div", { className: `w-full h-full rounded-full border-2 border-dashed ${discoveredRecipes.includes(r.name) ? "border-green-400 bg-green-500/30" : "border-white/30"} animate-pulse` }),
      /* @__PURE__ */ React.createElement("span", { className: "absolute -bottom-7 text-xs whitespace-nowrap font-bold uppercase opacity-80 tracking-tighter bg-black/50 px-2 py-1 rounded" }, r.name)
    );
  }), /* @__PURE__ */ React.createElement("div", { className: "absolute w-12 h-12 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20" }, /* @__PURE__ */ React.createElement("div", { className: "relative w-full h-full" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-[#f59e0b] rounded-full animate-ping opacity-60" }), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full border-2 border-white flex items-center justify-center shadow-[0_0_20px_#f59e0b]" }, /* @__PURE__ */ React.createElement(Coffee, { size: 20, className: "text-[#1a0b2e]" })))), /* @__PURE__ */ React.createElement("div", { className: "absolute top-1/2 left-0 w-full h-px bg-white/5 pointer-events-none" }), /* @__PURE__ */ React.createElement("div", { className: "absolute left-1/2 top-0 h-full w-px bg-white/5 pointer-events-none" })), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 mt-2 relative" }, /* @__PURE__ */ React.createElement("button", { onClick: resetBrew, className: "flex-1 py-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold uppercase tracking-wider transition-colors border border-red-500/20" }, "\u0421\u043B\u0438\u0442\u044C"), /* @__PURE__ */ React.createElement("div", { className: "flex-[2] relative" }, !tutHidden && tutStep === 3 && /* @__PURE__ */ React.createElement(TutorialPointer, { text: "\u0416\u043C\u0438 '\u0417\u0430\u0432\u0430\u0440\u0438\u0442\u044C'!", className: "-top-16 left-1/2 -translate-x-1/2" }), /* @__PURE__ */ React.createElement("button", { onClick: finishBrewClick, className: "w-full h-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:brightness-110 shadow-[0_0_20px_rgba(16,185,129,0.4)] font-black uppercase tracking-widest border-2 border-green-400/50 transition-all active:scale-95" }, "\u0417\u0430\u0432\u0430\u0440\u0438\u0442\u044C \u041A\u0443\u043F\u0430\u0436"))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#2d1b4d] p-4 rounded-2xl border border-white/5 flex flex-wrap gap-2 min-h-[56px] items-center" }, brewing.length === 0 && /* @__PURE__ */ React.createElement("span", { className: "text-white/30 text-sm italic w-full text-center" }, "\u0421\u0442\u0443\u043F\u043A\u0430 \u043F\u0443\u0441\u0442\u0430... \u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0438\u043D\u0433\u0440\u0435\u0434\u0438\u0435\u043D\u0442\u044B."), brewing.map((item, idx) => /* @__PURE__ */ React.createElement("span", { key: idx, className: "bg-white/10 px-3 py-1.5 rounded-lg text-xs font-bold border border-white/20 shadow-sm" }, item)))), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-3 space-y-4" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold italic text-blue-400 mb-4 uppercase flex items-center gap-2" }, "\u0420\u0435\u0446\u0435\u043F\u0442\u0443\u0440\u0430"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 relative" }, !tutHidden && tutStep === 2 && /* @__PURE__ */ React.createElement(TutorialPointer, { text: "\u0414\u043E\u0431\u0430\u0432\u044C \u0437\u0430 10 \u044D.", className: "-left-16 top-8" }), Object.values(INGREDIENTS).map((ing) => {
    const isUnlocked = unlockedIngredients.includes(ing.id);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: ing.id,
        className: `p-4 rounded-2xl border-2 transition-all duration-300 ${isUnlocked ? "border-white/10 bg-[#2d1b4d] hover:border-white/30 hover:shadow-lg" : "border-white/5 bg-black/40 grayscale opacity-60"}`
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-start mb-2" }, /* @__PURE__ */ React.createElement("span", { className: "font-black uppercase tracking-tight", style: { color: isUnlocked ? ing.color : "gray" } }, ing.name), !isUnlocked && /* @__PURE__ */ React.createElement(Lock, { size: 16, className: "text-white/30" })),
      /* @__PURE__ */ React.createElement("p", { className: "text-xs opacity-60 mb-4 h-8" }, ing.desc),
      isUnlocked ? /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => addIngredientClick(ing.id),
          disabled: extract < 10,
          className: `w-full py-3 rounded-xl text-xs font-black uppercase transition-all flex items-center justify-center gap-2
                        ${extract >= 10 ? "bg-white/10 hover:bg-white/20 text-white shadow-inner active:scale-95" : "bg-transparent border border-white/10 opacity-40 text-white/50 cursor-not-allowed"}
                      `
        },
        "\u0412 \u0441\u0442\u0443\u043F\u043A\u0443 ",
        /* @__PURE__ */ React.createElement("span", { className: "text-blue-300" }, "-10\u{1F4A7}")
      ) : /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => buyIngredient(ing.id),
          disabled: extract < ing.cost,
          className: `w-full py-3 rounded-xl text-xs font-bold uppercase transition-all
                        ${extract >= ing.cost ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] active:scale-95" : "bg-white/5 opacity-50 text-white/50 cursor-not-allowed"}
                      `
        },
        "\u0418\u0437\u0443\u0447\u0438\u0442\u044C (",
        ing.cost,
        "\u{1F4A7})"
      )
    );
  })))), /* @__PURE__ */ React.createElement("style", null, `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes bump {
          0% { transform: scale(1); filter: brightness(1); }
          30% { transform: scale(1.15); filter: brightness(1.5); box-shadow: 0 0 25px currentColor; }
          100% { transform: scale(1); filter: brightness(1); }
        }
        .animate-bump {
          animation: bump 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `));
};
var game_default = App;
export {
  game_default as default
};
