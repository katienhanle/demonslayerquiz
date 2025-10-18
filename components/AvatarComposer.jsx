// AvatarComposer.jsx (core changes)
"use client";
import { useEffect, useRef } from "react";

const PX = 32, SCALE = 6, SIZE = PX * SCALE;

const loadImage = (src) =>
  new Promise((res, rej) => { const i = new Image(); i.onload=()=>res(i); i.onerror=rej; i.src=src; });

const hexToRGB = (hex) => {
  const h = hex.replace('#','');
  const n = parseInt(h.length === 3 ? h.split('').map(c=>c+c).join('') : h, 16);
  return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 };
};

// recolor only pixels that are close to white, keep others (outlines) intact
function recolorWhiteOnly(srcImg, colorHex, threshold = 220) {
  const { r:tr, g:tg, b:tb } = hexToRGB(colorHex);
  const oc = document.createElement("canvas");
  oc.width = PX; oc.height = PX;
  const octx = oc.getContext("2d");
  octx.imageSmoothingEnabled = false;

  octx.drawImage(srcImg, 0, 0);               // draw original hair
  const img = octx.getImageData(0, 0, PX, PX);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i+1], b = d[i+2], a = d[i+3];
    // treat “white-ish” fill as recolorable (keeps black/dark lines)
    if (a > 0 && r >= threshold && g >= threshold && b >= threshold) {
      d[i] = tr; d[i+1] = tg; d[i+2] = tb; // keep original alpha
    }
  }
  octx.putImageData(img, 0, 0);
  return oc;
}

export default function AvatarComposer({ avatar, small=false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const saved = !avatar ? JSON.parse(localStorage.getItem("avatar") || "{}") : {};
    const info = avatar || saved;
    render(info);
  }, [avatar]); // re-render when prop changes

  async function render(avatar) {
    const { skin=1, hairStyle="hair_1", hairColor="#000000", eye="eyes_1" } = avatar || {};
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    c.width = SIZE; c.height = SIZE;
    ctx.clearRect(0,0,SIZE,SIZE);
    ctx.imageSmoothingEnabled = false;

    const drawScaled = (imgOrCanvas) => {
      ctx.drawImage(imgOrCanvas, 0, 0, PX, PX, 0, 0, SIZE, SIZE);
    };

    // base
    const base = await loadImage(`/assets/base/base_skin-${String(skin).padStart(2,"0")}.png`);
    drawScaled(base);

    // hair (recolor white only)
    const hair = await loadImage(`/assets/hair/${hairStyle}.png`);
    const tintedHair = recolorWhiteOnly(hair, hairColor, 220);  // raise/lower 220 as needed
    drawScaled(tintedHair);

    // eyes
    const eyes = await loadImage(`/assets/eyes/${eye}.png`);
    drawScaled(eyes);
  }

  return (
    <canvas
      ref={canvasRef}
      className="image-pixel"
      style={{ width: small?128:192, height: small?128:192, border:"1px solid #ddd", borderRadius:6, imageRendering: "pixelated" }}
    />
  );
}
