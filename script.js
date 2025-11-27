// === UPDATE THIS ARRAY with ALL your image file names ===
// (Ensure this list is accurate for all files in assets/carousel-images/)
const imageFileNames = [
    'image-1.jpg',
    'image-2.jpg',
    'image-3.jpg',
    'image-4.jpg',
    'image-5.jpg',
    'image-6.jpg',
    // ... ADD ALL YOUR FILENAMES HERE ...
];
// ========================================================

const track = document.getElementById('carouselTrack');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

// IMAGES_TO_SHOW: The number of images VISIBLE in the carousel window. Set to 3.
const IMAGES_TO_SHOW = 3; 
// SCROLL_STEP: The number of images to move per button click. Set to 1, as requested.
const SCROLL_STEP = 1;

// Base path for local image files, as requested
const BASE_PATH = 'assets/carousel-images/'; 
const TOTAL_IMAGES = imageFileNames.length;

// PADDING_COUNT: MUST be >= IMAGES_TO_SHOW (3) for a seamless loop when showing 3 images.
const PADDING_COUNT = IMAGES_TO_SHOW; // FIXED: Changed from 2 to 3

// `currentImageIndex`: The index in the full generated track (Clones + Originals + Clones)
// Starts at PADDING_COUNT (the first actual image, index 3).
let currentImageIndex = PADDING_COUNT; 
let itemWidth = 0; 
let isMoving = false; // Flag to prevent rapid clicks

// --- 1. Dynamic Image Generation ---

function generateCarouselImages() {
    let htmlContent = '';
    
    // 1. Add padding images (from the end of the list: last PADDING_COUNT images)
    for (let i = 0; i < PADDING_COUNT; i++) {
        const fileName = imageFileNames[(TOTAL_IMAGES - PADDING_COUNT + i) % TOTAL_IMAGES];
        htmlContent += createImageTag(fileName, `padding-start-${i}`);
    }

    // 2. Add the actual content images
    imageFileNames.forEach((fileName, index) => {
        htmlContent += createImageTag(fileName, `content-${index}`);
    });

    // 3. Add padding images (from the start of the list: first PADDING_COUNT images)
    for (let i = 0; i < PADDING_COUNT; i++) {
        const fileName = imageFileNames[i];
        htmlContent += createImageTag(fileName, `padding-end-${i}`);
    }

    track.innerHTML = htmlContent;
    
    // Use the load event to ensure all images have rendered with their final dimensions
    window.addEventListener('load', initializeCarousel);
}

function createImageTag(fileName, dataIndex) {
    return `
        <img 
            src="${BASE_PATH}${fileName}" 
            alt="Carousel photo ${dataIndex}" 
            class="carousel-image"
            data-index="${dataIndex}"
        >`;
}

function calculateItemWidth() {
    const firstImage = track.querySelector('.carousel-image');
    if (!firstImage) return 0;

    const gap = 30; // Based on common styling practices (adjust if CSS changes)
    
    // Get the final rendered width from the DOM and add the gap
    return firstImage.offsetWidth + gap; 
}

function initializeCarousel() {
    itemWidth = calculateItemWidth();
    
    if (itemWidth === 0) {
         console.warn("Carousel image width is zero. Retrying calculation in 200ms...");
         setTimeout(initializeCarousel, 200);
         return;
    }

    // Set initial position: Jump to the start of the first CONTENT block (index = PADDING_COUNT)
    track.style.transition = 'none';
    track.style.transform = `translateX(-${itemWidth * PADDING_COUNT}px)`;
    
    // Re-enable transition after the jump using requestAnimationFrame for stability
    requestAnimationFrame(() => {
        track.style.transition = 'transform 0.5s ease-in-out';
    });
    
    // Attach the event listener for the smooth loop jump *after* initialization
    track.addEventListener('transitionend', handleTransitionEnd);
    console.log(`[INIT] Total Images: ${TOTAL_IMAGES}, Padding: ${PADDING_COUNT}, Start Index: ${currentImageIndex}`);
}

// --- NEW PREEMPTIVE INDEX CHECK ---
function checkAndResetIndex(direction) {
    let jumpOccurred = false;

    if (direction > 0) {
        // Moving Right (Forward)
        // If the current index is the LAST index where the next click (SCROLL_STEP)
        // will land us in the padding zone.
        // Last safe index is: TOTAL_IMAGES + PADDING_COUNT - SCROLL_STEP.
        if (currentImageIndex >= TOTAL_IMAGES + PADDING_COUNT - SCROLL_STEP) {
            // Jump instantly back by subtracting the total number of content images.
            const jumpTarget = currentImageIndex - TOTAL_IMAGES;
            
            console.log(`[JUMP-R] Current Index: ${currentImageIndex}. Jumping back by ${TOTAL_IMAGES} to target: ${jumpTarget}`);
            
            track.style.transition = 'none';
            track.style.transform = `translateX(-${itemWidth * jumpTarget}px)`;
            currentImageIndex = jumpTarget;
            
            // Re-enable transition
            requestAnimationFrame(() => {
                 track.style.transition = 'transform 0.5s ease-in-out';
            });
            jumpOccurred = true; 
        }
    } else {
        // Moving Left (Backward)
        // If the current index is the FIRST index where the next click (SCROLL_STEP)
        // will land us in the padding zone.
        // First safe index is: PADDING_COUNT.
        if (currentImageIndex <= PADDING_COUNT) {
            // Jump instantly forward by adding the total number of content images.
            const jumpTarget = currentImageIndex + TOTAL_IMAGES;
            
            console.log(`[JUMP-L] Current Index: ${currentImageIndex}. Jumping forward by ${TOTAL_IMAGES} to target: ${jumpTarget}`);

            track.style.transition = 'none';
            track.style.transform = `translateX(-${itemWidth * jumpTarget}px)`;
            currentImageIndex = jumpTarget;

            // Re-enable transition
            requestAnimationFrame(() => {
                 track.style.transition = 'transform 0.5s ease-in-out';
            });
            jumpOccurred = true;
        }
    }
    return jumpOccurred; 
}


// --- 2. Carousel Navigation Logic (Transform-based) ---

function moveCarousel(direction) {
    // Prevent moves while transition is running
    if (isMoving) return; 
    isMoving = true;

    if (itemWidth === 0) {
        itemWidth = calculateItemWidth(); 
        if (itemWidth === 0) {
            console.error("Item width is zero, cannot move carousel.");
            isMoving = false;
            return;
        }
    }

    // Preemptive check: Check if the *next* move would require an index reset.
    // The jump occurs here, but the visual scroll happens below.
    checkAndResetIndex(direction);
    
    // Scroll by the step amount
    currentImageIndex += SCROLL_STEP * direction;
    
    console.log(`[MOVE] Direction: ${direction > 0 ? 'Right' : 'Left'}, New Index: ${currentImageIndex}`);

    // Apply the transform (this triggers the smooth transition)
    track.style.transform = `translateX(-${itemWidth * currentImageIndex}px)`;
}

// --- 3. Simplification of TransitionEnd (No Post-Transition Jump) ---
function handleTransitionEnd(event) {
    // Crucial check: only act if the transform property finished its transition
    if (event.propertyName !== 'transform') return;

    // If the transition was set to none (meaning a jump just occurred), ignore it.
    if (track.style.transition === 'none') return;
    
    // Transition is complete, reset the moving flag.
    isMoving = false;
    console.log(`[END] Transition finished, isMoving reset.`);
}


// Event Listeners
if (nextButton && prevButton) {
    nextButton.addEventListener('click', () => moveCarousel(1)); 
    prevButton.addEventListener('click', () => moveCarousel(-1));
}

// Initialize the carousel content
generateCarouselImages();