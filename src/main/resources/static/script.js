function checkFiles(files) {
    if (files.length !== 1) {
        alert("Bitte genau eine Datei hochladen.");
        return;
    }

    const fileSize = files[0].size / 1024 / 1024; // MiB
    if (fileSize > 10) {
        alert("Datei zu groß (max. 10 MB)");
        return;
    }

    const file = files[0];
    const preview = document.getElementById("preview");
    const answerPart = document.getElementById("answerPart");
    const answer = document.getElementById("answer");

    answerPart.style.visibility = "visible";
    preview.src = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append("image", file);

    console.log("Starte Upload...");

    fetch('/analyze', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log("Response erhalten:", response);
        return response.json(); // Server liefert sauberes JSON
    })
    .then(results => {
        console.log("Parsed JSON:", results);

        if (!Array.isArray(results)) {
            answer.innerText = "Unerwartete Serverantwort.";
            return;
        }

        let html = `<table class="table table-bordered table-sm">
            <thead><tr><th>Klasse</th><th>Wahrscheinlichkeit</th></tr></thead><tbody>`;
        results.forEach(item => {
            const percent = (item.probability * 100).toFixed(4) + " %";
            html += `<tr><td>${item.className}</td><td>${percent}</td></tr>`;
        });
        html += `</tbody></table>`;

        console.log("Generiere HTML-Tabelle...", html);
        answer.innerHTML = html;
    })
    .catch(error => {
        console.error("Fehler bei der Anfrage oder beim Parsen:", error);
        answer.innerText = "Ein Fehler ist aufgetreten.";
    });
}
