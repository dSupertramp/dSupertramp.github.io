document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = mobileMenu?.querySelector('label');
    const menuList = mobileMenu?.querySelector('ul');

    function closeMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('dropdown-open');
        if (menuList) menuList.classList.remove('dropdown-open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', (event) => {
            const isOpen = mobileMenu.classList.contains('dropdown-open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                mobileMenu.classList.add('dropdown-open');
                if (menuList) menuList.classList.add('dropdown-open');
                if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
            }
            event.stopPropagation();
        });
    }

    document.addEventListener('click', (event) => {
        if (!mobileMenu) return;
        if (!mobileMenu.contains(event.target)) {
            closeMobileMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });

    document.querySelectorAll('.scramble').forEach((element) => {
        const text = element.dataset.text || '';
        const chars = '!<>-_\\/[]{}—=+*^?#________';

        const scramble = (() => {
            let frame = 0;
            let queue = [];
            let resolvePromise;
            let requestId;

            function randomChar() {
                return chars[Math.floor(Math.random() * chars.length)];
            }

            function update() {
                let output = '';
                let complete = 0;

                for (let i = 0, n = queue.length; i < n; i++) {
                    let { from, to, start, end, char } = queue[i];
                    if (frame >= end) {
                        complete++;
                        output += to;
                    } else if (frame >= start) {
                        if (!char || Math.random() < 0.14) {
                            char = randomChar();
                            queue[i].char = char;
                        }
                        output += `<span class="dud">${char}</span>`;
                    } else {
                        output += from;
                    }
                }

                element.innerHTML = output;

                if (complete === queue.length) {
                    if (resolvePromise) resolvePromise();
                    return;
                }

                frame++;
                requestId = requestAnimationFrame(update);
            }

            function setText(newText) {
                const oldText = element.innerText;
                const length = Math.max(oldText.length, newText.length);
                const promise = new Promise((resolve) => {
                    resolvePromise = resolve;
                });
                queue = [];

                for (let i = 0; i < length; i++) {
                    const from = oldText[i] || '';
                    const to = newText[i] || '';
                    const start = Math.floor(Math.random() * 80);
                    const end = start + Math.floor(Math.random() * 80);
                    queue.push({ from, to, start, end });
                }

                cancelAnimationFrame(requestId);
                frame = 0;
                update();
                return promise;
            }

            return { setText };
        })();

        function repeatScramble() {
            scramble.setText(text).then(() => {
                setTimeout(repeatScramble, 10000);
            });
        }

        repeatScramble();
    });
});
