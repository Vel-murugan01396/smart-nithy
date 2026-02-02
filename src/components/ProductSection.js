import ProductCard from "./ProductCard";

export default function ProductSection({ id, title, items }) {
  return (
    <section id={id} className="mb-6">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
