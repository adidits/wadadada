const pages = [
    { title: 'Hello Baby!!!!', decoration: '💚', content: `Hi Baby!\n\nThank you for opening this letter. This is a special message crafted just for you.\n\nThis is just a message I want to give you as a late valentines gift.` },
    { title: '', decoration: '💚', content: `I didn't expect my february to be this special. You made my month so much more meaningful and joyful.` },
    { title: ' ', decoration: '💚', content: `May our path be filled with joy and growth. Thank you for being part of this incredible journey. To more adventures together, more love and more crying to come\n\nWith warm regards,\n I love you,\nYour baby, Trisan.💜🪻` }
];

let currentPage = 0;
let isOpening = false;

const envelope = document.getElementById('envelope-wrapper');
const overlay = document.getElementById('letter-overlay');
const wrapper = document.getElementById('letter-wrapper');
const container = document.getElementById('page-container');
const dots = document.getElementById('dots-container');

envelope.addEventListener('click', () => {
    if (isOpening) return;
    isOpening = true;
    envelope.classList.add('is-opening');

    setTimeout(() => {
        envelope.style.opacity = '0';
        envelope.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            envelope.classList.add('hidden');
            overlay.classList.remove('hidden');
            setTimeout(() => wrapper.classList.add('visible'), 50);
            renderPage();
        }, 500);
    }, 1000);
});

function renderPage() {
    container.innerHTML = '';
    pages.forEach((data, i) => {
        const div = document.createElement('div');
        div.className = `page ${i === currentPage ? 'page-center' : (i < currentPage ? 'page-left' : 'page-right')}`;
        // add extra top margin specifically to the second page
        if (i === 1) {
            div.classList.add('page-second');
        }
        div.innerHTML = `
            <div style="text-align:center">
                <span style="font-size:3rem">${data.decoration}</span>
                <h2 style="color:#15803d; margin:20px 0; font-size: 1.5rem;">${data.title}</h2>
                <p style="line-height:1.8; color:#333; font-size: 1.2rem; white-space:pre-line">${data.content}</p>
            </div>`;
        container.appendChild(div);
    });

    dots.innerHTML = pages.map((_, i) => `<div class="dot ${i === currentPage ? 'active' : ''}"></div>`).join('');
    document.getElementById('prev-btn').disabled = currentPage === 0;
    document.getElementById('next-btn').disabled = currentPage === pages.length - 1;
    document.getElementById('page-counter').innerText = `Page ${currentPage + 1} of ${pages.length}`;
}

document.getElementById('next-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentPage < pages.length - 1) { currentPage++; renderPage(); }
});

document.getElementById('prev-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentPage > 0) { currentPage--; renderPage(); }
});

document.getElementById('close-btn').addEventListener('click', () => {
    wrapper.classList.remove('visible');
    setTimeout(() => {
        overlay.classList.add('hidden');
        envelope.classList.remove('hidden', 'is-opening');
        envelope.style.opacity = '1';
        envelope.style.transform = 'translateY(0)';
        isOpening = false;
        currentPage = 0;
    }, 600);

});
