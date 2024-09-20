
function shuffle() {
    const textarea = document.getElementById("shuffledata");
    const lines = textarea.value.trim().split('\n');
    for (let i = lines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    textarea.value = lines.join('\n');
}

function CopyToClipboard(X = false) {
    let textarea;

    if (X == false) {
        textarea = document.getElementById("shuffledata");
    } else {
        textarea = document.getElementById("filterAccs");
    }
    navigator.clipboard.writeText(textarea.value)
        .then(() => {
            console.log("Text copied to clipboard!");
            alert("Text copied to clipboard!");
        })
        .catch(err => {
            console.error("Failed to copy: ", err);
            alert("Failed to copy text. Please try again.");
        });

}

function RemoveDuplicated() {
    const textarea = document.getElementById("shuffledata");
    const duplicated = [...new Set(textarea.value.trim().split('\n'))];
    textarea.value = duplicated.join('\n')
}

function filterAccounts() {
    const textarea = document.getElementById("filterAccs");
    let combinedAccounts = [];
    let currentAccount = "";

    for (let i = 0; i < textarea.value.trim().split('\n').length; i++) {
        let line = textarea.value.trim().split('\n')[i].trim();

        if (line.startsWith("login:")) {
            currentAccount = line.replace("login: ", "").trim();
        }

        if (line.startsWith("password:") && currentAccount) {
            let password = line.replace("password: ", "").trim();
            combinedAccounts.push(`${currentAccount}:${password}`);
            currentAccount = "";
        }
    }
    textarea.value = combinedAccounts.join('\n');
}
