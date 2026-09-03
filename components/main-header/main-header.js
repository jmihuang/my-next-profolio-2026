"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import styles from "./main-header.module.css";

import logoImg from "@/app/assets/image/logo.png";

const MOBILE_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

const MainHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  /* close menu after route change */

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* lock body */

  useEffect(() => {
    if (!menuOpen) return;

    const prev = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  /* scroll state */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={`${styles.root} ${scrolled ? styles.rootScrolled : ""}`}>
      <nav className={styles.bar}>
        {/* logo */}

        <Link href="/" className={styles.logo}>
          <Image
            src={logoImg}
            alt="Jamie Studio"
            width={320}
            height={72}
            priority
          />
        </Link>

        {/* desktop nav */}

        <ul className={styles.desktopNav}>
          {MOBILE_LINKS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={active ? styles.desktopNavActive : ""}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* burger */}

        <button
          type="button"
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
          aria-label={menuOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className={styles.burgerLines}>
            <span />
            <span />
          </span>
        </button>
      </nav>

      {/* mobile menu */}

      <div
        id="mobile-navigation"
        className={`${styles.mobilePanel} ${
          menuOpen ? styles.mobilePanelOpen : ""
        }`}
      >
        <ul className={styles.mobileList}>
          {MOBILE_LINKS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li
                key={item.href}
                className={active ? styles.mobileItemActive : undefined}
              >
                <Link href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default MainHeader;
