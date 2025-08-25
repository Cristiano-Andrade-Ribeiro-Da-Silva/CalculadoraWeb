export const funcaoBotaoAcao = () =>
{
    const HistoricoItens = document.querySelector(".Historico_itens");
    
    const resultado = document.querySelector('.calculator__display-text');
    const botoes = document.querySelectorAll('[data-action]');
    const numeros = document.querySelectorAll('[data-number]');

    let numero1 = '';
    let operador = '';
    let esperaNumero2 = false;

    numeros.forEach(botao =>
    {
        botao.addEventListener('click', () =>
        {
            const valor = botao.dataset.number;

            // Se o operador da calculadora já foi clicado isso acontece
            if(esperaNumero2)
            {
                // Coloca um novo numero
                resultado.textContent = valor;
                // não adiciona um digito no valor
                esperaNumero2 = false;
            }

            // Se o operador ainda não foi clicado isso acontece
            else
            {
                // Contatena o novo número com o último número digitado
                resultado.textContent += valor;
            }
        });
    });

    botoes.forEach(botao =>
    {
        botao.addEventListener('click', () =>
        {
            const acao = botao.dataset.action;

            switch(acao)
            {
                case 'clear':

                    resultado.textContent = '';
                    numero1 = '';
                    operador = '';
                    break;

                // Forma descoberta para encurtar o código 
                case 'power':
                case 'sqrt':
                case 'divide':
                case 'multiply':
                case 'subtract':
                case 'add':
                case 'percentage':

                    // Armazena o número atual exibido como o primeiro número
                    numero1 = resultado.textContent;

                    // Armazena qual operador foi clicado
                    operador = acao;

                    // Prepara para capturar o segundo número
                    esperaNumero2 = true;
                    break;

                    
                case 'decimal':

                    CalcDisplayTxt.textContent +='.';

                    console.log(CalcDisplayTxt);
                    break;

                case 'calculate':

                    // Quando o botão "=" é clicado, pega o segundo número da tela
                    const numero2 = resultado.textContent;

                    // Chama a função de cálculo e exibe o resultado
                    resultado.textContent = calcular(numero1, numero2, operador)

                    const ItensSalvos = JSON.parse(localStorage.getItem("salvos")) || [];

                    const Simbolo = (operacao) => 
                    {
                        switch(operacao)
                        {

                            case 'power':
                                return 'x²';

                            case 'sqrt':
                                return '√';
                                
                            case 'divide':
                                return '÷';

                            case 'multiply':
                                return 'x';

                            case 'subtract':
                                return '-';

                            case 'add':
                                return '+';

                            case 'percentage':
                                return '%';

                            default:

                                return 'Erro na operação';
                        }
                    }
                    
                    // Isso aqui é para contas que precisão de dois numeros
                    if (operador == "add" || operador == "subtract" || operador == "multiply" || operador == "divide" || operador == "percentage")
                    {
                        let NovoConteudo = HistoricoItens.innerHTML += `<li class="Historico_itens_container">${numero1} ${Simbolo(operador) } ${numero2} = ${calcular(numero1, numero2, operador)}</li>`;

                        ItensSalvos.push(NovoConteudo);
                        localStorage.setItem("salvos", JSON.stringify(ItensSalvos));
                    }

                    
                    else if (operador == "power")
                    {
                        let NovoConteudo = HistoricoItens.innerHTML += `<li class="Historico_itens_container">${numero1} ${Simbolo(operador)} = ${calcular(numero1, numero2, operador)}</li>`;

                        ItensSalvos.push(NovoConteudo);
                        localStorage.setItem("salvos", JSON.stringify(ItensSalvos));
                    }

                    else if(operador == "sqrt")
                    {
                        let NovoConteudo = HistoricoItens.innerHTML += `<li class="Historico_itens_container">${Simbolo(operador)}${numero1} = ${calcular(numero1, numero2, operador)}</li>`;

                        ItensSalvos.push(NovoConteudo);
                        localStorage.setItem("salvos", JSON.stringify(ItensSalvos));
                    }

                    // Reseta as variáveis de controle
                    numero1 = '';
                    operador = '';
                    esperaNumero2 = false;
                    break;

                default:

                    console.log('Erro no calculo');
            }
        });
    });


    const calcular = (numero1, numero2, operador) =>
    {
        numero1 = parseFloat(numero1);
        numero2 = parseFloat(numero2);

        switch (operador)
        {
            case 'add':

                return numero1 + numero2;


            case 'subtract':

                return numero1 - numero2;


            case 'multiply':

                return numero1 * numero2;


            case 'divide':

                // Evita divisão por zero
                return numero2 !== 0 ? numero1 / numero2 : 'Não divisivel por 0';


            case 'sqrt':

                if (numero1 < 0)
                {
                    return 'Erro';
                }

                return Math.sqrt(numero1);


            case 'power':

                return Math.pow(numero1, 2);


            case 'percentage':

                return (numero1 / 100) * numero2;


            default:
                // Caso não pegue
                return 'Operação inválida';
        };
    };
}