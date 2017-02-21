class ProfilePictureController {
  constructor($document, $scope, $element) {
    "ngInject";
    Object.assign(this, {
      $document,
      $scope,
      el: $element
    });
  }
  $onInit() {
    this.generate();
  }
  generate() {
    const seed = Math.random();

    function getRandomRange(min, max, add = 1000) {
      let random = Math.sin(seed * add)*10000;
      random -= Math.floor(random);
      return Math.floor(random * (max - min) + min);
    }
    const svgns = "http://www.w3.org/2000/svg";
    const box = document.createElementNS(svgns, "svg");

    const rows = 3;
    const columns = 3;
    const blockSize = Math.floor(this.size / 2);
    // how i define the box size is a bit guess work for now
    // const this.size = parseInt(rows - 1) * parseInt(blockSize) ;
    const rotate = blockSize * rows / 2 ;

    box.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");
    box.setAttribute("width", this.size);
    box.setAttribute("height", this.size);
    box.setAttribute("viewbox", "0 0 100 100");
    box.setAttribute("class", "box");

    const g = document.createElementNS(svgns, "g");
    g.setAttribute("transform",
      "translate(" + -((rows * blockSize - this.size) / 2) + " " + -((rows * blockSize - this.size) /2) +
      ") rotate("+(90*seed)+" " + rotate + " " + rotate + ")");

      // `translate(${-((rows * blockSize - this.size) / 2)} ${(rows * blockSize - this.size) /2}) rotate(60 ${blockSize * rows /2}} ${blockSize * rows / 2})`
    for (let i = 0; i < columns; i++) {
      //noprotect
      for (let j = 0; j < rows; j++) {
        let rect = document.createElementNS(svgns, "rect");
        rect.setAttribute("width", blockSize);
        rect.setAttribute("height", blockSize);
        rect.setAttribute("fill", "rgba(" + getRandomRange(100, 255, (i+1)*(j+1)*1) + "," +  getRandomRange(100, 255, (i+1)*(j+1)*2) + "," + getRandomRange(100, 255, (i+1)*(j+1)*3) + ",1)");
        rect.setAttribute("x", i * blockSize);
        rect.setAttribute("y", j * blockSize);

        g.appendChild(rect);
      }
    }
    box.appendChild(g);

    let overlay = document.createElementNS(svgns, "rect");
    overlay.setAttribute("width", this.size);
    overlay.setAttribute("height", this.size);
    overlay.setAttribute("fill", "rgba(" + getRandomRange(50, 255, 1) + "," +  getRandomRange(50, 255, 2) + "," + getRandomRange(50, 255, 3) + ",0.5)");
    overlay.setAttribute("x", 0);
    overlay.setAttribute("y", 0);
    box.appendChild(overlay);

    this.el[0].appendChild(box);

  }
}

export default ProfilePictureController;