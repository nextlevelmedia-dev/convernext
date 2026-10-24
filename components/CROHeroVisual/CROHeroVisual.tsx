// components/CROHeroVisual/CROHeroVisual.tsx
import "./CROHeroVisual.css"

/*
 * Test A/B su una pagina prodotto: originale vs variante ottimizzata.
 * Solo HTML/CSS (nessuna immagine, nessun JS): le animazioni d'ingresso
 * partono al primo paint e non toccano l'LCP, che resta il titolo della hero.
 */

function Bottle() {
  return (
    <div className="cro-bottle" aria-hidden>
      <div className="cro-bottle-cap" />
      <div className="cro-bottle-body">
        <div>VIT C</div>
      </div>
    </div>
  )
}

function Stars() {
  return <div className="cro-stars">★★★★★</div>
}

export default function CROHeroVisual() {
  return (
    <div
      className="cro-visual max-md:mt-4"
      role="img"
      aria-label="Test A/B su una pagina prodotto: la variante ottimizzata, con recensioni, spedizione chiara e pulsante in evidenza, converte il 61% in più dell'originale."
    >
      <div className="cro-stage" aria-hidden>
        {/* intestazione del test */}
        <div className="cro-head cro-in" style={{ animationDelay: "0s" }}>
          <div className="cro-head-title">
            <div className="cro-live" />
            Test A/B · Pagina prodotto
          </div>
          <div className="cro-head-split">Traffico 50 / 50</div>
        </div>

        <div className="cro-variants">
          {/* A: originale */}
          <div className="cro-var cro-in-left" style={{ animationDelay: "0.1s" }}>
            <div className="cro-var-label">
              <div className="cro-tag">A</div> Originale
            </div>

            <div className="cro-pdp">
              <div className="cro-pdp-nav">
                <i />
                <i />
              </div>
              <div className="cro-pdp-img cro-pdp-img--plain">
                <Bottle />
              </div>
              <div className="cro-pdp-title">Siero Vitamina C</div>
              <div className="cro-pdp-price">€ 29,00</div>
              <div className="cro-lines">
                <i style={{ width: "100%" }} />
                <i style={{ width: "92%" }} />
                <i style={{ width: "97%" }} />
                <i style={{ width: "64%" }} />
              </div>
              <div className="cro-pdp-qty">
                <i>−</i> 1 <i>+</i>
              </div>
              <div className="cro-btn cro-btn--plain">Aggiungi al carrello</div>
            </div>

            <div className="cro-result">
              <div className="cro-result-row">
                <div>Conversione</div>
                <b>1,8%</b>
              </div>
              <div className="cro-bar">
                <i className="cro-bar-a" />
              </div>
            </div>
          </div>

          {/* B: variante */}
          <div className="cro-var cro-var--b cro-in-right" style={{ animationDelay: "0.3s" }}>
            <div className="cro-var-label">
              <div className="cro-tag cro-tag--b">B</div> Variante
              <div className="cro-win cro-pop" style={{ animationDelay: "1.9s" }}>
                ★ Vincente
              </div>
            </div>

            <div className="cro-pdp">
              <div className="cro-pdp-nav">
                <i />
                <i />
              </div>
              <div className="cro-pdp-img cro-pdp-img--rich">
                <div className="cro-badge">Bestseller</div>
                <Bottle />
              </div>
              <div className="cro-thumbs">
                <i className="on" />
                <i className="cro-thumb--dark" />
                <i className="cro-thumb--scene" />
                <i className="cro-thumb--more">+3</i>
              </div>
              <div className="cro-pdp-title">Siero Vitamina C</div>
              <div className="cro-hl cro-pop" style={{ animationDelay: "1.15s" }}>
                <Stars /> 4,8 <em>(312 recensioni)</em>
              </div>
              <div className="cro-pdp-price">€ 29,00</div>
              <div className="cro-hl cro-pop" style={{ animationDelay: "1.3s" }}>
                <div className="cro-chip">🚚 Spedizione gratuita</div>
                <div className="cro-chip">↩ Reso 30 gg</div>
              </div>
              <div className="cro-btn cro-btn--grad cro-pop" style={{ animationDelay: "1.45s" }}>
                Aggiungi al carrello
              </div>
              <div className="cro-pay">
                <div>Apple Pay</div>
                <div>PayPal</div>
                <div>Klarna</div>
              </div>
            </div>

            <div className="cro-result">
              <div className="cro-result-row">
                <div>Conversione</div>
                <b className="cro-grad-text">2,9%</b>
              </div>
              <div className="cro-bar">
                <i className="cro-bar-b" />
              </div>
            </div>
          </div>
        </div>

        {/* risultato del test */}
        <div className="cro-float cro-float--top cro-in" style={{ animationDelay: "2.05s" }}>
          <div className="cro-float-icon cro-float-icon--ok">✓</div>
          <div>
            <b>Test completato</b>
            <small>B vince con il 97% di confidenza</small>
          </div>
        </div>

        <div className="cro-float cro-float--bottom cro-in" style={{ animationDelay: "2.2s" }}>
          <div className="cro-float-icon cro-float-icon--grad">↗</div>
          <div>
            <b>+61% ordini</b>
            <small>Stesso traffico, nessun costo ads in più</small>
          </div>
        </div>
      </div>
    </div>
  )
}
