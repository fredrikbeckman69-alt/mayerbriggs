export const mbtiDescriptions: Record<string, {
    title: string;
    description: string;
    strengths: string[];
    weaknesses: string[];
    workplace: string;
}> = {
    "ISTJ": {
        title: "Logistikern (ISTJ)",
        description: "En praktisk och faktaorienterad individ vars pålitlighet inte kan ifrågasättas. ISTJ-personligheter är ofta reserverade men oerhört lojala och plikttrogna. De föredrar struktur, ordning och tydliga regler.",
        strengths: ["Ärlig och direkt", "Mycket ansvarsfull", "Lugn och praktisk", "Skapar och upprätthåller ordning"],
        weaknesses: ["Kan uppfattas som okänslig", "Har svårt att acceptera förändringar", "Kan vara dömmande"],
        workplace: "På arbetsplatsen är ISTJ ryggraden i organisationen. De trivs best med tydliga mål, deadlines och strukturerade processer där de kan leverera hög kvalitet."
    },
    "ISFJ": {
        title: "Försvararen (ISFJ)",
        description: "En mycket dedikerad och varm skyddare som alltid är redo att försvara sina nära och kära. ISFJ är tillbakadragna men sociala på sitt eget sätt, och de har en stark känsla för detaljer och minns ofta små saker om andra.",
        strengths: ["Stödjande och pålitlig", "Observant och detaljorienterad", "Tålmodig", "Bra på praktiska lösningar"],
        weaknesses: ["Tar saker för personligt", "Överbelastar sig själva", "Motvilliga till förändring"],
        workplace: "En ISFJ är ofta den som ser till att teamet mår bra och att jobbet blir gjort ordentligt utan att kräva rampljuset. De är utmärkta på att skapa harmoni."
    },
    "INFJ": {
        title: "Förespråkaren (INFJ)",
        description: "En tystlåten och mystisk inspiratör som dock är en outtröttlig idealist. INFJ är den mest sällsynta personlighetstypen. De har djupa tankar och en stark inre moralisk kompass.",
        strengths: ["Kreativ och insiktsfull", "Principfast", "Passionerad och altruistisk", "Inspirerande ledare"],
        weaknesses: ["Känslig för kritik", "Kan bränna ut sig", "Perfektionistisk"],
        workplace: "INFJ drivs av att göra skillnad snarare än pengar eller status. De trivs i roller där de kan hjälpa andra att utvecklas och där deras kreativitet uppskattas."
    },
    "INTJ": {
        title: "Arkitekten (INTJ)",
        description: "En uppfinningsrik och strategisk tänkare med en plan för allt. INTJ är extremt självständiga och drivs av logik och mönster. De ser livet som ett schackbräde och tänker alltid flera steg framåt.",
        strengths: ["Strategisk och rationell", "Självständig", "Nyfiken och lärande", "Ser möjligheter till förbättring överallt"],
        weaknesses: ["Kan vara arrogant", "Avfärdar känslor", "Överteoretiserar"],
        workplace: "INTJ är utmärkta på att lösa komplexa problem och effektivisera system. De föredrar att arbeta självständigt eller med andra högpresterande individer."
    },
    "ISTP": {
        title: "Virtuosen (ISTP)",
        description: "En djärv och praktisk experimenterare som behärskar alla sorters verktyg. ISTP är spontana och oförutsägbara, men samtidigt logiska och rationella. De lär sig bäst genom att göra.",
        strengths: ["Optimistisk och energisk", "Kreativ och praktisk", "Spontan och rationell", "Bra i krissituationer"],
        weaknesses: ["Kan vara riskbenägen", "Lättuttråkad", "Privat och reserverad"],
        workplace: "ISTP trivs i miljöer där de får lösa konkreta problem, gärna akut. De ogillar strikta regler och mikromanagement."
    },
    "ISFP": {
        title: "Äventyraren (ISFP)",
        description: "En flexibel och charmig konstnär, alltid redo att utforska och uppleva något nytt. ISFP lever i nuet och njuter av livet. De är ofta estetiskt lagda och bryter gärna mot konventioner.",
        strengths: ["Charmig och varm", "Konstnärlig och kreativ", "Fantasifull", "Passionerad"],
        weaknesses: ["Lättstressad", "Överrivet tävlingsinriktad", "Oförutsägbar"],
        workplace: "ISFP behöver frihet och utrymme för sin kreativitet. De jobbar bäst i en stödjande miljö där de får uttrycka sig själva."
    },
    "INFP": {
        title: "Medlaren (INFP)",
        description: "En poetisk, snäll och altruistisk person, alltid ivrig att hjälpa en god sak. INFP styrs av sina principer och värderingar snarare än logik. De söker alltid efter mening och sanning.",
        strengths: ["Empatisk och generös", "Öppensinnad", "Kreativ", "Passionerad för sina ideal"],
        weaknesses: ["Orealistisk", "Kan isolera sig", "Svårt att fokusera på detaljer"],
        workplace: "INFP är visionärer som vill känna att deras arbete har en djupare mening. De är ofta duktiga skribenter och kommunikatörer."
    },
    "INTP": {
        title: "Logikern (INTP)",
        description: "En innovativ uppfinnare med en omättlig törst efter kunskap. INTP är stolta över sin unikhet och sitt intellekt. De ser mönster som andra missar och älskar teoretiska utmaningar.",
        strengths: ["Analytisk och abstrakt", "Fantasifull och originell", "Öppensinnad", "Objektiv"],
        weaknesses: ["Kan vara disträ", "Okänslig", "Tvvivlar ofta på sig själv"],
        workplace: "INTP trivs bäst när de får dyka djupt ner i komplexa teorier och problem. De avskyr rutinarbete och byråkrati."
    },
    "ESTP": {
        title: "Entreprenören (ESTP)",
        description: "En smart, energisk och mycket uppmärksam person som verkligen gillar att leva på kanten. ESTP handlar först och tänker sen. De är direkta, sällskapliga och gillar drama och passion.",
        strengths: ["Djärv och direkt", "Rationell och praktisk", "Orginiell", "Social och perceptiv"],
        weaknesses: ["Otålig", "Riskbenägen", "Missar helhetsbilden"],
        workplace: "ESTP är problemlösare här och nu. De är utmärkta förhandlare och säljare som trivs i snabba miljöer."
    },
    "ESFP": {
        title: "Underhållaren (ESFP)",
        description: "En spontan, energisk och entusiastisk person - livet är aldrig tråkigt runt dem. ESFP älskar rampljuset och att få andra att skratta. De har ett starkt estetiskt sinne.",
        strengths: ["Djärv och originell", "Estetisk och praktisk", "Mycket observant", "Utmärkta på att hantera människor"],
        weaknesses: ["Känslig", "Undviker konflikter", "Lättuttråkad"],
        workplace: "ESFP skapar stämning på arbetsplatsen. De är duktiga på att hantera kunder och skapa en positiv atmosfär."
    },
    "ENFP": {
        title: "Kampanjen (ENFP)",
        description: "En entusiastisk, kreativ och sällskaplig fri själ som alltid kan hitta en anledning att le. ENFP är sanna frihetssjälar som ser livet som ett stort pussel där allt hänger ihop.",
        strengths: ["Nyfiken", "Observant", "Energisk och entusiastisk", "Utmärkt kommunikatör"],
        weaknesses: ["Svårt att fokusera", "Övertänker", "Blir lätt stressad"],
        workplace: "ENFP är idésprutor som inspirerar andra. De trivs i kreativa miljöer där de slipper detaljstyrning."
    },
    "ENTP": {
        title: "Debattören (ENTP)",
        description: "En smart och nyfiken tänkare som inte kan motstå en intellektuell utmaning. ENTP älskar att argumentera, inte nödvändigtvis för att de håller med, utan för att testa idéer.",
        strengths: ["Kunskapstörstande", "Snabbtänkt", "Originell", "Utmärkt brainstormare"],
        weaknesses: ["Kan vara argumentativ", "Okänslig", "Svårt att fokusera"],
        workplace: "ENTP är innovatörer som ifrågasätter status quo. De är bra på att hitta nya lösningar men sämre på implementering."
    },
    "ESTJ": {
        title: "Direktören (ESTJ)",
        description: "En utmärkt administratör som är oöverträffad när det gäller att hantera saker - eller människor. ESTJ representerar tradition och ordning, och de använder sin förståelse för vad som är rätt och fel för att leda andra.",
        strengths: ["Dedikerad", "Viljestark", "Direkt och ärlig", "Lojal och pålitlig"],
        weaknesses: ["Envis och oflexibel", "Dömmande", "Svårt att slappna av"],
        workplace: "ESTJ är naturliga ledare som skapar tydlighet och struktur. De ser till att saker blir gjorda i tid och enligt plan."
    },
    "ESFJ": {
        title: "Konsuln (ESFJ)",
        description: "En oerhört omtänksam, social och populär person, alltid ivrig att hjälpa till. ESFJ är altruister som tar sitt ansvar på största allvar. De vill bli uppskattade för det de gör.",
        strengths: ["Stark pliktkänsla", "Mycket lojal", "Känslig och varm", "Bra på att knyta kontakter"],
        weaknesses: ["Känslig för kritik", "Förändringsobenägen", "Behöver mycket bekräftelse"],
        workplace: "ESFJ är teamets hjärta som ser till att alla mår bra och drar åt samma håll. De är utmärkta på att organisera sociala strukturer."
    },
    "ENFJ": {
        title: "Protagonisten (ENFJ)",
        description: "Karismatisk och inspirerande ledare som trollbinder sina lyssnare. ENFJ har en naturlig förmåga att se potential i andra och hjälpa dem att växa. De styrs av en djup känsla av altruism.",
        strengths: ["Tolerant", "Pålitlig", "Karismatisk", "Naturlig ledare"],
        weaknesses: ["Överbeskyddande", "Känslig", "Självuppoffrande"],
        workplace: "ENFJ är mentorer och coacher som bygger starka team. De är experter på att få människor att samarbeta mot ett gemensamt mål."
    },
    "ENTJ": {
        title: "Befälhavaren (ENTJ)",
        description: "Djärva, fantasifulla och viljestarka ledare som alltid hittar en väg - eller skapar en. ENTJ ser ineffektivitet som en fiende som måste utrotas. De njuter av långsiktig planering.",
        strengths: ["Effektiv", "Energisk", "Självsäker", "Strategisk tänkare"],
        weaknesses: ["Envis och dominant", "Intolerant", "Arrogant", "Kall och hänsynslös"],
        workplace: "ENTJ är födda att leda organisationer. De sätter upp ambitiösa mål och driver igenom dem med kraft och beslutsamhet."
    }
};
