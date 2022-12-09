$(".infoAuthor").click(function() {
  $(".infoAuthor_text").toggle('show')
})

$(".infoTheme").click(function() {
  $(".infoTheme_text").toggle('show')
})

$(".infoVariant").click(function() {
  $(".infoVariant_text").toggle('show')
})

function Example() {
  document.querySelector('.alphabet').value = "a, b, c";
  document.querySelector('.startChain').value = "aa";
  document.querySelector('.endChain').value = "bb";
  document.querySelector('.multiplicity').value = "6";
}

function unique(A) {
  var n = A.length;
  for (var i = 0; i < n - 1; i++) {
    for (var j = i + 1; j < n; j++) { if (A[i] === A[j]) return false; }
  }
  return true;
}

function Func() {
  let alphabet = document.querySelector('.alphabet').value;
  let startChain = document.querySelector('.startChain').value;
  let endChain = document.querySelector('.endChain').value;
  let multiplicity = document.querySelector('.multiplicity').value;
  let arrAlphabet = alphabet.split(", ");

  let flagStart = true;
  let flag_in = false;
  let podstrlen = 0;
  let arrTerSym = [];
  let arrRules = [];
  let arrTemp = [];

  for (let i = 0; i < startChain.length; i++) {
    flag_in = true;
    let a = startChain.slice(-(startChain.length - i));
    let l = a.length;
    for (let j = 0; j < l; j++) {
      if (endChain[j] != a[j]) {
        flag_in = false;
        break;
      }
    }
    if (flag_in) {
      podstrlen = l;
      break;
    }
  }

  if ((startChain.length + endChain.length - podstrlen) > multiplicity) {
    alert("Error of input1");
    flagStart = false;
  }

  if (!unique(arrAlphabet)) {
    alert("Символы языка должны быть уникальны!");
    flagStart = false;
  }

  let flag = true; // флаг что элементы подцепочек входят в язык
  for (let i = 0; i < startChain.length; i++)
    if (!arrAlphabet.includes(startChain[i]))
      flag = false;

  for (let i = 0; i < endChain.length; i++)
    if (!arrAlphabet.includes(endChain[i]))
      flag = false;

  if (!flag) {
    alert("Error of input2");
    flagStart = false;
  }

  let arrState = ["S", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "T", "U", "V", "W", "X", "Y", "Z"];

  outputTextarea = document.querySelector('.main_output_textarea');
  outputTextarea.value = "";

  if (alphabet != "" && startChain != "" && endChain != "" && multiplicity != "" && flagStart) {

    outputTextarea = document.querySelector('.main_output_textarea');
    outPut = document.querySelector('.main_output');

    outputTextarea.style.display = 'block';
    outPut.style.display = 'block';
    outputTextarea.value = 'Регулярная грамматика:\n';

    let index = 0;
    for (let i = 0; i < startChain.length; i++) {
      arrTerSym.push(arrState[index]);
      arrTemp.push(startChain[i] + arrState[index + 1]);
      arrRules.push(arrTemp);
      arrTemp = [];
      outputTextarea.value += `${arrState[index]}->${startChain[i]}${arrState[index + 1]}\n`;
      index++;
    }
    let arrComb = [];
    let tempStr = "";
    outputTextarea.value += `${arrState[index]}->`;
    for (let i = 0; i < arrAlphabet.length; i++) {
      outputTextarea.value += `${arrAlphabet[i]}${arrState[index]} | `;
      arrComb.push(arrAlphabet[i]);
      tempStr += `${arrAlphabet[i]}${arrState[index]} | `;
    }

    arrTerSym.push(arrState[index]);
    index++;
    outputTextarea.value += `${arrState[index]}\n`;
    tempStr += `${arrState[index]}`;

    arrTemp = tempStr.split(" | ");
    arrRules.push(arrTemp);
    arrTemp = [];

    for (let i = 0; i < endChain.length; i++) {

      if (podstrlen == 0) {
        if (i != endChain.length - 1) {
          outputTextarea.value += `${arrState[index]}->${endChain[i]}${arrState[index + 1]}\n`;
          arrTemp.push(endChain[i] + arrState[index + 1]);
          arrRules.push(arrTemp);
          arrTemp = [];
        }

        else {
          outputTextarea.value += `${arrState[index]}->${endChain[i]}\n`;
          arrTemp.push(endChain[i]);
          arrRules.push(arrTemp);
          arrTemp = [];
        }
      }

      else {
        if (i != podstrlen) {
          outputTextarea.value += `${arrState[index]}->${arrState[index + 1]}\n`;
          arrTemp.push(endChain[i] + arrState[index + 1]);
          arrRules.push(arrTemp);
          arrTemp = [];
        }
        else {
          outputTextarea.value += `${arrState[index]}->${endChain[i]}\n`;
        }
        arrTerSym.push(arrState[index]);

        index++;
      }

    }

    let sizePlace = multiplicity - startChain.length - endChain.length + podstrlen;
    let numberOfStr = Math.pow(arrAlphabet.length, sizePlace); // kolvo str in
    let StrIn = [];  //[numberOfStr] // mas s str
    for (let i = 0; i < numberOfStr; i++) {
      StrIn[i] = "";
    }
    let alphInd = 0; // tec symb
    let strInd = 0; // zapis el
    let division = numberOfStr; // count
    let countDiv = 0;

    for (let i = 0; i < sizePlace; i++) {
      division /= arrAlphabet.length;
      strInd = 0;
      countDiv = 0;
      for (let j = 0; j < numberOfStr; j++) {
        StrIn[j] += arrAlphabet[strInd];
        countDiv++;
        if(countDiv >= division){
          countDiv = 0;
          strInd++;
          if(strInd > arrAlphabet.length - 1)
            strInd = 0;
        }
      }
    }
    console.log(StrIn);
  }
}

