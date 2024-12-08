
# Solução de Atribuição de Tarefas - Frontend

Este repositório contém a aplicação front-end para o MVP de atribuição de tarefas. A interface gráfica permite ao usuário visualizar, cadastrar e processar alocações de tarefas a trabalhadores.
Este projeto é um exemplo simples de uma solução de atribuição de tarefas utilizando uma matriz de custos, onde as tarefas são alocadas aos trabalhadores com base em suas especialidades e no menor custo possível. O MVP permite o cadastro de trabalhadores, tarefas e custos associados, além de processar a solução ótima de atribuição de tarefas.

**Este projeto faz parte da avaliação da pós-graduação em Engenharia de Software da PUC-Rio.**

---

## Como Executar o Frontend

A aplicação front-end utiliza HTML, CSS e JavaScript e pode ser executada em qualquer navegador moderno. Para rodar localmente, siga os passos abaixo:

### Passos para Configuração

1. Navegue até o diretório do projeto front-end.
2. Abra o arquivo `index.html` diretamente no navegador, **ou**:
3. Utilize um servidor local para rodar a aplicação:
   ```bash
   python -m http.server
   ```
4. Acesse a aplicação no navegador:
   - [http://localhost:8000](http://localhost:8000)

---

## Funcionalidades do Frontend
1. **Cadastro de Trabalhadores**: Interface para adicionar trabalhadores com suas especialidades.
2. **Cadastro de Tarefas**: Permite ao usuário adicionar tarefas e especificar as especialidades requeridas.
3. **Cadastro de Custos**: Adiciona custos associados às tarefas, com base nas especialidades dos trabalhadores.
4. **Visualização de Soluções**: Mostra a alocação ótima de tarefas a trabalhadores gerada pela API.

---

## Tecnologias Utilizadas
- HTML5
- CSS3
- JavaScript

---

## Planos para Expansão
- Adicionar gráficos para visualização de alocações.
- Melhorar o design e funcionalidade da interface.
