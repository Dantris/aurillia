import { Share_Tech_Mono } from "next/font/google";
import GlitchText from "./glitch-text";
import styles from "./glitch-hero.module.css";

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
});

export default function GlitchHero() {
  return (
    <main className={`${styles.page} ${shareTechMono.className}`}>
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
        <GlitchText text="Web Development" delay={600} />
      </div>

      <p className={styles.tagline}>Scroll down for more</p>
    </main>
  );
}