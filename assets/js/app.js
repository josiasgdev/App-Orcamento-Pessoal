//Criação da classe despesa com os atributos utilizando constructor funcion
class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }

  //validação dos atributos
  validarDados() {
    //percorrer cada um dos elementos dentro da despesa
    for (let i in this) {
      //acessando os atributos do objeto
      if (this[i] === undefined || this[i] === "" || this[i] === null) {
        return false;
      }
    }
    return true;
  }
}

//Início da classe BD
class Bd {
  constructor() {
    //Cria no local storage um item atribuído a uma chave chamada 'id'
    let id = localStorage.getItem("id");

    if (id === null) {
      //(Em caso de não existir nenhuma chave criada) Atribui à chave id o valor de 0 caso o valor de id seja null
      localStorage.setItem("id", 0);
    }
  }
  getProximoId() {
    //busca o valor da chave Id e o atribui à variável proximoID
    let proximoId = localStorage.getItem("id");
    //retorna o valor recebido da chave Id somado a 1
    return parseInt(proximoId) + 1;
  }
  //Método para transformar cada objeto criado em notação JSON e armazená-lo no localStorage do browser
  gravar(d) {
    //atribui o valor da chave id somado a 1 pelo método getProximoId() à variável id
    let id = this.getProximoId();
    //identifica o objeto onde a informação será armazenada(id) e envia o dado a ser armazenado(instâcia do objeto literal como notação JSON)
    localStorage.setItem(id, JSON.stringify(d));
    //Atualiza o valor da chave Id com o valor recuperado
    localStorage.setItem("id", id);
  }

  //Método para recuperar os registros para carregarListaDespesas no body de consulta.html
  recuperarTodosRegistros() {

    //array de despesas
    let despesas = Array()

    //Associa o item do localStorage denominado como 'id' à variável id
    let id = localStorage.getItem('id')
    //recuperar todas as despesas cadastradas em localStorage
    for (let i = 1; i <= id; i++) {

      //recuperar a despesa e convertê-la de string JSON para objeto literal
      let despesa = JSON.parse(localStorage.getItem(i))
      //existe a possiblidade de índices que foram removidos?
      if (despesa === null) {
        continue
      }
      //Atributo dentro do objeto despesa recuperado pela método recuperarTodosRegistros
      despesa.id = i
      //insere a depesa referida no laço no array despesas
      despesas.push(despesa)
    }
    return despesas
  }

  pesquisar(despesa) {
    //Cria um array que ao ser exibido, motrará as despesas filtradas e o associa à uma variável
    let despesasFiltradas = Array()
    //Utiliza a lógica da função recuperarTodosRegistros para fazer uma busca de todas as despesas e adiciona elas ao array despesasFiltradas
    despesasFiltradas = this.recuperarTodosRegistros()
    console.log(despesasFiltradas)

    //filtro ano
    if (despesa.ano != '') {
      console.log('filtro de ano')
      despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
    }
    //filtro mes
    if (despesa.mes != '') {
      console.log('filtro de mês')
      despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
    }
    //filtro dia
    if (despesa.dia != '') {
      console.log('filtro de dia')
      despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
    }
    //filtro tipo
    if (despesa.tipo != '') {
      console.log('filtro de tipo')
      despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
    }
    //filtro descrição
    if (despesa.descricao != '') {
      console.log('filtro de descrição')
      despesasFiltradas = despesasFiltradas.filter(d => d.descricao.toLowerCase().includes(despesa.descricao.toLowerCase()))
    }
    //filtro valor
    if (despesa.valor != '') {
      console.log('filtro de valor')
      despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
    }

    return despesasFiltradas

  }//Fim do filtro de despesas

  //Método para remover despesa pelo id
  remover(id) {
    id = parseInt(id)
    localStorage.removeItem(id)

    //Exibe o modal de confirmação
    //Através do id, insere o seguinte texto no elemento html referido.
    document.getElementById('modal_titulo').innerHTML = 'Registro excluído com sucesso.'
    //através do id, altera o nome da class do elemento referido
    document.getElementById('modal_titulo_div').className = 'modal-header text-info'
    //Através do id, insere o seguinte texto no elemento html referido.
    document.getElementById('modal_conteudo').innerHTML = 'Despesa foi removida com sucesso!'
    //Através do id, insere o seguinte texto no elemento html referido.
    document.getElementById('modal_btn').innerHTML = 'Voltar'
    //através do id, altera o nome da class do elemento referido
    document.getElementById('modal_btn').className = 'btn btn-info'


    //Exibe o modal
    $("#modalRegistraDespesa").modal("show")

    // Após o modal ser fechado, recarrega a tabela de despesas
    $('#modalRegistraDespesa').on('hidden.bs.modal', () => {
      carregarListaDespesas();
    });
  }
}
//Fim da classe BD
//Instanciando o classe BD
let bd = new Bd();

//Criação da função de cadastro das despesas, onde cada campo é anexado a uma variável para manipulação dos dados de cada campo
function cadastrarDespesa() {
  let ano = document.getElementById("ano")
  let mes = document.getElementById("mes")
  let dia = document.getElementById("dia")
  let tipo = document.getElementById("tipo")
  let descricao = document.getElementById("descricao")
  let valor = document.getElementById("valor")

  //Instanciando  obojeto despesa
  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  );

  ////validação dos atributos
  if (despesa.validarDados()) {
    //envia a despesa criad como parâmetro para o método 'gravar' da classe Bd
    bd.gravar(despesa)
    //Através do id, insere o seguinte texto no elemento html referido.
    document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso.'
    //através do id, altera o nome da class do elemento referido
    document.getElementById('modal_titulo_div').className = 'modal-header text-success'
    //Através do id, insere o seguinte texto no elemento html referido.
    document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
    //Através do id, insere o seguinte texto no elemento html referido.
    document.getElementById('modal_btn').innerHTML = 'Voltar'
    //através do id, altera o nome da class do elemento referido
    document.getElementById('modal_btn').className = 'btn btn-success'

    $("#modalRegistraDespesa").modal("show")

    //Limpar os campos após o preenchimento correto
    ano.value = ''
    mes.value = ''
    dia.value = ''
    tipo.value = 'Tipo'
    descricao.value = ''
    valor.value = ''
  } else {
    //Através do id, insere o seguinte texto no elemento html referido.
    document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro.'
    //através do id, altera o nome da class do elemento referido
    document.getElementById('modal_titulo_div').className = 'modal-heder text-danger'
    //Através do id, insere o seguinte texto no elemento html referido.
    document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente.'
    //Através do id, insere o seguinte texto no elemento html referido.
    document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
    //através do id, altera o nome da class do elemento referido
    document.getElementById('modal_btn').className = 'btn btn-danger'
    //dialog de sucesso
    $("#modalRegistraDespesa").modal("show")
  }
}

//Carregar lista de despesas
/*Essa função receve um por dafult um array como parâmetro, 
pois pode ser chamada pela função pesquisarDespesa(despesas) 
ou pode ser chamado pelo onload de body consulta.html*/
function carregarListaDespesas(despesas = Array(), filtro = false) {//Início da função carregarListaDispesas

  /*Essa condicional verifica se o a função foi chamada pelo onload ou pela função pesquisarDespesa(despesas)
  analisando se foi passado um array ou não.
  */
  if (despesas.length == 0 && filtro == false) {
    /*Caso não tenha sido passado nenhum tipo de array, 
    o array do método bd.recuperarTodosRegistros é associado ao default 
    atribuído na criação da função carregarListaDespesas. 
    E a segunda parte da condicional verifica se é ou não uma ação de filtragem*/
    despesas = bd.recuperarTodosRegistros()
  }
  //selecionando o elemento tbody da tabela
  let listaDespesas = document.getElementById('listaDespesas')
  listaDespesas.innerHTML = ''
  //percorrer o array despesas, listando cada despesa de forma dinâmica
  despesas.forEach(function (d) {
    //criando a linha (tr)
    let linha = listaDespesas.insertRow()
    // criar as colunas (td)
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

    //ajustar o tipo
    switch (d.tipo) {
      case '1': d.tipo = 'Alimentação'
        break
      case '2': d.tipo = 'Educação'
        break
      case '3': d.tipo = 'Lazer'
        break
      case '4': d.tipo = 'Saúde'
        break
      case '5': d.tipo = 'Transporte'
        break
    }
    linha.insertCell(1).innerHTML = d.tipo
    linha.insertCell(2).innerHTML = d.descricao
    linha.insertCell(3).innerHTML = d.valor

    //Botão de exclusão

    //Cria o elemento e o atribui a uma variável
    let btn = document.createElement("button")
    //Atribui a ele uma class do bootstrap
    btn.className = "btn btn-danger"
    //Insere um ícone do Font Awesome
    btn.innerHTML = '<i class="fa fa-times"></i>'
    //Associa a variável usada dentro do foreach de criação dos objetos de despesa para associação do botão à despesa
    btn.id = `id_despesa_ ${d.id}`
    btn.onclick = function () {//Remover a despesa
      //formatar a string e remover a template string "id_despesa_" para a busca e remoção no localStorage
      let id = this.id.replace('id_despesa_', '')
      bd.remover(id)
    }
    //Insere o elemento na quarta coluna na linha respectiva à despesa
    linha.insertCell(4).append(btn)
  })
}//Fim da função carregarListaDispesas

function pesquisarDespesa() {
  let ano = document.getElementById('ano').value
  let mes = document.getElementById('mes').value
  let dia = document.getElementById('dia').value
  let tipo = document.getElementById('tipo').value
  let descricao = document.getElementById('descricao').value
  let valor = document.getElementById('valor').value


  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

  let despesas = bd.pesquisar(despesa)

  /*O parâmetro true indica que nesta chamada da função o parâmetro é verdadeiro
  Fazendo com que caso um campo seja preenchido com um valor inexistente, 
  todo código de geração de linha e colunas funcione, porém, sem exibir dentro das mesmas.
  Pois se o conteúdo pesquisado não existe dentro dos objetos e do array, 
  não tem como exibi-lo na pesquisa, retornando um campo vazio*/
  carregarListaDespesas(despesas, true)

}
