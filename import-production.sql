-- ==========================================
-- SCRIPT DE IMPORTAÇÃO AUTOMÁTICO
-- Royal Alimentos - Database Import
-- ==========================================
-- ATENÇÃO: Execute este script no banco de PRODUÇÃO
-- ==========================================

BEGIN;


-- ==========================================
-- IMPORTAR CATEGORIAS (6 registros)
-- ==========================================

INSERT INTO categories (name, slug, icon, image)
VALUES ('Aves', 'aves', '🍗', 'https://images.pexels.com/photos/5769383/pexels-photo-5769383.jpeg')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  image = EXCLUDED.image;

INSERT INTO categories (name, slug, icon, image)
VALUES ('Bovinos', 'bovinos', '🥩', 'https://images.pexels.com/photos/5774145/pexels-photo-5774145.jpeg')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  image = EXCLUDED.image;

INSERT INTO categories (name, slug, icon, image)
VALUES ('Congelados', 'congelados', '❄️', 'https://images.pexels.com/photos/1927383/pexels-photo-1927383.jpeg')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  image = EXCLUDED.image;

INSERT INTO categories (name, slug, icon, image)
VALUES ('Suínos', 'suinos', '🥓', 'https://espetinhodesucesso.com/wp-content/uploads/2018/12/Como-salgar-carne-de-porco-para-conservar.jpg')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  image = EXCLUDED.image;

INSERT INTO categories (name, slug, icon, image)
VALUES ('Especiais', 'especiais', '⭐', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvdmmcVylZcSHMmBwN2XBxxguPChzngV3LNA&s')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  image = EXCLUDED.image;

INSERT INTO categories (name, slug, icon, image)
VALUES ('Resfriados', 'resfriados', '🧊', 'https://swiftbr.vteximg.com.br/arquivos/ids/201867-450-450/616972-coracao-de-frango_1.jpg?v=638665828966770000')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  image = EXCLUDED.image;


-- ==========================================
-- IMPORTAR PRODUTOS (476 registros)
-- ==========================================

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10023',
  'Bacon Premium',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10023.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10037',
  'Costela Premium',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10037.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10043',
  'File de Peixe Select',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10043.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10044',
  'Maminha Supreme',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10044.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10060',
  'Alcatra Gold',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10060.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10064',
  'Salsicha',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10064.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10070',
  'Linguiça Prime',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  true,
  'active',
  ARRAY['/produtos/10070.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10071',
  'Lula Especial',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10071.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10072',
  'Blanquet Master',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10072.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10073',
  'Maminha Gold',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10073.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10075',
  'Hambúrguer Especial',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10075.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10134',
  'Bacon Select',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10134.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10135',
  'Espetinho Especial',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10135.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10140',
  'Condimento Prime',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10140.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10143',
  'Asa Master',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10143.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10150',
  'Maminha Supreme',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  true,
  'active',
  ARRAY['/produtos/10150.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10155',
  'Asa Prime',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  true,
  'active',
  ARRAY['/produtos/10155.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10168',
  'Mortadela Select',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10168.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10169',
  'Lombo Master',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  true,
  'active',
  ARRAY['/produtos/10169.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10176',
  'Queijo',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10176.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10182',
  'Presunto Prime',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10182.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10198',
  'Blanquet',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10198.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10199',
  'Mortadela Gold',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10199.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10200',
  'Salsicha Prime',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10200.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  'BOV-001',
  'Picanha Premium',
  'Corte nobre bovino com capa de gordura uniforme. Ideal para churrascos e assados especiais.',
  'Caixa: 18 kg | 12 a 15 peças por caixa',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  true,
  'active',
  ARRAY['https://placehold.co/800x600/1E3A5F/white?text=Picanha+Premium']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  'BOV-002',
  'Contrafilé Angus',
  'Contrafilé macio e suculento de gado Angus. Perfeito para bifes e medalhões.',
  'Caixa: 20 kg | Peças de 2-3 kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  true,
  'active',
  ARRAY['https://placehold.co/800x600/1E3A5F/white?text=Contrafile']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  'AVE-001',
  'Peito de Frango IQF',
  'Peito de frango congelado individualmente (IQF). Facilita o porcionamento em cozinhas industriais.',
  'Caixa: 20 kg | 4 pacotes de 5 kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  true,
  'active',
  ARRAY['https://placehold.co/800x600/1E3A5F/white?text=Peito+Frango']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  'AVE-002',
  'Coxa e Sobrecoxa',
  'Coxa e sobrecoxa de frango de primeira qualidade. Ideal para assados e frituras.',
  'Caixa: 15 kg | Aproximadamente 60 peças',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['https://placehold.co/800x600/1E3A5F/white?text=Coxa+Frango']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  'SUI-001',
  'Costela Suína em Ripa',
  'Costelinha suína em ripa, ideal para assados e barbecue. Carne macia e saborosa.',
  'Caixa: 15 kg | 8 a 10 peças por caixa',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['https://placehold.co/800x600/1E3A5F/white?text=Costela+Suina']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  'SUI-002',
  'Lombo Suíno Premium',
  'Lombo suíno premium sem osso. Perfeito para assados e medalhões.',
  'Caixa: 12 kg | Peças de 2-2,5 kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  true,
  'active',
  ARRAY['https://placehold.co/800x600/1E3A5F/white?text=Lombo+Suino']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10012',
  'Camarão Supreme',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  true,
  'active',
  ARRAY['/produtos/10012.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10205',
  'File de Peixe Gold',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10205.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10219',
  'Tilápia Select',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10219.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10223',
  'Maminha Supreme',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10223.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10224',
  'Alcatra Premium',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10224.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10230',
  'Alcatra Prime',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10230.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10234',
  'Cupim Prime',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10234.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10239',
  'Almôndega Premium',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10239.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10242',
  'Strogonoff Gold',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10242.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10244',
  'Lombo Select',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  true,
  'active',
  ARRAY['/produtos/10244.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10248',
  'Lula Supreme',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10248.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10249',
  'Kafta Master',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10249.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10250',
  'Asa',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10250.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10270',
  'Fraldinha Select',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10270.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10278',
  'Strogonoff Supreme',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  true,
  'active',
  ARRAY['/produtos/10278.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10280',
  'Salmão Gold',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10280.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10304',
  'Presunto',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10304.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10318',
  'File de Peixe Premium',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10318.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10321',
  'Strogonoff',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10321.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10323',
  'Polvo Supreme',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10323.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10328',
  'Hambúrguer Gold',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10328.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10330',
  'Camarão Select',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10330.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10331',
  'Contrafilé Gold',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10331.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10340',
  'Salmão',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10340.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10346',
  'Salmão Select',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10346.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10354',
  'Tempero Prime',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10354.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10372',
  'Picanha Master',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10372.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10374',
  'Strogonoff Premium',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10374.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10385',
  'Salame Premium',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10385.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10386',
  'Espetinho Gold',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10386.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10388',
  'Queijo Especial',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10388.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10398',
  'Costela Supreme',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10398.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10202',
  'Kafta',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10202.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10403',
  'Salmão Select',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10403.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10418',
  'Kafta Gold',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10418.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10427',
  'Picanha Gold',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10427.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10434',
  'Mortadela Master',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10434.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10440',
  'Sassami Premium',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10440.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10445',
  'Salsicha Premium',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10445.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10446-copiar',
  'Blanquet Gold',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10446 copiar.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10446',
  'Kafta Supreme',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10446.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10447',
  'Coxa Premium',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10447.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10452',
  'Salmão',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10452.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10463',
  'Mortadela',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10463.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10468',
  'Blanquet Supreme',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10468.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10486',
  'Hambúrguer Premium',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  true,
  'active',
  ARRAY['/produtos/10486.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10511',
  'Mortadela Select',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10511.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10512',
  'File de Peixe Premium',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10512.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10513',
  'Maminha Prime',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10513.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10516',
  'Peito Master',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10516.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10518',
  'Queijo Prime',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  true,
  'active',
  ARRAY['/produtos/10518.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10521',
  'Mortadela',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10521.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10525',
  'Lula Especial',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10525.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10526',
  'Espetinho Master',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10526.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10527',
  'Fraldinha Premium',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10527.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10532',
  'Picanha Gold',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10532.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10533',
  'Strogonoff Prime',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10533.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10534',
  'Cupim Prime',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10534.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10535',
  'Presunto Master',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10535.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10539',
  'Filé Mignon Supreme',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10539.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10540',
  'Filé Mignon',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10540.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10551',
  'File de Peixe Select',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10551.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10556',
  'Peito',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  true,
  'active',
  ARRAY['/produtos/10556.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10559',
  'Tilápia',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10559.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10565',
  'Lombo Prime',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10565.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10400',
  'Salame Prime',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10400.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10578',
  'Salame Prime',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10578.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10579',
  'Maminha Master',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10579.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10580',
  'Peito Prime',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10580.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10581',
  'Tilápia Especial',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10581.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10583',
  'Fraldinha Select',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10583.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10584',
  'Linguiça Gold',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10584.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10585',
  'Cupim Gold',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10585.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10586',
  'Almôndega Premium',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10586.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10587',
  'Lombo Select',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10587.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10588',
  'Salame Master',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10588.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10589',
  'Cupim Master',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10589.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10590',
  'Linguiça',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10590.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10591',
  'Picanha',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10591.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10597',
  'Almôndega Select',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10597.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10598',
  'Tempero',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10598.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10602',
  'Costela Select',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10602.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10603',
  'Queijo Supreme',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  true,
  'active',
  ARRAY['/produtos/10603.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10604',
  'Salsicha Gold',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10604.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10605',
  'Espetinho',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10605.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10606',
  'Filé Mignon Master',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10606.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10607',
  'Alcatra Supreme',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10607.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10609',
  'Sobrecoxa Premium',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10609.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10610',
  'Asa Premium',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10610.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10611',
  'Lula Gold',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10611.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10612',
  'Blanquet Prime',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10612.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10613',
  'Alcatra',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10613.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10614',
  'Asa',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10614.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10615',
  'Strogonoff',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10615.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10618',
  'Salmão Master',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10618.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10620',
  'Salmão Supreme',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10620.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10622',
  'Asa',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  true,
  'active',
  ARRAY['/produtos/10622.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10623',
  'Condimento Gold',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  true,
  'active',
  ARRAY['/produtos/10623.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10577',
  'Picanha Gold',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10577.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10633',
  'Almôndega Prime',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10633.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10635',
  'Peito Premium',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10635.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10637',
  'Polvo Master',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10637.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10639',
  'Espetinho Gold',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10639.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10640',
  'Peito Gold',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10640.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10644',
  'Queijo',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  true,
  'active',
  ARRAY['/produtos/10644.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10647',
  'File de Peixe',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  true,
  'active',
  ARRAY['/produtos/10647.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10651',
  'Strogonoff Especial',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10651.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10652',
  'Almôndega',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10652.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10656',
  'Kafta Gold',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10656.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10657',
  'Strogonoff Supreme',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  true,
  'active',
  ARRAY['/produtos/10657.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10660',
  'Fraldinha Premium',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10660.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10662',
  'Tilápia Prime',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  true,
  'active',
  ARRAY['/produtos/10662.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10665',
  'Tempero Master',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10665.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10666',
  'Strogonoff Supreme',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  true,
  'active',
  ARRAY['/produtos/10666.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10672',
  'Espetinho',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  true,
  'active',
  ARRAY['/produtos/10672.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10682',
  'Coxa Especial',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10682.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10684',
  'Coxa Prime',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10684.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10687',
  'Costela Suína Supreme',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10687.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10688',
  'Salmão Master',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10688.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10689',
  'Strogonoff Supreme',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10689.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10691',
  'Sobrecoxa Gold',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10691.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10692',
  'Asa',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10692.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10693',
  'Filé Mignon Master',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10693.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10694',
  'Contrafilé Gold',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10694.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10695',
  'Queijo Especial',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10695.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10696',
  'Picanha Gold',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10696.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10700',
  'Maminha Prime',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10700.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10703',
  'Fraldinha',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10703.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10704',
  'Fraldinha',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10704.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10705',
  'Molho Master',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10705.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10625',
  'Tempero',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10625.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10711',
  'Camarão Premium',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10711.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10716',
  'Tempero',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10716.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10721',
  'Lombo Gold',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10721.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10740',
  'Tilápia Select',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10740.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10750',
  'Condimento Especial',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10750.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10751',
  'Maminha',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10751.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10756',
  'Kafta Supreme',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10756.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10757',
  'Lula Especial',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10757.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10758',
  'Strogonoff Supreme',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10758.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10782',
  'Queijo Supreme',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10782.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10790',
  'Presunto',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10790.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10804',
  'Maminha Premium',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10804.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10805',
  'Queijo Select',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10805.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10813',
  'Lula Premium',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10813.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10814',
  'Hambúrguer Especial',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10814.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10817',
  'Tilápia Especial',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10817.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10819',
  'Linguiça Select',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10819.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10829',
  'File de Peixe Select',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10829.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10830',
  'Mortadela Premium',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10830.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10831',
  'Cupim Select',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10831.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10835',
  'Coxa Especial',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10835.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10837',
  'Blanquet Especial',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10837.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10850',
  'Contrafilé Premium',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  true,
  'active',
  ARRAY['/produtos/10850.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10858',
  'Hambúrguer Supreme',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10858.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10859',
  'Kafta Select',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10859.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10865',
  'Tempero Prime',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  true,
  'active',
  ARRAY['/produtos/10865.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10867',
  'Strogonoff',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10867.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10873',
  'Fraldinha Especial',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'aves'),
  true,
  'active',
  ARRAY['/produtos/10873.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10880',
  'Filé Mignon Prime',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10880.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10897',
  'Alcatra',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10897.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10903',
  'Cupim Gold',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10903.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10709',
  'Especiaria Supreme',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10709.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10920',
  'Polvo Supreme',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10920.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10924',
  'Cupim Select',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10924.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10926',
  'Sobrecoxa Especial',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10926.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10935',
  'Contrafilé Prime',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10935.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10937',
  'Lombo Select',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10937.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10950',
  'Presunto Select',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10950.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10951',
  'Picanha Master',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10951.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10956',
  'Blanquet Gold',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10956.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10958',
  'Tempero Supreme',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10958.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10973',
  'Tilápia Especial',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10973.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10975',
  'Sobrecoxa Prime',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10975.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10976',
  'Especiaria Supreme',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10976.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10978',
  'Presunto Especial',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10978.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10980',
  'Espetinho Master',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  true,
  'active',
  ARRAY['/produtos/10980.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10982',
  'Coxa Supreme',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/10982.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10986',
  'Coxa Gold',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10986.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10988',
  'Salmão Especial',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10988.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10989',
  'Blanquet Gold',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10989.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10991',
  'Kafta Master',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10991.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10992',
  'Molho Especial',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10992.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10993',
  'Presunto Master',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10993.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10995',
  'Salsicha Select',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/10995.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10996',
  'Asa Supreme',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10996.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10997',
  'File de Peixe Prime',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  true,
  'active',
  ARRAY['/produtos/10997.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10999',
  'Fraldinha Prime',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10999.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11000',
  'Kafta Gold',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/11000.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11001',
  'Almôndega Master',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/11001.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11006',
  'Bacon Premium',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/11006.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11009',
  'Bacon Select',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/11009.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11010',
  'Salsicha Select',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/11010.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11011',
  'Sassami Master',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/11011.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10916',
  'Sassami Premium',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/10916.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11018',
  'Sassami',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/11018.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11021',
  'Salmão Gold',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/11021.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11022',
  'Maminha Gold',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/11022.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11025',
  'Blanquet',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/11025.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11037',
  'Pernil Prime',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/11037.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11044',
  'Queijo Select',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/11044.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11045',
  'Kafta Gold',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/11045.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11051',
  'Picanha Master',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/11051.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11055',
  'Lula Premium',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/11055.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11057_',
  'Especiaria Especial',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/11057_.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11058',
  'Espetinho Gold',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/11058.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11066',
  'Cupim Gold',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/11066.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11069',
  'Linguiça Premium',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/11069.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11075',
  'Bacon Gold',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/11075.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11080',
  'Contrafilé Prime',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/11080.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11081',
  'Fraldinha Master',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/11081.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11082',
  'Coxa Select',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/11082.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11100',
  'Tempero Master',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/11100.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11132',
  'Mortadela Especial',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/11132.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11253-2',
  'Polvo',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/11253-2.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11253_',
  'Linguiça Especial',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/11253_.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11260',
  'Contrafilé Premium',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/11260.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11276',
  'Camarão Select',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/11276.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11285',
  'Strogonoff Supreme',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/11285.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11288_',
  'Camarão Premium',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/11288_.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11296',
  'Blanquet Gold',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/11296.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11336',
  'Sobrecoxa Premium',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/11336.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11341',
  'Presunto',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/11341.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11345',
  'Sassami Premium',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/11345.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11349',
  'Salsicha Select',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/11349.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11351',
  'Picanha Supreme',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/11351.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11016',
  'Camarão Especial',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/11016.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11435',
  'Tempero Supreme',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  true,
  'active',
  ARRAY['/produtos/11435.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11436',
  'Hambúrguer Especial',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/11436.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11437',
  'Sobrecoxa Supreme',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  true,
  'active',
  ARRAY['/produtos/11437.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11438',
  'Espetinho Master',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/11438.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11439',
  'Hambúrguer Prime',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/11439.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11440',
  'Especiaria Master',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/11440.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11441',
  'Almôndega Supreme',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/11441.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '2041',
  'Cupim Prime',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  true,
  'active',
  ARRAY['/produtos/2041.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '2042',
  'Fraldinha Select',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/2042.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '3048',
  'Strogonoff Supreme',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/3048.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '3050',
  'Pernil Select',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/3050.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '3052',
  'File de Peixe Prime',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  true,
  'active',
  ARRAY['/produtos/3052.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '3059',
  'Linguiça Master',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/3059.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '3066',
  'Peito Especial',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/3066.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '3103',
  'Blanquet Prime',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/3103.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '3113',
  'Presunto Premium',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/3113.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '3117',
  'Bacon Select',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/3117.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '3138',
  'Alcatra Master',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/3138.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '3161',
  'Kafta Premium',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/3161.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '3204',
  'Salsicha',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/3204.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '3212',
  'Kafta Especial',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/3212.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '3224',
  'Condimento Gold',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/3224.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '4030',
  'Pernil Gold',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/4030.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '4051',
  'Mortadela Prime',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/4051.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '4055',
  'Condimento Premium',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/4055.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '4058',
  'Condimento Prime',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/4058.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '4108',
  'Especiaria',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/4108.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '5009',
  'Peito Master',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/5009.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '5012',
  'Asa Gold',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/5012.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '5016',
  'Filé Mignon Supreme',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/5016.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '5022',
  'Strogonoff Prime',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/5022.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '5028',
  'Sobrecoxa Premium',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/5028.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11434',
  'Cupim Gold',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/11434.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '5103',
  'Contrafilé Master',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/5103.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '5104',
  'Tilápia Especial',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/5104.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '5206',
  'Salmão Master',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/5206.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6013',
  'Peito Premium',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/6013.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6015',
  'File de Peixe Premium',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  true,
  'active',
  ARRAY['/produtos/6015.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6019',
  'Strogonoff Supreme',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/6019.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6036',
  'Fraldinha Prime',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/6036.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6048',
  'Tilápia Prime',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/6048.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6060',
  'Kafta Select',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/6060.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6061',
  'Alcatra Premium',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/6061.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6064',
  'Kafta Premium',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/6064.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6065',
  'Costela Suína',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/6065.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6067',
  'Molho Supreme',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/6067.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6072',
  'Sobrecoxa Select',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/6072.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6073',
  'Coxa Master',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/6073.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6125',
  'Filé Mignon Especial',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/6125.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6166',
  'Asa Select',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/6166.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6175',
  'Sassami Especial',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/6175.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6187',
  'Coxa Prime',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/6187.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6191',
  'Alcatra Prime',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/6191.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6307',
  'Salmão Master',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/6307.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6352',
  'Condimento Especial',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/6352.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6358',
  'Pernil Select',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/6358.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6371',
  'Queijo Gold',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/6371.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '6374',
  'Salmão Premium',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/6374.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8001',
  'Salame Master',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/8001.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8007',
  'Coxa Select',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/8007.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8010',
  'Polvo Supreme',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/8010.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8066',
  'Sobrecoxa Gold',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/8066.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8201',
  'Fraldinha Prime',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/8201.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8202',
  'File de Peixe',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/8202.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '5056',
  'Lombo',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/5056.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8221',
  'Salmão Select',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'aves'),
  true,
  'active',
  ARRAY['/produtos/8221.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8226',
  'Asa Supreme',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/8226.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8260',
  'Picanha Supreme',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/8260.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8274',
  'Costela Especial',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/8274.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8288',
  'Alcatra',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/8288.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8293',
  'Asa Premium',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/8293.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8294',
  'Especiaria Prime',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/8294.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8315',
  'Maminha Prime',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/8315.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8326',
  'Costela Master',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/8326.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8361',
  'Asa Select',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/8361.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8364',
  'Mortadela Gold',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  true,
  'active',
  ARRAY['/produtos/8364.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8398',
  'Polvo Prime',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/8398.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8403',
  'Espetinho Supreme',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/8403.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8431',
  'Tempero Gold',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/8431.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8436',
  'Tempero Premium',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/8436.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8437',
  'Cupim Supreme',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/8437.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8445',
  'Kafta Especial',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/8445.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8453',
  'Salmão',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/8453.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8454',
  'Filé Mignon Master',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/8454.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8465',
  'Peito Master',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/8465.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8494',
  'Camarão',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/8494.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8504',
  'Linguiça Master',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/8504.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8537',
  'Espetinho Prime',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/8537.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8553',
  'Queijo Supreme',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/8553.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8566',
  'Picanha Master',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/8566.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8584',
  'Queijo Gold',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/8584.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8618',
  'Molho Gold',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/8618.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8628',
  'Asa Prime',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/8628.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8664',
  'Filé Mignon Gold',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/8664.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8693',
  'Cupim Supreme',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/8693.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8704',
  'Contrafilé Prime',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/8704.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8216',
  'Sassami Premium',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/8216.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8737',
  'Filé Mignon Supreme',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  true,
  'active',
  ARRAY['/produtos/8737.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8763',
  'Polvo Especial',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/8763.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8779',
  'Especiaria Especial',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/8779.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8782',
  'Presunto Supreme',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/8782.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8783',
  'Coxa Gold',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/8783.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8798',
  'Strogonoff Master',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/8798.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8800',
  'Hambúrguer Select',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/8800.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8803',
  'Tempero Especial',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/8803.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8818',
  'Hambúrguer Especial',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/8818.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8820',
  'Costela Premium',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/8820.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8821',
  'Alcatra',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/8821.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8880',
  'Sobrecoxa Master',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  true,
  'active',
  ARRAY['/produtos/8880.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8887',
  'Fraldinha Supreme',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/8887.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8908',
  'Asa Supreme',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/8908.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8957',
  'Fraldinha Especial',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/8957.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8965',
  'Alcatra Select',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/8965.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8984',
  'Coxa Prime',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/8984.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8997',
  'Pernil Especial',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/8997.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9001',
  'Coxa Especial',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/9001.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9006',
  'Hambúrguer Supreme',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/9006.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9007',
  'Hambúrguer Prime',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/9007.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9011',
  'Hambúrguer Premium',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/9011.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9018',
  'Condimento Master',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/9018.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9019',
  'File de Peixe',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/9019.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9022',
  'Bacon',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/9022.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9029',
  'Queijo Supreme',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/9029.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9055',
  'Pernil Gold',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/9055.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9068',
  'Cupim',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/9068.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9089',
  'Fraldinha Master',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/9089.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9090',
  'Lula Especial',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/9090.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9091',
  'Alcatra Select',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/9091.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8725',
  'Fraldinha Supreme',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/8725.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9135',
  'Almôndega Select',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/9135.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9136',
  'Salsicha Prime',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/9136.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9155',
  'Sobrecoxa',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  true,
  'active',
  ARRAY['/produtos/9155.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9181',
  'Camarão Prime',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/9181.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9246',
  'Molho Master',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/9246.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9268',
  'Lula Gold',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/9268.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9273',
  'Lombo Gold',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/9273.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9332',
  'Hambúrguer',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/9332.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9338',
  'Pernil Prime',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/9338.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9371',
  'Alcatra Supreme',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/9371.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9376',
  'File de Peixe Gold',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/9376.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9410',
  'File de Peixe Supreme',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/9410.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9414',
  'Alcatra',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/9414.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9422',
  'Almôndega Select',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/9422.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9423',
  'Pernil Select',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/9423.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9449',
  'Maminha Select',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/9449.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9454',
  'Costela Suína Premium',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/9454.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9467',
  'Lula Gold',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/9467.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9470',
  'Sassami Premium',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/9470.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9476',
  'Linguiça Select',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/9476.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9477',
  'Alcatra Especial',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/9477.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9481',
  'Molho Gold',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/9481.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9482',
  'Strogonoff Especial',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/9482.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9483',
  'Salsicha Supreme',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/9483.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9484',
  'Contrafilé Prime',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/9484.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9486',
  'Camarão',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/9486.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9488',
  'Alcatra Supreme',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/9488.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9528',
  'Kafta',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/9528.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9552',
  'Picanha Prime',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/9552.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9556_',
  'Condimento',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/9556_.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9558',
  'Salmão Supreme',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  true,
  'active',
  ARRAY['/produtos/9558.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9559',
  'Lula Especial',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/9559.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9129',
  'Sassami Master',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  true,
  'active',
  ARRAY['/produtos/9129.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9586',
  'Especiaria Master',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/9586.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9603',
  'Molho Master',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  true,
  'active',
  ARRAY['/produtos/9603.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9624',
  'Blanquet Gold',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/9624.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9627',
  'Costela Premium',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/9627.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9645',
  'Pernil',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/9645.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9647',
  'Salame',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/9647.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9648',
  'Blanquet Gold',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/9648.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9649',
  'Sassami Prime',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/9649.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9650',
  'Cupim Prime',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/9650.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9657',
  'Peito Prime',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  true,
  'active',
  ARRAY['/produtos/9657.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9658',
  'Cupim Gold',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/9658.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9696',
  'Sassami Supreme',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/9696.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9699-copiar',
  'Tilápia Gold',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/9699 copiar.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9699',
  'Salsicha Premium',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/9699.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9704',
  'Cupim Prime',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  true,
  'active',
  ARRAY['/produtos/9704.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9711',
  'Filé Mignon Master',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/9711.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9713',
  'Tilápia Premium',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/9713.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9721',
  'Queijo Premium',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/9721.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9724',
  'Sassami Premium',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/9724.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9753',
  'Alcatra Gold',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/9753.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9754',
  'File de Peixe Select',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Bandeja 250g',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/9754.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9789',
  'Kafta Premium',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/9789.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9803',
  'Peito Master',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/9803.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9831',
  'Kafta Master',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Pacote 1kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/9831.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9846',
  'Salame Gold',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/9846.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9848',
  'Picanha',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/9848.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9854',
  'Kafta Supreme',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Embalagem a vácuo 2kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/9854.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9855',
  'Peito Supreme',
  'Excelente opção para seu negócio, com ótimo custo-benefício.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/9855.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9879',
  'Presunto Gold',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/9879.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9886',
  'Cupim Select',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  true,
  'active',
  ARRAY['/produtos/9886.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9910',
  'Hambúrguer Premium',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/9910.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9913',
  'Lula Select',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/9913.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9568',
  'Fraldinha Supreme',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Bandeja 500g',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/9568.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9931',
  'Picanha Gold',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/9931.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9937',
  'Condimento',
  'Corte especial selecionado, ideal para pratos gourmet e receitas sofisticadas.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/9937.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10011',
  'Kafta',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10011.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10201',
  'Alcatra Especial',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10201.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10576',
  'Strogonoff Supreme',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/10576.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10624',
  'Picanha Prime',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'aves'),
  true,
  'active',
  ARRAY['/produtos/10624.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10708',
  'Fraldinha Prime',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa master 15kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/10708.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '10915',
  'File de Peixe Especial',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/10915.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11014',
  'Linguiça Select',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Caixa com 5kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/11014.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '11433',
  'Alcatra Select',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/11433.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '5033',
  'File de Peixe Select',
  'Corte premium selecionado, perfeito para restaurantes e distribuidores.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/5033.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8212',
  'Costela',
  'Excelente para revenda, com embalagem prática e durabilidade garantida.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  false,
  'active',
  ARRAY['/produtos/8212.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '8709',
  'Molho Master',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/8709.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9102',
  'Tempero Supreme',
  'Opção versátil que combina com diversos tipos de preparo culinário.',
  'Unidade 1kg',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/9102.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9562',
  'Asa Master',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'congelados'),
  false,
  'active',
  ARRAY['/produtos/9562.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9918',
  'Tilápia Especial',
  'Produto premium para clientes exigentes que buscam qualidade superior.',
  'Bandeja 1kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/9918.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9927',
  'Kafta',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Saco plástico 3kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  false,
  'active',
  ARRAY['/produtos/9927.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9956',
  'Fraldinha Select',
  'Produto de alta qualidade, ideal para churrasco e preparo de diversas receitas.',
  'Pacote 500g',
  (SELECT id FROM categories WHERE slug = 'resfriados'),
  false,
  'active',
  ARRAY['/produtos/9956.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9960',
  'Filé Mignon Supreme',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/9960.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9972',
  'Alcatra Gold',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/9972.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9975',
  'Maminha Select',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Caixa com 20 unidades',
  (SELECT id FROM categories WHERE slug = 'especiais'),
  false,
  'active',
  ARRAY['/produtos/9975.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9986',
  'Kafta Especial',
  'Produto congelado de primeira linha, mantendo o sabor e textura originais.',
  'Caixa com 10kg',
  (SELECT id FROM categories WHERE slug = 'bovinos'),
  true,
  'active',
  ARRAY['/produtos/9986.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  '9999',
  'Alcatra Gold',
  'Produto de origem controlada, garantindo máxima qualidade e procedência.',
  'Pacote família 2kg',
  (SELECT id FROM categories WHERE slug = 'suinos'),
  true,
  'active',
  ARRAY['/produtos/9999.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;

INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  'Camada-21',
  'Costela Suína Gold',
  'Produto refrigerado, pronto para preparo imediato em seu estabelecimento.',
  'Embalagem individual',
  (SELECT id FROM categories WHERE slug = 'aves'),
  false,
  'active',
  ARRAY['/produtos/Camada 21.jpg']::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;


-- ==========================================
-- IMPORTAR USUÁRIOS (3 registros)
-- ==========================================

INSERT INTO admin_users (name, email, password, role, phone, company)
VALUES (
  'Admin Master',
  'admin@royalalimentos.com.br',
  'admin123',
  'admin',
  NULL,
  NULL
)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  password = EXCLUDED.password,
  role = EXCLUDED.role,
  phone = EXCLUDED.phone,
  company = EXCLUDED.company;

INSERT INTO admin_users (name, email, password, role, phone, company)
VALUES (
  'Felipe Vendedor',
  'vendedor@royalalimentos.com.br',
  'vendas123',
  'vendedor',
  NULL,
  NULL
)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  password = EXCLUDED.password,
  role = EXCLUDED.role,
  phone = EXCLUDED.phone,
  company = EXCLUDED.company;

INSERT INTO admin_users (name, email, password, role, phone, company)
VALUES (
  'felipeteste@teste.com',
  'felipeteste@teste.com',
  'felipeteste@teste.com',
  'cliente',
  '1111111111111',
  'felipeteste@teste.com'
)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  password = EXCLUDED.password,
  role = EXCLUDED.role,
  phone = EXCLUDED.phone,
  company = EXCLUDED.company;


-- ==========================================
-- IMPORTAR BANNERS (4 registros)
-- ==========================================

DELETE FROM banners;

INSERT INTO banners (desktop_image, mobile_image, link_url, "order", active)
VALUES (
  'https://img.cdndsgni.com/preview/12371126.jpg',
  'https://img.cdndsgni.com/preview/12371126.jpg',
  '/produtos',
  1,
  true
);

INSERT INTO banners (desktop_image, mobile_image, link_url, "order", active)
VALUES (
  'https://img.cdndsgni.com/preview/12582555.jpg',
  'https://img.cdndsgni.com/preview/12582555.jpg',
  '/produtos',
  2,
  true
);

INSERT INTO banners (desktop_image, mobile_image, link_url, "order", active)
VALUES (
  'https://img.cdndsgni.com/preview/12371126.jpg',
  'https://img.cdndsgni.com/preview/12371126.jpg',
  '/produtos',
  1,
  true
);

INSERT INTO banners (desktop_image, mobile_image, link_url, "order", active)
VALUES (
  'https://img.cdndsgni.com/preview/12582555.jpg',
  'https://img.cdndsgni.com/preview/12582555.jpg',
  '/produtos',
  2,
  true
);


-- ==========================================
-- IMPORTAR QUOTE REQUESTS (2 registros)
-- ==========================================

-- Limpa quotes existentes
DELETE FROM quote_items;
DELETE FROM quote_requests;

-- Quote Request ID Original: 1
INSERT INTO quote_requests (customer_name, customer_company, customer_cnpj, customer_email, customer_phone, status, created_at)
VALUES (
  'João Silva',
  'Restaurante Sabor & Arte',
  '12.345.678/0001-90',
  'joao@saborarte.com.br',
  '(11) 98765-4321',
  'novo',
  '2025-10-29T14:24:31.879Z'
);

-- Itens da quote
INSERT INTO quote_items (quote_request_id, product_id, product_name, product_sku, quantity)
VALUES (
  (SELECT id FROM quote_requests WHERE customer_email = 'joao@saborarte.com.br' AND created_at = '2025-10-29T14:24:31.879Z' LIMIT 1),
  (SELECT id FROM products WHERE sku = 'SUI-002'),
  'Lombo Suíno Premium',
  'SUI-002',
  5
);

INSERT INTO quote_items (quote_request_id, product_id, product_name, product_sku, quantity)
VALUES (
  (SELECT id FROM quote_requests WHERE customer_email = 'joao@saborarte.com.br' AND created_at = '2025-10-29T14:24:31.879Z' LIMIT 1),
  (SELECT id FROM products WHERE sku = 'SUI-001'),
  'Costela Suína em Ripa',
  'SUI-001',
  3
);

-- Quote Request ID Original: 2
INSERT INTO quote_requests (customer_name, customer_company, customer_cnpj, customer_email, customer_phone, status, created_at)
VALUES (
  'Felipe',
  'wqewe',
  '13.646.474/6384-34',
  'admin@royalalimentos.com.br',
  '(12) 12121-2121',
  'novo',
  '2025-10-29T15:52:36.785Z'
);

-- Itens da quote
INSERT INTO quote_items (quote_request_id, product_id, product_name, product_sku, quantity)
VALUES (
  (SELECT id FROM quote_requests WHERE customer_email = 'admin@royalalimentos.com.br' AND created_at = '2025-10-29T15:52:36.785Z' LIMIT 1),
  (SELECT id FROM products WHERE sku = 'AVE-001'),
  'Peito de Frango IQF',
  'AVE-001',
  2
);

INSERT INTO quote_items (quote_request_id, product_id, product_name, product_sku, quantity)
VALUES (
  (SELECT id FROM quote_requests WHERE customer_email = 'admin@royalalimentos.com.br' AND created_at = '2025-10-29T15:52:36.785Z' LIMIT 1),
  (SELECT id FROM products WHERE sku = 'SUI-002'),
  'Lombo Suíno Premium',
  'SUI-002',
  2
);


COMMIT;

-- ==========================================
-- IMPORTAÇÃO CONCLUÍDA!
-- ==========================================
-- Categorias: 6
-- Produtos: 476
-- Usuários: 3
-- Banners: 4
-- Quote Requests: 2
-- Quote Items: 4
-- ==========================================
