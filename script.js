/**
 * Gerenciamento de tema
 */
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    const icon = document.querySelector('.theme-toggle i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

/**
 * Navegação entre seções
 */
function showSection(sectionId) {
    // Atualiza botões do menu
    updateMenuButtons(sectionId);

    // Atualiza seções
    updateSections(sectionId);

    // Anima conteúdo
    animateSectionContent(sectionId);

    // Scroll suave
    scrollToSection(sectionId);
}

/**
 * Atualiza o estado dos botões do menu
 */
function updateMenuButtons(sectionId) {
    document.querySelectorAll('.menu-link').forEach(button => {
        button.classList.toggle('active', button.getAttribute('onclick').includes(sectionId));
    });
}

/**
 * Atualiza a visibilidade das seções
 */
function updateSections(sectionId) {
    document.querySelectorAll('.conteudo').forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

/**
 * Anima os elementos da seção
 */
function animateSectionContent(sectionId) {
    const section = document.getElementById(sectionId);
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';

    setTimeout(() => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }, 50);
}

/**
 * Rola suavemente para a seção
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Gerenciamento do formulário de contato
 */
function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Configuração do EmailJS
    const templateParams = {
        from_name: formData.get('nome'),
        from_email: formData.get('email'),
        message: formData.get('mensagem'),
        to_email: 'alancjobm@gmail.com'
    };

    // Envia email usando EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            alert('Mensagem enviada com sucesso!');
            form.reset();
        }, function(error) {
            alert('Erro ao enviar mensagem. Por favor, tente novamente.');
            console.error('Erro:', error);
        });

    return false;
}

/**
 * Inicialização da aplicação
 */
document.addEventListener('DOMContentLoaded', function() {
    // Carrega tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.querySelector('.theme-toggle i').className = 'fas fa-sun';
    }

    // Mostra primeira seção
    showSection('sobre');

    // Adiciona efeito hover nos itens do portfólio
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});