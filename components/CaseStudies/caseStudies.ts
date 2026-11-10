/*
 * Case study dei progetti. Ogni voce genera la pagina /progetti/[slug].
 * Un progetto con caseStudy: true in projects.ts manda la card qui
 * invece che al sito esterno.
 */

export type CaseStudy = {
  slug: string
  client: string
  sector: string
  services: string[]
  liveUrl: string
  seo: { title: string; description: string }
  hero: {
    eyebrow: string
    title: string
    // parte del titolo in gradient (deve comparire nel titolo)
    gradient?: string
    intro: string
    // screenshot del sito accanto al titolo
    image: string
  }
  challenge: {
    title: string
    paragraphs: string[]
    photo?: { src: string; alt: string; caption?: string }
    lines?: { name: string; text: string }[]
  }
  goals: string[]
  // striscia di lavori del cliente (foto verticali 4:5)
  artworks?: { title: string; intro: string; images: { src: string; alt: string }[] }
  // schermata della hero con i punti CRO numerati sopra (x, y in %)
  cro: {
    title: string
    intro: string
    image: string
    points: { x: number; y: number; title: string; text: string }[]
  }
  approach: { title: string; text: string }[]
  gallery: {
    desktop: { src: string; alt: string }[]
    mobile: { src: string; alt: string }[]
  }
  results: {
    title: string
    intro: string
    items: { title: string; text: string }[]
  }
  testimonial?: { quote: string; author: string; role: string }
}

const L = "/media/case-studies/lumache-di-campagna"
const N = "/media/case-studies/martinails-lab"
const R = "/media/case-studies/davide-rizzi"

export const caseStudies: CaseStudy[] = [
  {
    slug: "lumache-di-campagna",
    client: "Lumache di Campagna",
    sector: "Agroalimentare e cosmetica",
    services: ["Strategia", "Copywriting", "UX/UI design", "Sviluppo custom", "SEO locale"],
    liveUrl: "https://www.lumachedicampagna.it/",
    seo: {
      title: "Case study: Lumache di Campagna",
      description:
        "Come abbiamo progettato il sito di Lumache di Campagna: proposta di valore chiara, copy sui benefici, SEO locale e richieste dirette su WhatsApp.",
    },
    hero: {
      eyebrow: "Case study · Sito web e SEO locale",
      title: "Dall'allevamento alla tavola, con le richieste che arrivano su WhatsApp.",
      gradient: "richieste che arrivano",
      intro:
        "Lumache di Campagna alleva lumache e ne ricava tre linee di prodotti. Il titolare, Stefano, voleva un sito che le presentasse tutte in modo chiaro e che portasse richieste dirette, senza aprire un e-commerce.",
      image: `${L}/desktop-hero.webp`,
    },
    challenge: {
      title: "Tre linee di prodotto, un solo sito",
      paragraphs: [
        "Dall'allevamento di Stefano nascono prodotti molto diversi tra loro, pensati per persone diverse. Chi cerca una crema per il viso non ha le stesse domande di chi vuole cucinare le lumache a casa.",
        "Stefano non voleva un e-commerce vero e proprio. Voleva farsi trovare da chi cerca in zona e ricevere le richieste direttamente su WhatsApp, lasciando aperta la possibilità di vendere online più avanti.",
      ],
      photo: {
        src: `${L}/stefano.webp`,
        alt: "Stefano, titolare di Lumache di Campagna, nel suo allevamento",
        caption: "Stefano nel suo allevamento",
      },
      lines: [
        {
          name: "Cosmetici alla bava",
          text: "Creme e trattamenti per viso, mani e corpo, con percentuali di bava di lumaca fino al 70%.",
        },
        {
          name: "Prodotti gastronomici",
          text: "Vasetti e piatti già cotti, pronti da portare in tavola in pochi minuti.",
        },
        {
          name: "Lumache sfuse",
          text: "Selezionate e pesate al momento, per chi vuole prepararle secondo la propria ricetta.",
        },
      ],
    },
    goals: [
      "Una hero che fa capire la proposta di valore in pochi secondi",
      "Testi che parlano dei benefici, non delle caratteristiche",
      "Tre linee di prodotto chiare e separate",
      "SEO locale per farsi trovare da chi cerca in zona",
      "Richieste dirette su WhatsApp da ogni sezione",
      "Una struttura pronta a diventare e-commerce",
    ],
    cro: {
      title: "Le scelte CRO, punto per punto",
      intro:
        "Ogni elemento della prima schermata ha un compito: far capire cosa si ottiene, togliere i dubbi e portare al contatto. Ecco come abbiamo costruito la hero.",
      image: `${L}/desktop-hero.webp`,
      points: [
        {
          x: 4.6,
          y: 23,
          title: "Titolo sul beneficio e sull'emozione",
          text: "\"Vivi meglio ogni giorno, con una pelle più giovane e tutto il gusto e i benefici naturali della lumaca.\" Il titolo parla di come ti senti, non di cosa vendiamo. Le parole chiave in corsivo rosso guidano l'occhio.",
        },
        {
          x: 4.6,
          y: 56,
          title: "Tre benefici da leggere in tre secondi",
          text: "Benessere, gusto e cura della pelle: uno per ogni linea di prodotto. Chi scorre veloce capisce comunque cosa trova nel sito.",
        },
        {
          x: 4.6,
          y: 70.5,
          title: "Una CTA principale, una secondaria",
          text: "\"Richiedi informazioni\" è piena, scura e con l'icona della chat: si capisce che apre una conversazione. \"Scopri i prodotti\" è più leggera, per chi non è ancora pronto a scrivere.",
        },
        {
          x: 92,
          y: 19.5,
          title: "Il prodotto vero, subito",
          text: "La foto mostra i vasetti reali, con il badge \"Qualità artigianale\" e la frase \"Dalla terra alla tavola\". Prima ancora di leggere si vede cosa si compra e da dove arriva.",
        },
        {
          x: 25,
          y: 80,
          title: "Una banda che toglie i dubbi",
          text: "100% naturale, ricco di benefici, prodotto italiano a km 0, rispetto per gli animali, più il nome dell'azienda agricola. Le risposte alle obiezioni più comuni, appena sotto la piega.",
        },
        {
          x: 92.6,
          y: 3,
          title: "Il contatto sempre a portata",
          text: "\"Richiedi informazioni\" resta nell'header mentre si scorre. Chi si convince a metà pagina non deve tornare su per cercare il pulsante.",
        },
      ],
    },
    approach: [
      {
        title: "Proposta di valore chiara",
        text: "Siamo partiti da una domanda: perché qualcuno dovrebbe scegliere questi prodotti? La risposta è diventata il titolo della hero, scritta per essere capita in pochi secondi anche da mobile.",
      },
      {
        title: "Copy orientato al beneficio",
        text: "Ogni sezione racconta quello che il cliente ci guadagna: più benessere, più gusto, più cura per la pelle. Le caratteristiche (naturale, italiano, km 0) arrivano dopo, come prova.",
      },
      {
        title: "Tre linee, tre percorsi",
        text: "Lumache sfuse, prodotti gastronomici e cosmetici alla bava hanno ognuno una sezione con foto, testo e il proprio pulsante di contatto. Chi cerca una crema non si perde tra i ragù, e viceversa.",
      },
      {
        title: "SEO locale e WhatsApp",
        text: "Titoli, descrizioni e contenuti sono pensati per farsi trovare da chi cerca in zona. I pulsanti di contatto, 14 in tutto il sito, aprono WhatsApp con un messaggio già scritto: niente carrello, niente moduli, una conversazione diretta con Stefano.",
      },
      {
        title: "Pronto a crescere",
        text: "Oggi il sito porta richieste. La struttura delle linee di prodotto è pensata per poter aggiungere la vendita online quando servirà.",
      },
    ],
    gallery: {
      desktop: [{ src: `${L}/desktop-prodotti.webp`, alt: "Le sezioni lumache sfuse e prodotti gastronomici su desktop" }],
      mobile: [
        { src: `${L}/mobile-hero.webp`, alt: "La hero di Lumache di Campagna su smartphone" },
        { src: `${L}/mobile-cosmetici.webp`, alt: "La sezione dei cosmetici alla bava su smartphone" },
      ],
    },
    results: {
      title: "Cosa è cambiato",
      intro: "Dal racconto di Stefano, da quando il sito è online.",
      items: [
        { title: "Più richieste e contatti", text: "Le persone arrivano dal sito e scrivono direttamente su WhatsApp." },
        { title: "Vendite in aumento", text: "Le richieste si trasformano in ordini, senza bisogno di un carrello online." },
        { title: "Gestione in autonomia", text: "Testi e prodotti si aggiornano senza dover chiamare nessuno." },
      ],
    },
    testimonial: {
      quote:
        "Produciamo prodotti in vasetto e cosmetici a base di lumaca, e ci serviva un sito che li presentasse come meritano. Da quando è online riceviamo molte più richieste e contatti, e sono aumentate anche le vendite. Lo aggiorniamo da soli senza problemi e ci hanno seguito in ogni passaggio.",
      author: "Stefano Doninelli",
      role: "Titolare, Lumache di Campagna",
    },
  },
  {
    slug: "martinails-lab",
    client: "Martinails Lab",
    sector: "Nail art e beauty",
    services: ["Strategia", "Copywriting", "UX/UI design", "Sviluppo custom", "SEO locale"],
    liveUrl: "https://martinails-lab.com/",
    seo: {
      title: "Case study: Martinails Lab",
      description:
        "Come abbiamo progettato il sito di Martinails Lab: le nail art in vetrina come opere d'arte, SEO locale e prenotazioni con un messaggio su WhatsApp.",
    },
    hero: {
      eyebrow: "Case study · Sito web e SEO locale",
      title: "Unghie che sono piccole opere d'arte, in un sito all'altezza.",
      gradient: "piccole opere d'arte",
      intro:
        "Martina realizza nail art ricercate, dalle decorazioni più delicate alle creazioni più audaci. Voleva un sito che mostrasse i suoi lavori come meritano e che la facesse trovare da chi cerca una nail artist in città.",
      image: `${N}/desktop-hero.webp`,
    },
    challenge: {
      title: "Un lavoro che si sceglie guardandolo",
      paragraphs: [
        "Le creazioni di Martina non sono semplici manicure: french con orsetti gommosi in rilievo, soggetti horror dipinti a mano, effetti cromati, fiori e glitter. Lavori così si scelgono con gli occhi, quindi il sito doveva prima di tutto farli vedere bene.",
        "Allo stesso tempo doveva farsi trovare su Google da chi cerca nail art e ricostruzione unghie in città, e trasformare quella ricerca in un messaggio per prenotare.",
      ],
      lines: [
        {
          name: "Nail art personalizzata",
          text: "Decorazioni studiate sui gusti, sulla forma delle mani e sullo stile di ogni cliente.",
        },
        {
          name: "Ricostruzione e allungamento",
          text: "Forma e lunghezza pensate per valorizzare la mano, anche con la tecnica a muretto.",
        },
        {
          name: "Gel flessibile e rigido",
          text: "Dal risultato naturale e leggero a quello più definito e resistente.",
        },
      ],
    },
    goals: [
      "Mostrare le creazioni come in una galleria d'arte",
      "SEO locale per farsi trovare da chi cerca nail art in città",
      "Prenotare con un messaggio su WhatsApp, da ogni sezione",
      "Prezzi chiari prima ancora di scrivere",
      "Risposte ai dubbi più comuni prima dell'appuntamento",
      "Un sito curato ed elegante come i suoi lavori",
    ],
    artworks: {
      title: "Le opere di Martina",
      intro: "Alcune delle creazioni che il sito mette in vetrina. Sono queste foto, più di ogni testo, a convincere chi arriva.",
      images: [
        { src: `${N}/opera-horror.webp`, alt: "Nail art horror dipinta a mano con clown e serpente" },
        { src: `${N}/opera-orsetto.webp`, alt: "French bianca con orsetto gommoso in rilievo" },
        { src: `${N}/opera-fiocco-leopardato.webp`, alt: "Unghie a mandorla con fiocchi e motivo leopardato" },
        { src: `${N}/opera-cromato-blu.webp`, alt: "Nail art blu con effetto cromato" },
        { src: `${N}/opera-graffiti-rosa.webp`, alt: "Nail art rosa con decorazioni dipinte a mano" },
        { src: `${N}/opera-venature-rosse.webp`, alt: "Unghie bianche con venature rosse" },
      ],
    },
    cro: {
      title: "Le scelte CRO, punto per punto",
      intro:
        "La prima schermata deve fare due cose insieme: farsi trovare da Google e far venire voglia di prenotare a chi arriva. Ecco come l'abbiamo costruita.",
      image: `${N}/desktop-hero.webp`,
      points: [
        {
          x: 4.6,
          y: 18.8,
          title: "Un titolo per Google, uno per le persone",
          text: "La riga piccola in alto è il titolo principale della pagina per Google, con il servizio e la città. Il titolo grande sotto parla alle persone. Così la SEO locale non toglie niente all'emozione.",
        },
        {
          x: 4.6,
          y: 31,
          title: "Il beneficio è sentirsi sé stesse",
          text: "“Esprimi chi sei con unghie raffinate che valorizzano il tuo stile e la tua personalità.” Non si vende una manicure: si vende il modo in cui ti fa sentire.",
        },
        {
          x: 4.6,
          y: 77,
          title: "Scrivere o guardare: due strade chiare",
          text: "“Scrivimi su WhatsApp” è il pulsante pieno, per chi ha già deciso. “Vedi la gallery” è per chi vuole prima ispirarsi. Nessuno resta senza un passo successivo.",
        },
        {
          x: 49.6,
          y: 27,
          title: "Le opere al posto delle parole",
          text: "Metà della hero è fatta di colonne di foto che scorrono da sole. Prima ancora di leggere si capisce il livello dei lavori.",
        },
        {
          x: 4.6,
          y: 91,
          title: "Tre rassicurazioni, subito",
          text: "Prodotti scelti con cura, precisione in ogni dettaglio, passione in ogni creazione. Le prime risposte a chi si chiede se può fidarsi.",
        },
        {
          x: 92.6,
          y: 3,
          title: "Telefono e “Scrivimi” sempre in vista",
          text: "Il numero e il pulsante restano nell'header mentre si scorre: chi si innamora di una foto a metà pagina può scrivere subito.",
        },
      ],
    },
    approach: [
      {
        title: "Le opere al centro",
        text: "Le foto dei lavori sono protagoniste fin dalla hero. La gallery è una spirale 3D che si forma mentre scorri, con decine di creazioni da sfogliare e un link per vederle tutte.",
      },
      {
        title: "Testi che parlano di chi le indossa",
        text: "Ogni servizio parte da quello che la cliente desidera: “Se desideri unghie più resistenti”, “se desideri un risultato naturale”. Chi legge si riconosce e capisce subito quale trattamento fa per lei.",
      },
      {
        title: "SEO locale fatta bene",
        text: "Servizio e città nel titolo della pagina, nella descrizione e nei contenuti. I dati strutturati descrivono il salone con indirizzo, posizione sulla mappa e servizi con i prezzi, così Google sa cosa offre e dove.",
      },
      {
        title: "Prezzi e risposte prima di scrivere",
        text: "Il listino è chiaro, dalla manicure all'allungamento con muretto. Le FAQ rispondono ai dubbi più frequenti, dal refill al calore del gel. Chi scrive arriva già informata.",
      },
      {
        title: "Prenotare con un messaggio",
        text: "13 pulsanti WhatsApp in tutta la pagina, il numero sempre in vista, l'indirizzo dello studio con la mappa. Nessun modulo da compilare.",
      },
    ],
    gallery: {
      desktop: [{ src: `${N}/desktop-gallery.webp`, alt: "La gallery a spirale 3D con le nail art di Martina" }],
      mobile: [
        { src: `${N}/mobile-hero.webp`, alt: "La hero di Martinails Lab su smartphone" },
        { src: `${N}/mobile-prezzi.webp`, alt: "Il listino prezzi su smartphone" },
      ],
    },
    results: {
      title: "Cosa è cambiato",
      intro: "Dal racconto di Martina, da quando il sito è online.",
      items: [
        { title: "Molte più richieste", text: "Le richieste di appuntamento sono aumentate da quando il sito è online." },
        { title: "Clienti nuove", text: "Scrivono anche persone che prima non la conoscevano." },
        { title: "Prenotare è semplice", text: "Un messaggio su WhatsApp e l'appuntamento è fissato." },
      ],
    },
    testimonial: {
      quote:
        "Volevo un sito che mostrasse bene i miei lavori e rendesse semplice prenotare. Da quando è online ricevo molte più richieste di appuntamento, anche da persone che prima non mi conoscevano. È curato in ogni dettaglio, proprio come cerco di fare io con le mie clienti.",
      author: "Martina Iezzi",
      role: "Nail artist, Martinails Lab",
    },
  },
  {
    slug: "davide-rizzi",
    client: "Davide Rizzi",
    sector: "Soluzioni caffè e acqua",
    services: ["Strategia", "Copywriting", "UX/UI design", "Sviluppo custom", "Lead generation"],
    liveUrl: "https://davide-rizzi.vercel.app/",
    seo: {
      title: "Case study: Davide Rizzi",
      description:
        "Come abbiamo progettato il sito di Davide Rizzi: un questionario che prepara il messaggio WhatsApp, così arrivano solo contatti davvero interessati.",
    },
    hero: {
      eyebrow: "Case study · Sito web e lead generation",
      title: "Meno chiamate a vuoto, più contatti davvero interessati.",
      gradient: "contatti davvero interessati",
      intro:
        "Davide propone a famiglie e aziende soluzioni caffè Lavazza e sistemi per l'acqua Star Tap. Voleva un sito che gli portasse più richieste, ma soprattutto da persone già interessate a quello che offre.",
      image: `${R}/desktop-hero.webp`,
    },
    challenge: {
      title: "Spiegare cosa fa, a chi si rivolge, e filtrare chi scrive",
      paragraphs: [
        "Davide lavora con due mondi diversi, caffè e acqua, e con due tipi di clienti, privati e aziende. Senza un sito chiaro rischiava di passare per l'ennesimo venditore di capsule, e di perdere tempo in telefonate con chi non era davvero interessato.",
        "Il sito doveva spiegare in pochi secondi cosa propone e perché conviene, e far arrivare richieste già qualificate: chi è, cosa gli serve, quanto consuma.",
      ],
      lines: [
        {
          name: "Caffè",
          text: "Macchine Lavazza Tablì ed Elogy da provare a casa, con forniture calibrate sui consumi.",
        },
        {
          name: "Acqua",
          text: "Sistemi Star Tap per avere acqua microfiltrata, fredda e frizzante direttamente dal rubinetto.",
        },
        {
          name: "Casa e azienda",
          text: "Due pubblici con problemi diversi: le casse d'acqua da portare su per le scale, o le scorte da gestire per tutto il team.",
        },
      ],
    },
    goals: [
      "Far capire l'offerta in pochi secondi",
      "Togliere il rischio di scegliere: prima provi, poi decidi",
      "Parlare a privati e aziende con i loro problemi",
      "Ricevere richieste già qualificate su WhatsApp",
      "Meno chiamate inutili, più appuntamenti utili",
      "Mettere Davide in primo piano, non un call center",
    ],
    cro: {
      title: "Le scelte CRO, punto per punto",
      intro:
        "Chi arriva deve capire cosa ottiene, sentire che non rischia niente e avere un modo semplice per farsi avanti. Ecco come abbiamo costruito la prima schermata.",
      image: `${R}/desktop-hero.webp`,
      points: [
        {
          x: 2.4,
          y: 19.6,
          title: "La prova sociale prima del titolo",
          text: "Le cinque stelle con “Cosa dice chi l'ha già provato” stanno sopra a tutto. La fiducia arriva prima ancora di leggere l'offerta.",
        },
        {
          x: 2.4,
          y: 37,
          title: "Il beneficio, poi il problema",
          text: "“Il tuo caffè perfetto. Senza più pensieri.” Sotto, il dolore che tutti conoscono: capsule finite sul più bello e corse al supermercato. La soluzione arriva subito dopo.",
        },
        {
          x: 2.4,
          y: 80,
          title: "Una CTA che toglie il rischio",
          text: "“Richiedi una prova a casa”, verde come WhatsApp. Non chiede di comprare, chiede di provare. La seconda CTA, “Trova la tua soluzione in 1 minuto”, porta al questionario.",
        },
        {
          x: 2.4,
          y: 86.6,
          title: "Tre obiezioni, tre risposte",
          text: "Prova senza impegno, decidi dopo aver assaggiato, un referente diretto e non un call center. Le paure tipiche di chi compra un servizio, sciolte in una riga.",
        },
        {
          x: 92,
          y: 50,
          title: "Il prodotto in azione",
          text: "Sullo sfondo, il video del caffè che scende nelle tazzine. Si sente il gusto prima ancora di leggere il nome della macchina.",
        },
        {
          x: 96.2,
          y: 4.9,
          title: "La richiesta sempre a portata",
          text: "“Richiedi una prova” resta nell'header, e un pulsante WhatsApp segue lo scroll. Da qualunque punto della pagina, il contatto è a un tocco.",
        },
      ],
    },
    approach: [
      {
        title: "Un questionario che qualifica",
        text: "Il cuore del sito: 12 domande veloci, un tocco per risposta. Caffè, acqua o entrambi, quante persone, quanti caffè al giorno, come ci si rifornisce oggi. Le risposte compilano in diretta il messaggio, e Davide lo riceve su WhatsApp già preparato.",
      },
      {
        title: "Prima provi, poi decidi",
        text: "Tutta la comunicazione ruota attorno alla prova: “Prima assaggi, poi scegli. Nessuna decisione al buio.” È il modo più semplice per abbassare la barriera di chi non ha mai cambiato fornitore.",
      },
      {
        title: "Casa e azienda, ognuna con i suoi problemi",
        text: "Due colonne affiancate: per la casa le casse d'acqua e il caffè che finisce, per l'azienda le scorte da gestire e la macchina ferma. Ognuno si riconosce, ognuno ha il suo pulsante.",
      },
      {
        title: "Davide in primo piano",
        text: "Il sito parla in prima persona: “Ciao, sono Davide”. Nelle FAQ risponde lui, non un modulo. Le persone sanno con chi parleranno ancora prima di scrivere.",
      },
      {
        title: "Recensioni che crescono da sole",
        text: "Una sezione permette ai clienti di lasciare la loro recensione direttamente sul sito, dopo una verifica. La prova sociale si alimenta nel tempo.",
      },
    ],
    gallery: {
      desktop: [{ src: `${R}/desktop-questionario.webp`, alt: "Il questionario che compila il messaggio WhatsApp in diretta" }],
      mobile: [
        { src: `${R}/mobile-hero.webp`, alt: "La hero di Davide Rizzi su smartphone" },
        { src: `${R}/mobile-questionario.webp`, alt: "Il questionario su smartphone" },
      ],
    },
    results: {
      title: "Cosa è cambiato",
      intro: "Dal racconto di Davide, da quando il sito è online.",
      items: [
        { title: "Più richieste di appuntamento", text: "Le persone arrivano dal sito e chiedono di vedersi." },
        { title: "Contatti davvero interessati", text: "Chi scrive ha già risposto alle domande giuste e sa cosa vuole." },
        { title: "Meno tempo perso", text: "Meno chiamate inutili, più incontri che portano a qualcosa." },
      ],
    },
    testimonial: {
      quote:
        "Come consulente vendite mi serviva un sito che spiegasse in modo chiaro cosa faccio e a chi mi rivolgo. Siamo partiti da zero e, da quando è online, ricevo più richieste di appuntamento, soprattutto da persone davvero interessate. Meno tempo perso in chiamate inutili, più incontri che portano a qualcosa.",
      author: "Davide Rizzi",
      role: "Consulente vendite caffè e acqua",
    },
  },
]

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug)
