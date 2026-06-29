"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PropertyForm } from "../../../../components/property-form";
import { PhotoUploader } from "../../../../components/photo-uploader";
import { createClient } from "../../../../lib/supabase/client";
import { useI18n } from "../../../../i18n/client";
import type { PropertyInput } from "../../../../domain/property-schema";

export default function NewPropertyPage() {
  const router = useRouter();
  const { dict } = useI18n();
  const [files, setFiles] = useState<File[]>([]);

  async function save(input: PropertyInput) {
    const supabase = createClient();
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const { data: au } = await supabase
      .from("app_users")
      .select("agency_id")
      .eq("id", u.user.id)
      .single();

    const { data: prop, error } = await supabase
      .from("properties")
      .insert({
        agency_id: au!.agency_id,
        agent_id: u.user.id,
        operacion: input.operacion,
        tipo: input.tipo,
        precio: input.precio,
        moneda: input.moneda,
        dormitorios: input.dormitorios,
        banos: input.banos,
        cocheras: input.cocheras,
        superficie_construida_m2: input.superficieConstruidaM2,
        superficie_terreno_m2: input.superficieTerrenoM2,
        pais: input.pais,
        ciudad: input.ciudad,
        titulo: input.titulo,
        descripcion: input.descripcion,
        amenities: input.amenities,
      })
      .select("id")
      .single();
    if (error || !prop) return;

    for (let i = 0; i < files.length; i++) {
      const path = `${prop.id}/${i}-${files[i].name}`;
      const up = await supabase.storage
        .from("property-photos")
        .upload(path, files[i]);
      if (!up.error) {
        await supabase.from("photos").insert({
          property_id: prop.id,
          storage_url: up.data.path,
          orden: i,
        });
      }
    }
    router.push("/dashboard");
  }

  return (
    <main className="space-y-6">
      <div>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          {dict.dashboard.back}
        </Link>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          {dict.dashboard.newPropertyTitle}
        </h1>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <PhotoUploader onFiles={setFiles} />
        <PropertyForm onSubmit={save} />
      </div>
    </main>
  );
}
