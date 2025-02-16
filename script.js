const skills = [
    { name: "HTML", icon: "fab fa-html5", desc: "The backbone of web pages." },
    { name: "CSS", icon: "fab fa-css3-alt", desc: "Styles and designs websites." },
    { name: "Bootstrap", icon: "fab fa-bootstrap", desc: "A framework for responsive design." },
    { name: "JavaScript", icon: "fab fa-js", desc: "Brings interactivity to web pages." },
    { name: "React", icon: "fab fa-react", desc: "Builds dynamic web applications." },
    { name: "Python", icon: "fab fa-python", desc: "A versatile programming language." },
    { name: "Git", icon: "fab fa-git-alt", desc: "Version control for projects." },
    { name: "Canva", icon: "fas fa-paint-brush", desc: "Design tool for creatives." },
    { name: "MySQL", icon: "fas fa-database", desc: "Manages and stores data." }
];

const menu = document.querySelector('.circle-menu');
const centerSkill = document.getElementById('center-skill');
const radius = 220; // Increased spacing

skills.forEach((skill, index) => {
    const angle = (index / skills.length) * (2 * Math.PI);
    const x = radius * Math.cos(angle) + 250; 
    const y = radius * Math.sin(angle) + 250;

    const div = document.createElement("div");
    div.className = "skill";
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    div.innerHTML = `<i class="${skill.icon}"></i><span>${skill.name}</span>`;
    div.dataset.skill = skill.name;
    div.dataset.icon = skill.icon;
    div.dataset.desc = skill.desc;

    div.addEventListener("click", function() {
        centerSkill.innerHTML = `<i class="${skill.icon}"></i><span>${skill.name}</span><p class="description">${skill.desc}</p>`;
    });

    menu.appendChild(div);
});