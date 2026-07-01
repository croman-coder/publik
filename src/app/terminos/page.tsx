import type { Metadata } from "next";
import { LegalShell } from "../../components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Condiciones de uso de PUBLIK, la plataforma para agentes inmobiliarios que publica propiedades en todos los portales.",
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <LegalShell
      title="Términos y Condiciones"
      updated="30 de junio de 2026"
      intro="Estos términos regulan el uso de PUBLIK. Al crear una cuenta o usar la plataforma aceptás estas condiciones. Si no estás de acuerdo, no utilices el servicio."
    >
      <h2>1. Objeto del servicio</h2>
      <p>
        PUBLIK es una plataforma que permite a agentes y agencias inmobiliarias cargar una propiedad
        una sola vez y distribuir el aviso, de forma sincronizada, a distintos portales inmobiliarios
        y redes (por ejemplo Infocasas, Clasipar, Facebook, Marketplace e Instagram).
      </p>

      <h2>2. Registro y cuenta</h2>
      <p>
        Para usar el servicio debés crear una cuenta con datos veraces y mantenerlos actualizados.
        Sos responsable de la confidencialidad de tu acceso y de toda actividad realizada desde tu
        cuenta. Notificanos ante cualquier uso no autorizado.
      </p>

      <h2>3. Uso aceptable</h2>
      <ul>
        <li>No publicar avisos falsos, engañosos, duplicados o que no te pertenezcan.</li>
        <li>No infringir derechos de terceros ni normas aplicables.</li>
        <li>No intentar vulnerar la seguridad de la plataforma ni de los portales conectados.</li>
        <li>Respetar las reglas de publicación de cada portal de destino.</li>
      </ul>

      <h2>4. Contenido de los avisos</h2>
      <p>
        Sos el único responsable del contenido que cargás (textos, precios, ubicaciones,
        características y fotografías) y de contar con los derechos y autorizaciones necesarios para
        publicarlo. Debés asegurar la veracidad de la información y el cumplimiento de la normativa
        aplicable a la oferta inmobiliaria.
      </p>

      <h2>5. Publicación en portales de terceros</h2>
      <p>
        PUBLIK facilita la distribución de tus avisos, pero cada portal o red social es un tercero
        independiente con sus propias reglas. No garantizamos la aceptación, el posicionamiento ni la
        permanencia de una publicación en un portal, ya que dependen de las políticas y de la
        disponibilidad técnica de cada uno.
      </p>

      <h2>6. Planes y pagos</h2>
      <p>
        Algunos planes son pagos. Los precios, límites y condiciones se informan en la sección de
        precios. Salvo indicación en contrario, las suscripciones se renuevan según el plan elegido y
        podés cambiar o cancelar tu plan de acuerdo con las condiciones vigentes.
      </p>

      <h2>7. Propiedad intelectual</h2>
      <p>
        La plataforma, su marca, diseño y software son propiedad de PUBLIK o de sus licenciantes.
        Conservás la titularidad del contenido que cargás y nos otorgás una licencia limitada para
        procesarlo y distribuirlo con el único fin de prestarte el servicio.
      </p>

      <h2>8. Disponibilidad del servicio</h2>
      <p>
        Trabajamos para mantener el servicio disponible, pero puede haber interrupciones por
        mantenimiento, causas de fuerza mayor o factores externos (incluidos los portales
        conectados). No garantizamos disponibilidad ininterrumpida.
      </p>

      <h2>9. Limitación de responsabilidad</h2>
      <p>
        En la medida permitida por la ley, PUBLIK no será responsable por daños indirectos,
        incidentales o lucro cesante derivados del uso o la imposibilidad de uso del servicio, ni por
        decisiones o acciones de portales de terceros.
      </p>

      <h2>10. Suspensión y terminación</h2>
      <p>
        Podemos suspender o dar de baja cuentas que incumplan estos términos o que realicen usos
        indebidos. Podés cerrar tu cuenta cuando quieras.
      </p>

      <h2>11. Modificaciones</h2>
      <p>
        Podemos actualizar estos términos. Publicaremos la versión vigente en esta página con su
        fecha de actualización. El uso continuado del servicio implica la aceptación de los cambios.
      </p>

      <h2>12. Ley aplicable y jurisdicción</h2>
      <p>
        Estos términos se rigen por las leyes de la República del Paraguay. Cualquier controversia se
        someterá a los tribunales competentes de Paraguay, sin perjuicio de las normas de protección
        al consumidor aplicables en tu país.
      </p>

      <h2>13. Contacto</h2>
      <p>
        Consultas sobre estos términos: <a href="mailto:hola@publik.com.py">hola@publik.com.py</a>.
      </p>
    </LegalShell>
  );
}
