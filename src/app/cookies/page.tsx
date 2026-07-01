import type { Metadata } from "next";
import { LegalShell } from "../../components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Qué cookies usa PUBLIK, para qué sirven y cómo podés gestionarlas desde tu navegador.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalShell
      title="Política de Cookies"
      updated="30 de junio de 2026"
      intro="Esta política explica qué cookies utiliza PUBLIK y cómo podés controlarlas. Se complementa con nuestra Política de Privacidad."
    >
      <h2>1. Qué son las cookies</h2>
      <p>
        Las cookies son pequeños archivos que un sitio guarda en tu dispositivo para recordar
        información entre visitas: por ejemplo, mantener tu sesión iniciada o tu idioma preferido.
      </p>

      <h2>2. Qué cookies usamos</h2>
      <ul>
        <li>
          <strong>Estrictamente necesarias:</strong> permiten iniciar sesión, mantener la sesión
          segura y que la plataforma funcione. Sin ellas el servicio no puede operar.
        </li>
        <li>
          <strong>De preferencias:</strong> recuerdan opciones como el idioma (por ejemplo, la
          cookie de idioma <code>lang</code>).
        </li>
      </ul>
      <p>
        Hoy no utilizamos cookies de publicidad para perfilarte. Si en el futuro incorporamos cookies
        analíticas o de terceros, actualizaremos esta política y, cuando corresponda, te pediremos tu
        consentimiento.
      </p>

      <h2>3. Cookies de terceros</h2>
      <p>
        Al conectar tu cuenta con servicios externos (por ejemplo, redes sociales para publicar tus
        avisos) esos terceros pueden establecer sus propias cookies, regidas por sus respectivas
        políticas.
      </p>

      <h2>4. Cómo gestionar las cookies</h2>
      <p>
        Podés borrar o bloquear las cookies desde la configuración de tu navegador. Tené en cuenta
        que si bloqueás las cookies necesarias, es posible que no puedas iniciar sesión ni usar
        partes del servicio.
      </p>

      <h2>5. Cambios</h2>
      <p>
        Podemos actualizar esta política. Publicaremos la versión vigente en esta página con su fecha
        de actualización.
      </p>

      <h2>6. Contacto</h2>
      <p>
        Consultas: <a href="mailto:hola@publik.com.py">hola@publik.com.py</a>.
      </p>
    </LegalShell>
  );
}
