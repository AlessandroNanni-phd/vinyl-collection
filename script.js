// Attendi il caricamento della pagina
document.addEventListener("DOMContentLoaded", () => {
    // Percorso del file CSV (assicurati che sia nella root del repository)
    const csvFilePath = 'vinili.csv';

    // Carica il file CSV usando fetch
    fetch(csvFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore nel caricamento del file CSV: ${response.statusText}`);
            }
            return response.text(); // Leggi il contenuto del CSV come testo
        })
        .then(csvData => {
            // Usa PapaParse per analizzare i dati del CSV
            Papa.parse(csvData, {
                header: true, // Usa la prima riga come intestazioni
                skipEmptyLines: true, // Ignora righe vuote
                complete: results => {
                    // Mostra i dati nella tabella
                    displayTable(results.data);
                }
            });
        })
        .catch(error => {
            console.error("Errore:", error);
        });

    // Funzione per mostrare i dati nella tabella
    function displayTable(data) {
        const tableBody = document.querySelector("#vinylTable tbody");

        // Svuota il contenuto della tabella
        tableBody.innerHTML = "";

        // Itera su ogni riga dei dati e crea una nuova riga nella tabella
        data.forEach(row => {
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
