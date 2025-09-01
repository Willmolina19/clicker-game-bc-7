document.addEventListener("DOMContentLoaded", function () {
  const dificultySelect = document.querySelector("#dificultySelect");
  const setGameTimeout = document.querySelector("#setGameTimeout");
  const timeLeftDisplay = document.querySelector("#timeLeft");
  const clickTarget = document.querySelector("#clickTarget");
  const themeButton = document.querySelector("#changeTheme");
  const mensajeDisplay = document.querySelector("#mensaje");
  const timeoutInput = document.querySelector("#timeout");
  const startGame = document.querySelector("#startGame");
  const scoreDisplay = document.querySelector("#score");
  const gameArea = document.querySelector("#gameArea");

  let refreshIntervalId = null;
  let timeLeft = 30;
  let score = 0;

  setGameTimeout.addEventListener("click", setGameValueTimeout);

  themeButton.addEventListener("click", function () {
    const body = document.querySelector("body");

    if (body.style.color == "white") {
      body.style.color = "black";
      body.style.backgroundColor = "white";
    } else {
      body.style.color = "white";
      body.style.backgroundColor = "black";
    }
  });

  startGame.addEventListener("click", function () {
    mensajeDisplay.textContent = "";
    setGameTimeout.disabled = true;
    timeoutInput.disabled = true;
    startGame.disabled = true;
    moveTarget();

    refreshIntervalId = setInterval(() => {
      updateTimer(
        (count) => {
          timeLeft = count;
          timeLeftDisplay.textContent = timeLeft;
        },
        () => {
          refreshIntervalId = null;
          setGameValueTimeout();
        }
      );
    }, 1000);
  });

  clickTarget.addEventListener("click", function () {
    if (refreshIntervalId != null) {
      score++;
      scoreDisplay.textContent = score;
      moveTarget();
    }
  });

  clickTarget.addEventListener("mouseover", function () {
    if (refreshIntervalId != null && dificultySelect.value == "imposible") {
      let prob = Math.random();
      if (prob > 0.1) {
        moveTarget();
      }
    }
  });

  function setGameValueTimeout() {
    let timeout = timeoutInput.value;
    if (timeout) {
      timeLeft = parseInt(timeout);
      timeLeftDisplay.textContent = timeout;
    }
  }

  function updateTimer(cadaSegundoCallback, seAcaboElTiempo) {
    if (timeLeft > 0) {
      cadaSegundoCallback(--timeLeft);
      if (dificultySelect.value != "normal") {
        moveTarget();
      }
    } else {
      //Temporizador llego a cero
      if (refreshIntervalId != null) {
        clearInterval(refreshIntervalId);
        cadaSegundoCallback(0);
        seAcaboElTiempo();
      }

      setGameTimeout.disabled = false;
      timeoutInput.disabled = false;
      startGame.disabled = false;

      let mensaje = `Tiempo agotado! Tu puntuación final es: ${score}`;
      alert(mensaje);
      score = 0;

      mensajeDisplay.textContent = mensaje;
      scoreDisplay.textContent = score;
    }
  }

  function moveTarget() {
    const maxX = gameArea.clientWidth - clickTarget.clientWidth;
    const maxY = gameArea.clientHeight - clickTarget.clientHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    clickTarget.style.left = `${randomX}px`;
    clickTarget.style.top = `${randomY}px`;
  }
});
