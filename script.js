document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const randomQuestion = document.getElementById('randomQuestion');

    // Load the TSV file and parse it into an array of questions
    fetch('questions.tsv')
        .then(response => response.text())
        .then(data => {
            const questionsArray = data.split('\n').filter(question => question.trim() !== '');

            generateButton.addEventListener('click', function() {
                const randomIndex = Math.floor(Math.random() * questionsArray.length);
                let randomQ = questionsArray[randomIndex];
                // Remove unwanted parts
                randomQ = randomQ
                    .replace('GIS SUBMIT>>', '') // Remove "GIS SUBMIT>>"
                    .replace(/\t+$/, ''); // Remove trailing tabs

                // Split the TSV line by tabs
                const parts = randomQ.split('\t');
                const challengeCode = parts[0];
                const score = parts[1];
                const challenge = parts[2];
                const description = parts.slice(3).join('\t');

                // Format the output with labels and line breaks
                randomQ = `Challenge Code:\n${challengeCode}\nScore:\n${score}\nChallenge:\n${challenge}\nDescription:\n${description}`;

                randomQuestion.innerHTML = randomQ;
            });
        })
        .catch(error => {
            console.error('Error loading TSV file:', error);
        });
});
