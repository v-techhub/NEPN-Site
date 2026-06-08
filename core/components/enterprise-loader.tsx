"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/loader.module.css";

// Total visible duration before unmount — must be >= last band's exit completion
const DONE_MS = 3200;
// When the staggered wipe sequence begins
const WIPE_MS = 1400;

export default function EnterpriseLoader() {
  const [phase, setPhase] = useState<"enter" | "wipe" | "done">("enter");

  useEffect(() => {
    const wipeTimer = window.setTimeout(() => setPhase("wipe"), WIPE_MS);
    const doneTimer = window.setTimeout(() => setPhase("done"), DONE_MS);
    return () => {
      window.clearTimeout(wipeTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  const wiping = phase === "wipe";

  return (
    <div
      className={styles.root}
      role="status"
      aria-live="polite"
      aria-label="Loading Network E&P Nigeria Limited"
    >
      {/*
        ── Full-screen staggered bands ──
        Each band covers the entire viewport and wipes upward with an
        increasing delay. The main panel (charcoal, z highest) exits first,
        then each color band peels off in sequence — primary green → dark
        green → secondary green → footer green → corporate red — revealing
        the page beneath as the last band clears.
      */}

      {/* Band 5 — corporate red, exits last */}
      <div className={`${styles.band} ${styles.band5} ${wiping ? styles.band5Wipe : ""}`} />

      {/* Band 4 — footer highlight green */}
      <div className={`${styles.band} ${styles.band4} ${wiping ? styles.band4Wipe : ""}`} />

      {/* Band 3 — secondary green */}
      <div className={`${styles.band} ${styles.band3} ${wiping ? styles.band3Wipe : ""}`} />

      {/* Band 2 — dark green */}
      <div className={`${styles.band} ${styles.band2} ${wiping ? styles.band2Wipe : ""}`} />

      {/* Band 1 — primary green, exits second (just after main panel) */}
      <div className={`${styles.band} ${styles.band1} ${wiping ? styles.band1Wipe : ""}`} />

      {/* ── Main panel — charcoal, exits first, content lives here ── */}
      <div className={`${styles.panel} ${wiping ? styles.panelWipe : ""}`}>
        <div className={`${styles.content} ${wiping ? styles.contentOut : ""}`}>

          {/* Logo mark */}
          <div className={styles.logoWrap}>
            <div className={styles.ringOuter} />
            <div className={styles.ring} />
            <Image
              src="/logo-brand.png"
              alt="Network E&P Nigeria Limited"
              width={56}
              height={56}
              priority
              className={styles.logoImage}
            />
          </div>

          {/* Wordmark */}
          <div className={styles.wordmark}>
            <span className={styles.wordmarkPrimary}>NEPN</span>
            <div className={styles.wordmarkDivider} />
            <span className={styles.wordmarkSecondary}>Network E&amp;P Nigeria</span>
          </div>

          {/* Tagline */}
          <p className={styles.tagline}>Powering global energy systems</p>

          {/* Precision load bar */}
          <div className={styles.barTrack}>
            <div className={styles.barFill} />
          </div>
        </div>
      </div>
    </div>
  );
}