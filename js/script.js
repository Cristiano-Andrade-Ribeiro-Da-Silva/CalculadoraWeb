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

            case 'power':

                // Eleva o número atual ao quadrado
                resultado.textContent = Math.pow(parseFloat(resultado.textContent), 2);

                // outro jeito:
                // resultado.textContent = parseFloat(resultado.textContent) * parseFloat(resultado.textContent);
                break;

            case 'sqrt':

                // Calcula a raiz quadrada do número atual
                resultado.textContent = Math.sqrt(parseFloat(resultado.textContent));
                break;

            case 'divide':

                // Armazena o número atual exibido como o primeiro número
                numero1 = resultado.textContent;

                // Armazena qual operador foi clicado
                operador = acao;

                // Prepara para capturar o segundo número
                esperaNumero2 = true;
                break;

            case 'multiply':

                // Armazena o número atual exibido como o primeiro número
                numero1 = resultado.textContent;

                // Armazena qual operador foi clicado
                operador = acao;

                // Prepara para capturar o segundo número
                esperaNumero2 = true;
                break;

            case 'subtract':

                // Armazena o número atual exibido como o primeiro número
                numero1 = resultado.textContent;

                // Armazena qual operador foi clicado
                operador = acao;

                // Prepara para capturar o segundo número
                esperaNumero2 = true;
                break;

            case 'add':

                // Armazena o número atual exibido como o primeiro número
                numero1 = resultado.textContent;

                // Armazena qual operador foi clicado
                operador = acao;

                // Prepara para capturar o segundo número
                esperaNumero2 = true;
                break;

            case 'percentage':

                // Transforma o número atual em porcentagem
                resultado.textContent = parseFloat(resultado.textContent) / 100;
                break;

            case 'calculate':

                // Quando o botão "=" é clicado, pega o segundo número da tela
                const numero2 = resultado.textContent;

                // Chama a função de cálculo e exibe o resultado
                resultado.textContent = calcular(numero1, numero2, operador);

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

// Função anonima
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
            return numero2 !== 0 ? numero1 / numero2 : 'Erro';

        default:
            // Caso não pegue
            return 'Eita';
    }
}
