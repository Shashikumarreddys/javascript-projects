let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");


const saveBtn = document.createElement("button");
saveBtn.innerText = "Save Score";
document.querySelector(".msg-container").appendChild(saveBtn);


const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};


const drawGame = () => {
  msg.innerText = "Game was draw. Play again";
  msg.style.backgroundColor = "#081b31";
};


const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lose! ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

// Save 
const saveScore = () => {
  const data = {
    userScore: userScore,
    compScore: compScore,
  };
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      alert(
        `Scores saved!\nUser: ${result.userScore} | Comp: ${result.compScore}`
      );
    })
    .catch(() => {
      alert("Error saving score");
    });
};

saveBtn.addEventListener("click", saveScore);

// Fetch 
window.addEventListener("load", () => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched previous data (mock):", data);
      const info = document.createElement("p");
      info.innerText = "Welcome back! Let's play again";
      info.style.marginTop = "1rem";
      document.querySelector(".msg-container").appendChild(info);
    });
});


const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;

    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }

    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice.toLowerCase());
  });
});

// Optional: Reset Score Button
const resetBtn = document.createElement("button");
resetBtn.innerText = "Reset Score";
resetBtn.style.marginLeft = "1rem";
document.querySelector(".msg-container").appendChild(resetBtn);

resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Scores reset! Play again.";
  msg.style.backgroundColor = "#081b31";
});
