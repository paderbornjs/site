import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, s as spreadAttributes, b as createAstro, d as renderHead, e as renderComponent } from './astro/server_BKBKwtgL.mjs';
import 'kleur/colors';
import 'html-escaper';
import { A as AstroError, E as ExpectedImageOptions, f as ExpectedImage, r as resolveSrc, i as isRemoteImage, F as FailedToFetchRemoteImageDimensions, g as isESMImportedImage, h as isLocalService, D as DEFAULT_HASH_PROPS, j as InvalidImageService, k as ImageMissingAlt } from './astro/assets-service_D2dK7cWq.mjs';
import '@astrojs/internal-helpers/path';
import 'clsx';
import { ssr, ssrHydrationKey, escape, ssrAttribute } from 'solid-js/web';
import process from 'node:process';
import { createResource } from 'solid-js';
/* empty css                         */

const decoder = new TextDecoder();
const toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
const toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + ("0" + i.toString(16)).slice(-2), "");
const readInt16LE = (input, offset = 0) => {
  const val = input[offset] + input[offset + 1] * 2 ** 8;
  return val | (val & 2 ** 15) * 131070;
};
const readUInt16BE = (input, offset = 0) => input[offset] * 2 ** 8 + input[offset + 1];
const readUInt16LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8;
const readUInt24LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16;
const readInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + (input[offset + 3] << 24);
const readUInt32BE = (input, offset = 0) => input[offset] * 2 ** 24 + input[offset + 1] * 2 ** 16 + input[offset + 2] * 2 ** 8 + input[offset + 3];
const readUInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + input[offset + 3] * 2 ** 24;
const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
  readUInt32LE
};
function readUInt(input, bits, offset, isBigEndian) {
  offset = offset || 0;
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = "readUInt" + bits + endian;
  return methods[methodName](input, offset);
}
function readBox(buffer, offset) {
  if (buffer.length - offset < 4) return;
  const boxSize = readUInt32BE(buffer, offset);
  if (buffer.length - offset < boxSize) return;
  return {
    name: toUTF8String(buffer, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(buffer, boxName, offset) {
  while (offset < buffer.length) {
    const box = readBox(buffer, offset);
    if (!box) break;
    if (box.name === boxName) return box;
    offset += box.size;
  }
}

const BMP = {
  validate: (input) => toUTF8String(input, 0, 2) === "BM",
  calculate: (input) => ({
    height: Math.abs(readInt32LE(input, 22)),
    width: readUInt32LE(input, 18)
  })
};

const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
const ICO = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_ICON;
  },
  calculate(input) {
    const nbImages = readUInt16LE(input, 4);
    const imageSize = getImageSize$1(input, 0);
    if (nbImages === 1) return imageSize;
    const imgs = [imageSize];
    for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
      imgs.push(getImageSize$1(input, imageIndex));
    }
    return {
      height: imageSize.height,
      images: imgs,
      width: imageSize.width
    };
  }
};

const TYPE_CURSOR = 2;
const CUR = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_CURSOR;
  },
  calculate: (input) => ICO.calculate(input)
};

const DDS = {
  validate: (input) => readUInt32LE(input, 0) === 542327876,
  calculate: (input) => ({
    height: readUInt32LE(input, 12),
    width: readUInt32LE(input, 16)
  })
};

const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
  calculate: (input) => ({
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6)
  })
};

const brandMap = {
  avif: "avif",
  mif1: "heif",
  msf1: "heif",
  // hief-sequence
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  // heic-sequence
  hevx: "heic"
  // heic-sequence
};
function detectBrands(buffer, start, end) {
  let brandsDetected = {};
  for (let i = start; i <= end; i += 4) {
    const brand = toUTF8String(buffer, i, i + 4);
    if (brand in brandMap) {
      brandsDetected[brand] = 1;
    }
  }
  if ("avif" in brandsDetected) {
    return "avif";
  } else if ("heic" in brandsDetected || "heix" in brandsDetected || "hevc" in brandsDetected || "hevx" in brandsDetected) {
    return "heic";
  } else if ("mif1" in brandsDetected || "msf1" in brandsDetected) {
    return "heif";
  }
}
const HEIF = {
  validate(buffer) {
    const ftype = toUTF8String(buffer, 4, 8);
    const brand = toUTF8String(buffer, 8, 12);
    return "ftyp" === ftype && brand in brandMap;
  },
  calculate(buffer) {
    const metaBox = findBox(buffer, "meta", 0);
    const iprpBox = metaBox && findBox(buffer, "iprp", metaBox.offset + 12);
    const ipcoBox = iprpBox && findBox(buffer, "ipco", iprpBox.offset + 8);
    const ispeBox = ipcoBox && findBox(buffer, "ispe", ipcoBox.offset + 8);
    if (ispeBox) {
      return {
        height: readUInt32BE(buffer, ispeBox.offset + 16),
        width: readUInt32BE(buffer, ispeBox.offset + 12),
        type: detectBrands(buffer, 8, metaBox.offset)
      };
    }
    throw new TypeError("Invalid HEIF, no size found");
  }
};

const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  // m => 16 x 16
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  // s => 16 x 16
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  // l => 32 x 32
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  // h => 48 x 48
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  // . => 64 x 64
  icp6: 64,
  ic12: 32,
  // t => 128 x 128
  it32: 128,
  t8mk: 128,
  ic07: 128,
  // . => 256 x 256
  ic08: 256,
  ic13: 256,
  // . => 512 x 512
  ic09: 512,
  ic14: 512,
  // . => 1024 x 1024
  ic10: 1024
};
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate: (input) => toUTF8String(input, 0, 4) === "icns",
  calculate(input) {
    const inputLength = input.length;
    const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    let imageHeader = readImageHeader(input, imageOffset);
    let imageSize = getImageSize(imageHeader[0]);
    imageOffset += imageHeader[1];
    if (imageOffset === fileLength) return imageSize;
    const result = {
      height: imageSize.height,
      images: [imageSize],
      width: imageSize.width
    };
    while (imageOffset < fileLength && imageOffset < inputLength) {
      imageHeader = readImageHeader(input, imageOffset);
      imageSize = getImageSize(imageHeader[0]);
      imageOffset += imageHeader[1];
      result.images.push(imageSize);
    }
    return result;
  }
};

const J2C = {
  // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
  validate: (input) => toHexString(input, 0, 4) === "ff4fff51",
  calculate: (input) => ({
    height: readUInt32BE(input, 12),
    width: readUInt32BE(input, 8)
  })
};

const JP2 = {
  validate(input) {
    if (readUInt32BE(input, 4) !== 1783636e3 || readUInt32BE(input, 0) < 1) return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    return readUInt32BE(input, ftypBox.offset + 4) === 1718909296;
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
const JPG = {
  validate: (input) => toHexString(input, 0, 2) === "ffd8",
  calculate(input) {
    input = input.slice(4);
    let orientation;
    let next;
    while (input.length) {
      const i = readUInt16BE(input, 0);
      if (input[i] !== 255) {
        input = input.slice(1);
        continue;
      }
      if (isEXIF(input)) {
        orientation = validateExifBlock(input, i);
      }
      validateInput(input, i);
      next = input[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(input, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      input = input.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};

const KTX = {
  validate: (input) => {
    const signature = toUTF8String(input, 1, 7);
    return ["KTX 11", "KTX 20"].includes(signature);
  },
  calculate: (input) => {
    const type = input[5] === 49 ? "ktx" : "ktx2";
    const offset = type === "ktx" ? 36 : 20;
    return {
      height: readUInt32LE(input, offset + 4),
      width: readUInt32LE(input, offset),
      type
    };
  }
};

const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(input) {
    if (pngSignature === toUTF8String(input, 1, 8)) {
      let chunkName = toUTF8String(input, 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = toUTF8String(input, 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(input) {
    if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
      return {
        height: readUInt32BE(input, 36),
        width: readUInt32BE(input, 32)
      };
    }
    return {
      height: readUInt32BE(input, 20),
      width: readUInt32BE(input, 16)
    };
  }
};

const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: parseInt(dimensions[1], 10),
        width: parseInt(dimensions[0], 10)
      };
    } else {
      throw new TypeError("Invalid PNM");
    }
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    } else {
      throw new TypeError("Invalid PAM");
    }
  }
};
const PNM = {
  validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
  calculate(input) {
    const signature = toUTF8String(input, 0, 2);
    const type = PNMTypes[signature];
    const lines = toUTF8String(input, 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};

const PSD = {
  validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
  calculate: (input) => ({
    height: readUInt32BE(input, 14),
    width: readUInt32BE(input, 18)
  })
};

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/i,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  in: 96,
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72,
  px: 1
};
const unitsReg = new RegExp(
  `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
);
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = root.match(extractorRegExps.width);
  const height = root.match(extractorRegExps.height);
  const viewbox = root.match(extractorRegExps.viewbox);
  return {
    height: height && parseLength(height[2]),
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  // Scan only the first kilo-byte to speed up the check on larger files
  validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
  calculate(input) {
    const root = toUTF8String(input).match(extractorRegExps.root);
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};

const TGA = {
  validate(input) {
    return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 14),
      width: readUInt16LE(input, 12)
    };
  }
};

function readIFD(input, isBigEndian) {
  const ifdOffset = readUInt(input, 32, 4, isBigEndian);
  return input.slice(ifdOffset + 2);
}
function readValue(input, isBigEndian) {
  const low = readUInt(input, 16, 8, isBigEndian);
  const high = readUInt(input, 16, 10, isBigEndian);
  return (high << 16) + low;
}
function nextTag(input) {
  if (input.length > 24) {
    return input.slice(12);
  }
}
function extractTags(input, isBigEndian) {
  const tags = {};
  let temp = input;
  while (temp && temp.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) {
      break;
    } else {
      if (length === 1 && (type === 3 || type === 4)) {
        tags[code] = readValue(temp, isBigEndian);
      }
      temp = nextTag(temp);
    }
  }
  return tags;
}
function determineEndianness(input) {
  const signature = toUTF8String(input, 0, 2);
  if ("II" === signature) {
    return "LE";
  } else if ("MM" === signature) {
    return "BE";
  }
}
const signatures = [
  // '492049', // currently not supported
  "49492a00",
  // Little endian
  "4d4d002a"
  // Big Endian
  // '4d4d002a', // BigTIFF > 4GB. currently not supported
];
const TIFF = {
  validate: (input) => signatures.includes(toHexString(input, 0, 4)),
  calculate(input) {
    const isBigEndian = determineEndianness(input) === "BE";
    const ifdBuffer = readIFD(input, isBigEndian);
    const tags = extractTags(ifdBuffer, isBigEndian);
    const width = tags[256];
    const height = tags[257];
    if (!width || !height) {
      throw new TypeError("Invalid Tiff. Missing tags");
    }
    return { height, width };
  }
};

function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
const WEBP = {
  validate(input) {
    const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
    const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
    const vp8Header = "VP8" === toUTF8String(input, 12, 15);
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(input) {
    const chunkHeader = toUTF8String(input, 12, 16);
    input = input.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = input[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(input);
      } else {
        throw new TypeError("Invalid WebP");
      }
    }
    if (chunkHeader === "VP8 " && input[0] !== 47) {
      return calculateLossy(input);
    }
    const signature = toHexString(input, 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(input);
    }
    throw new TypeError("Invalid WebP");
  }
};

const typeHandlers = /* @__PURE__ */ new Map([
  ["bmp", BMP],
  ["cur", CUR],
  ["dds", DDS],
  ["gif", GIF],
  ["heif", HEIF],
  ["icns", ICNS],
  ["ico", ICO],
  ["j2c", J2C],
  ["jp2", JP2],
  ["jpg", JPG],
  ["ktx", KTX],
  ["png", PNG],
  ["pnm", PNM],
  ["psd", PSD],
  ["svg", SVG],
  ["tga", TGA],
  ["tiff", TIFF],
  ["webp", WEBP]
]);
const types = Array.from(typeHandlers.keys());

const firstBytes = /* @__PURE__ */ new Map([
  [56, "psd"],
  [66, "bmp"],
  [68, "dds"],
  [71, "gif"],
  [73, "tiff"],
  [77, "tiff"],
  [82, "webp"],
  [105, "icns"],
  [137, "png"],
  [255, "jpg"]
]);
function detector(input) {
  const byte = input[0];
  const type = firstBytes.get(byte);
  if (type && typeHandlers.get(type).validate(input)) {
    return type;
  }
  return types.find((fileType) => typeHandlers.get(fileType).validate(input));
}

const globalOptions = {
  disabledTypes: []
};
function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    if (globalOptions.disabledTypes.indexOf(type) > -1) {
      throw new TypeError("disabled file type: " + type);
    }
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}

async function probe(url) {
  const response = await fetch(url);
  if (!response.body || !response.ok) {
    throw new Error("Failed to fetch image");
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done) break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = lookup(accumulatedChunks);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch (error) {
      }
    }
  }
  throw new Error("Failed to parse the size");
}

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      './astro/assets-service_D2dK7cWq.mjs'
    ).then(n => n.s).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset) globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: await resolveSrc(options.src)
  };
  if (options.inferSize && isRemoteImage(resolvedOptions.src)) {
    try {
      const result = await probe(resolvedOptions.src);
      resolvedOptions.width ??= result.width;
      resolvedOptions.height ??= result.height;
      delete resolvedOptions.inferSize;
    } catch {
      throw new AstroError({
        ...FailedToFetchRemoteImageDimensions,
        message: FailedToFetchRemoteImageDimensions.message(resolvedOptions.src)
      });
    }
  }
  const originalFilePath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : void 0;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(
      validatedOptions,
      propsToHash,
      originalFilePath
    );
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalFilePath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$1 = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "/Users/christoph/repos/paderbornjs/node_modules/astro/components/Image.astro", void 0);

const $$Astro = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const scopedStyleClass = props.class?.match(/\bastro-\w{8}\b/)?.[0];
  if (scopedStyleClass) {
    if (pictureAttributes.class) {
      pictureAttributes.class = `${pictureAttributes.class} ${scopedStyleClass}`;
    } else {
      pictureAttributes.class = scopedStyleClass;
    }
  }
  for (const key in props) {
    if (key.startsWith("data-astro-cid")) {
      pictureAttributes[key] = props[key];
    }
  }
  const originalSrc = await resolveSrc(props.src);
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({
        ...props,
        src: originalSrc,
        format,
        widths: props.widths,
        densities: props.densities
      })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(originalSrc) && specialFormatsFallback.includes(originalSrc.format)) {
    resultFallbackFormat = originalSrc.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "/Users/christoph/repos/paderbornjs/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					const getImage = async (options) => await getImage$1(options, imageConfig);

var _tmpl$ = ["<div", ' class="inner-section"><h2>Next event: Not planned</h2><div>Please check back at a later date</div></div>'], _tmpl$2 = ["<div", ' class="inner-section next-event"><h2>Next event on <em>', '</em></h2><div class="venue"><a href="', '" rel="noopener" title="Plan your route"><svg class="map" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 887.59 776.14"><defs><linearGradient id="a" x1="148.9" x2="148.9" y1="776.1" y2="47.1" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="gray" stop-opacity=".3"></stop><stop offset=".5" stop-color="gray" stop-opacity=".1"></stop><stop offset="1" stop-color="gray" stop-opacity=".1"></stop></linearGradient><linearGradient id="c" x1="446.7" x2="446.7" y1="776.1" y2="47.1" href="#a"></linearGradient><linearGradient id="d" x1="741.6" x2="741.6" y1="776.1" y2="47.1" href="#a"></linearGradient><linearGradient id="b" x1="889.9" x2="889.9" y1="282.7" y2="61.9" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#b3b3b3" stop-opacity=".3"></stop><stop offset=".5" stop-color="#b3b3b3" stop-opacity=".1"></stop><stop offset="1" stop-color="#b3b3b3" stop-opacity=".1"></stop></linearGradient><linearGradient id="e" x1="733.7" x2="733.7" y1="87.3" y2="44.5" gradientUnits="userSpaceOnUse"><stop offset="0" stop-opacity=".1"></stop><stop offset=".6" stop-opacity=".1"></stop><stop offset="1" stop-opacity="0"></stop></linearGradient></defs><path fill="url(#a)" d="M297.8 748.2L0 776.1v-701l297.8-28v701.1z"></path><path fill="url(#c)" d="M297.8 748.2l297.8 27.9v-701l-297.8-28v701.1z"></path><path fill="url(#d)" d="M887.6 748.2l-292 27.9v-701l292-28v701.1z"></path><path fill="hsl(199, 38%, 98%)" d="M298.9 728.7L9.5 755.6V82l289.4-26.9v673.6z"></path><path fill="hsl(199, 40%, 100%)" d="M298.9 728.7l289.3 26.9V82L298.9 55.1v673.6z"></path><path fill="hsl(199, 38%, 98%)" d="M877.6 728.7l-289.4 26.9V82l289.4-26.9v673.6z"></path><path fill="hsl(219, 80%, 68%)" d="M298.9 116.9l-219.8 7.8v101.1h186.6v-36.5l33.2-1.2 50.6 15.6v-71.1l-50.6-15.7zM298.9 682.9L52.2 706.6v-90.2l246.7-23.7v90.2z" opacity=".3"></path><path fill="hsl(219, 70%, 50%)" d="M432.6 613.3l107 9.4-1.4 82.4-107-9.4z" opacity=".3"></path><path fill="hsl(219, 80%, 68%)" d="M841 688.6l-167 20.1-3.8-109 167-20.2 3.8 109z" opacity=".3"></path><g fill="none" stroke="hsl(54, 100%, 22%)" stroke-miterlimit="10" stroke-width="11" opacity=".4" class="path"><path d="M175.5 649.6l4.7-3.7"></path><path stroke-dasharray="11.3 11.3" d="M188.9 638.7l100.9-82.3"></path><path d="M294.2 552.8l4.7-3.8 5.8 1.3"></path><path stroke-dasharray="12.4 12.4" d="M316.9 552.9l115.5 24.6"></path><path d="M438.5 578.8l5.8 1.3 1.7-5.8"></path><path stroke-dasharray="12.2 12.2" d="M449.4 562.6l113.3-391.5"></path><path d="M564.4 165.2l1.7-5.8 5.5 2.5"></path><path stroke-dasharray="11.6 11.6" d="M582.2 166.6L704 221"></path><path d="M709.3 223.4l5.5 2.4"></path></g><g transform="translate(0 110)"><path fill="url(#b)" d="M958.3 132.8c0 39-68.4 149.9-68.4 149.9s-68.4-110.8-68.4-150S852.1 62 890 62s68.4 31.7 68.4 70.9z" transform="translate(-156.2 -62)"></path><ellipse cx="733.7" cy="65.9" fill="url(#e)" rx="20.7" ry="21.4"></ellipse><path fill="hsl(219, 80%, 68%)" d="M797 71c0 35-63.3 133.9-63.3 133.9s-63.3-99-63.3-134A63.3 63.3 0 1 1 797 71z"></path><circle cx="733.7" cy="66.5" r="19.1" fill="#fff"></circle></g></svg></a><div class="flex"><b>Location</b><div>', "</div><div>", "</div><!--$-->", '<!--/--></div></div><div class="flex"><a class="cta"', '>Sign up</a><div class="going">(<!--$-->', "<!--/--> people going)</div></div></div>"], _tmpl$3 = ["<div", ">", "</div>"];
function NextEvent() {
  const [data] = createResource(() => process.env.DEPLOY_URL ? fetch(`${process.env.DEPLOY_URL}/api/meetup`).then((result) => result.json()) : Promise.resolve(void 0));
  const response = data();
  const nextEvent = response ? response.sort((a, b) => a.time - b.time).shift() : null;
  if (!nextEvent) {
    return ssr(_tmpl$, ssrHydrationKey());
  }
  const {
    link,
    time,
    venue,
    yes_rsvp_count: going
  } = nextEvent;
  const todayDate = /* @__PURE__ */ new Date();
  const eventDate = new Date(time);
  const isEventToday = todayDate.getMonth() === eventDate.getMonth() && todayDate.getDate() === eventDate.getDate();
  return ssr(_tmpl$2, ssrHydrationKey(), isEventToday ? "Today 7pm" : escape(eventDate.toLocaleString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric"
  })), `https://www.google.com/maps/dir//${escape(venue.name, true)},${escape(venue.address_1, true)},${escape(venue.city, true)}/@${escape(venue.lat, true)},${escape(venue.lon, true)},14z`, escape(venue.name), escape(venue.address_1), venue.city !== "Paderborn" && ssr(_tmpl$3, ssrHydrationKey(), escape(venue.city)), ssrAttribute("href", escape(link, true), false), escape(going));
}

const faviconSrc = new Proxy({"src":"/_astro/favicon.BWfy6OH2.png","width":512,"height":512,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/christoph/repos/paderbornjs/src/images/favicon.png";
							}
							if (target[name] !== undefined) globalThis.astroAsset.referencedImages.add("/Users/christoph/repos/paderbornjs/src/images/favicon.png");
							return target[name];
						}
					});

const faviconSvgSrc = new Proxy({
  "src": "/_astro/favicon.X1yv8RJq.svg",
  "width": 630,
  "height": 630,
  "format": "svg"
}, {
  get(target, name, receiver) {
    if (name === 'clone') {
      return structuredClone(target);
    }
    if (name === 'fsPath') {
      return "/Users/christoph/repos/paderbornjs/src/images/favicon.svg";
    }
    if (target[name] !== undefined) globalThis.astroAsset.referencedImages.add("/Users/christoph/repos/paderbornjs/src/images/favicon.svg");
    return target[name];
  }
});

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const appleTouchIcon = await getImage({
    src: faviconSrc,
    width: 180,
    height: 180,
    format: "png"
  });
  const faviconSvg = await getImage({ src: faviconSvgSrc, format: "svg" });
  return renderTemplate`<html lang="en" data-astro-cid-j7pv25f6> <head><meta charset="utf-8"><meta name="robots" content="index, follow"><meta name="keywords" content="javascript,js,typescript,ts,web,html,css,browser,api,meetup,usergroup,conference,talks,presentations,paderborn,tech,technology,programming,coding,diversity,help,teaching,learning"><meta name="description" content="Paderborn.js is a usergroup focused on JavaScript and related topics. We meet regularly on the 4th Monday of every month."><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico" sizes="32x32"><link rel="icon"${addAttribute(faviconSvg.src, "href")} type="image/svg+xml"><link rel="apple-touch-icon"${addAttribute(appleTouchIcon.src, "href")}><meta name="msapplication-TileColor" content="#da532c"><meta name="theme-color" content="#f7e11d"><meta property="og:image:width" content="512"><meta property="og:image:height" content="512"><meta property="og:title" content="Paderborn.js"><meta property="og:description" content="Paderborn.js is a usergroup focused on JavaScript and related topics."><meta property="og:url" content="https://paderbornjs.org/"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="theme-color" content="#000000"><link rel="manifest" href="/manifest.json"><title>Paderborn.js</title>${renderHead()}</head> <body data-astro-cid-j7pv25f6> <header data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6> <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="20 0 2810 630" role="img" aria-labelledby="paderbornjs-title" data-astro-cid-j7pv25f6> <g class="wordmark" transform="scale(16) translate(-20 -1)" data-astro-cid-j7pv25f6> <path d="M21.648236 30.914583V15.561694h4.244622q3.206045 0 5.034845 1.580445 1.8288 1.580444 1.8288 4.357511 0 2.777066-1.8288 4.357511-1.8288 1.557867-5.034845 1.557867h-1.083733v3.499555zm3.160889-6.276622h.993422q1.919111 0 2.799644-.767645.903112-.790222.903112-2.370666 0-3.160889-3.702756-3.160889h-.993422zM32.425597 30.914583l6.750756-15.488355h.270933l7.021689 15.488355h-3.318934l-.722488-1.738489h-6.231467l-.722489 1.738489zm4.831644-4.380089h4.041423l-1.106311-2.664178q-.2032-.474133-.428978-1.151466-.225778-.699911-.361245-1.151467l-.135466-.451555q-.451556 1.670755-.903111 2.754488zM48.547541 30.914583V15.561694h4.718756q3.544711 0 5.802489 2.144889 2.280355 2.144889 2.280355 5.531556 0 3.386666-2.257777 5.531555-2.257778 2.144889-5.825067 2.144889zm3.160889-2.777067h1.399822q2.460978 0 3.702756-1.332088 1.264355-1.332089 1.264355-3.567289t-1.264355-3.567289q-1.241778-1.332089-3.702756-1.332089H51.70843zM64.025666 30.914583V15.561694h10.16v2.777067h-6.999111v4.8768h6.163733v2.709333h-6.163733v2.212622h7.3152v2.777067zM85.581796 26.128094l3.18347 4.786489h-3.6576l-2.52871-3.883378q-.42898.06773-.90311.06773h-1.08374v3.815644h-3.160884V15.561694h4.244624q3.2512 0 5.05742 1.512711 1.80622 1.490134 1.80622 4.289778 0 3.431822-2.95769 4.763911zm-4.98969-1.783644h.99343q1.96426 0 2.82222-.677334.88053-.699911.88053-2.302933t-.90311-2.302933q-.88053-.722489-2.79964-.722489h-.99343zM91.277756 30.914583V15.561694h5.93795q2.07716 0 3.27378 1.151467 1.19662 1.128889 1.19662 2.822222 0 2.122311-2.16746 2.822222 3.11573.745067 3.11573 3.815645 0 2.099733-1.39982 3.431822-1.37725 1.309511-3.74791 1.309511zm3.16089-9.685867h2.4384q.76764 0 1.2192-.383822.47413-.4064.47413-1.061155 0-.677334-.4064-1.061156t-1.12889-.383822h-2.59644zm0 6.9088h2.91253q.94827 0 1.51271-.587022.58702-.587022.58702-1.535289 0-.948266-.6096-1.512711-.6096-.587022-1.67075-.587022h-2.73191zM118.108616 28.882583q-2.30293 2.2352-5.64444 2.2352-3.34151 0-5.64445-2.2352-2.30293-2.257778-2.30293-5.644444 0-3.386667 2.30293-5.621867 2.30294-2.257778 5.64445-2.257778t5.64444 2.257778q2.30293 2.2352 2.30293 5.621867 0 3.386666-2.30293 5.644444zm-9.03111-2.032q1.30951 1.444978 3.38667 1.444978 2.07715 0 3.38666-1.444978t1.30951-3.612444q0-2.167467-1.30951-3.612445-1.30951-1.444978-3.38666-1.444978-2.07716 0-3.38667 1.444978t-1.30951 3.612445q0 2.167466 1.30951 3.612444zM131.266516 26.128094l3.18347 4.786489h-3.6576l-2.52871-3.883378q-.42898.06773-.90311.06773h-1.08374v3.815644h-3.16089V15.561694h4.24463q3.2512 0 5.05742 1.512711 1.80622 1.490134 1.80622 4.289778 0 3.431822-2.95769 4.763911zm-4.98969-1.783644h.99343q1.96426 0 2.82222-.677334.88053-.699911.88053-2.302933t-.90311-2.302933q-.88053-.722489-2.79964-.722489h-.99343zM149.267366 31.05005l-7.74418-7.270045q-.33867-.316089-.8128-.835377-.45156-.541867-.74507-.903112l-.27093-.361244q.22578 1.693333.22578 2.799644v6.434667h-2.95769V15.426228h.31609l7.74418 7.270044q.33866.316089.79022.835378.45155.519289.74506.880533l.27094.383822q-.2032-1.738489-.2032-2.799644v-6.434667h2.95769V31.05005z" data-astro-cid-j7pv25f6></path> </g> <g class="logomark" transform="translate(2200)" data-astro-cid-j7pv25f6> <rect x="0" y="0" width="630" height="630" fill="#f7df1e" data-astro-cid-j7pv25f6></rect> <path d="m 165.65,526.47375 48.2125,-29.1775 C 223.16375,513.7875 231.625,527.74 251.92,527.74 c 19.45375,0 31.71875,-7.60975 31.71875,-37.21 l 0,-201.3 59.20375,0 0,202.1375 c 0,61.32 -35.94375,89.23125 -88.385,89.23125 -47.36125,0 -74.8525,-24.52875 -88.8075,-54.13" data-astro-cid-j7pv25f6></path> <path d="m 375,520.13 48.20625,-27.91125 c 12.69,20.72375 29.1825,35.9475 58.36125,35.9475 24.53125,0 40.17375,-12.26475 40.17375,-29.18125 0,-20.29875 -16.06875,-27.48875 -43.135,-39.32625 l -14.7975,-6.3475 c -42.715,-18.18125 -71.05,-41.0175 -71.05,-89.2275 0,-44.40375 33.83125,-78.2375 86.695,-78.2375 37.6375,0 64.7025,13.11125 84.15375,47.36625 l -46.09625,29.60125 c -10.15,-18.1825 -21.1425,-25.37125 -38.0575,-25.37125 -17.33875,0 -28.335,10.995 -28.335,25.37125 0,17.7625 10.99625,24.9525 36.3675,35.94875 l 14.8,6.3425 c 50.325,21.56875 78.66,43.5575 78.66,93.03375 0,53.2875 -41.86625,82.465 -98.11,82.465 -54.97625,0 -90.5,-26.2175 -107.83625,-60.47375" data-astro-cid-j7pv25f6></path> </g> </svg> </h1> </header> <main data-astro-cid-j7pv25f6> <section data-bright data-astro-cid-j7pv25f6> ${renderComponent($$result, "NextEvent", NextEvent, { "data-astro-cid-j7pv25f6": true })} </section> <section data-astro-cid-j7pv25f6> <div class="inner-section" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>About Paderborn.js</h2> <div data-astro-cid-j7pv25f6> <p data-astro-cid-j7pv25f6>
Paderborn.js meets regularly at <a href="https://enpit.de/" rel="noopener" data-astro-cid-j7pv25f6>Enpit</a> in Paderborn.
</p> <p data-astro-cid-j7pv25f6>
We welcome a diverse range of topics that are related JavaScript
              software engineering. Sometimes we host talks, sometimes it's just
              a get together to socialice between like-minded individuals,
              getting to know each other.
</p> <p data-astro-cid-j7pv25f6>
If you have an idea about a talk or topic you aren’t sure about,
              just reach out or add it as an issue in our Paderborn.js <a href="https://github.com/paderbornjs/talks" color="blue" data-astro-cid-j7pv25f6>talks repository</a>!
</p> <p data-astro-cid-j7pv25f6>
Join the <a href="https://meetup.com/paderborn-js" color="blue" data-astro-cid-j7pv25f6>Meetup group</a> to get in contact with the community and sign up to our events.
</p> <p data-astro-cid-j7pv25f6>
We look forward to hearing from you, and to seeing you at an
              upcoming event!
</p> </div> </div> </section> <section data-bright data-astro-cid-j7pv25f6> <div class="inner-section" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>The team</h2> <div class="team" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Janis</h3><img src="janis.jpg" data-astro-cid-j7pv25f6><p data-astro-cid-j7pv25f6>
Software Developer at <a href="https://enpit.de" rel="noopener" data-astro-cid-j7pv25f6>enpit</a>. Likes to solve scaling and performance problems when
                bouldering.
</p> </div> <div data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Christoph</h3><img src="christoph.jpg" data-astro-cid-j7pv25f6><p data-astro-cid-j7pv25f6>
Director UI Engineering at <a href="https://smartclip.tv" rel="noopener" data-astro-cid-j7pv25f6>smartclip</a>. Open source contributor and maintainer, <a href="https://codepunkt.de" rel="noopener" data-astro-cid-j7pv25f6>blogger</a> and <a href="https://web-security.de" rel="noopener" data-astro-cid-j7pv25f6>web security</a> consultant.
</p> </div> </div> </div> </section> <section data-astro-cid-j7pv25f6> <div class="inner-section" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Code of Conduct</h2> <div data-astro-cid-j7pv25f6> <p data-astro-cid-j7pv25f6>
This meetup’s primary goal is to have an awesome, inclusive and
              safe community meetup where people meet, hang out together, chat,
              listen to talks, exchange ideas and make new friends.
</p> <p data-astro-cid-j7pv25f6>
We invite all those who participate in our events to help us
              create a safe and positive experience for everyone. Any harmful or
              discriminating behaviour will not be tolerated. We reserve the
              right to exclude people from the events.
</p> <p data-astro-cid-j7pv25f6>
For details on what kinds of behaviour are not tolerated and
              consequences for violating these rules, we refer to the <a href="http://berlincodeofconduct.org/" color="blue" data-astro-cid-j7pv25f6>Berlin Code of Conduct</a>.
</p> </div> </div> </section> <section data-bright data-astro-cid-j7pv25f6> <div class="inner-section sponsors" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Sponsors</h2> <div data-astro-cid-j7pv25f6> <a href="https://enpit.de" rel="noopener" data-astro-cid-j7pv25f6><img src="enpit.png" data-astro-cid-j7pv25f6></a> <div data-astro-cid-j7pv25f6>Event hosting, Meetup group</div> </div> </div> </section> </main>  </body></html>`;
}, "/Users/christoph/repos/paderbornjs/src/pages/index.astro", void 0);

const $$file = "/Users/christoph/repos/paderbornjs/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
