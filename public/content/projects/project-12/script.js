window.addEventListener('keydown', function (e) {
    // 1. Audio element dhoondo jiska data-key match kare
    // e.keyCode purana hai, par aksar use hota hai. e.key bhi use kar sakte hain.
    // Yahan hum keyCode use kar rahe hain compatibility ke liye.
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if (!audio) return; // Agar koi aur key dabayi to ruk jao

    // 2. Audio rewind karo (taaki jaldi jaldi baja sakein)
    audio.currentTime = 0;

    // 3. Play karo
    audio.play();

    // 4. Animation add karo
    key.classList.add('playing');
});

// Animation hatane ke liye
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}
