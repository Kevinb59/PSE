/**
 * Découpe un texte en mots puis en caractères pour l'animation.
 * Chaque mot reste indivisible au retour à la ligne (white-space: nowrap).
 */
export function appendSplitText(
  container: HTMLElement,
  text: string,
  charClassName = "split-char",
  highlightWords: string[] = []
) {
  container.innerHTML = "";

  const words = text.trim().split(/\s+/);

  words.forEach((word, wordIndex) => {
    if (wordIndex > 0) {
      container.appendChild(document.createTextNode(" "));
    }

    const wordSpan = document.createElement("span");
    wordSpan.className = "split-word";
    wordSpan.style.display = "inline-block";
    wordSpan.style.whiteSpace = "nowrap";

    const normalizedWord = word.replace(/[^\p{L}0-9]/gu, "").toLowerCase();
    const isHighlighted = highlightWords.some(
      (w) => w.replace(/[^\p{L}0-9]/gu, "").toLowerCase() === normalizedWord
    );

    // ── Mot surligné : lettres/chiffres groupés (ex. IA) + ponctuation à part ──
    if (isHighlighted) {
      const letters = word.match(/[\p{L}0-9]+/gu)?.[0] ?? "";
      const trailing = word.slice(letters.length);

      if (letters) {
        const groupSpan = document.createElement("span");
        groupSpan.className = `${charClassName} rainbow-ia`;
        groupSpan.textContent = letters;
        groupSpan.style.opacity = "0";
        groupSpan.style.transform = "translateY(100%) rotateX(-40deg)";
        wordSpan.appendChild(groupSpan);
      }

      trailing.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.className = charClassName;
        charSpan.textContent = char;
        charSpan.style.opacity = "0";
        charSpan.style.transform = "translateY(100%) rotateX(-40deg)";
        wordSpan.appendChild(charSpan);
      });

      container.appendChild(wordSpan);
      return;
    }

    word.split("").forEach((char) => {
      const charSpan = document.createElement("span");
      charSpan.className = charClassName;
      charSpan.textContent = char;
      charSpan.style.opacity = "0";
      charSpan.style.transform = "translateY(100%) rotateX(-40deg)";
      wordSpan.appendChild(charSpan);
    });

    container.appendChild(wordSpan);
  });
}
