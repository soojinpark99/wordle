let attempts = 0;
let index = 0;
let timer;

function appStart() {
  function handleKeyDown(event) {
    // 이벤트는 암묵적으로 변수에 들어감

    function nextLine() {
      if (attempts === 6) return gameover();

      attempts += 1;
      index = 0;
    }

    function gameover() {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(timer);
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
      // await: 서버에서 오는 응답을 기다림
      // fetch: 자바스크립트에서 서버로 요청을 보내는 함수
      const 정답_객체 = await 응답.json();
      // json: 자바스크립트에 맞는 포맷으로 바꿔줌
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
        }

        block.style.color = "white";
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
      thisBlock.innerText = key;
      // 조건을 만족하는 이벤트 발생 시 블록에 알파벳 입력
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

  // function handleKeyClick() {
  //   const thisBlock = document.querySelector(
  //     `.board-block[data-index='${attempts}${index}']`
  //   );
  //   const keyname = document.querySelector(
  //     ".keyboard-block[].getAttribute('data-key')"
  //   )
  // }

  startTimer();
  window.addEventListener("keydown", handleKeyDown);
  // 키보드 키가 눌렸을 때 함수 실행

  const allKey = document.querySelector(".keyboard-bolck");
}

appStart();
