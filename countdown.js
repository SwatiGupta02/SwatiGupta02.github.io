function updateCountdown() {
    const weddingDate = new Date("2026-04-05T00:00:00");
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    updateValue("days", days);
    updateValue("hours", hours);
    updateValue("minutes", minutes);
    updateValue("seconds", seconds);
}

function updateValue(id, value) {
    const el = document.getElementById(id);
    const formatted = String(value).padStart(2, "0");

    if (el.innerText !== formatted) {
        el.innerText = formatted;
        el.classList.add("pulse");
        setTimeout(() => el.classList.remove("pulse"), 200);
    }
}

// Add mini animation
const style = document.createElement("style");
style.innerHTML = `
.pulse {
    transform: scale(0.92);
    transition: transform 0.15s ease;
}
`;
document.head.appendChild(style);

updateCountdown();
setInterval(updateCountdown, 1000);
