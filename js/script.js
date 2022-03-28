document.addEventListener('DOMContentLoaded', checkCookie);

function checkCookie() {
  let cookieArray;
  let cookieElemArray;
  if (document.cookie.length > 0) {
    cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      cookieElemArray = cookieArray[i].slice(cookieArray[i].indexOf('=') + 1);
      cookieElemArray = cookieElemArray.split('-');
      let cookieRGBValue = cookieElemArray[2];
      let cookieRGBFillValue = cookieElemArray[3];
      cookieRGBValue = cookieRGBValue.replaceAll('%2C', ',');
      cookieRGBFillValue = cookieRGBFillValue.replaceAll('%2C', ',');
      canvas = document.createElement('canvas');
      canvas.id = 'canvas';
      canvas.style.marginLeft = '20px';
      new_color.append(canvas);
      canvasElement = canvas.getContext('2d');
      canvasElement.fillStyle = cookieRGBValue;
      canvasElement.fillRect(0, 0, 300, 150);
      canvasElement.clearRect(35, 25, 230, 100);
      canvasElement.beginPath();
      canvasElement.ellipse(100, 100, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
      canvasElement.fillStyle = cookieRGBFillValue;
      canvasElement.fillRect(35, 25, 230, 100);
      canvasElement.font =
        "20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
      canvasElement.textAlign = 'center';
      canvasElement.fillStyle = 'black';
      canvasElement.fillText(cookieElemArray[0].toUpperCase(), 150, 55);
      canvasElement.fillText(cookieElemArray[1], 150, 85);
      cookieRGBValue = cookieRGBValue.slice(
        cookieRGBValue.indexOf('(') + 1,
        cookieRGBValue.indexOf(')')
      );
      cookieRGBFillValue = cookieRGBFillValue.slice(
        cookieRGBFillValue.indexOf('(') + 1,
        cookieRGBFillValue.indexOf(')')
      );
      canvasElement.fillText(cookieRGBValue, 150, 115);
    }
    save.addEventListener('click', checkForm);
  } else {
    save.addEventListener('click', checkForm);
  }
}

function checkForm() {
  let threeHourLifeTimeCookie = new Date(
    new Date().getTime() + 180 * 60 * 1000
  );
  let RGBColor;
  let RGBAColor;
  let HEXColor;
  let RGBColorFill;
  if (/^[a-z]*$/i.test(colorInput.value) && colorInput.value.length >= 3) {
    if (selectType.value == 'rgb') {
      if (/^(\d{1,3}),(\d{1,3}),(\d{1,3})$/.test(colorCode.value)) {
        hex_error.style.display =
          rgba_error.style.display =
          rgb_error.style.display =
            'none';
        rgbColorArray = colorCode.value.split(',');
        RGBColor = `rgb(${colorCode.value})`;
        RGBColorFill = `rgba(${colorCode.value},.5)`;
        Cookies.set(
          `color_name_${colorInput.value}`,
          `${
            colorInput.value
          }-${selectType.value.toUpperCase()}-${RGBColor}-${RGBColorFill}`,
          {
            expires: threeHourLifeTimeCookie,
            path: '/',
          }
        );
        createCanvas(RGBColor, RGBColorFill);
      } else {
        rgb_error.style.display = 'block';
        hex_error.style.display = rgba_error.style.display = 'none';
      }
    }
    if (selectType.value == 'rgba') {
      if (
        /^(\d{1,3}),(\d{1,3}),(\d{1,3}),([0-1])?(\.([1-9]))?$/.test(
          colorCode.value
        )
      ) {
        rgbaColorArray = colorCode.value.split(',');
        if (rgbaColorArray[3] * 1 <= 1) {
          hex_error.style.display =
            rgba_error.style.display =
            rgb_error.style.display =
              'none';
          RGBAColor = `rgba(${colorCode.value})`;
          RGBColorFill = `rgba(${rgbaColorArray[0]},${rgbaColorArray[1]},${
            rgbaColorArray[2]
          },${rgbaColorArray[3] * 1 - 0.3})`;
          Cookies.set(
            `color_name_${colorInput.value}`,
            `${
              colorInput.value
            }-${selectType.value.toUpperCase()}-${RGBAColor}-${RGBColorFill}`,
            {
              expires: threeHourLifeTimeCookie,
              path: '/',
            }
          );
          console.log(RGBAColor);
          createCanvas(RGBAColor, RGBColorFill);
        }
      } else {
        rgba_error.style.display = 'block';
        hex_error.style.display = rgb_error.style.display = 'none';
      }
    }
    if (selectType.value == 'hex') {
      if (/#([a-f0-9]{3}){1,2}\b/i.test(colorCode.value)) {
        hex_error.style.display =
          rgba_error.style.display =
          rgb_error.style.display =
            'none';
        HEXColor = colorCode.value;
        RGBColorFill = `${HEXColor}80`;
        Cookies.set(
          `color_name_${colorInput.value}`,
          `${
            colorInput.value
          }-${selectType.value.toUpperCase()}-${HEXColor}-${RGBColorFill}`,
          {
            expires: threeHourLifeTimeCookie,
            path: '/',
          }
        );
        createCanvas(HEXColor, RGBColorFill);
      } else {
        hex_error.style.display = 'block';
        rgba_error.style.display = rgb_error.style.display = 'none';
      }
    }
    color_error.style.display = 'none';
  } else {
    color_error.style.display = 'block';
  }
}

function createCanvas(fillField, clearField) {
  let canvas;
  let canvasElement;
  canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  canvas.style.marginLeft = '20px';
  new_color.append(canvas);
  canvasElement = canvas.getContext('2d');
  canvasElement.fillStyle = fillField;
  canvasElement.fillRect(0, 0, 300, 150);
  canvasElement.clearRect(35, 25, 230, 100);
  canvasElement.fillStyle = clearField;
  canvasElement.fillRect(35, 25, 230, 100);
  canvasElement.font = "20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
  canvasElement.textAlign = 'center';
  canvasElement.fillStyle = 'black';
  canvasElement.fillText(colorInput.value.toUpperCase(), 150, 55);
  canvasElement.fillText('RGB', 150, 85);
  canvasElement.fillText(colorCode.value, 150, 115);
}
