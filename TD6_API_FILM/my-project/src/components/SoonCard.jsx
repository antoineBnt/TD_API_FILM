export default function Card({ img, titre }) {
  return (
    <section className="flex justify-center">
      <div className="relative inline-block group w-40 h-600 rounded-2xl overflow-hidden">
        <img src={img} alt="Dora" className="w-full h-full object-cover" />

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 h-0 mb-2 bg-GrisTresClair backdrop-blur-[16px] bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:h-1/4 group-hover:opacity-100 transition-all duration-200 rounded-xl">
          {titre}
        </div>
      </div>
    </section>
  );
}
