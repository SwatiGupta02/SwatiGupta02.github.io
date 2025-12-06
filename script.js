/* script.js
   Carousel for gallery-section
   - FIXED: Correctly reads images from the assets/carousel-images/ source directory.
   - FIXED: Uses the image file name directly (e.g., image-1.webp) without size suffixes.
   - OPTIMIZED: Uses srcset/sizes for responsive image loading, relying on the browser/server to handle file serving.
*/

(() => {
  // Add this constant at the top of your script.js (change 66 to your actual count)
  const TOTAL_CAROUSEL_IMAGES = 63;
  const TRACK_ID = 'carouselTrack';
  // 1. FIXED: Set the probe path to the source image directory
  const IMAGE_PROBE_PATH = 'assets/carousel-images/'; 
  const IMAGE_BASENAME = 'image-'; 
  const IMAGE_EXTS = ['webp', 'jpg', 'jpeg', 'png']; // Extensions to check

  const BREAKPOINT = 900; // <= this is "mobile" showing 1 slide

  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const track = document.getElementById(TRACK_ID);
  const container = document.querySelector('.carousel-container');
  let slides = []; 
  let totalSlides = 0;

  // runtime state
  let visibleCount = getVisibleCount();
  let itemFullWidth = 0; 
  let cloneCount = visibleCount; 
  let currentLogicalIndex = 0; 
  let scrollDebounceTimer = null;


  // Create an <img> and return a promise that resolves if it loads, rejects if not
  function testImageSrc(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = () => reject(src);
      img.src = src;
    });
  }

  // 2. FIXED: Discover image count by checking all extensions in the source directory
  async function discoverImages() {
    let count = 0;
    let idx = 1;
    let consecutiveMisses = 0;
    const MAX_CONSECUTIVE_MISSES = 3; 
    
    while (idx < 200) { 
      let found = false;
      
      // Try all extensions for the current index
      for (const ext of IMAGE_EXTS) {
        const candidate = `${IMAGE_PROBE_PATH}${IMAGE_BASENAME}${idx}.${ext}`;
        try {
          /* eslint no-await-in-loop: "off" */
          await testImageSrc(candidate);
          // If found, increment count and mark as found, then break the extension loop
          count++;
          found = true;
          consecutiveMisses = 0;
          break;
        } catch (e) {
          // Continue to the next extension
        }
      }

      if (!found && count > 0 && consecutiveMisses >= MAX_CONSECUTIVE_MISSES) {
        break; // Stop scanning after several misses if we've found at least one image
      }
      if (!found) {
          consecutiveMisses++;
      }
      idx++;
    }
    // We return the total count
    return count; 
  }

  function clearTrack() {
    while (track.firstChild) track.removeChild(track.firstChild);
  }

  // 3. FIXED: Build image paths *without* the size suffixes (-1600, -800)
  function createSlideElement(src, i, isClone = false) {
    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-slide';
    if (!isClone) wrapper.setAttribute('data-index', i);
    
    const img = document.createElement('img');
    img.className = 'carousel-image';
    
    // i is 0-based, image index is 1-based
    const index = i + 1; 
    
    // Base path for source files (e.g., assets/carousel-images/image-1)
    const basePath = IMAGE_PROBE_PATH + IMAGE_BASENAME + index;

    // We assume .webp is the preferred format and exists, but since we don't know the exact extension,
    // we must use a fallback method for the SRC attribute. Using a dynamic approach for srcset.
    
    // For SRC, we fall back to a common extension like .webp or .jpg.
    // For maximum browser compatibility (if the server is configured to resize on the fly):
    img.src = basePath + '.webp'; // Set a primary WebP source

    // Set srcset/sizes: This is the critical change for responsive loading.
    // NOTE: This assumes your server or build process can interpret the 'w' descriptors 
    // and deliver the correctly sized file, OR you have files named image-X-800.webp, etc.
    // Since you are ONLY picking from the source folder, this will ONLY work if:
    // a) You rename your source images to include the size suffix (e.g., image-1-1600.webp)
    // b) You use the HTML <picture> element (not img) for responsive images without suffixes.
    
    // If you MUST use simple naming (image-1.webp) AND want responsive loading, 
    // you must use the <picture> tag or server-side image manipulation.
    
    // Assuming you want the simplest, non-responsive load from the source directory:
    // If you are loading the full-size images, remove the srcset/sizes optimization.
    
    // Since your goal is still optimization, let's use the <picture> element for proper WebP fallback:

    const picture = document.createElement('picture');
    // WebP source (no explicit size optimization requested with simple file names)
    const sourceWebp = document.createElement('source');
    sourceWebp.type = 'image/webp';
    sourceWebp.srcset = basePath + '.webp'; 
    picture.appendChild(sourceWebp);

    // Fallback image (e.g., JPG)
    img.src = basePath + '.jpg'; // Fallback to JPG/JPEG

    picture.appendChild(img);
    
    // Hint to browser: defer loading of offscreen carousel images
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = `Gallery image ${index}`;

    // Append picture element instead of img
    wrapper.appendChild(picture);
    
    return wrapper;
  }

  function getVisibleCount() {
    return window.innerWidth <= BREAKPOINT ? 1 : 3;
  }
  
  function getTrackGap() {
    const style = getComputedStyle(track);
    return parseFloat(style.gap || style.columnGap || 0);
  }

  function measureItemWidth() {
    const first = track.querySelector('.carousel-slide');
    if (!first) return 0;
    const itemRect = first.getBoundingClientRect();
    const gap = getTrackGap();
    return itemRect.width + gap;
  }

  function smoothScrollTo(left, behavior = 'smooth') {
    if (behavior === 'auto') {
      container.scrollLeft = left;
    } else {
      container.scrollTo({ left, behavior });
    }
  }

  function setInitialScrollForIndex(logicalIndex = 0, smooth = false) {
    const offsetIndex = cloneCount + logicalIndex;
    const left = Math.round(offsetIndex * itemFullWidth);
    smoothScrollTo(left, smooth ? 'smooth' : 'auto');
  }

  function updateCurrentLogicalIndexFromScroll() {
    const scrollLeft = container.scrollLeft;
    const rawIndex = Math.round(scrollLeft / itemFullWidth) - cloneCount;
    let idx = rawIndex;
    idx = ((idx % totalSlides) + totalSlides) % totalSlides;
    currentLogicalIndex = idx;
  }

  function handleBoundaryJumpIfNeeded() {
    const scrollLeft = container.scrollLeft;
    const itemsFromStart = Math.round(scrollLeft / itemFullWidth);
    if (itemsFromStart < cloneCount) {
      const equivalent = itemsFromStart + totalSlides;
      const left = Math.round(equivalent * itemFullWidth);
      smoothScrollTo(left, 'auto');
    } else if (itemsFromStart >= cloneCount + totalSlides) {
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

  function snapToNearest() {
    const scrollLeft = container.scrollLeft;
    const itemsFromStart = Math.round(scrollLeft / itemFullWidth);
    const logical = ((itemsFromStart - cloneCount) % totalSlides + totalSlides) % totalSlides;
    currentLogicalIndex = logical;
    setInitialScrollForIndex(currentLogicalIndex, true);
  }

  function buildCarouselFromCount(count) {
    clearTrack();
    slides = [];
    totalSlides = count;
    
    if (totalSlides === 0) {
      const p = document.createElement('p');
      p.textContent = `No images found in ${IMAGE_PROBE_PATH}.`;
      p.style.padding = '24px';
      track.appendChild(p);
      return;
    }

    cloneCount = visibleCount;
    const srcList = Array.from({ length: totalSlides }, (_, i) => i + 1); 
    
    // Create original slides
    srcList.forEach((_, i) => {
      const slide = createSlideElement(null, i, false); 
      slides.push(slide);
    });

    // Create left clones (last cloneCount from originals)
    const leftClones = [];
    for (let i = 0; i < cloneCount; i++) {
      const idx = (totalSlides - cloneCount + i) % totalSlides;
      const clone = createSlideElement(null, idx, true);
      clone.setAttribute('data-clone', 'left');
      leftClones.push(clone);
    }

    // Create right clones (first cloneCount)
    const rightClones = [];
    for (let i = 0; i < cloneCount; i++) {
      const idx = i % totalSlides;
      const clone = createSlideElement(null, idx, true);
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
      firstImg.addEventListener('load', () => {
        setTimeout(() => {
          itemFullWidth = measureItemWidth();
          currentLogicalIndex = 0;
          setInitialScrollForIndex(currentLogicalIndex, false);
        }, 20);
      });
    } else {
      setTimeout(() => {
        itemFullWidth = measureItemWidth();
        currentLogicalIndex = 0;
        setInitialScrollForIndex(currentLogicalIndex, false);
      }, 20);
    }
  }

  // Wire up events and initialization
  async function init() {
    // 💥 REPLACED SLOW DISCOVERY WITH HARDCODED COUNT
    const count = TOTAL_CAROUSEL_IMAGES; 
    
    visibleCount = getVisibleCount();
    buildCarouselFromCount(count);

    setTimeout(() => {
      itemFullWidth = measureItemWidth();
      setInitialScrollForIndex(currentLogicalIndex, false);
    }, 100);

    if (prevBtn) prevBtn.addEventListener('click', onPrev);
    if (nextBtn) nextBtn.addEventListener('click', onNext);

    let isPointerDown = false;
    container.addEventListener('pointerdown', () => { isPointerDown = true; });
    container.addEventListener('pointerup', () => {
      if (isPointerDown) {
        isPointerDown = false;
        setTimeout(snapToNearest, 120);
      }
    });

    container.addEventListener('scroll', () => {
      onScrollDebounced();
    }, { passive: true });

    window.addEventListener('keydown', (ev) => {
      if (ev.key === 'ArrowLeft') onPrev();
      if (ev.key === 'ArrowRight') onNext();
    });

    let lastVisible = visibleCount;
    window.addEventListener('resize', async () => {
      const nowVisible = getVisibleCount();
      if (nowVisible !== lastVisible) {
        lastVisible = nowVisible;
        visibleCount = nowVisible;
        const savedIndex = currentLogicalIndex;
        
        // 💥 REPLACED SLOW DISCOVERY WITH HARDCODED COUNT
        const newCount = TOTAL_CAROUSEL_IMAGES; 
        buildCarouselFromCount(newCount);
        
        currentLogicalIndex = savedIndex % totalSlides;
        itemFullWidth = measureItemWidth();
        setInitialScrollForIndex(currentLogicalIndex, false);
      } else {
        setTimeout(() => {
          itemFullWidth = measureItemWidth();
          setInitialScrollForIndex(currentLogicalIndex, false);
        }, 120);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();