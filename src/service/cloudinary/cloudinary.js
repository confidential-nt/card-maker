class Cloudinary {
  url;
  constructor() {
    this.url = "https://api.cloudinary.com/v1_1/dypkkfbys/image/upload";
  }

  async uploadImage(formData) {
    const response = await fetch(this.url, {
      method: "POST",
      body: formData,
    });

    const json = await response.json();

    return json;
  }
}

export default Cloudinary;
