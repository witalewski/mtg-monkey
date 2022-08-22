import { SCRYFALL_CARD_NOTES_PREFIX } from "../../constants";

export const initSetEvaluation = () => {
  if (!window.location.href.includes("scryfall.com/sets")) {
    return;
  }

  const getStorageKey = (cardId) => `${SCRYFALL_CARD_NOTES_PREFIX}-${cardId}`;

  GM.addStyle(`
    .card-grid-item:not(.flexbox-spacer) {
        position: relative;
    }

    .card-comments {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;

        padding: 0px 6px;
        
        border-bottom-right-radius: 11px;
        border-bottom-left-radius: 11px;

        border: 1px solid black;
        border-top: none;

        font-size: 10px;
        background-color: rgba(255, 255, 255, 0.85);

        resize: none;
    }

    .card-comments::placeholder {
        color: #333333;
    }
  `);

  const cardDivs = Array.from(
    document.querySelectorAll(".card-grid-item:not(.flexbox-spacer)")
  ) as HTMLDivElement[];

  cardDivs.forEach((div) => {
    const cardId = div.getAttribute("data-card-id");
    const storageKey = getStorageKey(cardId);

    const textArea = document.createElement("textarea");
    
    textArea.className = "card-comments";
    textArea.rows = 2;
    textArea.placeholder = "Add your notes here...";
    textArea.spellcheck = false;

    textArea.addEventListener("input", () =>
      GM.setValue(storageKey, textArea.value)
    );
    GM.getValue(storageKey, "").then((notes) => {
      textArea.innerText = notes;
      div.appendChild(textArea);
    });
  });
};
