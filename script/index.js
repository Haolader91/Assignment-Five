// login page function
const singIn = () => {
  const userName = document.getElementById("username").value;
  const passWord = document.getElementById("password").value;

  if (userName === "admin" && passWord === "admin123") {
    window.location = "main.html";
  } else if (userName === "admin") {
    alert("Invalid password");
  } else if (passWord === "admin123") {
    alert("Invalid username");
  } else {
    alert("Invalid credentials");
  }
};
// end

//  Issue card bug and help part
const bugAndHelp = (arr = []) => {
  const colors = ["badge-error badge-soft", "badge-warning badge-soft"];

  const htmlElement = arr.map(
    (el, index) => `
            <span class="badge uppercase text-[10px] font-bold ${colors[index % colors.length]}">
            ${el}
            </span>
    `,
  );
  return htmlElement.join(" ");
};
// Issues card load part
const loadIssues = (type = "all", btn) => {
  // manageLoading(true); //----------------------------------------------------
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues") //
    .then((res) => res.json()) //
    .then((data) => {
      console.log(data);
      displayIssues(data.data, type, btn);
    });
  // .then((data) => console.log(data.data));
};
loadIssues("all");

// issues card display
const displayIssues = (issues, type = "all", btn) => {
  // console.log(issues);
  // manageLoading(false); //----------------------------------------------------
  const issueCounter = document.getElementById("issueCount"); // counting
  const issueContainer = document.getElementById("issues");
  issueContainer.innerHTML = "";

  if (type !== "all") {
    issues = issues.filter((i) => i.status === type); // filtering part
  }
  issueCounter.innerText = `${issues.length} Issues`; // counting part

  for (const issue of issues) {
    const createElement = document.createElement("div");
    const border =
      issue.status === "open" ? "border-green-500" : "border-purple-500";
    createElement.className = `card bg-base-100 shadow border-t-4 ${border} cursor-pointer`;

    createElement.innerHTML = `
      <div class="w-full rounded-lg">
        <div class="card-body p-5 gap-3">
            <!-- bag part -->
            <div class="flex justify-between items-center">
              <img src="./assets/Open-Status.png" alt=""/>
              <p class=" badge badge-error badge-outline bg-red-50 text-[10px] font-bold py-3 px-4 w-fit flex-grow-0 uppercase">
                ${issue.priority}
              </p>
            </div>
          <!-- title part  -->
          <div>
            <h2 class="card-title text-base font-bold text-gray-800 leading-tight" onclick="modalLoad(${issue.id})">
              ${issue.title}
            </h2>
            <p class="text-xs text-gray-500 mt-2 line-clamp-2">
              ${issue.description}
            </p>
          </div>
          <!-- bug and help part -->
          <div class="flex gap-2 mt-1">
          <!-- Issue card bug and help -->
              ${bugAndHelp(issue.labels || [])}
          </div>
          <!-- divider part  -->
          <div class="divider m-0 opacity-50"></div>
          <!-- author part  -->
          <div class="text-xs text-gray-400 space-y-1">
            <p>${issue.author}</p>
            <p>${issue.createdAt}</p>
          </div>
        </div>
      </div>
      `;
    issueContainer.append(createElement);
  }
  // active btn running tab
  if (btn) {
    document
      .querySelectorAll(".btn")
      .forEach((t) => t.classList.remove("btn-primary"));

    btn.classList.add("btn-primary");
  }
};
// end
// modal section
const modalLoad = (id) => {
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`) //
    .then((res) => res.json()) //
    .then((data) => displayModal(data.data));
};
const displayModal = (modal) => {
  console.log(modal);
  const modalBox = document.getElementById("modal-box");
  modalBox.innerHTML = `
    <div class="card-body p-8 space-y-4">
      <h2 class="card-title text-3xl font-bold text-slate-800">
        ${modal.title}
      </h2>

      <div class="flex flex-wrap items-center gap-3 text-slate-500 text-sm">
        <span class="badge badge-success gap-1 py-3 px-4 text-white font-medium">
          ${modal.status}
        </span>
        <span>•</span>
        <span>Opened by <span class="font-semibold text-slate-700">${modal.author}</span></span>
        <span>•</span>
        <span>${modal.updatedAt}</span>
      </div>

      <div class="flex gap-2 py-2">
        <span class="badge flex gap-2 mt-1 py-3 px-3">
           ${bugAndHelp(modal.labels || [])}
        </span>
      </div>

      <p class="text-slate-600 leading-relaxed text-lg">
       ${modal.description}
      </p>

      <div class="rounded-xl bg-[#F8FAFC] p-6 mt-4 flex justify-between items-center">
        <div class="space-y-1">
          <span class="text-slate-400 text-sm block">Assignee:</span>
          <span class="font-bold text-slate-800 text-lg">${modal.author}</span>
        </div>
        <div class="text-right space-y-1">
          <span class="text-slate-400 text-sm block">Priority:</span>
          <span class="badge bg-red-500 text-white border-none py-3 px-4 font-bold">${modal.priority}</span>
        </div>
      </div>
      </div>
    </div>
  `;
  document.getElementById("my_modal_5").showModal();
};

// search section
document.getElementById("btn-search").addEventListener("click", () => {
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);
  // manageLoading(true); //--------------------------------------------------------------
  fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`,
  ) //
    .then((res) => res.json()) //
    .then((data) => {
      const searchWord = data.data;
      // console.log(searchWord);
      const filterWord = searchWord.filter((issue) =>
        issue.title.toLowerCase().includes(searchValue),
      );
      displayIssues(filterWord);
    });
});

// loading part
const manageLoading = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("issues").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("issues").classList.remove("hidden");
  }
};
