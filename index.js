const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();			
const path = require('path');
const router = express.Router();
const fs = require('fs');
const dados = require('./dados.json');
const exphbs = require('express-handlebars');
app.engine('hbs', exphbs.engine({ extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const pdf = require('html-pdf');

/*
Falta:
Gerar json,
fazer uma quantidade optativa diff de equivamente, 
transformar em html,
Deixar bonito,
Colocar no pdf(html para pdf) 

*/

var qtdDiscAnt = 43; //decrementa 1, sempre
var qtdDiscNov = 33; //decrementa de qtdEquivamente ??colocar ttc 1/2??
var cargaHoraAnt = 2625; //decrementa da carga horaria 
var cargaHoraNova = 1735; //
var optativaAnt = 6; //decrementa ta optativa escrita, se menor que 0 nenhuma restante
var optativaNova = 10; //decrementa de eOptativa
var humanasAnt = 3; //decrementa da optativa escrecrita, se menor que 0 nunhuem restante
var humanasNova = 1; // decrementa de eHumana
var extensao = 330;

let materias = [
	/*Primeiro Periodo*/
	{
		"nome": "Algoritmos",
		"cargaHoraria" : 105,
		"equivalente" : "Introdução à Programação, Algoritmos",
		"qtdEquivalente" : 2,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 120

	},{
		"nome": "Cálculo Diferencial e Integral 1",
		"cargaHoraria" : 90,
		"equivalente" : "Cálculo Diferencial e Integral 1, Pré-Cálculo",
		"qtdEquivalente" : 2,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 105 //pré calculo?

	},{
		"nome": "Comunicação Linguística",
		"cargaHoraria" : 30,
		"equivalente" : "Comunicação Linguística",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 30

	},{
		"nome": "Ética, Profissão e Cidadania",
		"cargaHoraria" : 30,
		"equivalente" : "Ética em Computação",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 30
		
	},{
		"nome": "Geometria Analítica e Álgebra Linear",
		"cargaHoraria" : 90,
		"equivalente" : "Álgebra Linear",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Introdução à Ciência da Computação",
		"cargaHoraria" : 45,
		"equivalente" : "Computação e Tecnologia",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Lógica Matemática",
		"cargaHoraria" : 60,
		"equivalente" : "Ética em Computação",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{ /*Segundo Periodo*/
		"nome": "Algoritmos e Estruturas de Dados 1",
		"cargaHoraria" : 90,
		"equivalente" : "Algoritmos e Estruturas de Dados 1",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Elementos de Lógica Digital",
		"cargaHoraria" : 60,
		"equivalente" : "Elementos de Lógica Digital",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Fundamentos de Administração",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa de Humanas: Viabilidade Econômica",
		"qtdEquivalente" : 0,
		"eOptativa": 0,
		"eHumana": 1,
		"horaEquivalente": 0 //?? carga vira 30??
		
	},{
		"nome": "Física 3",
		"cargaHoraria" : 75,
		"equivalente" : "Enriquecimento Curricular: Física 3",
		"qtdEquivalente" : 0, 
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 0
		
	},{
		"nome": "Probabilidade e Estatística",
		"cargaHoraria" : 60,
		"equivalente" : "Probabilidade e Estatística",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{ /*Terçero Periodo*/
		"nome": "Algoritmos e Estruturas de Dados 2",
		"cargaHoraria" : 90,
		"equivalente" : "Algoritmos e Estruturas de Dados 2",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Arquitetura e Organização de Computadores",
		"cargaHoraria" : 60,
		"equivalente" : "Arquitetura e Organização de Computadores",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Interação Homem-Computador",
		"cargaHoraria" : 60,
		"equivalente" : "Interação Homem-Computador",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Análise e Projeto Orientado a Objetos",
		"cargaHoraria" : 60,
		"equivalente" : "Análise e Projeto de Software",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Banco de Dados 1",
		"cargaHoraria" : 60,
		"equivalente" : "Banco de Dados",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Cálculo Numérico",
		"cargaHoraria" : 60,
		"equivalente" : "Enriquecimento Curricular: Cálculo Numérico",
		"qtdEquivalente" : 0,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 0
		
	},{/*Quarto Periodo*/
		"nome": "Análise de Algoritmos",
		"cargaHoraria" : 60,
		"equivalente" : "Análise de Algoritmos",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Linguagens Formais, Autômatos e Computabilidade",
		"cargaHoraria" : 60,
		"equivalente" : "Teoria da Computação",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Sistemas Microcontrolados",
		"cargaHoraria" : 60,
		"equivalente" : "Computação Física",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Redes de Computadores 1",
		"cargaHoraria" : 60,
		"equivalente" : "Redes de Computadores",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Banco de Dados 2",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Banco de Dados Avançados",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0
		
	},{
		"nome": "Programação de Aplicativos",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Desenvolvimento de Jogos",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0
		
	},{
		"nome": "Sistemas Operacionais",
		"cargaHoraria" : 60,
		"equivalente" : "Sistemas Operacionais",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{/*Quinto Periodo*/
		"nome": "Linguagens de Programação",
		"cargaHoraria" : 60,
		"equivalente" : "Aspectos de Linguagens de Programação",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Teoria dos Grafos",
		"cargaHoraria" : 60,
		"equivalente" : "Algoritmos em Grafos",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Projeto Integrador",
		"cargaHoraria" : 60,
		"equivalente" : "Projeto Integrador",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Redes de Computadores 2",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Redes",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0
		
	},{
		"nome": "Engenharia de Software 1",
		"cargaHoraria" : 60,
		"equivalente" : "Engenharia de Software",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Computação Gráfica",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Computação Gráfica",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0
		
	},{
		"nome": "Inteligência Artificial",
		"cargaHoraria" : 60,
		"equivalente" : "Inteligência Computacional",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{/*Sexto Periodo*/
		"nome": "Metodologia de Pesquisa",
		"cargaHoraria" : 30,
		"equivalente" : "Metodologia de Pesquisa em Computação",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Compiladores",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Implementação de Linguagens de Programação",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0
		
	},{
		"nome": "Sistemas Distribuídos",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Sistemas Distribuídos",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0
		
	},{
		"nome": "Segurança e Auditoria de Sistemas",
		"cargaHoraria" : 60,
		"equivalente" : "Cibersegurança",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{
		"nome": "Engenharia de Software 2",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Qualidade de Software ou Teste de Software",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0
		
	},{
		"nome": "Processamento de Imagens",
		"cargaHoraria" : 60,
		"equivalente" : "Processamento de Imagens",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{/*Setimo Periodo*/
		"nome": "Tópicos Avançados em Ciência da Computação 1",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0
		
	},{
		"nome": "Trabalho de Conclusão de Curso 1",
		"cargaHoraria" : 60,
		"equivalente" : "Trabalho de Conclusão de Curso 1",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	},{/*Oitavo Periodo*/
		"nome": "Empreendedorismo",
		"cargaHoraria" : 30,
		"equivalente" : "Empreendedorismo",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 30
		
	},{
		"nome": "Tópicos Avançados em Ciência da Computação 2",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0
		
	},{
		"nome": "Trabalho de Conclusão de Curso 2",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60
		
	}
]

router.get('/', function(req, res){
	//res.sendFile(path.join(__dirname+'/index.html'));
	res.render('index');
});


var valor = cargaHoraAnt;
var restanteAnt = qtdDiscAnt;
var restanteNova = qtdDiscNov;
var qtdOptativaAnt = optativaAnt; //decrementa ta optativa escrita, se menor que 0 nenhuma restante
var qtdOptativaNov = optativaNova;
var qtdHumanaAnt = humanasAnt; //decrementa da optativa escrecrita, se menor que 0 nunhuem restante
var qtdHumanaNova = humanasNova; 
var horasExtensao = extensao;
var restanteHoraNova = cargaHoraNova;

app.post('/resultado', function(req, res,next){
	dados.data = [];
	dados.dat = [];
	qtdOptativaAnt = qtdOptativaAnt - req.body.optativaAnti;
	qtdHumanaAnt = qtdHumanaAnt - req.body.humanasAnti;
	horasExtensao = horasExtensao - req.body.extensao;
	if((!req.body.disciplinas) == true){
		next('Selecione ao menos uma disciplina');
	}
		console.log(!req.body.disciplinas);
		console.log(req.body.disciplinas);
		for(const disciplina of req.body.disciplinas){
			console.log(disciplina);
			const nome = materias.find(materia => materia.nome === disciplina);
				if(nome != null){
					dados.data.push({
						disciplina: `${nome.nome}`,
						equivalente: `${nome.equivalente}`
					})
					//carga hóraria da nova;
					valor = valor - nome.cargaHoraria;
					restanteHoraNova =  restanteHoraNova - (nome.horaEquivalente);
					restanteAnt = restanteAnt - 1;
					restanteNova = restanteNova - (nome.qtdEquivalente);
					qtdOptativaNov = qtdOptativaNov - (nome.eOptativa);
					qtdHumanaNova = qtdHumanaNova - (nome.eHumana);
				}
		}
		//console.log(restanteHoraNova);
		qtdOptativaNov = qtdOptativaNov - req.body.optativaAnti;
		qtdHumanaNova = qtdHumanaNova - req.body.humanasAnti;
		if(qtdOptativaNov < 0){
			qtdOptativaNov = 0;
		}
		if(qtdHumanaNova < 0){
			qtdHumanaNova = 0;
		}
		if(qtdOptativaAnt < 0){
			qtdOptativaAnt = 0;
		}
		if(qtdHumanaAnt < 0){
			qtdHumanaAnt = 0;
		}
		if(horasExtensao < 0){
			horasExtensao = 0;
		}
		dados.dat.push({horaAnt: valor, materiaAnt: restanteAnt, 
			materiaNova: restanteNova, optativaNova: qtdOptativaNov, humanaNova: qtdHumanaNova, 
			extensao: horasExtensao, optativaAntiga: qtdOptativaAnt, humanaAntiga: qtdHumanaAnt, 
			horaNova: restanteHoraNova});
		//console.log(dados.dat);
		res.render('dadoss', {dados:dados});

	    /*resetando os valores*/
		valor = cargaHoraAnt;
		restanteAnt = qtdDiscAnt;
		restanteNova = qtdDiscNov;
		qtdOptativaAnt = optativaAnt;
		qtdOptativaNov = optativaNova;
		qtdHumanaAnt = humanasAnt;
		qtdHumanaNova = humanasNova; 
		horasExtensao = extensao;
		restanteHoraNova = cargaHoraNova;
});

app.get('/resultado', function(req, res, netx){
	res.render('erro');
	res.end();
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
