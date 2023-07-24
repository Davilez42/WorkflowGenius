export default async function loadImage() {
  const container_main = document.querySelector(".container-main");
  setInterval(async () => {
    const resp = await fetch(
      "https://api.unsplash.com/photos/random?client_id=yWJ3f_5Njqt88VQus0ybMb7C5sjFrlDONqlMlvkrBhY"
    );

    if (resp.ok) {
      const image = await resp.json();
      if (!container_main) return;
      container_main.style = `background-image: url(${image.urls.full})`;
    }
  }, 1000000);
}
