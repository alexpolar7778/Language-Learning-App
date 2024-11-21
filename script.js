$(document).ready(function () {
    const words = [
        { word: "always", translation: "завжди" },
        { word: "day", translation: "день" },
        { word: "never", translation: "ніколи" },
        { word: "friend", translation: "друг" },
        { word: "family", translation: "сім'я" },
        { word: "clothes", translation: "одяг" },
        { word: "world", translation: "світ" },
        { word: "book", translation: "книга" },
        { word: "school", translation: "школа" },
        { word: "time", translation: "час" }
    ];

    let currentIndex = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    const shuffledWords = words.sort(() => 0.5 - Math.random());

    function updateCard() {
        if (currentIndex < shuffledWords.length) {
            $("#word").text(shuffledWords[currentIndex].word);
            $("#translation").val("");
            $("#step").text(currentIndex + 1);
        } else {
            showModal();
        }
    }

    $("#check").on("click", function () {
        const userInput = $("#translation").val().trim().toLowerCase();
        const correctTranslation = shuffledWords[currentIndex].translation.toLowerCase();

        if (!userInput) {
            alert("Please enter a translation before proceeding!");
            return;
        }
    
        if (userInput === correctTranslation) {
            correctCount++;
            $("#correct").text(correctCount);
        } 
        else {
            incorrectCount++;
            $("#incorrect").text(incorrectCount);
        }
    
        currentIndex++;
        updateCard();
    });

    function showModal() {
        let level = "";
        if (correctCount <= 3) level = "Low";
        else if (correctCount >= 4 && correctCount <= 7) level = "Medium";
        else level = "High";

        $("#result").html(
            `<strong>Your score: <span class="correct">Correct: ${correctCount}</span> | <span class="incorrect">Incorrect: ${incorrectCount}</span> 
            <p>Your level: <span class="level">${level}</span></strong></p>`
        );
        $("#modal").fadeIn();
    }

    $("#restart").on("click", function () {
        currentIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
        $("#correct").text(correctCount);
        $("#incorrect").text(incorrectCount);
        $("#step").text(currentIndex);
        $("#modal").fadeOut();
        updateCard();
    });

    updateCard();
});