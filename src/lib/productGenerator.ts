// Product Generator - Gera produtos automaticamente baseado nas imagens disponíveis
import { Product } from '@/contexts/MockDataContext';

// Lista de todos os SKUs disponíveis (gerada manualmente)
const allSKUs = [
  '10011','10012','10023','10037','10043','10044','10060','10064','10070','10071',
  '10072','10073','10075','10134','10135','10140','10143','10150','10155','10168',
  '10169','10176','10182','10198','10199','10200','10201','10202','10205','10219',
  '10223','10224','10230','10234','10239','10242','10244','10248','10249','10250',
  '10270','10278','10280','10304','10318','10321','10323','10328','10330','10331',
  '10340','10346','10354','10372','10374','10385','10386','10388','10398','10400',
  '10403','10418','10427','10434','10440','10445','10446','10447','10452','10463',
  '10468','10486','10511','10512','10513','10516','10518','10521','10525','10526',
  '10527','10532','10533','10534','10535','10539','10540','10551','10556','10559',
  '10565','10576','10577','10578','10579','10580','10581','10583','10584','10585',
  '10586','10587','10588','10589','10590','10591','10597','10598','10602','10603',
  '10604','10605','10606','10607','10609','10610','10611','10612','10613','10614',
  '10615','10618','10620','10622','10623','10624','10625','10633','10635','10637',
  '10639','10640','10644','10647','10651','10652','10656','10657','10660','10662',
  '10665','10666','10672','10682','10684','10687','10688','10689','10691','10692',
  '10693','10694','10695','10696','10700','10703','10704','10705','10708','10709',
  '10711','10716','10721','10740','10750','10751','10756','10757','10758','10782',
  '10790','10804','10805','10813','10814','10817','10819','10829','10830','10831',
  '10835','10837','10850','10858','10859','10865','10867','10873','10880','10897',
  '10903','10915','10916','10920','10924','10926','10935','10937','10950','10951',
  '10956','10958','10973','10975','10976','10978','10980','10982','10986','10988',
  '10989','10991','10992','10993','10995','10996','10997','10999','11000','11001',
  '11006','11009','11010','11011','11014','11016','11018','11021','11022','11025',
  '11037','11044','11045','11051','11055','11057','11058','11066','11069','11075',
  '11080','11081','11082','11100','11132','11253','112532','11260','11276','11285',
  '11288','11296','11336','11341','11345','11349','11351','11433','11434','11435',
  '11436','11437','11438','11439','11440','11441','2041','2042','3048','3050',
  '3052','3059','3066','3103','3113','3117','3138','3161','3204','3212',
  '3224','4030','4051','4055','4058','4108','5009','5012','5016','5022',
  '5028','5033','5056','5103','5104','5206','6013','6015','6019','6036',
  '6048','6060','6061','6064','6065','6067','6072','6073','6125','6166',
  '6175','6187','6191','6307','6352','6358','6371','6374','8001','8007',
  '8010','8066','8201','8202','8212','8216','8221','8226','8260','8274',
  '8288','8293','8294','8315','8326','8361','8364','8398','8403','8431',
  '8436','8437','8445','8453','8454','8465','8494','8504','8537','8553',
  '8566','8584','8618','8628','8664','8693','8704','8709','8725','8737',
  '8763','8779','8782','8783','8798','8800','8803','8818','8820','8821',
  '8880','8887','8908','8957','8965','8984','8997','9001','9006','9007',
  '9011','9018','9019','9022','9029','9055','9068','9089','9090','9091',
  '9102','9129','9135','9136','9155','9181','9246','9268','9273','9332',
  '9338','9371','9376','9410','9414','9422','9423','9449','9454','9467',
  '9470','9476','9477','9481','9482','9483','9484','9486','9488','9528',
  '9552','9556','9558','9559','9562','9568','9586','9603','9624','9627',
  '9645','9647','9648','9649','9650','9657','9658','9696','9699','9704',
  '9711','9713','9721','9724','9753','9754','9789','9803','9831','9846',
  '9848','9854','9855','9879','9886','9910','9913','9918','9927','9931',
  '9937','9956','9960','9972','9975','9986','9999'
];

// Função para obter URL da imagem por SKU
function getImageUrl(sku: string): string {
  // Usa new URL com import.meta.url para resolver o caminho correto
  try {
    return new URL(`../assets/produtos/produto/${sku}.jpg`, import.meta.url).href;
  } catch (e) {
    console.warn(`⚠️ Imagem não encontrada para SKU: ${sku}`);
    // Fallback para primeira imagem
    return new URL(`../assets/produtos/produto/10011.jpg`, import.meta.url).href;
  }
}

console.log('🔍 Product SKUs Loaded:', allSKUs.length);

// Lista de nomes de produtos variados para bovinos
const bovinosNames = [
  'Picanha Premium', 'Contrafilé Angus', 'Alcatra Nobre', 'Filé Mignon Premium',
  'Costela Bovina', 'Cupim Especial', 'Fraldinha Premium', 'Maminha Nobre',
  'Patinho Bovino', 'Coxão Mole', 'Lagarto Bovino', 'Músculo Bovino',
  'Acém Bovino', 'Paleta Bovina', 'Costela Janela', 'Baby Beef',
  'Picanha Maturada', 'Contrafilé Resfriado', 'Bife Ancho', 'Prime Rib',
  'T-Bone Steak', 'Porterhouse', 'Ossobuco Bovino', 'Rabada Bovina',
];

// Lista de nomes para suínos
const suinosNames = [
  'Lombo Suíno Premium', 'Costelinha Suína', 'Pernil Suíno', 'Bisteca Suína',
  'Bacon Especial', 'Pancetta Premium', 'Costela Suína', 'Paleta Suína',
  'Carré Suíno', 'Joelho Suíno', 'Linguiça Calabresa', 'Linguiça Toscana',
  'Coppa Suína', 'Lombo Defumado', 'Lombo Canadense', 'Tender Suíno',
];

// Lista de nomes para aves
const avesNames = [
  'Peito de Frango', 'Coxa e Sobrecoxa', 'Asa de Frango', 'Coxinha da Asa',
  'Filé de Frango', 'Frango Inteiro', 'Sassami de Frango', 'Peito com Osso',
  'Drumstick de Frango', 'Tulipa de Frango', 'Coração de Frango', 'Moela de Frango',
  'Sobrecoxa Desossada', 'Peito de Peru', 'Chester Especial', 'Frango Caipira',
];

// Lista de nomes para congelados
const congeladosNames = [
  'Hambúrguer Artesanal', 'Almôndega Premium', 'Kafta Especial', 'Nuggets Premium',
  'Empanado de Frango', 'Kibbe Congelado', 'Espetinho Bovino', 'Espetinho Frango',
  'Polpettone Artesanal', 'Rondelli de Carne', 'Bolinho de Carne', 'Mini Burgers',
  'Hambúrguer Gourmet', 'Steak Burger', 'Smash Burger', 'Hambúrguer Angus',
];

// Lista de nomes para especiais
const especialNames = [
  'Picanha Recheada', 'Medalhão Premium', 'Wellington Beef', 'Tournedos Special',
  'Rosbife Premium', 'Carpaccio Nobre', 'Linguiça Artesanal', 'Chorizo Premium',
  'Salsicha Alemã', 'Bratwurst Premium', 'Pastrami Especial', 'Corned Beef',
  'Bacon Defumado', 'Costela BBQ', 'Pulled Pork', 'Brisket Premium',
];

// Descrições genéricas por categoria
const descriptions = {
  bovinos: [
    'Corte bovino de primeira qualidade, selecionado criteriosamente para oferecer maciez e sabor excepcionais.',
    'Carne bovina premium, ideal para churrascos e preparações gourmet. Produto de origem certificada.',
    'Corte nobre de carne bovina, perfeito para ocasiões especiais e receitas sofisticadas.',
    'Carne bovina selecionada com alto padrão de qualidade, ideal para restaurantes e açougues premium.',
  ],
  suinos: [
    'Corte suíno de qualidade superior, limpo e aparado. Versátil para diversas preparações culinárias.',
    'Carne suína premium, selecionada para garantir sabor marcante e textura perfeita.',
    'Produto suíno de primeira linha, ideal para assados, grelhados e receitas tradicionais.',
    'Corte suíno nobre, cuidadosamente preparado para atender aos mais exigentes padrões de qualidade.',
  ],
  aves: [
    'Ave de qualidade superior, criada com alimentação balanceada. Produto fresco e saboroso.',
    'Corte de ave premium, ideal para preparações rápidas e receitas diversificadas.',
    'Produto avícola de primeira qualidade, perfeito para restaurantes e estabelecimentos comerciais.',
    'Ave selecionada criteriosamente, garantindo frescor e sabor incomparáveis.',
  ],
  congelados: [
    'Produto congelado artesanal, preparado com ingredientes selecionados e receita especial.',
    'Item congelado de alta qualidade, prático e saboroso. Ideal para estabelecimentos comerciais.',
    'Produto premium congelado IQF, mantendo todas as características originais do produto fresco.',
    'Congelado especial, preparado seguindo rigorosos padrões de qualidade e higiene.',
  ],
  especiais: [
    'Produto especial artesanal, elaborado com técnicas tradicionais e ingredientes nobres.',
    'Item premium da linha especial, perfeito para ocasiões diferenciadas e cardápios gourmet.',
    'Produto exclusivo preparado com receita especial e ingredientes cuidadosamente selecionados.',
    'Especialidade da casa, desenvolvida para surpreender os paladares mais exigentes.',
  ],
  resfriados: [
    'Produto resfriado de primeira qualidade, mantendo frescor e características originais.',
    'Item resfriado premium, ideal para consumo imediato ou preparações especiais.',
    'Produto em temperatura controlada, garantindo máxima qualidade e durabilidade.',
    'Resfriado especial, processado com tecnologia de ponta para preservar todas as qualidades.',
  ],
};

// Embalagens por categoria
const packagings = {
  bovinos: [
    'Caixa Master: 15 kg a 18 kg | Embalagem: 10 a 12 peças | Vácuo individual',
    'Caixa Master: 12 kg a 15 kg | Embalagem: 8 a 10 peças | Resfriado',
    'Caixa Master: 20 kg a 25 kg | Embalagem: 12 a 15 peças | Vácuo premium',
    'Caixa Master: 10 kg a 12 kg | Embalagem: 6 a 8 peças | Selado',
  ],
  suinos: [
    'Caixa Master: 10 kg a 12 kg | Embalagem: 6 a 8 peças | Vácuo',
    'Caixa Master: 12 kg a 15 kg | Embalagem: 8 a 10 peças | Resfriado',
    'Caixa Master: 8 kg a 10 kg | Embalagem: 5 a 7 peças | Vácuo individual',
    'Caixa Master: 15 kg | Embalagem: 10 a 12 peças | Temperado',
  ],
  aves: [
    'Caixa Master: 15 kg | Embalagem: aproximadamente 60 peças | Congelado IQF',
    'Caixa Master: 12 kg | Embalagem: 8 a 10 peças | Sem osso e sem pele',
    'Caixa Master: 10 kg | Embalagem: 50 a 60 peças | Congelado',
    'Caixa Master: 18 kg | Embalagem: 12 a 15 peças | Fresco',
  ],
  congelados: [
    'Caixa Master: 6 kg | Embalagem: 60 unidades de 100g | Congelado',
    'Caixa Master: 5 kg | Embalagem: 50 unidades | Congelado IQF',
    'Caixa Master: 8 kg | Embalagem: 80 unidades | Individual',
    'Caixa Master: 10 kg | Embalagem: 100 unidades | Porcionado',
  ],
  especiais: [
    'Caixa Master: 8 kg | Embalagem: aproximadamente 40 unidades | Artesanal',
    'Caixa Master: 6 kg | Embalagem: 30 unidades | Premium',
    'Caixa Master: 10 kg | Embalagem: 50 unidades | Especial',
    'Caixa Master: 5 kg | Embalagem: 25 unidades | Gourmet',
  ],
  resfriados: [
    'Caixa Master: 12 kg | Embalagem: 8 a 10 peças | Resfriado 0-4°C',
    'Caixa Master: 15 kg | Embalagem: 10 a 12 peças | Temperatura controlada',
    'Caixa Master: 10 kg | Embalagem: 6 a 8 peças | Fresco resfriado',
    'Caixa Master: 18 kg | Embalagem: 12 a 15 peças | Resfriado premium',
  ],
};

// Função para determinar categoria baseada no SKU
function getCategoryBySKU(sku: string): string {
  const num = parseInt(sku);
  
  // Distribuição baseada nos prefixos dos SKUs
  if (sku.startsWith('2')) return 'congelados';
  if (sku.startsWith('3')) return 'aves';
  if (sku.startsWith('4')) return 'especiais';
  if (sku.startsWith('5')) return 'suinos';
  if (sku.startsWith('6')) return 'resfriados';
  if (sku.startsWith('8') || sku.startsWith('9')) return 'congelados';
  if (sku.startsWith('10') || sku.startsWith('11')) {
    // Para SKUs 10xxx e 11xxx, distribuir entre bovinos, suínos e aves
    if (num % 3 === 0) return 'bovinos';
    if (num % 3 === 1) return 'suinos';
    return 'aves';
  }
  
  return 'bovinos'; // Default
}

// Função para gerar nome baseado na categoria
function getProductName(category: string, index: number): string {
  let namesList: string[];
  
  switch (category) {
    case 'bovinos':
      namesList = bovinosNames;
      break;
    case 'suinos':
      namesList = suinosNames;
      break;
    case 'aves':
      namesList = avesNames;
      break;
    case 'congelados':
      namesList = congeladosNames;
      break;
    case 'especiais':
      namesList = especialNames;
      break;
    default:
      namesList = [...bovinosNames, ...suinosNames, ...avesNames];
  }
  
  const baseName = namesList[index % namesList.length];
  const variation = Math.floor(index / namesList.length);
  
  if (variation === 0) return baseName;
  if (variation === 1) return `${baseName} Especial`;
  if (variation === 2) return `${baseName} Premium`;
  if (variation === 3) return `${baseName} Nobre`;
  if (variation === 4) return `${baseName} Select`;
  if (variation === 5) return `${baseName} Gold`;
  if (variation === 6) return `${baseName} Prime`;
  if (variation === 7) return `${baseName} Master`;
  if (variation === 8) return `${baseName} Supreme`;
  
  return `${baseName} ${variation}`;
}

// Função para gerar produtos automaticamente
export function generateProducts(): Product[] {
  const products: Product[] = [];
  let productId = 1;
  
  // Contadores por categoria para nomes variados
  const categoryCounters: Record<string, number> = {
    bovinos: 0,
    suinos: 0,
    aves: 0,
    congelados: 0,
    especiais: 0,
    resfriados: 0,
  };
  
  // Processa cada SKU
  allSKUs.forEach((sku) => {
    const imageUrl = getImageUrl(sku);
    
    const category = getCategoryBySKU(sku);
    const categoryIndex = categoryCounters[category] || 0;
    categoryCounters[category] = categoryIndex + 1;
    
    const name = getProductName(category, categoryIndex);
    const descIndex = productId % descriptions[category as keyof typeof descriptions].length;
    const packIndex = productId % packagings[category as keyof typeof packagings].length;
    
    // Determina se é featured (aproximadamente 30% dos produtos)
    const isFeatured = productId % 3 === 0;
    
    products.push({
      id: String(productId),
      name,
      sku,
      description: descriptions[category as keyof typeof descriptions][descIndex],
      images: [imageUrl, imageUrl],
      category,
      packaging: packagings[category as keyof typeof packagings][packIndex],
      featured: isFeatured,
    });
    
    productId++;
  });
  
  console.log('✅ Generated Products:', products.length);
  console.log('📊 Products by Category:', categoryCounters);
  
  return products;
}

// Exporta função para obter imagem por SKU
export function getImageBySKU(sku: string): string {
  const normalizedSKU = sku.replace(/_/g, '').replace(/-/g, '');
  return getImageUrl(normalizedSKU);
}

