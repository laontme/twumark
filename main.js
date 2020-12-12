document.getElementsByTagName('button')[0].addEventListener('click', getReason);

function getReason() {
  let crash = document.getElementById('raw').value.split('\n');
  const exceptionAddress = parseInt(crash[1].replace('Exception At Address: ', ''));

  let modulesLine;

  crash.forEach((el, i) => {
    if (el.trim() == 'Loaded Modules:') {
      modulesLine = i + 1;
    }
  });

  crash.splice(0, modulesLine);
  crash.pop();
  let crashNew = [];

  crash.forEach((el, i) => {
    crashNew.push(el.split('\t'));
  });
  crash = undefined;
  crash = [];
  crashNew.forEach((el) => {
    el.shift();
    el.b = parseInt(el[0].replace('B: ', ''));
    el.shift();
    el.s = parseInt(el[0].replace('S: ', ''));
    el.shift();
    el.path = el[0].replace('\r', '');
    el.shift();
    crash.push(Object.assign({}, el));
  });

  crash.forEach((el, i) => {
    if (exceptionAddress > el.b) {
      if (exceptionAddress < el.b + el.s) {
        console.log(el.path);
        document.getElementById('reason').value = el.path;
      }
    }
  });
}
