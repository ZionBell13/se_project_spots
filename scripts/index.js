const initalCards = [
{
    name: "Val Thorens"
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
},
{
    name: "Restaurant terrace"
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg", 
},
{
    name: "An outdoor cafe"
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
},
{ 
    name: "A very long bridge, over the forest and through the trees"
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",

},
{
    name: "Tunnel with morning light"
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
},
{
    name: "Mountain house"
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
},
]; 


const profileEditButton = document.querySelector(".profile__button-edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal__close-button");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");


const newPostButton = document.querySelector(".profile__new-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const nameInput = newPostModal.querySelector("#card-image-input");
const linkInput = newPostModal.querySelector("#card-caption-input");
const profileNameElement = document.querySelector (".profile__name");
const profileDescriptionElement = document.querySelector (".profile__description");

profileEditButton.addEventListener("click", function () {
    editProfileNameInput.value = profileNameElement.textContent;
    editProfileDescriptionInput.value = profileDescriptionElement.textContent;
    openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click",function () {
    closeModal(editProfileModal);
});

newPostButton.addEventListener("click", function () {
    openModal(newPostModal);
});

newPostCloseButton.addEventListener("click",function() {
    closeModal(newPostModal);
}); 


function openModal(modal) {
    modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
    modal.classList.remove("modal_is-opened");
}

function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    profileNameElement.textContent = editProfileNameInput.value;
    profileDescriptionElement.textContent = editProfileDescriptionInput.value;
     closeModal (editProfileModal);
}

function handleAddCardSubmit(evt) {
    evt.preventDefault();
    console.log(nameInput.value, linkInput.value);
    closeModal(newPostModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit); 

initalCards.forEach(function (item) {
    console.log(item.name);
    console.log(item.link);
});