// lib/navTransition.js
export function goWithSlide(router, path, dir = "right", setAnimating) {
    // Tell the next page which way to slide in
    try { sessionStorage.setItem("navEnterDir", dir); } catch {}
    // Animate this page out, then route
    if (setAnimating) {
      setAnimating(dir === "right" ? "out-left" : "out-right");
      // let the CSS animation finish
      setTimeout(() => router.push(path), 380);
    } else {
      router.push(path);
    }
  }
  
  // Read on mount to decide the incoming slide direction
  export function useSlideInOnMount(setEnter) {
    try {
      const dir = sessionStorage.getItem("navEnterDir");
      if (dir) setEnter(dir === "right" ? "in-right" : "in-left");
      sessionStorage.removeItem("navEnterDir");
    } catch {}
  }
  