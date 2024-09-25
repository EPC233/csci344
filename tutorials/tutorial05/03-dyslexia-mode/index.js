/* 
  See Smashing Magazine Tutorial:
  https://www.smashingmagazine.com/2021/11/dyslexia-friendly-mode-website/
*/

const dyslexiaToggleButton = document.getElementById('dyslexia-toggle');

const dyslexiaMode = localStorage.getItem('dyslexia-mode') === 'true';

if (dyslexiaMode) {
    document.body.classList.add('dyslexia-mode');
}

const toggleDyslexiaMode = () => {
    document.body.classList.toggle('dyslexia-mode');
    const isEnabled = document.body.classList.contains('dyslexia-mode');
    localStorage.setItem('dyslexia-mode', isEnabled);
};

dyslexiaToggleButton.addEventListener('click', toggleDyslexiaMode);