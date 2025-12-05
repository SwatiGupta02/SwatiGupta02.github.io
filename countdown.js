function updateCountdown() {
    const weddingDate = new Date("2026-04-05T00:00:00");
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // Update display
    const hundredsCard = document.getElementById('days-hundreds-card');
    
    // Show/hide hundreds card based on days
    if (days >= 100) {
        hundredsCard.style.display = 'flex';
        document.getElementById('days-hundreds').textContent = String(Math.floor(days / 100));
    } else {
        hundredsCard.style.display = 'none';
    }
    
    document.getElementById('days-tens').textContent = String(Math.floor((days % 100) / 10));
    document.getElementById('days-ones').textContent = String(days % 10);
    document.getElementById('hours-tens').textContent = String(Math.floor(hours / 10));
    document.getElementById('hours-ones').textContent = String(hours % 10);
    document.getElementById('minutes-tens').textContent = String(Math.floor(minutes / 10));
    document.getElementById('minutes-ones').textContent = String(minutes % 10);
    document.getElementById('seconds-tens').textContent = String(Math.floor(seconds / 10));
    document.getElementById('seconds-ones').textContent = String(seconds % 10);
}

// Start the countdown
updateCountdown();
setInterval(updateCountdown, 1000);
