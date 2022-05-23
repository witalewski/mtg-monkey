const setupCollectionManagement = (
    parentElement,
    collectionChangeHandler,
    copyMissingCardsHandler
  ) => {
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
    collectionInput.addEventListener("input", async ({ target }) => {
      const { value } = target as HTMLTextAreaElement;
      await GM.setValue("collection", value);
      collectionChangeHandler();
    });
    collectionInputWrapper.appendChild(collectionInput);
  
    manageCollectionButton.addEventListener("click", () => {
      if (!isCollectionOpen) {
        isCollectionOpen = true;
        collectionView.appendChild(collectionInputWrapper);
        GM.getValue("collection", "").then((value) => {
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