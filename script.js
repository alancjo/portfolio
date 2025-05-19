function showSection(sectionId) {
    const sections = document.querySelectorAll('.conteudo');
    sections.forEach(sec => {
        sec.style.display = 'none';
        sec.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    targetSection.style.display = 'block';

    // Força um reflow para garantir que a animação funcione
    void targetSection.offsetWidth;

    targetSection.classList.add('active');

    // Anima o texto em cascata
    const textElements = targetSection.querySelectorAll('h1, p, li, label, input, textarea, button');
    textElements.forEach((element, index) => {
        element.classList.remove('animate-text');
        void element.offsetWidth; // Força reflow
        element.classList.add('animate-text');
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Inicializa a primeira seção
document.addEventListener('DOMContentLoaded', () => {
    showSection('sobre');
});