# Açougue Prime Yunes - Site Institucional

Este é o repositório do site institucional para o **Açougue Prime Yunes**, uma página web moderna, responsiva e focada em conversão, desenvolvida para apresentar a marca, seus produtos e serviços.

**[Veja a demonstração ao vivo](https://github.com/jeronimolimma/acougue-prime-yunes)** (substitua `seu-usuario.github.io/acougue-prime-yunes` pelo link do seu site no ar)

---

## ✨ Funcionalidades Principais

-   **Design Moderno e Responsivo:** Totalmente adaptável para desktops, tablets e celulares, utilizando Flexbox e Grid Layout.
-   **Seções Estratégicas:**
    -   **Institucional:** Sobre Nós, Diferenciais e Galeria de Fotos do ambiente.
    -   **Marketing e Vendas:** Promoções com contador regressivo, Clube de Assinatura com planos e regras, e Blog com dicas de churrasco.
-   **Alta Interatividade:**
    -   Carrosséis de imagens automáticos com navegação manual.
    -   Modais (pop-ups) para detalhes do blog, lista de espera do clube e convite para WhatsApp.
    -   Animações de entrada (`fade-in`), brilho em botões (`shine`) e pulso para chamar atenção.
-   **Foco em Conversão:**
    -   Formulários de Contato e Trabalhe Conosco integrados com **FormSubmit.co** (e-mail) e **WhatsApp**.
    -   Página de agradecimento personalizada com efeito de confete e sistema de avaliação por estrelas.
-   **Experiência do Usuário (UX):**
    -   Aviso de Cookies com salvamento de preferência (`localStorage`).
    -   Botão flutuante de WhatsApp com mensagem animada ("Online agora!").
    -   Efeitos sonoros sutis para interações.

---

## 🚀 Tecnologias Utilizadas

-   **HTML5:** Estrutura semântica do site.
-   **CSS3:** Estilização completa dentro do `index.html` para fácil manutenção, com variáveis CSS, animações e media queries.
-   **JavaScript (Vanilla):** Script único (`estilo.js`) para controlar toda a interatividade, manipulação do DOM, modais, carrossel e integrações.
-   **Canvas Confetti:** Biblioteca externa para o efeito de confete.
-   **FormSubmit.co:** Serviço gratuito para recebimento de formulários por e-mail.

---

## 🔧 Como Executar Localmente

Este projeto é construído com tecnologias web padrão e não requer um servidor ou dependências complexas.

1.  Clone ou baixe este repositório para o seu computador.
2.  Navegue até a pasta do projeto.
3.  Abra o arquivo `index.html` em qualquer navegador web moderno (Google Chrome, Firefox, Microsoft Edge).

---

## 部署 Deploy (Publicação)

O site está pronto para ser publicado gratuitamente usando o **GitHub Pages**, conforme explicado anteriormente.

1.  Crie um repositório público no GitHub.
2.  Envie todos os arquivos do projeto para este repositório.
3.  Nas configurações do repositório (`Settings` > `Pages`), configure a branch `main` como fonte de publicação.

Para **atualizar o site**, basta fazer as alterações nos arquivos locais e enviar as mudanças para o repositório com `git push`. As alterações serão refletidas no site no ar em poucos instantes.

---

## 📂 Estrutura dos Arquivos

```
/
├── index.html          # A página principal do site, contendo todo o CSS moderno.
├── obrigado.html       # Página de agradecimento após envio de formulário.
├── estilo.js           # Script principal com toda a lógica e interatividade.
├── README.md           # Este arquivo de documentação.
└── img/
    ├── logo.svg        # Logo principal em formato vetorial.
    ├── img1.jpeg       # Imagens de produtos e banners.
    ├── img2.jpeg
    └── img3.jpeg

```