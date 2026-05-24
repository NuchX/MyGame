const baseColors = [
  {
    name: "RED",
    value: "#ff4d4d",
  },

  {
    name: "BLUE",
    value: "#4d8dff",
  },

  {
    name: "GREEN",
    value: "#4dff88",
  },

  {
    name: "PURPLE",
    value: "#bb66ff",
  },

  {
    name: "YELLOW",
    value: "#ffe066",
  },

  {
    name: "PINK",
    value: "#ff66c4",
  },
]

const app =
  document.querySelector<HTMLDivElement>(
    "#app"
  )!

let level = 1


export function startGame() {
    
  let colorCount = 3

    if(level >= 4){

      colorCount = 4
    }

    if(level >= 7){

      colorCount = 5
    }

    if(level >= 10){

      colorCount = 6
    }

    const colors =
      baseColors.slice(
        0,
        colorCount
      )

  app.innerHTML = `
    <div class="game-screen">

      <div class="top-ui">
        LEVEL ${level}
      </div>

      <div
        class="color-box"
        id="color-box"
      ></div>

    </div>
  `

  const colorBox =
    document.querySelector<HTMLDivElement>(
      "#color-box"
    )!

  let index = 0

      let normalTime = 950
      let shortTime = 500

      if(level >= 4){

        normalTime = 850
        shortTime = 420
      }

      if(level >= 7){

        normalTime = 720
        shortTime = 350
      }

      if(level >= 10){

        normalTime = 600
        shortTime = 280
      }

      const durations =
        colors.map(
          () => normalTime
        )

  const shortestIndex =
  Math.floor(
    Math.random() *
    durations.length
  )
  
    durations[shortestIndex] =
      shortTime

  function nextColor() {

    if (index >= colors.length) {

      showAnswers(
        colors,
        colors[shortestIndex].name
      )

      return
    }

    const current = colors[index]
    colorBox.style.opacity = "1"

    colorBox.style.background =
      current.value

    colorBox.style.boxShadow =
      `0 0 120px ${current.value}`

    setTimeout(() => {

      setTimeout(() => {
        colorBox.style.opacity = "0"
        index++
        nextColor()
      }, 600)

    }, durations[index])
  }

  nextColor()
}



function showAnswers(
  colors: any[],
  correctAnswer: string
) {

  app.innerHTML = `
    <div class="result-screen">

      <h2 class="question">
        Which color was fastest?
      </h2>

      <div class="answer-grid">

        ${colors.map(color => `
          <button
            class="answer-btn"
            style="
              background:${color.value}
            "
          >
            ${color.name}
          </button>
        `).join("")}

      </div>

    </div>
  `

  const answerButtons =
    document.querySelectorAll(
      ".answer-btn"
    )

  answerButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const text =
          button.textContent?.trim()

        if (text === correctAnswer) {

          level++

          showLevelClear()

        } else {

          showGameOver(
            correctAnswer
          )
        }
      }
    )
  })
}

function showLevelClear() {

  app.innerHTML = `
    <div class="result-screen">

      <h1 class="clear-text">
        LEVEL CLEAR
      </h1>

      <p class="level-text">
        Welcome to Level ${level}
      </p>

      <button id="next-level">
        NEXT LEVEL
      </button>

    </div>
  `

  const nextButton =
    document.querySelector(
      "#next-level"
    ) as HTMLButtonElement

  nextButton.addEventListener(
    "click",
    () => {
      showLevelCountdown()
    }
  )
}


export function showCountdown() {

  app.innerHTML = `
    <div class="countdown-screen">

      <h1 id="count-text">
        ARE YOU READY?
      </h1>

    </div>
  `

  const countText =
    document.querySelector(
      "#count-text"
    ) as HTMLHeadingElement

  function updateText(
    text: string
  ) {

    countText.style.opacity = "0"

    countText.style.transform =
      "scale(0.7)"

    setTimeout(() => {

      countText.textContent = text

      countText.style.opacity = "1"

      countText.style.transform =
        "scale(1)"

    }, 250)
  }

  setTimeout(() => {

    updateText("3")

  }, 2500)

  setTimeout(() => {

    updateText("2")

  }, 3500)

  setTimeout(() => {

    updateText("1")

  }, 4500)

  setTimeout(() => {

    updateText("LET'S GO!")

  }, 5500)

  setTimeout(() => {

    startGame()

  }, 6800)
}

export function showLevelCountdown() {

  app.innerHTML = `
    <div class="countdown-screen">

      <h1 id="count-text"></h1>

    </div>
  `

  const countText =
    document.querySelector(
      "#count-text"
    ) as HTMLHeadingElement

  function updateText(
    text: string
  ) {

    countText.style.opacity = "0"

    countText.style.transform =
      "scale(0.7)"

    setTimeout(() => {

      countText.textContent = text

      countText.style.opacity = "1"

      countText.style.transform =
        "scale(1)"

    }, 250)
  }

  setTimeout(() => {

    updateText("3")

  }, 500)

  setTimeout(() => {

    updateText("2")

  }, 1500)

  setTimeout(() => {

    updateText("1")

  }, 2500)

  setTimeout(() => {

    startGame()

  }, 3800)
}

function showGameOver(
  answer: string
) {

  app.innerHTML = `
    <div class="result-screen">

      <h1 class="game-over">
        GAME OVER
      </h1>

      <p class="level-text">
        Correct Answer:
        ${answer}
      </p>

      <p class="level-text">
        Reached Level:
        ${level}
      </p>

      <div class="game-over-buttons">

        <button id="restart-btn">
          PLAY AGAIN
        </button>

      </div>

      <button id="menu-btn">
        ⟵
      </button>

    </div>
  `

  const restartButton =
    document.querySelector(
      "#restart-btn"
    ) as HTMLButtonElement

  restartButton.addEventListener(
    "click",
    () => {

      level = 1

      showCountdown()
    }
  )

  const menuButton =
    document.querySelector(
      "#menu-btn"
    ) as HTMLButtonElement

  menuButton.addEventListener(
    "click",
    () => {

      level = 1

      showMainMenu()
    }
  )
}

function showMainMenu() {

  app.innerHTML = `
    <div class="menu-screen">

      <h1 class="title">
        FlashMind
      </h1>

      <p class="subtitle">
        Memorize the Fastest Color
      </p>

      <button id="start-btn">
        START GAME
      </button>

    </div>
  `

  const startButton =
    document.querySelector(
      "#start-btn"
    ) as HTMLButtonElement

  startButton.addEventListener(
    "click",
    () => {
      showCountdown()
    }
  )
}