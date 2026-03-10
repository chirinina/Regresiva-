
        let countdownInterval;
        const panel = document.getElementById('config-panel');
        const audio = document.getElementById('bg-audio');
        const audioBtn = document.getElementById('audio-btn');
        const timerWrapper = document.getElementById('timer-wrapper');
        const timerDisplay = document.getElementById('timer');

        // Temas de colores Pro
        const themes = {
            cyber: { bg: 'radial-gradient(circle at center, #ffffff 0%, #ffffff 100%)', accent: '#fbbf24' },
            ocean: { bg: 'radial-gradient(circle at center, #000c34 0%, #00050a 100%)', accent: '#ffd700' },
            lava: { bg: 'radial-gradient(circle at center, #ff8c00 0%, #000000 100%)', accent: '#ffffff'},            
            emerald: { bg: 'radial-gradient(circle at center, #064e3b 0%, #000000 100%)', accent: '#34d399' },
            luxury: { bg: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)', accent: '#fbbf24' },
            nebula: { bg: 'linear-gradient(135deg, #000000 0%, #000000 60%, #000000 100%)', accent: '#ffd700' }
        };

        function togglePanel() {
            panel.classList.toggle('hidden-panel');
        }

        function setTheme(themeKey) {
            const theme = themes[themeKey];
            document.body.style.background = theme.bg;
            document.getElementById('accent-line').style.backgroundColor = theme.accent;
            document.getElementById('accent-line').style.boxShadow = `0 0 20px ${theme.accent}`;
            document.documentElement.style.setProperty('--accent-color', theme.accent);
        }

        function changeLogo(num) {
            const currentLogo = document.getElementById('current-logo');
            currentLogo.src = num === 1 
                ? "https://moodle.esam.edu.bo/pluginfile.php/1/theme_moove/logo/1773070248/ICONO%20ESAM%20VERTICAL%20%282%29%20%281%29%20%281%29.png" 
                : "https://campus.upi.edu.pa/pluginfile.php/1/theme_moove/logo/1763381071/upi-modificado.jpg";
            
            currentLogo.classList.remove('animate__fadeInDown');
            void currentLogo.offsetWidth;
            currentLogo.classList.add('animate__fadeInDown');
        }

        function startCountdown() {
            clearInterval(countdownInterval);
            let mins = parseInt(document.getElementById('input-minutes').value);
            if (isNaN(mins) || mins <= 0) return;

            let seconds = mins * 60;
            
            // Mostrar el temporizador con animación
            timerWrapper.classList.remove('max-h-0', 'opacity-0');
            timerWrapper.classList.add('max-h-96', 'opacity-100');

            function updateTimer() {
                let m = Math.floor(seconds / 60);
                let s = seconds % 60;
                timerDisplay.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
                
                if (seconds <= 0) {
                    clearInterval(countdownInterval);
                    hideTimer();
                }
                seconds--;
            }

            updateTimer();
            countdownInterval = setInterval(updateTimer, 1000);
            togglePanel();
        }

        function hideTimer() {
            timerWrapper.classList.add('max-h-0', 'opacity-0');
            timerWrapper.classList.remove('max-h-96', 'opacity-100');
            setTimeout(() => { clearInterval(countdownInterval); }, 700);
        }

        function toggleAudio() {
            if (audio.paused) {
                audio.play();
                audioBtn.innerHTML = `<span>⏸</span> Pausar Sonido`;
                audioBtn.classList.replace('text-green-500', 'text-red-500');
                audioBtn.classList.replace('border-green-500', 'border-red-500');
            } else {
                audio.pause();
                audioBtn.innerHTML = `<span>▶</span> Sonido`;
                audioBtn.classList.replace('text-red-500', 'text-green-500');
                audioBtn.classList.replace('border-red-500', 'border-green-500');
            }
        }


        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) * 0.01;
            const y = (e.clientY - window.innerHeight / 2) * 0.01;
            document.querySelector('.z-10').style.transform = `translate(${x}px, ${y}px)`;
        });

        function setTextColor(color) {
    document.getElementById("msg-top").style.color = color;
    document.querySelector(".shiny-text").style.background = `linear-gradient(120deg, transparent 30%, ${color} 50%, transparent 70%)`;
    document.querySelector(".shiny-text").style.backgroundSize = "200% auto";
    document.querySelector(".shiny-text").style.webkitBackgroundClip = "text";
}
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

const shapesContainer = document.getElementById("floating-shapes");

function createShape() {

    const shape = document.createElement("div");

    const types = ["circle","line","triangle"];
    const type = types[Math.floor(Math.random()*types.length)];

    shape.classList.add("shape",type);

    shape.style.left = Math.random()*100+"vw";
    shape.style.animationDuration = 10 + Math.random()*20 +"s";
    shape.style.opacity = Math.random()*0.3;

    shapesContainer.appendChild(shape);

    setTimeout(()=>{shape.remove()},30000);
}
setInterval(createShape,800);

document.getElementById("year").textContent = new Date().getFullYear();

