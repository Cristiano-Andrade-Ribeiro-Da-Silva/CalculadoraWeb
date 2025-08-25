export const funcaoHistorico = () =>
{
    const Calc = document.querySelector(".calculator");
    
    const HistoricoItens = document.querySelector(".Historico_itens");
    
    const TelaCell = window.matchMedia("(max-width: 1000px)");

    // A cada 1 segundo a verificação é feita
    setInterval(() =>
    {
        // Para o container ficar alinhado
        // (não sei o do porque ele se desalinhar)
        if(TelaCell.matches) Calc.classList.add('calculator__cell');

    }, 1000);

    const Historico = document.querySelector(".Historico");
    const btnHistorico = document.querySelector(".btnHistorico");

    let situacao = false;

    btnHistorico.addEventListener("click", () =>
    {
        if(TelaCell.matches)
        {

            if (situacao) Historico.style.opacity = "0";
            
            else Historico.style.opacity = "1";

            situacao = !situacao;
        }

        else
        {

            if (situacao)
            {
                Calc.classList.add('calculator__situacao_01');
                Calc.classList.remove('calculator__situacao_02');

                Historico.classList.add('Historico__situacao_01');
                Historico.classList.remove('Historico__situacao_02');
            }
            
            else
            {
                Calc.classList.remove('calculator__situacao_01');
                Calc.classList.add('calculator__situacao_02');

                Historico.classList.remove('Historico__situacao_01');
                Historico.classList.add('Historico__situacao_02');
            }

            situacao = !situacao;
        }
        
    });


    let limparHistorico = document.querySelector(".Historico_button_clear");

    limparHistorico.addEventListener('click', () =>
    {
        // Removendo lista dos salvos 
        localStorage.removeItem('salvos');
        HistoricoItens.innerHTML = '';
    });
}