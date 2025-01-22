// Aspetta il caricamento della pagina
document.addEventListener("DOMContentLoaded", () => {
    // Prendi il pulsante di caricamento
    const uploadInput = document.getElementById("upload");

    // Aggiungi un event listener al pulsante
    uploadInput.addEventListener("change", (event) => {
        const file = event.target.files[0]; // Ottieni il file selezionato

        if (file) {
            // Usa PapaParse per leggere il file CSV
            Papa.parse(file, {
                header: true, // Leggi la prima riga come intestazioni
                skipEmptyLines: true, // Ignora righe vuote
                complete: (results) => {
                    // Quando la lettura è completata
                    displayTable(results.data);
                },
            });
        }
    });

    // Funzione per mostrare i dati nella tabella
    function displayTable(data) {
        const tableBody = document.querySelector("#vinylTable tbody");

        // Svuota il contenuto della tabella
        tableBody.innerHTML = "";

        // Itera su ogni riga dei dati e crea una nuova riga nella tabella
        data.forEach((row) => {
            const tr = document.createElement("tr");

            // Crea celle della riga
            tr.innerHTML = `
                <td>${row.Autore || ""}</td>
                <td>${row.Titolo || ""}</td>
                <td>${row.Anno || ""}</td>
                <td>${row.Genere || ""}</td>
                <td>${row.Nazionalità || ""}</td>
            `;

            // Aggiungi la riga alla tabella
            tableBody.appendChild(tr);
        });
    }
});
