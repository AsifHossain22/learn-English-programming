// HideSections
const hideSections = document.getElementsByClassName("hideSection");
for (let i = 0; i < hideSections.length; i++) {
  hideSections[i].style.display = "none";
}

// LoginFeatures
document.getElementById("login").addEventListener("click", (event) => {
  event.preventDefault();

  // GetValueFormInputFields
  const userNameInput = document.getElementById("userName");
  const userName = userNameInput.value;
  const passWordInput = document.getElementById("password");
  const passWord = passWordInput.value;
  const convertedPassword = parseInt(passWord); // ConvertToNumber

  // ValidateLogin
  if (userName.length > 0) {
    if (convertedPassword === 123456) {
      // ShowAllSections
      const hideSections = document.getElementsByClassName("hideSection");
      for (let i = 0; i < hideSections.length; i++) {
        hideSections[i].style.display = "block";
      }
    } else {
      alert("Password is incorrect. Correct password is 123456");
    }
  } else {
    alert("Username Field can not be empty. Enter Username");
  }
});

// LogOutFeatures
const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", () => {
  const hideSections = document.getElementsByClassName("hideSection");
  for (let i = 0; i < hideSections.length; i++) {
    hideSections[i].style.display = "none";
  }
});

// ShowLoader
const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document
    .getElementById("dynamicLessonWordsContainer")
    .classList.add("hidden");
};

// HideLoader
const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document
    .getElementById("dynamicLessonWordsContainer")
    .classList.remove("hidden");
};

// RemoveActiveClass
const removeActiveClass = () => {
  const activeButtons = document.getElementsByClassName("active");

  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
  //   console.log(activeButtons);
};

// LoadLessonLevels
const loadLessonLevels = () => {
  //   console.log("Loading lesson levels...");

  // FetchData
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json()) // ConvertPromiseToJSON
    .then((data) => displayLessonLevels(data.data)); // SendDataToDisplayLessonLevels
};

// LoadLessonWordsLevel
const loadLessonWordsLevel = (id) => {
  showLoader();
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  // console.log(url);

  // FetchData
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // ActiveLessonButton
      removeActiveClass(); // RemoveActiveClassToButton
      const clickedButton = document.getElementById(`lesson-${id}`);
      //   console.log(clickedButton);
      clickedButton.classList.add("active"); // AddActiveClassToButton
      displayLessonWords(data.data);
    });
};

// LoadLessonWords
const loadLessonWords = () => {
  showLoader();
  // console.log("Loading lesson words...");

  // FetchData
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((response) => response.json())
    .then((data) => displayLessonWords(data.data));
};

// LoadLessonWordDetails
const loadLessonWordDetails = (wordDetailsID) => {
  console.log(wordDetailsID);

  const url = `https://openapi.programming-hero.com/api/word/${wordDetailsID}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayLessonWordDetails(data.data));
};

// DisplayLessonLevels
const displayLessonLevels = (levels) => {
  // console.log(levels);

  // GetTheContainer
  const lessonLevelContainer = document.getElementById("lessonLevelContainer");

  // LoopOperationOnArrayOfObject
  for (let level of levels) {
    // console.log(level);

    // CreateElement
    const levelsDiv = document.createElement("div");
    levelsDiv.innerHTML = `
    <button id="lesson-${level.level_no}" onclick="loadLessonWordsLevel(${level.level_no})" class="cursor-pointer text-[#422AD5] text-base font-semibold border rounded py-1 px-3 hover:bg-[#422AD5] hover:text-white transition-colors duration-300">
        <i class="fa-solid fa-book-open"></i> Lesson ${level.level_no}
    </button>
    `;

    // AppendElement
    lessonLevelContainer.append(levelsDiv);
  }
};

// DisplayLessonWords
const displayLessonWords = (words) => {
  //   console.log(words);

  //   GetTheContainer
  const dynamicLessonWordsContainer = document.getElementById(
    "dynamicLessonWordsContainer"
  );

  //   EmptyDynamicLessonWordsContainer
  dynamicLessonWordsContainer.innerHTML = "";
  dynamicLessonWordsContainer.classList.add("grid");

  //   NoDataLessonContainer
  if (words.length === 0) {
    dynamicLessonWordsContainer.innerHTML = `
    <div id="dynamicNotDataLessonContainer" 
    class="dynamic-font w-full bg-[#F8F8F8] rounded-3xl col-span-3"
    >
        <div>
            <img class="mx-auto" src="./assets/alert-error.png" alt="No Data" />
        </div>
        <span class="text-sm text-[#79716B]">
        এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </span>
        <p class="text-4xl text-[#292524] font-medium pt-4">
            নেক্সট Lesson এ যান
        </p>
    </div>
    `;
    hideLoader();
    return;
  }

  //   ForEachOperationOnArrayOfObject
  words.forEach((word) => {
    // console.log(word);

    // CreateElement
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
    <div class="text-center bg-white rounded-2xl p-7">
        <h2 class="text-black text-2xl font-bold">${word.word}</h2>
        <span class="text-black text-xl font-medium py-6">Meaning / Pronunciation</span>
        <p class="text-[#18181B] text-base font-semibold">
            ${word.meaning} / ${word.pronunciation}
        </p>
        <div class="flex justify-between items-center pt-7">
            <button onclick="loadLessonWordDetails(${word.id})" class="text-[#374957] text-xl bg-[#1A91FF10] rounded-lg cursor-pointer hover:text-[#1A91FF] transition-colors duration-300 px-2 py-1">
                <i class="fa-solid fa-circle-info"></i>
            </button>
            <button onclick="pronounceWord('${word.word}')" class="text-[#374957] text-xl bg-[#1A91FF10] rounded-lg cursor-pointer hover:text-[#1A91FF] transition-colors duration-300 px-2 py-1">
                <i class="fa-solid fa-volume-high"></i>
            </button>
        </div>
    </div>
    `;

    // AppendElement
    dynamicLessonWordsContainer.append(wordCard);
  });
  hideLoader();
};

// DisplayLessonWordDetails
const displayLessonWordDetails = (word) => {
  console.log(word);
  document.getElementById("wordDetails").showModal();

  // WordDetailsContainer
  const wordDetailsContainer = document.getElementById("wordDetailsContainer");
  wordDetailsContainer.innerHTML = `
  <div>
    <h3 class="text-black text-4xl font-semibold pb-3">
      ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :
      ${word.pronunciation})
    </h3>
    <p class="text-black text-2xl font-semibold">Meaning :</p>
    <p class="text-black text-2xl font-medium pb-3">${word.meaning}</p>
    <p class="text-black text-2xl font-semibold">Example :</p>
    <p class="text-black text-2xl pb-3">${word.sentence}</p>
    <p class="text-black text-2xl font-medium">সমার্থক শব্দ গুলো :</p>
    <p class="text-black text-xl">${word.synonyms}</p>
  </div>
`;
};

// SpeakWord
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // Japanese
  window.speechSynthesis.speak(utterance);
}

loadLessonLevels();

// StickyNavbar
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    // AddBlurAndSemiTransparentBG
    navbar.classList.add("bg-white/30", "backdrop-blur-md", "shadow-md");
    document.getElementById("nav").style.padding = "15px 0";
    navbar.classList.remove("bg-transparent");
  } else {
    // RemoveBlurAndSemiTransparentBG
    navbar.classList.remove("bg-white/30", "backdrop-blur-md");
    document.getElementById("nav").style.padding = "25px 0";
    navbar.classList.add("bg-transparent");
  }
});

// ScrollSpyFeature

// SelectingSectionsAndButtons
const sections = document.querySelectorAll("section");
const scrollButtons = document.querySelectorAll(".scroll-btn");

// IntersectionObserver
const options = {
  root: null, // WatchingViewport
  threshold: 0.6, // SectionVisible 60%
};

// ObserverCallBack
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");

      // RemoveAllActiveStyles
      for (let i = 0; i < scrollButtons.length; i++) {
        scrollButtons[i].classList.remove("bg-[#422AD5]", "text-white");
      }

      // AddActiveStyle
      const activeBtn = document.querySelector(
        `.scroll-btn[data-target="${id}"]`
      );
      if (activeBtn) {
        activeBtn.classList.add("bg-[#422AD5]", "text-white");
      }
    }
  });
}, options);

// ObserveAllSections
sections.forEach((section) => observer.observe(section));
