var url = './Briefing_LB1-10_abLT37-WT40_2022_DE_EN_211112.pdf';

var PDFJS = window['pdfjs-dist/build/pdf'];

PDFJS.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
var pdfjsWorker = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

let main = document.querySelector('main');

PDFJS.disableTextLayer = true;
PDFJS.disableWorker = true; // not availaible anymore since 2.3.0 (see imports)

const getPageText = async (pdf, pageNo) => {
  const page = await pdf.getPage(pageNo);
  const tokenizedText = await page.getTextContent();
  const pageText = tokenizedText.items.map(token => token.str).join("");
  return pageText;
};

const getPDFText = async (source) => {
  Object.assign(window, {pdfjsWorker});
  const pdf = await PDFJS.getDocument(source).promise;
  const maxPages = pdf.numPages;
  const pageTextPromises = [];
  for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
    pageTextPromises.push(getPageText(pdf, pageNo));
  }
  const pageTexts = await Promise.all(pageTextPromises);
  console.log('pageTexts', pageTexts[0]);
  const arrStr = pageTexts[0].split(' ');
  // console.log(arrStr[0]);
  // return arrStr[0];
  return pageTexts.join(" ");
};

const text = getPDFText(url);
text.then((res) => {
  main.innerHTML = res;
});




