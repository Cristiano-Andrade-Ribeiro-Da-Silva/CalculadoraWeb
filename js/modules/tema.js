export const funcaoTema = () =>
{
    const btnTema = document.querySelector(".btnTema");

    const Container = document.querySelector('.container');

    const Calc = document.querySelector(".calculator");
    const CalcHeader = document.querySelector(".calculator__header");
    const CalcDisplay = document.querySelector('.calculator__display');
    const CalcDisplayTxt = document.querySelector('.calculator__display-text');

    const Historico = document.querySelector(".Historico");
    const HistoricoItens = document.querySelector(".Historico_itens");
    const btnHistorico = document.querySelector(".btnHistorico");

    const limparHistorico = document.querySelector(".Historico_button_clear");

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
}