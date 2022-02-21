function gerarNumeroInteiroAleatorio(min, max) {
	// número fracionário aleatório maior ou igual a 0 e menor que 1
	const aleatorioDeBase = Math.random();
	// número fracionário aleatório maior ou igual a 0 e menor que (max - min + 1)
	const aleatorioFracionario = Math.random() * (max - min + 1);
	// número inteiro aleatório maior ou igual a 0 e menor ou igual a (max - min)
	// Math.trunc tira a parte fracionária de um número: 0,5 vira 0, 1,25 vira 1, etc
	const aleatorioInteiro = Math.trunc(aleatorioFracionario);
	// número inteiro aleatório maior ou igual a min e menor ou igual a max
	return min + aleatorioInteiro;
}

function escolherElementoAleatorio(array) {
	return array[gerarNumeroInteiroAleatorio(0, array.length - 1)]
}

const elementoLetras = document.querySelector(".letras");
const elementoCorpo = document.querySelector(".corpo");
const partesDoCorpo = elementoCorpo.querySelectorAll("*");
const botoes = document.querySelectorAll(".botoes button");
const palavras = ["amizade", "viagem", "celular", "jaca"];

let palavra;
let letrasCertas = 0;
let letrasErradas = 0;

function tentarLetra(letra) {
	if (palavra.includes(letra)) {
		for (let i = 0; i < palavra.length; i++) {
			const elementosDeLetra = elementoLetras.querySelectorAll(".letra");

			if (palavra[i] === letra && !elementosDeLetra[i].innerText) {
				elementosDeLetra[i].innerText = letra;
				letrasCertas++;
			}
		}
		
		if (letrasCertas === palavra.length) {
			alert("Você ganhou!");
			novaRodada();
		}
	} else {
		letrasErradas++;
		for (let i = 0; i < partesDoCorpo.length; i++) {
			const parteDoCorpo = partesDoCorpo[i];
			if (parteDoCorpo.hasAttribute("hidden")) {
				parteDoCorpo.toggleAttribute("hidden");
				break;
			}
		}
		
		if (letrasErradas >= 10) {
			alert(`Você perdeu! :(\nA palavra era: "${palavra}"`);
			novaRodada();
		}
	}
}

for (let i = 0; i < botoes.length; i++) {
	botoes[i].addEventListener('click', event => {
		const letra = event.target.innerText;
		tentarLetra(letra);
	});
}

document.addEventListener('keypress', event => {
	tentarLetra(event.key.toLowerCase());
});

function novaRodada() {
	palavra = escolherElementoAleatorio(palavras);
	letrasCertas = 0;
	letrasErradas = 0;
	
	const letrasAnteriores = elementoLetras.querySelectorAll(".letra");
	for (let i = 0; i < letrasAnteriores.length; i++) {
		letrasAnteriores[i].remove();
	}

	for (let i = 0; i < partesDoCorpo.length; i++) {
		partesDoCorpo[i].setAttribute("hidden", "");
	}
	
	for (let i = 0; i < palavra.length; i++) {
		const letra = document.createElement("span");
		letra.classList.add("letra");
		elementoLetras.append(letra);
	}
}

novaRodada();
