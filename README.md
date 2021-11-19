# Poké Lig4

## Autores
- Eduardo Almeida
- Enzo Ribeiro
- Maria Alice
- Rafael Oliveira

## Inicialização
- Baixar dependências:
```
npm i
```
- Inicializar Client <a href="http://localhost:1234/" target="_blank">(http://localhost:1234/)</a>:
```
npm run app:start
```
- Ouvir alterações do scss:
```
npm run scss
```
- Inicializar socket <a href="http://localhost:4321/" target="_blank">(http://localhost:4321/)</a>:
```
npm run socket:start
```
- Inicializar todos necessários para desenvolver:
```
npm run dev
```
- Inicializar todos para a versão publicada:
```
npm run prod
```

## Introdução

O Liquid Galaxy é um projeto de código aberto fundado pelo Google. Criado em 2008 pelo funcionário do Google Jason Holt, o Liquid Galaxy começou como um visualizador panorâmico de vários monitores do Google Earth , mas evoluiu para se tornar uma ferramenta geral de visualização de dados para operações, marketing e pesquisa.

O Liquid Galaxy oferece a capacidade de voar pelo Google Earth, visualizar vídeos e fotos panorâmicas, desenvolver passeios interativos e exibir dados GIS graficamente.

Com isso em mente, o objetivo do projeto é desenvolver um jogo que utiliza a tecnologia do Liquid Galaxy para trazer uma nova perspectiva ao jogador.

O jogo consiste em uma adaptação do jogo "Lig 4", com elementos que fazem referência à série de televisão Pokémon. 

Feito para ser jogado de forma multiplayer, dois jogadores competem para tentar completar uma sequência de quatro peças do mesmo jogador. Aquele jogador que conseguir alcançar essa sequência, é o vencedor. 

## Tecnologias Utilizadas

São utilizadas no desenvolvimento do projeto as tecnologias:
- Socket.io: Será utilizado para conversar entre as aplicações, facilitando a comunicação e
identificação da finalização de turnos.
- Babbel: Será utilizado para facilitar a organização da arquitetura do projeto vanilla.
- Express.js: Conforme recomendado pela documentação do Socket.io para servidores, o express
facilitará no desenvolvimento da api do jogo.
- HTML5 (HiperTextMarkup Language): Será utilizado para criação visual (UI).
- CSS3 (Cascading Style Sheets): Será utilizado para estilização da UI.
- JavaScript: Será utilizado tanto no servidor do socket quanto no client side, para criação
das regras de negócio.

## UI

- <a href="https://www.figma.com/file/3lGnnmRdDA0C9aCvnwBAnV/PA?node-id=0%3A1" target="_blank">Acessar Figma</a>
## Vídeos Explicativos

- <a href="https://www.youtube.com/watch?v=PqwXqrwFPnE" target="_blank">Assistir vídeo introdutório</a>

## Camadas do Projeto

### App
```
Contém os scripts das telas da aplicação (Front).
```
- app__assets: 
```
Contém imports de imagens e gifs pra aplicação.
```
- app__components: 
```
Contém componentes que podem ser utilizados em diferentes telas da aplicação.
```
- app__environments: 
```
Contém as constantes da aplicação FrontEnd.
```
- app__models: 
```
Contém os modelos utilizados na aplicação FrontEnd.
```
- app__pages: 
```
Contém pastas de codebehinds de cada tela desenvolvida na aplicação.
```
- app__pages__*.events.js: 
```
A página que contém os listenners de eventos daquela página, podendo ter mais de um arquivo, para um diferente tipo de evento, por página da aplicação.
```
- app__pages__*.page.js: 
```
A página que contém a classe de tratamento de regras e requisições da página.
```
- app__pages__*.main.js: 
```
A página que contém os imports de eventos e da classe de tratamento de regras da página.
```
- app__services: 
```
Contém os serviços de chamada de alguma api/socket.
```
- app__styles: 
```
Contém os estilos da aplicação.
```
- app__styles_css: 
```
Contém os estilos finais da aplicação (Não editar pois são gerados).
```
- app__styles_scss: 
```
Contém os estilos para desenvolvimento da aplicação (Ao querer editar um estilo, deve ser feito nessa camada com o script de scss rodando).
```
- app__utils: 
```
Contém algumas funções que podem ser úteis para diferentes tipos de arquivos da pasta "app".
```
### Public
```
Contém a estrutura em HTML das páginas da aplicação.
```
### Socket
```
Contém as informações do socket do projeto.
```
- socket__classes: 
```
Contém algumas classes utilizadas na construção do socket.
```
- socket__data: 
```
Contém a regra de armazenamento do socket.
```
- socket__main.js: 
```
Contém as regras e eventos principais do socket da aplicação.
```
### POC LIG4
- Feita separadamente, em outro respositório, para adiantar as regras de negócio para implementação e abstração do jogo LIG4.
- <a href="https://github.com/rafaelos-git/logica_lig4" target="_blank">Acessar repositório.</a>

## TODO:
- Adicionar botão para reiniciar o jogo Front e chamar o socket.
- Adicionar listenner que reinicia o jogo.
- Adicionar maneira de entrar no jogo como visitante.
- Adicionar feature de "escorregar" ao clicar em uma célula sem pokémons abaixo.
- Sair da página do jogo ao não ter jogadores cadastrados.

- ATENÇÃO: Os dados do usuário são salvos no cache, ao abrir diferentes abas no mesmo desktop, abra com cache diferente (Guias anônimas diferentes).