const profileEditButton = document.querySelector(".profile__button-edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal__close-button");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");


const newPostButton = document.querySelector(".profile__new-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const cardFormElement = newPostModal.querySelector(".modal__form");
const imageNameInput = newPostModal.querySelector("#card-image-input");
const imageLinkInput = newPostModal.querySelector("#card-description-input");
const profileNameElement = document.querySelector (".profile__name");
const profileDescriptionElement = document.querySelector (".profile__description");

profileEditButton.addEventListener("click", function () {
    editProfileNameInput.value = profileNameElement.textContent;
    editProfileDescriptionInput.value = profileDescriptionElement.textContent;
    editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseButton.addEventListener("click",function () {
    editProfileModal.classList.remove("modal_is-opened");
});

newPostButton.addEventListener("click", function () {
    newPostModal.classList.add("modal_is-opened");
});

newPostCloseButton.addEventListener("click",function() {
    newPostModal.classList.remove("modal_is-opened");
}); 

function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    profileNameElement.textContent = editProfileNameInput.value;
    profileDescriptionElement.textContent = editProfileDescriptionInput.value
     editProfileModal.classList.remove("modal_is-opened");    
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
}


editProfileForm.addEventListener("submit", handleEditProfileSubmit);
cardFormElement.addEventListener('submit', handleAddCardSubmit); // <-- cant find solution to execute.
/* Getting the transitions to slowly open has been an issue for me. My modals
are not cooperating when opened, and getting them to behave as instructed... well, ive hit a snag. I apologize for the incomplete submission. */
