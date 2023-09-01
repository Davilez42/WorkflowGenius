export default async function loadImage() {
  const container_main = document.querySelector(".container-main");
  const data = JSON.parse(window.localStorage.getItem('config'))


  if (data?.imageBackground) {
    container_main.style = `background-image: url(${data.imageBackground})`;
  } else {
    container_main.style = `background-image: url(https://images.unsplash.com/photo-1637080024867-39547bcbc64a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80)`;
    window.localStorage.setItem('config', JSON.stringify({ imageBackground: 'https://images.unsplash.com/photo-1637080024867-39547bcbc64a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80' }))
  }

  setInterval(async () => {
    const resp = await fetch(
      "https://api.unsplash.com/photos/random?client_id=yWJ3f_5Njqt88VQus0ybMb7C5sjFrlDONqlMlvkrBhY"
    );

    if (resp.ok) {
      const image = await resp.json();
      const url_image = image.urls.full
      container_main.style = `background-image: url(${url_image})`;
      window.localStorage.setItem('config', JSON.stringify({ imageBackground: url_image }))
    }
  }, 1000000);


}
