import "./index.css";
import { enableValidation, settings, resetValidation, disableButton } from "../scripts/validation.js";
import { setButtonText } from "../utils/helpers.js";
import  Api  from "../utils/Api.js";


const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e7cb44d4-8f70-4487-a99b-983248a93ffc",
    "Content-Type": "application/json"
  }
});

let CurrentUserID;

api
    .getAppInfo()
    .then(([cards, userInfo]) => {
        CurrentUserID = userInfo._id;
        cards.forEach((item) => {
        const cardElement = getCardElement(item);
        cardsList.append(cardElement);
        })
        profileAvatarElement.src = userInfo.avatar;
        profileNameElement.textContent = userInfo.name;
        profileDescriptionElement.textContent = userInfo.about;
    })
    .catch((err) => {
        console.error(err);
    });



        

const editProfileButton = document.querySelector(".profile__button-edit");
const avatarModalButton = document.querySelector(".profile__image-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal__close");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");


const newPostButton = document.querySelector(".profile__new-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const cardSubmitButton = newPostModal.querySelector(".modal__save-button");
const newPostNameInput = newPostModal.querySelector("#card-caption-input");
const newPostLinkInput = newPostModal.querySelector("#card-image-input");
const profileNameElement = document.querySelector (".profile__name");
const profileDescriptionElement = document.querySelector (".profile__description");


const profileAvatarElement = document.querySelector(".profile__image");
const avatarModal = document.querySelector("#edit-avatar-modal");
const avatarCloseButton = avatarModal.querySelector(".modal__close");
const avatarSaveButton = avatarModal.querySelector(".modal__save-button");
const avatarFormElement = avatarModal.querySelector(".modal__form");
const avatarLinkInput = avatarModal.querySelector("#profile-avatar-input");


const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteModalCloseButton = deleteModal.querySelector(".modal__close");
const deleteCancelButton = deleteModal.querySelector(".modal__cancel-button");


const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

let selectedCard, selectedCardID;


function getCardElement(data) {

    const cardElement = cardTemplate.cloneNode(true);
    const cardTitleEl = cardElement.querySelector(".card__label");
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
    const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");


    cardLikeBtnEl.classList.toggle("card__like-btn_active", data.isLiked);
    cardImageEl.alt = data.name;
    cardTitleEl.textContent = data.name;
    cardImageEl.src = data.link;

    cardLikeBtnEl.addEventListener("click", (evt) => handleLike(evt, data._id));
    cardDeleteBtnEl.addEventListener("click", () => handleDeleteCard(cardElement, data._id));
    cardImageEl.addEventListener("click", () => handleImageClick(data));

    return cardElement;
    
}

editProfileButton.addEventListener("click", function () {
    editProfileNameInput.value = profileNameElement.textContent;
    editProfileDescriptionInput.value = profileDescriptionElement.textContent;
    resetValidation(editProfileForm, [editProfileNameInput, editProfileDescriptionInput], cardSubmitButton, settings);
    openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click", function () {
    closeModal(editProfileModal);
});
 
newPostButton.addEventListener("click", function () {
    resetValidation(addCardFormElement, [newPostNameInput, newPostLinkInput], cardSubmitButton, settings);
    openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", function() {
    closeModal(newPostModal);
}); 

previewModalCloseBtn.addEventListener("click", function () {
    closeModal(previewModal);
});

deleteModalCloseButton.addEventListener("click", function () {
    closeModal(deleteModal);
});

deleteCancelButton.addEventListener("click", function () {
    closeModal(deleteModal);
});


avatarCloseButton.addEventListener("click", function () {
    closeModal(avatarModal);
});

editProfileModal.addEventListener("click", (evt) => {
    clickOverlayToClose(editProfileModal, evt);
});

newPostModal.addEventListener("click", (evt) => {
    clickOverlayToClose(newPostModal, evt);
});

previewModal.addEventListener("click", (evt) => {
    clickOverlayToClose(previewModal, evt);
});


function handleEscape(evt) {
    if (evt.key === "Escape") {
        const currentModal = document.querySelector(".modal_is-opened");
        closeModal(currentModal);
    }
}

function openModal(modal) {
    modal.classList.add("modal_is-opened");
    document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
    modal.classList.remove("modal_is-opened");
    document.removeEventListener("keydown", handleEscape);
}
 
function clickOverlayToClose(modal, evt) {
    if (evt.target === evt.currentTarget) {
    closeModal(modal);
    }
}

function handleEditProfileSubmit(evt) {
    evt.preventDefault();

    const submitButton = evt.submitter;
    setButtonText(submitButton, true, "Save", "Saving...")

    api
    .editUserInfo({ name: editProfileNameInput.value, about: editProfileDescriptionInput.value })
        .then((data) => {
            profileNameElement.textContent = editProfileNameInput.value;
            profileDescriptionElement.textContent = editProfileDescriptionInput.value;
            closeModal(editProfileModal);
        })
        .catch(console.error)
        .finally(() => {
            setButtonText(submitButton, false, "Save", "Saving...");
        });
}

function handleAddCardSubmit(evt) {
    evt.preventDefault(); 
    setButtonText(cardSubmitButton, true, "Save", "Saving...");
    const inputValues = {
        name: newPostNameInput.value, 
        link: newPostLinkInput.value,
    };
    api
    .addCard({ name: inputValues.name, link: inputValues.link })
        .then((data) => {
            const cardElement = getCardElement(data);
            cardsList.prepend(cardElement);
            addCardFormElement.reset();
            disableButton(cardSubmitButton, settings);
            closeModal(newPostModal);
            
        })
        .catch(console.error)
        .finally(() => {
            setButtonText(cardSubmitButton, false, "Save", "Saving...");
        });
}

function handleAvatarSubmit(evt) {
    evt.preventDefault();
    setButtonText(avatarSaveButton, true, "Save", "Saving...");
    api
    .editAvatarInfo({ avatar: avatarLinkInput.value })
        .then((data) => {
            profileAvatarElement.src = avatarLinkInput.value;
            avatarFormElement.reset();
            disableButton(avatarSaveButton, settings);
            closeModal(avatarModal);
        })
        .catch(console.error)
        .finally(() => {
            setButtonText(avatarSaveButton, false, "Save", "Saving...");
        });
}

function handleDeleteSubmit(evt) {
    evt.preventDefault();
    const deleteSubmitButton = evt.submitter;
    setButtonText(deleteSubmitButton, true, "Delete", "Deleting...");
    api
    .deleteCard(selectedCardID)
        .then(() => {
            selectedCard.remove();
            closeModal(deleteModal);
        })
        .catch(console.error)
        .finally(() => {
            setButtonText(deleteSubmitButton, false, "Delete", "Deleting...");
        });
}

function handleDeleteCard(cardElement, cardID) {
    selectedCard = cardElement;
    selectedCardID = cardID;
    openModal(deleteModal);
}

function handleLike(evt, id) {
    const isLiked = evt.target.classList.contains("card__like-btn_active");
    api
    .handleLikeStatus(id, isLiked)
        .then((data) => {
            evt.target.classList.toggle("card__like-btn_active", data.isLiked);
        })
        .catch(console.error);
}

function handleImageClick(data) {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
}


editProfileForm.addEventListener("submit", handleEditProfileSubmit);

addCardFormElement.addEventListener("submit", handleAddCardSubmit);  


avatarModalButton.addEventListener("click", function () {
    resetValidation(avatarFormElement, [avatarLinkInput], avatarSaveButton, settings);
    openModal(avatarModal);
});

avatarFormElement.addEventListener("submit", handleAvatarSubmit); 

deleteForm.addEventListener("submit", handleDeleteSubmit);

enableValidation(settings);
