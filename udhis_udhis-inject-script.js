// Extracted from script id="udhis-inject-script"
(function(){
  // Safety & feature-detect
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Add preload class immediately to prevent FOUC
  document.documentElement.classList.add('udhis-scene-preload');

  // Passive event listener helper (improves scroll/gesture smoothness on iOS)
  
// Passive event listener helper — NO prototype override to avoid conflicts with third-party libs.
// Provide a small, explicit helper to add passive touch listeners where desired.
(function(){
  function udhisAddListener(target, type, fn, opts) {
    try {
      // Normalize target
      const t = target || window;
      // If touchstart/touchmove and no options provided (or boolean), force passive:true to improve scrolling performance.
      if ((type === 'touchstart' || type === 'touchmove') && (opts === undefined || typeof opts === 'boolean')) {
        t.addEventListener(type, fn, { passive: true, capture: false });
        return;
      }
      t.addEventListener(type, fn, opts);
    } catch (e) {
      // fallback to basic addEventListener call
      try { target.addEventListener(type, fn, opts); } catch (err) { /* ignore */ }
    }
  }
  // Expose helper in UDHIS namespace to be used by other scripts without mutating globals.
  window.__udhis_addListener = udhisAddListener;
})();


  // Utility: requestAnimationFrame wrapper to avoid layout thrash
  function rafBatch(fn){
    if (window.requestAnimationFrame) return window.requestAnimationFrame(fn);
    setTimeout(fn, 16);
  }

  // Scene enter: wait for essential resources, then reveal with nice motion
  function revealScene(){
    rafBatch(() => {
      document.documentElement.classList.remove('udhis-scene-preload');
      document.documentElement.classList.add('udhis-scene-ready');
      // optional: add subtle epic glow to main content for iPhone look
      const main = document.querySelector('.main-content');
      if (main) main.classList.add('udhis-epic-glow');
      // enable small dynamic-island entrance
      const island = document.getElementById('dynamicIsland');
      if (island) updateDynamicIslandSmooth('🚀 UDHIS siap', 1600);
    });
  }

  // Spring-like easing for Dynamic Island
  function spring(t){
    // simple cubic-ish spring fallback
    return 1 - Math.pow(1 - t, 3);
  }

  // Smooth update for dynamicIsland content with hardware-accelerated transform
  window.updateDynamicIslandSmooth = function(text, duration = 2000){
    const island = document.getElementById('dynamicIsland');
    if (!island) return;
    if (prefersReduced) {
      island.textContent = text;
      island.style.opacity = '1';
      setTimeout(()=> island.style.opacity = '0', duration);
      return;
    }

    // animate with transform and opacity using rAF loop for smoothness
    island.textContent = text;
    island.style.transition = 'none';
    island.style.opacity = '0';
    island.style.transform = 'translateY(-8px) scale(0.98)';
    island.style.display = 'block';

    let start = null;
    const T = Math.max(200, Math.min(800, Math.round(duration * 0.6)));
    function step(ts){
      if (!start) start = ts;
      const elapsed = ts - start;
      const p = Math.min(1, elapsed / T);
      const eased = spring(p);
      island.style.opacity = String(eased);
      const y = (1 - eased) * -8;
      const s = 0.98 + eased * 0.02;
      island.style.transform = `translateY(${y}px) scale(${s})`;
      if (p < 1) requestAnimationFrame(step);
      else {
        // hold, then fade out smoothly
        setTimeout(() => {
          island.style.transition = 'opacity 420ms var(--udhis-ease), transform 420ms var(--udhis-ease)';
          island.style.opacity = '0';
          island.style.transform = 'translateY(-12px) scale(0.98)';
          setTimeout(()=> { island.style.display = 'none'; island.style.transition = ''; }, 450);
        }, Math.max(800, duration));
      }
    }
    requestAnimationFrame(step);
  };

  // Improve touch and click responsiveness for mobile (fast tap)
  function enableFastTap(){
    // add touch-action where missing (prevents 300ms-ish delays)
    document.body.style.touchAction = document.body.style.touchAction || 'manipulation';
    // set meta theme-color quicker paint if available (no-op safe)
  }

  // Defer non-critical work slightly to speed up first paint
  function deferNonCritical(){
    setTimeout(()=> {
      // add will-change to interactive elements
      document.querySelectorAll('.enhanced-btn, .enhanced-card, .tab').forEach(el => {
        el.style.willChange = 'transform, opacity';
      });
    }, 700);
  }

  // Execute when DOM ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    enableFastTap();
    deferNonCritical();
    revealScene();
  } else {
    document.addEventListener('DOMContentLoaded', function(){
      enableFastTap();
      deferNonCritical();
      revealScene();
    }, { once: true });
  }

  // Expose a debug toggle (optional)
  window.__udhis_inject = { revealScene, enableFastTap };

})();
