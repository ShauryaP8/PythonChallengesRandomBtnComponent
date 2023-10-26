document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const randomQuestion = document.getElementById('randomQuestion');

    // Load the CSV file and parse it into an array of questions
    fetch('questions.csv')
        .then(response => response.text())
        .then(data => {
            const questionsArray = data.split('\n').filter(question => question.trim() !== '');

            generateButton.addEventListener('click', function() {
                const randomIndex = Math.floor(Math.random() * questionsArray.length);
                let randomQ = questionsArray[randomIndex];
                // Remove unwanted parts
                randomQ = randomQ
                    .replace('GIS SUBMIT>>', '') // Remove "GIS SUBMIT>>"
                    .replace(/,*$/, '') // Remove trailing commas

                // Extract the URL and description
                const parts = randomQ.split(',');
                const challengeCode = parts[0];
                const score = parts[1];
                const challenge = parts[2];
                const description = parts.slice(3).join(', ');

                // Format the output with labels and links
                randomQ = `Challenge Code: ${challengeCode}\nScore: ${score}\nChallenge: ${challenge}\nDescription: ${description}`;

                randomQuestion.innerHTML = randomQ;
            });
        })
        .catch(error => {
            console.error('Error loading CSV file:', error);
        });
});
