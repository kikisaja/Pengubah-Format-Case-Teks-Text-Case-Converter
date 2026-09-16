document.addEventListener("DOMContentLoaded", function () {
    // 1. Ambil Elemen DOM
    const textInput = document.getElementById("textInput");
    const convertButtons = document.querySelectorAll(".btn-convert");
    const btnCopy = document.getElementById("btnCopy");
    const btnClear = document.getElementById("btnClear");

    // Elemen Statistik
    const charCount = document.getElementById("charCount");
    const wordCount = document.getElementById("wordCount");
    const sentenceCount = document.getElementById("sentenceCount");
    const paragraphCount = document.getElementById("paragraphCount");

    // 2. Fungsi Hitung Statistik Teks
    function updateStats() {
        const text = textInput.value;

        // Hitung Karakter
        charCount.textContent = text.length;

        // Hitung Kata (Dipisah spasi/whitespace, abaikan spasi kosong)
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        wordCount.textContent = text.trim() === "" ? 0 : words.length;

        // Hitung Kalimat (Dipisah tanda titik, tanda tanya, atau tanda seru)
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        sentenceCount.textContent = sentences.length;

        // Hitung Paragraf (Dipisah karakter baris baru '\n')
        const paragraphs = text.split(/\n+/).filter(para => para.trim().length > 0);
        paragraphCount.textContent = paragraphs.length;
    }

    // 3. Logika Konversi Case Teks
    function convertCase(caseType) {
        let text = textInput.value;
        if (!text) return;

        switch (caseType) {
            case "uppercase":
                textInput.value = text.toUpperCase();
                break;

            case "lowercase":
                textInput.value = text.toLowerCase();
                break;

            case "titlecase":
                textInput.value = text.toLowerCase().replace(/(?:^|\s|-)\S/g, function (a) {
                    return a.toUpperCase();
                });
                break;

            case "sentencecase":
                textInput.value = text.toLowerCase().replace(/(^\s*|[.!?]\s*)([a-z])/g, function (match, separator, char) {
                    return separator + char.toUpperCase();
                });
                break;

            case "camelcase":
                textInput.value = text
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
                break;

            case "kebabcase":
                textInput.value = text
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "");
                break;

            case "snakecase":
                textInput.value = text
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9]+/g, "_")
                    .replace(/^_+|_+$/g, "");
                break;

            case "alternatingcase":
                textInput.value = text
                    .split("")
                    .map((char, index) => index % 2 === 0 ? char.toLowerCase() : char.toUpperCase())
                    .join("");
                break;

            default:
                break;
        }

        updateStats();
    }

    // 4. Event Listener
    textInput.addEventListener("input", updateStats);

    convertButtons.forEach(button => {
        button.addEventListener("click", function () {
            const caseType = this.getAttribute("data-case");
            convertCase(caseType);
        });
    });

    // Fitur Salin Teks
    btnCopy.addEventListener("click", function () {
        if (!textInput.value) return;

        navigator.clipboard.writeText(textInput.value).then(() => {
            const originalText = btnCopy.textContent;
            btnCopy.textContent = "Tersalin! ✓";
            btnCopy.style.backgroundColor = "#0284c7";

            setTimeout(() => {
                btnCopy.textContent = originalText;
                btnCopy.style.backgroundColor = "#16a34a";
            }, 1500);
        });
    });

    // Fitur Bersihkan Teks
    btnClear.addEventListener("click", function () {
        textInput.value = "";
        updateStats();
    });

    // Inisialisasi awal
    updateStats();
});
