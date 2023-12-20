// 01 - Capturar os dados do input
// 02 - Tratar Campos vazios
// 03 - Exibir calculo e o nível de IMC

const form = document.querySelector("form");
const peso = document.querySelector("#peso");
const altura = document.querySelector("#altura");
const resultado = document.querySelector(".resultado");
const inputs = document.querySelectorAll("input");
let campoVazio = false;
let imc;

//Objeto com dados do nível de obesidade.
let dadosImc = {
  abaixo: "Abaixo do Peso",
  normal: "Peso Normal",
  sobrepeso: "Sobrepeso",
  obesidadeGrauI: "Obesidade Grau I",
  obesidadeGrauII: "Obesidade Grau II",
  obesidadeGrauIII: "Obesidade Grau III",
};

//Função para exibir alertas de erro.
function alerta(erro) {
  const alertPopUp = document.querySelector("#alertErro");
  alertPopUp.style.display = "block";
  alertPopUp.classList.add("animate__fadeInDown");
  alertPopUp.innerHTML = erro;
  setTimeout(() => {
    alertPopUp.style.display = "none";
  }, 2000);
}

peso.addEventListener("keyup", () => {
  peso.value = peso.value.replace(/[^0-9]/gi, "");
});

altura.addEventListener("keyup", () => {
  altura.value = altura.value.replace(/[^0-9]/gi, "");
});

form.addEventListener("submit", (e) => {
  //Evita o envio nativo do formulário
  e.preventDefault();
  //Percorre todos os inputs, emitindo um alerta e colocando o foco no último vazio.
  for (let i of inputs) {
    if (i.value === "") {
      alerta(`Campo ${i.name} não pode ser vazio`);
      i.focus();
      campoVazio = true;
    } else {
      campoVazio = false;
    }
  }

  const alturaConvert = altura.value.replace(",", "");

  //Verifica se ainda existe campo vazio, caso não executa o cálculo do IMC
  if (campoVazio === false) {
    // Cálculo do IMC = peso / altura x altura. Depois multiplicado por 10.000 para arrendondar e depois fixa em duas casas.
    imc = ((peso.value / (alturaConvert * alturaConvert)) * 10000).toFixed(2);
  }

  //Verifica qual o nível de obesidade do paciente.
  if (imc <= 18.5) {
    resultado.innerHTML = `Resultado: ${
      dadosImc.abaixo
    } , seu IMC é: ${imc.replace(".", ",")}`;
  } else if (imc > 18.5 && imc <= 24.9) {
    resultado.innerHTML = `Resultado: ${
      dadosImc.normal
    } , seu IMC é: ${imc.replace(".", ",")}`;
  } else if (imc > 25 && imc <= 29.9) {
    resultado.innerHTML = `Resultado: ${
      dadosImc.sobrepeso
    } , seu IMC é: ${imc.replace(".", ",")}`;
  } else if (imc > 30 && imc <= 34.9) {
    resultado.innerHTML = `Resultado: ${
      dadosImc.obesidadeGrauI
    } , seu IMC é: ${imc.replace(".", ",")}`;
  } else if (imc > 35 && imc <= 39.9) {
    resultado.innerHTML = `Resultado: ${
      dadosImc.obesidadeGrauII
    } , seu IMC é: ${imc.replace(".", ",")}`;
  } else {
    resultado.innerHTML = `Resultado: ${
      dadosImc.obesidadeGrauIII
    } , seu IMC é: ${imc.replace(".", ",")}`;
  }
});
