/* =====================================================================
   DADOS DO SITE — A∴R∴L∴S∴ Cavaleiros Templários de Praia Grande nº 455
   ---------------------------------------------------------------------
   Este é o ÚNICO arquivo que precisa ser editado no dia a dia.
   - Fotos: coloque os arquivos na pasta /fotos e use o caminho aqui.
   - Datas no formato AAAA-MM-DD.
   - Mantenha as vírgulas entre os itens e as aspas nos textos.
   - "exemplo" lista as seções que ainda têm dados de exemplo (mostram
     um aviso amarelo). Ao trocar os dados de uma seção, tire o nome dela
     da lista; quando todas estiverem prontas, deixe: exemplo: [],
   ===================================================================== */
window.CTPG = {
  exemplo: ["patrocinadores", "negocios", "albuns"],

  /* ---------- HINO ----------
     Coloque o arquivo de áudio em assets/ (ex.: assets/hino.mp3) e informe aqui.
     Deixe "" para esconder o botão de ouvir. */
  hinoAudio: "assets/hino.mp3",

  /* ---------- GALERIA DE VENERÁVEIS MESTRES ----------
     atual: true marca o Venerável em exercício.
     foto: caminho da foto (retrato 3x4). Sem foto, aparece uma silhueta. */
  veneraveis: [
    { nome: "Ir∴ Caio Renê Martins", periodo: "2026 – 2027", foto: "", atual: true,
      nota: "Irmão fundador." },
    { nome: "Ir∴ Henrique Ruiz Poiatos", periodo: "2025 – 2026", foto: "", atual: false,
      nota: "Irmão fundador." },
    { nome: "Ir∴ Adelio Servinsckins Oliveira", periodo: "2024 – 2025", foto: "", atual: false,
      nota: "Irmão fundador." },
    { nome: "Ir∴ Regivan Souza Cruz", periodo: "2023 – 2024", foto: "", atual: false,
      nota: "Irmão fundador." }
  ],

  /* ---------- PATROCINADORES ----------
     nivel: "ouro", "prata" ou "apoio" (define o tamanho do destaque). */
  patrocinadores: [
    { nome: "Empresa Patrocinadora", nivel: "ouro", logo: "", site: "https://www.exemplo.com.br",
      descricao: "Apoiadora das ações de benemerência da Loja." },
    { nome: "Comércio Parceiro", nivel: "prata", logo: "", site: "", descricao: "" },
    { nome: "Apoiador Local", nivel: "apoio", logo: "", site: "", descricao: "" }
  ],

  /* ---------- NEGÓCIOS DOS IRMÃOS ----------
     whatsapp: só números com DDD, ex. "13999999999". Deixe "" para não exibir. */
  negocios: [
    { irmao: "Ir∴ Nome do Irmão", empresa: "Nome da Empresa", ramo: "Advocacia",
      cidade: "Praia Grande", descricao: "Direito civil, trabalhista e previdenciário.",
      site: "", instagram: "", whatsapp: "", logo: "" },
    { irmao: "Ir∴ Nome do Irmão", empresa: "Nome da Empresa", ramo: "Construção e reformas",
      cidade: "Mongaguá", descricao: "Obras residenciais e comerciais na Baixada Santista.",
      site: "", instagram: "", whatsapp: "", logo: "" },
    { irmao: "Ir∴ Nome do Irmão", empresa: "Nome da Empresa", ramo: "Tecnologia",
      cidade: "Santos", descricao: "Soluções em TI e segurança da informação para empresas.",
      site: "", instagram: "", whatsapp: "", logo: "" }
  ],

  /* ---------- ÁLBUNS DE FOTOS ----------
     Crie uma pasta por álbum em /fotos (ex.: fotos/2026-07-instalacao/)
     e liste os arquivos. capa: a foto que aparece na lista de álbuns. */
  albuns: [
    { titulo: "Sessão Magna de Instalação e Posse", data: "2026-07-08",
      capa: "fotos/exemplo/1.svg",
      fotos: [
        { src: "fotos/exemplo/1.svg", legenda: "Foto de exemplo" },
        { src: "fotos/exemplo/2.svg", legenda: "Foto de exemplo" },
        { src: "fotos/exemplo/3.svg", legenda: "Foto de exemplo" },
        { src: "fotos/exemplo/4.svg", legenda: "Foto de exemplo" }
      ] },
    { titulo: "Sessão Magna de Iniciação", data: "2026-06-26",
      capa: "fotos/exemplo/5.svg",
      fotos: [
        { src: "fotos/exemplo/5.svg", legenda: "Foto de exemplo" },
        { src: "fotos/exemplo/6.svg", legenda: "Foto de exemplo" }
      ] }
  ],

  /* ---------- EVENTOS ----------
     Eventos com data futura aparecem em "Próximos"; os demais em "Anteriores".
     publico: true indica evento aberto a familiares e convidados. */
  eventos: [
    { data: "2026-07-08", titulo: "Sessão Magna de Instalação e Posse",
      descricao: "Instalação e posse da nova administração da Loja.", publico: false },
    { data: "2026-06-26", titulo: "Sessão Magna de Iniciação",
      descricao: "Iniciação de novos Irmãos ao quadro da Loja.", publico: false },
    { data: "2023-05-10", titulo: "Fundação da Loja",
      descricao: "Fundação da A∴R∴L∴S∴ Cavaleiros Templários de Praia Grande nº 455, primeira Loja do GOP em atividade no Oriente de Praia Grande.", publico: false }
  ]
};
