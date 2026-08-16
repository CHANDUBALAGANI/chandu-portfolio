/* =========================================================
   CHANDU BALAGANI
   MULTIVERSE ENTRY
   INTERACTIVE JAVASCRIPT
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           ELEMENTS
        ================================================== */

        const button =
            document.getElementById(
                "enter-button"
            );


        const transition =
            document.getElementById(
                "transition"
            );


        const cursorGlow =
            document.getElementById(
                "cursor-glow"
            );


        const universe =
            document.querySelector(
                ".universe"
            );


        const starsBack =
            document.querySelector(
                ".stars"
            );


        const starsMiddle =
            document.querySelector(
                ".stars-two"
            );


        const starsFront =
            document.querySelector(
                ".stars-three"
            );


        const particles =
            document.querySelectorAll(
                ".particle"
            );


        let isLeaving = false;



        /* =================================================
           ENTER PORTFOLIO
        ================================================== */

        if (button) {

            button.addEventListener(
                "click",
                () => {


                    if (isLeaving) {
                        return;
                    }


                    isLeaving = true;


                    button.style.pointerEvents =
                        "none";


                    if (transition) {

                        transition.classList.add(
                            "active"
                        );

                    }


                    setTimeout(
                        () => {

                            window.location.href =
                                "index.html";

                        },
                        850
                    );

                }
            );

        }



        /* =================================================
           ENTER KEY
        ================================================== */

        document.addEventListener(
            "keydown",
            (event) => {


                if (
                    event.key === "Enter" &&
                    !isLeaving
                ) {

                    if (button) {

                        button.click();

                    }

                }

            }
        );



        /* =================================================
           MOUSE SUPPORT
        ================================================== */

        const supportsMouse =
            window.matchMedia(
                "(hover: hover) and (pointer: fine)"
            ).matches;


        if (!supportsMouse) {

            return;

        }



        /* =================================================
           MOUSE POSITION
        ================================================== */

        let mouseX = 0;

        let mouseY = 0;

        let smoothX = 0;

        let smoothY = 0;


        document.addEventListener(
            "mousemove",
            (event) => {


                mouseX =
                    (
                        event.clientX /
                        window.innerWidth
                    ) - 0.5;


                mouseY =
                    (
                        event.clientY /
                        window.innerHeight
                    ) - 0.5;



                /* -----------------------------------------
                   CURSOR GLOW
                ------------------------------------------ */

                if (cursorGlow) {

                    cursorGlow.style.opacity =
                        "1";

                    cursorGlow.style.left =
                        `${event.clientX}px`;

                    cursorGlow.style.top =
                        `${event.clientY}px`;

                }

            }
        );



        /* =================================================
           MOUSE LEAVE
        ================================================== */

        document.addEventListener(
            "mouseleave",
            () => {


                if (cursorGlow) {

                    cursorGlow.style.opacity =
                        "0";

                }

            }
        );



        /* =================================================
           SMOOTH SCENE ANIMATION
        ================================================== */

        function animateScene() {


            smoothX +=
                (
                    mouseX -
                    smoothX
                ) * 0.035;


            smoothY +=
                (
                    mouseY -
                    smoothY
                ) * 0.035;



            /* =============================================
               BACKGROUND STARS
            ============================================== */

            if (starsBack) {

                starsBack.style.marginLeft =
                    `${smoothX * 10}px`;

                starsBack.style.marginTop =
                    `${smoothY * 7}px`;

            }



            /* =============================================
               SECOND STAR LAYER
            ============================================== */

            if (starsMiddle) {

                starsMiddle.style.marginLeft =
                    `${smoothX * 20}px`;

                starsMiddle.style.marginTop =
                    `${smoothY * 13}px`;

            }



            /* =============================================
               FRONT STAR LAYER
            ============================================== */

            if (starsFront) {

                starsFront.style.marginLeft =
                    `${smoothX * 34}px`;

                starsFront.style.marginTop =
                    `${smoothY * 22}px`;

            }



            /* =============================================
               UNIVERSE MOVEMENT
            ============================================== */

            if (universe) {

                const rotateX =
                    smoothY * -2.5;


                const rotateY =
                    smoothX * 2.5;


                universe.style.transform =
                    `
                    translate(-50%, -50%)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    `;

            }



            /* =============================================
               PARTICLES
            ============================================== */

            particles.forEach(
                (particle, index) => {


                    const strength =
                        5 +
                        (index * 1.5);


                    const x =
                        smoothX *
                        strength;


                    const y =
                        smoothY *
                        strength;


                    particle.style.marginLeft =
                        `${x}px`;


                    particle.style.marginTop =
                        `${y}px`;

                }
            );



            requestAnimationFrame(
                animateScene
            );

        }


        animateScene();



        /* =================================================
           BUTTON MAGNETIC EFFECT
        ================================================== */

        if (button) {


            button.addEventListener(
                "mousemove",
                (event) => {


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


                    const moveX =
                        x * 0.06;


                    const moveY =
                        y * 0.06;


                    button.style.transform =
                        `
                        translate(
                            ${moveX}px,
                            ${moveY}px
                        )
                        scale(1.02)
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

        }



        /* =================================================
           SUBTLE STAR TWINKLE
        ================================================== */

        const starLayers = [
            starsBack,
            starsMiddle,
            starsFront
        ];


        function twinkle() {


            const availableLayers =
                starLayers.filter(
                    layer => layer
                );


            if (
                availableLayers.length === 0
            ) {

                return;

            }


            const layer =
                availableLayers[
                    Math.floor(
                        Math.random() *
                        availableLayers.length
                    )
                ];


            const originalOpacity =
                parseFloat(
                    getComputedStyle(
                        layer
                    ).opacity
                );


            layer.style.transition =
                "opacity 1.4s ease";


            layer.style.opacity =
                Math.min(
                    originalOpacity + 0.10,
                    0.42
                );


            setTimeout(
                () => {

                    layer.style.opacity =
                        originalOpacity;

                },
                1400
            );

        }


        setInterval(
            twinkle,
            3500
        );



        /* =================================================
           CURSOR + BUTTON GLOW
        ================================================== */

        if (
            button &&
            cursorGlow
        ) {


            button.addEventListener(
                "mouseenter",
                () => {


                    cursorGlow.style.width =
                        "300px";


                    cursorGlow.style.height =
                        "300px";

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {


                    cursorGlow.style.width =
                        "240px";


                    cursorGlow.style.height =
                        "240px";

                }
            );

        }


    }
);