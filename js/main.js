initialize = () => {
    const $startup = document.querySelector(".initialize");
    let audioStartup = new Audio("audio/Windows10Startupsound.mp3");

    setTimeout(() => {
        $startup.style.opacity = "0";
        setTimeout(() => {
            $startup.style.display = "none";
        }, 1000);
        audioStartup.play();
    }, 3050);
};
initialize();

handleApplication = (appID) => {
    const app = document.querySelector(appID);
    const closeBtn = document.querySelector(".closeBtn");

    app.style.setProperty("display", "block");

    var close = () => {
        closeBtn.parentElement.parentElement.style.setProperty("display", "none");
        setTimeout(() => {
            closeBtn.removeEventListener("click", close);
        }, 50);
    };
    closeBtn.addEventListener("click", close);

    var addX = 450;
    var addY = 100;

    translateYX = (e) => {
        //Verificar se a posição do mouse é maior que a anterior
        if (e.clientX > translateYX.previousX) {
            addX += 3;
            app.style.setProperty("left", `${addX}px`);
        } else if (e.clientX < translateYX.previousX) {
            addX -= 3;
            app.style.setProperty("left", `${addX}px`);
        }

        //Verificar se a posição do mouse é maior que a anterior
        if (e.clientY > translateYX.previousY) {
            addY += 2;
            app.style.setProperty("top", `${addY}px`);
        } else if (e.clientY < translateYX.previousY) {
            addY -= 2;
            app.style.setProperty("top", `${addY}px`);
        }

        //Atualiza a posição anterior do mouse para a proxima comparação
        translateYX.previousX = e.clientX;
        translateYX.previousY = e.clientY;
    };

    var intervalo;
    var segurandoClickMouse = false;
    var qualTipoDispositivo = "";

    var evento = {
        mouse: {
            down: "mousedown",
            up: "mouseup",
            move: "mousemove",
        },
        touch: {
            down: "pointerdown",
            up: "pointerup",
            move: "pointermove",
        },
    };

    const dispositivoTouch = () => {
        try {
            document.createEvent("TouchEvent"); //se criar um evento de touch
            qualTipoDispositivo = "touch"; //recebendo dispositivo tipo touch
            // return true;
        } catch (e) {
            //se não criar um evento de touch
            qualTipoDispositivo = "mouse"; //recebendo dispositivo tipo mouse
            // return false;
        }
    };
    dispositivoTouch();

    app.addEventListener(evento[qualTipoDispositivo].down, (e) => {
        segurandoClickMouse = true;
        intervalo = setTimeout(() => {
            if (segurandoClickMouse) {
                app.addEventListener(evento[qualTipoDispositivo].move, translateYX);
            }
        }, 100);
    });

    app.addEventListener(evento[qualTipoDispositivo].up, () => {
        clearTimeout(intervalo);
        app.removeEventListener(evento[qualTipoDispositivo].move, translateYX);
        segurandoClickMouse = false;
        translateYX.previousX = 0;
    });
};
