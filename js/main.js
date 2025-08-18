import { funcaoHorario } from "./modules/horario.js"; 
import { funcaoBotaoAcao } from "./modules/calculo.js";
import { funcaoHistorico } from "./modules/historico.js";
import { funcaoTema } from "./modules/tema.js";

document.addEventListener("DOMContentLoaded", () =>
{
    funcaoHorario();
    funcaoBotaoAcao();
    funcaoHistorico();
    funcaoTema();
});