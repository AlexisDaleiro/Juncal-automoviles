import Link from "next/link";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="num text-5xl text-bronze-600">404</p>
      <h1 className="display mt-4 text-3xl">Esta unidad ya no está acá</h1>
      <p className="mx-auto mt-3 max-w-md text-text-2">Puede que se haya vendido. Mirá el resto del stock o escribinos y te ayudamos a encontrar uno parecido.</p>
      <Link href="/vehiculos" className={buttonVariants({ variant: "primary", size: "lg", className: "mt-8" })}>
        Ver todos los vehículos
      </Link>
    </Container>
  );
}
