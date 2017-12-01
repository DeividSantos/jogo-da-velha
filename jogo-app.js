var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready(function(){

  $("#btn-iniciar-jogo").click(function(){

    // valida a digitação dos apelidos dos jogadores
    if($("#edt-nome-jogador1").val() == ""){
      alert("preencha o apelido do jogador 1");
      return false;
    }

    if($("#edt-nome-jogador2").val() == ""){
      alert("preencha o apelido do jogador 2");
      return false;
    }

    $("#nome-jogador1").html($("#edt-nome-jogador1").val());
    $("#nome-jogador2").html($("#edt-nome-jogador2").val());

    $("#pagina-inicial").hide();
    $("#palco-jogo").show();
  })

  $(".jogada").click(function(){
    var id_clicado = this.id;
    $("#"+id_clicado).off();
    jogada(id_clicado);
  })

  function jogada(id){
    var icone = "";
    var ponto = 0;

    if((rodada % 2) == 1){
      icone = "url(imagens/marcacao_1.png)";
      ponto = -1;
    }else{
      icone = "url(imagens/marcacao_2.png)";
      ponto = 1;
    }

    rodada++;

    $("#"+id).css("background-image",icone);

    var linha_coluna = id.split('-');

    matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;
    verifica_combinacao();

  }

  function verifica_combinacao(){

    //Verifica na Horizontal
    //Coluna 1
    var pontos = 0;
    for (var i = 1; i <= 3; i++) {
      pontos = pontos + matriz_jogo['a'][i];
    }
    ganhador(pontos);

    //Coluna 2
    pontos = 0;
    for (var i = 1; i <= 3; i++) {
      pontos = pontos + matriz_jogo['b'][i];
    }
    ganhador(pontos);

    //Coluna 3
    pontos = 0;
    for (var i = 1; i <= 3; i++) {
      pontos = pontos + matriz_jogo['c'][i];
    }
    ganhador(pontos);

    //Verifica na Vertical
    for(var l = 1; l <= 3; l++){
      pontos = 0;
      //Coluna 1
      pontos += matriz_jogo['a'][l];
      //Coluna 2
      pontos += matriz_jogo['b'][l];
      //Coluna 3
      pontos += matriz_jogo['c'][l];

      ganhador(pontos);
    }

    //Verifica na diagonal
    pontos = 0;
    pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
    ganhador(pontos);

    pontos = 0;
    pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
    ganhador(pontos);

  }

  function ganhador(pontos){
    if (pontos == -3){
      alert($("#edt-nome-jogador1").val() +" é o vencedor");
      $(".jogada").off();
    }else if (pontos == 3){
        alert($("#edt-nome-jogador2").val() +" é o vencedor");
        $(".jogada").off();
    }
  }
})
