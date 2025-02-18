const skills = document.querySelectorAll('.skill');
const descriptionElement = document.querySelector('.skill-description');
const skillTextElement = document.getElementById('skill-text');

const skillDescriptions = {
  'HTML': 'HTML (HyperText Markup Language) is the standard language for creating and structuring web pages.',
  'CSS': 'CSS (Cascading Style Sheets) is used for styling web pages and making them visually appealing.',
  'JS': 'JavaScript is a versatile programming language used for web development, enabling dynamic content on websites.',
  'Git': 'Git is a version control system used to track changes in source code during software development.',
  'MySQL': 'MySQL is an open-source relational database management system, commonly used with web applications.',
  'Python': 'Python is a high-level programming language known for its readability and versatility in various domains.',
  'Canva': 'Canva is a graphic design tool used for creating visuals like social media graphics, presentations, and more.',
  'React JS': 'React is a JavaScript library for building user interfaces, mainly for single-page applications.'
};

const skillColors = {
  'HTML': '#e34c26',
  'CSS': '#2965f1',
  'JS': '#f7df1e',
  'Git': '#f1502f',
  'MySQL': '#4479a1',
  'Python': '#306998',
  'Canva': '#00C4CC',
  'React JS': '#61dafb'
};

const skillIcons = {
  'HTML': 'fab fa-html5',
  'CSS': 'fab fa-css3-alt',
  'JS': 'fab fa-js-square',
  'Git': 'fa-brands fa-git-alt',
  'MySQL': 'fas fa-database',
  'Python': 'fab fa-python',
  'Canva': 'fas fa-paint-brush',
  'React JS': 'fab fa-react'
};

// Fix skills in a circle without rotation
const radius = 250;
const angleStep = 360 / skills.length;

skills.forEach((skill, index) => {
  const skillName = skill.dataset.skill;

  // Calculate position based on circle
  const angle = angleStep * index;
  const x = radius * Math.cos(angle * (Math.PI / 180));
  const y = radius * Math.sin(angle * (Math.PI / 180));

  // Apply position to the skills
  skill.style.transform = `translate(${x}px, ${y}px)`;

  // Ensure skill stays upright by rotating back the inverse of the angle
  skill.style.transform += ` rotate(${angle}deg)`;

  // Set the background color and icon
  skill.style.backgroundColor = skillColors[skillName];
  skill.innerHTML = `<i class="${skillIcons[skillName]}"></i><span>${skillName}</span>`;

  skill.addEventListener('click', () => {
    // Update the skill description
    const iconClass = skillIcons[skillName];
    const description = skillDescriptions[skillName];
    
    skillTextElement.innerHTML = `
      <i class="${iconClass}"></i>
      <h3>${skillName}</h3>
      <p>${description}</p>
    `;

    // Show the description section
    descriptionElement.classList.add('active');
  });
});

// Optional: Hide the description when clicking outside the carousel
document.addEventListener('click', (e) => {
  if (!e.target.closest('.carousel')) {
    descriptionElement.classList.remove('active');
  }
  AOS.refresh();
});
// video
const v1 = document.getElementById('provid1') ;
const v2 = document.getElementById('provid2') ;
const v3 = document.getElementById('provid3') ;
const v4 = document.getElementById('provid4') ;
const v5 = document.getElementById('provid5') ;
const h = document.querySelector(".hover-sign");
const vlist = [v1,v2,v3,v4,v5];
vlist.forEach(function(video){
  video.addEventListener('mouseover',function(){
    video.play()
    h.classList.add("active")
  })
  video.addEventListener('mouseout',function(){
    video.pause()
    h.classList.remove("active")
  })
});