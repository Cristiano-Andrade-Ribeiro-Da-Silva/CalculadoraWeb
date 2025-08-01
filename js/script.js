const resultado = document.querySelector('.calculator__display-text');
const botoes = document.querySelectorAll('[data-action]');
const numeros = document.querySelectorAll('[data-number]');

const Container = document.querySelector('.container');

const Calc = document.querySelector(".calculator");
const CalcHeader = document.querySelector(".calculator__header");
const CalcDisplay = document.querySelector('.calculator__display');
const CalcDisplayTxt = document.querySelector('.calculator__display-text');


const Historico = document.querySelector(".Historico");
const btnHistorico = document.querySelector(".btnHistorico");
const HistoricoItens = document.querySelector(".Historico_itens");

const btnTema = document.querySelector(".btnTema");


const horario = () =>
{
    setInterval(() =>
    {
        const tempo = document.querySelector("#real-time-clock");

        const agora = new Date();
        const horas = agora.getHours();
        const minutos = agora.getMinutes().toString().padStart(2, '0');
        const segundos = agora.getSeconds().toString().padStart(2, '0');

        tempo.textContent = `${horas}:${minutos}:${segundos}`;
    }, 1000);

}
horario();


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

            case 'power':

                // Armazena o número atual exibido como o primeiro número
                numero1 = resultado.textContent;

                // Armazena qual operador foi clicado
                operador = acao;

                // Prepara para capturar o segundo número
                esperaNumero2 = true;
                break;

            case 'sqrt':

                numero1 = resultado.textContent;

                operador = acao;
                
                esperaNumero2 = true;
                break;

            case 'divide':

                numero1 = resultado.textContent;

                operador = acao;

                esperaNumero2 = true;
                break;

            case 'multiply':

                numero1 = resultado.textContent;

                operador = acao;

                esperaNumero2 = true;
                break;

            case 'subtract':

                numero1 = resultado.textContent;

                operador = acao;

                esperaNumero2 = true;
                break;

            case 'add':

                numero1 = resultado.textContent;

                operador = acao;

                esperaNumero2 = true;
                break;

            case 'percentage':

                numero1 = resultado.textContent;

                operador = acao;

                esperaNumero2 = true;
                break;

            case 'calculate':

                // Quando o botão "=" é clicado, pega o segundo número da tela
                const numero2 = resultado.textContent;

                // Chama a função de cálculo e exibe o resultado
                resultado.textContent = calcular(numero1, numero2, operador)


                const ItensSalvos = JSON.parse(localStorage.getItem("salvos")) || [];
                
                // Isso aqui é para contas que precisão de dois numeros
                if (operador == "add" || operador == "subtract" || operador == "multiply" || operador == "divide" || operador == "percentage")
                {
                    
                    const NovoConteudo = HistoricoItens.innerHTML += `<li class="Historico_itens_container">${numero1} ${operador} ${numero2} = ${calcular(numero1, numero2, operador)}</li>`;

                    ItensSalvos.push(NovoConteudo);
                    localStorage.setItem("salvos", JSON.stringify(ItensSalvos));
                }

                
                if (operador == "sqrt" || operador == "power")
                {
                    const NovoConteudo = HistoricoItens.innerHTML += `<li class="Historico_itens_container">${numero1} ${operador} = ${calcular(numero1, numero2, operador)}</li>`;

                    ItensSalvos.push(NovoConteudo);
                    localStorage.setItem("salvos", JSON.stringify(ItensSalvos));
                }

                // Reseta as variáveis de controle
                numero1 = '';
                operador = '';
                esperaNumero2 = false;
                break;

            default:

                console.log('Não pegou!');
        }
    })
});


function calcular(numero1, numero2, operador)
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
            return numero2 !== 0 ? numero1 / numero2 : 'Erro';


        case 'sqrt':

            if (numero1 < 0)
            {
                return 'Erro';
            }

            return Math.sqrt(numero1);


        case 'power':

            return Math.pow(numero1, 2);


        case 'percentage':

            return numero1 / 100;


        default:
            // Caso não pegue
            return 'Eita';
    }
}


let situacao = false;

btnHistorico.addEventListener("click", () =>
{
    if (situacao)
    {
        Calc.style.left = "0";
        Historico.style.top = "10px";
        Historico.style.opacity = "1";
    }
    
    else
    {
        Calc.style.left = "20%";
        Historico.style.top = "600px";
        Historico.style.opacity = "0";
    }

    situacao = !situacao;
});


let limparHistorico = document.querySelector(".Historico_button_clear");

limparHistorico.addEventListener('click', () =>
{
    // Removendo lista dos salvos 
    localStorage.removeItem('salvos');
    HistoricoItens.innerHTML = '';
});


window.addEventListener("load", () =>
{
    // Pegando os itens da lista salvos ou senão haver nada, pega uma lista vazia
    const ItensSalvos = JSON.parse(localStorage.getItem("salvos")) || [];

    // O forEach está lendo a lista toda de itens salvos 
    ItensSalvos.forEach(conteudo =>
    {
        HistoricoItens.innerHTML = conteudo;
    });

    // Função sugerida por AI
    function ElementosTema(elementos, dark)
    {
        elementos.forEach(e => e.classList.toggle('light', !dark));
    }

    // Obtém o tema salvo no localStorage ou define o 'dark' como padrão
    const tema = localStorage.getItem("tema") || 'dark';
    document.body.classList.add(tema);
    

    let dark = (tema == 'dark'); 

    // Usando a função sugerida
    ElementosTema([Container, Calc, Historico, HistoricoItens, btnHistorico, btnTema, CalcHeader, CalcDisplay, CalcDisplayTxt, limparHistorico] ,dark);

    btnTema.addEventListener('click', () =>
    {
        // Dark será true, se for removida, false.
        let dark = document.body.classList.toggle('dark');

        ElementosTema([document.body, Container, Calc, Historico, HistoricoItens, btnHistorico, btnTema, CalcHeader, CalcDisplay, CalcDisplayTxt, limparHistorico] ,dark);

        // Salva o novo tema no localStorage
        const NovoTema = dark ? "dark" : "light";
        localStorage.setItem("tema", NovoTema);
    });
});