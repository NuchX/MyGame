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
  const colors =
    baseColors.slice(0, level + 2)

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

  const durations = colors.map(() => {

    const min =
      Math.max(250, 700 - level * 40)

    const max =
      Math.max(600, 1800 - level * 60)

    return (
      min +
      Math.random() * (max - min)
    )
  })

  const shortestIndex =
    durations.indexOf(
      Math.min(...durations)
    )

  function nextColor() {

    if (index >= colors.length) {

      showAnswers(
        colors,
        colors[shortestIndex].name
      )

      return
    }

    const current = colors[index]

    colorBox.style.background =
      current.value

    colorBox.style.boxShadow =
      `0 0 120px ${current.value}`

    setTimeout(() => {

      colorBox.style.background =
        "#111827"

      colorBox.style.boxShadow =
        "none"

      setTimeout(() => {
        index++
        nextColor()
      }, 250)

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
      startGame()
    }
  )
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

      startGame()
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
      startGame()
    }
  )
}