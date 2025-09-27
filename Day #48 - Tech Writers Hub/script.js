// DOM Elements
const authorContainer = document.getElementById("author-container");
const loadMoreBtn = document.getElementById("load-more-btn");

// State
let authors = [];
let visibleCount = 0;
const AUTHORS_PER_PAGE = 8;

// Mock data - In a real app, this would come from an API
const mockAuthors = [
  {
    id: 1,
    name: "Sarah Johnson",
    bio: "Sarah writes about machine learning and artificial intelligence. With over 10 years of experience in the field, she breaks down complex topics into digestible content.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    url: "#",
    expertise: ["AI & ML", "Data Science"],
    articles: 142,
    followers: "12.5k",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Full Stack Developer",
    bio: "Michael specializes in JavaScript frameworks and modern web development. He loves creating interactive web applications and sharing his knowledge with the community.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    url: "#",
    expertise: ["Web Dev", "JavaScript", "React"],
    articles: 89,
    followers: "8.7k",
  },
  {
    id: 3,
    name: "Emma Wilson",
    title: "Cybersecurity Expert",
    bio: "Emma is a cybersecurity consultant who writes about online privacy, encryption, and security best practices. She's passionate about making the web a safer place.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    url: "#",
    expertise: ["Cybersecurity", "Privacy"],
    articles: 76,
    followers: "15.2k",
  },
  {
    id: 4,
    name: "David Kim",
    title: "Data Scientist",
    bio: "David explores the intersection of data science and business. His articles focus on practical applications of machine learning in various industries.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    url: "#",
    expertise: ["Data Science", "AI & ML", "Python"],
    articles: 113,
    followers: "9.8k",
  },
  {
    id: 5,
    name: "Priya Patel",
    title: "Cloud Architect",
    bio: "With expertise in cloud infrastructure and DevOps, Priya helps businesses scale their applications efficiently using modern cloud technologies.",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    url: "#",
    expertise: ["Cloud", "DevOps", "AWS"],
    articles: 67,
    followers: "7.3k",
  },
  {
    id: 6,
    name: "James Wilson",
    title: "Blockchain Developer",
    bio: "James is passionate about decentralized technologies and writes about blockchain, smart contracts, and the future of decentralized applications.",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    url: "#",
    expertise: ["Blockchain", "Web3", "Solidity"],
    articles: 54,
    followers: "11.1k",
  },
  {
    id: 7,
    name: "Olivia Martinez",
    title: "UX/UI Designer",
    bio: "Olivia combines psychology and design to create intuitive user experiences. She writes about design thinking, accessibility, and user research.",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    url: "#",
    expertise: ["UX/UI", "Design", "Accessibility"],
    articles: 92,
    followers: "14.6k",
  },
  {
    id: 8,
    name: "Thomas Lee",
    title: "Mobile Developer",
    bio: "Thomas specializes in cross-platform mobile development. He shares tutorials and best practices for building high-quality mobile applications.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    url: "#",
    expertise: ["Mobile", "React Native", "Flutter"],
    articles: 78,
    followers: "6.9k",
  },
];

// Initialize the app
function init() {
  // Simulate API call with setTimeout
  showLoading(true);

  setTimeout(() => {
    authors = [...mockAuthors, ...mockAuthors, ...mockAuthors]; // Duplicate to have more data
    visibleCount = 0;
    loadMoreAuthors();
    showLoading(false);
  }, 1000);

  // Add event listener for load more button
  loadMoreBtn.addEventListener("click", loadMoreAuthors);
}

// Show loading state
function showLoading(isLoading) {
  const btnText = document.querySelector(".btn-text");
  const btnLoader = document.querySelector(".btn-loader");

  if (isLoading) {
    loadMoreBtn.classList.add("loading");
    btnText.style.visibility = "hidden";
    btnLoader.style.display = "inline-block";
  } else {
    loadMoreBtn.classList.remove("loading");
    btnText.style.visibility = "visible";
    btnLoader.style.display = "none";
  }
}

// Load more authors
function loadMoreAuthors() {
  showLoading(true);

  // Simulate network delay
  setTimeout(() => {
    const nextBatch = authors.slice(
      visibleCount,
      visibleCount + AUTHORS_PER_PAGE
    );

    if (nextBatch.length > 0) {
      displayAuthors(nextBatch);
      visibleCount += nextBatch.length;

      // Show/hide load more button
      if (visibleCount >= authors.length) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = "No more writers to show";
      } else {
        loadMoreBtn.disabled = false;
        loadMoreBtn.querySelector(".btn-text").textContent =
          "Load More Writers";
      }
    }

    showLoading(false);
  }, 500);
}

// Display authors in the UI
function displayAuthors(authorsToDisplay) {
  const authorsHTML = authorsToDisplay
    .map(
      (author) => `
    <div class="author-card" data-id="${author.id}">
      <div class="author-header">
        <img src="${author.image}" alt="${author.name}" class="author-avatar">
      </div>
      <div class="author-info">
        <h3 class="author-name">${author.name}</h3>
        <p class="author-title">${author.title}</p>
        <p class="author-bio">${author.bio}</p>
        
        <div class="author-expertise">
          ${author.expertise
            .map((skill) => `<span class="expertise-tag">${skill}</span>`)
            .join("")}
        </div>
        
        <div class="author-stats">
          <span><i class="fas fa-file-alt"></i> ${
            author.articles
          } Articles</span>
          <span><i class="fas fa-users"></i> ${
            author.followers
          } Followers</span>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  authorContainer.insertAdjacentHTML("beforeend", authorsHTML);
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", init);
