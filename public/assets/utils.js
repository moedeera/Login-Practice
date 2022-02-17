const dashboard = document.getElementById("mainDashboard");
const progressBtn = document.getElementById("Progress");
const ObjectiveBtn = document.getElementById("ObjectivesBtn");

const Progress = document.getElementById("ProgressDashboard");
const Objectives = document.getElementById("ObjectivesDashBoard");
const ExitBtn1 = document.getElementById("exitProg");
const ExitBtn2 = document.getElementById("exitObj");

progressBtn.addEventListener("click", () => {
  Progress.classList.remove("no-show");
  dashboard.classList.add("no-show");
});

ObjectiveBtn.addEventListener("click", () => {
  Objectives.classList.remove("no-show");
  dashboard.classList.add("no-show");
});

ExitBtn1.addEventListener("click", () => {
  Progress.classList.add("no-show");
  dashboard.classList.remove("no-show");
});

ExitBtn2.addEventListener("click", () => {
  Objectives.classList.add("no-show");
  dashboard.classList.remove("no-show");
});

const PublicBtn = document.getElementById("Public");
const SettingsBtn = document.getElementById("Settings");
const DeleteBtn = document.getElementById("Delete");

PublicBtn.addEventListener("click", () => {
  console.log("you clicked public button");
});

SettingsBtn.addEventListener("click", () => {
  console.log("you clicked settings button");
});
DeleteBtn.addEventListener("click", () => {
  console.log("you clicked public button");
});
