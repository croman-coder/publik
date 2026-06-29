// Infocasas adapter.
// Declares how to translate a canonical PUBLIK property into the Infocasas
// "publish property" form. Selectors and dropdown labels below are best-effort
// and MUST be verified against the live Infocasas publish page DOM — when the
// portal changes its markup, this is the ONE file to update.
//
// The engine reports any selector it can't find, so a stale selector degrades
// to "field not filled" instead of breaking the whole fill.

(function () {
  const PUBLIK = (window.__PUBLIK__ = window.__PUBLIK__ || {});

  // Canonical value -> Infocasas dropdown label/value. Verify against the form.
  const OPERACION = {
    venta: "Venta",
    alquiler: "Alquiler",
    alquiler_temporal: "Alquiler temporario",
  };
  const TIPO = {
    casa: "Casa",
    departamento: "Departamento",
    terreno: "Terreno",
    local: "Local",
    oficina: "Oficina",
    deposito: "Depósito",
  };
  const MONEDA = {
    USD: "USD",
    PYG: "Guaraníes",
  };

  // TODO: confirm these selectors on the real Infocasas publish form.
  const SEL = {
    operacion: "select[name='operation'], #operation",
    tipo: "select[name='propertyType'], #propertyType",
    precio: "input[name='price'], #price",
    moneda: "select[name='currency'], #currency",
    dormitorios: "input[name='bedrooms'], #bedrooms",
    banos: "input[name='bathrooms'], #bathrooms",
    cocheras: "input[name='garages'], #garages",
    superficieConstruida: "input[name='builtArea'], #builtArea",
    superficieTerreno: "input[name='landArea'], #landArea",
    ciudad: "input[name='city'], #city",
    barrio: "input[name='neighborhood'], #neighborhood",
    direccion: "input[name='address'], #address",
    titulo: "input[name='title'], #title",
    descripcion: "textarea[name='description'], #description",
  };

  function match(url) {
    return /infocasas\.com\.py/.test(url) && /publicar|nueva|crear/i.test(url);
  }

  function build(property) {
    return [
      { kind: "select", selector: SEL.operacion, value: OPERACION[property.operacion] },
      { kind: "select", selector: SEL.tipo, value: TIPO[property.tipo] },
      { kind: "input", selector: SEL.precio, value: property.precio },
      { kind: "select", selector: SEL.moneda, value: MONEDA[property.moneda] },
      { kind: "input", selector: SEL.dormitorios, value: property.dormitorios },
      { kind: "input", selector: SEL.banos, value: property.banos },
      { kind: "input", selector: SEL.cocheras, value: property.cocheras },
      { kind: "input", selector: SEL.superficieConstruida, value: property.superficie_construida_m2 },
      { kind: "input", selector: SEL.superficieTerreno, value: property.superficie_terreno_m2 },
      { kind: "input", selector: SEL.ciudad, value: property.ciudad },
      { kind: "input", selector: SEL.barrio, value: property.barrio },
      { kind: "input", selector: SEL.direccion, value: property.direccion },
      { kind: "input", selector: SEL.titulo, value: property.titulo },
      { kind: "input", selector: SEL.descripcion, value: property.descripcion },
    ];
  }

  PUBLIK.adapters = PUBLIK.adapters || {};
  PUBLIK.adapters.infocasas = { name: "infocasas", match, build };
})();
