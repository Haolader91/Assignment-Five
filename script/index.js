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
const bugAndHelp = (arr) => {
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
const loadIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues") //
    .then((res) => res.json()) //
    .then((data) => displayIssues(data.data));
};
loadIssues();

// issues card display
const displayIssues = (issues) => {
  console.log(issues);
  const issueContainer = document.getElementById("issues");
  issueContainer.innerHTML = "";

  for (const issue of issues) {
    const createElement = document.createElement("div");
    createElement.innerHTML = `
      <div class="card w-full bg-base-100 shadow-xl border-t-4 border-error rounded-lg">
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
            <h2 class="card-title text-base font-bold text-gray-800 leading-tight">
              ${issue.title}
            </h2>
            <p class="text-xs text-gray-500 mt-2 line-clamp-2">
              ${issue.description}
            </p>
          </div>
          <!-- bug and help part -->
          <div class="flex gap-2 mt-1">
          <!-- Issue card bug and help -->
              ${bugAndHelp(issue.labels)}
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
};
// end
