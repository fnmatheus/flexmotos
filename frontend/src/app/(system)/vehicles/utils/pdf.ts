import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment, ContentImage } from 'pdfmake/interfaces';

const toDataURL = async (url: string) => {
  const blob = await (await fetch(url)).blob();
  const result = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
  return result;
}

export default async function createPdf() {
  const logo = await toDataURL('https://64.media.tumblr.com/9fc89b0950dec4ead278a4d03f611c04/81cc08bfff95d123-82/s2048x3072/3b372b5a166f8e18e9ada3d80c092e19ac708906.pnj');
  
  const docDefinitions = {
    content: [
      {
        image: logo,
        width: 300,
        alignment: 'center',
      } as ContentImage,
      {
        text: '\n\nCONTRATO DE LOCAÇÃO DE VEÍCULO N. 2023/101\n\n',
        style: 'header'
      },
      {
        text: [{text: 'FLEX MOTOS', bold: true},', pessoa juridica de direito privado, inscrita no CNPJ nº 47.463.143/0001- 01, estabelecida na rua Eduardo Magalhães, nº 200, Bairro Centro, no municipio de São João del Rei/MG, CEP 36307-340, neste ato representado por seu sócio- administrador, nos termos do contrato social da, doravante designado LOCADORA; e,\n\n', {text: 'Rafael Oliveira Santos', bold: true}, ', brasileiro, solteiro, representante comercial, CPF 101.565.766- 43, RG MG16292265, residente e domiciliado à Rua BN, nº 120 B, Bairro Bomfim, CEP 36307-476 São João Del Rei/MG, ', {text:'telefone com WhatsApp п.(32) 99934-9993 e e-mail', color: 'red '} ,' doravante designado LOCATÁRIO.\n\n As PARTES têm entre si, justo e contratado, o presente contrato de locação de veículo, ficando desde já pactuado o aceite dos termos e condições descritos abaixo, nos moldes do artigo 104 e 425 do código civil brasileiro.\n\n']
      },
      {
        text: 'Cláusula primeira - DO OBJETO\n\n',
        style: 'subheader'
      },
      {
        text: ['1.1 - O objeto do presente contrato consiste na locação do veículo ', {text: 'Honda/CG 160 FAN, fabricado no ano de 2023, chassi 9C2KC2200PR600670, cor PRETA, placa SIS1136', bold: true}, ', categoria PARTICULAR avaliado no valor de mercado, aproximadamente, em R$24.500,00 devidamente registrado e licenciado no município de São João del Rei, em nome da LOCADOR.\n\n 1.2 - Acompanha o presente instrumento contratual, um laudo completo de vistoria do automóvel, com a descrição do seu estado de conservação datado do dia em que foi entregue ao LOCATÁRIO. O presente laudo deverá estar assinado, também, pelo LOCATÁRIO, a fim de garantir que o mesmo tenha ciência das condições do automóvel quando da entrega.\n\n 1.3 - LOCATÁRIO permanecerá na posse do objeto presente por 7 (sete) dias.\n\n 1.4 - Somente o LOCATÁRIO poderá conduzir a motocicleta.\n\n']
      },
      {
        text: 'Cláusula segunda - DO VALOR E DAS CONDIÇÕES DE PAGAMENTO\n\n',
        style: 'subheader'
      },
      '2.1 - O valor do aluguel do veículo, calculado com base no valor de mercado e de acordo com o livre ajusto entre as partes, é de R$ 470,00 (Quatrocentos e setenta reais)\n\n 2.2 - O LOCATÁRIO compromete-se a efetuar o pagamento do valor acordado entre as partes, diretamente ao LOCADOR ou a quem este indicar e autorizar, pagamento no dia da retirada motocicleta da loja\n\n 2.3 - No ato da locação, o LOCATÁRIO deve depositar, a título de caução, mediante cartão de crédito ou dinheiro em espécie, o valor de 500,00, que será ressarcido ao LOCATÁRIO no ato da devolução do veículo.\n\n 2.4 - O caução será retido para pagamento de qualquer despesa, como aluguel e multa extras, pagamentos de débitos e indenizações, a critério da LOCADORA,\n\n 2.5 - Se o LOCATÁRIO deixar de efetuar o pagamento de alguma diária, medidas judiciais serão adotadas, uma vez configurada apropriação indébita do veículo, incluindo busca e apreensão do veículo e registro de ocorrência, devendo, o LOCATÁRIO, ainda, reembolsar o LOCADOR acerca dos custos incorridos pela retenção indevida do automóvel, arcando, também, com as custas judicias e extrajudiciais que, eventualmente, o LOCADOR teve que despender para que a busca e a apreensão do veiculo pudessem ser realizadas, principalmente despesas com contratação de escritório de advocacia ou advogados autônomos.\n\n 2.6 - É de inteira responsabilidade do LOCATÁRIO as despesas despendidas quanto à utilização do veículo enquanto, este, estiver em sua posse.\n\n',
      {
        text: 'Cláusula terceira - DO PRAZO\n\n',
        style: 'subheader'
      },
      {
        text: ['3.1 - O presente documento contratual refere-se ao prazo de locação do veículo descrito na cláusula 1.3 deste contrato, a iniciar em ', {text: '5/12/2023 às 10:40hrs.\n\n', bold: true},' 3.2 - Este contrato é válido pelo periodo contratado pelo LOCATÁRIO, a encerrar em ', {text:'12/12/2023', bold: true}, ', devendo a moto ser devolvida peloo LOCATÁRIO ao findar do prazo, portando documentos e o LOCADOR emitirá laudo de vistoria atualizado sobre as condições que o veículo foi devolvido.\n\n 3.3 - Ao final do prazo estabelecido entre as partes, a locação não prorrogar-se-á automaticamente, mesmo que o LOCATÁRIO e o LOCADOR permaneçam inertes. A renovação contratual deverá ser feita mediante comunicação do LOCATÁRIO à LOCADORA e com o pagamento antecipado dos dias prorrogados, conforme os procedimentos de contratação que a LOCADORA adota, sob pena de busca e apreensão e demais medidas judiciais cabíveis, incluindo perdas e danos.\n\n 3.4 - Caso o LOCATÁRIO não queira renovar o contrato ou o LOCADOR não aceitar prorrogar a locação, ao final do prazo previamente estipulado de uso e não sendo entregue o veículo, do LOCATÁRIO, será cobrado aluguel proporcionalmente aos dias de atraso, cumulativamente com multa de R$95,00 (noventa e cinco reais) por dia.\n\n 3.5 - No final do periodo contratado de locação, o LOCATÁRIO deverá efetuar a entrega do veículo no mesmo estado em que recebeu, com exceção do desgaste natural de utilização do automóvel, a ser avaliado pela LOCADORA a fim de apurar perdas e danos sob o bem, obrigando o LOCATÁRIO, em cases afirmativos, a indenizar a LOCADORA.\n\n 3.6 - Em caso de devolução da motocicleta apresentado avarias por mau uso, a mesma será encaminhada para oficina conveniada da LOCADORA, cuja manutenção será sempre realizada com peças originais de fábrica, com autorização expressa do LOCATÁRIO.\n\n 3.7 - No caso de devolução com avarias ou arranhões por mau uso do LOCATÁRIO, O caução será retido e utilizado para abatimento do valor da respectiva manutenção, com autorização expressa do LOCATÁRIO.\n\n 3.8 - O LOCATÁRIO é responsável integralmente pelo custo da manutenção quando a motocicleta for devolvida com avarias ou arranhões ocasionados por maus uso do mesmo, sendo o valor do caução utilizado para abatimento dos danos. 3.9A LOCADORA se reserva no direito de não renovar a locação em caso de devolução da motocicleta contendo avarias.\n\n']
      },
      {
        text: 'Cláusula quarta - DO COMBUSTÍVEL\n\n',
        style: 'subheader'
      },
      '4.1 - Em regra, o veículo será entregue ao LOCATÁRIO com o tanque cheio de combustível. A quantidade contida no tanque, no momento da entrega do veículo, será descrita no laudo de vistoria que acompanha o contrato de locação.\n\n 4.2 - Ao final do prazo estipulado de locação do veículo, o LOCATÁRIO deverá restituir o veículo com quantidade equivalente ao que continha no momento da entrega do veículo. Não ocorrendo desta forma, será cobrado do LOCATÁRIO, o valor correspondente à quantidade de combustivel existente no momento da retirada do veículo, ou um valor fixo de R$85,00 (oitenta e cinco reais).\n\n 4.3 - O LOCATÁRIO compromete-se à abastecer o veículo com combustivel de boa procedência e eficiência, tal qual recomendado pelo LOCADOR. Havendo a constatação, após a entrega do automóvel, de que se utilizara combustivel adulterado. ou de má qualidade, o LOCATÁRIO responde pelas perdas e danos decorrentes da má utilização do veículo.\n\n',
      {
        text: 'Cláusula quinta - DA UTILIZAÇÃO DO VEÍCULO\n\n',
        style: 'subheader'
      },
      '5.1 - O veículo deverá ser utilizado conforme as boas normas, conforme as legislações de trânsito, ambientais e sociais vigentes. Recaindo sobre o LOCATÁRIO a responsabilidade de zelar pela conservação do automóvel, bem como efetuar as manutenções que forem necessárias para o pleno desenvolvimento do veículo automotor, sendo que tais gastos serão custeados pelo próprio.\n\n 5.2 - O LOCATÁRIO obriga-se a restituir o bem em perfeitas condições higiênicas e de manutenção, da mesma forma que retirou o bem ao iniciar o contrato, do contrário o LOCATÁRIO deverá reembolsar o custo da higienização do veículo e demais despesas com manutenção.\n\n 5.3 - Dependendo do estado de devolução do veículo, a LOCADOR poderá cobrar uma taxa de limpeza do LOCATÁRIO, não superior a R$30,00 (trinta reais) quando suas condições de limpeza não estiverem de acordo com o que fora pactuado entre as partes.\n\n 5.4 - Fica desde já acordado que o LOCATÁRIO declara receber o bem em perfeito estade de limpeza, conservação e manutenção, funcionando perfeitamente toda a parte elétrica e mecânica do veículo, conforme descrito no laudo de vistoria anexo.\n\n 5.5 - O LOCATÁRIO obriga-se a utilizar o veículo de acordo com os regulamentos estabelecidos pelo Conselho Nacional de Trânsito (CONTRAN), bem como pelo Departamento Estadual de Trânsito do Estado de Minas Gerias (DETRAN).\n\n 5.6 - A utilização do veículo de forma diferente da recomendada acima será punivel com multa a ser definida a depender da infração, além disso, o LOCADOR poderá, sem qualquer aviso prévio, rescindir o presente contrato e recolhê-lo sem maiores formalidades.\n\n 5.7 - Qualquer alteração visual ou mecânica no veículo só poderá ser realizada com a autorização expressa do LOCADOR.\n\n 5.8 - Declara, o LOCATÁRIO, estar ciente que quaisquer danos ou perdas ocorridas, em razão da má utilização do veículo locado, serão de sua inteira responsabilidade.\n\n',
      {
        text: 'Cláusula sexta - DAS INFRAÇÕES\n\n',
        style: 'subheader'
      },
      '6.1 - As infrações de tránsito e as multas correspondentes, cometidas durante o periodo da locação do veículo, são de inteira responsabilidade do LOCATÁRIO, devendo, estas, serem assumidas e liquidadas até o término do contrato.\n\n 6.2 - Caso o veículo seja apreendido para regularização, serão cobradas do LOCATÁRIO todos os serviços correspondentes aos procedimentos de liberação do veículo alugado, bem como todas as taxas cobradas pelos órgãos de fiscalização competes, e as devidas diárias até a liberação do veículo.\n\n 6.3 - Pelo presente instrumento, fica a LOCADORA, através de seu sócio administrador, autorizada expressamente a proceder a identificação do condutor infrator junto ao órgão de trânsito autiante, juntando cópia dos documentos que comprovem o real condutor, e a identificação do infrator poderá ser feita exclusivamente pela LOCADORA, caso o infrator se recuse a se identificar.\n\n',
      {
        text: 'Cláusula sétima - DO SINISTRO\n\n',
        style: 'subheader'
      },
      '7.1 -  Caso não ocorra a devolução da moto, havendo perda, roubo, extorsão ou destruição total do automóvel locado, estipula-se, neste documento, a titulo de Indenização devida pelo LOCATARIO, o valor atualizado do veículo, utilizando-se a tabela FIPE.\n\n 7.2 - Em caso de perda, furto ou roubo do aparelho, o LOCATÁRIO deverá realizar o Boletim de Ocorrência e comunicar imediatamente à LOCADORA, de modo que esta possa solicitar o bloqueio do chip de dados de aparelho. A LOCADORA se reserva o direito de tomar as medidas civeis e/ou criminals cabíveis, bem como solicitar o Imediato bloqueio do aparelho e do chip. A responsabilidade da LOCADORA restringe- se ao funcionamento dos aparelhos, inexistindo responsabilidade sobre roteiros, mapas e/ou base de informações fornecidas por estes.\n\n 7.3 - Caso ocorra acidentes, queda ou qualquer outra situação que acarrete avaria na motocicleta o LOCATÁRIO fica obrigado a devolver a mesma para a LOCADORA, que encaminhará para oficina de sua confiança.\n\n 7.4 - O LOCATÁRIO tem absoluta ciência de que, na hipótese de descumprimento de qualquer obrigação prevista no Contrato, ou em casos de ocorrência de ilícitos, a Locadora poderá bloquear a utilização do carro e promover medidas para sua reintegração da posse do carro.\n\n',
      {
        text: 'Cláusula oitava - DO SEGURO DISPONIBILIZADO PELA LOCADORA\n\n',
        style: 'subheader'
      },
      '8.1 - A LOCADORA, na condição de estipulante de seguro, disponibiliza ao LOCATÁRIO a opção de adesão à apólice de seguro, com cobertura de responsabilidade civil perante terceiros ("Seguro para Terceiros"), em decorrência de acidente de trânsito. envolvendo a moto alugada, nos termos das Condições Gerais do Seguro de Automóvel, disponiveis na integra, para consulta, na agência da LOCADORA.\n\n 8.2- O não pagamento do prêmio ocasionará o cancelamento imediato da cobertura securitária.\n\n 8.3 - O valor do prêmio será destacado nos instrumentos de cobrança e faturas enviadas ao Cliente.\n\n 8.4 - A aceitação do seguro estará sujeita à análise de risco.\n\n 8.5 - O LOCATÁRIO não terá direito ao seguro nos casos de:\n\n 8.5.1 - Sinistro causado a terceiros por pessoa sob ação de álcool/entorpecentes ou se o condutor não fizer o teste de embriaguez requerido pela autoridade.\n\n 8.5.2 - Deixar de apresentar Boletim de Ocorrência em caso de sinistro com a moto alugado envolvendo terceiros.\n\n 8.5.3 - Procurar obter beneficios ilícitos do Seguro.\n\n 8.5.4 - Deixar de comunicar a ocorrência de sinistro envolvendo terceiros, logo que o saiba.\n\n 8.5.5 - Deixar de pagar integralmente o valor do prêmio do Seguro.\n\n 8.5.6 - Fazer declarações inveridicas e/ou incompletas ou omitir circunstâncias capazes de influir na aceitação da proposta, na análise do risco, na estipulação do prêmio e/ou na análise das circunstâncias do sinistro.\n\n 8.5.7 - Houver condução/manobra da moto por pessoa não autorizada e/ou não habilitada.\n\n 8.5.8 - Danos ou prejuízos sofridos pelo condutor e/ou ocupantes da moto alugada e Danos ou prejuízos causados à moto alugada.\n\n 8.5.9 - Utilizar a moto para fim diverso do indicado no Contrato.\n\n',
      {
        text: 'Cláusula nona - RESPONSABILIDADES INDENIZATÓRIAS\n\n',
        style: 'subheader'
      },
      '9.1 - O LOCATÁRIO reconhece que as responsabilidades da Locadora limitam-se aquelas previstas na legislação brasileira, cabendo ao LOCATÁRIO arcar com o ônus da sua conduta dolosa ou culposa, inclusive perante terceiros.\n\n 9.2 - O LOCATÁRIO deverá suportar as seguintes responsabilidades indenizatórias:\n\n 9.2.1 - Em caso de furto, roubo ou apropriação indébita: Ressarcir à LOCADORA o valor de mercado do carro, taxas de licenciamento, IPVA, um tanque de combutível e custo de mercados de peças, nos límites dos danos.\n\n 9.2.2 - Em caso de acidente com perda total ou incêndio: Ressarcir à LOCADORA o valor de mercado do modelo do carro, taxas de licenciamento, IPVA, um tanque de combustível e o custo pré-fixado de limite de danos. O Cliente ainda deverá arcar com todos os prejuízos que venha causar a terceiros.\n\n 9.2.3 - Em caso de acidente sem perda total: ressarcir à Locadora o valor de recuperação do da moto alugada e o custo pré-fixado de limite danos. O orçamento será feito sempre em oficina indicada pela LOCADORA.O Cliente ainda deverá arcar com todos os prejuízos que venha causar a terceiros.\n\n 9.2.4 - A contratação do seguro da moto isenta o Cliente de reembolsar à Locadora exclusivamente o valor de mercado da moto alugada ou valor de sua recuperação, no limite do tipo de proteção contratada.\n\n 9.2.5 - O LOCATÁRIO deverá arcar com o custo da oficina, independentemente de sua culpa, do reparo da moto ou de adesão ao seguro.\n\n 9.2.6 - Em caso de perda de Proteção da moto e/ou do Seguro para Terceiros, o LOCATÁRIO se obriga a ressarcir à LOCADORA todos os prejuízos causados a moto e a terceiros.\n\n 9.2.7 - O recebimento de qualquer valor pela Locadora não presume a quitação total de seus prejuízos.\n\n',
      {
        text: 'Cláusula décima - DISPOSIÇÕES GERAIS\n\n',
        style: 'subheader'
      },
      '10.1 - Havendo violação das obrigações previstas neste contrato, por qualquer das partes, estarão sujeitas ao pagamento de indenização e ressarcimento pelas perdas e danos percebidos pela parte afetada, sem prejuízo das demais penalidades cabíveis.\n\n 10.2 - Veda-se, através deste contrato, o empréstimo ou sublocação do veículo locado, sob pena de rescisão imediata da relação juridica existente, sem prejuízo das demais penalidades cabíveis.\n\n 10.3 - Este contrato poderá ser alterado somente mediante instrumento anexo à este documento, desde que assinado e consentido por todas as partes.\n\n 10.4 - Ocorrendo a nulidade de alguma das cláusulas deste contrato, as restantes disposições contratuais não serão afetadas, continuarão valendo mesmo que ocorram alteração nas demais.\n\n 10.5 - O LOCATÁRIO concorda que a sua assinatura no Contrato implica ciência e adesão por si, seus herdeiros/sucessores a este contrato e demais documentos que componham o Contrato, desde que respeitados os arts, 46 e 47 da Lei nº 8.078/90, reconhecendo a forma de contratação por meio fisico ou eletrônico e digital como válida e plenamente eficaz, constituindo titulo executivo extrajudicial para todos os fins de direito, ainda que seja estabelecida com assinatura eletrônica ou certificação fora dos padrões ICP-BRASIL, conforme disposto pela Medida Provisória nº 2.200/2001.\n\n 10.6 - O LOCATÁRIO aceita receber as comunicações, notificações e avisos através do número de WhastApp fornecido, e-mail ou SMS, dando por recebidas as comunicações enviadas no período da locação. Em caso de controvérsias, dúvidas, processos e conflitos, fica eleito o foro da comarca de São João del Rei/MG, ainda que exista outro mais privilegiado, sendo este o eleito para qualquer ação ou execução que possa ocorrer por motivo de descumprimento de algumas das cláusulas dispostas neste documento ou da legislação brasileira aplicável. E, por estarem assim, justos e de comum acordo, as PARTES assinam o presente instrumento em 2 (duas) vias de igual teor e forma para a produção de todos os efeitos de direito.\n\n',
      {
        text: 'São João del Rei, 5 de dezembro de 2023.\n\n\n\n________________________________\nFLEX MOTOS\n\n\n________________________________\nLOCATÁRIO',
        style: {
          bold: true,
          alignment: 'center' as Alignment,
        }
      }
    ],
    defaultStyle: { font: 'Roboto' },
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'center' as Alignment,
      },
      subheader: {
        fontSize: 15,
        bold: true
      },
      quote: {
        italics: true
      },
      small: {
        fontSize: 8
      }
    },
  };

  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.fonts = {
    'Roboto': {
      normal: 'Roboto-Regular.ttf',
      bold: 'Roboto-Medium.ttf',
      italics: 'Roboto-Italic.ttf',
      bolditalics: 'Roboto-Italic.ttf'
    }
  };

  pdfMake.createPdf(docDefinitions).open();
}
