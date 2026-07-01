-- ============================================================================
-- PUBLIK — Seed de propiedades demo
-- ----------------------------------------------------------------------------
-- Uso:
--   1. Iniciá sesión UNA vez en /login con tu email (crea tu agencia).
--   2. Supabase → SQL Editor → New query → pegá esto.
--   3. Cambiá 'tu@email.com' por TU email (el que usaste para entrar).
--   4. Run. Refrescá /dashboard.
--
-- Es idempotente: borra e inserta solo las propiedades demo de TU agencia
-- (marcadas con direccion = 'DEMO'), sin tocar tus propiedades reales.
-- Corre como owner del proyecto (bypass RLS) desde el SQL Editor.
-- ============================================================================

do $$
declare
  v_agent  uuid;
  v_agency uuid;
  p1 uuid; p2 uuid; p3 uuid; p4 uuid; p5 uuid;
begin
  -- Agarra automáticamente el último usuario que inició sesión (tu cuenta).
  select id, agency_id into v_agent, v_agency
  from app_users order by created_at desc limit 1;

  if v_agent is null then
    raise exception
      'No hay ningún usuario todavía. Iniciá sesión primero en /login (te llega un magic link al email) y volvé a correr.';
  end if;

  -- Limpieza idempotente: solo las demo de esta agencia
  delete from properties where agency_id = v_agency and direccion = 'DEMO';

  -- 1) Casa en Lambaré ------------------------------------------------------
  insert into properties (agency_id, agent_id, operacion, tipo, precio, moneda,
    dormitorios, banos, cocheras, superficie_terreno_m2, superficie_construida_m2,
    pais, ciudad, barrio, direccion, titulo, descripcion, amenities, estado)
  values (v_agency, v_agent, 'venta', 'casa', 145000, 'USD',
    3, 3, 2, 420, 260,
    'Paraguay', 'Lambaré', 'Santa Rosa', 'DEMO',
    'Casa moderna con piscina',
    'Casa a estrenar con piscina, quincho y amplio jardín. Excelente ubicación en Santa Rosa, Lambaré.',
    array['piscina','quincho','jardín','aire acondicionado'], 'publicada')
  returning id into p1;
  insert into portal_publications (property_id, portal, estado) values
    (p1,'infocasas','publicada'), (p1,'marketplace','publicada'),
    (p1,'clasipar','publicada'), (p1,'fb_page','publicada'),
    (p1,'instagram','publicando');

  -- 2) Departamento en Villa Morra -----------------------------------------
  insert into properties (agency_id, agent_id, operacion, tipo, precio, moneda,
    dormitorios, banos, cocheras, superficie_construida_m2,
    pais, ciudad, barrio, direccion, titulo, descripcion, amenities, estado)
  values (v_agency, v_agent, 'venta', 'departamento', 98000, 'USD',
    2, 2, 1, 78,
    'Paraguay', 'Asunción', 'Villa Morra', 'DEMO',
    'Departamento a estrenar',
    'Departamento a estrenar en Villa Morra, con balcón, cochera y amenities del edificio.',
    array['balcón','gimnasio','piscina','seguridad 24h'], 'publicada')
  returning id into p2;
  insert into portal_publications (property_id, portal, estado) values
    (p2,'infocasas','publicada'), (p2,'marketplace','publicada'),
    (p2,'clasipar','pendiente'), (p2,'fb_page','publicada'),
    (p2,'instagram','pendiente');

  -- 3) Dúplex en San Lorenzo (con un error de portal) ----------------------
  insert into properties (agency_id, agent_id, operacion, tipo, precio, moneda,
    dormitorios, banos, cocheras, superficie_terreno_m2, superficie_construida_m2,
    pais, ciudad, barrio, direccion, titulo, descripcion, amenities, estado)
  values (v_agency, v_agent, 'alquiler', 'casa', 6500000, 'PYG',
    4, 3, 2, 300, 210,
    'Paraguay', 'San Lorenzo', 'Barrio Obrero', 'DEMO',
    'Dúplex con jardín',
    'Dúplex de 4 dormitorios con jardín y cochera doble. Ideal para familia.',
    array['jardín','cochera doble','lavadero'], 'publicada')
  returning id into p3;
  insert into portal_publications (property_id, portal, estado, error_msg) values
    (p3,'infocasas','publicada', null), (p3,'marketplace','error','Faltan fotos requeridas'),
    (p3,'clasipar','publicada', null), (p3,'fb_page','publicada', null),
    (p3,'instagram','publicada', null);

  -- 4) Terreno en Luque -----------------------------------------------------
  insert into properties (agency_id, agent_id, operacion, tipo, precio, moneda,
    dormitorios, banos, cocheras, superficie_terreno_m2,
    pais, ciudad, barrio, direccion, titulo, descripcion, amenities, estado)
  values (v_agency, v_agent, 'venta', 'terreno', 62000, 'USD',
    0, 0, 0, 600,
    'Paraguay', 'Luque', 'Isla Bogado', 'DEMO',
    'Terreno en zona alta',
    'Terreno de 600 m² en zona alta y consolidada de Luque. Todos los servicios.',
    array['zona alta','servicios'], 'publicada')
  returning id into p4;
  insert into portal_publications (property_id, portal, estado) values
    (p4,'infocasas','publicada'), (p4,'marketplace','pendiente'),
    (p4,'clasipar','pendiente'), (p4,'fb_page','pendiente'),
    (p4,'instagram','pendiente');

  -- 5) Oficina en el microcentro -------------------------------------------
  insert into properties (agency_id, agent_id, operacion, tipo, precio, moneda,
    dormitorios, banos, cocheras, superficie_construida_m2,
    pais, ciudad, barrio, direccion, titulo, descripcion, amenities, estado)
  values (v_agency, v_agent, 'alquiler', 'oficina', 850, 'USD',
    0, 1, 0, 55,
    'Paraguay', 'Asunción', 'Centro', 'DEMO',
    'Oficina equipada en microcentro',
    'Oficina de 55 m² equipada, con aire y conexión, en el microcentro de Asunción.',
    array['equipada','aire acondicionado','internet'], 'publicando')
  returning id into p5;
  insert into portal_publications (property_id, portal, estado) values
    (p5,'infocasas','publicando'), (p5,'marketplace','publicada'),
    (p5,'clasipar','publicada'), (p5,'fb_page','publicando'),
    (p5,'instagram','pendiente');

  raise notice 'Seed demo OK: 5 propiedades para la agencia %', v_agency;
end $$;
