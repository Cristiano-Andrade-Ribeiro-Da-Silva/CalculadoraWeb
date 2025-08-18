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
        if(TelaCell.matches)
        {
            Calc.style.left = "0";
            Historico.style.top = "10px";
        }

        else
        {
            return;
        }

    }, 1000);

    const Historico = document.querySelector(".Historico");
    const btnHistorico = document.querySelector(".btnHistorico");

    let situacao = false;

    btnHistorico.addEventListener("click", () =>
    {
        if(TelaCell.matches)
        {

            if (situacao)
            {
                Historico.style.opacity = "0";
            }
            
            else
            {
                Historico.style.opacity = "1";
            }

            situacao = !situacao;
        }

        else
        {
            if (situacao)
            {
                Calc.style.left = "20%";
                Historico.style.top = "1000px";
                Historico.style.opacity = "0";
            }
            
            else
            {
                Calc.style.left = "0";
                Historico.style.top = "10px";
                Historico.style.opacity = "1";
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