import { CATEGORIE_GUIDE, etichetta } from "@/lib/taxonomy";

export type Difficolta = "base" | "intermedio" | "avanzato";
export type Passo = { titolo: string; testo: string };

export type Guida = {
  slug: string;
  title: string;
  description: string;
  /** Paragrafo di apertura della pagina di dettaglio. */
  intro: string;
  category: string;
  categories: string[];
  /** Slug dei tool usati: alimenta il collegamento incrociato con la directory. */
  tools: string[];
  difficulty: Difficolta;
  minutes: number;
  /** Cosa si ottiene alla fine. Compare in evidenza sopra i passi. */
  outcome: string;
  requirements: string[];
  steps: Passo[];
  faq: { question: string; answer: string }[];
  publishedAt: string;
};

export const GUIDE: Guida[] = [
  {
    slug: "rispondere-ai-preventivi-in-automatico",
    title: "Rispondere alle richieste di preventivo in automatico senza sembrare un robot",
    description:
      "Un flusso che legge la richiesta arrivata via email o modulo, la classifica, prepara la bozza di preventivo e la mette in attesa della tua firma.",
    intro:
      "Nella maggior parte delle piccole imprese la richiesta di preventivo arriva in una casella condivisa, resta lì due giorni e viene lavorata da chi ha tempo. Il problema non è la stesura del preventivo: è il tempo morto tra l'arrivo e la prima risposta. Questo flusso lo azzera mantenendo l'ultima parola a una persona.",
    category: "vendite",
    categories: ["vendite", "operations"],
    tools: ["n8n", "claude", "hubspot-breeze"],
    difficulty: "intermedio",
    minutes: 45,
    outcome:
      "Ogni richiesta riceve una risposta interlocutoria entro cinque minuti e una bozza di preventivo pronta da rivedere entro un'ora.",
    requirements: [
      "Una casella email dedicata alle richieste, anche un alias",
      "Un listino, anche in foglio di calcolo",
      "Un'istanza n8n, in cloud o installata sul proprio server",
    ],
    steps: [
      {
        titolo: "Isola il canale delle richieste",
        testo:
          "Crea un indirizzo dedicato, per esempio preventivi@, e fai in modo che il modulo del sito scriva lì. Serve a dare al flusso un punto di ingresso unico invece di farlo pescare nella posta di tutti. Se le richieste arrivano già su una casella condivisa, applica un'etichetta e fai partire il flusso da quella.",
      },
      {
        titolo: "Estrai i dati che servono davvero",
        testo:
          "Nel nodo AI di n8n chiedi al modello di restituire un oggetto strutturato: settore, quantità, tempistica dichiarata, budget se citato, e un livello di completezza da 1 a 3. Il livello di completezza è il campo che conta: separa le richieste lavorabili da quelle che hanno bisogno di una domanda prima.",
      },
      {
        titolo: "Manda la risposta interlocutoria",
        testo:
          "Se la completezza è 3, rispondi che il preventivo arriva entro la giornata. Se è 1 o 2, il modello genera due domande specifiche, non generiche: mai chiedere «può darci maggiori dettagli». La differenza tra le due risposte è quello che il cliente percepisce come competenza.",
      },
      {
        titolo: "Genera la bozza sul tuo listino",
        testo:
          "Passa al modello il listino e tre preventivi già emessi come riferimento di tono e struttura. Il risultato va in una bozza, non in un invio. Metti la bozza dove la guardi già: una scheda nel CRM o una bozza in Gmail, non un file in una cartella nuova.",
      },
      {
        titolo: "Chiudi il cerchio con il promemoria",
        testo:
          "Se dopo quattro giorni il preventivo non ha risposta, il flusso crea un'attività per il commerciale con un riassunto della richiesta iniziale. È il passaggio che recupera più fatturato di tutti gli altri messi insieme.",
      },
    ],
    faq: [
      {
        question: "Devo dichiarare al cliente che la risposta è generata da un sistema automatico?",
        answer:
          "La risposta interlocutoria automatica va dichiarata se il destinatario può credere di parlare con una persona. Il preventivo firmato da te dopo revisione umana non è un contenuto generato in autonomia: è un tuo documento. Nel dubbio, una riga in calce alla prima risposta risolve la questione.",
      },
      {
        question: "Serve un CRM per far funzionare il flusso?",
        answer:
          "No. Il flusso funziona anche con un foglio di calcolo come registro. Il CRM serve quando le richieste superano la quarantina al mese e vuoi misurare il tasso di conversione per settore.",
      },
    ],
    publishedAt: "2026-07-28",
  },
  {
    slug: "centralino-ai-officina-prenotazioni",
    title: "Far rispondere il telefono dell'officina anche quando sei sotto una macchina",
    description:
      "Un agente vocale che prende le chiamate perse, capisce se è un'urgenza, controlla l'agenda e fissa l'appuntamento. Attivo in una giornata.",
    intro:
      "In un'officina il telefono suona mentre hai le mani sporche. Le chiamate perse sono lavoro perso, e la segreteria telefonica non recupera quasi nulla. Un agente vocale non sostituisce la persona al banco: prende quello che oggi cade nel vuoto.",
    category: "officine",
    categories: ["officine", "customer-service", "artigianato"],
    tools: ["vapi", "elevenlabs", "n8n"],
    difficulty: "intermedio",
    minutes: 60,
    outcome:
      "Le chiamate non risposte diventano appuntamenti in agenda o richiami tracciati, con un riepilogo scritto di ogni conversazione.",
    requirements: [
      "Un numero di telefono su cui deviare le chiamate senza risposta",
      "Un'agenda digitale, anche Google Calendar",
      "Un account Vapi o Retell con credito di prova",
    ],
    steps: [
      {
        titolo: "Scrivi il copione prima di toccare lo strumento",
        testo:
          "Tre casi coprono il novanta per cento delle chiamate: prenotazione tagliando, guasto con auto ferma, richiesta di preventivo. Per ognuno scrivi le domande che faresti tu, nell'ordine in cui le faresti. Un agente vocale è buono quanto il copione, non quanto il modello.",
      },
      {
        titolo: "Dichiara subito cosa è",
        testo:
          "La prima frase deve dire che si tratta di un assistente automatico dell'officina e che la conversazione viene registrata. Non è solo un obbligo: dichiararlo alza la soddisfazione, perché la persona calibra le aspettative e parla in modo più chiaro.",
      },
      {
        titolo: "Collega l'agenda in lettura e scrittura",
        testo:
          "L'agente deve poter leggere gli slot liberi e scriverci dentro. Blocca sempre uno slot in più rispetto alla durata dichiarata: le stime al telefono sono ottimistiche e un'agenda troppo fitta si sfalda al secondo imprevisto.",
      },
      {
        titolo: "Definisci l'uscita verso la persona",
        testo:
          "Un'urgenza dichiarata, un cliente arrabbiato o tre incomprensioni di fila devono far scattare il trasferimento o un SMS immediato al titolare. L'errore più costoso non è che l'agente non capisca: è che insista.",
      },
      {
        titolo: "Fai arrivare il riepilogo dove lo leggi",
        testo:
          "Ogni chiamata produce quattro righe: chi, cosa, quando, cosa è stato promesso. Mandale su WhatsApp o via email, non dentro una dashboard che nessuno aprirà. Rivedi i riepiloghi ogni sera per la prima settimana e correggi il copione.",
      },
    ],
    faq: [
      {
        question: "Quanto costa al minuto?",
        answer:
          "Fra i cinque e i dieci centesimi al minuto tutto compreso, numero telefonico incluso. Una chiamata media di due minuti costa meno di venti centesimi: il confronto non è con il costo del software ma con il valore di un tagliando perso.",
      },
      {
        question: "L'agente capisce i dialetti e le chiamate rumorose?",
        answer:
          "L'italiano standard è gestito bene, il rumore di fondo dell'officina meno. Per questo il copione deve prevedere la riformulazione: far ripetere una volta è accettabile, due volte è il segnale per passare a una persona.",
      },
    ],
    publishedAt: "2026-07-25",
  },
  {
    slug: "chatbot-whatsapp-ristorante-prenotazioni",
    title: "Gestire prenotazioni e domande del ristorante su WhatsApp senza un addetto",
    description:
      "Menù, allergeni, orari e prenotazioni gestiti dal canale che i clienti usano già, con passaggio in sala quando serve una persona.",
    intro:
      "Il ristorante riceve i messaggi WhatsApp durante il servizio, cioè nel momento in cui nessuno può rispondere. Il risultato è che si risponde a mezzanotte o non si risponde. Un assistente collegato al numero aziendale copre le domande ripetitive e passa in sala solo quello che serve davvero.",
    category: "ristorazione",
    categories: ["ristorazione", "customer-service"],
    tools: ["n8n", "claude", "tidio-lyro"],
    difficulty: "base",
    minutes: 40,
    outcome:
      "Le domande su orari, menù, allergeni e parcheggio ricevono risposta immediata; le prenotazioni arrivano in un unico elenco ordinato.",
    requirements: [
      "Un numero WhatsApp Business",
      "Menù aggiornato in un documento di testo",
      "Un foglio o un'agenda dove finiscono le prenotazioni",
    ],
    steps: [
      {
        titolo: "Metti per iscritto quello che già ripeti",
        testo:
          "Orari, giorni di chiusura, coperti massimi, politica sui bambini, parcheggio, allergeni principali, se accettate cani. Sono le stesse otto domande ogni settimana. Questo documento è il novanta per cento del lavoro.",
      },
      {
        titolo: "Vincola l'assistente al documento",
        testo:
          "Istruzione esplicita: rispondi solo con quanto contenuto nel documento; se l'informazione non c'è, dillo e proponi di far richiamare. Un assistente che inventa la disponibilità di un tavolo crea un problema in sala, non lo risolve.",
      },
      {
        titolo: "Struttura la prenotazione in quattro campi",
        testo:
          "Nome, numero di persone, data e ora, telefono. Niente di più. Ogni campo aggiuntivo fa abbandonare la conversazione. La conferma finale ripete i quattro dati e chiede un sì.",
      },
      {
        titolo: "Metti un tetto e una soglia oraria",
        testo:
          "Sopra un certo numero di coperti, o per le date con evento, l'assistente non conferma: raccoglie e passa in sala. Stessa cosa per le richieste a meno di due ore dal servizio.",
      },
      {
        titolo: "Chiudi con il promemoria del giorno prima",
        testo:
          "Un messaggio automatico il giorno prima con possibilità di disdire in un tocco. È la singola modifica che riduce di più i tavoli vuoti a fronte di prenotazioni confermate.",
      },
    ],
    faq: [
      {
        question: "Serve la WhatsApp Business API a pagamento?",
        answer:
          "Per l'automazione sì, l'app gratuita non permette il collegamento. Il costo per una piccola attività resta sotto i venti euro al mese di conversazioni, con i primi mille contatti in entrata gratuiti.",
      },
      {
        question: "Come si gestisce il consenso al trattamento del numero?",
        answer:
          "Il cliente che scrive per prenotare fornisce il numero per una finalità precontrattuale: puoi usarlo per la prenotazione. Per mandargli promozioni serve un consenso separato e distinto, raccolto in modo esplicito.",
      },
    ],
    publishedAt: "2026-07-22",
  },
  {
    slug: "estrarre-dati-fatture-fornitori",
    title: "Estrarre i dati dalle fatture fornitore senza riscriverli a mano",
    description:
      "Un flusso che legge i PDF che arrivano via email, tira fuori i campi che ti servono e li scrive in un foglio o nel gestionale.",
    intro:
      "La registrazione manuale delle fatture passive è il lavoro più ripetitivo e meno gratificante dell'amministrazione, e anche quello con il tasso di errore più alto verso fine mese. I modelli attuali leggono un PDF meglio di qualunque OCR tradizionale, anche quando il layout cambia da fornitore a fornitore.",
    category: "amministrazione",
    categories: ["amministrazione", "operations", "dati"],
    tools: ["n8n", "claude", "airtable"],
    difficulty: "intermedio",
    minutes: 50,
    outcome:
      "Ogni fattura ricevuta finisce in una riga strutturata, con i casi dubbi marcati per il controllo umano.",
    requirements: [
      "Una casella dove arrivano le fatture passive",
      "Un foglio di calcolo o una base dati di destinazione",
      "Uno storico di venti fatture per la prova",
    ],
    steps: [
      {
        titolo: "Definisci lo schema prima di tutto",
        testo:
          "Fornitore, partita IVA, numero documento, data, imponibile, IVA, totale, scadenza, e un campo confidenza da 0 a 1. Se non definisci lo schema in anticipo, ogni fattura produce campi diversi e il foglio diventa inutilizzabile.",
      },
      {
        titolo: "Passa il PDF come immagine, non come testo",
        testo:
          "L'estrazione del testo da un PDF perde la struttura della tabella. I modelli con visione leggono il documento come lo leggi tu, quindi capiscono che quel numero in basso a destra è il totale.",
      },
      {
        titolo: "Chiedi la confidenza campo per campo",
        testo:
          "Il modello deve dichiarare quanto è sicuro di ogni valore. Sotto una certa soglia, la riga va in una vista separata per il controllo. È questo che rende il sistema utilizzabile in contabilità invece che pericoloso.",
      },
      {
        titolo: "Metti un controllo aritmetico",
        testo:
          "Imponibile più IVA deve dare il totale. È un controllo banale che intercetta la quasi totalità degli errori di lettura, e non costa nulla perché lo fa il flusso, non il modello.",
      },
      {
        titolo: "Verifica su venti fatture reali prima di fidarti",
        testo:
          "Fai girare il flusso su venti fatture già registrate e confronta. Se l'accuratezza sui campi numerici non arriva al novantotto per cento, aggiusta le istruzioni prima di metterlo in produzione.",
      },
    ],
    faq: [
      {
        question: "Sostituisce la fatturazione elettronica?",
        answer:
          "No, e non serve dove il ciclo passivo passa già interamente dallo SDI. Serve per tutto quello che arriva fuori da quel canale: fornitori esteri, note spese, ricevute e allegati che oggi qualcuno riscrive.",
      },
      {
        question: "I dati delle fatture escono dall'azienda?",
        answer:
          "Dipende dal modello scelto. Con un modello ospitato in Europa o installato in locale non escono. Se usi un servizio americano, va inserito nel registro dei trattamenti e coperto contrattualmente.",
      },
    ],
    publishedAt: "2026-07-19",
  },
  {
    slug: "trasformare-webinar-in-clip-social",
    title: "Trasformare un webinar di un'ora in dieci contenuti per i social",
    description:
      "Dal file registrato alle clip verticali sottotitolate, con i testi di accompagnamento già scritti nel tono giusto.",
    intro:
      "Ogni azienda che fa formazione o webinar ha un archivio di ore registrate che non guarda nessuno. È materiale già prodotto e già pagato: il costo di riutilizzarlo è vicino a zero, e la resa è più alta di quella di un contenuto girato apposta perché il contenuto è vero.",
    category: "contenuti",
    categories: ["contenuti", "marketing"],
    tools: ["opus-clip", "descript", "claude"],
    difficulty: "base",
    minutes: 35,
    outcome:
      "Dieci clip verticali sottotitolate in italiano e dieci testi di accompagnamento, da un solo file di partenza.",
    requirements: [
      "Una registrazione con audio decente",
      "Un account OpusClip o Descript",
      "Le linee guida di tono del marchio, anche in mezza pagina",
    ],
    steps: [
      {
        titolo: "Parti dalla trascrizione, non dal video",
        testo:
          "Estrai la trascrizione con i minutaggi. Serve a due cose: scegliere i passaggi ragionando sul contenuto invece che riguardando un'ora di video, e riusare lo stesso testo per i post scritti.",
      },
      {
        titolo: "Cerca le affermazioni, non gli argomenti",
        testo:
          "Chiedi al modello i dieci passaggi che si reggono da soli fuori contesto: una tesi, un dato, un aneddoto con un finale. Un passaggio che comincia con «come dicevamo prima» non funziona, per quanto sia interessante.",
      },
      {
        titolo: "Taglia, poi correggi i sottotitoli",
        testo:
          "OpusClip riquadra e sottotitola in automatico. I sottotitoli italiani sbagliano sistematicamente i nomi propri e i termini di settore: dieci minuti di correzione fanno la differenza tra professionale e trascurato.",
      },
      {
        titolo: "Scrivi i testi dalla trascrizione, non dalla clip",
        testo:
          "Il testo di accompagnamento deve dire una cosa in più rispetto al video, non riassumerlo. Passa al modello il passaggio trascritto e le tue linee guida di tono, e chiedi tre varianti per ogni clip.",
      },
      {
        titolo: "Pubblica distanziato e misura la ritenzione",
        testo:
          "Dieci clip in dieci giorni, non tutte insieme. Guarda solo la ritenzione ai tre secondi: è l'unico numero che ti dice se l'apertura funziona, ed è l'unica cosa che puoi correggere sul prossimo lotto.",
      },
    ],
    faq: [
      {
        question: "Conviene rigirare i contenuti invece di riusarli?",
        answer:
          "Rigirare costa un ordine di grandezza in più e non rende di più. Il riuso conviene finché hai archivio; quando finisce, il flusso migliore è girare pensando fin da subito ai due formati.",
      },
      {
        question: "Serve chiedere il consenso ai partecipanti del webinar?",
        answer:
          "Se nelle clip compaiono partecipanti diversi dai relatori, sì. La soluzione più semplice è tagliare solo sui relatori, che hanno già acconsentito alla diffusione.",
      },
    ],
    publishedAt: "2026-07-16",
  },
  {
    slug: "assistente-interno-procedure-aziendali",
    title: "Costruire un assistente interno che risponde sulle procedure aziendali",
    description:
      "Una base di conoscenza interrogabile che risponde ai colleghi citando il documento esatto, senza inventare nulla.",
    intro:
      "La domanda «come si fa questa cosa» arriva sempre alla stessa persona, che è sempre la più occupata. Un assistente ancorato ai documenti aziendali non risolve il problema culturale, ma toglie dal tavolo le domande la cui risposta è già scritta da qualche parte.",
    category: "operations",
    categories: ["operations", "hr", "formazione"],
    tools: ["notebooklm", "notion-ai", "claude"],
    difficulty: "base",
    minutes: 30,
    outcome:
      "Chiunque in azienda ottiene la risposta corretta con il riferimento al documento, invece di chiedere a un collega.",
    requirements: [
      "Le procedure in formato digitale, anche disordinate",
      "Un account Google o Notion aziendale",
    ],
    steps: [
      {
        titolo: "Raccogli prima di riordinare",
        testo:
          "Metti tutto in una cartella: manuali, circolari, istruzioni scritte via email, il file che qualcuno chiama «istruzioni definitive v3». Riordinare prima di iniziare è il modo più comune per non iniziare mai.",
      },
      {
        titolo: "Elimina solo le versioni superate",
        testo:
          "L'unica pulizia che serve davvero è togliere i documenti obsoleti. Un assistente che cita una procedura abrogata è peggio di nessun assistente, perché è credibile.",
      },
      {
        titolo: "Carica e vincola alle fonti",
        testo:
          "In NotebookLM le fonti caricate sono l'unico universo di risposta e ogni frase riporta il passaggio da cui viene. È la caratteristica che rende accettabile l'uso interno: la risposta è verificabile in un clic.",
      },
      {
        titolo: "Collauda con le domande vere",
        testo:
          "Chiedi ai colleghi le dieci domande che fanno più spesso e provale tutte. Dove l'assistente non risponde, il problema non è lo strumento: manca il documento. Scrivilo, sono venti righe.",
      },
      {
        titolo: "Assegna un responsabile dell'aggiornamento",
        testo:
          "Una persona, una revisione al mese. Senza questo passaggio la base di conoscenza è utile per sei settimane e poi diventa una fonte di errori.",
      },
    ],
    faq: [
      {
        question: "I documenti aziendali finiscono nell'addestramento del modello?",
        answer:
          "Sui piani aziendali di Google e Notion no, ed è dichiarato contrattualmente. Sui piani personali gratuiti le condizioni sono diverse: per i documenti interni usa sempre l'account aziendale.",
      },
      {
        question: "Meglio NotebookLM o un chatbot su misura?",
        answer:
          "NotebookLM per partire domani con cinquanta documenti. Un sistema su misura quando servono permessi differenziati per reparto o l'integrazione dentro un gestionale.",
      },
    ],
    publishedAt: "2026-07-13",
  },
  {
    slug: "schede-prodotto-ecommerce-in-blocco",
    title: "Generare cento schede prodotto e-commerce coerenti in un pomeriggio",
    description:
      "Dal foglio con le specifiche tecniche alle descrizioni ottimizzate, con lo stesso tono su tutto il catalogo.",
    intro:
      "Chi carica un catalogo si trova davanti alla stessa scelta: descrizioni copiate dal fornitore, uguali a quelle di venti concorrenti, oppure settimane di scrittura. La generazione in blocco risolve il problema a una condizione: che il tono e la struttura siano decisi prima, non prodotto per prodotto.",
    category: "ecommerce",
    categories: ["ecommerce", "marketing", "contenuti"],
    tools: ["gumloop", "claude", "airtable"],
    difficulty: "intermedio",
    minutes: 55,
    outcome:
      "Un catalogo con descrizioni originali e coerenti, campi SEO compilati e nessun testo duplicato dal fornitore.",
    requirements: [
      "Un foglio con le specifiche tecniche dei prodotti",
      "Tre descrizioni scritte da te come riferimento di tono",
      "Un account Gumloop o un'istanza n8n",
    ],
    steps: [
      {
        titolo: "Scrivi tre schede a mano",
        testo:
          "Non sono un esercizio: sono il riferimento. Il modello imita struttura, lunghezza e registro di quello che gli dai. Tre schede scritte bene valgono più di mille parole di istruzioni.",
      },
      {
        titolo: "Fissa la struttura per tutti",
        testo:
          "Apertura sul problema che il prodotto risolve, tre righe di specifiche, un paragrafo sull'uso concreto, una nota su cosa non fa. L'ultimo blocco è quello che riduce i resi e che nessun concorrente scrive.",
      },
      {
        titolo: "Elabora in blocco con controllo a campione",
        testo:
          "Fai passare tutte le righe nello stesso flusso, poi leggi dieci schede scelte a caso. Se due su dieci hanno bisogno di correzioni sostanziali, il problema è nelle istruzioni: correggi lì e rigenera tutto.",
      },
      {
        titolo: "Genera i campi SEO nella stessa passata",
        testo:
          "Meta title sotto i sessanta caratteri, meta description sotto i centosessanta, testo alternativo delle immagini. Farlo dopo significa non farlo: aggiungi le colonne al flusso adesso.",
      },
      {
        titolo: "Controlla la duplicazione interna",
        testo:
          "Il rischio non è copiare il fornitore ma somigliare a sé stessi: cento schede generate dallo stesso schema tendono a ripetere le stesse aperture. Un controllo di similarità sui primi cento caratteri lo intercetta.",
      },
    ],
    faq: [
      {
        question: "Google penalizza le descrizioni generate dall'AI?",
        answer:
          "Google penalizza i contenuti privi di valore, non il metodo con cui sono stati prodotti: è dichiarato nelle sue linee guida. Una scheda generata a partire da specifiche vere e da un tono definito è un contenuto originale.",
      },
      {
        question: "Quanto costa in token per cento prodotti?",
        answer:
          "Con un modello di fascia media si resta sotto i cinque euro per cento schede complete di campi SEO. Il costo dominante è il tempo di configurazione iniziale, non l'elaborazione.",
      },
    ],
    publishedAt: "2026-07-10",
  },
  {
    slug: "screening-candidature-senza-bias",
    title: "Fare lo screening delle candidature senza perdere ore e senza discriminare",
    description:
      "Un flusso che confronta i CV con i requisiti reali della posizione, motiva ogni valutazione e lascia la decisione a una persona.",
    intro:
      "Duecento candidature per una posizione sono ingestibili a mano e pericolose se le si delega a un punteggio automatico. L'AI Act classifica come ad alto rischio i sistemi usati per la selezione del personale: questo flusso è costruito perché la decisione resti umana e documentata.",
    category: "hr",
    categories: ["hr", "operations", "legale"],
    tools: ["gumloop", "claude", "airtable"],
    difficulty: "avanzato",
    minutes: 70,
    outcome:
      "Una lista ordinata con la motivazione esplicita di ogni valutazione, pronta per la revisione di chi decide.",
    requirements: [
      "Una descrizione della posizione con requisiti misurabili",
      "I CV in una cartella o in una casella dedicata",
      "Una persona responsabile della decisione finale",
    ],
    steps: [
      {
        titolo: "Riscrivi i requisiti in forma verificabile",
        testo:
          "«Buona conoscenza dell'inglese» non è verificabile. «Ha lavorato almeno un anno con clienti di lingua inglese» lo è. Se i requisiti non sono verificabili sul CV, il modello inventerà un criterio proprio, ed è lì che nasce la discriminazione.",
      },
      {
        titolo: "Anonimizza prima di valutare",
        testo:
          "Rimuovi nome, età, foto, nazionalità e indirizzo prima che il testo arrivi al modello. È un passaggio meccanico che elimina la fonte di distorsione più documentata, ed è anche il più semplice da implementare.",
      },
      {
        titolo: "Chiedi evidenze, non punteggi",
        testo:
          "Per ogni requisito il modello deve restituire soddisfatto sì o no e la citazione esatta dal CV. Un punteggio complessivo da 1 a 10 non è né verificabile né difendibile: una tabella di evidenze citate lo è.",
      },
      {
        titolo: "Non far scartare nessuno al sistema",
        testo:
          "Il flusso ordina e motiva, non esclude. La riga «non soddisfa tre requisiti su cinque» arriva comunque sul tavolo di chi decide. È la differenza tra uno strumento di supporto e un sistema decisionale automatizzato, con conseguenze normative diverse.",
      },
      {
        titolo: "Documenta il processo",
        testo:
          "Tieni traccia di quale versione delle istruzioni ha valutato quale lotto di candidature, e conserva le motivazioni. In caso di contestazione è l'unica cosa che ti difende.",
      },
    ],
    faq: [
      {
        question: "È consentito usare l'AI per selezionare il personale?",
        answer:
          "È consentito con obblighi: l'AI Act colloca questi sistemi tra quelli ad alto rischio, con requisiti di supervisione umana, trasparenza verso i candidati e tracciabilità. Un supporto che ordina e motiva, con decisione umana, è la configurazione più difendibile.",
      },
      {
        question: "Devo informare i candidati?",
        answer:
          "Sì. L'informativa deve dire che nel processo è impiegato un supporto automatico, con quale finalità, e che la decisione è presa da una persona. Due righe nell'annuncio.",
      },
    ],
    publishedAt: "2026-07-07",
  },
  {
    slug: "analisi-contratti-fornitori-clausole",
    title: "Leggere un contratto fornitore e trovare le clausole che ti costano",
    description:
      "Un metodo per far emergere rinnovi taciti, penali asimmetriche e limitazioni di responsabilità prima di firmare.",
    intro:
      "I contratti fornitore si firmano quando c'è fretta e si leggono quando c'è un problema. Un modello con una finestra di contesto ampia legge ottanta pagine in un minuto: non sostituisce un avvocato, ma fa emergere in anticipo le cose su cui vale la pena chiamarlo.",
    category: "legale",
    categories: ["legale", "amministrazione"],
    tools: ["claude", "notebooklm"],
    difficulty: "base",
    minutes: 25,
    outcome:
      "Una lista delle clausole critiche con il riferimento all'articolo, ordinata per impatto economico.",
    requirements: ["Il contratto in PDF", "Un abbonamento a Claude o Gemini a pagamento"],
    steps: [
      {
        titolo: "Carica il documento intero",
        testo:
          "Non spezzarlo e non riassumerlo prima: le clausole pericolose stanno quasi sempre negli allegati e nei rimandi tra articoli, che si perdono quando si lavora a pezzi.",
      },
      {
        titolo: "Chiedi una lista, non un riassunto",
        testo:
          "Il riassunto di un contratto è inutile. Chiedi le clausole che comportano un costo o un vincolo per te, ognuna con il numero di articolo, la citazione testuale e l'impatto pratico in una riga.",
      },
      {
        titolo: "Cerca le sette cose che si ripetono sempre",
        testo:
          "Rinnovo tacito e termini di disdetta, revisione unilaterale dei prezzi, penali asimmetriche, limitazione di responsabilità del fornitore, proprietà dei dati alla cessazione, foro competente, esclusiva. Chiedile per nome: se non ci sono, deve dirtelo esplicitamente.",
      },
      {
        titolo: "Confronta con il contratto precedente",
        testo:
          "Carica anche la versione dell'anno scorso e chiedi solo le differenze sostanziali. È il passaggio che intercetta le modifiche introdotte in silenzio al rinnovo.",
      },
      {
        titolo: "Porta la lista, non il contratto, all'avvocato",
        testo:
          "Una consulenza su cinque clausole identificate costa una frazione di una revisione integrale, e il legale lavora meglio partendo da domande precise.",
      },
    ],
    faq: [
      {
        question: "Posso caricare un contratto riservato?",
        answer:
          "Sui piani a pagamento di Claude e Gemini i contenuti non alimentano l'addestramento e il trattamento è coperto contrattualmente. Resta una comunicazione a un fornitore terzo: va inserita nel registro dei trattamenti e verificata rispetto agli obblighi di riservatezza del contratto stesso.",
      },
      {
        question: "Sostituisce il parere legale?",
        answer:
          "No. Individua i punti su cui serve un parere e riduce il tempo che il legale impiega a trovarli. La valutazione giuridica resta sua.",
      },
    ],
    publishedAt: "2026-07-04",
  },
  {
    slug: "report-vendite-automatico-settimanale",
    title: "Ricevere ogni lunedì il report vendite già scritto",
    description:
      "Dal gestionale al documento con i numeri, gli scostamenti e le tre righe di commento, senza che nessuno apra un foglio.",
    intro:
      "Il report settimanale viene fatto la domenica sera o non viene fatto. La parte che richiede tempo non è il calcolo ma la scrittura del commento: è esattamente la parte che un modello fa bene, a patto che i numeri gli arrivino già corretti.",
    category: "dati",
    categories: ["dati", "vendite", "operations"],
    tools: ["n8n", "julius", "claude"],
    difficulty: "intermedio",
    minutes: 60,
    outcome:
      "Un documento nella casella del lunedì mattina con numeri, scostamenti e commento pronto da leggere in riunione.",
    requirements: [
      "Un export delle vendite, anche CSV pianificato",
      "I dati dello stesso periodo dell'anno precedente",
      "Un'istanza n8n o Make",
    ],
    steps: [
      {
        titolo: "Calcola nel flusso, non nel modello",
        testo:
          "Somme, medie e variazioni percentuali si calcolano con codice, non chiedendoli a un modello linguistico. Il modello riceve numeri già corretti e si occupa solo di spiegarli. È la regola che separa un report affidabile da uno pericoloso.",
      },
      {
        titolo: "Definisci le soglie di rilevanza",
        testo:
          "Uno scostamento sotto il cinque per cento è rumore. Dichiara le soglie nel flusso, altrimenti il commento darà lo stesso peso a una variazione irrilevante e a un crollo.",
      },
      {
        titolo: "Chiedi ipotesi dichiarate come tali",
        testo:
          "Il commento deve distinguere quello che i dati dicono da quello che potrebbero suggerire. Un'ipotesi presentata come fatto in un report direzionale è un danno, non un aiuto.",
      },
      {
        titolo: "Aggiungi le tre domande per la riunione",
        testo:
          "Chiudi il report con le tre domande che i numeri sollevano. È la parte che trasforma un documento letto in cinque minuti in una riunione con un ordine del giorno.",
      },
      {
        titolo: "Consegna nel canale giusto",
        testo:
          "Email il lunedì alle sette, corpo del messaggio leggibile da telefono, allegato solo per chi vuole i dettagli. Un report che richiede di aprire una dashboard viene letto una volta su tre.",
      },
    ],
    faq: [
      {
        question: "Il modello può sbagliare i numeri?",
        answer:
          "Sì, ed è il motivo per cui i calcoli non vanno mai delegati a lui. Se i numeri arrivano già calcolati dal flusso e il modello deve solo commentarli, l'errore aritmetico è escluso per costruzione.",
      },
      {
        question: "Funziona con un gestionale italiano chiuso?",
        answer:
          "Quasi tutti permettono un export pianificato su cartella o FTP. Il flusso parte da lì: non serve un'integrazione diretta per avere un report affidabile.",
      },
    ],
    publishedAt: "2026-07-01",
  },
  {
    slug: "preventivi-artigiani-da-foto",
    title: "Fare un preventivo partendo dalle foto che il cliente ti manda",
    description:
      "Un flusso che legge le immagini del lavoro da fare, estrae le misure dichiarate e prepara la voce di preventivo sul tuo listino.",
    intro:
      "L'artigiano riceve tre foto e un messaggio vocale, e da lì deve tirare fuori un numero. Il sopralluogo resta necessario sui lavori importanti, ma per le richieste piccole la prima stima si può preparare in cinque minuti invece che in una sera.",
    category: "artigianato",
    categories: ["artigianato", "vendite", "officine"],
    tools: ["claude", "n8n", "gamma"],
    difficulty: "base",
    minutes: 40,
    outcome:
      "Una bozza di preventivo con voci e quantità stimate, pronta da correggere e mandare dal telefono.",
    requirements: [
      "Il listino delle lavorazioni ricorrenti",
      "Un numero WhatsApp aziendale",
      "Cinque preventivi già emessi come riferimento",
    ],
    steps: [
      {
        titolo: "Standardizza cosa chiedere al cliente",
        testo:
          "Un messaggio automatico che chiede tre foto da tre angolazioni, una foto con un metro nell'inquadratura e due righe su cosa serve. La foto con il metro è quello che rende la stima possibile invece che campata in aria.",
      },
      {
        titolo: "Fai descrivere prima di far stimare",
        testo:
          "Il modello deve prima elencare cosa vede: materiali, stato, superficie approssimativa, difficoltà di accesso. Solo dopo passa alle voci di lavorazione. Saltare la descrizione produce numeri inventati.",
      },
      {
        titolo: "Vincola al listino",
        testo:
          "Le voci devono uscire dal tuo listino, non da una stima generica di mercato. Se una lavorazione non è a listino, il modello deve segnalarlo invece di inventarne il prezzo.",
      },
      {
        titolo: "Marca sempre la stima come provvisoria",
        testo:
          "La bozza esce con l'intervallo, non con il numero secco, e con la nota che la conferma richiede sopralluogo. Protegge te e imposta correttamente l'aspettativa del cliente.",
      },
      {
        titolo: "Correggi e manda dal telefono",
        testo:
          "La bozza arriva su WhatsApp, la correggi in due minuti e la mandi. Il vantaggio competitivo non è la precisione del preventivo: è rispondere in giornata quando gli altri rispondono in settimana.",
      },
    ],
    faq: [
      {
        question: "Quanto sono attendibili le stime da foto?",
        answer:
          "Sulle lavorazioni standard con un riferimento dimensionale nell'inquadratura l'errore resta accettabile per una prima indicazione. Su lavori strutturali o con vincoli non visibili l'attendibilità crolla: lì la stima serve solo a decidere se vale il sopralluogo.",
      },
      {
        question: "Il cliente si aspetta che il preventivo sia definitivo?",
        answer:
          "Solo se non glielo dici. Una riga esplicita sulla natura indicativa della stima elimina il problema, e nessuno si è mai lamentato di aver ricevuto una risposta troppo in fretta.",
      },
    ],
    publishedAt: "2026-06-28",
  },
  {
    slug: "primo-agente-ai-n8n",
    title: "Costruire il primo agente AI con n8n, dall'installazione al flusso in produzione",
    description:
      "Il percorso completo: server, installazione, nodo agente, strumenti collegati e messa in sicurezza.",
    intro:
      "Tra un'automazione e un agente c'è una differenza precisa: l'automazione esegue i passi che hai scritto, l'agente decide quali strumenti usare per raggiungere un obiettivo. n8n è la strada più praticabile per costruirne uno senza affidare i dati a un servizio esterno.",
    category: "sviluppo",
    categories: ["sviluppo", "operations", "generale"],
    tools: ["n8n", "claude", "supabase"],
    difficulty: "avanzato",
    minutes: 90,
    outcome:
      "Un agente che riceve una richiesta, sceglie gli strumenti da usare e restituisce un risultato tracciato.",
    requirements: [
      "Un server o un Mac sempre acceso con Docker",
      "Una chiave API di un modello",
      "Un dominio per esporre i webhook in sicurezza",
    ],
    steps: [
      {
        titolo: "Installa n8n con Docker e un volume persistente",
        testo:
          "Un solo comando e il servizio è in piedi. Il volume persistente è obbligatorio: senza, a ogni riavvio del contenitore perdi flussi e credenziali. È l'errore che tutti fanno la prima volta.",
      },
      {
        titolo: "Esponi solo i webhook, mai l'interfaccia",
        testo:
          "L'amministrazione resta accessibile solo dalla rete locale o dietro un tunnel autenticato. Un'istanza n8n con l'editor esposto su internet è un accesso completo a tutte le credenziali che ci hai messo dentro.",
      },
      {
        titolo: "Definisci gli strumenti prima dell'agente",
        testo:
          "Costruisci e collauda separatamente ogni sotto-flusso che l'agente potrà chiamare: cerca cliente, crea attività, invia email. Un agente con strumenti non collaudati produce errori impossibili da diagnosticare.",
      },
      {
        titolo: "Scrivi istruzioni con i limiti, non solo con l'obiettivo",
        testo:
          "Cosa non deve fare mai, quando deve fermarsi e chiedere, cosa restituire se non ce la fa. Le istruzioni negative valgono più di quelle positive: sono il perimetro dentro cui l'autonomia è accettabile.",
      },
      {
        titolo: "Aggiungi memoria e tracciatura",
        testo:
          "Un archivio Postgres per la memoria conversazionale e un log di ogni chiamata a strumento. Senza tracciatura, quando l'agente sbaglia non hai modo di capire quale passaggio ha deciso male.",
      },
      {
        titolo: "Metti in produzione con un tetto di spesa",
        testo:
          "Un limite di chiamate per esecuzione e un tetto mensile sulla chiave API. Un agente in ciclo può bruciare il budget di un mese in una notte, e succede più spesso di quanto si creda.",
      },
    ],
    faq: [
      {
        question: "n8n self-hosted è davvero gratuito?",
        answer:
          "La licenza fair-code consente l'uso interno gratuito senza limiti di esecuzioni. I costi sono il server, dai cinque ai venti euro al mese, e i token del modello. Le funzioni aziendali come SSO e ambienti separati sono a pagamento.",
      },
      {
        question: "Meglio n8n o Make per iniziare?",
        answer:
          "Make se non hai un server e vuoi risultati in un'ora. n8n se i dati non devono uscire, se i volumi sono alti, o se prevedi di collegare cose che non hanno un connettore pronto.",
      },
    ],
    publishedAt: "2026-06-25",
  },
  {
    slug: "ricerca-prospect-prima-della-chiamata",
    title: "Arrivare alla chiamata commerciale sapendo già tutto del cliente",
    description:
      "Cinque minuti di preparazione automatica per ogni appuntamento: attività recenti, segnali di acquisto e tre domande su misura.",
    intro:
      "La differenza tra una call commerciale buona e una mediocre si decide nei primi novanta secondi, e dipende da quanto hai studiato prima. Il problema è che studiare quindici prospect a settimana richiede un pomeriggio che nessun commerciale ha.",
    category: "vendite",
    categories: ["vendite", "marketing", "ricerca"],
    tools: ["clay", "perplexity", "claude"],
    difficulty: "intermedio",
    minutes: 45,
    outcome:
      "Una scheda di una pagina per ogni appuntamento, nella casella la sera prima.",
    requirements: [
      "L'agenda degli appuntamenti collegata",
      "Un account Perplexity Pro o Clay",
      "Il profilo del cliente ideale scritto",
    ],
    steps: [
      {
        titolo: "Parti dall'agenda, non dalla lista",
        testo:
          "Il flusso si attiva sugli appuntamenti dei prossimi due giorni ed estrae il dominio dall'invito. Preparare tutti i prospect è uno spreco: preparare quelli che vedrai domani è ad alto rendimento.",
      },
      {
        titolo: "Raccogli solo quello che cambia il discorso",
        testo:
          "Cosa fa l'azienda in una riga, dimensione, novità degli ultimi sei mesi, posizioni aperte, tecnologie visibili sul sito. Le posizioni aperte sono il segnale più sottovalutato: dicono dove l'azienda sta investendo adesso.",
      },
      {
        titolo: "Pretendi le fonti",
        testo:
          "Ogni affermazione della scheda deve avere il link. Arrivare in call con un'informazione sbagliata detta con sicurezza costa più di non averla. Perplexity cita per costruzione, ed è il motivo per cui è lo strumento giusto qui.",
      },
      {
        titolo: "Fai generare tre domande, non un discorso",
        testo:
          "Tre domande specifiche costruite sui segnali trovati. Non un copione: le domande spostano la conversazione, il copione la irrigidisce.",
      },
      {
        titolo: "Consegna la sera prima",
        testo:
          "Una pagina, leggibile da telefono, alle diciotto del giorno precedente. Una scheda che arriva la mattina stessa non viene letta.",
      },
    ],
    faq: [
      {
        question: "È conforme al GDPR raccogliere dati sui prospect?",
        answer:
          "I dati aziendali pubblici e i contatti di ruolo professionale si trattano su base di legittimo interesse, con informativa al primo contatto e diritto di opposizione. Il profilo personale del singolo, quello no.",
      },
      {
        question: "Serve Clay o basta Perplexity?",
        answer:
          "Per una decina di appuntamenti a settimana basta Perplexity con un flusso semplice. Clay conviene sopra le cinquanta ricerche settimanali, dove l'arricchimento a cascata da più fonti fa la differenza.",
      },
    ],
    publishedAt: "2026-06-22",
  },
  {
    slug: "email-marketing-segmentato-comportamento",
    title: "Segmentare la newsletter sul comportamento invece che sull'anagrafica",
    description:
      "Smettere di mandare la stessa email a tutti: segmenti costruiti su cosa le persone fanno, con contenuti generati per segmento.",
    intro:
      "La segmentazione per settore o dimensione azienda predice male il comportamento. Quello che predice bene è il comportamento stesso: cosa ha aperto, cosa ha cliccato, cosa ha guardato sul sito. È un dato che quasi tutti hanno già e quasi nessuno usa.",
    category: "marketing",
    categories: ["marketing", "vendite", "dati"],
    tools: ["brevo", "claude", "n8n"],
    difficulty: "intermedio",
    minutes: 50,
    outcome:
      "Quattro segmenti comportamentali con una versione dedicata di ogni invio, generata dallo stesso contenuto base.",
    requirements: [
      "Una lista con almeno sei mesi di storico",
      "Il tracciamento dei clic attivo",
      "Un account Brevo o equivalente",
    ],
    steps: [
      {
        titolo: "Costruisci quattro segmenti, non dodici",
        testo:
          "Attivi, tiepidi, dormienti, mai attivi. Quattro segmenti si gestiscono, dodici si abbandonano dopo tre invii. La semplicità qui vale più della precisione.",
      },
      {
        titolo: "Scrivi il contenuto una volta sola",
        testo:
          "Un solo pezzo di contenuto sostanziale, poi quattro adattamenti generati: lunghezza, apertura e chiamata all'azione cambiano per segmento, la sostanza no. Scrivere quattro email diverse è insostenibile alla terza settimana.",
      },
      {
        titolo: "Cambia la chiamata all'azione, non il tono",
        testo:
          "Agli attivi si chiede un passo avanti concreto, ai tiepidi si chiede una lettura, ai dormienti si chiede solo se vogliono restare. Cambiare tono tra i segmenti fa perdere coerenza al marchio.",
      },
      {
        titolo: "Genera cinque oggetti e provane due",
        testo:
          "Il modello produce cinque varianti di oggetto, tu ne scegli due e le metti in test A/B sul segmento più numeroso. L'oggetto è la variabile con l'effetto maggiore e il costo di prova più basso.",
      },
      {
        titolo: "Pulisci i mai attivi dopo tre tentativi",
        testo:
          "Tre email di riattivazione, poi rimozione. Tenere in lista chi non apre da un anno peggiora la reputazione del dominio e quindi la consegna a chi invece legge.",
      },
    ],
    faq: [
      {
        question: "Quanto storico serve per segmentare?",
        answer:
          "Sei invii sono il minimo per distinguere un comportamento da un caso. Sotto quella soglia i segmenti sono rumore e conviene mandare a tutti.",
      },
      {
        question: "Perché Brevo e non Mailchimp?",
        answer:
          "Server in Unione Europea, prezzo a email inviate invece che a contatti in lista, e un piano gratuito che regge una PMI vera. Per chi manda a diecimila contatti una volta al mese la differenza di costo è sostanziale.",
      },
    ],
    publishedAt: "2026-06-19",
  },
  {
    slug: "assistenza-clienti-primo-livello-e-commerce",
    title: "Coprire l'assistenza di primo livello dell'e-commerce senza assumere",
    description:
      "Un assistente collegato a ordini e spedizioni che risolve le domande ripetitive e passa all'operatore quello che conta.",
    intro:
      "In un negozio online la metà delle richieste riguarda dove sia il pacco. È lavoro a valore zero per chi lo fa e a valore alto per chi lo riceve: esattamente il profilo di quello che conviene automatizzare per primo.",
    category: "customer-service",
    categories: ["customer-service", "ecommerce"],
    tools: ["tidio-lyro", "intercom-fin", "n8n"],
    difficulty: "base",
    minutes: 40,
    outcome:
      "Le domande su stato ordine, resi e spedizioni ricevono risposta immediata, ventiquattro ore su ventiquattro.",
    requirements: [
      "Un e-commerce su Shopify, WooCommerce o simili",
      "Le condizioni di reso e spedizione scritte",
      "Accesso al tracciamento del corriere",
    ],
    steps: [
      {
        titolo: "Conta le domande prima di scegliere lo strumento",
        testo:
          "Esporta l'ultimo mese di ticket e classificali. Nella quasi totalità dei casi cinque tipologie coprono l'ottanta per cento del volume. Automatizza quelle cinque e fermati lì.",
      },
      {
        titolo: "Collega i dati veri, non solo le FAQ",
        testo:
          "Un assistente che risponde «puoi controllare nella tua area riservata» non risolve niente. Deve leggere lo stato dell'ordine e dire dov'è il pacco. È il collegamento che separa un chatbot inutile da uno utile.",
      },
      {
        titolo: "Definisci l'uscita all'operatore",
        testo:
          "Reclamo, prodotto danneggiato, richiesta di rimborso, seconda incomprensione: passaggio immediato a una persona, con la conversazione già riassunta. Insistere su un cliente arrabbiato è il modo più veloce per perderlo.",
      },
      {
        titolo: "Dichiara la natura automatica",
        testo:
          "Dall'agosto 2026 la dichiarazione è un obbligo per i sistemi che interagiscono con le persone. Una riga in apertura della chat basta, ed è anche una scelta commerciale sensata.",
      },
      {
        titolo: "Rivedi le conversazioni ogni settimana",
        testo:
          "Leggi venti conversazioni a caso ogni lunedì per il primo mese. Ogni risposta sbagliata indica un buco nella base di conoscenza, non un limite del modello.",
      },
    ],
    faq: [
      {
        question: "Quanto si riducono i ticket?",
        answer:
          "Sui volumi tipici di un e-commerce piccolo, la deviazione realistica dopo la messa a punto sta tra il quaranta e il sessanta per cento dei ticket di primo livello. Chi promette il novanta per cento sta contando anche le conversazioni chiuse senza risolvere.",
      },
      {
        question: "Conviene Lyro o Fin?",
        answer:
          "Lyro per un negozio con volumi contenuti e budget fisso. Fin quando i volumi sono alti e ti serve il pagamento a risoluzione, che allinea il costo al risultato.",
      },
    ],
    publishedAt: "2026-06-16",
  },
  {
    slug: "onboarding-nuovi-assunti-video-multilingua",
    title: "Produrre l'onboarding dei nuovi assunti in cinque lingue senza girare video",
    description:
      "Dalla procedura scritta al corso video con avatar, aggiornabile modificando il testo invece di rigirare tutto.",
    intro:
      "Un'azienda con personale straniero o con sedi estere si trova davanti a un problema di manutenzione: ogni modifica alla procedura significa rigirare i video. Con la generazione da testo il costo di aggiornamento crolla, ed è quello il vero risparmio, non la produzione iniziale.",
    category: "formazione",
    categories: ["formazione", "hr", "operations"],
    tools: ["synthesia", "heygen", "elevenlabs"],
    difficulty: "base",
    minutes: 45,
    outcome:
      "Un percorso di onboarding in cinque lingue che si aggiorna modificando un documento di testo.",
    requirements: [
      "Le procedure di onboarding scritte",
      "Un account Synthesia o HeyGen",
      "Il logo e i colori aziendali",
    ],
    steps: [
      {
        titolo: "Spezza in moduli da tre minuti",
        testo:
          "Un modulo, un argomento. Un video di venti minuti non viene guardato fino in fondo da nessuno, e quando cambia una regola devi rifare tutto invece che un pezzo.",
      },
      {
        titolo: "Scrivi il copione in italiano parlato",
        testo:
          "Frasi corte, seconda persona, niente subordinate. La sintesi vocale rende male i periodi lunghi, e la traduzione automatica peggiora quello che era già contorto in partenza.",
      },
      {
        titolo: "Traduci e fai rivedere da un madrelingua",
        testo:
          "La traduzione automatica è buona ma sbaglia i termini contrattuali e di sicurezza, che sono esattamente quelli che non possono essere sbagliati in un onboarding. Un'ora di revisione per lingua.",
      },
      {
        titolo: "Genera con lo stesso avatar per tutte le lingue",
        testo:
          "Coerenza visiva tra le versioni: è quello che fa percepire il materiale come istituzionale invece che raffazzonato.",
      },
      {
        titolo: "Chiudi ogni modulo con tre domande",
        testo:
          "Un quiz breve dopo ogni modulo, con esito registrato. Serve a te per dimostrare l'avvenuta formazione, che per la sicurezza sul lavoro è un obbligo documentale.",
      },
    ],
    faq: [
      {
        question: "Vale anche per la formazione obbligatoria sull'AI?",
        answer:
          "L'articolo 4 dell'AI Act impone di garantire un livello adeguato di alfabetizzazione a chi usa sistemi di AI in azienda, senza prescrivere la forma. Un percorso video con tracciamento delle presenze è un modo documentabile di assolverlo.",
      },
      {
        question: "Gli avatar sono accettati dai dipendenti?",
        answer:
          "Sulla formazione procedurale sì, l'effetto artificiale non disturba. Sulle comunicazioni che richiedono empatia, come i cambi organizzativi, no: lì serve una persona vera.",
      },
    ],
    publishedAt: "2026-06-13",
  },
  {
    slug: "inventario-strumenti-ai-registro",
    title: "Costruire il registro degli strumenti AI usati in azienda",
    description:
      "Il documento che serve per l'AI Act, fatto in un pomeriggio partendo dai dati che hai già.",
    intro:
      "Prima di qualunque adempimento serve sapere cosa si sta usando, e quasi nessuna azienda lo sa: gli strumenti AI entrano dal basso, uno alla volta, sulle carte di credito personali. Il registro è il documento da cui parte tutto il resto.",
    category: "legale",
    categories: ["legale", "operations", "generale"],
    tools: ["airtable", "claude", "notion-ai"],
    difficulty: "base",
    minutes: 35,
    outcome:
      "Un registro con ogni strumento, la finalità, i dati trattati, il responsabile e la classificazione di rischio.",
    requirements: [
      "Accesso agli abbonamenti e alle note spese",
      "La lista dei domini visitati, se disponibile",
      "Un'ora di ciascun responsabile di funzione",
    ],
    steps: [
      {
        titolo: "Parti dalle spese, non dalle interviste",
        testo:
          "Estratti conto delle carte aziendali e note spese degli ultimi dodici mesi. Emergono strumenti che nessuno avrebbe citato in un'intervista, ed è esattamente quello che il registro deve intercettare.",
      },
      {
        titolo: "Chiedi cosa entra, non cosa fa",
        testo:
          "Per ogni strumento la domanda è: quali dati ci finiscono dentro. Dati personali di clienti, dati di dipendenti, informazioni riservate, oppure niente di tutto questo. È il campo che determina tutto il resto.",
      },
      {
        titolo: "Classifica per uso, non per tecnologia",
        testo:
          "L'AI Act classifica il rischio in base a cosa il sistema fa alle persone. Lo stesso modello è a rischio minimo se scrive una newsletter e ad alto rischio se seleziona candidati. Registra l'uso concreto.",
      },
      {
        titolo: "Assegna un responsabile per riga",
        testo:
          "Un nome per ogni strumento. Un registro senza responsabili è un elenco: non produce nessuna delle decisioni che dovrebbe innescare.",
      },
      {
        titolo: "Fissa la revisione trimestrale",
        testo:
          "Un promemoria ricorrente e mezz'ora ogni tre mesi. Il registro invecchia in fretta perché gli strumenti cambiano, e un registro vecchio è peggio di nessun registro davanti a una verifica.",
      },
    ],
    faq: [
      {
        question: "È obbligatorio tenere questo registro?",
        answer:
          "L'AI Act non impone un registro con questo nome per gli utilizzatori, ma impone obblighi che senza un inventario non si possono dimostrare: alfabetizzazione del personale, trasparenza verso gli interessati, supervisione umana sui sistemi ad alto rischio. Il registro è il modo pratico di reggerli.",
      },
      {
        question: "Vale anche per gli strumenti gratuiti?",
        answer:
          "Soprattutto per quelli. Un modello gratuito usato su dati di clienti è il caso che genera più esposizione, proprio perché non passa da nessun processo di acquisto.",
      },
    ],
    publishedAt: "2026-06-10",
  },
  {
    slug: "sito-vetrina-in-un-giorno",
    title: "Mettere online un sito vetrina decente in una giornata",
    description:
      "Struttura, testi, immagini e pubblicazione: il percorso completo per chi non ha né budget né agenzia.",
    intro:
      "Molte piccole imprese hanno un sito fermo al 2018 o non ce l'hanno. Il blocco non è tecnico ma di contenuto: nessuno sa cosa scrivere. Gli strumenti attuali risolvono la parte tecnica quasi del tutto e accompagnano quella di contenuto, che resta la più importante.",
    category: "generale",
    categories: ["generale", "marketing", "no-code"],
    tools: ["lovable", "v0", "nano-banana"],
    difficulty: "base",
    minutes: 60,
    outcome: "Un sito di cinque pagine online, con testi propri e immagini coerenti.",
    requirements: [
      "Un dominio",
      "Logo e colori, anche approssimativi",
      "Venti minuti per rispondere a cinque domande su cosa fai",
    ],
    steps: [
      {
        titolo: "Rispondi a cinque domande prima di aprire qualsiasi strumento",
        testo:
          "Cosa vendi, a chi, quale problema risolvi, perché te e non un altro, cosa deve fare chi arriva sul sito. Senza queste cinque risposte il sito sarà bello e non dirà niente, che è il difetto della maggior parte dei siti aziendali.",
      },
      {
        titolo: "Fissa la struttura a cinque pagine",
        testo:
          "Home, cosa facciamo, chi siamo, casi o lavori, contatti. Cinque pagine fatte bene battono quindici pagine mezze vuote, e si mantengono.",
      },
      {
        titolo: "Genera l'interfaccia descrivendola",
        testo:
          "In Lovable descrivi struttura, tono visivo e colori. Iterare tre volte sulla stessa pagina dà risultati migliori che generare l'intero sito in una volta.",
      },
      {
        titolo: "Riscrivi tu i titoli",
        testo:
          "I testi generati vanno bene per i paragrafi, quasi mai per i titoli: sono generici. I titoli sono la parte che viene letta davvero, e sono venti frasi in tutto.",
      },
      {
        titolo: "Pubblica e collega gli strumenti di misura",
        testo:
          "Dominio, certificato, Search Console e un modulo di contatto che arriva davvero in casella. Un sito senza Search Console collegata è un sito di cui non saprai mai niente.",
      },
    ],
    faq: [
      {
        question: "Il codice generato è mio?",
        answer:
          "Con Lovable e v0 sì, ed è esportabile su GitHub: puoi portarlo altrove o farlo riprendere in mano a uno sviluppatore. È la differenza rispetto ai costruttori di siti chiusi.",
      },
      {
        question: "Va bene per il posizionamento su Google?",
        answer:
          "La base tecnica è corretta. Il posizionamento dipende dai contenuti e dai collegamenti in entrata, non dallo strumento: un sito generato con contenuti veri va meglio di un sito artigianale con contenuti vuoti.",
      },
    ],
    publishedAt: "2026-06-07",
  },
];

export function etichettaCategoriaGuida(slug: string): string {
  return etichetta(CATEGORIE_GUIDE, slug);
}

export function categorieGuideAttive() {
  const usate = new Set(GUIDE.flatMap((g) => g.categories));
  return CATEGORIE_GUIDE.filter((c) => usate.has(c.slug)).map((c) => ({
    ...c,
    count: GUIDE.filter((g) => g.categories.includes(c.slug)).length,
  }));
}

export function guidePerCategoria(slug: string): Guida[] {
  const elenco = slug === "tutte" ? [...GUIDE] : GUIDE.filter((g) => g.categories.includes(slug));
  return elenco.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getGuida(slug: string): Guida | undefined {
  return GUIDE.find((g) => g.slug === slug);
}

export function guideRecenti(n = 6): Guida[] {
  return [...GUIDE].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, n);
}

export function guidePerTool(slug: string, n = 3): Guida[] {
  return GUIDE.filter((g) => g.tools.includes(slug)).slice(0, n);
}

export const ETICHETTE_DIFFICOLTA: Record<Difficolta, string> = {
  base: "Base",
  intermedio: "Intermedio",
  avanzato: "Avanzato",
};
