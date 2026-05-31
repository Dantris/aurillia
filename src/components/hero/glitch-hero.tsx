import GlitchText from "./glitch-text";
import styles from "./glitch-hero.module.css";
import type { Locale } from "@/lib/i18n";

const COPY: Record<Locale, { subtitle: string }> = {
  de: {
    subtitle: "Webentwicklung",
  },
  en: {
    subtitle: "Web Development",
  },
};

export default function GlitchHero({ locale = "de" }: { locale?: Locale }) {
  const copy = COPY[locale];

  return (
    <main className={styles.page}>
      <div className={styles.scanlines} />

      <div className={`${styles.corner} ${styles.cornerTl}`} />
      <div className={`${styles.corner} ${styles.cornerTr}`} />
      <div className={`${styles.corner} ${styles.cornerBl}`} />
      <div className={`${styles.corner} ${styles.cornerBr}`} />

      <div
        className={`${styles.glitchWrap} ${styles.mainTitle}`}
        data-text="AURILLIA"
      >
        <GlitchText text="AURILLIA" delay={200} />
      </div>

      <div className={styles.divider}>
        <div className={styles.dividerLine} />
        <span className={styles.dividerDot}>◆</span>
        <div className={styles.dividerLine} />
      </div>

      <div className={styles.subTitle}>
        <GlitchText text={copy.subtitle} delay={600} />
      </div>
    </main>
  );
}
