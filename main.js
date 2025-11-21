const tracker = document.querySelector(".tracker");
const workWrapper = document.querySelector(".card-wrapper");
const ellipsis = document.querySelector(".ellipsis");
let cardInfo;
let viewType = "daily";
let timeFrameTxt = {"daily": "Yesterday","weekly": "Last week", "monthly": "Last month"};
fetch("/data.json")
.then((response) => {
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json()
})
.then((data) => {
  data.forEach((category) => {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('card-wrapper', category.class);
    cardInfo = document.createElement('div');
    cardInfo.classList.add('card-info');
    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');
    const action = document.createElement('p');
    action.classList.add('action');
    action.textContent = category.title;
    const cardEllipsis = ellipsis.cloneNode(true);
    cardTitle.append(action, cardEllipsis);
    cardInfo.append(cardTitle);
    Object.entries(category.timeframes).forEach(createTimeFrame);
    cardWrapper.append(cardInfo);
    tracker.append(cardWrapper);
    workWrapper.remove();
  }); 
})
.catch((error) => {
  console.log(error.message);
});

function createTimeFrame(arr) {
  let timeFrame = arr[0];
  let hours = arr[1];
  const timeFrameDiv = document.createElement("div");
  timeFrameDiv.classList.add(timeFrame, "time");
  if (viewType != timeFrame) {
    timeFrameDiv.classList.add("hidden");
  }
  const currHours = document.createElement('h2');
  currHours.classList.add('hours');
  currHours.textContent = hours.current + "hrs";
  const prevHours = document.createElement('p');
  prevHours.classList.add('prev-hours');
  prevHours.textContent = `${timeFrameTxt[timeFrame]} - ${hours.previous}hrs`;
  timeFrameDiv.append(currHours, prevHours);
  cardInfo.appendChild(timeFrameDiv);
}


document.getElementsByName("time-frame").forEach((timeFrame) => {
  timeFrame.addEventListener("click", (e) => {
    const active = document.querySelector(".active");
    active.classList.remove("active");
    document.querySelectorAll("." + viewType).forEach((element) => {
      element.classList.add("hidden");
    });

    timeFrame.labels[0].classList.add("active");
    viewType = timeFrame.value;
    document.querySelectorAll("." + viewType).forEach((element) => {
      element.classList.remove("hidden");
    });
  });
});

