/**
 * Gerenciamento de tema
 */
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle i');
    const isDark = body.getAttribute('data-theme') === 'dark';

    // Alterna entre temas e atualiza o ícone
    if (isDark) {
        body.removeAttribute('data-theme');
        themeToggle.classList.replace('fa-sun', 'fa-moon');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.classList.replace('fa-moon', 'fa-sun');
    }

    // Salva a preferência do usuário
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

/**
 * Navegação entre seções
 */
function showSection(sectionId) {
    // Atualiza estado dos botões do menu
    updateMenuButtons(sectionId);

    // Atualiza visibilidade das seções
    updateSections(sectionId);

    // Anima elementos da seção
    animateSectionContent(sectionId);

    // Rola suavemente para a seção
    scrollToSection(sectionId);
}

/**
 * Atualiza o estado dos botões do menu
 */
function updateMenuButtons(sectionId) {
    document.querySelectorAll('.menu-link').forEach(link => {
        link.classList.toggle('active',
            link.textContent.toLowerCase().includes(sectionId)
        );
    });
}

/**
 * Atualiza a visibilidade das seções
 */
function updateSections(sectionId) {
    document.querySelectorAll('.conteudo').forEach(sec => {
        sec.style.display = 'none';
        sec.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    targetSection.style.display = 'block';
    void targetSection.offsetWidth; // Força reflow
    targetSection.classList.add('active');
}

/**
 * Anima os elementos da seção
 */
function animateSectionContent(sectionId) {
    const section = document.getElementById(sectionId);
    const elements = section.querySelectorAll('h1, p, li, label, input, textarea, button');

    elements.forEach((element, index) => {
        element.classList.remove('animate-text');
        void element.offsetWidth;
        element.classList.add('animate-text');
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

/**
 * Rola suavemente para a seção
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth'
    });
}

/**
 * Inicialização da aplicação
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicia com a seção "sobre"
    showSection('sobre');

    // Carrega tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        document.querySelector('.theme-toggle i').classList.replace('fa-moon', 'fa-sun');
    }

    // Adiciona efeitos de hover nos cards do portfólio
    document.querySelectorAll('#portfolio li').forEach(item => {
        item.addEventListener('mouseenter', () => item.style.transform = 'translateY(-5px)');
        item.addEventListener('mouseleave', () => item.style.transform = 'translateY(0)');
    });
});