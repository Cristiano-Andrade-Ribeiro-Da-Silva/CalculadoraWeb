export const funcaoHorario = () =>
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

};