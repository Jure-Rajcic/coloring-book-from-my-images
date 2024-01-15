import './index.css';
let active_index = 0;
let listeners: ((e: Event) => void)[] = [];
const opacities: number[] = [];

export default function updateColorBook() {

    let images: NodeListOf<HTMLImageElement> = document.querySelectorAll('.img-container img');
    let hrefs: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.href-container a');

    for (let i = 0; i < hrefs.length; i++) {
        if (i == listeners.length) {
            opacities.push(0);

            images[i].addEventListener('contextmenu', (e) => e.preventDefault());

            function indicatorListener(e: Event) {
                images = document.querySelectorAll('.img-container img');
                hrefs = document.querySelectorAll('.href-container a');

                e.preventDefault();
                hrefs[active_index].classList.remove('active-href');
                images[active_index].classList.remove('active-img');

                active_index = i;
                hrefs[active_index].classList.add('active-href');
                images[active_index].classList.add('active-img');
                setOpacity(opacities[active_index]);

            }
            listeners.push(indicatorListener);
            hrefs[i].addEventListener('click', indicatorListener);
        }
    }
    hrefs[active_index].click();

}

function setOpacity(opacity: number) {
    opacities[active_index] = opacity;
    const icon = document.getElementById('selected-icon')!;
    icon.style.opacity = opacity.toString();
}


const select_button = document.getElementById('select-button') as HTMLButtonElement;
select_button.addEventListener('click', () => {
    const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('.img-container img');
    images[active_index].style.setProperty('--selected', 'true')
    setOpacity(1)
});

const deselect_button = document.getElementById('deselect-button') as HTMLButtonElement;
deselect_button.addEventListener('click', () => {
    const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('.img-container img');
    images[active_index].style.setProperty('--selected', 'false')
    setOpacity(0)
});

function slideLeft() {
    const hrefs: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.href-container a');
    if (active_index == 0) return;
    hrefs[active_index - 1].click();
}

function slideRight() {
    const hrefs: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.href-container a');
    if (active_index == hrefs.length - 1) return;
    hrefs[active_index + 1].click();
}




// KEYBOARD SHORTCUTS
document.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowLeft') slideLeft();
    if (e.key == 'ArrowRight') slideRight();
});





// SWIPE GESTURES
let [x1, y1, x2, y2] = [0, 0, 0, 0];

function handleTouchStart(event: TouchEvent) {
    const touch = event.touches[0];
    [x1, y1, x2, y2] = [touch.clientX, touch.clientY, touch.clientX, touch.clientY];
}

function handleTouchMove(event: TouchEvent) {
    event.preventDefault();
    const touch = event.touches[0];
    [x2, y2] = [touch.clientX, touch.clientY];
}

function handleTouchEnd() {
    const dx = x2 - x1;

    if (Math.abs(dx) < 50) {
        return;
    }

    if (dx > 0) slideLeft();
    else slideRight();

}

const slider = document.getElementById("slider")! as HTMLDivElement;

slider.addEventListener('touchstart', handleTouchStart);
slider.addEventListener('touchmove', handleTouchMove, { passive: false });
slider.addEventListener('touchend', handleTouchEnd);



