function showSection(sectionId) {
    // Atualiza os botões do menu
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase().includes(sectionId)) {
            link.classList.add('active');
        }
    });

    // Esconde todas as seções
    const sections = document.querySelectorAll('.conteudo');
    sections.forEach(sec => {
        sec.style.display = 'none';
        sec.classList.remove('active');
    });

    // Mostra a seção alvo
    const targetSection = document.getElementById(sectionId);
    targetSection.style.display = 'block';

    // Força um reflow para garantir que a animação funcione
    void targetSection.offsetWidth;

    // Adiciona a classe active para iniciar a animação
    targetSection.classList.add('active');

    // Anima o texto em cascata
    const textElements = targetSection.querySelectorAll('h1, p, li, label, input, textarea, button');
    textElements.forEach((element, index) => {
        element.classList.remove('animate-text');
        void element.offsetWidth; // Força reflow
        element.classList.add('animate-text');
        element.style.animationDelay = `${index * 0.1}s`;
    });

    // Rola suavemente para o topo da seção
    window.scrollTo({
        top: targetSection.offsetTop - 100,
        behavior: 'smooth'
    });
}

// Inicializa a primeira seção
document.addEventListener('DOMContentLoaded', () => {
    showSection('sobre');

    // Adiciona efeito de hover nos cards do portfólio
    const portfolioItems = document.querySelectorAll('#portfolio li');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
});