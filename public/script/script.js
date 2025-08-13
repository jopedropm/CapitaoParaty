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
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Script para os sliders dos roteiros e lanchas
document.addEventListener('DOMContentLoaded', () => {
    // Criar o modal de visualização de imagens em tela cheia
    const body = document.body;
    const fullscreenModal = document.createElement('div');
    fullscreenModal.id = 'fullscreen-modal';
    
    // Estrutura do modal
    fullscreenModal.innerHTML = `
        <div class="relative w-full h-full flex flex-col justify-center items-center p-4">
            <button id="modal-close" class="absolute top-4 right-4 text-white text-3xl z-20">&times;</button>
            <div id="modal-counter" class="absolute top-4 left-4 text-white text-lg z-20">1/1</div>
            
            <div id="modal-content" class="relative w-full h-full flex items-center justify-center">
                <!-- As imagens serão inseridas aqui dinamicamente -->
            </div>
            
            <button id="modal-prev" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-12 h-12 rounded-full flex items-center justify-center z-20">&#10094;</button>
            <button id="modal-next" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-12 h-12 rounded-full flex items-center justify-center z-20">&#10095;</button>
        </div>
    `;
    
    body.appendChild(fullscreenModal);
    
    // Elementos do modal
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');
    const modalCounter = document.getElementById('modal-counter');
    
    // Variáveis para controlar o modal
    let currentModalSlides = [];
    let currentModalIndex = 0;
    
    // Função para abrir o modal com as imagens do slider clicado
    function openModal(slides, startIndex) {
        // Limpar conteúdo anterior
        modalContent.innerHTML = '';
        
        // Armazenar slides e índice atual
        currentModalSlides = Array.from(slides);
        currentModalIndex = startIndex;
        
        // Criar elementos de imagem para o modal
        currentModalSlides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            if (img) {
                const modalSlide = document.createElement('div');
                modalSlide.className = `absolute inset-0 flex items-center justify-center ${index === startIndex ? '' : 'hidden'}`;
                
                const modalImg = document.createElement('img');
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                modalImg.className = 'max-h-full max-w-full object-contain';
                
                modalSlide.appendChild(modalImg);
                modalContent.appendChild(modalSlide);
            }
        });
        
        // Atualizar contador
        updateModalCounter();
        
        // Mostrar modal
        fullscreenModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impedir rolagem da página
    }
    
    // Função para fechar o modal
    function closeModal() {
        fullscreenModal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar rolagem da página
    }
    
    // Função para navegar entre slides no modal
    function showModalSlide(index) {
        const modalSlides = modalContent.children;
        Array.from(modalSlides).forEach((slide, i) => {
            slide.classList.toggle('hidden', i !== index);
        });
        currentModalIndex = index;
        updateModalCounter();
    }
    
    // Função para atualizar o contador de slides
    function updateModalCounter() {
        modalCounter.textContent = `${currentModalIndex + 1}/${currentModalSlides.length}`;
    }
    
    // Event listeners para o modal
    modalClose.addEventListener('click', closeModal);
    
    modalPrev.addEventListener('click', () => {
        const newIndex = (currentModalIndex > 0) ? currentModalIndex - 1 : currentModalSlides.length - 1;
        showModalSlide(newIndex);
    });
    
    modalNext.addEventListener('click', () => {
        const newIndex = (currentModalIndex < currentModalSlides.length - 1) ? currentModalIndex + 1 : 0;
        showModalSlide(newIndex);
    });
    
    // Fechar modal ao clicar fora da imagem
    fullscreenModal.addEventListener('click', (e) => {
        if (e.target === fullscreenModal) {
            closeModal();
        }
    });
    
    // Suporte a teclas do teclado
    document.addEventListener('keydown', (e) => {
        if (!fullscreenModal.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') modalPrev.click();
        if (e.key === 'ArrowRight') modalNext.click();
    });
    
    // Suporte a gestos de deslize em dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    
    fullscreenModal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    fullscreenModal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50; // Mínimo de pixels para considerar um swipe
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe para a esquerda (próximo slide)
            modalNext.click();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe para a direita (slide anterior)
            modalPrev.click();
        }
    }
    
    // Configuração dos sliders nos cards
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
        
        // Abrir modal ao clicar no slider
        slider.addEventListener('click', (e) => {
            // Não abrir o modal se o clique foi em um botão de navegação
            if (!e.target.classList.contains('prev-btn') && 
                !e.target.classList.contains('next-btn') && 
                !e.target.closest('.prev-btn') && 
                !e.target.closest('.next-btn')) {
                openModal(slides, currentSlide);
            }
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
