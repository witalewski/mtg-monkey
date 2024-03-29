import { setCardsInCollection, store } from "../../../state/store";
import { debounce } from "debounce";
import parseCollection from "./parse-collection";
import { COLLECTION_KEY } from "../../../constants";

const _handleCollectionUpdate = ({ target: { value } }) => {
  const parsedCards = parseCollection(value);
  store.dispatch(setCardsInCollection(parsedCards));
  GM.setValue(COLLECTION_KEY, value);
};

const handleCollectionUpdate = debounce(_handleCollectionUpdate, 1000);

const setupCollectionManagement = (parentElement) => {
  let isCollectionOpen = false;

  const collectionView = document.createElement("div");
  parentElement.appendChild(collectionView);

  const manageCollectionButton = document.createElement("button");
  manageCollectionButton.innerText = "Manage Collection";
  parentElement.appendChild(manageCollectionButton);

  // const copyMissingCardsButton = document.createElement("button");
  // copyMissingCardsButton.innerText = "Copy missing cards";
  // parentElement.appendChild(copyMissingCardsButton);

  const collectionInputWrapper = document.createElement("div");
  const collectionInput = document.createElement("textarea");
  collectionInput.rows = 10;
  collectionInput.cols = 120;
  collectionInput.addEventListener("input", handleCollectionUpdate);
  collectionInputWrapper.appendChild(collectionInput);

  manageCollectionButton.addEventListener("click", () => {
    if (!isCollectionOpen) {
      isCollectionOpen = true;
      collectionView.appendChild(collectionInputWrapper);
      GM.getValue(COLLECTION_KEY, "").then((value) => {
        collectionInput.value = value.toString();
      });
    } else {
      isCollectionOpen = false;
      collectionView.removeChild(collectionInputWrapper);
    }
  });

  // copyMissingCardsButton.addEventListener("click", () => {
  //   if (isCollectionOpen) {
  //     isCollectionOpen = false;
  //     collectionView.removeChild(collectionInputWrapper);
  //   }

  //   copyMissingCardsHandler();
  // });
};

export default setupCollectionManagement;
