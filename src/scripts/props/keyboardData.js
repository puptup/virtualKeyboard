const lastRow = [
  '{ControlLeft}', '{MetaLeft}', '{AltLeft}', '{Space}', '{AltRight}', '{ArrowLeft}', '{ArrowDown}', '{ArrowRight}', '{ControlRight}',
];
const keys = {
  en: [
    [...'`1234567890-=\\'.split(''), '{back}'],
    ['{tab}', ...'qwertyuiop[]'.split(''), '{del}'],
    ['{caps}', ...'asdfghjkl;\''.split(''), '{enter}'],
    ['{shift}', ...'zxcvbnm,./'.split(''), '{Up}', '{shift}'],
    ['{ctrl}', '{win}', '{alt}', '{}', '{alt}', '{Left}', '{Down}', '{Right}', '{ctrl}'],
  ],
  enShift: [
    [...'~!@#$%^&*()_+|'.split(''), '{Backspace}'],
    ['{Tab}', ...'QWERTYUIOP{}'.split(''), '{Delete}'],
    ['{CapsLock}', ...'ASDFGHJKL:"'.split(''), '{Enter}'],
    ['{ShiftLeft}', ...'ZXCVBNM<>?'.split(''), '{arrowUp}', '{rShift}'],
    lastRow,
  ],
  ru: [
    [...'ё1234567890-=\\'.split(''), '{Backspace}'],
    ['{Tab}', ...'йцукенгшщзхъ'.split(''), '{Delete}'],
    ['{CapsLock}', ...'фывапролджэ'.split(''), '{Enter}'],
    ['{ShiftLeft}', ...'ячсмитьбю.'.split(''), '{arrowUp}', '{rShift}'],
    lastRow,
  ],
  ruShift: [
    [...'Ё!"№;%:?*()_+/'.split(''), '{Backspace}'],
    ['{Tab}', ...'ЙЦУКЕНГШЩЗХЪ'.split(''), '{Delete}'],
    ['{CapsLock}', ...'ФЫВАПРОЛДЖЭ'.split(''), '{Enter}'],
    ['{ShiftLeft}', ...'ЯЧСМИТЬБЮ,'.split(''), '{arrowUp}', '{rShift}'],
    lastRow,
  ],
};

const keyboardLayout = [
  ['Backquote', ...'1234567890'.split('').map((e) => `Digit${e}`), 'Minus', 'Equal', 'Backslash', 'Backspace'],
  ['Tab', ...'QWERTYUIOP'.split('').map((e) => `Key${e}`), 'BracketLeft', 'BracketRight', 'Delete'],
  ['CapsLock', ...'ASDFGHJKL'.split('').map((e) => `Key${e}`), 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', ...'ZXCVBNM'.split('').map((e) => `Key${e}`), 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
];

const specialKeys = {
  Tab: {
    width: '80px',
    value: '\t',
  },
  CapsLock: {
    width: '90px',
  },
  ShiftLeft: {
    width: '100px',
  },
  ControlLeft: {
    width: '100px',
    action: true,
  },
  MetaLeft: {
    width: '100px',
    action: true,
  },
  AltLeft: {
    width: '100px',
    action: true,
  },
  AltRight: {
    width: '100px',
    action: true,
  },
  Space: {
    width: '100%',
    value: ' ',
  },
  Backspace: {
    width: '90px',
    action: true,
  },
  Delete: {
    width: '100px',
    action: true,
  },
  Enter: {
    width: '110px',
    value: '\n',
  },
  ArrowUp: {
    width: '50px',
    icon: '<span class="material-icons">arrow_upward</span>',
    value: '▲',
  },
  ArrowDown: {
    width: '50px',
    icon: '<span class="material-icons">arrow_downward</span>',
    value: '▼',
  },
  ArrowLeft: {
    width: '50px',
    icon: '<span class="material-icons">arrow_back</span>',
    value: '◄',
  },
  ArrowRight: {
    width: '50px',
    icon: '<span class="material-icons">arrow_forward</span>',
    value: '►',
  },
  ShiftRight: {
    width: '102px',
  },
  ControlRight: {
    width: '100px',
    action: true,
  },
};

const getKeyboard = () => keyboardLayout.map((row, rowIndex) => row.map((elem, elemIndex) => {
  const keyInfo = {};
  if (keys.en[rowIndex][elemIndex].startsWith('{')) {
    keyInfo.key = {
      code: elem,
      name: keys.en[rowIndex][elemIndex].slice(1, -1),
      width: specialKeys[elem].width,
      value: specialKeys[elem].value,
      icon: specialKeys[elem].icon,
      action: specialKeys[elem].action,
      isTranslatable: false,
    };
  } else {
    keyInfo.key = {
      code: elem,
      ru: keys.ru[rowIndex][elemIndex],
      ruShift: keys.ruShift[rowIndex][elemIndex],
      en: keys.en[rowIndex][elemIndex],
      enShift: keys.enShift[rowIndex][elemIndex],
      isTranslatable: true,
    };
  }
  return keyInfo;
}));

export default getKeyboard;
