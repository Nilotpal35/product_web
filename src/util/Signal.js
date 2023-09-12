export const greenSignals = [200, 201, 300, 301];
export const redSignals = [400, 401, 404, 500];

export const checkServerStatus = async () => {
  fetch("http://localhost:8080/serverHealth", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("Server health status", res);
    })
    .catch((err) => {
      console.log(err);
    });
};
