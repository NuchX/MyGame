import "./style.css"

import { startGame } from "./game"

const app =
  document.querySelector<HTMLDivElement>(
    "#app"
  )!

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
  document.querySelector<HTMLButtonElement>(
    "#start-btn"
  )!

startButton.addEventListener(
  "click",
  () => {
    startGame()
  }
)