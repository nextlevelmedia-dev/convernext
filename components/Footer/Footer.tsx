export default function Footer() {
  return (
    <footer className="footer-sticky">
      <div
        className="footer-inner"
        style={{
          columnGap: "90px",
          rowGap: "0px",

          /* Riduciamo il padding verticale del footer
             per evitare che il logo venga tagliato sopra */
          paddingTop: "40px",
          paddingBottom: "50px",
        }}
      >
        {/* =========================
            LOGO FULL VIEWPORT
        ========================= */}

        <div
          style={{
            gridColumn: "1 / -1",

            /* a filo del contenuto (stessa larghezza delle colonne di link) */
            marginTop: 0,
            marginBottom: 0,
            padding: "min(5vw, 72px) 0",

            lineHeight: 0,
            overflow: "hidden",
          }}
        >
          {/* SVG vettoriale: nitido a tutta larghezza su ogni schermo */}
          <img
            src="/logo-convernext.svg"
            alt="Convernext"
            width={1010}
            height={106}
            loading="lazy"
            decoding="async"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              margin: 0,
              padding: 0,
            }}
          />
        </div>

        {/* =========================
            COLONNA 1
        ========================= */}

        <div>
          <h2
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontWeight: 600,
            }}
          >
            Contatti aziendali
          </h2>

          <p>
            Via Risorgimento, 61
            <br />
            Pescarolo ed Uniti, CR
          </p>

          <p>+39 3334187542</p>
        </div>

        {/* =========================
            COLONNA 2
        ========================= */}

        <div>
          <h2
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontWeight: 600,
            }}
          >
            Soluzioni e servizi
          </h2>

          <ul>
            <li>Siti web</li>
            <li>Ecommerce</li>
            <li>Temi Shopify</li>
            <li>Advertising</li>
          </ul>
        </div>

        {/* =========================
            COLONNA 3
        ========================= */}

        <div>
          <h2
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontWeight: 600,
            }}
          >
            About Next
          </h2>

          <ul>
            <li>Chi siamo</li>
            <li>Progetti</li>
            <li>Blog</li>
            <li>Contatti</li>
          </ul>
        </div>

        {/* =========================
            COLONNA 4
        ========================= */}

        <div>
          <h2
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontWeight: 600,
            }}
          >
            Seguici sui social
          </h2>

          <ul>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Linkedin</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}