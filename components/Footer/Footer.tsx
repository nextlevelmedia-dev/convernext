import Link from "next/link"
import { site } from "@/lib/seo"

export default function Footer() {
  return (
    <footer className="footer-sticky">
      <div className="footer-inner">
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

        <div className="footer-contacts">
          <h2
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontWeight: 600,
            }}
          >
            Contatti aziendali
          </h2>

          <address style={{ fontStyle: "normal" }}>
            <p>
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region}
            </p>

            <p>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </address>
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
            <li><Link href="/siti-web">Siti web</Link></li>
            <li><Link href="/ecommerce">Ecommerce Shopify</Link></li>
            <li><Link href="/temi-shopify">Temi Shopify</Link></li>
            <li><Link href="/ottimizzazione-conversioni">Ottimizzazione conversioni</Link></li>
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
            About Convernext
          </h2>

          <ul>
            <li><Link href="/chi-siamo">Chi siamo</Link></li>
            <li><Link href="/progetti">Progetti</Link></li>
            <li>Blog</li>
            <li><Link href="/contatti">Contatti</Link></li>
          </ul>
        </div>

        {/* =========================
            COLONNA 4
        ========================= */}

        <div className="footer-social">
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

        <div className="footer-bottom">
          © {new Date().getFullYear()} {site.name}. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  )
}