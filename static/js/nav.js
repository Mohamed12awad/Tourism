function createNavbar() {
  const navbarContainer = document.getElementById("navbarContainer");

  const navbar = document.createElement("nav");
  navbar.classList.add(
    "navbar",
    "navbar-expand-lg",
    "navbar-light",
    "bg-light"
  );

  const containerDiv = document.createElement("div");
  containerDiv.classList.add("container");

  const brandLink = document.createElement("a");
  brandLink.classList.add("navbar-brand");
  brandLink.href = "#";

  const logoImg = document.createElement("img");
  logoImg.src = "./static/imgs/logo1.png";
  logoImg.alt = "Company Logo";
  logoImg.width = 40;
  logoImg.height = 40;
  logoImg.classList.add("d-inline-block", "align-text-top");

  brandLink.appendChild(logoImg);
  brandLink.appendChild(document.createTextNode(" شركة سحاب للسياحة"));

  const togglerButton = document.createElement("button");
  togglerButton.classList.add("navbar-toggler");
  togglerButton.type = "button";
  togglerButton.setAttribute("data-bs-toggle", "collapse");
  togglerButton.setAttribute("data-bs-target", "#navbarNav");
  togglerButton.setAttribute("aria-controls", "navbarNav");
  togglerButton.setAttribute("aria-expanded", "false");
  togglerButton.setAttribute("aria-label", "Toggle navigation");

  const togglerIcon = document.createElement("span");
  togglerIcon.classList.add("navbar-toggler-icon");

  togglerButton.appendChild(togglerIcon);

  const linksContainer = document.createElement("div");
  linksContainer.classList.add("collapse", "navbar-collapse");
  linksContainer.id = "navbarNav";

  const navList = document.createElement("ul");
  navList.classList.add("navbar-nav", "ml-auto");

  const navItems = ["Home", "About Us", "Services", "Contact"];

  navItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("nav-item");

    const link = document.createElement("a");
    link.classList.add("nav-link");
    link.href = "#";
    link.textContent = item;

    listItem.appendChild(link);
    navList.appendChild(listItem);
  });

  linksContainer.appendChild(navList);
  containerDiv.appendChild(brandLink);
  containerDiv.appendChild(togglerButton);
  containerDiv.appendChild(linksContainer);
  navbar.appendChild(containerDiv);

  navbarContainer.appendChild(navbar);
}

createNavbar();
