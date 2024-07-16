const handleCategory = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await response.json();
    const targetData = data.data;
    targetData.forEach((btnInfo) => {
      // console.log(btnInfo.category);
      const btnContainer = document.getElementById("btn-container");
      btnContainer.classList = `flex flex-col md:flex-row justify-center gap-2 md:gap-8 mx-auto`;
      const button = document.createElement("button");
      button.innerHTML = `
        <button onclick="handleLoadVideos('${btnInfo.category_id}')" class="btn btn-sm bg-btn-bg text-tab-btn-text font-medium text-lg capitalize px-5 focus:bg-primary-color focus:text-white focus:border-0">${btnInfo.category}</button>
        `;
      // console.log(btnInfo.category_id);
      btnContainer.appendChild(button);
    });
  } catch (error) {
    console.log(error);
  }
};

let sortedData;
// handleLoadVideos
const handleLoadVideos = async (id) => {

  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const data = await response.json();
    const cardData = data.data;
    const fetchData = data.data;
    // console.log(cardData);
    displayData(cardData);
    sortedData = sort(fetchData);
    // console.log(sortedData);
  } catch (err) {
    console.log(err);
  }
};


const displayData = (myData) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.classList = `card-container grid md:grid-cols-2 lg:grid-cols-4 gap-6`;
  cardContainer.innerHTML = "";

  if (myData.length > 0) {
    myData.forEach((card) => {
      copyCard=card
      const div = document.createElement("div");
      div.innerHTML = `
<div class=" bg-base-100 rounded-xl">
<div class="relative">
<figure><img class="rounded-xl w-full h-[200px]" src="${
        card.thumbnail
      }" alt="profile-pic"></figure>

<div id="time-div" class="${card.others.posted_date? 'bg-card-heading rounded-lg w-max  absolute right-4 bottom-4 p-2' : ''}">
  <p class="text-white text-sm">${
    card.others.posted_date
      ? Math.floor(card.others.posted_date / 3600) +
        " hrs " +
        Math.floor((card.others.posted_date % 3600) / 60) +
        " min " +
        "ago"
      : ""
  }
  </p>
</div>
</div>
<div class="">
    <div class="flex gap-4 py-5">
        <div class=""><img class="w-11 h-11 rounded-full object-fill" src="${
          card.authors[0].profile_picture
        }" alt=""></div>
        <div>
            <p class="text-base font-bold text-card-heading">${card.title}</p>
           <div class="flex items-center gap-2">
           <p class="text-sm font-normal text-author-name py-2">${
             card.authors[0].profile_name
           }</p>
            <span>${
              card.authors[0].verified === true
                ? "<img src='./images/badge.png'>"
                : ""
            }</span>
           </div>
            <p class="text-sm font-normal text-author-name">${
              card.others.views
            } views</p>
        </div>
    </div>
    
</div>
</div>
`;

      cardContainer.appendChild(div);
    });
  } else {
    cardContainer.classList = ``;
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="flex flex-col justify-center items-center h-[50vh]">
    <img class="h-[140px] w-[140px]" src = "./images/Icon.png" alt = "">
    <p class="text-card-heading font-bold text-3xl text-center pt-4">Oops!! Sorry, There is no <br> content here</p>
    </div>
    `;
    cardContainer.appendChild(div);
  }
};


handleCategory();
handleLoadVideos("1000");

// sorting
const sort = (fetchData) => {
  // console.log(fetchData);
  const sortData = fetchData.sort(
    (a, b) => parseFloat(b.others.views) - parseFloat(a.others.views)
  );
  return sortData;
};
const handleSort = () => {
  displayData(sortedData);
  // console.log(sortedData);
};

// blog
const blogButton = document.getElementById("blog");
blogButton.addEventListener("click", () => {
  window.location.href = "blog.html";
});
