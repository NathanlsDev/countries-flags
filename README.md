![GitHub repo size](https://img.shields.io/github/repo-size/nathanlsdev/countries-flags?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/nathanlsdev/countries-flags?style=for-the-badge)

# Country Flags 🌍

## Ajustes e melhorias

O projeto ainda <strong>está em desenvolvimento</strong> e as próximas atualizações serão voltadas nas seguintes tarefas:

- [ㅤ] Buscar as informações armazenadas dos países a cada reload.
  * Sim a aplicação "funciona" com uma única requisição, pois estou utilizando a ```fetch API```, que retorna todos os dados a cada requisição, então <i>no meu entendimento</i> não há necessidade múltiplas requisições. Basta armazenar os dados em uma variável e acessa-la sempre que necessário. Este comportamento já está implementado na página inicial, mas ao acessar a página de detalhes de um país e recarregar a pagina, a aplicação retorna 404, pois os dados não foram carregados novamente.

- [ㅤ] Carregamento infinito em dispositivos mobile.
  * Por algum motivo quando a aplicação é acessada através de um dispositivo mobile, a lista de países não está sendo carregada por completo, somente os 8 países iniciais. Acredito que, pela forma como foi implementado o evento de scroll.. 🪲🤔

- [ㅤ] Separar a lógica da "view" dos componentes!
- [ㅤ] Implementar feedback visual para resultados de buscas não encontrados, e rotas não existentes.
- [ㅤ] Refatorar o código! 
- [ㅤ] Implementar testes. 

<div align="center">
  <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbThwZ2tzMzk1ejRwN3FkYmRuMzIxNTFwN21ybnVmeGR1bXpocTRvciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13HBDT4QSTpveU/giphy.webp" />
</div>

### Deploy test:

Acessar <a href="https://countries-flags-tau.vercel.app/" target="_blank">aqui</a>








