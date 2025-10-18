// components/AvatarComposer.jsx
"use client";

import React, { useEffect, useRef } from "react";

/**
 * Optimized pixel avatar renderer:
 * - Caches images in a module-level Map so they load once.
 * - Loads layers concurrently; draws only when all are ready (no flicker).
 * - Memoized with a custom props comparator.
 */

const PX = 32;
const SCALE = 6;
const SIZE = PX * SCALE;

// --- image cache ---
const imageCache = new Map(); // src -> Promise<HTMLImageElement>

function loadImage(src) {
  if (!src) return Promise.resolve(null);
  if (imageCache.has(src)) return imageCache.get(src);
  const p = new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
  imageCache.set(src, p);
  return p;
}

const hexToRGB = (hex) => {
  const h = (hex || "#ffffff").replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};

// Recolor near-white pixels only (preserves outlines)
function recolorWhiteOnly(srcImg, colorHex, threshold = 220) {
  if (!srcImg) return null;
  const { r: tr, g: tg, b: tb } = hexToRGB(colorHex);
  const oc = document.createElement("canvas");
  oc.width = PX;
  oc.height = PX;
  const octx = oc.getContext("2d");
  octx.imageSmoothingEnabled = false;

  octx.drawImage(srcImg, 0, 0);
  const img = octx.getImageData(0, 0, PX, PX);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2], a = d[i + 3];
    if (a > 0 && r >= threshold && g >= threshold && b >= threshold) {
      d[i] = tr; d[i + 1] = tg; d[i + 2] = tb;
    }
  }
  octx.putImageData(img, 0, 0);
  return oc;
}

function AvatarComposerInner({ avatar, small = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // read saved avatar if prop is missing
    let info = avatar;
    if (!info) {
      try {
        info = JSON.parse(localStorage.getItem("avatar") || "{}");
      } catch {}
    }
    render(info);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar?.skin, avatar?.hairStyle, avatar?.hairColor, avatar?.eye, small]);

  async function render(info) {
    const c = canvasRef.current;
    if (!c) return;

    const { skin = 1, hairStyle = "hair_1", hairColor = "#000000", eye = "eyes_1" } = info || {};

    // Compose URLs
    const skinSrc = `/assets/base/base_skin-${String(skin).padStart(2, "0")}.png`;
    const hairSrc = `/assets/hair/${hairStyle}.png`;
    const eyeSrc  = `/assets/eyes/${eye}.png`;

    try {
      // Load all layers concurrently from cache
      const [baseImg, hairImg, eyeImg] = await Promise.all([
        loadImage(skinSrc),
        loadImage(hairSrc),
        loadImage(eyeSrc),
      ]);

      // Prepare canvas AFTER all images are ready (prevents blank flashes)
      const ctx = c.getContext("2d");
      c.width = SIZE;
      c.height = SIZE;
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.imageSmoothingEnabled = false;

      const drawScaled = (imgOrCanvas) => {
        if (!imgOrCanvas) return;
        ctx.drawImage(imgOrCanvas, 0, 0, PX, PX, 0, 0, SIZE, SIZE);
      };

      drawScaled(baseImg);
      const tintedHair = recolorWhiteOnly(hairImg, hairColor, 220);
      drawScaled(tintedHair || hairImg);
      drawScaled(eyeImg);
    } catch {
      // fail silently to avoid breaking the page
    }
  }

  return (
    <canvas
      ref={canvasRef}
      className="image-pixel"
      style={{
        width: small ? 128 : 192,
        height: small ? 128 : 192,
        //border: "1px solid #ddd",
        borderRadius: 6,
        imageRendering: "pixelated",
        background: "transparent",
        display: "block",
      }}
    />
  );
}

// Only re-render if relevant avatar fields or `small` change
const same = (a = {}, b = {}) =>
  (a.avatar?.skin === b.avatar?.skin) &&
  (a.avatar?.hairStyle === b.avatar?.hairStyle) &&
  (a.avatar?.hairColor === b.avatar?.hairColor) &&
  (a.avatar?.eye === b.avatar?.eye) &&
  (a.small === b.small);

export default React.memo(AvatarComposerInner, same);
