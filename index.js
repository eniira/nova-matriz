const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();			
const path = require('path');
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const pdf = require('html-pdf');

/*
Falta:
Corrigir os nomes,
Colocar os horarios certos,
Gerar os dados na web (html),
Deixar bonito,
Colocar no pdf(html para pdf) 

*/

var qtdDiscAnt = 43; //decrementa 1, sempre
var qtdDiscNov = 31; //decrementa de qtdEquivamente 
var cargaHoraAnt = 3205;
var cargaHoraNova = 1735;
var optativaAnt = 6;
var optativaNova = 10;
var humanasAnt = 3;
var humanasNova = 8;

let materias = [
	/*Primeiro Periodo*/
	{
		"nome": "Algoritmos",
		"cargaHoraria" : 90,
		"equivalente" : "Introdução à Programação, Algoritmos",
		"qtdEquivalente" : 2

	},{
		"nome": "Cálculo Diferencial e Integral 1",
		"cargaHoraria" : 60,
		"equivalente" : "Cálculo Diferencial e Integral 1",
		"qtdEquivalente" : 1

	},{
		"nome": "Comunicação Linguística",
		"cargaHoraria" : 60,
		"equivalente" : "Comunicação Linguística",
		"qtdEquivalente" : 1

	},{
		"nome": "Ética, Profissão e Cidadania",
		"cargaHoraria" : 60,
		"equivalente" : "Ética em Computação",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Geometria Analítica e Álgebra Linear",
		"cargaHoraria" : 60,
		"equivalente" : "Álgebra Linear",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Introdução à Ciência da Computação",
		"cargaHoraria" : 60,
		"equivalente" : "Computação e Tecnologia",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Lógica Matemática",
		"cargaHoraria" : 60,
		"equivalente" : "Ética em Computação",
		"qtdEquivalente" : 1
		
	},{ /*Segundo Periodo*/
		"nome": "Algoritimos e Estruturas de Dados 1",
		"cargaHoraria" : 60,
		"equivalente" : "Algoritimos e Estruturas de Dados 1",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Elementos de Lógica Digital",
		"cargaHoraria" : 60,
		"equivalente" : "Elementos de Lógica Digital",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Fundamentos de Administração",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa de Humanas: Viabilidade Econômica",
		"qtdEquivalente" : 1 //analise
		
	},{
		"nome": "Física 3",
		"cargaHoraria" : 60,
		"equivalente" : "Enriquecimento Curricular: Física 3",
		"qtdEquivalente" : 0 //se equivamente for maior que 0
		
	},{
		"nome": "Propabilidade e Estatística",
		"cargaHoraria" : 60,
		"equivalente" : "Propabilidade e Estatística",
		"qtdEquivalente" : 1
		
	},{ /*Terçero Periodo*/
		"nome": "Algoritimos e Estruturas de Dados 2",
		"cargaHoraria" : 60,
		"equivalente" : "Algoritimos e Estruturas de Dados 2",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Arquitetura e Organização de Computadores",
		"cargaHoraria" : 60,
		"equivalente" : "Arquitetura e Organização de Computadores",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Interação Homem-Computador",
		"cargaHoraria" : 60,
		"equivalente" : "Interação Homem-Computador",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Análise e Projeto Orientado a Objetos",
		"cargaHoraria" : 60,
		"equivalente" : "Análise e Projeto de Software",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Banco de Dados 1",
		"cargaHoraria" : 60,
		"equivalente" : "Banco de Dados",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Cálculo Numérico",
		"cargaHoraria" : 60,
		"equivalente" : "Enriquecimento Curricular: Cálculo Numérico",
		"qtdEquivalente" : 0
		
	},{/*Quarto Periodo*/
		"nome": "Análise de Algoritmos",
		"cargaHoraria" : 60,
		"equivalente" : "Análise de Algoritmos",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Linguagens Formais, Autômatos e Computabilidade",
		"cargaHoraria" : 60,
		"equivalente" : "Teoria da Computação",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Sistemas Microcontrolados",
		"cargaHoraria" : 60,
		"equivalente" : "Computação Física",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Redes de Computadores 1",
		"cargaHoraria" : 60,
		"equivalente" : "Redes de Computadores",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Banco de Dados 2",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Banco de Dados Avançados",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Programação de Aplicativos",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Desenvolviemnto de Jogos",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Sistemas Operacionais",
		"cargaHoraria" : 60,
		"equivalente" : "Sistemas Operacionais",
		"qtdEquivalente" : 1
		
	},{/*Quinto Periodo*/
		"nome": "Linguagens de Programação",
		"cargaHoraria" : 60,
		"equivalente" : "Aspectos de Linguagens de Programação",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Teoria dos Grafos",
		"cargaHoraria" : 60,
		"equivalente" : "Algoritmos em Grafos",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Projeto Integrador",
		"cargaHoraria" : 60,
		"equivalente" : "Projeto Integrador",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Redes de Computadores 2",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Redes",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Engenharia de Software 1",
		"cargaHoraria" : 60,
		"equivalente" : "Engenharia de Software",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Computação Gráfica",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Computação Gráfica",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Inteligência Artificial",
		"cargaHoraria" : 60,
		"equivalente" : "Inteligência Computacional",
		"qtdEquivalente" : 1
		
	},{/*Sexto Periodo*/
		"nome": "Metodologia de Pesquisa",
		"cargaHoraria" : 60,
		"equivalente" : "Metodologia de Pesquisa em Computação",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Compiladores",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Implementação de Linguagens de Programação",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Sistemas Distribuídos",
		"cargaHoraria" : 60,
		"equivalente" : "optativa: Sistemas Distribuídos",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Segurança e Auditória de Sistemas",
		"cargaHoraria" : 60,
		"equivalente" : "Cibersegurança",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Engenharia de Software 2",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Qualidade de Software ou Teste de Software",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Precessamento de Imagens",
		"cargaHoraria" : 60,
		"equivalente" : "Precessamento de Imagens",
		"qtdEquivalente" : 1
		
	},{/*Setimo Periodo*/
		"nome": "Tópicos Avançados em Ciência da Computação 1",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Trabalho de Conclusão de Curso 1",
		"cargaHoraria" : 60,
		"equivalente" : "Trabalho de Comclusão de Curso 1",
		"qtdEquivalente" : 1
		
	},{/*Oitavo Periodo*/
		"nome": "Empreendedorismo",
		"cargaHoraria" : 60,
		"equivalente" : "Empreendedorismo",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Tópicos Avançados em Ciência da Computação 2",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa",
		"qtdEquivalente" : 1
		
	},{
		"nome": "Trabalho de Conclusão de Curso 2",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa",
		"qtdEquivalente" : 1
		
	}
]

router.get('/', function(req, res){
	//res.send("AAAA");
	res.sendFile(path.join(__dirname+'/index.html'));
});

//<script src="index.js"></script>
var valor = cargaHoraAnt;
var restanteAnt = qtdDiscAnt;
var restanteNova = qtdDiscNov;
app.post('/dados', function(req, res){
	for(const disciplina of req.body.disciplinas){
		console.log(`Nome da disciplina é: ${disciplina}`);
			const nome = materias.find(materia => materia.nome === disciplina);
			if(nome != null){
				console.log('ENTREI');
				console.log(`Nome da matéria é: ${nome.nome}`);
				valor = valor - nome.cargaHoraria;
				console.log(valor);

				//carga hóraria da nova;
				restanteAnt = restanteAnt - (nome.qtdEquivalente);
				restanteNova = restanteNova - (nome.qtdEquivalente);
				console.log(restanteAnt);
				console.log(restanteNova);
				res.json({Carga : valor, HoraNova: restanteNova, HoraAnt: restanteAnt});
			}
			/*else{
				res.json({message: 'Nao'});
			}*/
	}
	valor = cargaHoraAnt;
	restanteAnt = qtdDiscAnt;
	restanteNova = qtdDiscNov;

});

app.use('/', router);
let port = process.env.PORT || 8080;

app.listen(port, (req,res)=>{
    console.log('Servidor Rodando');
});

/*var a = 'kaka';

var conteudo = `

		<h1 style='color: blue'>RESULTADO</h1>
		<hr>
		<p> Gay </p>
		<p> ${a} </p>



`

pdf.create(conteudo, {}).toFile("/Meu computador/Downloads/u.pdf", (err, res)=>{
	if(err){
		console.log("ERRO");
	}else{
		console.log(res);
	}
});*/
