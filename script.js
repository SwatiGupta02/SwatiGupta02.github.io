/* script.js
   Carousel for gallery-section
   - reads images from assets/carousel-images/image-1.jpg, image-2.jpg, ...
   - desktop: shows 3 slides; mobile (<=900px): shows 1 slide
   - prev/next moves by 1 slide
   - infinite scrolling via cloning slides
*/

(() => {
  const TRACK_ID = 'carouselTrack';
  const IMAGE_PATH = 'assets/carousel-images/';
  const IMAGE_BASENAME = 'image-'; // expects image-1.jpg, image-2.jpg ...
  const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'webp']; // try these in order when probing
  const BREAKPOINT = 900; // <= this is "mobile" showing 1 slide

  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const track = document.getElementById(TRACK_ID);
  const container = document.querySelector('.carousel-container');
  let slides = []; // DOM elements of original slides (not clones)
  let totalSlides = 0;

  // runtime state
  let visibleCount = getVisibleCount();
  let itemFullWidth = 0; // item width + gap
  let cloneCount = visibleCount; // we'll clone visibleCount items on each end
  let currentLogicalIndex = 0; // index in original slides (0..totalSlides-1)
  let isUserInteracting = false;
  let scrollDebounceTimer = null;
  let imgsLoaded = false;

  // Utilities
  function $(sel) { return document.querySelector(sel); }

  function getVisibleCount() {
    return window.innerWidth <= BREAKPOINT ? 1 : 3;
  }

  function detectImageFilePath(baseIndex) {
    // try extensions and return the first existing file path by attempting to fetch HEAD
    // But we can't use network checks synchronously here; instead we will build list trying extensions.
    // We'll simply pick the first extension '.jpg' by default when creating src.
    // The loading will fail for missing files, so we rely on probing existence via Image() load/error.
    return IMAGE_PATH + IMAGE_BASENAME + baseIndex + '.jpg';
  }

  // Create an <img> and return a promise that resolves if it loads, rejects if not
  function testImageSrc(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = () => reject(src);
    });
  }

  // Try to discover images sequentially until a miss (stop at first missing after at least 1 found)
  async function discoverImages() {
    const discovered = [];
    let idx = 1;
    let consecutiveMisses = 0;
    const MAX_CONSECUTIVE_MISSES = 1; // stop after first missing (you can increase if needed)
    // We'll attempt using the set IMAGE_EXTS order (jpg first).
    while (true) {
      let found = false;
      for (const ext of IMAGE_EXTS) {
        // build candidate path
        const candidate = `${IMAGE_PATH}${IMAGE_BASENAME}${idx}.${ext}`;
        try {
          // We check via Image object (this will attempt to download — okay in normal hosting)
          /* eslint no-await-in-loop: "off" */
          await testImageSrc(candidate);
          discovered.push(candidate);
          found = true;
          break;
        } catch (e) {
          // try next ext
        }
      }
      if (!found) {
        consecutiveMisses++;
      } else {
        consecutiveMisses = 0;
      }
      if (!found && discovered.length > 0 && consecutiveMisses >= MAX_CONSECUTIVE_MISSES) {
        break; // stop scanning
      }
      // Stop if we reached a high index limit to avoid infinite loops
      if (idx > 100) break;
      idx++;
      // If no images found at all, keep trying up to a small limit (to allow at least 1 image with non-jpg)
      if (idx > 10 && discovered.length === 0) break;
    }
    return discovered;
  }

  function clearTrack() {
    while (track.firstChild) track.removeChild(track.firstChild);
  }

  function createSlideElement(src, i, isClone = false) {
    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-slide';
    wrapper.setAttribute('data-src', src);
    if (!isClone) wrapper.setAttribute('data-index', i);
    // Create image element
    const img = document.createElement('img');
    img.className = 'carousel-image';
    img.src = src;
    img.alt = `Gallery image ${i + 1}`;

    wrapper.appendChild(img);
    return wrapper;
  }

  function getTrackGap() {
    const style = getComputedStyle(track);
    // modern browsers expose gap; fallback to columnGap or 0
    return parseFloat(style.gap || style.columnGap || 0);
  }

  function measureItemWidth() {
    const first = track.querySelector('.carousel-slide');
    if (!first) return 0;
    const itemRect = first.getBoundingClientRect();
    const gap = getTrackGap();
    return itemRect.width + gap;
  }

  function setInitialScrollForIndex(logicalIndex = 0, smooth = false) {
    // We want to position scrollLeft so that the logicalIndex-th original slide is at the leftmost visible position
    // Note: we have cloneCount clones at start, so offset by cloneCount
    const offsetIndex = cloneCount + logicalIndex;
    const left = Math.round(offsetIndex * itemFullWidth);
    smoothScrollTo(left, smooth ? 'smooth' : 'auto');
  }

  function smoothScrollTo(left, behavior = 'smooth') {
    // clamp
    if (behavior === 'auto') {
      container.scrollLeft = left;
    } else {
      container.scrollTo({ left, behavior });
    }
  }

  function updateCurrentLogicalIndexFromScroll() {
    // Determine the logical index nearest to current scrollLeft
    const scrollLeft = container.scrollLeft;
    // compute index relative to clones
    const rawIndex = Math.round(scrollLeft / itemFullWidth) - cloneCount;
    let idx = rawIndex;
    // normalize into [0..totalSlides-1]
    idx = ((idx % totalSlides) + totalSlides) % totalSlides;
    currentLogicalIndex = idx;
  }

  function handleBoundaryJumpIfNeeded() {
    // Called after a scroll finishes (debounced) to adjust if we're in the cloned zones.
    const scrollLeft = container.scrollLeft;
    const itemsFromStart = Math.round(scrollLeft / itemFullWidth);
    // valid range for the "real" start is cloneCount .. cloneCount + totalSlides - 1
    if (itemsFromStart < cloneCount) {
      // jumped to left clones — move to equivalent real slide
      const equivalent = itemsFromStart + totalSlides;
      const left = Math.round(equivalent * itemFullWidth);
      // instant jump without smooth to avoid visual flicker
      smoothScrollTo(left, 'auto');
    } else if (itemsFromStart >= cloneCount + totalSlides) {
      // jumped to right clones — map back by subtracting totalSlides
      const equivalent = itemsFromStart - totalSlides;
      const left = Math.round(equivalent * itemFullWidth);
      smoothScrollTo(left, 'auto');
    }
    updateCurrentLogicalIndexFromScroll();
  }

  function onPrev() {
    currentLogicalIndex = (currentLogicalIndex - 1 + totalSlides) % totalSlides;
    setInitialScrollForIndex(currentLogicalIndex, true);
  }

  function onNext() {
    currentLogicalIndex = (currentLogicalIndex + 1) % totalSlides;
    setInitialScrollForIndex(currentLogicalIndex, true);
  }

  function onScrollDebounced() {
    if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);
    scrollDebounceTimer = setTimeout(() => {
      handleBoundaryJumpIfNeeded();
    }, 120);
  }

  // When user ends a scroll, adjust currentLogicalIndex to the nearest slide.
  function snapToNearest() {
    // find nearest item index (rounded)
    const scrollLeft = container.scrollLeft;
    const itemsFromStart = Math.round(scrollLeft / itemFullWidth);
    const logical = ((itemsFromStart - cloneCount) % totalSlides + totalSlides) % totalSlides;
    currentLogicalIndex = logical;
    setInitialScrollForIndex(currentLogicalIndex, true);
  }

  // Build DOM: originals, clones before and after
  function buildCarouselFromSources(srcList) {
    clearTrack();
    slides = [];
    totalSlides = srcList.length;
    if (totalSlides === 0) {
      // nothing to show - show placeholder text
      const p = document.createElement('p');
      p.textContent = 'No images found in assets/carousel-images/. Add files named image-1.jpg, image-2.jpg, ...';
      p.style.padding = '24px';
      track.appendChild(p);
      return;
    }

    cloneCount = visibleCount;
    // Create original slides
    srcList.forEach((src, i) => {
      const slide = createSlideElement(src, i, false);
      slides.push(slide);
    });

    // Create left clones (last cloneCount from originals)
    const leftClones = [];
    for (let i = 0; i < cloneCount; i++) {
      const idx = (totalSlides - cloneCount + i) % totalSlides;
      const clone = createSlideElement(srcList[idx], idx, true);
      clone.setAttribute('data-clone', 'left');
      leftClones.push(clone);
    }

    // Create right clones (first cloneCount)
    const rightClones = [];
    for (let i = 0; i < cloneCount; i++) {
      const idx = i % totalSlides;
      const clone = createSlideElement(srcList[idx], idx, true);
      clone.setAttribute('data-clone', 'right');
      rightClones.push(clone);
    }

    // Append in order: left clones, originals, right clones
    leftClones.forEach(n => track.appendChild(n));
    slides.forEach(n => track.appendChild(n));
    rightClones.forEach(n => track.appendChild(n));

    // Force layout measure after images load
    const firstImg = track.querySelector('.carousel-image');
    if (firstImg && !firstImg.complete) {
      // Wait for the first image to load, then measure
      firstImg.addEventListener('load', () => {
        // small timeout so layout stabilizes
        setTimeout(() => {
          itemFullWidth = measureItemWidth();
          // initial position: show the first logical slide
          currentLogicalIndex = 0;
          setInitialScrollForIndex(currentLogicalIndex, false);
        }, 20);
      });
    } else {
      // images already loaded or no images
      setTimeout(() => {
        itemFullWidth = measureItemWidth();
        currentLogicalIndex = 0;
        setInitialScrollForIndex(currentLogicalIndex, false);
      }, 20);
    }
  }

  // Wire up events and initialization
  async function init() {
    // Discover images
    let srcList = [];
    try {
      srcList = await discoverImages();
    } catch (e) {
      console.warn('Error discovering images', e);
    }
    if (srcList.length === 0) {
      // Fallback: try a few fixed default filenames with jpg only
      for (let i = 1; i <= 6; i++) {
        srcList.push(`${IMAGE_PATH}${IMAGE_BASENAME}${i}.jpg`);
      }
    }

    visibleCount = getVisibleCount();
    buildCarouselFromSources(srcList);

    // Recompute item width after a short delay (images may take a moment to load)
    setTimeout(() => {
      itemFullWidth = measureItemWidth();
      // Set scroll to logical index (initial)
      setInitialScrollForIndex(currentLogicalIndex, false);
    }, 100);

    // Buttons (placeholder only - no functionality)
    if (prevBtn) prevBtn.style.cursor = 'default';
    if (nextBtn) nextBtn.style.cursor = 'default';

    // Scroll behavior: monitor scroll to handle boundary jumps (infinite effect)
    let isPointerDown = false;
    container.addEventListener('pointerdown', () => { isPointerDown = true; });
    container.addEventListener('pointerup', () => {
      if (isPointerDown) {
        isPointerDown = false;
        // snap to nearest slide after user stops dragging
        setTimeout(snapToNearest, 120);
      }
    });

    // wheel/touch scroll: use debounced handler
    container.addEventListener('scroll', () => {
      onScrollDebounced();
    }, { passive: true });

    // Keyboard support
    window.addEventListener('keydown', (ev) => {
      if (ev.key === 'ArrowLeft') onPrev();
      if (ev.key === 'ArrowRight') onNext();
    });

    // handle window resize — rebuild if breakpoint crosses
    let lastVisible = visibleCount;
    window.addEventListener('resize', () => {
      const nowVisible = getVisibleCount();
      if (nowVisible !== lastVisible) {
        // rebuild carousel to use new visibleCount & clone sizes
        lastVisible = nowVisible;
        visibleCount = nowVisible;
        // Save the current logical index if possible
        const savedIndex = currentLogicalIndex;
        // Re-discover images and rebuild
        (async () => {
          const srcs = await discoverImages();
          buildCarouselFromSources(srcs.length ? srcs : srcList);
          // restore logical index and scroll to it
          currentLogicalIndex = savedIndex % totalSlides;
          itemFullWidth = measureItemWidth();
          setInitialScrollForIndex(currentLogicalIndex, false);
        })();
      } else {
        // non-breakpoint resize just needs measurement update
        setTimeout(() => {
          itemFullWidth = measureItemWidth();
          setInitialScrollForIndex(currentLogicalIndex, false);
        }, 120);
      }
    });
  }

  // Start
  document.addEventListener('DOMContentLoaded', init);
})();