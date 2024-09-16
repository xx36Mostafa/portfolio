
function shuffle() {
    const textarea = document.getElementById("shuffledata");
    const lines = textarea.value.trim().split('\n');
    for (let i = lines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    textarea.value = lines.join('\n');
}
function CopyToClipboard() {
    const textarea = document.getElementById("shuffledata");
    navigator.clipboard.writeText(textarea.value);
}
function RemoveDuplicated() {
    const textarea = document.getElementById("shuffledata");
    const duplicated = [...new Set(textarea.value.trim().split('\n'))];
    textarea.value = duplicated.join('\n')
    fetch('https://api.example.com/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            textarea.value = data
            console.log(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

}
