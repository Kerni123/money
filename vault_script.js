const passwordInput = document.getElementById('password-input');
const submitBtn = document.getElementById('submit-btn');
const errorMsg = document.getElementById('error-msg');

const SECRET = "#MONEY"; 
const REDIRECT_URL = "geheim.html"; 

function validate() {
    const inputCode = passwordInput.value.trim().toUpperCase();
    
    if (inputCode === SECRET) {
        submitBtn.innerHTML = "Granted";
        submitBtn.style.background = "#00ff41";
        errorMsg.style.display = 'none'; // Falls Fehler da war, jetzt weg
        
        setTimeout(() => {
            window.location.href = REDIRECT_URL;
        }, 600);
    } else {
        // Fehler anzeigen
        errorMsg.style.display = 'block';
        passwordInput.value = "";
        
        // --- NEU: Nach 2 Sekunden verschwindet die Fehlermeldung automatisch ---
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 2000);

        // Shake-Effekt
        const group = document.querySelector('.input-group');
        group.animate([
            { transform: 'translateX(0px)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0px)' }
        ], { duration: 300 });
    }
}



const box = document.querySelector('.vault-box');

box.addEventListener('mousemove', (e) => {
    // Abmessungen der Box holen
    const boxRect = box.getBoundingClientRect();
    
    // Mausposition innerhalb der Box (0 bis Breite/Höhe)
    const x = e.clientX - boxRect.left;
    const y = e.clientY - boxRect.top;
    
    // Mittelpunkt der Box berechnen
    const centerX = boxRect.width / 2;
    const centerY = boxRect.height / 2;
    
    // Berechnung der Rotation (je weiter weg von der Mitte, desto stärker)
    // Die Zahl 10 steuert die Intensität (kleiner = stärkerer Tilt)
    const rotateX = (centerY - y) / 10; 
    const rotateY = (x - centerX) / 10;
    
    // Transformation anwenden
    // WICHTIG: translate(-50%, -50%) muss bleiben, damit die Box zentriert bleibt!
    box.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
});

// Wenn die Maus die Box verlässt: Sanft zurücksetzen
box.addEventListener('mouseleave', () => {
    box.style.transform = `translate(-50%, -50%) rotateX(0deg) rotateY(0deg) scale(1)`;
});