import type { Metadata } from "next";
import { LegalShell } from "../../components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo PUBLIK recopila, usa y protege los datos personales de agentes inmobiliarios, conforme al marco de Paraguay y de América Latina.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <LegalShell
      title="Política de Privacidad"
      updated="30 de junio de 2026"
      intro="En PUBLIK cuidamos tus datos personales. Esta política explica qué información recopilamos, con qué finalidad, cómo la protegemos y qué derechos tenés sobre ella. Se aplica a agentes, agencias y visitantes de la plataforma."
    >
      <h2>1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento de los datos es <strong>PUBLIK</strong>, con domicilio en
        Paraguay. Para cualquier consulta sobre tus datos podés escribir a{" "}
        <a href="mailto:hola@publik.com.py">hola@publik.com.py</a>.
      </p>

      <h2>2. Qué datos recopilamos</h2>
      <ul>
        <li>
          <strong>Datos de cuenta:</strong> correo electrónico y, opcionalmente, nombre de la
          agencia o del agente.
        </li>
        <li>
          <strong>Datos de las propiedades que cargás:</strong> descripciones, precios, ubicación,
          características y fotografías de los inmuebles.
        </li>
        <li>
          <strong>Datos de conexión con portales:</strong> credenciales o tokens que autorizás para
          publicar en tu nombre (por ejemplo, tu Página de Facebook/Instagram).
        </li>
        <li>
          <strong>Datos de uso:</strong> información técnica de la sesión, dirección IP y registros
          de actividad, para seguridad y mejora del servicio.
        </li>
      </ul>

      <h2>3. Para qué usamos tus datos</h2>
      <ul>
        <li>Prestarte el servicio: crear tu cuenta y publicar tus avisos en los portales elegidos.</li>
        <li>Mantener sincronizados tus avisos y mostrarte el estado de cada publicación.</li>
        <li>Enviarte comunicaciones operativas (acceso, avisos del servicio, soporte).</li>
        <li>Seguridad, prevención de fraude y cumplimiento de obligaciones legales.</li>
      </ul>

      <h2>4. Base de legitimación</h2>
      <p>
        Tratamos tus datos con base en tu <strong>consentimiento</strong>, en la{" "}
        <strong>ejecución del contrato</strong> (la prestación del servicio que contratás) y en el
        cumplimiento de obligaciones legales aplicables. Podés retirar tu consentimiento en cualquier
        momento, sin que ello afecte la licitud del tratamiento previo.
      </p>

      <h2>5. Con quién compartimos tus datos</h2>
      <ul>
        <li>
          <strong>Portales inmobiliarios y redes</strong> donde elegís publicar (por ejemplo
          Infocasas, Clasipar, Facebook, Marketplace, Instagram): les enviamos la información del
          aviso necesaria para publicarlo.
        </li>
        <li>
          <strong>Proveedores tecnológicos</strong> que nos ayudan a operar (alojamiento,
          infraestructura y base de datos), que actúan como encargados de tratamiento bajo acuerdos
          de confidencialidad.
        </li>
        <li>
          <strong>Autoridades</strong>, cuando exista una obligación legal o un requerimiento válido.
        </li>
      </ul>
      <p>No vendemos tus datos personales.</p>

      <h2>6. Transferencias internacionales</h2>
      <p>
        Algunos de nuestros proveedores pueden alojar datos fuera de Paraguay. En esos casos
        adoptamos medidas razonables para que la información mantenga un nivel de protección
        adecuado, conforme a la normativa aplicable.
      </p>

      <h2>7. Plazo de conservación</h2>
      <p>
        Conservamos tus datos mientras tu cuenta esté activa y durante el tiempo necesario para
        cumplir con las finalidades descritas y con las obligaciones legales. Luego los eliminamos o
        anonimizamos.
      </p>

      <h2>8. Tus derechos</h2>
      <p>
        De acuerdo con la acción de <strong>hábeas data</strong> reconocida en el artículo 135 de la
        Constitución de la República del Paraguay y con los principios de protección de datos
        vigentes en América Latina, podés ejercer tus derechos de{" "}
        <strong>acceso, rectificación, actualización, supresión (cancelación) y oposición</strong>,
        así como la portabilidad y la limitación del tratamiento cuando corresponda.
      </p>
      <p>
        Para ejercerlos, escribinos a <a href="mailto:hola@publik.com.py">hola@publik.com.py</a>.
        Responderemos en un plazo razonable.
      </p>

      <h2>9. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos (cifrado en
        tránsito, control de acceso y aislamiento por agencia). Ningún sistema es 100% infalible,
        pero trabajamos para minimizar los riesgos.
      </p>

      <h2>10. Cookies</h2>
      <p>
        Usamos cookies estrictamente necesarias para el funcionamiento del servicio. Podés conocer
        el detalle en nuestra <a href="/cookies">Política de Cookies</a>.
      </p>

      <h2>11. Menores de edad</h2>
      <p>
        El servicio está dirigido a personas mayores de edad y a profesionales del sector
        inmobiliario. No recopilamos datos de menores de forma intencional.
      </p>

      <h2>12. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta política. Publicaremos la versión vigente en esta página con su fecha
        de actualización.
      </p>

      <h2>13. Marco legal aplicable</h2>
      <p>
        Esta política se rige por la legislación de la República del Paraguay (incluida la garantía
        de hábeas data) y busca alinearse con las normas de protección de datos personales de la
        región, como la Ley 25.326 (Argentina), la LGPD (Brasil), la Ley 1581 (Colombia), la LFPDPPP
        (México) y equivalentes en los países donde operes.
      </p>
    </LegalShell>
  );
}
