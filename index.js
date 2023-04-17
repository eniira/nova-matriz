
const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();			
const path = require('path');
const router = express.Router();
const fs = require('fs');
const puppeteer = require('puppeteer');
const dados = require('./dados.json');
const exphbs = require('express-handlebars');
app.engine('hbs', exphbs.engine({ extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const pdf = require('html-pdf');

var qtdDiscAnt = 43; //decrementa 1, sempre
var qtdDiscNov = 33; //decrementa de qtdEquivamente ??colocar ttc 1/2??
var cargaHoraAnt = 2625; //decrementa da carga horaria 
var cargaHoraNova = 1875; //1735
var optativaAnt = 6; //decrementa ta optativa escrita, se menor que 0 nenhuma restante
var optativaNova = 10; //decrementa de eOptativa
var humanasAnt = 3; //decrementa da optativa escrecrita, se menor que 0 nunhuem restante
var humanasNova = 1; // decrementa de eHumana
var extensao = 330;
var periodo1 = 285;
var periodo2 = 330;
var periodo3 = 360;
var periodo4 = 330;
var periodo5 = 300;
var periodo6 = 360;
var periodo7 = 360;
var periodo8 = 180;

let materias = [
	/*Primeiro Periodo*/
	{
		"nome": "Algoritmos",
		"cargaHoraria" : 105,
		"equivalente" : "Introdução à Programação, Algoritmos",
		"qtdEquivalente" : 2,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 120,
		"periodoEquivalente" : 12 //os 2 periodos

	},{
		"nome": "Cálculo Diferencial e Integral 1",
		"cargaHoraria" : 90,
		"equivalente" : "Cálculo Diferencial e Integral 1, Pré-Cálculo",
		"qtdEquivalente" : 2,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 105,
		"periodoEquivalente" : 12//os 2 periodos

	},{
		"nome": "Comunicação Linguística",
		"cargaHoraria" : 30,
		"equivalente" : "Comunicação Linguística",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 30,
		"periodoEquivalente" : 1

	},{
		"nome": "Ética, Profissão e Cidadania",
		"cargaHoraria" : 30,
		"equivalente" : "Ética em Computação",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 30,
		"periodoEquivalente" : 1
		
	},{
		"nome": "Geometria Analítica e Álgebra Linear",
		"cargaHoraria" : 90,
		"equivalente" : "Álgebra Linear, Optativa: Geometria Analítica",
		"qtdEquivalente" : 1,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 3
		
	},{
		"nome": "Introdução à Ciência da Computação",
		"cargaHoraria" : 45,
		"equivalente" : "Computação e Tecnologia",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 1
		
	},{
		"nome": "Lógica Matemática",
		"cargaHoraria" : 60,
		"equivalente" : "Lógica Matemática",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 4
		
	},{ /*Segundo Periodo*/
		"nome": "Algoritmos e Estruturas de Dados 1",
		"cargaHoraria" : 90,
		"equivalente" : "Algoritmos e Estruturas de Dados 1",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 3
		
	},{
		"nome": "Elementos de Lógica Digital",
		"cargaHoraria" : 60,
		"equivalente" : "Elementos de Lógica Digital",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 1
		
	},{
		"nome": "Fundamentos de Administração",
		"cargaHoraria" : 60,
		"equivalente" : "Enriquecimento Curricular: Fundamentos de Administração",
		"qtdEquivalente" : 0,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 0 ,
		"periodoEquivalente" : 0
		
	},{
		"nome": "Física 3",
		"cargaHoraria" : 75,
		"equivalente" : "Optativa: Física 3",
		"qtdEquivalente" : 0, 
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0,
		"periodoEquivalente" : 0		
	},{
		"nome": "Probabilidade e Estatística",
		"cargaHoraria" : 60,
		"equivalente" : "Probabilidade e Estatística",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 3
		
	},{ /*Terçero Periodo*/
		"nome": "Algoritmos e Estruturas de Dados 2",
		"cargaHoraria" : 90,
		"equivalente" : "Algoritmos e Estruturas de Dados 2",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 4
		
	},{
		"nome": "Arquitetura e Organização de Computadores",
		"cargaHoraria" : 60,
		"equivalente" : "Arquitetura e Organização de Computadores",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 2
		
	},{
		"nome": "Interação Homem-Computador",
		"cargaHoraria" : 60,
		"equivalente" : "Interação Homem-Computador",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 3
		
	},{
		"nome": "Análise e Projeto Orientado a Objetos",
		"cargaHoraria" : 60,
		"equivalente" : "Análise e Projeto de Software",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 2
		
	},{
		"nome": "Banco de Dados 1",
		"cargaHoraria" : 60,
		"equivalente" : "Banco de Dados",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 2
		
	},{
		"nome": "Cálculo Numérico",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Cálculo Numérico",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0,
		"periodoEquivalente" : 0 		
	},{/*Quarto Periodo*/
		"nome": "Análise de Algoritmos",
		"cargaHoraria" : 60,
		"equivalente" : "Análise de Algoritmos",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 5
		
	},{
		"nome": "Linguagens Formais, Autômatos e Computabilidade",
		"cargaHoraria" : 60,
		"equivalente" : "Teoria da Computação",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 5 
		
	},{
		"nome": "Sistemas Microcontrolados",
		"cargaHoraria" : 60,
		"equivalente" : "Computação Física",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 4
		
	},{
		"nome": "Redes de Computadores 1",
		"cargaHoraria" : 60,
		"equivalente" : "Redes de Computadores",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 3
		
	},{
		"nome": "Banco de Dados 2",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Banco de Dados Avançados",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0,
		"periodoEquivalente" : 0	
	},{
		"nome": "Programação de Aplicativos",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Desenvolvimento de Jogos",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0,
		"periodoEquivalente" : 0		
	},{
		"nome": "Sistemas Operacionais",
		"cargaHoraria" : 60,
		"equivalente" : "Sistemas Operacionais",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 5
		
	},{/*Quinto Periodo*/
		"nome": "Linguagens de Programação",
		"cargaHoraria" : 60,
		"equivalente" : "Aspectos de Linguagens de Programação",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 6
		
	},{
		"nome": "Teoria dos Grafos",
		"cargaHoraria" : 60,
		"equivalente" : "Algoritmos em Grafos",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 6
		
	},{
		"nome": "Projeto Integrador",
		"cargaHoraria" : 60,
		"equivalente" : "Projeto Integrador",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 5
		
	},{
		"nome": "Redes de Computadores 2",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Redes",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0,
		"periodoEquivalente" : 0	
	},{
		"nome": "Engenharia de Software 1",
		"cargaHoraria" : 60,
		"equivalente" : "Engenharia de Software",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 3 
		
	},{
		"nome": "Computação Gráfica",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Computação Gráfica",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0,
		"periodoEquivalente" : 0		
	},{
		"nome": "Inteligência Artificial",
		"cargaHoraria" : 60,
		"equivalente" : "Inteligência Computacional",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 6
		
	},{/*Sexto Periodo*/
		"nome": "Metodologia de Pesquisa",
		"cargaHoraria" : 30,
		"equivalente" : "Metodologia de Pesquisa em Computação",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 4
		
	},{
		"nome": "Compiladores",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Implementação de Linguagens de Programação",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0,
		"periodoEquivalente" : 0	
	},{
		"nome": "Sistemas Distribuídos",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Sistemas Distribuídos",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0,
		"periodoEquivalente" : 0 		
	},{
		"nome": "Segurança e Auditoria de Sistemas",
		"cargaHoraria" : 60,
		"equivalente" : "Cibersegurança",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 5
		
	},{
		"nome": "Engenharia de Software 2",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa: Qualidade de Software ou Teste de Software",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0,
		"periodoEquivalente" : 0		
	},{
		"nome": "Processamento de Imagens",
		"cargaHoraria" : 60,
		"equivalente" : "Processamento de Imagens",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 4
		
	},{/*Setimo Periodo*/
		"nome": "Tópicos Avançados em Ciência da Computação 1",
		"cargaHoraria" : 60,
		"equivalente" : "Tópicos Especiais em Ciência da Computação 2",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0,
		"periodoEquivalente" : 0		
	},{
		"nome": "Trabalho de Conclusão de Curso 1",
		"cargaHoraria" : 60,
		"equivalente" : "Trabalho de Conclusão de Curso 1",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 7
		
	},{/*Oitavo Periodo*/
		"nome": "Empreendedorismo",
		"cargaHoraria" : 30,
		"equivalente" : "Empreendedorismo",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 30,
		"periodoEquivalente" : 4
		
	},{
		"nome": "Tópicos Avançados em Ciência da Computação 2",
		"cargaHoraria" : 60,
		"equivalente" : "Tópicos Especiais em Ciência da Computação 2",
		"qtdEquivalente" : 0,
		"eOptativa": 1,
		"eHumana": 0,
		"horaEquivalente": 0,
		"periodoEquivalente" : 0 		
	},{
		"nome": "Trabalho de Conclusão de Curso 2",
		"cargaHoraria" : 60,
		"equivalente" : "Optativa",
		"qtdEquivalente" : 1,
		"eOptativa": 0,
		"eHumana": 0,
		"horaEquivalente": 60,
		"periodoEquivalente" : 8
		
	}
]

let matOptativas = [

	{
		"nome": "Arquiteturas Avançadas de Computadores",
		"convalida": "Necessário Análise",
		"equivalencia": 0

	},{
		"nome": "Aprendizagem de Máquina",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Administração de Sistemas Unix",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Pesquisa Operacional",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Comunicação de Dados",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Computação Física",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Computação Movel",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Computação Musical",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Computação Verde",
		"convalida": "Computação Verde",
		"equivalencia": 1
	},{
		"nome": "Computação Paralela e Distribuída",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Desenvolvimento de Aplicações Computacionais para Apoio a Ensino e Aprendizagem",
		"convalida": "Objetos de Aprendizagem",
		"equivalencia": 1
	},{
		"nome": "Desenvolvimento de Jogos",
		"convalida": "Desenvolvimento de Jogos",
		"equivalencia": 1
	},{
		"nome": "Desenvolvimento de Software Livre",
		"convalida": "Software Livre",
		"equivalencia": 1
	},{
		"nome": "Desenvolvimento Web",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Engenharia de Software Empírica",
		"convalida": "Engenharia de Software Experimental",
		"equivalencia": 1
	},{
		"nome": "Interfaces não Convencionais",
		"convalida": "Interfaces não Convencionais",
		"equivalencia": 1
	},{
		"nome": "Laboratório de Banco de Dados",
		"convalida": "Laboratório de Banco de Dados",
		"equivalencia": 1
	},{
		"nome": "Laboratório de Programação Extrema",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Laboratório de Redes",
		"convalida": "Laboratório de Redes de Computadores e Cibersegurança",
		"equivalencia": 1
	},{
		"nome": "Mineração de Dados",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Modelagem e Implementação de Processos de Negócios",
		"convalida": "Gerenciamento de Processos de Negócios",
		"equivalencia": 1
	},{
		"nome": "Mineração de Repositório de Software",
		"convalida": "Mineração de Repositórios",
		"equivalencia": 1
	},{
		"nome": "Máquinas Virtuais e Emulação de Sistemas",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Desenvolvimento Orientado a Aspectos",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Programação Concorrente",
		"convalida": "Programação Concorrente",
		"equivalencia": 1
	},{
		"nome": "Paradigmas de Programação Paralela e Distribuída",
		"convalida": "Paradigmas de Programação Paralela e Distribuída",
		"equivalencia": 1
	},{
		"nome": "Programação Paralela e Concorrente",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Processamento de Transações",
		"convalida": "Transações em Banco de Dados",
		"equivalencia": 1
	},{
		"nome": "Recuperação de Informação",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Reconhecimento de Padrões",
		"convalida": "Reconhecimento de Padrões",
		"equivalencia": 1
	},{
		"nome": "Revisão Sistemática",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Software Básico",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Sistemas Colaborativos",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Segurança da Informação em Ambientes Open Source",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Switching e Redes Wan",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Sistemas Sensíveis ao Contexto",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Serviços Web",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Tecnicas de Descrição Formal",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Tecnologias da Informação e Comunicação",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Teste e Inspeção de Software",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Visão Computacional",
		"convalida": "Visão Computacional",
		"equivalencia": 1
	},{
		"nome": "Visualização de Dados",
		"convalida": "Visualização de Dados",
		"equivalencia": 1
	},{
		"nome": "Web Design",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	},{
		"nome": "Web Semantica",
		"convalida": "Necessário Análise",
		"equivalencia": 0
	}
]

router.get('/', function(req, res){
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
var periodo;
var periodoNova;
var periodoTotal = 0;
var count = 1;
var flag = 0;
var vagas3 = 3;
var vagas5 = 5;
var vagas2 = 2;

app.post('/resultado', function(req, res,next){
	dados.data = [];
	dados.dat = [];
	periodo = req.body.periodoAtual;
	periodoNova = periodo + 1; //atualiza o periodo, caso não volte
	qtdHumanaAnt = qtdHumanaAnt - req.body.humanasAnti;
	horasExtensao = horasExtensao - req.body.extensao;
	if((!req.body.disciplinas) == true){
		next('Selecione ao menos uma disciplina');
	}
		for(const disciplina of req.body.disciplinas){
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

					if(count <= 3 && nome.eOptativa == 1){
						periodo6 = periodo6 - 60;
						count++;
						vagas3--;
					}
					else if(count > 3 && count <= 8 && nome.eOptativa == 1){
						periodo7 = periodo7 - 60;
						count++;
						vagas5--;
					}
					else if(count > 8 && count <= 10 && nome.eOptativa == 1){
						periodo8 = periodo8 - 60;
						count++;
						vagas2--;
					}
					if(nome.periodoEquivalente == 12){
						if(nome.nome == 'Algoritmos'){
							periodo1 = periodo1 - 60;
							periodo2 = periodo2 - 60;
						}else{
							periodo1 = periodo1 - 45;
							periodo2 = periodo2 - 60;
						}
					}
					if(nome.periodoEquivalente == 1){
						periodo1 = periodo1 - nome.horaEquivalente;
						//console.log("periodo 1");
						//console.log(nome.nome);
					}
					if(nome.periodoEquivalente == 2){
						periodo2 = periodo2 - nome.horaEquivalente;
						//console.log("periodo 2");
						//console.log(nome.nome);
					}
					if(nome.periodoEquivalente == 3){
						periodo3 = periodo3 - nome.horaEquivalente;
						//console.log("periodo 3");
						//console.log(nome.nome);
					}
					if(nome.periodoEquivalente == 4){
						periodo4 = periodo4 - nome.horaEquivalente;
						//console.log("periodo 4");
						//console.log(nome.nome);
					}
					if(nome.periodoEquivalente == 5){
						periodo5 = periodo5 - nome.horaEquivalente;
						//console.log("periodo 5");
						//console.log(nome.nome);
					}
					if(nome.periodoEquivalente == 6){
						periodo6 = periodo6 - nome.horaEquivalente;
						//console.log("periodo 6");
						//console.log(nome.nome);
					}
					if(nome.periodoEquivalente == 7){
						periodo7 = periodo7 - nome.horaEquivalente;
						//console.log("periodo 7");
						//console.log(nome.nome);
					}
					if(nome.periodoEquivalente == 8){
						periodo8 = periodo8 - nome.horaEquivalente;
						//console.log("periodo 8");
						//console.log(nome.nome);
					}
				}
		}
		if(req.body.optativas != undefined){
			for(const optativa of req.body.optativas){
				const nome = matOptativas.find(matOptativa => matOptativa.nome === optativa);
				if(nome != null){
					dados.data.push({
						disciplina: `${nome.nome}`,
						equivalente: `${nome.convalida}`
					})
					qtdOptativaNov = qtdOptativaNov - (nome.equivalencia);
					qtdOptativaAnt = qtdOptativaAnt - (nome.equivalencia);
					if(nome.equivalencia == 1){
						if(vagas3 > 0 && periodo6 > 0){
							//console.log("entrou");
							periodo6 = periodo6 - 60;
							vagas3--;
						}else if(vagas5 > 0 && periodo7 > 0){
							//console.log("entrou3");
							periodo7 = periodo7 - 60;
							vagas5--;
						}else if(vagas2 > 0 && periodo8 > 0){
							//console.log("entrou6");
							periodo8 = periodo8 - 60;
							vagas2--;
						}
					}
				}
			}
		}


		/*console.log(periodo1);
		console.log(periodo2);
		console.log(periodo3);
		console.log(periodo4);
		console.log(periodo5);
		console.log(periodo6);
		console.log(periodo7);
		console.log(periodo8);*/

		if(req.body.humanasAnti >= 1){
			periodo2 = periodo2 - 30;
		}

		periodoTotal = periodo1;
		if(periodoTotal >= 288.28){
			periodoNova = 1;
			//console.log("periodo 1");
			//console.log(periodo1);
		}else{
			periodoTotal = periodoTotal + periodo2;
			if(periodoTotal >= 288.28){
				periodoNova = 2;
				//console.log("periodo 2");
				//console.log(periodo2);
			}else{
				periodoTotal = periodoTotal + periodo3;
				if(periodoTotal >= 288.28){
					periodoNova = 3;
					//console.log("periodo 3");
					//console.log(periodo3);
				}else {
					periodoTotal = periodoTotal + periodo4;
					if(periodoTotal >= 288.28){
						periodoNova = 4;
						//console.log("periodo 4");
						//console.log(periodo4);
					}else {
						periodoTotal = periodoTotal + periodo5;
						if(periodoTotal >= 288.28){
							periodoNova = 5;
							//console.log("periodo 5");
							//console.log(periodo5);
						}else {
							periodoTotal = periodoTotal + periodo6;
							if(periodoTotal >= 288.28){
								periodoNova = 6;
								//console.log("periodo 6");
								//console.log(periodo6);
							}else {
								periodoTotal = periodoTotal + periodo7;
								if(periodoTotal >= 288.28){
									periodoNova = 7;
									//console.log("periodo 7");
									//console.log(periodo7);
								}else {
									periodoTotal = periodoTotal + periodo8;
									if(periodoTotal >= 288.28 || periodoTotal < 288.28){
										periodoNova = 8;
										//console.log("periodo 8");
										//console.log(periodo8);
									}
								}
							}
						}
					}
				}
			}
		}
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
			horaNova: restanteHoraNova, periodoAtual: periodo, periodoNovo: periodoNova});
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
		periodo1 = 285;
		periodo2 = 330;
		periodo3 = 360;
		periodo4 = 330;
		periodo5 = 300;
		periodo6 = 360;
		periodo7 = 360;
		periodo8 = 180;
		periodoTotal = 0;
		count = 1;
		flag = 0;
		vagas3 = 3;
		vagas5 = 5;
		vagas2 = 2;

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

/*app.get('/download', function(req,res){
	dados.data = [];
	dados.dat = [];
	dados.dat.push({horaAnt: valor, materiaAnt: restanteAnt, 
			materiaNova: restanteNova, optativaNova: qtdOptativaNov, humanaNova: qtdHumanaNova, 
			extensao: horasExtensao, optativaAntiga: qtdOptativaAnt, humanaAntiga: qtdHumanaAnt, 
			horaNova: restanteHoraNova, periodoAtual: periodo, periodoNovo: periodoNova});
	res.render("./dadoss.hbs", {dados:dados}, (err, html) => {
		if(err){
			console.log("ERRO");
		}else{
			pdf.create(conteudo, {}).toFile("./simulacao.pdf", (err, res)=>{
				if(err){
					console.log("ERRO");
				}else{
				console.log(res);
				}
			});
		}
	});

});

async function createPDF(){

	var pdfPath = path.join('pdf', 'simulacao.pdf');

	var options = {
		width: '1230px',
		headerTemplate: "<p></p>",
		footerTemplate: "<p></p>",
		displayHeaderFooter: false,
		margin: {
			top: "10px",
			bottom: "30px"
		},
		printBackground: true,
		path: pdfPath
	} 

	const browser = await puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
		headless: true,
		executablePath:"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
	});

	var page = await browser.newPage();

	await page.goto('http://localhost:8080/resultado', {
		waitUntil: 'networkidle0'
	});

	await page.pdf(options);
	await browser.close();
}
*/