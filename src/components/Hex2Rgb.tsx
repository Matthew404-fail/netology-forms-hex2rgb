import { useState } from 'react';

type RGB = {
  r: number;
  g: number;
  b: number;
};

const hexToRgb = (hex: string): RGB => {
  const cleanHex = hex.replace('#', '');

  if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    throw new Error(
      `Неверный формат HEX цвета: ${hex}. Ожидается формат #RRGGBB.`
    );
  }

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return { r, g, b };
};

const INVALID_RGB_TEXT = 'Ошибка!';
const INVALID_RGB_COLOR = 'rgb(233,75,53)';

const Hex2Rgb = () => {
  const [hexColor, setHexColor] = useState<string>('#34495e');
  const [rgbColor, setRgbColor] = useState<string>('rgb(52,73,94)');

  const handleHexColorInputChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => {
    const inputValue = e.currentTarget.value;

    if (inputValue.length > 7) {
      return;
    }

    if (inputValue.length === 7) {
      try {
        const { r, g, b } = hexToRgb(inputValue);
        setRgbColor(`rgb(${r},${g},${b})`);
      } catch {
        setRgbColor(INVALID_RGB_TEXT);
      }
    }

    setHexColor(inputValue);
  };

  return (
    <div
      className="content-wrapper"
      style={{
        backgroundColor:
          rgbColor === INVALID_RGB_TEXT ? INVALID_RGB_COLOR : rgbColor,
      }}
    >
      <input
        type="text"
        id="hex"
        value={hexColor}
        className="hex-input"
        onChange={handleHexColorInputChange}
      />
      <input type="text" id="rgb" readOnly value={rgbColor} />
    </div>
  );
};

export default Hex2Rgb;
