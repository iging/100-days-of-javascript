document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("message-input");
  const resultSection = document.getElementById("result");
  const checkMessageButton = document.getElementById("check-message-btn");
  const characterCount = document.querySelector(".character-count");
  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const spamPatterns = [
    {
      name: "Help Request",
      regex: /please help|assist me|urgent help needed/gi,
      description: "Common in phishing attempts asking for assistance",
    },
    {
      name: "Money Request",
      regex:
        /[0-9]+\s*(?:hundred|thousand|million|billion)?\s+(?:dollars|usd|\$)/gi,
      description: "Requests involving large sums of money",
    },
    {
      name: "Free Money",
      regex: /(?:^|\s)fr[e3][e3] m[o0]n[e3]y|free cash|money making/gi,
      description: "Promises of free money or get-rich-quick schemes",
    },
    {
      name: "Stock Alert",
      regex:
        /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7]|hot stock tip|penny stock/gi,
      description: "Unsolicited stock tips or alerts",
    },
    {
      name: "Suspicious Greeting",
      regex:
        /(?:^|\s)d[e3][a@4]r (?:fr[i|1][e3]nd|customer|user|valued member)/gi,
      description: "Generic greetings common in spam messages",
    },
    {
      name: "Password Reset",
      regex:
        /(?:password reset|account (?:suspended|locked)|verify your account)/gi,
      description: "Phishing attempts asking for account verification",
    },
    {
      name: "Lottery Winner",
      regex: /(?:congratulation|you[''\s]?ve won|prize claim|lottery winner)/gi,
      description: "Fake lottery or prize notifications",
    },
    {
      name: "Suspicious Links",
      regex: /(?:http|www\.|bit\.ly|tinyurl\.com|goo\.gl|t\.co)[^\s]+/gi,
      description: "Suspicious or shortened URLs",
    },
    {
      name: "Urgent Action Required",
      regex:
        /(?:urgent|immediate action required|account (?:closure|suspension)|last warning)/gi,
      description: "Messages creating a false sense of urgency",
    },
  ];

  function updateCharacterCount() {
    const count = messageInput.value.length;
    characterCount.textContent = `${count} character${count !== 1 ? "s" : ""}`;

    if (count > 500) {
      characterCount.style.color = "var(--color-error)";
    } else if (count > 200) {
      characterCount.style.color = "var(--color-primary-variant)";
    } else {
      characterCount.style.color = "var(--color-on-surface-variant)";
    }
  }

  function checkForSpam(message) {
    return spamPatterns
      .map((pattern) => ({
        ...pattern,
        matches: message.match(pattern.regex) || [],
      }))
      .filter((pattern) => pattern.matches.length > 0);
  }

  function formatResults(detectedPatterns) {
    if (detectedPatterns.length === 0) {
      return `
                <div class="result-success">
                    <i class="fas fa-check-circle"></i>
                    <h3>No Spam Detected</h3>
                    <p>This message appears to be clean and doesn't contain any obvious spam indicators.</p>
                </div>
            `;
    }

    const totalMatches = detectedPatterns.reduce(
      (sum, pattern) => sum + pattern.matches.length,
      0
    );
    const confidence = Math.min(
      100,
      Math.floor((detectedPatterns.length / spamPatterns.length) * 100) + 20
    );

    const patternsList = detectedPatterns
      .map(
        (pattern) => `
            <div class="pattern-item">
                <div class="pattern-header">
                    <span class="pattern-name">${pattern.name}</span>
                    <span class="pattern-count">${pattern.matches.length} ${
          pattern.matches.length === 1 ? "match" : "matches"
        }</span>
                </div>
                <p class="pattern-desc">${pattern.description}</p>
                <div class="pattern-matches">
                    ${pattern.matches
                      .slice(0, 3)
                      .map(
                        (match) =>
                          `<span class="match">"${
                            match.length > 30
                              ? match.substring(0, 30) + "..."
                              : match
                          }"</span>`
                      )
                      .join("")}
                    ${
                      pattern.matches.length > 3
                        ? `<span class="more-matches">+${
                            pattern.matches.length - 3
                          } more</span>`
                        : ""
                    }
                </div>
            </div>
        `
      )
      .join("");

    return `
            <div class="result-warning">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Potential Spam Detected</h3>
                <div class="confidence-meter">
                    <div class="confidence-label">Confidence: ${confidence}%</div>
                    <div class="confidence-bar">
                        <div class="confidence-level" style="width: ${confidence}%;"></div>
                    </div>
                </div>
                <p class="result-summary">
                    Found ${totalMatches} potential spam indicator${
      totalMatches === 1 ? "" : "s"
    } 
                    across ${detectedPatterns.length} categor${
      detectedPatterns.length === 1 ? "y" : "ies"
    }.
                </p>
                <div class="detected-patterns">
                    ${patternsList}
                </div>
                <div class="suggestion">
                    <i class="fas fa-lightbulb"></i>
                    <span>Be cautious with messages requesting personal information or containing suspicious links.</span>
                </div>
            </div>
        `;
  }

  messageInput.addEventListener("input", updateCharacterCount);

  checkMessageButton.addEventListener("click", () => {
    const message = messageInput.value.trim();

    if (!message) {
      messageInput.classList.add("error");
      messageInput.placeholder = "Please enter a message to analyze...";
      setTimeout(() => {
        messageInput.classList.remove("error");
        messageInput.placeholder =
          "Paste your message here to check for spam...";
      }, 2000);
      return;
    }

    resultSection.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Analyzing message for spam indicators...</p>
            </div>
        `;

    setTimeout(() => {
      const detectedPatterns = checkForSpam(message);
      resultSection.innerHTML = formatResults(detectedPatterns);
      resultSection.style.animation = "none";
      resultSection.offsetHeight;
      resultSection.style.animation = "fadeIn 0.5s ease-out";
    }, 800);
  });

  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      checkMessageButton.click();
    }
  });
  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      checkMessageButton.click();
    }
  });
});
