import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getProductBySlug, getAllProducts } from "@/data/products";
import ProductLandingPage from "@/components/product/ProductLandingPage";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | TapScan.pk",
    };
  }

  return {
    title: `${product.title} | TapScan.pk Pakistan`,
    description: product.tagline,
    openGraph: {
      title: product.title,
      description: product.tagline,
      images: [
        {
          url: product.images[0] || "/products/product-1.jpg",
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
  };
}

async function ProductContent({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductLandingPage product={product} />;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#08497e" }}>
          Loading TapScan product details...
        </div>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}
