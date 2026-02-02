import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductSlider from "@/components/ProductSlider";
import ProductSection from "@/components/ProductSection";
import Invoice from "@/components/Invoice";
import InvoicePreview from "@/components/InvoicePreview";
import { products } from "@/data/products";

export default function Home() {
  return (
    <>
      <Header />
      <ProductSlider />

      <div className="flex flex-col lg:flex-row gap-4 p-4">
        {/* Products */}
        <div className="flex-1">
          <ProductSection id="fans" title="Fans" items={products.fans} />
          <ProductSection id="lights" title="Lights" items={products.lights} />
          <ProductSection id="chars" title="Chars" items={products.chars} />
          <ProductSection
            id="switches"
            title="Switches"
            items={products.switches}
          />
        </div>

        {/* Invoice */}
        <div className="lg:w-[320px]">
          <Invoice />
        </div>
      </div>
<InvoicePreview />
      <Footer />
    </>
  );
}
