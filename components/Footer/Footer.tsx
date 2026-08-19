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

            /* esce dal max-width di footer-inner */
            width: "100vw",
            marginLeft: "calc(50% - 50vw)",

            marginTop: 0,
            marginBottom: 0,
            padding: 0,

            lineHeight: 0,
            overflow: "hidden",
          }}
        >
          <img
            src="/logo-convernext-footer.webp"
            alt="Convernext"
            style={{
              display: "block",

              /* logo largo esattamente tutta la viewport */
              width: "100vw",

              /* usa il rapporto REALE del file */
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
          <h3
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontWeight: 600,
            }}
          >
            Contatti aziendali
          </h3>

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
          <h3
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontWeight: 600,
            }}
          >
            Soluzioni e servizi
          </h3>

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
          <h3
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontWeight: 600,
            }}
          >
            About Next
          </h3>

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
          <h3
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontWeight: 600,
            }}
          >
            Seguici sui social
          </h3>

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