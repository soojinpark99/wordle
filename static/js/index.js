let attempts = 0;
let index = 0;
let timer;

function appStart() {
  function handleKeyDown(event) {
    function nextLine() {
      if (attempts === 6) return gameover();

      attempts += 1;
      index = 0;
    }

    function gameover() {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(timer);

      const gameoverBox = document.querySelector(".gameover-box");
      gameoverBox.style.display = "flex";
    }

    function handleBackspace() {
      if (index > 0) {
        const preBlock = document.querySelector(
          `.board-block[data-index='${attempts}${index - 1}']`
        );
        preBlock.innerText = "";
      }
      if (index !== 0) index -= 1;
    }

    const handleEnterKey = async () => {
      let 맞은_개수 = 0;

      // --- 서버에서 정답을 받아오는 코드 ---
      const 응답 = await fetch("/answer");
      const 정답_객체 = await 응답.json();
      const 정답 = 정답_객체.answer;

      for (let i = 0; i < 5; i++) {
        const block = document.querySelector(
          `.board-block[data-index='${attempts}${i}']`
        );
        const 입력한_글자 = block.innerText;
        const 정답_글자 = 정답[i];

        const keyBlock = document.querySelector(
          `.keyboard-block[data-key='${입력한_글자}']`
        );

        if (입력한_글자 === 정답_글자) 맞은_개수 += 1;

        if (입력한_글자 === 정답_글자) {
          block.style.background = "#6aaa64";
          keyBlock.style.background = "#6aaa64";
        } else if (정답.includes(입력한_글자)) {
          block.style.background = "#c9b458";
          keyBlock.style.background = "#c9b458";
        } else {
          block.style.background = "#787c7e";
          keyBlock.style.background = "#787c7e";
        }

        block.style.color = "white";
        block.style.borderColor = "transparent";
        keyBlock.style.color = "white";
      }

      if (맞은_개수 === 5) gameover();
      else nextLine();
    };

    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") {
      handleBackspace();
    } else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.style.borderColor = "#909395";
      thisBlock.innerText = key;
      index += 1;
    }
  }

  function startTimer() {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeH1 = document.querySelector(".time");
      timeH1.innerText = `${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
  }

  startTimer();
  window.addEventListener("keydown", handleKeyDown);

  // const keyBlock = document.querySelectorAll(".keyboard-block");
  // keyBlock.addEventListener("click", handleKeyClick);
}

appStart();
