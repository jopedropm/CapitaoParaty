        // Script para menu mobile
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Script para rolagem suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                mobileMenu.classList.add('hidden'); // Esconde o menu ao clicar em um link
                document.querySelector(this.getAttribute('href')).scrollIntoView({ // Correção aqui: scrollInView para scrollIntoView
                    behavior: 'smooth'
                });
            });
        });

        // Script para os sliders dos roteiros e lanchas
        document.addEventListener('DOMContentLoaded', () => {
            const sliders = document.querySelectorAll('[data-slider]');

            sliders.forEach(slider => {
                const slides = slider.querySelectorAll('.slide');
                const prevBtn = slider.querySelector('.prev-btn');
                const nextBtn = slider.querySelector('.next-btn');
                let currentSlide = 0;

                function showSlide(index) {
                    slides.forEach((slide, i) => {
                        slide.classList.toggle('hidden', i !== index);
                    });
                }

                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
                    showSlide(currentSlide);
                });

                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
                    showSlide(currentSlide);
                });

                // Inicializa o slider
                showSlide(currentSlide);
            });

            // Script para opacidade dos botões flutuantes em touchscreens
            const floatingButtons = document.querySelectorAll('.floating-button');

            floatingButtons.forEach(button => {
                button.addEventListener('touchstart', () => {
                    button.classList.add('active');
                });

                button.addEventListener('touchend', () => {
                    button.classList.remove('active');
                });

                // Adicionado touchcancel para garantir que a opacidade volte ao normal se o toque for interrompido
                button.addEventListener('touchcancel', () => {
                    button.classList.remove('active');
                });
            });
        });