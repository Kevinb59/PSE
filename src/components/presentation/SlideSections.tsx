"use client";

import { forwardRef } from "react";
import SlideSection from "./SlideSection";
import TiltCard from "@/components/effects/TiltCard";
import RevealOnScroll from "@/components/effects/RevealOnScroll";
import HeroTitle from "@/components/effects/HeroTitle";
import MoriartyBullLogo from "@/components/effects/MoriartyBullLogo";

const cardBase =
  "relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[linear-gradient(145deg,rgba(255,255,255,0.095),rgba(255,255,255,0.038)),var(--card)] p-[26px] shadow-[0_22px_70px_rgba(0,0,0,0.24)] backdrop-blur-[20px] transition hover:-translate-y-2 hover:border-[rgba(142,216,255,0.35)]";

const kicker =
  "mb-5 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[rgba(142,216,255,0.88)] before:h-px before:w-[34px] before:bg-current before:shadow-[0_0_16px_currentColor] before:content-['']";

const kickerRight =
  "mb-5 inline-flex flex-row-reverse items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[rgba(142,216,255,0.88)] after:h-px after:w-[34px] after:bg-current after:shadow-[0_0_16px_currentColor] after:content-['']";

const kickerCenter =
  "mb-5 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[rgba(142,216,255,0.88)] before:h-px before:w-[34px] before:bg-current before:shadow-[0_0_16px_currentColor] before:content-[''] after:h-px after:w-[34px] after:bg-current after:shadow-[0_0_16px_currentColor] after:content-['']";

const h2Style =
  "title-no-break max-w-[1040px] text-[clamp(38px,5.4vw,82px)] font-[850] leading-[0.94] tracking-[-0.06em]";

const h3Style = "title-no-break text-[clamp(20px,2vw,30px)] font-semibold tracking-[-0.035em]";

const leadStyle =
  "mt-[26px] max-w-[860px] text-[clamp(18px,1.7vw,25px)] leading-[1.55] tracking-[-0.015em] text-[var(--muted)]";

const leadStyleWide =
  "mt-[26px] max-w-[1120px] text-[clamp(18px,1.7vw,25px)] leading-[1.55] tracking-[-0.015em] text-[var(--muted)]";

const leadStyleFluid =
  "mt-[26px] max-w-none text-[clamp(18px,1.7vw,25px)] leading-[1.55] tracking-[-0.015em] text-[var(--muted)]";

const pullQuoteStyle =
  "mt-8 w-fit max-w-full rounded-r-[14px] border-l-2 border-[rgba(142,216,255,0.5)] bg-gradient-to-r from-[rgba(142,216,255,0.05)] to-transparent py-3 pl-4 pr-5 text-[clamp(14px,1.2vw,17px)] font-medium leading-[1.4] tracking-[-0.015em] text-white/75";

/** Carte offre compacte — slide 03 */
const offreCardBase =
  "relative flex h-full flex-col rounded-[18px] border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-3.5 backdrop-blur-[16px] transition hover:border-[rgba(142,216,255,0.3)]";

const offreCardFeaturedInner =
  "rainbow-frame__inner border-0 shadow-none hover:border-transparent";

/** Données des 5 formules — slide offres */
const OFFRES_FORMULES = [
  {
    n: "01",
    t: "Vitrine",
    p: "Être visible, rassurer, recevoir des contacts.",
    keywords: ["Pages", "Contact", "Email pro"],
    icon: (
      <path
        d="M6 4h20a2 2 0 0 1 2 2v16l-8-5-8 5-8-5V6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
    ),
  },
  {
    n: "02",
    t: "Évolutif",
    p: "Un site qui peut grandir avec l'activité.",
    keywords: ["Contenus modifiables", "Galeries", "Accompagnement"],
    featured: true,
    icon: (
      <path
        d="M6 20V10M14 20V6M22 20v-8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    ),
  },
  {
    n: "03",
    t: "Planning",
    p: "Recevoir et gérer des demandes de réservation.",
    keywords: ["Créneaux", "Emails auto", "Synchronisation"],
    icon: (
      <>
        <rect x="5" y="6" width="22" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path d="M5 11h22M10 4v4M22 4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    n: "04",
    t: "E-commerce",
    p: "Vendre simplement avec paiement sécurisé.",
    keywords: ["Catalogue", "Paiement", "Commandes"],
    icon: (
      <>
        <path d="M7 9h20l-2 11H9L7 9Z" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path d="M7 9 6 4H3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    n: "05",
    t: "Web App",
    p: "Créer un outil métier sur mesure.",
    keywords: ["Dashboard", "Automatisations", "Modules"],
    icon: (
      <>
        <rect x="4" y="4" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path d="M4 12h24M12 12v16" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
] as const;

/** Pipeline production — slide 05 */
const pipelineBlockBase =
  "relative rounded-[14px] border border-white/11 bg-[linear-gradient(155deg,rgba(255,255,255,0.085),rgba(255,255,255,0.025))] px-4 py-3.5 backdrop-blur-[14px]";

const PRODUCTION_PIPELINE = [
  {
    n: "01",
    t: "Instructions projet",
    p: "Des fichiers de contexte définissent les règles du projet : structure, style, composants, conventions, sécurité et objectifs client.",
    keywords: "règles · contexte · cohérence",
  },
  {
    n: "02",
    t: "Cursor + IA",
    p: "Cursor permet d'accélérer le développement, générer des composants, corriger le code et garder une cohérence technique.",
    keywords: "rapidité · refactorisation · qualité",
  },
  {
    n: "03",
    t: "Composants réutilisables",
    p: "Les éléments fréquents sont standardisés : sections, formulaires, galeries, réservations, paiement, emails, espace admin.",
    keywords: "templates · modules · gain de temps",
  },
  {
    n: "04",
    t: "Assistant IA local",
    p: "Un assistant local peut analyser régulièrement les projets, repérer les incohérences, aider à la maintenance et documenter les évolutions.",
    keywords: "analyse · maintenance · documentation",
  },
  {
    n: "05",
    t: "Versioning & mise en ligne",
    p: "Le code est suivi, sauvegardé et déployé proprement avec GitHub, Vercel, Firebase et des environnements séparés.",
    keywords: "Git · déploiement · sécurité",
  },
] as const;

const PRODUCTION_TOOLS = [
  "Cursor",
  "React",
  "Next.js",
  "Vite",
  "TypeScript",
  "Tailwind",
  "GitHub",
  "Vercel",
  "Firebase",
  "Stripe",
  "Brevo",
  "Cloudinary",
  "Google Workspace",
  "GSAP",
  "Automatisations",
  "SEO",
] as const;

interface SlideSectionsProps {
  sectionRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  introRevealing?: boolean;
  introDone?: boolean;
}

/**
 * Ensemble des slides de la présentation PSE Moriarty.
 * Chaque section correspond à une diapositive scroll-snap.
 */
const SlideSections = forwardRef<HTMLElement, SlideSectionsProps>(
  (
    { sectionRefs, introRevealing = false, introDone = false },
    _ref
  ) => {
    const showHeroTitle = introRevealing || introDone;
    const setRef = (index: number) => (el: HTMLElement | null) => {
      sectionRefs.current[index] = el;
    };

    return (
      <main className="snap-y snap-mandatory max-md:snap-none">
        {/* ── INTRO ── */}
        <SlideSection ref={setRef(0)} id="intro" title="Intro">
          <div className="grid items-center gap-[54px] lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <RevealOnScroll className={kicker} playOnMount>
                Commission PSE · Projet de création
              </RevealOnScroll>
              <HeroTitle
                text="Moriarty"
                startAnimation={showHeroTitle}
                animationDelay={introRevealing && !introDone ? 1.85 : 0}
              />
              <RevealOnScroll className={leadStyle} delay={showHeroTitle ? 0.15 : 0} playOnMount>
                Sites web modernes, accessibles et pensés pour les petites entreprises :
                vitrines, portfolios, réservations, e-commerce léger et applications web utiles.
              </RevealOnScroll>
              <RevealOnScroll className="mt-9 flex flex-wrap gap-2.5" delay={0.25} playOnMount>
                {["Vitrine", "Evolutif", "Réservation", "E-commerce", "Web APP"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="inline-flex min-h-[38px] items-center gap-2 rounded-full border border-white/13 bg-white/[0.055] px-3.5 py-2 text-[13px] text-white/82 backdrop-blur-[16px] before:h-[7px] before:w-[7px] before:rounded-full before:bg-[var(--accent-3)] before:shadow-[0_0_12px_currentColor] before:content-['']"
                    >
                      {tag}
                    </span>
                  )
                )}
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.2} playOnMount>
              <TiltCard className="relative min-h-[520px] overflow-hidden rounded-[var(--radius-xl)] border border-white/14 bg-[linear-gradient(145deg,rgba(255,255,255,0.11),rgba(255,255,255,0.035))] shadow-[var(--shadow)] max-md:min-h-[390px]">
                <div
                  className="absolute left-[50px] top-[80px] h-[220px] w-[220px] rounded-full opacity-90 max-md:h-[170px] max-md:w-[170px]"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #fff, var(--accent) 28%, rgba(142,216,255,0.05) 70%)",
                    boxShadow: "0 0 80px rgba(142,216,255,0.35)",
                    animation: "float-a 8s ease-in-out infinite",
                  }}
                />
                <div
                  className="absolute bottom-[80px] right-[80px] h-[150px] w-[150px] rounded-full opacity-90 max-md:h-[120px] max-md:w-[120px]"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #fff, var(--accent-2) 28%, rgba(168,137,255,0.05) 72%)",
                    boxShadow: "0 0 80px rgba(168,137,255,0.32)",
                    animation: "float-b 10s ease-in-out infinite",
                  }}
                />
                <div className="absolute bottom-9 left-9 right-9 rounded-[22px] border border-white/13 bg-[rgba(3,7,18,0.68)] p-6 font-mono text-[13px] leading-[1.8] text-white/78 backdrop-blur-[18px] shadow-[0_26px_80px_rgba(0,0,0,0.35)] max-md:bottom-[18px] max-md:left-[18px] max-md:right-[18px] max-md:text-[11px]">
                  <span className="block">
                    <span className="text-[var(--accent)]">moriarty</span> init project-pse
                  </span>
                  <span className="block">→ analyse besoin client</span>
                  <span className="block">→ design + développement</span>
                  <span className="block">→ mise en ligne + maintenance</span>
                  <span className="block text-[var(--accent-3)]">✓ projet structuré, concret, évolutif</span>
                  <span className="block">
                    presentation.ready()
                    <span
                      className="ml-0.5 inline-block h-4 w-2 bg-[var(--accent)] align-[-3px]"
                      style={{ animation: "blink 1s steps(2) infinite" }}
                    />
                  </span>
                </div>
              </TiltCard>
            </RevealOnScroll>
          </div>
        </SlideSection>

        {/* ── CLIENTÈLE ── */}
        <SlideSection ref={setRef(1)} id="clientele" title="Clientèle">
          <RevealOnScroll className={kicker}>01 · La clientèle</RevealOnScroll>
          <RevealOnScroll className={h2Style} splitText>
            Un marché local, réel, et souvent mal accompagné.
          </RevealOnScroll>
          <RevealOnScroll className={leadStyleWide}>
            Moriarty s&apos;adresse aux indépendants, artisans, commerçants et petites entreprises
            qui veulent une présence en ligne professionnelle — sans budget agence ni prise de tête
            technique.
          </RevealOnScroll>

          <div className="mt-[42px] grid gap-[18px] md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Indépendants & freelances",
                p: "Consultants, créatifs, thérapeutes, coachs, photographes : un site qui présente, rassure et convertit dès les premiers contacts.",
              },
              {
                n: "02",
                t: "Artisans & commerces locaux",
                p: "Coiffeur, esthéticienne, restaurant, salon, artisan : visibilité locale, réservation, galerie, avis clients et prise de rendez-vous.",
              },
              {
                n: "03",
                t: "Petites entreprises en croissance",
                p: "Structures qui démarrent ou se structurent : site vitrine évolutif, e-commerce léger, espace admin et outils métier sur mesure.",
              },
            ].map((item, i) => (
              <RevealOnScroll key={item.n} delay={i * 0.08}>
                <TiltCard className={cardBase}>
                  <div className="mb-6 font-mono text-[13px] text-[rgba(142,216,255,0.92)]">{item.n}</div>
                  <h3 className={h3Style}>{item.t}</h3>
                  <p className="mt-3.5 text-[15px] leading-[1.62] text-[var(--muted)]">{item.p}</p>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll className={`${pullQuoteStyle} whitespace-nowrap max-md:whitespace-normal`}>
            Une clientèle locale qui veut un site utile — pas une vitrine figée.
          </RevealOnScroll>
        </SlideSection>

        {/* ── SOLUTION ── */}
        <SlideSection ref={setRef(2)} id="solution" title="Solution">
          <div className="text-right">
            <RevealOnScroll className={kickerRight}>02 · La solution</RevealOnScroll>
            <RevealOnScroll className={`${h2Style} max-w-none`} splitText>
              Bien plus qu&apos;un site : une présence web complète, simple et durable.
            </RevealOnScroll>
          </div>

          <div className="mt-[42px] grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12">
            <div className="min-w-0 text-right">
              <RevealOnScroll className={leadStyleFluid}>
                Moriarty ne se limite pas à créer une vitrine en ligne. L&apos;objectif est de livrer
                un outil professionnel, utile au quotidien, avec tout ce qu&apos;il faut pour être visible,
                rassurer, convertir et évoluer.
              </RevealOnScroll>
              <RevealOnScroll className={leadStyleFluid}>
                Selon les besoins, l&apos;offre peut intégrer le nom de domaine, l&apos;hébergement, les emails
                professionnels, les formulaires, la réservation, le paiement en ligne, les automatisations,
                le référencement local, la maintenance...
              </RevealOnScroll>
              <RevealOnScroll className="mt-6 text-base leading-[1.7] text-[var(--muted)]">
                Un seul interlocuteur pour créer, mettre en ligne, maintenir et faire évoluer la présence web du client.
              </RevealOnScroll>
            </div>

            <RevealOnScroll className="w-full max-w-[400px] justify-self-center lg:w-[400px] lg:shrink-0 lg:justify-self-end">
              <TiltCard className="relative w-full min-h-[360px] overflow-hidden rounded-[var(--radius-lg)] border border-white/13 bg-white/[0.055] shadow-[var(--shadow)]">
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(142,216,255,0.18)]"
                  style={{ animation: "rotate-ring 34s linear infinite" }}
                />
                <div className="flex h-[44px] items-center gap-2 border-b border-white/10 bg-white/[0.035] px-4">
                  {[1, 2, 3].map((d) => (
                    <span key={d} className="h-[9px] w-[9px] rounded-full bg-white/20" />
                  ))}
                </div>
                <div className="grid gap-3 p-5">
                  <div className="h-[96px] rounded-[18px] border border-white/12 bg-[radial-gradient(circle_at_30%_40%,rgba(142,216,255,0.36),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))]" />
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((b) => (
                      <div
                        key={b}
                        className="relative min-h-[88px] overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.055] before:absolute before:left-3.5 before:top-5 before:h-2 before:w-[55%] before:rounded-full before:bg-white/12 before:content-[''] after:absolute after:left-3.5 after:top-9 after:h-2 after:w-[78%] after:rounded-full after:bg-white/12 after:content-['']"
                      />
                    ))}
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>
          </div>
        </SlideSection>

        {/* ── OFFRES ── slide dense 100dvh */}
        <SlideSection
          ref={setRef(3)}
          id="offres"
          title="Offres"
          contentClassName="max-w-[1380px]"
          className="!h-dvh !max-h-dvh !min-h-0 !items-center !overflow-hidden !py-[clamp(32px,4vh,44px)] max-md:!h-auto max-md:!max-h-none max-md:min-h-screen max-md:overflow-visible max-md:!py-[84px_72px]"
        >
          <div className="flex h-full w-full flex-col justify-center gap-3 lg:gap-4">
            {/* En-tête — titre + sous-texte compact */}
            <div>
              <RevealOnScroll className={`${kicker} !mb-2`}>03 · Les offres</RevealOnScroll>
              <RevealOnScroll className={h2Style} splitText>
                5 socles pour cadrer le projet, puis du sur-mesure.
              </RevealOnScroll>
              <RevealOnScroll className={`${leadStyle} !mt-3`}>
                Les formules donnent un point de départ clair. Ensuite, chaque site est adapté à
                l&apos;activité, au budget, aux contenus et aux fonctionnalités utiles au client.
              </RevealOnScroll>
            </div>

            {/* 5 cartes — une ligne desktop, colonne mobile */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5 xl:gap-3">
              {OFFRES_FORMULES.map((item, i) => {
                const isFeatured = "featured" in item;
                const card = (
                  <div
                    className={`${offreCardBase} ${isFeatured ? offreCardFeaturedInner : ""}`}
                  >
                    {/* Numéro + icône */}
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-mono text-[11px] text-[rgba(142,216,255,0.88)]">{item.n}</span>
                      <svg
                        viewBox="0 0 32 32"
                        className="h-7 w-7 text-[var(--accent)] opacity-80"
                        aria-hidden
                      >
                        {item.icon}
                      </svg>
                    </div>

                    <h3 className="text-[clamp(17px,1.5vw,20px)] font-semibold tracking-[-0.03em]">
                      {item.t}
                    </h3>
                    <p className="mt-1.5 flex-1 text-[13px] leading-[1.45] text-white/72">{item.p}</p>

                    {/* Mots-clés — ligne compacte */}
                    <p className="mt-2 border-t border-white/8 pt-2 text-[11px] leading-[1.4] text-[var(--muted)]">
                      {item.keywords.join(" · ")}
                    </p>
                  </div>
                );

                return isFeatured ? (
                  <div key={item.t} className="rainbow-frame h-full xl:-translate-y-1">
                    {card}
                  </div>
                ) : (
                  <RevealOnScroll key={item.t} delay={i * 0.05}>
                    {card}
                  </RevealOnScroll>
                );
              })}
            </div>

            {/* Phrase de clôture */}
            <RevealOnScroll className={`${pullQuoteStyle} !mt-0 whitespace-nowrap max-md:whitespace-normal`}>
              Une formule n&apos;est pas un pack fermé : c&apos;est un socle que l&apos;on adapte.
            </RevealOnScroll>
          </div>
        </SlideSection>

        {/* ── MÉTHODE ── */}
        <SlideSection ref={setRef(4)} id="methode" title="Méthode">
          <div className="text-center">
            <RevealOnScroll className={kickerCenter}>04 · La méthode</RevealOnScroll>
            <RevealOnScroll className={`${h2Style} mx-auto`} splitText>
              Une méthode simple pour le client, solide en arrière-plan.
            </RevealOnScroll>
          </div>

          <RevealOnScroll className="relative mt-[50px] grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <div className="pointer-events-none absolute left-[6%] right-[6%] top-6 hidden h-px bg-gradient-to-r from-transparent via-[rgba(142,216,255,0.55)] to-transparent md:block" />
            {[
              { s: "01", t: "Écouter", p: "Comprendre le besoin réel, la cible, les contraintes et l'objectif du site." },
              { s: "02", t: "Structurer", p: "Définir les pages, les contenus, les fonctionnalités et le parcours utilisateur." },
              { s: "03", t: "Maquetter", p: "Proposer une direction visuelle claire avant le développement complet." },
              { s: "04", t: "Développer", p: "Construire un site responsive, rapide, maintenable et propre techniquement." },
              { s: "05", t: "Mettre en ligne", p: "Domaine, hébergement, sécurité, formulaires, paiements et configuration." },
              { s: "06", t: "Accompagner", p: "Former le client, maintenir, corriger et faire évoluer progressivement." },
            ].map((step) => (
              <div key={step.s} className="relative pt-[58px]">
                <div className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-2xl border border-[rgba(142,216,255,0.26)] bg-[rgba(142,216,255,0.12)] font-mono text-white/92 shadow-[0_0_28px_rgba(142,216,255,0.12)]">
                  {step.s}
                </div>
                <h3 className="title-no-break text-xl font-semibold">{step.t}</h3>
                <p className="mt-2.5 text-sm leading-[1.55] text-[var(--muted)]">{step.p}</p>
              </div>
            ))}
          </RevealOnScroll>
        </SlideSection>

        {/* ── PRODUCTION ── slide pipeline 100dvh */}
        <SlideSection
          ref={setRef(5)}
          id="outils"
          title="Production"
          contentClassName="max-w-[1380px]"
          className="!h-dvh !max-h-dvh !min-h-0 !items-stretch !overflow-hidden !pb-[clamp(36px,4.5vh,48px)] !pt-[clamp(72px,9vh,92px)] max-md:!h-auto max-md:!max-h-none max-md:min-h-screen max-md:overflow-visible max-md:items-center max-md:!pb-[72px] max-md:!pt-[96px]"
        >
          <div className="flex h-full w-full flex-col gap-4 lg:gap-5">
            {/* Corps — pipeline à gauche, texte + outils à droite */}
            <div className="grid min-h-0 flex-1 items-start gap-6 lg:grid-cols-[minmax(0,480px)_1fr] lg:items-center lg:gap-8">
              <RevealOnScroll className="relative order-2 lg:order-1">
                <div
                  className="pointer-events-none absolute bottom-2 right-[15px] top-2 hidden w-px bg-gradient-to-b from-[rgba(142,216,255,0.55)] via-[rgba(142,216,255,0.25)] to-[rgba(168,137,255,0.35)] lg:block"
                  aria-hidden
                />
                <div className="flex flex-col gap-2">
                  {PRODUCTION_PIPELINE.map((step) => (
                    <div key={step.n} className="relative pr-0 lg:pr-8">
                      <div
                        className="absolute right-[15px] top-1/2 hidden h-2 w-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_rgba(142,216,255,0.65)] lg:block"
                        aria-hidden
                      />
                      <div className={pipelineBlockBase}>
                        <div className="mb-2 flex items-center gap-2">
                          <span className="font-mono text-[11px] text-[rgba(142,216,255,0.9)]">{step.n}</span>
                          <span className="h-px flex-1 bg-gradient-to-r from-[rgba(142,216,255,0.35)] to-transparent" />
                        </div>
                        <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-white/92">{step.t}</h3>
                        <p className="mt-1.5 text-[13px] leading-[1.52] text-white/62">{step.p}</p>
                        <p className="mt-2 font-mono text-[11px] text-[var(--muted)]">{step.keywords}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>

              <div className="order-1 flex flex-col justify-center gap-6 lg:order-2">
                <div>
                  <RevealOnScroll className={`${kicker} !mb-3`}>05 · Production</RevealOnScroll>
                  <RevealOnScroll className={h2Style} splitText highlightWords={["IA"]}>
                    Un workflow moderne, assisté par IA.
                  </RevealOnScroll>
                  <RevealOnScroll className="mt-3 text-[clamp(14px,1.35vw,17px)] leading-[1.5] text-[var(--muted)]">
                    Pour produire vite sans sacrifier la qualité, Moriarty s&apos;appuie sur une méthode
                    de développement structurée : composants réutilisables, fichiers d&apos;instructions,
                    assistant IA, versioning, déploiement automatisé et maintenance continue.
                  </RevealOnScroll>
                </div>

                <RevealOnScroll className="flex flex-col gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[rgba(142,216,255,0.75)]">
                    Stack & outils
                  </p>
                  <div className="flex flex-wrap gap-2 lg:gap-2.5">
                    {PRODUCTION_TOOLS.map((tool, i) => (
                      <span
                        key={tool}
                        className="relative inline-flex items-center overflow-hidden rounded-full border border-white/11 bg-white/[0.055] px-3 py-1.5 font-mono text-[11px] text-white/78"
                      >
                        <span
                          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          style={{
                            animation: "tool-sweep 4.5s ease-in-out infinite",
                            animationDelay: `${i * 0.15}s`,
                          }}
                        />
                        {tool}
                      </span>
                    ))}
                  </div>
                </RevealOnScroll>

                <RevealOnScroll className={`${pullQuoteStyle} !mt-0`}>
                  Le gain de temps ne vient pas d&apos;un travail bâclé : il vient d&apos;un processus
                  structuré, réutilisable et contrôlé.
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </SlideSection>

        {/* ── RÉALISATIONS ── */}
        <SlideSection
          ref={setRef(6)}
          id="realisations"
          title="Réalisations"
          className="!h-dvh !max-h-dvh !min-h-0 !items-stretch !overflow-x-hidden !overflow-y-visible !pb-[clamp(32px,4vh,48px)] !pt-[clamp(72px,9vh,92px)] max-md:!h-auto max-md:!max-h-none max-md:min-h-screen max-md:overflow-visible max-md:items-center max-md:!py-[84px_72px]"
        >
          <div className="flex h-full min-h-0 flex-col gap-4">
            <div className="shrink-0">
              <RevealOnScroll className={kicker}>06 · Réalisations</RevealOnScroll>
              <RevealOnScroll className={h2Style} splitText>
                Des projets variés, déjà conçus et mis en ligne.
              </RevealOnScroll>
              <RevealOnScroll className={`${leadStyle} !mt-4`}>
                Ces réalisations ne sont pas théoriques : elles m&apos;ont permis d&apos;éprouver
                la méthode sur le terrain, de tester les outils en conditions réelles et
                d&apos;affiner l&apos;accompagnement au fil des besoins clients.
              </RevealOnScroll>
            </div>

            <RevealOnScroll className="relative flex min-h-0 flex-1 items-center justify-center overflow-visible">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[min(70%,420px)] w-[min(85%,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(142,216,255,0.24),transparent_70%)] blur-3xl"
                aria-hidden
              />
              <MoriartyBullLogo variant="hero" showHotspots />
            </RevealOnScroll>
          </div>
        </SlideSection>

        {/* ── ÉCONOMIE ── */}
        <SlideSection ref={setRef(7)} id="economie" title="Économie">
          <div className="text-right">
            <RevealOnScroll className={kickerRight}>07 · Modèle économique</RevealOnScroll>
            <RevealOnScroll className={`${h2Style} ml-auto max-w-none text-right`} splitText>
              Un modèle basé sur la création et le revenu récurrent.
            </RevealOnScroll>
          </div>

          <div className="mt-[42px] grid gap-[22px] lg:grid-cols-2">
            {[
              { n: "Vente initiale", t: "Création / refonte", p: "Création de site, refonte, mise en place technique, domaine, hébergement, paiement, réservation ou modules spécifiques." },
              { n: "Récurrent", t: "Maintenance / abonnement", p: "Hébergement, suivi technique, mises à jour, assistance, petites évolutions, sécurité et accompagnement du client." },
            ].map((item) => (
              <RevealOnScroll key={item.n}>
                <TiltCard className={cardBase}>
                  <div className="mb-6 font-mono text-[13px] text-[rgba(142,216,255,0.92)]">{item.n}</div>
                  <h3 className={h3Style}>{item.t}</h3>
                  <p className="mt-3.5 text-[15px] leading-[1.62] text-[var(--muted)]">{item.p}</p>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll className="mt-[42px] grid gap-3.5 rounded-[var(--radius-xl)] border border-white/12 bg-white/[0.055] p-[30px] max-md:p-4 lg:grid-cols-5">
            {[
              { t: "Projet initial", d: "Un besoin concret donne lieu à une prestation claire." },
              { t: "Mise en ligne", d: "Le client obtient un outil opérationnel et professionnel." },
              { t: "Abonnement", d: "Maintenance, hébergement et suivi mensuel." },
              { t: "Évolutions", d: "Ajout progressif de modules selon les besoins." },
              { t: "Recommandation", d: "Chaque projet livré devient une référence commerciale." },
            ].map((flow, i) => (
              <div
                key={flow.t}
                className="relative min-h-[130px] rounded-[22px] border border-white/[0.095] bg-white/[0.055] p-[22px] after:absolute after:-right-3.5 after:top-1/2 after:-translate-y-1/2 after:text-[28px] after:text-[rgba(142,216,255,0.88)] after:content-['→'] last:after:content-none max-lg:after:bottom-[-19px] max-lg:after:right-6 max-lg:after:top-auto max-lg:after:translate-y-0 max-lg:after:content-['↓']"
              >
                <strong className="mb-2.5 block text-base">{flow.t}</strong>
                <span className="text-[13px] leading-normal text-[var(--muted)]">{flow.d}</span>
              </div>
            ))}
          </RevealOnScroll>
        </SlideSection>

        {/* ── PSE ── */}
        <SlideSection ref={setRef(8)} id="pse" title="PSE">
          <RevealOnScroll className={kicker}>08 · Utilité de l&apos;aide PSE</RevealOnScroll>
          <RevealOnScroll className={h2Style} splitText>
            Sécuriser le lancement de l&apos;activité.
          </RevealOnScroll>
          <RevealOnScroll className={leadStyle}>
            L&apos;aide à la création permettrait de transformer un projet déjà préparé en activité
            structurée, en réduisant le risque au moment critique du démarrage.
          </RevealOnScroll>

          <div className="mt-[42px] grid items-stretch gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
            {[
              { n: "01", t: "Matériel", p: "Poste de travail fiable, puissant et durable pour développement, graphisme, tests et gestion multi-projets." },
              { n: "02", t: "Logiciels", p: "Outils professionnels, hébergement, domaines, stockage, automatisation, sécurité et production." },
              { n: "03", t: "Communication", p: "Site Moriarty, identité, supports commerciaux, démonstrateurs et prospection ciblée." },
              { n: "04", t: "Trésorerie", p: "Temps nécessaire pour structurer l'offre, démarcher, signer les premiers clients et stabiliser les revenus." },
            ].map((item) => (
              <RevealOnScroll key={item.n} className="h-full">
                <TiltCard className={`${cardBase} flex h-full flex-col`}>
                  <div className="mb-6 font-mono text-[13px] text-[rgba(142,216,255,0.92)]">{item.n}</div>
                  <h3 className={h3Style}>{item.t}</h3>
                  <p className="mt-3.5 flex-1 text-[15px] leading-[1.62] text-[var(--muted)]">{item.p}</p>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>
        </SlideSection>

        {/* ── ACCOMPAGNEMENT ── LHH / reclassement, 100dvh, ton sobre */}
        <SlideSection
          ref={setRef(9)}
          id="accompagnement"
          title="Accompagnement"
          contentClassName="max-w-[1380px]"
          className="!h-dvh !max-h-dvh !min-h-0 !items-stretch !overflow-hidden !pb-[clamp(32px,4vh,48px)] !pt-[clamp(72px,9vh,92px)] max-md:!h-auto max-md:!max-h-none max-md:min-h-screen max-md:overflow-visible max-md:items-center max-md:!py-[84px_72px]"
        >
          <div className="grid h-full min-h-0 items-center gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.75fr)] lg:gap-10">
            {/* Colonne gauche — titre, sous-texte, phrase de clôture */}
            <div className="flex flex-col justify-center pr-0 lg:pr-4">
              <RevealOnScroll className={kicker}>09 · Accompagnement</RevealOnScroll>
              <RevealOnScroll className={`${h2Style} !max-w-none`} splitText>
                Un accompagnement pour structurer et sécuriser le projet.
              </RevealOnScroll>
              <RevealOnScroll className={`${leadStyleFluid} !mt-5`}>
                L&apos;accompagnement LHH m&apos;a permis de prendre du recul sur Moriarty, de
                clarifier mon positionnement, de structurer les étapes de création et de préparer
                le lancement avec une trajectoire plus réaliste et sécurisée.
              </RevealOnScroll>
              <RevealOnScroll className="mt-6 w-full border-l border-white/12 py-1 pl-4 text-[clamp(14px,1.2vw,16px)] leading-[1.55] text-white/52">
                Le projet reste porté techniquement par mes compétences, mais l&apos;accompagnement
                LHH permet de le cadrer, de le challenger et de le rendre plus solide.
              </RevealOnScroll>
            </div>

            {/* Colonne droite — 4 encarts compacts */}
            <div className="grid min-h-0 w-full items-stretch gap-2.5 sm:grid-cols-2 sm:gap-2.5 lg:max-w-[340px] lg:justify-self-end xl:max-w-[360px]">
              {[
                {
                  t: "Recul",
                  p: "Apporter un regard extérieur sur le projet, ses forces, ses limites et les points à consolider avant le lancement.",
                },
                {
                  t: "Cohérence",
                  p: "Relier le projet à mon parcours, à mes compétences déjà mobilisées et à une stratégie de reconversion réaliste.",
                },
                {
                  t: "Structuration",
                  p: "Clarifier l'offre, les cibles, le positionnement et les étapes nécessaires pour passer de l'idée à une activité organisée.",
                },
                {
                  t: "Sécurisation",
                  p: "Identifier les points de vigilance, préparer le prévisionnel, prioriser les démarches et réduire les risques au démarrage.",
                },
              ].map((item) => (
                <RevealOnScroll key={item.t} className="h-full">
                  <TiltCard className="flex h-full flex-col rounded-[14px] border border-white/11 bg-[linear-gradient(155deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-3 backdrop-blur-[16px] sm:p-3.5">
                    <h3 className="text-[clamp(15px,1.25vw,17px)] font-semibold tracking-[-0.03em] text-white/92">
                      {item.t}
                    </h3>
                    <p className="mt-2 flex-1 text-[11.5px] leading-[1.48] text-[var(--muted)] sm:text-[12px]">
                      {item.p}
                    </p>
                  </TiltCard>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </SlideSection>

        {/* ── VISION ── */}
        <SlideSection ref={setRef(10)} id="vision" title="Vision">
          <div className="text-center">
            <RevealOnScroll className={kickerCenter}>10 · Vision</RevealOnScroll>
            <RevealOnScroll className={`${h2Style} mx-auto`} splitText>
              Une montée en charge réaliste.
            </RevealOnScroll>
            <RevealOnScroll className={`${leadStyle} mx-auto text-center`}>
              L&apos;objectif est de construire une activité durable, pas de rechercher une
              rentabilité artificielle immédiate.
            </RevealOnScroll>
          </div>

          <div className="mt-[42px] grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { p: "0 à 6 mois", t: "Lancer", d: "Finaliser l'offre, créer le site Moriarty, préparer les supports, démarrer la prospection et signer les premiers clients." },
              { p: "6 à 12 mois", t: "Structurer", d: "Développer le portefeuille, améliorer les offres, obtenir les premiers abonnements récurrents." },
              { p: "12 à 24 mois", t: "Stabiliser", d: "Multiplier les références, optimiser la méthode et réutiliser des modèles efficaces par secteur." },
              { p: "24 à 36 mois", t: "Développer", d: "Renforcer les revenus récurrents, spécialiser l'offre et élargir les prestations selon la demande." },
            ].map((v) => (
              <RevealOnScroll key={v.p}>
                <TiltCard className="flex min-h-[300px] flex-col justify-between rounded-[var(--radius-lg)] border border-white/12 bg-gradient-to-b from-white/10 to-white/4 p-[26px]">
                  <div>
                    <div className="font-mono text-[13px] text-[var(--accent)]">{v.p}</div>
                    <h3 className="title-no-break mt-[22px] text-2xl font-semibold">{v.t}</h3>
                    <p className="mt-3.5 leading-[1.6] text-[var(--muted)]">{v.d}</p>
                  </div>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>
        </SlideSection>

        {/* ── CONCLUSION ── reconversion préparée, 100dvh, ton sobre */}
        <SlideSection
          ref={setRef(11)}
          id="conclusion"
          title="Conclusion"
          contentClassName="max-w-none"
          className="!h-dvh !max-h-dvh !min-h-0 !items-stretch !overflow-hidden !pb-[clamp(28px,3.5vh,44px)] !pt-[clamp(72px,9vh,92px)] max-md:!h-auto max-md:!max-h-none max-md:min-h-screen max-md:overflow-visible max-md:items-center max-md:!py-[84px_72px]"
        >
          <RevealOnScroll className="flex h-full min-h-0 w-full">
            <TiltCard className="flex h-full w-full max-h-full flex-col rounded-[var(--radius-xl)] border border-white/14 bg-[radial-gradient(circle_at_18%_20%,rgba(142,216,255,0.20),transparent_28%),radial-gradient(circle_at_78%_84%,rgba(168,137,255,0.17),transparent_28%),rgba(255,255,255,0.065)] p-[clamp(24px,3.5vw,52px)] shadow-[var(--shadow)]">
              <div className="flex min-h-0 w-full flex-1 flex-col justify-center">
                <div className={kicker}>Conclusion</div>
                <h2 className={`${h2Style} !max-w-none`}>
                  Une reconversion préparée, pas une simple intention.
                </h2>
                <p className={`${leadStyleFluid} !mt-5`}>
                  Moriarty s&apos;appuie sur des compétences déjà mobilisées, une méthode de
                  travail structurée, des outils modernes et des premiers projets concrets.
                </p>
                <p className={`${leadStyleFluid} !mt-4`}>
                  L&apos;objectif est de transformer cette préparation en activité professionnelle
                  durable, avec une montée en charge progressive, accompagnée et réaliste.
                </p>
                <p className="mt-5 w-full text-[clamp(14px,1.25vw,16px)] leading-[1.55] text-white/52">
                  Le cadre du PSE permet d&apos;aborder cette transition avec méthode, recul et
                  sécurisation.
                </p>
                <p className="mt-5 w-full border-l-2 border-[rgba(142,216,255,0.45)] py-1 pl-4 text-[clamp(16px,1.45vw,20px)] font-medium leading-[1.45] tracking-[-0.02em] text-white/88">
                  Ce dossier ne présente pas seulement une création d&apos;entreprise : il
                  présente une transition professionnelle déjà construite.
                </p>
              </div>

              {/* Pied de slide — signature + retour discret */}
              <div className="mt-6 flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div className="text-[15px] text-white/65">
                  <strong className="text-white/90">Kevin Blart</strong>
                  <br />
                  Projet de création d&apos;entreprise — Moriarty
                </div>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-white/18 bg-white/[0.04] px-4 text-sm font-medium text-white/55 transition hover:border-white/30 hover:bg-white/[0.07] hover:text-white/80"
                >
                  Revenir au début
                </button>
              </div>
            </TiltCard>
          </RevealOnScroll>
        </SlideSection>
      </main>
    );
  }
);

SlideSections.displayName = "SlideSections";

export default SlideSections;
