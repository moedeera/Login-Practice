const PublicBtn = document.getElementById("Public");
const SettingsBtn = document.getElementById("Settings");
const DeleteBtn = document.getElementById("Delete");
const PublicEditBtn = document.getElementById("PublicEditBtn");

const PublicPage = document.getElementById("PublicPage");
const PublicEdit = document.getElementById("PublicEdit");
const SettingsPage = document.getElementById("SettingsPage");
const DeletePage = document.getElementById("DeletePage");

PublicBtn.addEventListener("click", () => {
  PublicBtn.style.color = "black";
  SettingsBtn.style.color = "white";
  DeleteBtn.style.color = "white";

  PublicPage.classList.remove("no-show");
  PublicEdit.classList.add("no-show");
  SettingsPage.classList.add("no-show");
  DeletePage.classList.add("no-show");
});

SettingsBtn.addEventListener("click", () => {
  PublicBtn.style.color = "white";
  SettingsBtn.style.color = "black";
  DeleteBtn.style.color = "white";

  PublicPage.classList.add("no-show");
  PublicEdit.classList.add("no-show");
  SettingsPage.classList.remove("no-show");
  DeletePage.classList.add("no-show");
});
DeleteBtn.addEventListener("click", () => {
  PublicBtn.style.color = "white";
  SettingsBtn.style.color = "white";
  DeleteBtn.style.color = "black";

  PublicPage.classList.add("no-show");
  PublicEdit.classList.add("no-show");
  SettingsPage.classList.add("no-show");
  DeletePage.classList.remove("no-show");
});

PublicEditBtn.addEventListener("click", () => {
  PublicPage.classList.add("no-show");
  PublicEdit.classList.remove("no-show");
  SettingsPage.classList.add("no-show");
  DeletePage.classList.add("no-show");
});
