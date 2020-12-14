/**
 * Valida se o valor é zero
 * @param valor
 * @returns {boolean}
 */
function isZero(valor) {
	return (valor === '0' || valor === 0);
}

/**
 * Realiza o calculo entre dois número
 * @param numero1
 * @param operacao Operação do calculo. Valores possíveis ['+', '-', '*', '/']
 * @param numero2
 * @returns {number|*}
 */
function calcular(numero1, operacao, numero2) {
	numero1 = parseFloat(numero1);
	numero2 = parseFloat(numero2);

	switch (operacao) {
		case '+':
			return numero1 + numero2;
		case '-':
			return numero1 - numero2;
		case '*':
			return numero1 * numero2;
		case '/':
			return numero1 / numero2;
		default:
			return 0;
	}
}

function limpaCalculadora() {
	const calculadora = window.document.querySelector('.calculadora');
	const inputResultado = window.document.getElementById('resultado');
	inputResultado.value = 0;
	calculadora.dataset.primeiroValor = '';
	calculadora.dataset.operador = '';
	calculadora.dataset.botaoAnterior = 'C';
	calculadora.dataset.segundoValor = '';
}

/**
 * Evento de click nos botões da calculadora, esta função é usada como listener em cada botão.
 * Então, cada vez que o botão for clicado ele executará esta função.
 *
 * @param e Evento disparado pelo botão
 */
function eventClickBotao(e) {
	const calculadora = window.document.querySelector('.calculadora');
	const botao = e.target;
	const inputResultado = window.document.getElementById('resultado');

	var primeiroValor = calculadora.dataset.primeiroValor;
	var operador = calculadora.dataset.operador;
	var segundoValor = inputResultado.value;
	var value = botao.value;
	var operacoes = ['-', '+', '/', '*', '=', 'C', 'del', '.'];

	if (!operacoes.includes(value)) { // Somente números;
		if (
			inputResultado.value === '0'
			|| calculadora.dataset.botaoAnterior === 'operador'
			|| calculadora.dataset.botaoAnterior === 'calcular'
		) {
			inputResultado.value = value;
		} else {
			inputResultado.value += value;
		}
		calculadora.dataset.botaoAnterior = 'numero';
	} else {
		switch (value) {
			case 'C': // Limpar calculadora
				limpaCalculadora();
				break;
			case 'del': // Limpa operação
				inputResultado.value = '';
				break;
			case '=':
				if (
					(isZero(primeiroValor) || isZero(segundoValor))
					&& operador === '/'
				) {
					alert('Não é permitido a divisão por zero');
					return;
				}

				if (primeiroValor) {
					if (calculadora.dataset.botaoAnterior === 'calcular') {
						primeiroValor = inputResultado.value;
						segundoValor = calculadora.dataset.segundoValor;
					}

					inputResultado.value = calcular(primeiroValor, operador, segundoValor);
				}

				calculadora.dataset.segundoValor = segundoValor;
				calculadora.dataset.botaoAnterior = 'calcular';
				break;
			case '.':
				if (!inputResultado.value.includes('.')) { // Caso ainda não tenha o ponto decimal
					inputResultado.value += '.';
				} else if ( // Caso o botão clicado seja do tipo operador (+,-, ...) ou igual (=)
					calculadora.dataset.botaoAnterior === 'operador'
					|| calculadora.dataset.botaoAnterior === 'calcular'
				) {
					inputResultado.value += '0.';
				}
				calculadora.dataset.botaoAnterior = 'decimal';
				break;
			default: // Restante das operações (+, -, *, /)
				if (
					(isZero(primeiroValor) || isZero(segundoValor))
					&& value === '/'
				) {
					alert('Não é permitido a divisão por zero');
					return;
				}

				if (
					primeiroValor && operador
					&& (calculadora.dataset.botaoAnterior !== 'operador'
					&& calculadora.dataset.botaoAnterior !== 'calcular')
				) {
					const calculoValor = calcular(primeiroValor, value, segundoValor);
					inputResultado.value = calculoValor;
					calculadora.dataset.segundoValor = calculoValor;
					calculadora.dataset.primeiroValor = calculoValor;
				} else {
					calculadora.dataset.primeiroValor = inputResultado.value;
					calculadora.dataset.segundoValor = inputResultado.value;
				}

				calculadora.dataset.botaoAnterior = 'operador';
				calculadora.dataset.operador = value;
				break;
		}
	}
}

/**
 * Inicializa a calculadora, cria os botões dentro da calculadora conforme a ordem que formam informado
 */
function inicializarCalculadora() {
	const labelBotoes = [
		'C', 'del', '-', '+',
		'1', '2', '3', '/',
		'4', '5', '6', '*',
		'7', '8', '9', '=',
		'.', '0'
	];

	const divBotoes = window.document.getElementById('botoes');

	labelBotoes.forEach(function (value) {
		const botao = window.document.createElement('button');
		botao.setAttribute('type', 'button');
		botao.setAttribute('class', 'botao');
		botao.textContent = value;
		botao.value = value;

		botao.addEventListener('click', eventClickBotao);

		divBotoes.appendChild(botao);
	});
}

window.addEventListener('load', function () {
	inicializarCalculadora();
});
