import { PDFDocument } from "pdf-lib";

export function toCurrencyString(value: number) {
  return `$ ${value.toLocaleString("en-CO", { maximumFractionDigits: 2 })}`;
}

export const toExternalLink = (url: string) => {
  window.open(url, "_blank", "noreferrer");
};

interface FileInput {
  src: string;
  title: string;
  id: number;
  rawFile: File;
}

const imageToPdf = async (image: ArrayBuffer): Promise<PDFDocument> => {
  const pdfDoc = await PDFDocument.create();

  const pdfPage = pdfDoc.addPage();
  const { width, height } = pdfPage.getSize();

  const imagePdf = await pdfDoc.embedJpg(image);

  let imageDims = imagePdf.size();
  if (imageDims.width > width || imageDims.height > height) {
    imageDims = imagePdf.scaleToFit(width, height);
  }

  pdfPage.drawImage(imagePdf, {
    x: width / 2 - imageDims.width / 2,
    y: height / 2 - imageDims.height / 2,
    width: imageDims.width,
    height: imageDims.height,
  });

  return pdfDoc;
};

const mergeFiles = async (files: FileInput[]): Promise<Blob> => {
  const pdfDoc = await PDFDocument.create();

  const documents = await Promise.all(
    files.map(async (file) => {
      if (!file.rawFile) {
        const arrayBuffer = await fetch(file.src).then(
          async (response) => await response.arrayBuffer()
        );
        return await PDFDocument.load(arrayBuffer);
      }
      const arrayBuffer = await file.rawFile.arrayBuffer();
      return file.rawFile.type.includes("jpeg")
        ? await imageToPdf(arrayBuffer)
        : await PDFDocument.load(arrayBuffer);
    })
  );

  for (const document of documents) {
    const copiedPages = await pdfDoc.copyPages(
      document,
      document.getPageIndices()
    );
    copiedPages.forEach((page) => pdfDoc.addPage(page));
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};

export const transformFile = async (
  file: FileInput | FileInput[]
): Promise<File | Blob> => {
  if (Array.isArray(file)) {
    if (file.length > 1) {
      return await mergeFiles(file);
    }
    if (file[0].rawFile.type.includes("jpeg")) {
      const imageBuffer = await file[0].rawFile.arrayBuffer();
      const imegePdf = await imageToPdf(imageBuffer);
      const imageBytes = await imegePdf.save();
      return new Blob([imageBytes], { type: "application/pdf" });
    }
    return file[0].rawFile;
  }
  if (file.rawFile) {
    return file.rawFile;
  }
  let blob = await fetch(file.src).then((response) => response.blob());
  return blob;
};
