const ORANGE = "#F47920";

const AnimatedMapCard = () => {
  return (
    <section className="py-16 bg-sicta-bg-peach overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-sicta-grey-dark mb-3">
            Carte de couverture nationale
          </h2>
          <p className="text-sicta-grey-light">
            Toutes les agences SICTA positionnées sur le territoire ivoirien.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <img
            src="/CARTE_SICTA.png"
            alt="Carte réseau SICTA Côte d'Ivoire"
            className="w-full h-auto"
            draggable={false}
          />
        </div>

        {/* Compteurs statiques */}
        <div className="flex flex-wrap justify-center gap-10 mt-12">
          {[
            { val: 7,  label: "stations Abidjan"      },
            { val: 21, label: "stations intérieur CI" },
            { val: 2,  label: "bancs mobiles"         },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <span className="text-4xl font-bold" style={{ color: ORANGE }}>{val}</span>
              <p className="text-sm text-sicta-grey-light mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedMapCard;
