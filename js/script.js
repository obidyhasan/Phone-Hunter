// Global Variable Clicked
let isShowClicked = false;
let getItem = "";

// Get Phones From API
const getPhones = async (search = "") => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${search}`
    );
    const data = await res.json();
    if (isShowClicked) {
      displayPhones(data.data);
    } else {
      displayPhones(data.data.slice(0, 6));
    }
  } catch (error) {
    console.log("something went wrong");
  }
};

// Display Phones
const phonesContainer = document.querySelector("#phonesContainer");
const displayPhones = (phones) => {
  // Set container empty
  phonesContainer.innerHTML = "";

  phones.forEach((phone) => {
    const { phone_name, image } = phone;
    const container = document.createElement("div");
    container.className = "w-full p-5 border rounded-md space-y-4";
    container.innerHTML = `
        <figure class="bg-primary-light h-[300px] rounded-md flex justify-center items-center">
            <img src="${image}" alt="" class="w-52 h-52 object-contain" />
        </figure>
        <h3 class="text-xl font-bold">${phone_name}</h3>
        <p class="text-sm">
        There are many variations of passages of available, but the majority
        have suffered
        </p>
        <h3 class="text-xl font-bold">$ <span>999</span></h3>
        <button class="hover:bg-primary btn bg-primary text-white rounded">
        Show Details
        </button>
    `;
    phonesContainer.appendChild(container);
  });
};

// Show All Clicked
const showAllBtn = () => {
  isShowClicked = true;
  if (getItem === "") {
    getPhones("iphone");
  } else {
    getPhones(getItem);
  }

  document.querySelector("#showAll").classList.add("hidden");
};

// Search Phones
document.querySelector("#searchInput").addEventListener("keyup", (e) => {
  if (e.target.value === "") {
    getPhones("iphone");
  } else {
    getPhones(e.target.value);
    getItem = e.target.value;
  }
});

getPhones("iphone");
