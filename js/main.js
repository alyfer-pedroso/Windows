initialize = () => {
    const $startup = document.querySelector(".initialize");
    const $audioStartup = document.querySelector(".initialize_audio");

    setTimeout(() => {
        $audioStartup.autoplay = 1;
        $audioStartup.play();
        $audioStartup.load();
        $startup.style.opacity = "0";
        setTimeout(() => {
            $startup.style.display = "none";
        }, 1000);
    }, 3050);
};
// initialize();

handleApplication = (appID) => {
    const app = document.querySelector(appID);
    const closeBtn = document.querySelectorAll(".closeBtn");

    app.style.setProperty("display", "block");

    var close = () => {
        app.style.setProperty("display", "none");
        setTimeout(() => {
            closeBtn.forEach((me, i) => {
                closeBtn[i].removeEventListener("click", close);
            });
        }, 50);
    };
    closeBtn.forEach((me, i) => {
        closeBtn[i].addEventListener("click", close);
    });

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
            down: "touchstart",
            up: "touchend",
            move: "touchmove",
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

taskbarMenu = () => {
    const homeBtn = document.querySelector("#homeBtn");
    const closeHome = document.querySelectorAll(".closeHome");
    const taskbar_homeMenu = document.querySelector(".taskbar__homeMenu");

    var open = () => {
        taskbar_homeMenu.style.height = "39rem";
        homeBtn.removeEventListener("click", open);
        closeHome.forEach((me, i) => {
            closeHome[i].addEventListener("click", close);
        });
    };
    var close = () => {
        taskbar_homeMenu.style.height = "0";
        closeHome.forEach((me, i) => {
            closeHome[i].removeEventListener("click", close);
        });
        homeBtn.addEventListener("click", open);
    };

    homeBtn.addEventListener("click", open);
};
taskbarMenu();
