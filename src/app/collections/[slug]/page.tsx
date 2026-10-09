import { redirect } from "next/navigation";

export function generateStaticParams() {
  return [
    { slug: "all" },
    { slug: "all-products" },
    { slug: "premium-stands" },
    { slug: "qr-code-stands-pakistan" },
  ];
}

export default function CollectionPage() {
  redirect("/products");
}
