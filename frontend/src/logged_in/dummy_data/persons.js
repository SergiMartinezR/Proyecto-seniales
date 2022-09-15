fetch('http://127.0.0.1:8000/users/view/voluntario/', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
}).then(data => data.json()).then(

  data => {
    console.log(data);
  }
).catch(error => console.error(error))

const data = [
  {
    src: `${process.env.PUBLIC_URL}/images/logged_in/image1.jpg`,
    name: "Markus",
  },
  {
    src: `${process.env.PUBLIC_URL}/images/logged_in/image2.jpg`,
    name: "David",
  },
  {
    src: `${process.env.PUBLIC_URL}/images/logged_in/image3.jpg`,
    name: "Arold",
  },
  {
    src: `${process.env.PUBLIC_URL}/images/logged_in/image4.jpg`,
    name: "Joanic",
  },
  {
    src: `${process.env.PUBLIC_URL}/images/logged_in/image5.jpg`,
    name: "Sophia",
  },
  {
    src: `${process.env.PUBLIC_URL}/images/logged_in/image6.jpg`,
    name: "Aaron",
  },
  {
    src: `${process.env.PUBLIC_URL}/images/logged_in/image7.jpg`,
    name: "Steven",
  },
  {
    src: `${process.env.PUBLIC_URL}/images/logged_in/image8.jpg`,
    name: "Felix",
  },
  {
    src: `${process.env.PUBLIC_URL}/images/logged_in/image9.jpg`,
    name: "Vivien",
  },
  {
    src: `${process.env.PUBLIC_URL}/images/logged_in/image10.jpg`,
    name: "Leonie",
  },
  {
    src: 'http://localhost:8000/media/voluntario/pfp/BMW.png',
    name: 'Un negro',
    location: 'HOla'
  },
];

export default data;