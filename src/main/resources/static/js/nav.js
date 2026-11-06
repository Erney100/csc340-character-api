const nav = document.createElement("nav");

const links = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about.html" },
    { name: "Add a Character", url: "/new-character-form.html" }
];

links.forEach(link => {
    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.name;
    nav.appendChild(a);
});

document.querySelector("header").after(nav);