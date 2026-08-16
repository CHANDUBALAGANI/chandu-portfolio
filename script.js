"use strict";

/* =========================================================
   CHANDU BALAGANI PORTFOLIO
   DARK HOME / LIGHT PROJECT / DARK CONTACT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const navbar =
    document.getElementById("navbar");

const pageLoader =
    document.getElementById("page-loader");

const heroSection =
    document.querySelector(".hero-section");

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("section[id]");

const revealElements =
    document.querySelectorAll(".reveal");

const skillCards =
    document.querySelectorAll(".skill-card");

const buttons =
    document.querySelectorAll(".button");

const developerVisual =
    document.querySelector(".developer-visual");

const visualTags =
    document.querySelectorAll(".visual-tag");

const macStage =
    document.querySelector(".mac-stage");

const macbook =
    document.querySelector(".macbook");

const iphoneStage =
    document.querySelector(".iphone-stage");

const iphone =
    document.querySelector(".iphone");

const heroScroll =
    document.querySelector(".hero-scroll");

const statementContainer =
    document.querySelector(".statement-container");

const macFloats =
    document.querySelectorAll(".mac-float");


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    if (!pageLoader) {
        return;
    }

    setTimeout(() => {

        pageLoader.classList.add("hide");

    }, 800);

});


/* =========================================================
   HOME-ONLY NAVBAR
========================================================= */

function updateNavbar() {

    if (!navbar || !heroSection) {
        return;
    }

    const heroRect =
        heroSection.getBoundingClientRect();

    /*
        Navbar appears only when the Home
        hero section is still visible.
    */

    if (heroRect.bottom > 80) {

        navbar.classList.add("visible");

    } else {

        navbar.classList.remove("visible");

    }

}


updateNavbar();


window.addEventListener(
    "scroll",
    updateNavbar,
    {
        passive: true
    }
);


window.addEventListener(
    "resize",
    updateNavbar
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

if (revealElements.length) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "show"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },

            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const rect =
            section.getBoundingClientRect();

        const trigger =
            window.innerHeight * 0.35;

        if (
            rect.top <= trigger &&
            rect.bottom > trigger
        ) {

            currentSection =
                section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (
            target ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


updateActiveNavigation();


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

navLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const target =
                link.getAttribute("href");

            if (
                !target ||
                !target.startsWith("#")
            ) {
                return;
            }

            const targetElement =
                document.querySelector(target);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            const position =
                targetElement
                    .getBoundingClientRect()
                    .top +
                window.scrollY -
                20;

            window.scrollTo({

                top: position,

                behavior: "smooth"

            });

        }
    );

});


/* =========================================================
   HERO SCROLL
========================================================= */

if (heroScroll) {

    heroScroll.style.cursor =
        "pointer";

    heroScroll.addEventListener(
        "click",
        () => {

            const about =
                document.getElementById("about");

            if (!about) {
                return;
            }

            about.scrollIntoView({

                behavior:
                    "smooth"

            });

        }
    );

}


/* =========================================================
   DESKTOP POINTER CHECK
========================================================= */

const finePointer =
    window.matchMedia(
        "(pointer: fine)"
    );


/* =========================================================
   HERO 3D PARALLAX
========================================================= */

if (
    finePointer.matches &&
    developerVisual
) {

    let mouseX = 0;

    let mouseY = 0;

    let currentX = 0;

    let currentY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX /
                window.innerWidth -
                0.5;

            mouseY =
                event.clientY /
                window.innerHeight -
                0.5;

        },
        {
            passive: true
        }
    );


    function animateHero() {

        currentX +=
            (mouseX - currentX) *
            0.035;

        currentY +=
            (mouseY - currentY) *
            0.035;


        developerVisual.style.transform =
            `
            rotateY(${currentX * -7}deg)
            rotateX(${currentY * 5}deg)
            translate3d(
                ${currentX * 4}px,
                ${currentY * 4}px,
                0
            )
            `;


        visualTags.forEach(
            (tag, index) => {

                const strength =
                    7 + index * 4;

                tag.style.transform =
                    `
                    translate3d(
                        ${currentX * strength}px,
                        ${currentY * strength}px,
                        0
                    )
                    `;

            }
        );


        requestAnimationFrame(
            animateHero
        );

    }


    animateHero();

}


/* =========================================================
   SKILL CARD 3D TILT
========================================================= */

if (finePointer.matches) {

    skillCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (centerY - y) / 55;

                const rotateY =
                    (x - centerX) / 55;

                card.style.transform =
                    `
                    translateY(-10px)
                    scale(1.015)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   MOBILE SKILL TOUCH
========================================================= */

skillCards.forEach(card => {

    card.addEventListener(
        "touchstart",
        () => {

            card.style.transform =
                "scale(.985)";

        },
        {
            passive: true
        }
    );


    card.addEventListener(
        "touchend",
        () => {

            setTimeout(() => {

                card.style.transform =
                    "";

            }, 180);

        },
        {
            passive: true
        }
    );

});


/* =========================================================
   MACBOOK SCROLL ANIMATION
========================================================= */

function updateMacbook() {

    if (!macStage || !macbook) {
        return;
    }


    if (window.innerWidth <= 700) {

        macbook.style.transform =
            "";

        return;

    }


    const rect =
        macStage.getBoundingClientRect();

    const viewport =
        window.innerHeight;

    const progress =
        (
            viewport - rect.top
        ) /
        (
            viewport + rect.height
        );

    const value =
        Math.max(
            0,
            Math.min(
                1,
                progress
            )
        );

    const rotation =
        7 - value * 7;

    const movement =
        28 - value * 28;


    macbook.style.transform =
        `
        rotateX(${rotation}deg)
        translateY(${movement}px)
        `;

}


updateMacbook();


window.addEventListener(
    "scroll",
    updateMacbook,
    {
        passive: true
    }
);


/* =========================================================
   IPHONE SCROLL ANIMATION
========================================================= */

function updateIphone() {

    if (!iphoneStage || !iphone) {
        return;
    }


    if (window.innerWidth <= 700) {

        iphone.style.transform =
            "";

        return;

    }


    const rect =
        iphoneStage.getBoundingClientRect();

    const viewport =
        window.innerHeight;

    const progress =
        (
            viewport - rect.top
        ) /
        (
            viewport + rect.height
        );

    const value =
        Math.max(
            0,
            Math.min(
                1,
                progress
            )
        );

    const rotation =
        8 - value * 8;

    const movement =
        30 - value * 30;


    iphone.style.transform =
        `
        rotate(${rotation}deg)
        translateY(${movement}px)
        `;

}


updateIphone();


window.addEventListener(
    "scroll",
    updateIphone,
    {
        passive: true
    }
);


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

if (finePointer.matches) {

    buttons.forEach(button => {

        button.addEventListener(
            "mousemove",
            event => {

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `
                    translate(
                        ${x * 0.025}px,
                        ${y * 0.025}px
                    )
                    `;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );


        button.addEventListener(
            "mousedown",
            () => {

                button.style.transform =
                    "scale(.96)";

            }
        );


        button.addEventListener(
            "mouseup",
            () => {

                button.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   MAC FLOATING LABELS
========================================================= */

if (
    finePointer.matches &&
    macFloats.length
) {

    let pointerX = 0;

    let pointerY = 0;

    let currentX = 0;

    let currentY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            pointerX =
                event.clientX /
                window.innerWidth -
                0.5;

            pointerY =
                event.clientY /
                window.innerHeight -
                0.5;

        },
        {
            passive: true
        }
    );


    function animateMacLabels() {

        currentX +=
            (pointerX - currentX) *
            0.04;

        currentY +=
            (pointerY - currentY) *
            0.04;


        macFloats.forEach(
            (item, index) => {

                const strength =
                    7 + index * 4;

                item.style.translate =
                    `
                    ${currentX * strength}px
                    ${currentY * strength}px
                    `;

            }
        );


        requestAnimationFrame(
            animateMacLabels
        );

    }


    animateMacLabels();

}


/* =========================================================
   STATEMENT PARALLAX
========================================================= */

if (
    finePointer.matches &&
    statementContainer
) {

    let ticking = false;


    function updateStatement() {

        const rect =
            statementContainer
                .getBoundingClientRect();

        const viewport =
            window.innerHeight;


        if (
            rect.bottom < 0 ||
            rect.top > viewport
        ) {

            ticking = false;

            return;

        }


        const center =
            viewport / 2;

        const elementCenter =
            rect.top +
            rect.height / 2;

        const distance =
            elementCenter -
            center;

        const movement =
            distance * -0.015;


        statementContainer.style.transform =
            `
            translateY(${movement}px)
            `;


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                requestAnimationFrame(
                    updateStatement
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   REDUCED MOTION
========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (reducedMotion.matches) {

    document.documentElement.classList.add(
        "reduced-motion"
    );

}


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            document.body.classList.add(
                "page-paused"
            );

        } else {

            document.body.classList.remove(
                "page-paused"
            );

        }

    }
);


/* =========================================================
   RESIZE
========================================================= */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                () => {

                    updateNavbar();

                    updateActiveNavigation();

                    updateMacbook();

                    updateIphone();

                },
                150
            );

    }
);


/* =========================================================
   READY
========================================================= */

console.log(
    "Chandu Balagani Portfolio — Dark / Light Edition"
);



/* =========================================================
   SKILL CARD MOUSE LIGHT
========================================================= */

if (finePointer.matches) {

    skillCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const xPercent =
                    (x / rect.width) * 100;

                const yPercent =
                    (y / rect.height) * 100;

                card.style.setProperty(
                    "--mouse-x",
                    `${xPercent}%`
                );

                card.style.setProperty(
                    "--mouse-y",
                    `${yPercent}%`
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.setProperty(
                    "--mouse-x",
                    "50%"
                );

                card.style.setProperty(
                    "--mouse-y",
                    "50%"
                );

            }
        );

    });

}