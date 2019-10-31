const noteSize = 220;
const dragService = {
  center() {
    return {
      x: window.innerWidth / 2 - noteSize / 2,
      y: window.innerHeight / 2 - noteSize / 2
    };
  },
  calculatePosition(position, oldX, oldY) {
    const shift = noteSize - 10 - 13; // 10 is padding, 13 half of icon size

    const w = window.innerWidth;
    const h = window.innerHeight;
    let x = position.x - shift;
    let y = position.y - shift;
    if (x < 0 || x + noteSize > w) {
      x = oldX;
    }
    if (y < 0 || y + noteSize > h) {
      y = oldY;
    }
    return { x, y };
  }
};

export default dragService;
