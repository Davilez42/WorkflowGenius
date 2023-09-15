
export default async function loadImage() {
  const div_root = document.getElementById('root')
  const data = JSON.parse(window.localStorage.getItem('config'))
  if (data?.imageBackground) {
    div_root.style = `background-image: url(${data.imageBackground})`;
  } else {
    console.log('entra aqui')
    div_root.style = `background-image: url(${process.env.REACT_APP_DEFAULT_BACK})`;
    window.localStorage.setItem('config', JSON.stringify({ imageBackground: process.env.REACT_APP_DEFAULT_BACK }))
  }

  setInterval(async () => {
    const resp = await fetch(
      "https://api.unsplash.com/photos/random?client_id=yWJ3f_5Njqt88VQus0ybMb7C5sjFrlDONqlMlvkrBhY"
    );

    if (resp.ok) {
      const image = await resp.json();
      const url_image = image.urls.full
      div_root.style = `background-image: url(${url_image})`;
      window.localStorage.setItem('config', JSON.stringify({ imageBackground: url_image }))
    }
  }, 600000);
}
