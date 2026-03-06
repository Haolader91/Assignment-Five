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
