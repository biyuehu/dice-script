class IdrisError extends Error { }

function __prim_js2idris_array(x){
  let acc = { h:0 };

  for (let i = x.length-1; i>=0; i--) {
      acc = { a1:x[i], a2:acc };
  }
  return acc;
}

function __prim_idris2js_array(x){
  const result = Array();
  while (x.h === undefined) {
    result.push(x.a1); x = x.a2;
  }
  return result;
}

function __lazy(thunk) {
  let res;
  return function () {
    if (thunk === undefined) return res;
    res = thunk();
    thunk = undefined;
    return res;
  };
};

function __prim_stringIteratorNew(_str) {
  return 0
}

function __prim_stringIteratorToString(_, str, it, f) {
  return f(str.slice(it))
}

function __prim_stringIteratorNext(str, it) {
  if (it >= str.length)
    return {h: 0};
  else
    return {a1: str.charAt(it), a2: it + 1};
}

function __tailRec(f,ini) {
  let obj = ini;
  while(true){
    switch(obj.h){
      case 0: return obj.a1;
      default: obj = f(obj);
    }
  }
}

const _idrisworld = Symbol('idrisworld')

const _crashExp = x=>{throw new IdrisError(x)}

const _bigIntOfString = s=> {
  try {
    const idx = s.indexOf('.')
    return idx === -1 ? BigInt(s) : BigInt(s.slice(0, idx))
  } catch (e) { return 0n }
}

const _numberOfString = s=> {
  try {
    const res = Number(s);
    return isNaN(res) ? 0 : res;
  } catch (e) { return 0 }
}

const _intOfString = s=> Math.trunc(_numberOfString(s))

const _truncToChar = x=> String.fromCodePoint(
  (x >= 0 && x <= 55295) || (x >= 57344 && x <= 1114111) ? x : 0
)

// Int8
const _truncInt8 = x => {
  const res = x & 0xff;
  return res >= 0x80 ? res - 0x100 : res;
}

const _truncBigInt8 = x => Number(BigInt.asIntN(8, x))

// Euclidian Division
const _div = (a,b) => {
  const q = Math.trunc(a / b)
  const r = a % b
  return r < 0 ? (b > 0 ? q - 1 : q + 1) : q
}

const _divBigInt = (a,b) => {
  const q = a / b
  const r = a % b
  return r < 0n ? (b > 0n ? q - 1n : q + 1n) : q
}

// Euclidian Modulo
const _mod = (a,b) => {
  const r = a % b
  return r < 0 ? (b > 0 ? r + b : r - b) : r
}

const _modBigInt = (a,b) => {
  const r = a % b
  return r < 0n ? (b > 0n ? r + b : r - b) : r
}

const _add8s = (a,b) => _truncInt8(a + b)
const _sub8s = (a,b) => _truncInt8(a - b)
const _mul8s = (a,b) => _truncInt8(a * b)
const _div8s = (a,b) => _truncInt8(_div(a,b))
const _shl8s = (a,b) => _truncInt8(a << b)
const _shr8s = (a,b) => _truncInt8(a >> b)

// Int16
const _truncInt16 = x => {
  const res = x & 0xffff;
  return res >= 0x8000 ? res - 0x10000 : res;
}

const _truncBigInt16 = x => Number(BigInt.asIntN(16, x))

const _add16s = (a,b) => _truncInt16(a + b)
const _sub16s = (a,b) => _truncInt16(a - b)
const _mul16s = (a,b) => _truncInt16(a * b)
const _div16s = (a,b) => _truncInt16(_div(a,b))
const _shl16s = (a,b) => _truncInt16(a << b)
const _shr16s = (a,b) => _truncInt16(a >> b)

//Int32
const _truncInt32 = x => x & 0xffffffff

const _truncBigInt32 = x => Number(BigInt.asIntN(32, x))

const _add32s = (a,b) => _truncInt32(a + b)
const _sub32s = (a,b) => _truncInt32(a - b)
const _div32s = (a,b) => _truncInt32(_div(a,b))

const _mul32s = (a,b) => {
  const res = a * b;
  if (res <= Number.MIN_SAFE_INTEGER || res >= Number.MAX_SAFE_INTEGER) {
    return _truncInt32((a & 0xffff) * b + (b & 0xffff) * (a & 0xffff0000))
  } else {
    return _truncInt32(res)
  }
}

//Int64
const _truncBigInt64 = x => BigInt.asIntN(64, x)

const _add64s = (a,b) => _truncBigInt64(a + b)
const _sub64s = (a,b) => _truncBigInt64(a - b)
const _mul64s = (a,b) => _truncBigInt64(a * b)
const _shl64s = (a,b) => _truncBigInt64(a << b)
const _div64s = (a,b) => _truncBigInt64(_divBigInt(a,b))
const _shr64s = (a,b) => _truncBigInt64(a >> b)

//Bits8
const _truncUInt8 = x => x & 0xff

const _truncUBigInt8 = x => Number(BigInt.asUintN(8, x))

const _add8u = (a,b) => (a + b) & 0xff
const _sub8u = (a,b) => (a - b) & 0xff
const _mul8u = (a,b) => (a * b) & 0xff
const _div8u = (a,b) => Math.trunc(a / b)
const _shl8u = (a,b) => (a << b) & 0xff
const _shr8u = (a,b) => (a >> b) & 0xff

//Bits16
const _truncUInt16 = x => x & 0xffff

const _truncUBigInt16 = x => Number(BigInt.asUintN(16, x))

const _add16u = (a,b) => (a + b) & 0xffff
const _sub16u = (a,b) => (a - b) & 0xffff
const _mul16u = (a,b) => (a * b) & 0xffff
const _div16u = (a,b) => Math.trunc(a / b)
const _shl16u = (a,b) => (a << b) & 0xffff
const _shr16u = (a,b) => (a >> b) & 0xffff

//Bits32
const _truncUBigInt32 = x => Number(BigInt.asUintN(32, x))

const _truncUInt32 = x => {
  const res = x & -1;
  return res < 0 ? res + 0x100000000 : res;
}

const _add32u = (a,b) => _truncUInt32(a + b)
const _sub32u = (a,b) => _truncUInt32(a - b)
const _mul32u = (a,b) => _truncUInt32(_mul32s(a,b))
const _div32u = (a,b) => Math.trunc(a / b)

const _shl32u = (a,b) => _truncUInt32(a << b)
const _shr32u = (a,b) => _truncUInt32(a <= 0x7fffffff ? a >> b : (b == 0 ? a : (a >> b) ^ ((-0x80000000) >> (b-1))))
const _and32u = (a,b) => _truncUInt32(a & b)
const _or32u = (a,b)  => _truncUInt32(a | b)
const _xor32u = (a,b) => _truncUInt32(a ^ b)

//Bits64
const _truncUBigInt64 = x => BigInt.asUintN(64, x)

const _add64u = (a,b) => BigInt.asUintN(64, a + b)
const _mul64u = (a,b) => BigInt.asUintN(64, a * b)
const _div64u = (a,b) => a / b
const _shl64u = (a,b) => BigInt.asUintN(64, a << b)
const _shr64u = (a,b) => BigInt.asUintN(64, a >> b)
const _sub64u = (a,b) => BigInt.asUintN(64, a - b)

//String
const _strReverse = x => x.split('').reverse().join('')

const _substr = (o,l,x) => x.slice(o, o + l)

const Prelude_Types_fastUnpack = ((str)=>__prim_js2idris_array(Array.from(str)));
const Prelude_Types_fastPack = ((xs)=>__prim_idris2js_array(xs).join(''));
const Prelude_IO_prim__putStr = (x=>console.log(x));
const Dice_Random_prim__random = (() => () => Math.random());
const Web_Dom_prim__setTextContent = ( (elem, prop) => { elem.textContent = prop });
const Web_Dom_prim__setInnerHTML = ( (elem, html) => { elem.innerHTML = html });
const Web_Dom_prim__setAttribute = ( (elem, attr, val) => elem.setAttribute(attr, val));
const Web_Dom_prim__querySelectorAll = ( (sel) => document.querySelectorAll(sel));
const Web_Dom_prim__querySelector = ( (sel, just, nothing) => {
  const elem = document.querySelector(sel);
  return elem ? just(elem) : nothing;
});
const Web_Dom_prim__getElemValue = ( (elem, just, nothing) => elem.value ? just(elem.value) : nothing);
const Web_Dom_prim__getAttribute = ( (elem, attr, just, nothing) => {
  const val = elem.getAttribute(attr);
  return val ? just(val) : nothing;
});
const Web_Dom_prim__createTextNode = ( (text) => document.createTextNode(text));
const Web_Dom_prim__createElement = ( (tag) => document.createElement(tag));
const Web_Dom_prim__appendChild = ( (parent, child) => parent.appendChild(child));
const Web_Dom_prim__addEventListener = ((elem, event, handler) => elem.addEventListener(event, handler));
const Web_Es_prim__for_ = ( (_, iterator, callback) => { for (const item of iterator) callback(item)(); });
/* {$tcOpt:1} */
function x24tcOpt_1($0) {
 switch($0.a2.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:1} */, a1: {h: 0}};
  case undefined: /* cons */ {
   switch($0.a2.a2.h) {
    case 0: /* nil */ return {h: 0 /* {TcDone:1} */, a1: {a1: $0.a2.a1, a2: {h: 0}}};
    default: {
     const $8 = Dice_Random_prim__random()($0.a3);
     const $c = Number(Prelude_Types_List_lengthTR($0.a2));
     const $10 = BigInt(Math.trunc(($8*$c)));
     const $14 = Data_List_splitAt(Prelude_Types_prim__integerToNat($10), $0.a2);
     switch($14.a2.h) {
      case 0: /* nil */ return {h: 1 /* {TcContinue1:1} */, a1: $0.a1, a2: $0.a2, a3: $0.a3};
      case undefined: /* cons */ {
       const $1e = Dice_Internal_n__5085_4912_shuffleList($0.a1, Prelude_Types_List_tailRecAppend($14.a1, $14.a2.a2), $0.a3);
       return {h: 0 /* {TcDone:1} */, a1: {a1: $14.a2.a1, a2: $1e}};
      }
     }
    }
   }
  }
  default: {
   const $29 = Dice_Random_prim__random()($0.a3);
   const $2d = Number(Prelude_Types_List_lengthTR($0.a2));
   const $31 = BigInt(Math.trunc(($29*$2d)));
   const $35 = Data_List_splitAt(Prelude_Types_prim__integerToNat($31), $0.a2);
   switch($35.a2.h) {
    case 0: /* nil */ return {h: 1 /* {TcContinue1:1} */, a1: $0.a1, a2: $0.a2, a3: $0.a3};
    case undefined: /* cons */ {
     const $3f = Dice_Internal_n__5085_4912_shuffleList($0.a1, Prelude_Types_List_tailRecAppend($35.a1, $35.a2.a2), $0.a3);
     return {h: 0 /* {TcDone:1} */, a1: {a1: $35.a2.a1, a2: $3f}};
    }
   }
  }
 }
}

/* Dice.Internal.5085:4912:shuffleList */
function Dice_Internal_n__5085_4912_shuffleList($0, $1, $2) {
 return __tailRec(x24tcOpt_1, {h: 1 /* {TcContinue1:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:2} */
function x24tcOpt_2($0) {
 switch($0.a3) {
  case 0n: return {h: 0 /* {TcDone:2} */, a1: $0.a5};
  default: {
   switch($0.a4.h) {
    case 0: /* nil */ return {h: 0 /* {TcDone:2} */, a1: $0.a5};
    default: {
     const $6 = Dice_Random_prim__random()($0.a6);
     const $a = Number(Prelude_Types_List_lengthTR($0.a4));
     const $e = BigInt(Math.trunc(($6*$a)));
     const $12 = Data_List_splitAt(Prelude_Types_prim__integerToNat($e), $0.a4);
     switch($12.a2.h) {
      case 0: /* nil */ return {h: 1 /* {TcContinue2:1} */, a1: $0.a1, a2: $0.a2, a3: $0.a3, a4: $0.a4, a5: $0.a5, a6: $0.a6};
      case undefined: /* cons */ return {h: 1 /* {TcContinue2:1} */, a1: $0.a1, a2: $0.a2, a3: ($0.a3-1n), a4: Prelude_Types_List_tailRecAppend($12.a1, $12.a2.a2), a5: {a1: $12.a2.a1, a2: $0.a5}, a6: $0.a6};
     }
    }
   }
  }
 }
}

/* Dice.Internal.5272:5084:pickRandom */
function Dice_Internal_n__5272_5084_pickRandom($0, $1, $2, $3, $4, $5) {
 return __tailRec(x24tcOpt_2, {h: 1 /* {TcContinue2:1} */, a1: $0, a2: $1, a3: $2, a4: $3, a5: $4, a6: $5});
}

/* {$tcOpt:3} */
function x24tcOpt_3($0) {
 switch($0.a1.h) {
  case 0: /* DLambda */ {
   switch($0.a2.h) {
    case 0: /* DLambda */ {
     switch(Prelude_Types_x3dx3d_Eq_x28Listx20x24ax29(csegen_113(), $0.a1.a1, $0.a2.a1)) {
      case 1: return {h: 1 /* {TcContinue3:1} */, a1: $0.a1.a2, a2: $0.a2.a2};
      case 0: return {h: 0 /* {TcDone:3} */, a1: 0};
     }
    }
    default: return {h: 0 /* {TcDone:3} */, a1: 0};
   }
  }
  case 1: /* DPrefix */ {
   switch($0.a2.h) {
    case 1: /* DPrefix */ {
     switch(Dice_Ast_x3dx3d_Eq_DPrefixOp($0.a1.a1, $0.a2.a1)) {
      case 1: return {h: 1 /* {TcContinue3:1} */, a1: $0.a1.a2, a2: $0.a2.a2};
      case 0: return {h: 0 /* {TcDone:3} */, a1: 0};
     }
    }
    default: return {h: 0 /* {TcDone:3} */, a1: 0};
   }
  }
  case 2: /* DInfix */ {
   switch($0.a2.h) {
    case 2: /* DInfix */ {
     switch(Dice_Ast_x3dx3d_Eq_DInfixOp($0.a1.a2, $0.a2.a2)) {
      case 1: {
       switch(Dice_Ast_x3dx3d_Eq_DExpr($0.a1.a1, $0.a2.a1)) {
        case 1: return {h: 1 /* {TcContinue3:1} */, a1: $0.a1.a3, a2: $0.a2.a3};
        case 0: return {h: 0 /* {TcDone:3} */, a1: 0};
       }
      }
      case 0: return {h: 0 /* {TcDone:3} */, a1: 0};
     }
    }
    default: return {h: 0 /* {TcDone:3} */, a1: 0};
   }
  }
  case 3: /* DCall */ {
   switch($0.a2.h) {
    case 3: /* DCall */ {
     switch(Dice_Ast_x3dx3d_Eq_DCallHead($0.a1.a1, $0.a2.a1)) {
      case 1: return {h: 0 /* {TcDone:3} */, a1: Prelude_Types_x3dx3d_Eq_x28Listx20x24ax29(csegen_117(), $0.a1.a2, $0.a2.a2)};
      case 0: return {h: 0 /* {TcDone:3} */, a1: 0};
     }
    }
    default: return {h: 0 /* {TcDone:3} */, a1: 0};
   }
  }
  case 4: /* DDLiteral */ {
   switch($0.a2.h) {
    case 4: /* DDLiteral */ return {h: 0 /* {TcDone:3} */, a1: Dice_Ast_x3dx3d_Eq_DLiteral($0.a1.a1, $0.a2.a1)};
    default: return {h: 0 /* {TcDone:3} */, a1: 0};
   }
  }
  case 5: /* DIdent */ {
   switch($0.a2.h) {
    case 5: /* DIdent */ return {h: 0 /* {TcDone:3} */, a1: Prelude_EqOrd_x3dx3d_Eq_String($0.a1.a1, $0.a2.a1)};
    default: return {h: 0 /* {TcDone:3} */, a1: 0};
   }
  }
  case 6: /* DParen */ {
   switch($0.a2.h) {
    case 6: /* DParen */ return {h: 1 /* {TcContinue3:1} */, a1: $0.a1.a1, a2: $0.a2.a1};
    default: return {h: 0 /* {TcDone:3} */, a1: 0};
   }
  }
  default: return {h: 0 /* {TcDone:3} */, a1: 0};
 }
}

/* Dice.Ast.== */
function Dice_Ast_x3dx3d_Eq_DExpr($0, $1) {
 return __tailRec(x24tcOpt_3, {h: 1 /* {TcContinue3:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:4} */
function x24tcOpt_4($0) {
 switch($0.a2.h) {
  case 0: /* nil */ {
   switch($0.a3.h) {
    case 0: /* nil */ return {h: 0 /* {TcDone:4} */, a1: 1};
    default: return {h: 0 /* {TcDone:4} */, a1: 0};
   }
  }
  case undefined: /* cons */ {
   switch($0.a3.h) {
    case undefined: /* cons */ {
     switch($0.a1.a1($0.a2.a1)($0.a3.a1)) {
      case 1: return {h: 1 /* {TcContinue4:1} */, a1: $0.a1, a2: $0.a2.a2, a3: $0.a3.a2};
      case 0: return {h: 0 /* {TcDone:4} */, a1: 0};
     }
    }
    default: return {h: 0 /* {TcDone:4} */, a1: 0};
   }
  }
  default: return {h: 0 /* {TcDone:4} */, a1: 0};
 }
}

/* Prelude.Types.== */
function Prelude_Types_x3dx3d_Eq_x28Listx20x24ax29($0, $1, $2) {
 return __tailRec(x24tcOpt_4, {h: 1 /* {TcContinue4:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:5} */
function x24tcOpt_5($0) {
 switch($0.h) {
  case 1: /* {TcContinue5:1} */ return {h: 2 /* {TcContinue5:2} */, a1: $0.a1, a2: $0.a1.a1};
  case 2: /* {TcContinue5:2} */ {
   switch($0.a2.h) {
    case 0: /* nil */ return {h: 0 /* {TcDone:5} */, a1: $0.a1};
    case undefined: /* cons */ {
     switch(Prelude_Types_isSpace($0.a2.a1)) {
      case 1: return {h: 1 /* {TcContinue5:1} */, a1: {a1: $0.a2.a2, a2: ($0.a1.a2+1n)}};
      case 0: return {h: 0 /* {TcDone:5} */, a1: $0.a1};
     }
    }
   }
  }
 }
}

/* Dice.Lexer.skipWhitespace : LexState -> LexState */
function Dice_Lexer_skipWhitespace($0) {
 return __tailRec(x24tcOpt_5, {h: 1 /* {TcContinue5:1} */, a1: $0});
}

/* Dice.Lexer.case block in skipWhitespace */
function Dice_Lexer_case__skipWhitespace_910($0, $1) {
 return __tailRec(x24tcOpt_5, {h: 2 /* {TcContinue5:2} */, a1: $0, a2: $1});
}

/* {$tcOpt:6} */
function x24tcOpt_6($0) {
 switch($0.a2.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:6} */, a1: $0.a1};
  case undefined: /* cons */ return {h: 1 /* {TcContinue6:1} */, a1: {a1: $0.a2.a1, a2: $0.a1}, a2: $0.a2.a2};
 }
}

/* Prelude.Types.List.reverseOnto : List a -> List a -> List a */
function Prelude_Types_List_reverseOnto($0, $1) {
 return __tailRec(x24tcOpt_6, {h: 1 /* {TcContinue6:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:7} */
function x24tcOpt_7($0) {
 switch($0.a2) {
  case 0n: return {h: 0 /* {TcDone:7} */, a1: $0.a1};
  default: {
   const $4 = ($0.a2-1n);
   return {h: 1 /* {TcContinue7:1} */, a1: {a1: $0.a3, a2: $0.a1}, a2: $4, a3: $0.a3};
  }
 }
}

/* Data.List.replicateTR : List a -> Nat -> a -> List a */
function Data_List_replicateTR($0, $1, $2) {
 return __tailRec(x24tcOpt_7, {h: 1 /* {TcContinue7:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:8} */
function x24tcOpt_8($0) {
 switch($0.a1.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:8} */, a1: {a1: $0.a2}};
  case undefined: /* cons */ {
   let $5;
   switch(Prelude_EqOrd_x3ex3d_Ord_Char($0.a1.a1, '0')) {
    case 1: {
     $5 = Prelude_EqOrd_x3cx3d_Ord_Char($0.a1.a1, '9');
     break;
    }
    case 0: {
     $5 = 0;
     break;
    }
   }
   switch($5) {
    case 1: return {h: 1 /* {TcContinue8:1} */, a1: $0.a1.a2, a2: (($0.a2*10n)+BigInt(_sub32s(_truncInt32($0.a1.a1.codePointAt(0)), _truncInt32('0'.codePointAt(0)))))};
    case 0: return {h: 0 /* {TcDone:8} */, a1: {h: 0}};
   }
  }
 }
}

/* Data.String.parseNumWithoutSign : List Char -> Integer -> Maybe Integer */
function Data_String_parseNumWithoutSign($0, $1) {
 return __tailRec(x24tcOpt_8, {h: 1 /* {TcContinue8:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:9} */
function x24tcOpt_9($0) {
 switch($0.a3.h) {
  case undefined: /* cons */ return {h: 1 /* {TcContinue9:1} */, a1: {a1: $0.a1, a2: $0.a2($0.a3.a1)}, a2: $0.a2, a3: $0.a3.a2};
  case 0: /* nil */ return {h: 0 /* {TcDone:9} */, a1: Prelude_Types_SnocList_x3cx3ex3e($0.a1, {h: 0})};
 }
}

/* Prelude.Types.List.mapAppend : SnocList b -> (a -> b) -> List a -> List b */
function Prelude_Types_List_mapAppend($0, $1, $2) {
 return __tailRec(x24tcOpt_9, {h: 1 /* {TcContinue9:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:10} */
function x24tcOpt_10($0) {
 switch($0.a1) {
  case '': {
   switch($0.a2.h) {
    case 0: /* Nil */ return {h: 0 /* {TcDone:10} */, a1: ''};
    default: {
     const $6 = ($0.a2.a1+$0.a2.a2);
     switch(Prelude_Types_isSpace($0.a2.a1)) {
      case 1: return {h: 1 /* {TcContinue10:1} */, a1: $0.a2.a2, a2: $0.a2.a3()};
      case 0: return {h: 0 /* {TcDone:10} */, a1: $6};
     }
    }
   }
  }
  default: {
   const $11 = ($0.a2.a1+$0.a2.a2);
   switch(Prelude_Types_isSpace($0.a2.a1)) {
    case 1: return {h: 1 /* {TcContinue10:1} */, a1: $0.a2.a2, a2: $0.a2.a3()};
    case 0: return {h: 0 /* {TcDone:10} */, a1: $11};
   }
  }
 }
}

/* Data.String.with block in ltrim */
function Data_String_with__ltrim_7992($0, $1) {
 return __tailRec(x24tcOpt_10, {h: 1 /* {TcContinue10:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:11} */
function x24tcOpt_11($0) {
 switch($0.a3.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:11} */, a1: {h: 0}};
  case undefined: /* cons */ {
   switch($0.a1($0.a2)($0.a3.a1.a1)) {
    case 1: return {h: 0 /* {TcDone:11} */, a1: {a1: $0.a3.a1.a2}};
    case 0: return {h: 1 /* {TcContinue11:1} */, a1: $0.a1, a2: $0.a2, a3: $0.a3.a2};
   }
  }
 }
}

/* Data.List.lookupBy : (a -> b -> Bool) -> a -> List (b, v) -> Maybe v */
function Data_List_lookupBy($0, $1, $2) {
 return __tailRec(x24tcOpt_11, {h: 1 /* {TcContinue11:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:12} */
function x24tcOpt_12($0) {
 switch($0.a2.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:12} */, a1: $0.a1};
  case undefined: /* cons */ return {h: 1 /* {TcContinue12:1} */, a1: ($0.a1+1n), a2: $0.a2.a2};
 }
}

/* Prelude.Types.List.lengthPlus : Nat -> List a -> Nat */
function Prelude_Types_List_lengthPlus($0, $1) {
 return __tailRec(x24tcOpt_12, {h: 1 /* {TcContinue12:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:13} */
function x24tcOpt_13($0) {
 switch($0.a1) {
  case 0n: {
   switch($0.a2.h) {
    case undefined: /* cons */ return {h: 0 /* {TcDone:13} */, a1: {a1: $0.a2.a1}};
    default: return {h: 0 /* {TcDone:13} */, a1: {h: 0}};
   }
  }
  default: {
   const $8 = ($0.a1-1n);
   switch($0.a2.h) {
    case undefined: /* cons */ return {h: 1 /* {TcContinue13:1} */, a1: $8, a2: $0.a2.a2};
    default: return {h: 0 /* {TcDone:13} */, a1: {h: 0}};
   }
  }
 }
}

/* Prelude.Types.getAt : Nat -> List a -> Maybe a */
function Prelude_Types_getAt($0, $1) {
 return __tailRec(x24tcOpt_13, {h: 1 /* {TcContinue13:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:14} */
function x24tcOpt_14($0) {
 switch($0.a3.h) {
  case undefined: /* cons */ {
   switch($0.a2($0.a3.a1)) {
    case 1: return {h: 1 /* {TcContinue14:1} */, a1: {a1: $0.a1, a2: $0.a3.a1}, a2: $0.a2, a3: $0.a3.a2};
    case 0: return {h: 1 /* {TcContinue14:1} */, a1: $0.a1, a2: $0.a2, a3: $0.a3.a2};
   }
  }
  case 0: /* nil */ return {h: 0 /* {TcDone:14} */, a1: Prelude_Types_SnocList_x3cx3ex3e($0.a1, {h: 0})};
 }
}

/* Prelude.Types.List.filterAppend : SnocList a -> (a -> Bool) -> List a -> List a */
function Prelude_Types_List_filterAppend($0, $1, $2) {
 return __tailRec(x24tcOpt_14, {h: 1 /* {TcContinue14:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:15} */
function x24tcOpt_15($0) {
 switch($0.a1.h) {
  case 4: /* DDLiteral */ return {h: 0 /* {TcDone:15} */, a1: $4 => Dice_Evaluator_evalLiteral($0.a1.a1, $4)};
  case 6: /* DParen */ return {h: 1 /* {TcContinue15:1} */, a1: $0.a1.a1};
  case 1: /* DPrefix */ {
   const $9 = $a => {
    const $b = Dice_Evaluator_evaluate($0.a1.a2)($a);
    return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29($b, $13 => Dice_Evaluator_evalPrefix($0.a1.a1, $13));
   };
   return {h: 0 /* {TcDone:15} */, a1: $9};
  }
  case 2: /* DInfix */ {
   const $17 = $18 => {
    const $19 = Dice_Evaluator_evaluate($0.a1.a1)($18);
    const $1e = Dice_Evaluator_evaluate($0.a1.a3)($18);
    return Dice_Evaluator_case__evaluate_8674($0.a1.a3, $0.a1.a2, $0.a1.a1, $19, $1e, {a1: $19, a2: $1e})($18);
   };
   return {h: 0 /* {TcDone:15} */, a1: $17};
  }
  case 0: /* DLambda */ return {h: 0 /* {TcDone:15} */, a1: $2f => ({h: 1 /* Right */, a1: {h: 3 /* VLambda */, a1: $0.a1.a1, a2: $0.a1.a2}})};
  case 3: /* DCall */ {
   const $33 = $34 => {
    const $35 = Prelude_Types_traverse_Traversable_List(csegen_10(), $3b => Dice_Evaluator_evaluate($3b), $0.a1.a2)($34);
    const $43 = b => a => func => $44 => {
     switch($44.h) {
      case 0: /* Left */ return {h: 0 /* Left */, a1: $44.a1};
      case 1: /* Right */ return {h: 1 /* Right */, a1: func($44.a1)};
     }
    };
    const $4d = b => a => $4e => $4f => {
     switch($4e.h) {
      case 0: /* Left */ return {h: 0 /* Left */, a1: $4e.a1};
      case 1: /* Right */ {
       switch($4f.h) {
        case 1: /* Right */ return {h: 1 /* Right */, a1: $4e.a1($4f.a1)};
        case 0: /* Left */ return {h: 0 /* Left */, a1: $4f.a1};
       }
      }
     }
    };
    const $42 = {a1: $43, a2: a => $4b => ({h: 1 /* Right */, a1: $4b}), a3: $4d};
    const $40 = Prelude_Interfaces_sequence($42, csegen_168(), $35);
    switch($40.h) {
     case 0: /* Left */ return {h: 0 /* Left */, a1: $40.a1};
     case 1: /* Right */ return Dice_Evaluator_evalCall($0.a1.a1, $40.a1)($34);
    }
   };
   return {h: 0 /* {TcDone:15} */, a1: $33};
  }
  case 5: /* DIdent */ return {h: 0 /* {TcDone:15} */, a1: $62 => ({h: 0 /* Left */, a1: 'Invalid identifier'})};
 }
}

/* Dice.Evaluator.evaluate : DExpr -> IO (OpResult Value) */
function Dice_Evaluator_evaluate($0) {
 return __tailRec(x24tcOpt_15, {h: 1 /* {TcContinue15:1} */, a1: $0});
}

/* {$tcOpt:16} */
function x24tcOpt_16($0) {
 switch($0.a1) {
  case 0n: return {h: 0 /* {TcDone:16} */, a1: $0.a2};
  default: {
   const $4 = ($0.a1-1n);
   switch($0.a2.h) {
    case 0: /* nil */ return {h: 0 /* {TcDone:16} */, a1: {h: 0}};
    case undefined: /* cons */ return {h: 1 /* {TcContinue16:1} */, a1: $4, a2: $0.a2.a2};
   }
  }
 }
}

/* Data.List.drop : Nat -> List a -> List a */
function Data_List_drop($0, $1) {
 return __tailRec(x24tcOpt_16, {h: 1 /* {TcContinue16:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:17} */
function x24tcOpt_17($0) {
 switch($0.a3.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:17} */, a1: $0.a2};
  case undefined: /* cons */ return {h: 1 /* {TcContinue17:1} */, a1: $0.a1, a2: $0.a1($0.a2)($0.a3.a1), a3: $0.a3.a2};
 }
}

/* Prelude.Types.foldl */
function Prelude_Types_foldl_Foldable_List($0, $1, $2) {
 return __tailRec(x24tcOpt_17, {h: 1 /* {TcContinue17:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:18} */
function x24tcOpt_18($0) {
 switch($0.a1.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:18} */, a1: $0.a2};
  case undefined: /* cons */ return {h: 1 /* {TcContinue18:1} */, a1: $0.a1.a1, a2: {a1: $0.a1.a2, a2: $0.a2}};
 }
}

/* Prelude.Types.SnocList.<>> : SnocList a -> List a -> List a */
function Prelude_Types_SnocList_x3cx3ex3e($0, $1) {
 return __tailRec(x24tcOpt_18, {h: 1 /* {TcContinue18:1} */, a1: $0, a2: $1});
}

/* {__mainExpression:0} */
const __mainExpression_0 = __lazy(function () {
 return PrimIO_unsafePerformIO($2 => Web_main($2));
});

/* {csegen:0} */
const csegen_0 = __lazy(function () {
 const $0 = $1 => $1;
 return $2 => $0($2);
});

/* {csegen:10} */
const csegen_10 = __lazy(function () {
 const $a = b => a => $b => $c => $d => {
  const $e = $b($d);
  const $11 = $c($d);
  return $e($11);
 };
 return {a1: b => a => func => $1 => $2 => Prelude_IO_map_Functor_IO(func, $1, $2), a2: a => $8 => $9 => $8, a3: $a};
});

/* {csegen:16} */
const csegen_16 = __lazy(function () {
 const $2 = b => a => $3 => $4 => $5 => {
  const $6 = $3($5);
  return $4($6)($5);
 };
 const $d = a => $e => $f => {
  const $10 = $e($f);
  return $10($f);
 };
 return {a1: csegen_10(), a2: $2, a3: $d};
});

/* {csegen:17} */
const csegen_17 = __lazy(function () {
 return {a1: csegen_16(), a2: a => $3 => $3};
});

/* {csegen:34} */
const csegen_34 = __lazy(function () {
 return {a1: Web_Isx2_x2ex3d('target', '_blank'), a2: {h: 0}};
});

/* {csegen:67} */
const csegen_67 = __lazy(function () {
 return {a1: $1 => $2 => Prelude_Interfaces_Bool_Semigroup_x3cx2bx3e_Semigroup_AnyBool($1, $2), a2: 0};
});

/* {csegen:106} */
const csegen_106 = __lazy(function () {
 const $0 = $1 => $2 => $3 => $4 => Prelude_Types_List_mapAppend({h: 0}, $3, $4);
 return $9 => $a => $0(undefined)(undefined)($9)($a);
});

/* {csegen:110} */
const csegen_110 = __lazy(function () {
 return {a1: $1 => $2 => Dice_Value_x3dx3d_Eq_Value($1, $2), a2: $7 => $8 => Dice_Value_x2fx3d_Eq_Value($7, $8)};
});

/* {csegen:113} */
const csegen_113 = __lazy(function () {
 return {a1: $1 => $2 => Prelude_EqOrd_x3dx3d_Eq_String($1, $2), a2: $7 => $8 => Prelude_EqOrd_x2fx3d_Eq_String($7, $8)};
});

/* {csegen:114} */
const csegen_114 = __lazy(function () {
 return csegen_106()($3 => Dice_Ast_show_Show_DExpr($3));
});

/* {csegen:117} */
const csegen_117 = __lazy(function () {
 return {a1: $1 => $2 => Dice_Ast_x3dx3d_Eq_DExpr($1, $2), a2: $7 => $8 => Dice_Ast_x2fx3d_Eq_DExpr($7, $8)};
});

/* {csegen:127} */
const csegen_127 = __lazy(function () {
 return $0 => ({h: 1 /* Right */, a1: {a1: $0.a2, a2: $0.a1}});
});

/* {csegen:132} */
const csegen_132 = __lazy(function () {
 const $0 = $1 => $2 => $3 => $4 => Prelude_Types_map_Functor_Maybe($3, $4);
 return $8 => $9 => $0(undefined)(undefined)($8)($9);
});

/* {csegen:133} */
const csegen_133 = __lazy(function () {
 return csegen_132()($3 => Number($3));
});

/* {csegen:136} */
const csegen_136 = __lazy(function () {
 return {a1: $1 => $2 => ($1+$2), a2: $6 => $7 => ($6*$7), a3: $b => $b};
});

/* {csegen:138} */
const csegen_138 = __lazy(function () {
 return {a1: csegen_136(), a2: $3 => (0n-$3), a3: $7 => $8 => ($7-$8)};
});

/* {csegen:139} */
const csegen_139 = __lazy(function () {
 return c => {
  switch(Prelude_EqOrd_x3dx3d_Eq_Char(c, 'e')) {
   case 1: return 1;
   case 0: return Prelude_EqOrd_x3dx3d_Eq_Char(c, 'E');
  }
 };
});

/* {csegen:163} */
const csegen_163 = __lazy(function () {
 return {a1: acc => elem => func => init => input => Prelude_Types_foldr_Foldable_List(func, init, input), a2: elem => acc => func => init => input => Prelude_Types_foldl_Foldable_List(func, init, input), a3: elem => $b => Prelude_Types_null_Foldable_List($b), a4: elem => acc => m => $f => funcM => init => input => Prelude_Types_foldlM_Foldable_List($f, funcM, init, input), a5: elem => $16 => $16, a6: a => m => $18 => f => $19 => Prelude_Types_foldMap_Foldable_List($18, f, $19)};
});

/* {csegen:168} */
const csegen_168 = __lazy(function () {
 return {a1: b => a => func => $1 => Prelude_Types_List_mapAppend({h: 0}, func, $1), a2: csegen_163(), a3: b => a => f => $9 => $a => $b => Prelude_Types_traverse_Traversable_List($9, $a, $b)};
});

/* {csegen:179} */
const csegen_179 = __lazy(function () {
 return {a1: $1 => $2 => Prelude_Interfaces_Bool_Semigroup_x3cx2bx3e_Semigroup_AllBool($1, $2), a2: 1};
});

/* {csegen:180} */
const csegen_180 = __lazy(function () {
 return $0 => Prelude_EqOrd_x3e_Ord_Double($0.a1, $0.a2);
});

/* {csegen:181} */
const csegen_181 = __lazy(function () {
 return $0 => Prelude_EqOrd_x3c_Ord_Double($0.a1, $0.a2);
});

/* {csegen:202} */
const csegen_202 = __lazy(function () {
 return $0 => $1 => Dice_Internal_Imul($0, $1);
});

/* {csegen:335} */
const csegen_335 = __lazy(function () {
 return {a1: $1 => $2 => ($1+$2), a2: $6 => $7 => ($6*$7), a3: $b => Number($b)};
});

/* prim__sub_Integer : Integer -> Integer -> Integer */
function prim__sub_Integer($0, $1) {
 return ($0-$1);
}

/* Web.case block in handleRuningExpr */
function Web_case__handleRuningExpr_872($0, $1, $2) {
 switch($1.h) {
  case 0: /* Left */ return {a1: 'result error', a2: ('Parse Error: '+$1.a1)};
  case 1: /* Right */ {
   const $8 = Dice_Evaluator_evaluate($1.a1)($2);
   switch($8.h) {
    case 1: /* Right */ return {a1: csegen_0()('result'), a2: ('Result: '+Dice_Value_show_Show_Value($8.a1))};
    case 0: /* Left */ return {a1: csegen_0()('result error'), a2: (csegen_0()('Evaluation Error: ')+$8.a1)};
   }
  }
 }
}

/* Web.setupEventHandlers : IO () */
function Web_setupEventHandlers($0) {
 const $1 = Web_Dom_querySelectorAll(csegen_17(), '.btn-run')($0);
 const $a = btn => $b => {
  const $c = Web_Dom_getAttribute(btn, 'data-run-id', $b);
  switch($c.h) {
   case undefined: /* just */ {
    const $15 = $16 => {
     const $17 = Web_Dom_querySelector(csegen_17(), (csegen_0()('[data-input-id=\'')+($c.a1+'\']')))($16);
     switch($17.h) {
      case undefined: /* just */ {
       const $26 = Web_Dom_getElemValue($17.a1, $16);
       switch($26.h) {
        case undefined: /* just */ {
         const $2b = Web_Dom_querySelector(csegen_17(), (csegen_0()('[data-result-id=\'')+($c.a1+'\']')))($16);
         switch($2b.h) {
          case undefined: /* just */ {
           const $3a = Web_handleRuningExpr($26.a1, $16);
           const $3f = Web_Dom_setAttribute($2b.a1, 'class', $3a.a1, $16);
           const $45 = Web_Dom_setTextContent($2b.a1, $3a.a2, $16);
           return undefined;
          }
          case 0: /* nothing */ return undefined;
         }
        }
        case 0: /* nothing */ return undefined;
       }
      }
      case 0: /* nothing */ return undefined;
     }
    };
    return Web_Dom_addEventListener(btn, 'click', $15, $b);
   }
   case 0: /* nothing */ return Prelude_IO_prim__putStr((Prelude_Show_show_Show_String(csegen_0()('Failed to register event listener: No data-run-id found'))+'\n'), $b);
  }
 };
 return Web_Es_for_($1, $a, $0);
}

/* Web.page : ISX */
const Web_page = __lazy(function () {
 return Web_Isx2_div($2 => $2, {a1: Web_Isx2_x2ex3d('class', 'container'), a2: {h: 0}}, {a1: Web_Isx2_section($d => $d, {a1: Web_Isx2_x2ex3d('class', 'intro'), a2: {h: 0}}, {a1: Web_Isx2_h1($18 => ({h: 0 /* Text */, a1: $18}), {h: 0}, {a1: csegen_0()('\u{1f3b2} Dice Script Playground'), a2: {h: 0}}), a2: {a1: Web_Isx2_p($25 => ({h: 0 /* Text */, a1: $25}), {h: 0}, {a1: csegen_0()('A safe and fast dice expression evaluator base on Idris2. And DiceScript is a superset of Mathematical (Arithmetic) Expression, it supports many advanced features'), a2: {h: 0}}), a2: {a1: Web_Isx2_p($32 => ({h: 0 /* Text */, a1: $32}), {h: 0}, {a1: csegen_0()('Try rolling some dice using standard RPG notation.'), a2: {h: 0}}), a2: {a1: Web_Isx2_ul($3f => $3f, {h: 0}, {a1: Web_Isx2_li($45 => $45, {h: 0}, {a1: Web_Isx2_text('Project links: '), a2: {a1: Web_Isx2_a($4f => ({h: 0 /* Text */, a1: $4f}), {a1: Web_Isx2_x2ex3d('href', 'https://github.com/BIYUEHU/dicescript'), a2: csegen_34()}, {a1: csegen_0()('BIYUEHU/dicescript'), a2: {h: 0}}), a2: {h: 0}}}), a2: {a1: Web_Isx2_li($63 => $63, {h: 0}, {a1: Web_Isx2_text('DiceScript Guide: '), a2: {a1: Web_Isx2_a($6d => ({h: 0 /* Text */, a1: $6d}), {a1: Web_Isx2_x2ex3d('href', 'https://github.com/dice-project/dicescript/blob/main/docs/syntax.md'), a2: csegen_34()}, {a1: csegen_0()('\u{1f449} Here'), a2: {h: 0}}), a2: {h: 0}}}), a2: {h: 0}}}), a2: {h: 0}}}}}), a2: {a1: Web_Isx2_div($83 => Examples_render_Renderable_ExampleBlock($83), {a1: Web_Isx2_x2ex3d('class', 'expr-blocks'), a2: {h: 0}}, Examples_exampleBlocks()), a2: {h: 0}}});
});

/* Web.main : IO () */
function Web_main($0) {
 const $1 = Web_Dom_querySelector(csegen_17(), '.idris-dice-script-container')($0);
 switch($1.h) {
  case undefined: /* just */ {
   const $9 = Web_Isx2_renderToDOM($c => $c, $1.a1, Web_page(), $0);
   const $11 = Web_setupEventHandlers($0);
   return Prelude_IO_prim__putStr((csegen_0()('Demo blocks generated!')+'\n'), $0);
  }
  case 0: /* nothing */ return Prelude_IO_prim__putStr((csegen_0()('Container not found')+'\n'), $0);
 }
}

/* Web.handleRuningExpr : String -> IO (String, String) */
function Web_handleRuningExpr($0, $1) {
 return Web_case__handleRuningExpr_872($0, Dice_Parser_parse($0), $1);
}

/* Dice.Utils.joined : String -> List String -> String */
function Dice_Utils_joined($0, $1) {
 switch($1.h) {
  case 0: /* nil */ return '';
  case undefined: /* cons */ {
   switch($1.a2.h) {
    case 0: /* nil */ return $1.a1;
    default: return ($1.a1+($0+Dice_Utils_joined($0, $1.a2)));
   }
  }
 }
}

/* Prelude.Basics.flip : (a -> b -> c) -> b -> a -> c */
function Prelude_Basics_flip($0, $1, $2) {
 return $0($2)($1);
}

/* Builtin.idris_crash : String -> a */
function Builtin_idris_crash($0) {
 return _crashExp($0);
}

/* Builtin.fst : (a, b) -> a */
function Builtin_fst($0) {
 return $0.a1;
}

/* Prelude.Types.traverse */
function Prelude_Types_traverse_Traversable_List($0, $1, $2) {
 switch($2.h) {
  case 0: /* nil */ return $0.a2(undefined)({h: 0});
  case undefined: /* cons */ return $0.a3(undefined)(undefined)($0.a3(undefined)(undefined)($0.a2(undefined)($1e => $1f => ({a1: $1e, a2: $1f})))($1($2.a1)))(Prelude_Types_traverse_Traversable_List($0, $1, $2.a2));
 }
}

/* Prelude.Types.null */
function Prelude_Types_null_Foldable_List($0) {
 switch($0.h) {
  case 0: /* nil */ return 1;
  case undefined: /* cons */ return 0;
 }
}

/* Prelude.Types.map */
function Prelude_Types_map_Functor_Maybe($0, $1) {
 switch($1.h) {
  case undefined: /* just */ return {a1: $0($1.a1)};
  case 0: /* nothing */ return {h: 0};
 }
}

/* Prelude.Types.foldr */
function Prelude_Types_foldr_Foldable_List($0, $1, $2) {
 switch($2.h) {
  case 0: /* nil */ return $1;
  case undefined: /* cons */ return $0($2.a1)(Prelude_Types_foldr_Foldable_List($0, $1, $2.a2));
 }
}

/* Prelude.Types.foldlM */
function Prelude_Types_foldlM_Foldable_List($0, $1, $2, $3) {
 return Prelude_Types_foldl_Foldable_List(ma => b => $0.a2(undefined)(undefined)(ma)($f => Prelude_Basics_flip($1, b, $f)), $0.a1.a2(undefined)($2), $3);
}

/* Prelude.Types.foldMap */
function Prelude_Types_foldMap_Foldable_List($0, $1, $2) {
 const $4 = acc => elem => {
  const $7 = $0.a1;
  const $6 = $9 => $a => $7($9)($a);
  const $5 = $6(acc);
  return $5($1(elem));
 };
 return Prelude_Types_foldl_Foldable_List($4, $0.a2, $2);
}

/* Prelude.Types.>>= */
function Prelude_Types_x3ex3ex3d_Monad_Maybe($0, $1) {
 switch($0.h) {
  case 0: /* nothing */ return {h: 0};
  case undefined: /* just */ return $1($0.a1);
 }
}

/* Prelude.Types.>>= */
function Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29($0, $1) {
 switch($0.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $0.a1};
  case 1: /* Right */ return $1($0.a1);
 }
}

/* Prelude.Types.>= */
function Prelude_Types_x3ex3d_Ord_Nat($0, $1) {
 return Prelude_EqOrd_x2fx3d_Eq_Ordering(Prelude_EqOrd_compare_Ord_Integer($0, $1), 0);
}

/* Prelude.Types.<= */
function Prelude_Types_x3cx3d_Ord_Nat($0, $1) {
 return Prelude_EqOrd_x2fx3d_Eq_Ordering(Prelude_EqOrd_compare_Ord_Integer($0, $1), 2);
}

/* Prelude.Types.tanh : Double -> Double */
function Prelude_Types_tanh($0) {
 return (Prelude_Types_sinh($0)/Prelude_Types_cosh($0));
}

/* Prelude.Types.List.tailRecAppend : List a -> List a -> List a */
function Prelude_Types_List_tailRecAppend($0, $1) {
 return Prelude_Types_List_reverseOnto($1, Prelude_Types_List_reverse($0));
}

/* Prelude.Types.sinh : Double -> Double */
function Prelude_Types_sinh($0) {
 return ((Math.exp($0)-Math.exp((-($0))))/2.0);
}

/* Prelude.Types.List.reverse : List a -> List a */
function Prelude_Types_List_reverse($0) {
 return Prelude_Types_List_reverseOnto({h: 0}, $0);
}

/* Prelude.Types.prim__integerToNat : Integer -> Nat */
function Prelude_Types_prim__integerToNat($0) {
 switch(((0n<=$0)?1:0)) {
  case 0: return 0n;
  default: return $0;
 }
}

/* Prelude.Types.List.lengthTR : List a -> Nat */
function Prelude_Types_List_lengthTR($0) {
 return Prelude_Types_List_lengthPlus(0n, $0);
}

/* Prelude.Types.String.length : String -> Nat */
function Prelude_Types_String_length($0) {
 return Prelude_Types_prim__integerToNat(BigInt($0.length));
}

/* Prelude.Types.isUpper : Char -> Bool */
function Prelude_Types_isUpper($0) {
 switch(Prelude_EqOrd_x3ex3d_Ord_Char($0, 'A')) {
  case 1: return Prelude_EqOrd_x3cx3d_Ord_Char($0, 'Z');
  case 0: return 0;
 }
}

/* Prelude.Types.isSpace : Char -> Bool */
function Prelude_Types_isSpace($0) {
 switch($0) {
  case ' ': return 1;
  case '\u{9}': return 1;
  case '\r': return 1;
  case '\n': return 1;
  case '\u{c}': return 1;
  case '\u{b}': return 1;
  case '\u{a0}': return 1;
  default: return 0;
 }
}

/* Prelude.Types.isLower : Char -> Bool */
function Prelude_Types_isLower($0) {
 switch(Prelude_EqOrd_x3ex3d_Ord_Char($0, 'a')) {
  case 1: return Prelude_EqOrd_x3cx3d_Ord_Char($0, 'z');
  case 0: return 0;
 }
}

/* Prelude.Types.isDigit : Char -> Bool */
function Prelude_Types_isDigit($0) {
 switch(Prelude_EqOrd_x3ex3d_Ord_Char($0, '0')) {
  case 1: return Prelude_EqOrd_x3cx3d_Ord_Char($0, '9');
  case 0: return 0;
 }
}

/* Prelude.Types.isAlpha : Char -> Bool */
function Prelude_Types_isAlpha($0) {
 switch(Prelude_Types_isUpper($0)) {
  case 1: return 1;
  case 0: return Prelude_Types_isLower($0);
 }
}

/* Prelude.Types.elemBy : Foldable t => (a -> a -> Bool) -> a -> t a -> Bool */
function Prelude_Types_elemBy($0, $1, $2, $3) {
 return $0.a6(undefined)(undefined)(csegen_67())($1($2))($3);
}

/* Prelude.Types.elem : Foldable t => Eq a => a -> t a -> Bool */
function Prelude_Types_elem($0, $1, $2, $3) {
 return Prelude_Types_elemBy($0, $7 => $8 => $1.a1($7)($8), $2, $3);
}

/* Prelude.Types.cosh : Double -> Double */
function Prelude_Types_cosh($0) {
 return ((Math.exp($0)+Math.exp((-($0))))/2.0);
}

/* Prelude.Num.mod */
function Prelude_Num_mod_Integral_Int($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Int($1, Number(_truncBigInt32(0n)))) {
  case 0: return _mod($0, $1);
  default: return Builtin_idris_crash(undefined)('Unhandled input for Prelude.Num.case block in mod at Prelude.Num:131:3--133:40');
 }
}

/* Prelude.Num.abs */
function Prelude_Num_abs_Abs_Double($0) {
 switch(Prelude_EqOrd_x3c_Ord_Double($0, Number(0n))) {
  case 1: return (-($0));
  case 0: return $0;
 }
}

/* Prelude.EqOrd.min */
function Prelude_EqOrd_min_Ord_Double($0, $1) {
 switch(Prelude_EqOrd_x3c_Ord_Double($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

/* Prelude.EqOrd.max */
function Prelude_EqOrd_max_Ord_Double($0, $1) {
 switch(Prelude_EqOrd_x3e_Ord_Double($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

/* Prelude.EqOrd.compare */
function Prelude_EqOrd_compare_Ord_Integer($0, $1) {
 switch(Prelude_EqOrd_x3c_Ord_Integer($0, $1)) {
  case 1: return 0;
  case 0: {
   switch(Prelude_EqOrd_x3dx3d_Eq_Integer($0, $1)) {
    case 1: return 1;
    case 0: return 2;
   }
  }
 }
}

/* Prelude.EqOrd.> */
function Prelude_EqOrd_x3e_Ord_Integer($0, $1) {
 switch((($0>$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.> */
function Prelude_EqOrd_x3e_Ord_Int($0, $1) {
 switch((($0>$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.> */
function Prelude_EqOrd_x3e_Ord_Double($0, $1) {
 switch((($0>$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.> */
function Prelude_EqOrd_x3e_Ord_Char($0, $1) {
 switch((($0>$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.>= */
function Prelude_EqOrd_x3ex3d_Ord_Integer($0, $1) {
 switch((($0>=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.>= */
function Prelude_EqOrd_x3ex3d_Ord_Int($0, $1) {
 switch((($0>=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.>= */
function Prelude_EqOrd_x3ex3d_Ord_Double($0, $1) {
 switch((($0>=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.>= */
function Prelude_EqOrd_x3ex3d_Ord_Char($0, $1) {
 switch((($0>=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_String($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Ordering($0, $1) {
 switch($0) {
  case 0: {
   switch($1) {
    case 0: return 1;
    default: return 0;
   }
  }
  case 1: {
   switch($1) {
    case 1: return 1;
    default: return 0;
   }
  }
  case 2: {
   switch($1) {
    case 2: return 1;
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Integer($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Int($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Double($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Char($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Bool($0, $1) {
 switch($0) {
  case 1: {
   switch($1) {
    case 1: return 1;
    default: return 0;
   }
  }
  case 0: {
   switch($1) {
    case 0: return 1;
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* Prelude.EqOrd.< */
function Prelude_EqOrd_x3c_Ord_Integer($0, $1) {
 switch((($0<$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.< */
function Prelude_EqOrd_x3c_Ord_Int($0, $1) {
 switch((($0<$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.< */
function Prelude_EqOrd_x3c_Ord_Double($0, $1) {
 switch((($0<$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.<= */
function Prelude_EqOrd_x3cx3d_Ord_Double($0, $1) {
 switch((($0<=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.<= */
function Prelude_EqOrd_x3cx3d_Ord_Char($0, $1) {
 switch((($0<=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd./= */
function Prelude_EqOrd_x2fx3d_Eq_String($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_String($0, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

/* Prelude.EqOrd./= */
function Prelude_EqOrd_x2fx3d_Eq_Ordering($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Ordering($0, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

/* Prelude.EqOrd./= */
function Prelude_EqOrd_x2fx3d_Eq_Double($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Double($0, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

/* Prelude.EqOrd.compareInteger : Integer -> Integer -> Ordering */
function Prelude_EqOrd_compareInteger($0, $1) {
 return Prelude_EqOrd_compare_Ord_Integer($0, $1);
}

/* Prelude.Interfaces.Num.Monoid.neutral */
function Prelude_Interfaces_Num_Monoid_neutral_Monoid_Multiplicativex24a($0) {
 return $0.a3(1n);
}

/* Prelude.Interfaces.Num.Monoid.neutral */
function Prelude_Interfaces_Num_Monoid_neutral_Monoid_Additivex24a($0) {
 return $0.a3(0n);
}

/* Prelude.Interfaces.Num.Semigroup.<+> */
function Prelude_Interfaces_Num_Semigroup_x3cx2bx3e_Semigroup_Multiplicativex24a($0, $1, $2) {
 return $0.a2($1)($2);
}

/* Prelude.Interfaces.Bool.Semigroup.<+> */
function Prelude_Interfaces_Bool_Semigroup_x3cx2bx3e_Semigroup_AnyBool($0, $1) {
 switch($0) {
  case 1: return 1;
  case 0: return $1;
 }
}

/* Prelude.Interfaces.Bool.Semigroup.<+> */
function Prelude_Interfaces_Bool_Semigroup_x3cx2bx3e_Semigroup_AllBool($0, $1) {
 switch($0) {
  case 1: return $1;
  case 0: return 0;
 }
}

/* Prelude.Interfaces.Num.Semigroup.<+> */
function Prelude_Interfaces_Num_Semigroup_x3cx2bx3e_Semigroup_Additivex24a($0, $1, $2) {
 return $0.a1($1)($2);
}

/* Prelude.Interfaces.traverse_ : Applicative f => Foldable t => (a -> f b) -> t a -> f () */
function Prelude_Interfaces_traverse_($0, $1, $2, $3) {
 return $1.a1(undefined)(undefined)($d => $e => Prelude_Interfaces_x2ax3e($0, $2($d), $e))($0.a2(undefined)(undefined))($3);
}

/* Prelude.Interfaces.sum : Num a => Foldable t => t a -> a */
function Prelude_Interfaces_sum($0, $1, $2) {
 return $1.a6(undefined)(undefined)({a1: $d => $e => Prelude_Interfaces_Num_Semigroup_x3cx2bx3e_Semigroup_Additivex24a($0, $d, $e), a2: Prelude_Interfaces_Num_Monoid_neutral_Monoid_Additivex24a($0)})($17 => $17)($2);
}

/* Prelude.Interfaces.sequence : Applicative f => Traversable t => t (f a) -> f (t a) */
function Prelude_Interfaces_sequence($0, $1, $2) {
 return $1.a3(undefined)(undefined)(undefined)($0)($f => $f)($2);
}

/* Prelude.Interfaces.product : Num a => Foldable t => t a -> a */
function Prelude_Interfaces_product($0, $1, $2) {
 return $1.a6(undefined)(undefined)({a1: $d => $e => Prelude_Interfaces_Num_Semigroup_x3cx2bx3e_Semigroup_Multiplicativex24a($0, $d, $e), a2: Prelude_Interfaces_Num_Monoid_neutral_Monoid_Multiplicativex24a($0)})($17 => $17)($2);
}

/* Prelude.Interfaces.*> : Applicative f => f a -> f b -> f b */
function Prelude_Interfaces_x2ax3e($0, $1, $2) {
 const $d = $0.a1;
 const $c = $f => $10 => $d(undefined)(undefined)($f)($10);
 const $b = $c($1a => $1b => $1b);
 const $a = $b($1);
 const $4 = $0.a3(undefined)(undefined)($a);
 return $4($2);
}

/* Prelude.Show.2437:11789:asciiTab */
function Prelude_Show_n__2437_11789_asciiTab($0) {
 return {a1: 'NUL', a2: {a1: 'SOH', a2: {a1: 'STX', a2: {a1: 'ETX', a2: {a1: 'EOT', a2: {a1: 'ENQ', a2: {a1: 'ACK', a2: {a1: 'BEL', a2: {a1: 'BS', a2: {a1: 'HT', a2: {a1: 'LF', a2: {a1: 'VT', a2: {a1: 'FF', a2: {a1: 'CR', a2: {a1: 'SO', a2: {a1: 'SI', a2: {a1: 'DLE', a2: {a1: 'DC1', a2: {a1: 'DC2', a2: {a1: 'DC3', a2: {a1: 'DC4', a2: {a1: 'NAK', a2: {a1: 'SYN', a2: {a1: 'ETB', a2: {a1: 'CAN', a2: {a1: 'EM', a2: {a1: 'SUB', a2: {a1: 'ESC', a2: {a1: 'FS', a2: {a1: 'GS', a2: {a1: 'RS', a2: {a1: 'US', a2: {h: 0}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}};
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_String($0) {
 return ('\"'+Prelude_Show_showLitString(Prelude_Types_fastUnpack($0))('\"'));
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_Nat($0) {
 return Prelude_Show_show_Show_Integer($0);
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_Integer($0) {
 return Prelude_Show_showPrec_Show_Integer({h: 0 /* Open */}, $0);
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_Int($0) {
 return Prelude_Show_showPrec_Show_Int({h: 0 /* Open */}, $0);
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_Double($0) {
 return Prelude_Show_showPrec_Show_Double({h: 0 /* Open */}, $0);
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_Char($0) {
 switch($0) {
  case '\'': return '\'\u{5c}\'\'';
  default: return ('\''+Prelude_Show_showLitChar($0)('\''));
 }
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_Bool($0) {
 switch($0) {
  case 1: return 'True';
  case 0: return 'False';
 }
}

/* Prelude.Show.showPrec */
function Prelude_Show_showPrec_Show_Integer($0, $1) {
 return Prelude_Show_primNumShow($4 => (''+$4), $0, $1);
}

/* Prelude.Show.showPrec */
function Prelude_Show_showPrec_Show_Int($0, $1) {
 return Prelude_Show_primNumShow($4 => (''+$4), $0, $1);
}

/* Prelude.Show.showPrec */
function Prelude_Show_showPrec_Show_Double($0, $1) {
 return Prelude_Show_primNumShow($4 => (''+$4), $0, $1);
}

/* Prelude.Show.compare */
function Prelude_Show_compare_Ord_Prec($0, $1) {
 switch($0.h) {
  case 4: /* User */ {
   switch($1.h) {
    case 4: /* User */ return Prelude_EqOrd_compare_Ord_Integer($0.a1, $1.a1);
    default: return Prelude_EqOrd_compare_Ord_Integer(Prelude_Show_precCon($0), Prelude_Show_precCon($1));
   }
  }
  default: return Prelude_EqOrd_compare_Ord_Integer(Prelude_Show_precCon($0), Prelude_Show_precCon($1));
 }
}

/* Prelude.Show.>= */
function Prelude_Show_x3ex3d_Ord_Prec($0, $1) {
 return Prelude_EqOrd_x2fx3d_Eq_Ordering(Prelude_Show_compare_Ord_Prec($0, $1), 0);
}

/* Prelude.Show.showParens : Bool -> String -> String */
function Prelude_Show_showParens($0, $1) {
 switch($0) {
  case 0: return $1;
  case 1: return ('('+($1+')'));
 }
}

/* Prelude.Show.showLitString : List Char -> String -> String */
function Prelude_Show_showLitString($0) {
 return $1 => {
  switch($0.h) {
   case 0: /* nil */ return $1;
   case undefined: /* cons */ {
    switch($0.a1) {
     case '\"': return ('\u{5c}\"'+Prelude_Show_showLitString($0.a2)($1));
     default: return Prelude_Show_showLitChar($0.a1)(Prelude_Show_showLitString($0.a2)($1));
    }
   }
  }
 };
}

/* Prelude.Show.showLitChar : Char -> String -> String */
function Prelude_Show_showLitChar($0) {
 switch($0) {
  case '\u{7}': return $2 => ('\u{5c}a'+$2);
  case '\u{8}': return $5 => ('\u{5c}b'+$5);
  case '\u{c}': return $8 => ('\u{5c}f'+$8);
  case '\n': return $b => ('\u{5c}n'+$b);
  case '\r': return $e => ('\u{5c}r'+$e);
  case '\u{9}': return $11 => ('\u{5c}t'+$11);
  case '\u{b}': return $14 => ('\u{5c}v'+$14);
  case '\u{e}': return $17 => Prelude_Show_protectEsc($1a => Prelude_EqOrd_x3dx3d_Eq_Char($1a, 'H'), '\u{5c}SO', $17);
  case '\u{7f}': return $20 => ('\u{5c}DEL'+$20);
  case '\u{5c}': return $23 => ('\u{5c}\u{5c}'+$23);
  default: {
   return $26 => {
    const $27 = Prelude_Types_getAt(Prelude_Types_prim__integerToNat(BigInt($0.codePointAt(0))), Prelude_Show_n__2437_11789_asciiTab($0));
    switch($27.h) {
     case undefined: /* just */ return ('\u{5c}'+($27.a1+$26));
     case 0: /* nothing */ {
      switch(Prelude_EqOrd_x3e_Ord_Char($0, '\u{7f}')) {
       case 1: return ('\u{5c}'+Prelude_Show_protectEsc($3c => Prelude_Types_isDigit($3c), Prelude_Show_show_Show_Int(_truncInt32($0.codePointAt(0))), $26));
       case 0: return ($0+$26);
      }
     }
    }
   };
  }
 }
}

/* Prelude.Show.protectEsc : (Char -> Bool) -> String -> String -> String */
function Prelude_Show_protectEsc($0, $1, $2) {
 let $5;
 switch(Prelude_Show_firstCharIs($0, $2)) {
  case 1: {
   $5 = '\u{5c}&';
   break;
  }
  case 0: {
   $5 = '';
   break;
  }
 }
 const $4 = ($5+$2);
 return ($1+$4);
}

/* Prelude.Show.primNumShow : (a -> String) -> Prec -> a -> String */
function Prelude_Show_primNumShow($0, $1, $2) {
 const $3 = $0($2);
 let $7;
 switch(Prelude_Show_x3ex3d_Ord_Prec($1, {h: 5 /* PrefixMinus */})) {
  case 1: {
   $7 = Prelude_Show_firstCharIs($e => Prelude_EqOrd_x3dx3d_Eq_Char($e, '-'), $3);
   break;
  }
  case 0: {
   $7 = 0;
   break;
  }
 }
 return Prelude_Show_showParens($7, $3);
}

/* Prelude.Show.precCon : Prec -> Integer */
function Prelude_Show_precCon($0) {
 switch($0.h) {
  case 0: /* Open */ return 0n;
  case 1: /* Equal */ return 1n;
  case 2: /* Dollar */ return 2n;
  case 3: /* Backtick */ return 3n;
  case 4: /* User */ return 4n;
  case 5: /* PrefixMinus */ return 5n;
  case 6: /* App */ return 6n;
 }
}

/* Prelude.Show.firstCharIs : (Char -> Bool) -> String -> Bool */
function Prelude_Show_firstCharIs($0, $1) {
 switch($1) {
  case '': return 0;
  default: return $0(($1.charAt(0)));
 }
}

/* Prelude.IO.map */
function Prelude_IO_map_Functor_IO($0, $1, $2) {
 const $3 = $1($2);
 return $0($3);
}

/* PrimIO.unsafePerformIO : IO a -> a */
function PrimIO_unsafePerformIO($0) {
 const $1 = $0;
 const $3 = w => {
  const $4 = $1(w);
  return $4;
 };
 return PrimIO_unsafeCreateWorld($3);
}

/* PrimIO.unsafeCreateWorld : (1 _ : ((1 _ : %World) -> a)) -> a */
function PrimIO_unsafeCreateWorld($0) {
 return $0(_idrisworld);
}

/* Dice.Value.2819:1055:go */
function Dice_Value_n__2819_1055_go($0, $1) {
 switch($1.h) {
  case 0: /* nil */ return {a1: 0.0};
  case undefined: /* cons */ {
   switch($1.a1.h) {
    case 1: /* VNum */ {
     const $5 = Dice_Value_n__2819_1055_go($0, $1.a2);
     switch($5.h) {
      case undefined: /* just */ return {a1: ($5.a1+$1.a1.a1)};
      case 0: /* nothing */ return {h: 0};
     }
    }
    default: return {h: 0};
   }
  }
 }
}

/* Dice.Value.show */
function Dice_Value_show_Show_Value($0) {
 switch($0.h) {
  case 0: /* VBool */ return Prelude_Show_show_Show_Bool($0.a1);
  case 1: /* VNum */ return Prelude_Show_show_Show_Double($0.a1);
  case 2: /* VArray */ return ('['+(Dice_Utils_joined(',', csegen_106()($10 => Dice_Value_show_Show_Value($10))($0.a1))+']'));
  case 3: /* VLambda */ return ('\u{3bb}'+(Dice_Utils_joined('.', $0.a1)+('.'+Dice_Ast_show_Show_DExpr($0.a2))));
 }
}

/* Dice.Value.== */
function Dice_Value_x3dx3d_Eq_Value($0, $1) {
 switch($0.h) {
  case 0: /* VBool */ {
   switch($1.h) {
    case 0: /* VBool */ return Prelude_EqOrd_x3dx3d_Eq_Bool($0.a1, $1.a1);
    default: return 0;
   }
  }
  case 1: /* VNum */ {
   switch($1.h) {
    case 1: /* VNum */ return Prelude_EqOrd_x3dx3d_Eq_Double($0.a1, $1.a1);
    default: return 0;
   }
  }
  case 2: /* VArray */ {
   switch($1.h) {
    case 2: /* VArray */ return Prelude_Types_x3dx3d_Eq_x28Listx20x24ax29(csegen_110(), $0.a1, $1.a1);
    default: return 0;
   }
  }
  case 3: /* VLambda */ {
   switch($1.h) {
    case 3: /* VLambda */ {
     switch(Prelude_Types_x3dx3d_Eq_x28Listx20x24ax29(csegen_113(), $0.a1, $1.a1)) {
      case 1: return Dice_Ast_x3dx3d_Eq_DExpr($0.a2, $1.a2);
      case 0: return 0;
     }
    }
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* Dice.Value./= */
function Dice_Value_x2fx3d_Eq_Value($0, $1) {
 switch(Dice_Value_x3dx3d_Eq_Value($0, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

/* Dice.Value.isNonEmptyPureNumArraySum : Value -> Maybe Double */
function Dice_Value_isNonEmptyPureNumArraySum($0) {
 switch($0.h) {
  case 2: /* VArray */ {
   switch($0.a1.h) {
    case 0: /* nil */ return {h: 0};
    default: {
     const $3 = Dice_Value_n__2819_1055_go($0.a1, $0.a1);
     switch($3.h) {
      case undefined: /* just */ return {a1: $3.a1};
      case 0: /* nothing */ return {h: 0};
     }
    }
   }
  }
  default: return {h: 0};
 }
}

/* Dice.Value.isIntegralDouble : Double -> Bool */
function Dice_Value_isIntegralDouble($0) {
 return Prelude_EqOrd_x3dx3d_Eq_Double(Math.floor($0), $0);
}

/* Dice.Value.extractNumber : Value -> OpResult Double */
function Dice_Value_extractNumber($0) {
 switch($0.h) {
  case 1: /* VNum */ return {h: 1 /* Right */, a1: $0.a1};
  case 2: /* VArray */ {
   const $3 = {h: 2 /* VArray */, a1: $0.a1};
   const $5 = Dice_Value_isNonEmptyPureNumArraySum($3);
   switch($5.h) {
    case undefined: /* just */ return {h: 1 /* Right */, a1: $5.a1};
    case 0: /* nothing */ return {h: 0 /* Left */, a1: ('Expects non-empty numeric array or number for arithmetic but got: '+Dice_Value_show_Show_Value($3))};
   }
  }
  default: return {h: 0 /* Left */, a1: ('Expects number for arithmetic but got: '+Dice_Value_show_Show_Value($0))};
 }
}

/* Dice.Value.extractBool : Value -> OpResult Bool */
function Dice_Value_extractBool($0) {
 switch($0.h) {
  case 0: /* VBool */ return {h: 1 /* Right */, a1: $0.a1};
  default: return {h: 0 /* Left */, a1: ('Expects boolean but got: '+Dice_Value_show_Show_Value($0))};
 }
}

/* Dice.Value.extractArray : Value -> OpResult (List Value) */
function Dice_Value_extractArray($0) {
 switch($0.h) {
  case 2: /* VArray */ return {h: 1 /* Right */, a1: $0.a1};
  default: return {h: 0 /* Left */, a1: ('Expects array but got '+Dice_Value_show_Show_Value($0))};
 }
}

/* Dice.Value.doubleToInt : Double -> Int */
function Dice_Value_doubleToInt($0) {
 return _truncInt32(Math.trunc(Math.floor($0)));
}

/* Dice.Ast.show */
function Dice_Ast_show_Show_DPrefixOp($0) {
 switch($0) {
  case 0: return '-';
  case 1: return '!';
 }
}

/* Dice.Ast.show */
function Dice_Ast_show_Show_DLiteral($0) {
 switch($0.h) {
  case 0: /* DBool */ return Prelude_Show_show_Show_Bool($0.a1);
  case 1: /* DNumber */ return Prelude_Show_show_Show_Double($0.a1);
  case 2: /* DArray */ return ('['+(Dice_Utils_joined(', ', csegen_114()($0.a1))+']'));
 }
}

/* Dice.Ast.show */
function Dice_Ast_show_Show_DInfixOp($0) {
 switch($0) {
  case 0: return '+';
  case 1: return '-';
  case 2: return '*';
  case 3: return '/';
  case 4: return '%';
  case 5: return '^';
  case 6: return '==';
  case 7: return '!=';
  case 8: return '>';
  case 9: return '>=';
  case 10: return '<';
  case 11: return '<=';
  case 12: return '&&';
  case 13: return '||';
  case 14: return 'd';
  case 15: return '~';
  case 16: return '..';
  case 17: return '++';
  case 18: return ':';
 }
}

/* Dice.Ast.show */
function Dice_Ast_show_Show_DExpr($0) {
 switch($0.h) {
  case 0: /* DLambda */ return ('\u{3bb}'+(Dice_Utils_joined('.', $0.a1)+('.'+Dice_Ast_show_Show_DExpr($0.a2))));
  case 1: /* DPrefix */ return (Dice_Ast_show_Show_DPrefixOp($0.a1)+Dice_Ast_show_Show_DExpr($0.a2));
  case 2: /* DInfix */ return ('('+(Dice_Ast_show_Show_DExpr($0.a1)+(' '+(Dice_Ast_show_Show_DInfixOp($0.a2)+(' '+(Dice_Ast_show_Show_DExpr($0.a3)+')'))))));
  case 3: /* DCall */ return (Dice_Ast_show_Show_DCallHead($0.a1)+('('+(Dice_Utils_joined(', ', csegen_114()($0.a2))+')')));
  case 4: /* DDLiteral */ return Dice_Ast_show_Show_DLiteral($0.a1);
  case 5: /* DIdent */ return $0.a1;
  case 6: /* DParen */ return ('('+(Dice_Ast_show_Show_DExpr($0.a1)+')'));
 }
}

/* Dice.Ast.show */
function Dice_Ast_show_Show_DCallHead($0) {
 switch($0.h) {
  case 0: /* DLambdaHead */ return ('(\u{5c}'+(Dice_Utils_joined(', ', $0.a1)+(' -> '+(Dice_Ast_show_Show_DExpr($0.a2)+')'))));
  case 1: /* DIdentHead */ return $0.a1;
 }
}

/* Dice.Ast.== */
function Dice_Ast_x3dx3d_Eq_DPrefixOp($0, $1) {
 switch($0) {
  case 0: {
   switch($1) {
    case 0: return 1;
    default: return 0;
   }
  }
  case 1: {
   switch($1) {
    case 1: return 1;
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* Dice.Ast.== */
function Dice_Ast_x3dx3d_Eq_DLiteral($0, $1) {
 switch($0.h) {
  case 0: /* DBool */ {
   switch($1.h) {
    case 0: /* DBool */ return Prelude_EqOrd_x3dx3d_Eq_Bool($0.a1, $1.a1);
    default: return Builtin_idris_crash('Unhandled input for Dice.Ast.== at Dice.Ast:136:5--136:42');
   }
  }
  case 1: /* DNumber */ {
   switch($1.h) {
    case 1: /* DNumber */ return Prelude_EqOrd_x3dx3d_Eq_Double($0.a1, $1.a1);
    default: return Builtin_idris_crash('Unhandled input for Dice.Ast.== at Dice.Ast:136:5--136:42');
   }
  }
  case 2: /* DArray */ {
   switch($1.h) {
    case 2: /* DArray */ return Prelude_Types_x3dx3d_Eq_x28Listx20x24ax29(csegen_117(), $0.a1, $1.a1);
    default: return Builtin_idris_crash('Unhandled input for Dice.Ast.== at Dice.Ast:136:5--136:42');
   }
  }
  default: return Builtin_idris_crash('Unhandled input for Dice.Ast.== at Dice.Ast:136:5--136:42');
 }
}

/* Dice.Ast.== */
function Dice_Ast_x3dx3d_Eq_DInfixOp($0, $1) {
 switch($0) {
  case 0: {
   switch($1) {
    case 0: return 1;
    default: return 0;
   }
  }
  case 1: {
   switch($1) {
    case 1: return 1;
    default: return 0;
   }
  }
  case 2: {
   switch($1) {
    case 2: return 1;
    default: return 0;
   }
  }
  case 3: {
   switch($1) {
    case 3: return 1;
    default: return 0;
   }
  }
  case 4: {
   switch($1) {
    case 4: return 1;
    default: return 0;
   }
  }
  case 5: {
   switch($1) {
    case 5: return 1;
    default: return 0;
   }
  }
  case 6: {
   switch($1) {
    case 6: return 1;
    default: return 0;
   }
  }
  case 7: {
   switch($1) {
    case 7: return 1;
    default: return 0;
   }
  }
  case 8: {
   switch($1) {
    case 8: return 1;
    default: return 0;
   }
  }
  case 9: {
   switch($1) {
    case 9: return 1;
    default: return 0;
   }
  }
  case 10: {
   switch($1) {
    case 10: return 1;
    default: return 0;
   }
  }
  case 11: {
   switch($1) {
    case 11: return 1;
    default: return 0;
   }
  }
  case 12: {
   switch($1) {
    case 12: return 1;
    default: return 0;
   }
  }
  case 13: {
   switch($1) {
    case 13: return 1;
    default: return 0;
   }
  }
  case 14: {
   switch($1) {
    case 14: return 1;
    default: return 0;
   }
  }
  case 15: {
   switch($1) {
    case 15: return 1;
    default: return 0;
   }
  }
  case 16: {
   switch($1) {
    case 16: return 1;
    default: return 0;
   }
  }
  case 17: {
   switch($1) {
    case 17: return 1;
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* Dice.Ast.== */
function Dice_Ast_x3dx3d_Eq_DCallHead($0, $1) {
 switch($0.h) {
  case 0: /* DLambdaHead */ {
   switch($1.h) {
    case 0: /* DLambdaHead */ {
     switch(Prelude_Types_x3dx3d_Eq_x28Listx20x24ax29(csegen_113(), $0.a1, $1.a1)) {
      case 1: return Dice_Ast_x3dx3d_Eq_DExpr($0.a2, $1.a2);
      case 0: return 0;
     }
    }
    default: return 0;
   }
  }
  case 1: /* DIdentHead */ {
   switch($1.h) {
    case 1: /* DIdentHead */ return Prelude_EqOrd_x3dx3d_Eq_String($0.a1, $1.a1);
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* Dice.Ast./= */
function Dice_Ast_x2fx3d_Eq_DExpr($0, $1) {
 switch(Dice_Ast_x3dx3d_Eq_DExpr($0, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

/* Dice.Parser.case block in parseExprList */
function Dice_Parser_case__parseExprList_2062($0, $1) {
 switch($1.h) {
  case 6: /* TRBracket */ return {h: 1 /* Right */, a1: {a1: {h: 0}, a2: $0}};
  case 4: /* TRParen */ return {h: 1 /* Right */, a1: {a1: {h: 0}, a2: $0}};
  default: return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_parseExpr($0), $e => Dice_Parser_n__3502_1982_parseExprListHelper($0, {a1: $e.a1, a2: {h: 0}}, $e.a2));
 }
}

/* Dice.Parser.3502:1982:parseExprListHelper */
function Dice_Parser_n__3502_1982_parseExprListHelper($0, $1, $2) {
 switch($2.a2.h) {
  case 2: /* TComma */ return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_advance($2), statex27 => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_parseExpr(statex27), $f => Dice_Parser_n__3502_1982_parseExprListHelper($0, {a1: $f.a1, a2: $1}, $f.a2)));
  default: return {h: 1 /* Right */, a1: {a1: Prelude_Types_List_reverse($1), a2: $2}};
 }
}

/* Dice.Parser.tokenToInfixOp : Token -> OpResult DInfixOp */
function Dice_Parser_tokenToInfixOp($0) {
 switch($0.h) {
  case 10: /* TPlus */ return {h: 1 /* Right */, a1: 0};
  case 11: /* TMinus */ return {h: 1 /* Right */, a1: 1};
  case 12: /* TMul */ return {h: 1 /* Right */, a1: 2};
  case 13: /* TDiv */ return {h: 1 /* Right */, a1: 3};
  case 14: /* TMod */ return {h: 1 /* Right */, a1: 4};
  case 15: /* TPow */ return {h: 1 /* Right */, a1: 5};
  case 16: /* TEq */ return {h: 1 /* Right */, a1: 6};
  case 17: /* TNeq */ return {h: 1 /* Right */, a1: 7};
  case 18: /* TGt */ return {h: 1 /* Right */, a1: 8};
  case 19: /* TGte */ return {h: 1 /* Right */, a1: 9};
  case 20: /* TLt */ return {h: 1 /* Right */, a1: 10};
  case 21: /* TLte */ return {h: 1 /* Right */, a1: 11};
  case 22: /* TAnd */ return {h: 1 /* Right */, a1: 12};
  case 23: /* TOr */ return {h: 1 /* Right */, a1: 13};
  case 24: /* TDice */ return {h: 1 /* Right */, a1: 14};
  case 25: /* TRandom */ return {h: 1 /* Right */, a1: 15};
  case 26: /* TRange */ return {h: 1 /* Right */, a1: 16};
  case 27: /* TConcat */ return {h: 1 /* Right */, a1: 17};
  case 28: /* TColon */ return {h: 1 /* Right */, a1: 18};
  default: return {h: 0 /* Left */, a1: ('Not an infix operator: '+Dice_Token_show_Show_Token($0))};
 }
}

/* Dice.Parser.parsePrimaryExpr : ParseState -> OpResult (DExpr, ParseState) */
function Dice_Parser_parsePrimaryExpr($0) {
 return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_parseAtomicExpr($0), $6 => Dice_Parser_parseCallChain($6.a1, $6.a2));
}

/* Dice.Parser.parseParamList : ParseState -> OpResult (List String, ParseState) */
function Dice_Parser_parseParamList($0) {
 switch($0.a2.h) {
  case 7: /* TIdent */ {
   const $7 = statex27 => {
    switch(statex27.a2.h) {
     case 2: /* TComma */ return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_advance(statex27), statex27x27 => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_parseParamList(statex27x27), $14 => ({h: 1 /* Right */, a1: {a1: {a1: $0.a2.a1, a2: $14.a1}, a2: $14.a2}})));
     default: return {h: 1 /* Right */, a1: {a1: {a1: $0.a2.a1, a2: {h: 0}}, a2: statex27}};
    }
   };
   return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_advance($0), $7);
  }
  default: return {h: 0 /* Left */, a1: ('Expected parameter name but got: '+Dice_Token_show_Show_Token($0.a2))};
 }
}

/* Dice.Parser.parseInfixExprHelper : Nat -> DExpr -> ParseState -> OpResult (DExpr, ParseState) */
function Dice_Parser_parseInfixExprHelper($0, $1, $2) {
 switch(Dice_Token_isInfixOp($2.a2)) {
  case 1: {
   const $7 = Dice_Token_precedence($2.a2);
   switch(Prelude_Types_x3ex3d_Ord_Nat($7, $0)) {
    case 1: {
     const $14 = op => {
      const $19 = statex27 => {
       const $21 = $22 => {
        const $24 = {h: 2 /* DInfix */, a1: $1, a2: op, a3: $22.a1};
        return Dice_Parser_parseInfixExprHelper($0, $24, $22.a2);
       };
       return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_parseInfixExpr(($7+1n), statex27), $21);
      };
      return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_advance($2), $19);
     };
     return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_tokenToInfixOp($2.a2), $14);
    }
    case 0: return {h: 1 /* Right */, a1: {a1: $1, a2: $2}};
   }
  }
  case 0: return {h: 1 /* Right */, a1: {a1: $1, a2: $2}};
 }
}

/* Dice.Parser.parseInfixExpr : Nat -> ParseState -> OpResult (DExpr, ParseState) */
function Dice_Parser_parseInfixExpr($0, $1) {
 return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_parsePrimaryExpr($1), $7 => Dice_Parser_parseInfixExprHelper($0, $7.a1, $7.a2));
}

/* Dice.Parser.parseExprList : ParseState -> OpResult (List DExpr, ParseState) */
function Dice_Parser_parseExprList($0) {
 return Dice_Parser_case__parseExprList_2062($0, $0.a2);
}

/* Dice.Parser.parseExpr : ParseState -> OpResult (DExpr, ParseState) */
function Dice_Parser_parseExpr($0) {
 return Dice_Parser_parseInfixExpr(0n, $0);
}

/* Dice.Parser.parseCallChain : DExpr -> ParseState -> OpResult (DExpr, ParseState) */
function Dice_Parser_parseCallChain($0, $1) {
 switch($1.a2.h) {
  case 3: /* TLParen */ {
   const $8 = statex27 => {
    const $d = $e => {
     const $15 = statex27x27x27 => {
      let $17;
      switch($0.h) {
       case 5: /* DIdent */ {
        $17 = {h: 1 /* Right */, a1: {h: 3 /* DCall */, a1: {h: 1 /* DIdentHead */, a1: $0.a1}, a2: $e.a1}};
        break;
       }
       case 0: /* DLambda */ {
        $17 = {h: 1 /* Right */, a1: {h: 3 /* DCall */, a1: {h: 0 /* DLambdaHead */, a1: $0.a1, a2: $0.a2}, a2: $e.a1}};
        break;
       }
       case 6: /* DParen */ {
        switch($0.a1.h) {
         case 0: /* DLambda */ {
          $17 = {h: 1 /* Right */, a1: {h: 3 /* DCall */, a1: {h: 0 /* DLambdaHead */, a1: $0.a1.a1, a2: $0.a1.a2}, a2: $e.a1}};
          break;
         }
         case 5: /* DIdent */ {
          $17 = {h: 1 /* Right */, a1: {h: 3 /* DCall */, a1: {h: 1 /* DIdentHead */, a1: $0.a1.a1}, a2: $e.a1}};
          break;
         }
         default: $17 = {h: 0 /* Left */, a1: 'Cannot call this expression type'};
        }
        break;
       }
       default: $17 = {h: 0 /* Left */, a1: 'Cannot call this expression type'};
      }
      return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29($17, callExpr => Dice_Parser_parseCallChain(callExpr, statex27x27x27));
     };
     return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_expect({h: 4 /* TRParen */}, $e.a2), $15);
    };
    return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_parseExprList(statex27), $d);
   };
   return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_advance($1), $8);
  }
  default: return {h: 1 /* Right */, a1: {a1: $0, a2: $1}};
 }
}

/* Dice.Parser.parseAtomicExpr : ParseState -> OpResult (DExpr, ParseState) */
function Dice_Parser_parseAtomicExpr($0) {
 switch($0.a2.h) {
  case 0: /* TLambda */ {
   const $7 = statex27 => {
    switch(statex27.a2.h) {
     case 7: /* TIdent */ return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_parseParamList(statex27), $f => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_expect({h: 1 /* TArrow */}, $f.a2), statex27x27x27 => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_parseExpr(statex27x27x27), $1c => ({h: 1 /* Right */, a1: {a1: {h: 0 /* DLambda */, a1: $f.a1, a2: $1c.a1}, a2: $1c.a2}}))));
     default: return {h: 0 /* Left */, a1: ('Expected parameter after \u{5c} but got: '+Dice_Token_show_Show_Token(statex27.a2))};
    }
   };
   return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_advance($0), $7);
  }
  case 11: /* TMinus */ return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_advance($0), statex27 => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_parsePrimaryExpr(statex27), $33 => ({h: 1 /* Right */, a1: {a1: {h: 1 /* DPrefix */, a1: 0, a2: $33.a1}, a2: $33.a2}})));
  case 29: /* TNot */ return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_advance($0), statex27 => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_parsePrimaryExpr(statex27), $44 => ({h: 1 /* Right */, a1: {a1: {h: 1 /* DPrefix */, a1: 1, a2: $44.a1}, a2: $44.a2}})));
  case 3: /* TLParen */ return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_advance($0), statex27 => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_parseExpr(statex27), $55 => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_expect({h: 4 /* TRParen */}, $55.a2), statex27x27x27 => ({h: 1 /* Right */, a1: {a1: {h: 6 /* DParen */, a1: $55.a1}, a2: statex27x27x27}}))));
  case 5: /* TLBracket */ return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_advance($0), statex27 => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_parseExprList(statex27), $6b => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_expect({h: 6 /* TRBracket */}, $6b.a2), statex27x27x27 => ({h: 1 /* Right */, a1: {a1: {h: 4 /* DDLiteral */, a1: {h: 2 /* DArray */, a1: $6b.a1}}, a2: statex27x27x27}}))));
  case 8: /* TNumber */ return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_advance($0), statex27 => ({h: 1 /* Right */, a1: {a1: {h: 4 /* DDLiteral */, a1: {h: 1 /* DNumber */, a1: $0.a2.a1}}, a2: statex27}}));
  case 9: /* TBool */ return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_advance($0), statex27 => ({h: 1 /* Right */, a1: {a1: {h: 4 /* DDLiteral */, a1: {h: 0 /* DBool */, a1: $0.a2.a1}}, a2: statex27}}));
  case 7: /* TIdent */ return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_advance($0), statex27 => ({h: 1 /* Right */, a1: {a1: {h: 5 /* DIdent */, a1: $0.a2.a1}, a2: statex27}}));
  default: return {h: 0 /* Left */, a1: ('Unexpected token in primary expression: '+Dice_Token_show_Show_Token($0.a2))};
 }
}

/* Dice.Parser.parse : String -> OpResult DExpr */
function Dice_Parser_parse($0) {
 const $5 = state => {
  const $a = $b => {
   switch($b.a2.a2.h) {
    case 30: /* TEOF */ return {h: 1 /* Right */, a1: $b.a1};
    default: return {h: 0 /* Left */, a1: ('Unexpected token after expression: '+Dice_Token_show_Show_Token($b.a2.a2))};
   }
  };
  return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_parseExpr(state), $a);
 };
 return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Parser_initParseState($0), $5);
}

/* Dice.Parser.initParseState : String -> OpResult ParseState */
function Dice_Parser_initParseState($0) {
 const $1 = Dice_Lexer_initLexState($0);
 return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Lexer_nextToken($1), csegen_127());
}

/* Dice.Parser.expect : Token -> ParseState -> OpResult ParseState */
function Dice_Parser_expect($0, $1) {
 switch(Dice_Token_x3dx3d_Eq_Token($1.a2, $0)) {
  case 1: return Dice_Parser_advance($1);
  case 0: return {h: 0 /* Left */, a1: ('Expected '+(Dice_Token_show_Show_Token($0)+(' but got '+Dice_Token_show_Show_Token($1.a2))))};
 }
}

/* Dice.Parser.advance : ParseState -> OpResult ParseState */
function Dice_Parser_advance($0) {
 return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Lexer_nextToken($0.a1), csegen_127());
}

/* Dice.Token.show */
function Dice_Token_show_Show_Token($0) {
 switch($0.h) {
  case 0: /* TLambda */ return '\u{5c}';
  case 1: /* TArrow */ return '->';
  case 2: /* TComma */ return ',';
  case 3: /* TLParen */ return '(';
  case 4: /* TRParen */ return ')';
  case 5: /* TLBracket */ return '[';
  case 6: /* TRBracket */ return ']';
  case 7: /* TIdent */ return $0.a1;
  case 8: /* TNumber */ return Prelude_Show_show_Show_Double($0.a1);
  case 9: /* TBool */ return Prelude_Show_show_Show_Bool($0.a1);
  case 10: /* TPlus */ return '+';
  case 11: /* TMinus */ return '-';
  case 12: /* TMul */ return '*';
  case 13: /* TDiv */ return '/';
  case 14: /* TMod */ return '%';
  case 15: /* TPow */ return '^';
  case 16: /* TEq */ return '==';
  case 17: /* TNeq */ return '!=';
  case 18: /* TGt */ return '>';
  case 19: /* TGte */ return '>=';
  case 20: /* TLt */ return '<';
  case 21: /* TLte */ return '<=';
  case 22: /* TAnd */ return '&&';
  case 23: /* TOr */ return '||';
  case 24: /* TDice */ return 'd';
  case 25: /* TRandom */ return '~';
  case 26: /* TRange */ return '..';
  case 27: /* TConcat */ return '++';
  case 28: /* TColon */ return ':';
  case 29: /* TNot */ return '!';
  case 30: /* TEOF */ return 'EOF';
 }
}

/* Dice.Token.== */
function Dice_Token_x3dx3d_Eq_Token($0, $1) {
 switch($0.h) {
  case 0: /* TLambda */ {
   switch($1.h) {
    case 0: /* TLambda */ return 1;
    default: return 0;
   }
  }
  case 1: /* TArrow */ {
   switch($1.h) {
    case 1: /* TArrow */ return 1;
    default: return 0;
   }
  }
  case 2: /* TComma */ {
   switch($1.h) {
    case 2: /* TComma */ return 1;
    default: return 0;
   }
  }
  case 3: /* TLParen */ {
   switch($1.h) {
    case 3: /* TLParen */ return 1;
    default: return 0;
   }
  }
  case 4: /* TRParen */ {
   switch($1.h) {
    case 4: /* TRParen */ return 1;
    default: return 0;
   }
  }
  case 5: /* TLBracket */ {
   switch($1.h) {
    case 5: /* TLBracket */ return 1;
    default: return 0;
   }
  }
  case 6: /* TRBracket */ {
   switch($1.h) {
    case 6: /* TRBracket */ return 1;
    default: return 0;
   }
  }
  case 7: /* TIdent */ {
   switch($1.h) {
    case 7: /* TIdent */ return Prelude_EqOrd_x3dx3d_Eq_String($0.a1, $1.a1);
    default: return 0;
   }
  }
  case 8: /* TNumber */ {
   switch($1.h) {
    case 8: /* TNumber */ return Prelude_EqOrd_x3dx3d_Eq_Double($0.a1, $1.a1);
    default: return 0;
   }
  }
  case 9: /* TBool */ {
   switch($1.h) {
    case 9: /* TBool */ return Prelude_EqOrd_x3dx3d_Eq_Bool($0.a1, $1.a1);
    default: return 0;
   }
  }
  case 10: /* TPlus */ {
   switch($1.h) {
    case 10: /* TPlus */ return 1;
    default: return 0;
   }
  }
  case 11: /* TMinus */ {
   switch($1.h) {
    case 11: /* TMinus */ return 1;
    default: return 0;
   }
  }
  case 12: /* TMul */ {
   switch($1.h) {
    case 12: /* TMul */ return 1;
    default: return 0;
   }
  }
  case 13: /* TDiv */ {
   switch($1.h) {
    case 13: /* TDiv */ return 1;
    default: return 0;
   }
  }
  case 14: /* TMod */ {
   switch($1.h) {
    case 14: /* TMod */ return 1;
    default: return 0;
   }
  }
  case 15: /* TPow */ {
   switch($1.h) {
    case 15: /* TPow */ return 1;
    default: return 0;
   }
  }
  case 16: /* TEq */ {
   switch($1.h) {
    case 16: /* TEq */ return 1;
    default: return 0;
   }
  }
  case 17: /* TNeq */ {
   switch($1.h) {
    case 17: /* TNeq */ return 1;
    default: return 0;
   }
  }
  case 18: /* TGt */ {
   switch($1.h) {
    case 18: /* TGt */ return 1;
    default: return 0;
   }
  }
  case 19: /* TGte */ {
   switch($1.h) {
    case 19: /* TGte */ return 1;
    default: return 0;
   }
  }
  case 20: /* TLt */ {
   switch($1.h) {
    case 20: /* TLt */ return 1;
    default: return 0;
   }
  }
  case 21: /* TLte */ {
   switch($1.h) {
    case 21: /* TLte */ return 1;
    default: return 0;
   }
  }
  case 22: /* TAnd */ {
   switch($1.h) {
    case 22: /* TAnd */ return 1;
    default: return 0;
   }
  }
  case 23: /* TOr */ {
   switch($1.h) {
    case 23: /* TOr */ return 1;
    default: return 0;
   }
  }
  case 24: /* TDice */ {
   switch($1.h) {
    case 24: /* TDice */ return 1;
    default: return 0;
   }
  }
  case 25: /* TRandom */ {
   switch($1.h) {
    case 25: /* TRandom */ return 1;
    default: return 0;
   }
  }
  case 26: /* TRange */ {
   switch($1.h) {
    case 26: /* TRange */ return 1;
    default: return 0;
   }
  }
  case 27: /* TConcat */ {
   switch($1.h) {
    case 27: /* TConcat */ return 1;
    default: return 0;
   }
  }
  case 28: /* TColon */ {
   switch($1.h) {
    case 28: /* TColon */ return 1;
    default: return 0;
   }
  }
  case 29: /* TNot */ {
   switch($1.h) {
    case 29: /* TNot */ return 1;
    default: return 0;
   }
  }
  case 30: /* TEOF */ {
   switch($1.h) {
    case 30: /* TEOF */ return 1;
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* Dice.Token.precedence : Token -> Nat */
function Dice_Token_precedence($0) {
 switch($0.h) {
  case 23: /* TOr */ return 1n;
  case 22: /* TAnd */ return 2n;
  case 16: /* TEq */ return 3n;
  case 17: /* TNeq */ return 3n;
  case 18: /* TGt */ return 4n;
  case 19: /* TGte */ return 4n;
  case 20: /* TLt */ return 4n;
  case 21: /* TLte */ return 4n;
  case 27: /* TConcat */ return 5n;
  case 28: /* TColon */ return 5n;
  case 10: /* TPlus */ return 6n;
  case 11: /* TMinus */ return 6n;
  case 12: /* TMul */ return 7n;
  case 13: /* TDiv */ return 7n;
  case 14: /* TMod */ return 7n;
  case 26: /* TRange */ return 8n;
  case 24: /* TDice */ return 8n;
  case 25: /* TRandom */ return 8n;
  case 15: /* TPow */ return 9n;
  default: return 0n;
 }
}

/* Dice.Token.isInfixOp : Token -> Bool */
function Dice_Token_isInfixOp($0) {
 switch($0.h) {
  case 10: /* TPlus */ return 1;
  case 11: /* TMinus */ return 1;
  case 12: /* TMul */ return 1;
  case 13: /* TDiv */ return 1;
  case 14: /* TMod */ return 1;
  case 15: /* TPow */ return 1;
  case 16: /* TEq */ return 1;
  case 17: /* TNeq */ return 1;
  case 18: /* TGt */ return 1;
  case 19: /* TGte */ return 1;
  case 20: /* TLt */ return 1;
  case 21: /* TLte */ return 1;
  case 22: /* TAnd */ return 1;
  case 23: /* TOr */ return 1;
  case 24: /* TDice */ return 1;
  case 25: /* TRandom */ return 1;
  case 26: /* TRange */ return 1;
  case 27: /* TConcat */ return 1;
  case 28: /* TColon */ return 1;
  default: return 0;
 }
}

/* Data.List.zip */
function Data_List_zip_Zippable_List($0, $1) {
 return Data_List_zipWith_Zippable_List($4 => $5 => ({a1: $4, a2: $5}), $0, $1);
}

/* Data.List.zipWith */
function Data_List_zipWith_Zippable_List($0, $1, $2) {
 switch($1.h) {
  case 0: /* nil */ return {h: 0};
  default: {
   switch($2.h) {
    case 0: /* nil */ return {h: 0};
    default: return {a1: $0($1.a1)($2.a1), a2: Data_List_zipWith_Zippable_List($0, $1.a2, $2.a2)};
   }
  }
 }
}

/* Data.List.take : Nat -> List a -> List a */
function Data_List_take($0, $1) {
 switch($0) {
  case 0n: return {h: 0};
  default: {
   const $3 = ($0-1n);
   switch($1.h) {
    case undefined: /* cons */ return {a1: $1.a1, a2: Data_List_take($3, $1.a2)};
    default: return {h: 0};
   }
  }
 }
}

/* Data.List.splitAt : Nat -> List a -> (List a, List a) */
function Data_List_splitAt($0, $1) {
 switch($0) {
  case 0n: return {a1: {h: 0}, a2: $1};
  default: {
   const $5 = ($0-1n);
   switch($1.h) {
    case 0: /* nil */ return {a1: {h: 0}, a2: {h: 0}};
    case undefined: /* cons */ {
     const $b = Data_List_splitAt($5, $1.a2);
     return {a1: {a1: $1.a1, a2: $b.a1}, a2: $b.a2};
    }
   }
  }
 }
}

/* Data.List.split : (a -> Bool) -> List a -> List1 (List a) */
function Data_List_split($0, $1) {
 const $2 = Data_List_break$($0, $1);
 switch($2.a2.h) {
  case 0: /* nil */ return Data_List1_singleton($2.a1);
  case undefined: /* cons */ return {a1: $2.a1, a2: Data_List1_forget(Data_List_split($0, $2.a2.a2))};
 }
}

/* Data.List.span : (a -> Bool) -> List a -> (List a, List a) */
function Data_List_span($0, $1) {
 switch($1.h) {
  case 0: /* nil */ return {a1: {h: 0}, a2: {h: 0}};
  case undefined: /* cons */ {
   switch($0($1.a1)) {
    case 1: {
     const $8 = Data_List_span($0, $1.a2);
     return {a1: {a1: $1.a1, a2: $8.a1}, a2: $8.a2};
    }
    case 0: return {a1: {h: 0}, a2: {a1: $1.a1, a2: $1.a2}};
   }
  }
 }
}

/* Data.List.lookup : Eq a => a -> List (a, b) -> Maybe b */
function Data_List_lookup($0, $1, $2) {
 return Data_List_lookupBy($5 => $6 => $0.a1($5)($6), $1, $2);
}

/* Data.List.break : (a -> Bool) -> List a -> (List a, List a) */
function Data_List_break$($0, $1) {
 const $3 = $4 => {
  switch($0($4)) {
   case 1: return 0;
   case 0: return 1;
  }
 };
 return Data_List_span($3, $1);
}

/* Data.List1.map */
function Data_List1_map_Functor_List1($0, $1) {
 return {a1: $0($1.a1), a2: csegen_106()($0)($1.a2)};
}

/* Data.List1.singleton : a -> List1 a */
function Data_List1_singleton($0) {
 return {a1: $0, a2: {h: 0}};
}

/* Data.List1.forget : List1 a -> List a */
function Data_List1_forget($0) {
 return {a1: $0.a1, a2: $0.a2};
}

/* Dice.Lexer.case block in case block in case block in case block in nextToken */
function Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20casex20blockx20inx20nextToken_1837($0, $1, $2, $3, $4) {
 const $6 = Prelude_Types_String_length($4.a1);
 switch($4.a1) {
  case 'True': return {h: 1 /* Right */, a1: {a1: {h: 9 /* TBool */, a1: 1}, a2: {a1: $4.a2, a2: ($1.a2+$6)}}};
  case 'False': return {h: 1 /* Right */, a1: {a1: {h: 9 /* TBool */, a1: 0}, a2: {a1: $4.a2, a2: ($1.a2+$6)}}};
  case 'e': return {h: 1 /* Right */, a1: {a1: {h: 8 /* TNumber */, a1: 2.718281828}, a2: {a1: $4.a2, a2: ($1.a2+$6)}}};
  case 'p': return {h: 1 /* Right */, a1: {a1: {h: 8 /* TNumber */, a1: 3.141592654}, a2: {a1: $4.a2, a2: ($1.a2+$6)}}};
  default: return {h: 1 /* Right */, a1: {a1: {h: 7 /* TIdent */, a1: $4.a1}, a2: {a1: $4.a2, a2: ($1.a2+$6)}}};
 }
}

/* Dice.Lexer.case block in case block in case block in nextToken */
function Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20nextToken_1774($0, $1, $2, $3, $4) {
 const $6 = Prelude_Types_prim__integerToNat((Prelude_Types_List_lengthTR({a1: $2, a2: $3})-Prelude_Types_List_lengthTR($4.a2)));
 return {h: 1 /* Right */, a1: {a1: {h: 8 /* TNumber */, a1: $4.a1}, a2: {a1: $4.a2, a2: ($1.a2+$6)}}};
}

/* Dice.Lexer.case block in nextToken */
function Dice_Lexer_case__nextToken_1146($0, $1, $2) {
 switch($2.h) {
  case 0: /* nil */ return {h: 1 /* Right */, a1: {a1: {h: 30 /* TEOF */}, a2: $1}};
  case undefined: /* cons */ {
   switch($2.a1) {
    case '\u{5c}': return {h: 1 /* Right */, a1: {a1: {h: 0 /* TLambda */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
    case ',': return {h: 1 /* Right */, a1: {a1: {h: 2 /* TComma */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
    case '(': return {h: 1 /* Right */, a1: {a1: {h: 3 /* TLParen */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
    case ')': return {h: 1 /* Right */, a1: {a1: {h: 4 /* TRParen */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
    case '[': return {h: 1 /* Right */, a1: {a1: {h: 5 /* TLBracket */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
    case ']': return {h: 1 /* Right */, a1: {a1: {h: 6 /* TRBracket */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
    case '-': {
     switch($2.a2.h) {
      case undefined: /* cons */ {
       switch($2.a2.a1) {
        case '>': return {h: 1 /* Right */, a1: {a1: {h: 1 /* TArrow */}, a2: {a1: $2.a2.a2, a2: ($1.a2+2n)}}};
        default: return {h: 1 /* Right */, a1: {a1: {h: 11 /* TMinus */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
       }
      }
      default: return {h: 1 /* Right */, a1: {a1: {h: 11 /* TMinus */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
     }
    }
    case '+': {
     switch($2.a2.h) {
      case undefined: /* cons */ {
       switch($2.a2.a1) {
        case '+': return {h: 1 /* Right */, a1: {a1: {h: 27 /* TConcat */}, a2: {a1: $2.a2.a2, a2: ($1.a2+2n)}}};
        default: return {h: 1 /* Right */, a1: {a1: {h: 10 /* TPlus */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
       }
      }
      default: return {h: 1 /* Right */, a1: {a1: {h: 10 /* TPlus */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
     }
    }
    case '=': {
     switch($2.a2.h) {
      case undefined: /* cons */ {
       switch($2.a2.a1) {
        case '=': return {h: 1 /* Right */, a1: {a1: {h: 16 /* TEq */}, a2: {a1: $2.a2.a2, a2: ($1.a2+2n)}}};
        default: {
         switch(Prelude_Types_isDigit($2.a1)) {
          case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20nextToken_1774($0, $1, $2.a1, $2.a2, Dice_Lexer_readNumber({a1: $2.a1, a2: $2.a2}));
          case 0: {
           switch(Prelude_Types_isAlpha($2.a1)) {
            case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20casex20blockx20inx20nextToken_1837($0, $1, $2.a1, $2.a2, Dice_Lexer_readIdent({a1: $2.a1, a2: $2.a2}));
            case 0: return {h: 0 /* Left */, a1: ('Unexpected character: '+(Prelude_Show_show_Show_Char($2.a1)+(' at position '+Prelude_Show_show_Show_Nat($1.a2))))};
           }
          }
         }
        }
       }
      }
      default: {
       switch(Prelude_Types_isDigit($2.a1)) {
        case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20nextToken_1774($0, $1, $2.a1, $2.a2, Dice_Lexer_readNumber({a1: $2.a1, a2: $2.a2}));
        case 0: {
         switch(Prelude_Types_isAlpha($2.a1)) {
          case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20casex20blockx20inx20nextToken_1837($0, $1, $2.a1, $2.a2, Dice_Lexer_readIdent({a1: $2.a1, a2: $2.a2}));
          case 0: return {h: 0 /* Left */, a1: ('Unexpected character: '+(Prelude_Show_show_Show_Char($2.a1)+(' at position '+Prelude_Show_show_Show_Nat($1.a2))))};
         }
        }
       }
      }
     }
    }
    case '!': {
     switch($2.a2.h) {
      case undefined: /* cons */ {
       switch($2.a2.a1) {
        case '=': return {h: 1 /* Right */, a1: {a1: {h: 17 /* TNeq */}, a2: {a1: $2.a2.a2, a2: ($1.a2+2n)}}};
        default: return {h: 1 /* Right */, a1: {a1: {h: 29 /* TNot */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
       }
      }
      default: return {h: 1 /* Right */, a1: {a1: {h: 29 /* TNot */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
     }
    }
    case '>': {
     switch($2.a2.h) {
      case undefined: /* cons */ {
       switch($2.a2.a1) {
        case '=': return {h: 1 /* Right */, a1: {a1: {h: 19 /* TGte */}, a2: {a1: $2.a2.a2, a2: ($1.a2+2n)}}};
        default: return {h: 1 /* Right */, a1: {a1: {h: 18 /* TGt */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
       }
      }
      default: return {h: 1 /* Right */, a1: {a1: {h: 18 /* TGt */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
     }
    }
    case '<': {
     switch($2.a2.h) {
      case undefined: /* cons */ {
       switch($2.a2.a1) {
        case '=': return {h: 1 /* Right */, a1: {a1: {h: 21 /* TLte */}, a2: {a1: $2.a2.a2, a2: ($1.a2+2n)}}};
        default: return {h: 1 /* Right */, a1: {a1: {h: 20 /* TLt */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
       }
      }
      default: return {h: 1 /* Right */, a1: {a1: {h: 20 /* TLt */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
     }
    }
    case '&': {
     switch($2.a2.h) {
      case undefined: /* cons */ {
       switch($2.a2.a1) {
        case '&': return {h: 1 /* Right */, a1: {a1: {h: 22 /* TAnd */}, a2: {a1: $2.a2.a2, a2: ($1.a2+2n)}}};
        default: {
         switch(Prelude_Types_isDigit($2.a1)) {
          case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20nextToken_1774($0, $1, $2.a1, $2.a2, Dice_Lexer_readNumber({a1: $2.a1, a2: $2.a2}));
          case 0: {
           switch(Prelude_Types_isAlpha($2.a1)) {
            case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20casex20blockx20inx20nextToken_1837($0, $1, $2.a1, $2.a2, Dice_Lexer_readIdent({a1: $2.a1, a2: $2.a2}));
            case 0: return {h: 0 /* Left */, a1: ('Unexpected character: '+(Prelude_Show_show_Show_Char($2.a1)+(' at position '+Prelude_Show_show_Show_Nat($1.a2))))};
           }
          }
         }
        }
       }
      }
      default: {
       switch(Prelude_Types_isDigit($2.a1)) {
        case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20nextToken_1774($0, $1, $2.a1, $2.a2, Dice_Lexer_readNumber({a1: $2.a1, a2: $2.a2}));
        case 0: {
         switch(Prelude_Types_isAlpha($2.a1)) {
          case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20casex20blockx20inx20nextToken_1837($0, $1, $2.a1, $2.a2, Dice_Lexer_readIdent({a1: $2.a1, a2: $2.a2}));
          case 0: return {h: 0 /* Left */, a1: ('Unexpected character: '+(Prelude_Show_show_Show_Char($2.a1)+(' at position '+Prelude_Show_show_Show_Nat($1.a2))))};
         }
        }
       }
      }
     }
    }
    case '|': {
     switch($2.a2.h) {
      case undefined: /* cons */ {
       switch($2.a2.a1) {
        case '|': return {h: 1 /* Right */, a1: {a1: {h: 23 /* TOr */}, a2: {a1: $2.a2.a2, a2: ($1.a2+2n)}}};
        default: {
         switch(Prelude_Types_isDigit($2.a1)) {
          case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20nextToken_1774($0, $1, $2.a1, $2.a2, Dice_Lexer_readNumber({a1: $2.a1, a2: $2.a2}));
          case 0: {
           switch(Prelude_Types_isAlpha($2.a1)) {
            case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20casex20blockx20inx20nextToken_1837($0, $1, $2.a1, $2.a2, Dice_Lexer_readIdent({a1: $2.a1, a2: $2.a2}));
            case 0: return {h: 0 /* Left */, a1: ('Unexpected character: '+(Prelude_Show_show_Show_Char($2.a1)+(' at position '+Prelude_Show_show_Show_Nat($1.a2))))};
           }
          }
         }
        }
       }
      }
      default: {
       switch(Prelude_Types_isDigit($2.a1)) {
        case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20nextToken_1774($0, $1, $2.a1, $2.a2, Dice_Lexer_readNumber({a1: $2.a1, a2: $2.a2}));
        case 0: {
         switch(Prelude_Types_isAlpha($2.a1)) {
          case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20casex20blockx20inx20nextToken_1837($0, $1, $2.a1, $2.a2, Dice_Lexer_readIdent({a1: $2.a1, a2: $2.a2}));
          case 0: return {h: 0 /* Left */, a1: ('Unexpected character: '+(Prelude_Show_show_Show_Char($2.a1)+(' at position '+Prelude_Show_show_Show_Nat($1.a2))))};
         }
        }
       }
      }
     }
    }
    case '.': {
     switch($2.a2.h) {
      case undefined: /* cons */ {
       switch($2.a2.a1) {
        case '.': return {h: 1 /* Right */, a1: {a1: {h: 26 /* TRange */}, a2: {a1: $2.a2.a2, a2: ($1.a2+2n)}}};
        default: {
         switch(Prelude_Types_isDigit($2.a1)) {
          case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20nextToken_1774($0, $1, $2.a1, $2.a2, Dice_Lexer_readNumber({a1: $2.a1, a2: $2.a2}));
          case 0: {
           switch(Prelude_Types_isAlpha($2.a1)) {
            case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20casex20blockx20inx20nextToken_1837($0, $1, $2.a1, $2.a2, Dice_Lexer_readIdent({a1: $2.a1, a2: $2.a2}));
            case 0: return {h: 0 /* Left */, a1: ('Unexpected character: '+(Prelude_Show_show_Show_Char($2.a1)+(' at position '+Prelude_Show_show_Show_Nat($1.a2))))};
           }
          }
         }
        }
       }
      }
      default: {
       switch(Prelude_Types_isDigit($2.a1)) {
        case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20nextToken_1774($0, $1, $2.a1, $2.a2, Dice_Lexer_readNumber({a1: $2.a1, a2: $2.a2}));
        case 0: {
         switch(Prelude_Types_isAlpha($2.a1)) {
          case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20casex20blockx20inx20nextToken_1837($0, $1, $2.a1, $2.a2, Dice_Lexer_readIdent({a1: $2.a1, a2: $2.a2}));
          case 0: return {h: 0 /* Left */, a1: ('Unexpected character: '+(Prelude_Show_show_Show_Char($2.a1)+(' at position '+Prelude_Show_show_Show_Nat($1.a2))))};
         }
        }
       }
      }
     }
    }
    case '*': return {h: 1 /* Right */, a1: {a1: {h: 12 /* TMul */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
    case '/': return {h: 1 /* Right */, a1: {a1: {h: 13 /* TDiv */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
    case '%': return {h: 1 /* Right */, a1: {a1: {h: 14 /* TMod */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
    case '^': return {h: 1 /* Right */, a1: {a1: {h: 15 /* TPow */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
    case 'd': return {h: 1 /* Right */, a1: {a1: {h: 24 /* TDice */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
    case '~': return {h: 1 /* Right */, a1: {a1: {h: 25 /* TRandom */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
    case ':': return {h: 1 /* Right */, a1: {a1: {h: 28 /* TColon */}, a2: {a1: $2.a2, a2: ($1.a2+1n)}}};
    default: {
     switch(Prelude_Types_isDigit($2.a1)) {
      case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20nextToken_1774($0, $1, $2.a1, $2.a2, Dice_Lexer_readNumber({a1: $2.a1, a2: $2.a2}));
      case 0: {
       switch(Prelude_Types_isAlpha($2.a1)) {
        case 1: return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20casex20blockx20inx20nextToken_1837($0, $1, $2.a1, $2.a2, Dice_Lexer_readIdent({a1: $2.a1, a2: $2.a2}));
        case 0: return {h: 0 /* Left */, a1: ('Unexpected character: '+(Prelude_Show_show_Show_Char($2.a1)+(' at position '+Prelude_Show_show_Show_Nat($1.a2))))};
       }
      }
     }
    }
   }
  }
 }
}

/* Dice.Lexer.case block in case block in case block in readNumber */
function Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20readNumber_989($0, $1, $2, $3, $4, $5) {
 const $7 = Prelude_Types_fastPack($5.a1);
 const $a = Data_String_parseDouble(($2+('.'+$7)));
 switch($a.h) {
  case undefined: /* just */ return {a1: $a.a1, a2: $5.a2};
  case 0: /* nothing */ return {a1: 0.0, a2: $0};
 }
}

/* Dice.Lexer.case block in readNumber */
function Dice_Lexer_case__readNumber_955($0, $1) {
 const $3 = Prelude_Types_fastPack($1.a1);
 switch($1.a2.h) {
  case undefined: /* cons */ {
   switch($1.a2.a1) {
    case '.': {
     const $8 = {a1: '.', a2: $1.a2.a2};
     return Dice_Lexer_case__casex20blockx20inx20casex20blockx20inx20readNumber_989($0, $1.a1, $3, $1.a2.a2, $8, Data_List_span($14 => Prelude_Types_isDigit($14), $1.a2.a2));
    }
    default: {
     const $18 = Data_String_parseDouble($3);
     switch($18.h) {
      case undefined: /* just */ return {a1: $18.a1, a2: $1.a2};
      case 0: /* nothing */ return {a1: 0.0, a2: $0};
     }
    }
   }
  }
  default: {
   const $1f = Data_String_parseDouble($3);
   switch($1f.h) {
    case undefined: /* just */ return {a1: $1f.a1, a2: $1.a2};
    case 0: /* nothing */ return {a1: 0.0, a2: $0};
   }
  }
 }
}

/* Dice.Lexer.readNumber : HString -> (Double, HString) */
function Dice_Lexer_readNumber($0) {
 return Dice_Lexer_case__readNumber_955($0, Data_List_span($6 => Prelude_Types_isDigit($6), $0));
}

/* Dice.Lexer.readIdent : HString -> (String, HString) */
function Dice_Lexer_readIdent($0) {
 const $1 = Data_List_span($4 => Prelude_Types_isAlpha($4), $0);
 return {a1: Prelude_Types_fastPack($1.a1), a2: $1.a2};
}

/* Dice.Lexer.nextToken : LexState -> OpResult (Token, LexState) */
function Dice_Lexer_nextToken($0) {
 const $1 = Dice_Lexer_skipWhitespace($0);
 return Dice_Lexer_case__nextToken_1146($0, $1, $1.a1);
}

/* Dice.Lexer.initLexState : String -> LexState */
function Dice_Lexer_initLexState($0) {
 return {a1: Prelude_Types_fastUnpack($0), a2: 0n};
}

/* Data.String.with block in parseInteger,parseIntTrimmed */
function Data_String_with__parseIntegerx2cparseIntTrimmed_8432($0, $1, $2, $3, $4, $5) {
 switch($4) {
  case '': {
   switch($5.h) {
    case 0: /* nil */ return {h: 0};
    default: {
     switch(Prelude_EqOrd_x3dx3d_Eq_Char($5.a1, '-')) {
      case 1: return csegen_132()(y => $2.a2($1.a3(y)))(Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($5.a2), 0n));
      case 0: {
       switch(Prelude_EqOrd_x3dx3d_Eq_Char($5.a1, '+')) {
        case 1: return csegen_132()($25 => $1.a3($25))(Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($5.a2), BigInt(0)));
        case 0: {
         let $30;
         switch(Prelude_EqOrd_x3ex3d_Ord_Char($5.a1, '0')) {
          case 1: {
           $30 = Prelude_EqOrd_x3cx3d_Ord_Char($5.a1, '9');
           break;
          }
          case 0: {
           $30 = 0;
           break;
          }
         }
         switch($30) {
          case 1: return csegen_132()($3c => $1.a3($3c))(Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($5.a2), BigInt(_sub32s(_truncInt32($5.a1.codePointAt(0)), _truncInt32('0'.codePointAt(0))))));
          case 0: return {h: 0};
         }
        }
       }
      }
     }
    }
   }
  }
  default: {
   switch(Prelude_EqOrd_x3dx3d_Eq_Char($5.a1, '-')) {
    case 1: return csegen_132()(y => $2.a2($1.a3(y)))(Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($5.a2), 0n));
    case 0: {
     switch(Prelude_EqOrd_x3dx3d_Eq_Char($5.a1, '+')) {
      case 1: return csegen_132()($68 => $1.a3($68))(Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($5.a2), BigInt(0)));
      case 0: {
       let $73;
       switch(Prelude_EqOrd_x3ex3d_Ord_Char($5.a1, '0')) {
        case 1: {
         $73 = Prelude_EqOrd_x3cx3d_Ord_Char($5.a1, '9');
         break;
        }
        case 0: {
         $73 = 0;
         break;
        }
       }
       switch($73) {
        case 1: return csegen_132()($7f => $1.a3($7f))(Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($5.a2), BigInt(_sub32s(_truncInt32($5.a1.codePointAt(0)), _truncInt32('0'.codePointAt(0))))));
        case 0: return {h: 0};
       }
      }
     }
    }
   }
  }
 }
}

/* Data.String.with block in asList */
function Data_String_with__asList_7968($0, $1) {
 switch($0) {
  case '': {
   switch($1.h) {
    case 0: /* nil */ return {h: 0 /* Nil */};
    default: return {h: 1 /* :: */, a1: $1.a1, a2: $1.a2, a3: () => Data_String_asList($1.a2)};
   }
  }
  default: return {h: 1 /* :: */, a1: $1.a1, a2: $1.a2, a3: () => Data_String_asList($1.a2)};
 }
}

/* Data.String.case block in case block in parseDouble,wfe */
function Data_String_case__casex20blockx20inx20parseDoublex2cwfe_8943($0, $1, $2, $3) {
 switch($3.h) {
  case undefined: /* cons */ {
   switch($3.a1) {
    case '': {
     switch($3.a2.h) {
      case undefined: /* cons */ {
       switch($3.a2.a2.h) {
        case 0: /* nil */ return {h: 0};
        default: {
         switch($3.a2.h) {
          case undefined: /* cons */ {
           switch($3.a2.a2.h) {
            case 0: /* nil */ {
             const $15 = w => {
              const $2d = f => {
               const $36 = e => {
                let $3a;
                switch(Prelude_EqOrd_x3c_Ord_Double(w, Number(0n))) {
                 case 1: {
                  $3a = (-(f));
                  break;
                 }
                 case 0: {
                  $3a = f;
                  break;
                 }
                }
                const $39 = {a1: $3a, a2: e};
                const $37 = {a1: w, a2: $39};
                return {a1: $37};
               };
               return Prelude_Types_x3ex3ex3d_Monad_Maybe(Data_String_parseInteger(csegen_136(), csegen_138(), $3.a2.a1), $36);
              };
              return Prelude_Types_x3ex3ex3d_Monad_Maybe(csegen_132()($1c => ($1c/Data_String_n__4702_8612_natpow(10.0, Prelude_Types_String_length($3.a1))))(csegen_133()(Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($3.a1), 0n))), $2d);
             };
             return Prelude_Types_x3ex3ex3d_Monad_Maybe(csegen_133()(Data_String_parseInteger(csegen_136(), csegen_138(), $1)), $15);
            }
            default: return {h: 0};
           }
          }
          case 0: /* nil */ {
           const $4d = w => {
            const $65 = f => {
             let $69;
             switch(Prelude_EqOrd_x3c_Ord_Double(w, Number(0n))) {
              case 1: {
               $69 = (-(f));
               break;
              }
              case 0: {
               $69 = f;
               break;
              }
             }
             const $68 = {a1: $69, a2: 0n};
             const $66 = {a1: w, a2: $68};
             return {a1: $66};
            };
            return Prelude_Types_x3ex3ex3d_Monad_Maybe(csegen_132()($54 => ($54/Data_String_n__4702_8612_natpow(10.0, Prelude_Types_String_length($3.a1))))(csegen_133()(Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($3.a1), 0n))), $65);
           };
           return Prelude_Types_x3ex3ex3d_Monad_Maybe(csegen_133()(Data_String_parseInteger(csegen_136(), csegen_138(), $1)), $4d);
          }
          default: return {h: 0};
         }
        }
       }
      }
      default: {
       switch($3.a2.h) {
        case undefined: /* cons */ {
         switch($3.a2.a2.h) {
          case 0: /* nil */ {
           const $7e = w => {
            const $96 = f => {
             const $9f = e => {
              let $a3;
              switch(Prelude_EqOrd_x3c_Ord_Double(w, Number(0n))) {
               case 1: {
                $a3 = (-(f));
                break;
               }
               case 0: {
                $a3 = f;
                break;
               }
              }
              const $a2 = {a1: $a3, a2: e};
              const $a0 = {a1: w, a2: $a2};
              return {a1: $a0};
             };
             return Prelude_Types_x3ex3ex3d_Monad_Maybe(Data_String_parseInteger(csegen_136(), csegen_138(), $3.a2.a1), $9f);
            };
            return Prelude_Types_x3ex3ex3d_Monad_Maybe(csegen_132()($85 => ($85/Data_String_n__4702_8612_natpow(10.0, Prelude_Types_String_length($3.a1))))(csegen_133()(Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($3.a1), 0n))), $96);
           };
           return Prelude_Types_x3ex3ex3d_Monad_Maybe(csegen_133()(Data_String_parseInteger(csegen_136(), csegen_138(), $1)), $7e);
          }
          default: return {h: 0};
         }
        }
        case 0: /* nil */ {
         const $b6 = w => {
          const $ce = f => {
           let $d2;
           switch(Prelude_EqOrd_x3c_Ord_Double(w, Number(0n))) {
            case 1: {
             $d2 = (-(f));
             break;
            }
            case 0: {
             $d2 = f;
             break;
            }
           }
           const $d1 = {a1: $d2, a2: 0n};
           const $cf = {a1: w, a2: $d1};
           return {a1: $cf};
          };
          return Prelude_Types_x3ex3ex3d_Monad_Maybe(csegen_132()($bd => ($bd/Data_String_n__4702_8612_natpow(10.0, Prelude_Types_String_length($3.a1))))(csegen_133()(Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($3.a1), 0n))), $ce);
         };
         return Prelude_Types_x3ex3ex3d_Monad_Maybe(csegen_133()(Data_String_parseInteger(csegen_136(), csegen_138(), $1)), $b6);
        }
        default: return {h: 0};
       }
      }
     }
    }
    default: {
     switch($3.a2.h) {
      case undefined: /* cons */ {
       switch($3.a2.a2.h) {
        case 0: /* nil */ {
         const $e7 = w => {
          const $ff = f => {
           const $108 = e => {
            let $10c;
            switch(Prelude_EqOrd_x3c_Ord_Double(w, Number(0n))) {
             case 1: {
              $10c = (-(f));
              break;
             }
             case 0: {
              $10c = f;
              break;
             }
            }
            const $10b = {a1: $10c, a2: e};
            const $109 = {a1: w, a2: $10b};
            return {a1: $109};
           };
           return Prelude_Types_x3ex3ex3d_Monad_Maybe(Data_String_parseInteger(csegen_136(), csegen_138(), $3.a2.a1), $108);
          };
          return Prelude_Types_x3ex3ex3d_Monad_Maybe(csegen_132()($ee => ($ee/Data_String_n__4702_8612_natpow(10.0, Prelude_Types_String_length($3.a1))))(csegen_133()(Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($3.a1), 0n))), $ff);
         };
         return Prelude_Types_x3ex3ex3d_Monad_Maybe(csegen_133()(Data_String_parseInteger(csegen_136(), csegen_138(), $1)), $e7);
        }
        default: return {h: 0};
       }
      }
      case 0: /* nil */ {
       const $11f = w => {
        const $137 = f => {
         let $13b;
         switch(Prelude_EqOrd_x3c_Ord_Double(w, Number(0n))) {
          case 1: {
           $13b = (-(f));
           break;
          }
          case 0: {
           $13b = f;
           break;
          }
         }
         const $13a = {a1: $13b, a2: 0n};
         const $138 = {a1: w, a2: $13a};
         return {a1: $138};
        };
        return Prelude_Types_x3ex3ex3d_Monad_Maybe(csegen_132()($126 => ($126/Data_String_n__4702_8612_natpow(10.0, Prelude_Types_String_length($3.a1))))(csegen_133()(Data_String_parseNumWithoutSign(Prelude_Types_fastUnpack($3.a1), 0n))), $137);
       };
       return Prelude_Types_x3ex3ex3d_Monad_Maybe(csegen_133()(Data_String_parseInteger(csegen_136(), csegen_138(), $1)), $11f);
      }
      default: return {h: 0};
     }
    }
   }
  }
  default: return {h: 0};
 }
}

/* Data.String.case block in parseDouble,wfe */
function Data_String_case__parseDoublex2cwfe_8780($0, $1) {
 switch($1.h) {
  case undefined: /* cons */ {
   switch($1.a2.h) {
    case 0: /* nil */ {
     const $4 = Data_String_split(csegen_139(), $1.a1);
     switch($4.h) {
      case undefined: /* cons */ {
       switch($4.a2.h) {
        case undefined: /* cons */ {
         switch($4.a2.a2.h) {
          case 0: /* nil */ return Prelude_Types_x3ex3ex3d_Monad_Maybe(csegen_133()(Data_String_parseInteger(csegen_136(), csegen_138(), $4.a1)), w => Prelude_Types_x3ex3ex3d_Monad_Maybe(Data_String_parseInteger(csegen_136(), csegen_138(), $4.a2.a1), e => ({a1: {a1: w, a2: {a1: 0.0, a2: e}}})));
          default: return {h: 0};
         }
        }
        case 0: /* nil */ return Prelude_Types_x3ex3ex3d_Monad_Maybe(csegen_133()(Data_String_parseInteger(csegen_136(), csegen_138(), $4.a1)), w => ({a1: {a1: w, a2: {a1: 0.0, a2: 0n}}}));
        default: return {h: 0};
       }
      }
      default: return {h: 0};
     }
    }
    case undefined: /* cons */ {
     switch($1.a2.a2.h) {
      case 0: /* nil */ return Data_String_case__casex20blockx20inx20parseDoublex2cwfe_8943($0, $1.a1, $1.a2.a1, Data_String_split(csegen_139(), $1.a2.a1));
      default: return {h: 0};
     }
    }
    default: return {h: 0};
   }
  }
  default: return {h: 0};
 }
}

/* Data.String.4702:8614:wfe */
function Data_String_n__4702_8614_wfe($0) {
 return Data_String_case__parseDoublex2cwfe_8780($0, Data_String_split($6 => Prelude_EqOrd_x3dx3d_Eq_Char($6, '.'), $0));
}

/* Data.String.4498:8426:parseIntTrimmed */
function Data_String_n__4498_8426_parseIntTrimmed($0, $1, $2, $3) {
 return Data_String_with__parseIntegerx2cparseIntTrimmed_8432(undefined, $0, $1, $3, $3, Data_String_strM($3));
}

/* Data.String.4707:8624:num */
function Data_String_n__4707_8624_num($0, $1, $2, $3) {
 switch($3) {
  case 0n: return 1.0;
  default: {
   switch(Prelude_EqOrd_x3c_Ord_Integer($3, 0n)) {
    case 1: return (Number($2)*Data_String_n__4707_8624_num($0, $1, $2, ($3+1n)));
    case 0: return (Number($2)*Data_String_n__4707_8624_num($0, $1, $2, ($3-1n)));
   }
  }
 }
}

/* Data.String.4702:8612:natpow */
function Data_String_n__4702_8612_natpow($0, $1) {
 switch($1) {
  case 0n: return 1.0;
  default: {
   const $3 = ($1-1n);
   return ($0*Data_String_n__4702_8612_natpow($0, $3));
  }
 }
}

/* Data.String.4702:8613:mkDouble */
function Data_String_n__4702_8613_mkDouble($0) {
 switch($0.h) {
  case undefined: /* just */ {
   const $4 = Data_String_n__4702_8611_intPow(10n, $0.a1.a2.a2);
   return {a1: (($0.a1.a1*$4)+($0.a1.a2.a1*$4))};
  }
  case 0: /* nothing */ return {h: 0};
 }
}

/* Data.String.4702:8611:intPow */
function Data_String_n__4702_8611_intPow($0, $1) {
 switch(Prelude_EqOrd_x3e_Ord_Integer($1, 0n)) {
  case 1: return Data_String_n__4707_8624_num($1, $0, $0, $1);
  case 0: return (Number(1n)/Data_String_n__4707_8624_num($1, $0, $0, $1));
 }
}

/* Data.String.trim : String -> String */
function Data_String_trim($0) {
 return Data_String_ltrim(_strReverse(Data_String_ltrim(_strReverse($0))));
}

/* Data.String.strM : (x : String) -> StrM x */
function Data_String_strM($0) {
 switch($0) {
  case '': return {h: 0};
  default: return {a1: ($0.charAt(0)), a2: ($0.slice(1))};
 }
}

/* Data.String.split : (Char -> Bool) -> String -> List1 String */
function Data_String_split($0, $1) {
 return Data_List1_map_Functor_List1($4 => Prelude_Types_fastPack($4), Data_List_split($0, Prelude_Types_fastUnpack($1)));
}

/* Data.String.parseInteger : Num a => Neg a => String -> Maybe a */
function Data_String_parseInteger($0, $1, $2) {
 return Data_String_n__4498_8426_parseIntTrimmed($0, $1, $2, Data_String_trim($2));
}

/* Data.String.parseDouble : String -> Maybe Double */
function Data_String_parseDouble($0) {
 return Data_String_n__4702_8613_mkDouble(Data_String_n__4702_8614_wfe(Data_String_trim($0)));
}

/* Data.String.ltrim : String -> String */
function Data_String_ltrim($0) {
 return Data_String_with__ltrim_7992($0, Data_String_asList($0));
}

/* Data.String.asList : (str : String) -> AsList str */
function Data_String_asList($0) {
 return Data_String_with__asList_7968($0, Data_String_strM($0));
}

/* Dice.Evaluator.case block in evaluate */
function Dice_Evaluator_case__evaluate_8674($0, $1, $2, $3, $4, $5) {
 switch($5.a1.h) {
  case 0: /* Left */ return $8 => ({h: 0 /* Left */, a1: $5.a1.a1});
  default: {
   switch($5.a2.h) {
    case 0: /* Left */ return $b => ({h: 0 /* Left */, a1: $5.a2.a1});
    default: return Dice_Evaluator_evalInfix($1, $5.a1.a1, $5.a2.a1);
   }
  }
 }
}

/* Dice.Evaluator.case block in evalInfix */
function Dice_Evaluator_case__evalInfix_8264($0, $1, $2) {
 switch($2.a1.h) {
  case 0: /* Left */ return $5 => ({h: 0 /* Left */, a1: $2.a1.a1});
  default: {
   switch($2.a2.h) {
    case 0: /* Left */ return $8 => ({h: 0 /* Left */, a1: $2.a2.a1});
    default: {
     let $c;
     switch(Dice_Value_isIntegralDouble($2.a1.a1)) {
      case 1: {
       switch(Dice_Value_isIntegralDouble($2.a2.a1)) {
        case 1: {
         $c = 0;
         break;
        }
        case 0: {
         $c = 1;
         break;
        }
       }
       break;
      }
      case 0: {
       $c = 1;
       break;
      }
     }
     switch($c) {
      case 1: return $13 => ({h: 0 /* Left */, a1: 'Both operands of random must be integer'});
      case 0: {
       const $15 = Dice_Value_doubleToInt($2.a1.a1);
       const $18 = Dice_Value_doubleToInt($2.a2.a1);
       return $1b => {
        switch(Prelude_EqOrd_x3ex3d_Ord_Int($15, $18)) {
         case 1: return {h: 0 /* Left */, a1: 'Left operand of random must be strictly less than right operand'};
         case 0: {
          const $21 = Dice_Random_randomInt($15, _sub32s($18, 1), $1b);
          return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: $21}};
         }
        }
       };
      }
     }
    }
   }
  }
 }
}

/* Dice.Evaluator.case block in evalInfix */
function Dice_Evaluator_case__evalInfix_8104($0, $1, $2) {
 switch($2.a1.h) {
  case 0: /* Left */ return $5 => ({h: 0 /* Left */, a1: $2.a1.a1});
  default: {
   switch($2.a2.h) {
    case 0: /* Left */ return $8 => ({h: 0 /* Left */, a1: $2.a2.a1});
    default: {
     let $c;
     switch(Dice_Value_isIntegralDouble($2.a1.a1)) {
      case 1: {
       switch(Dice_Value_isIntegralDouble($2.a2.a1)) {
        case 1: {
         $c = 0;
         break;
        }
        case 0: {
         $c = 1;
         break;
        }
       }
       break;
      }
      case 0: {
       $c = 1;
       break;
      }
     }
     switch($c) {
      case 1: return $13 => ({h: 0 /* Left */, a1: 'Both operands of range must be integers'});
      case 0: {
       const $15 = Dice_Value_doubleToInt($2.a1.a1);
       const $18 = Dice_Value_doubleToInt($2.a2.a1);
       switch(Prelude_EqOrd_x3c_Ord_Int($18, $15)) {
        case 1: return $1f => ({h: 1 /* Right */, a1: {h: 2 /* VArray */, a1: {h: 0}}});
        case 0: {
         const $22 = csegen_106()(n => ({h: 1 /* VNum */, a1: n}))(Dice_Evaluator_range($15, $18));
         return $2d => ({h: 1 /* Right */, a1: {h: 2 /* VArray */, a1: $22}});
        }
       }
      }
     }
    }
   }
  }
 }
}

/* Dice.Evaluator.case block in evalInfix */
function Dice_Evaluator_case__evalInfix_7867($0, $1, $2) {
 switch($2.a1.h) {
  case 0: /* Left */ return $5 => ({h: 0 /* Left */, a1: $2.a1.a1});
  default: {
   switch($2.a2.h) {
    case 0: /* Left */ return $8 => ({h: 0 /* Left */, a1: $2.a2.a1});
    default: {
     let $c;
     switch(Dice_Value_isIntegralDouble($2.a1.a1)) {
      case 1: {
       $c = Prelude_EqOrd_x3c_Ord_Double($2.a1.a1, Number(0n));
       break;
      }
      case 0: {
       $c = 1;
       break;
      }
     }
     switch($c) {
      case 1: return $14 => ({h: 0 /* Left */, a1: 'Left operand of dice must be a natural number'});
      case 0: {
       let $16;
       switch(Dice_Value_isIntegralDouble($2.a2.a1)) {
        case 1: {
         $16 = Prelude_EqOrd_x3cx3d_Ord_Double($2.a2.a1, Number(1n));
         break;
        }
        case 0: {
         $16 = 1;
         break;
        }
       }
       switch($16) {
        case 1: return $1e => ({h: 0 /* Left */, a1: 'Right operand of dice must be an integer > 1'});
        case 0: {
         const $22 = $23 => BigInt(Math.trunc($23));
         const $21 = $25 => $22($25);
         const $20 = $21($2.a1.a1);
         const $29 = Dice_Value_doubleToInt($2.a2.a1);
         return $2c => {
          switch(Prelude_EqOrd_x3dx3d_Eq_Integer($20, 0n)) {
           case 1: return {h: 1 /* Right */, a1: {h: 2 /* VArray */, a1: {h: 0}}};
           case 0: {
            const $44 = $45 => Prelude_Types_prim__integerToNat($45);
            const $43 = $48 => $44($48);
            const $42 = $43($20);
            const $3f = Data_List_replicateTR({h: 0}, $42, undefined);
            const $34 = Prelude_Types_traverse_Traversable_List(csegen_10(), $39 => $3a => Dice_Random_randomInt(1, $29, $3a), $3f);
            const $33 = $34($2c);
            return {h: 1 /* Right */, a1: {h: 2 /* VArray */, a1: csegen_106()($54 => ({h: 1 /* VNum */, a1: $54}))($33)}};
           }
          }
         };
        }
       }
      }
     }
    }
   }
  }
 }
}

/* Dice.Evaluator.3696:7202:v2e */
function Dice_Evaluator_n__3696_7202_v2e($0, $1, $2) {
 switch($2.h) {
  case 1: /* VNum */ return {h: 4 /* DDLiteral */, a1: {h: 1 /* DNumber */, a1: $2.a1}};
  case 0: /* VBool */ return {h: 4 /* DDLiteral */, a1: {h: 0 /* DBool */, a1: $2.a1}};
  case 2: /* VArray */ return {h: 4 /* DDLiteral */, a1: {h: 2 /* DArray */, a1: csegen_106()($e => Dice_Evaluator_n__3696_7202_v2e($0, $1, $e))($2.a1)}};
  case 3: /* VLambda */ return {h: 0 /* DLambda */, a1: $2.a1, a2: $2.a2};
 }
}

/* Dice.Evaluator.subst : Env -> DExpr -> DExpr */
function Dice_Evaluator_subst($0, $1) {
 switch($1.h) {
  case 5: /* DIdent */ {
   const $3 = Data_List_lookup(csegen_113(), $1.a1, $0);
   switch($3.h) {
    case undefined: /* just */ return Dice_Evaluator_n__3696_7202_v2e($1.a1, $0, $3.a1);
    case 0: /* nothing */ return {h: 5 /* DIdent */, a1: $1.a1};
   }
  }
  case 2: /* DInfix */ return {h: 2 /* DInfix */, a1: Dice_Evaluator_subst($0, $1.a1), a2: $1.a2, a3: Dice_Evaluator_subst($0, $1.a3)};
  case 1: /* DPrefix */ return {h: 1 /* DPrefix */, a1: $1.a1, a2: Dice_Evaluator_subst($0, $1.a2)};
  case 3: /* DCall */ return {h: 3 /* DCall */, a1: $1.a1, a2: csegen_106()($22 => Dice_Evaluator_subst($0, $22))($1.a2)};
  case 0: /* DLambda */ return {h: 0 /* DLambda */, a1: $1.a1, a2: Dice_Evaluator_subst($0, $1.a2)};
  case 6: /* DParen */ return {h: 6 /* DParen */, a1: Dice_Evaluator_subst($0, $1.a1)};
  case 4: /* DDLiteral */ return $1;
 }
}

/* Dice.Evaluator.range : Int -> Int -> List Int */
function Dice_Evaluator_range($0, $1) {
 switch(Prelude_EqOrd_x3e_Ord_Int($0, $1)) {
  case 1: return {h: 0};
  case 0: return {a1: $0, a2: Dice_Evaluator_range(_add32s($0, 1), $1)};
 }
}

/* Dice.Evaluator.evalPrefix : DPrefixOp -> Value -> OpResult Value */
function Dice_Evaluator_evalPrefix($0, $1) {
 switch($0) {
  case 0: {
   const $3 = Dice_Value_extractNumber($1);
   switch($3.h) {
    case 0: /* Left */ return {h: 0 /* Left */, a1: $3.a1};
    case 1: /* Right */ return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: (-($3.a1))}};
   }
  }
  case 1: {
   const $a = Dice_Value_extractBool($1);
   switch($a.h) {
    case 0: /* Left */ return {h: 0 /* Left */, a1: $a.a1};
    case 1: /* Right */ {
     let $f;
     switch($a.a1) {
      case 1: {
       $f = 0;
       break;
      }
      case 0: {
       $f = 1;
       break;
      }
     }
     const $e = {h: 0 /* VBool */, a1: $f};
     return {h: 1 /* Right */, a1: $e};
    }
   }
  }
 }
}

/* Dice.Evaluator.evalLiteral : DLiteral -> IO (OpResult Value) */
function Dice_Evaluator_evalLiteral($0, $1) {
 switch($0.h) {
  case 0: /* DBool */ return {h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: $0.a1}};
  case 1: /* DNumber */ return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: $0.a1}};
  case 2: /* DArray */ {
   const $7 = Prelude_Types_traverse_Traversable_List(csegen_10(), $d => Dice_Evaluator_evaluate($d), $0.a1)($1);
   const $16 = b => a => func => $17 => {
    switch($17.h) {
     case 0: /* Left */ return {h: 0 /* Left */, a1: $17.a1};
     case 1: /* Right */ return {h: 1 /* Right */, a1: func($17.a1)};
    }
   };
   const $20 = b => a => $21 => $22 => {
    switch($21.h) {
     case 0: /* Left */ return {h: 0 /* Left */, a1: $21.a1};
     case 1: /* Right */ {
      switch($22.h) {
       case 1: /* Right */ return {h: 1 /* Right */, a1: $21.a1($22.a1)};
       case 0: /* Left */ return {h: 0 /* Left */, a1: $22.a1};
      }
     }
    }
   };
   const $15 = {a1: $16, a2: a => $1e => ({h: 1 /* Right */, a1: $1e}), a3: $20};
   const $13 = Prelude_Interfaces_sequence($15, csegen_168(), $7);
   return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29($13, vals => ({h: 1 /* Right */, a1: {h: 2 /* VArray */, a1: vals}}));
  }
 }
}

/* Dice.Evaluator.evalInfix : DInfixOp -> Value -> Value -> IO (OpResult Value) */
function Dice_Evaluator_evalInfix($0, $1, $2) {
 switch($0) {
  case 0: return $4 => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($1), x => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($2), y => ({h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: (x+y)}})));
  case 1: return $13 => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($1), x => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($2), y => ({h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: (x-y)}})));
  case 2: return $22 => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($1), x => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($2), y => ({h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: (x*y)}})));
  case 3: {
   return $31 => {
    const $36 = x => {
     const $3b = y => {
      switch(Prelude_EqOrd_x3dx3d_Eq_Double(y, 0.0)) {
       case 1: return {h: 0 /* Left */, a1: 'Division by zero'};
       case 0: return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: (x/y)}};
      }
     };
     return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($2), $3b);
    };
    return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($1), $36);
   };
  }
  case 4: {
   return $45 => {
    const $4a = x => {
     const $4f = y => {
      switch(Prelude_EqOrd_x3dx3d_Eq_Double(y, 0.0)) {
       case 1: return {h: 0 /* Left */, a1: 'Modulo by zero'};
       case 0: {
        let $55;
        switch(Dice_Value_isIntegralDouble(x)) {
         case 1: {
          $55 = Dice_Value_isIntegralDouble(y);
          break;
         }
         case 0: {
          $55 = 0;
          break;
         }
        }
        switch($55) {
         case 1: {
          const $5b = Dice_Value_doubleToInt(x);
          const $5e = Dice_Value_doubleToInt(y);
          return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: Prelude_Num_mod_Integral_Int($5b, $5e)}};
         }
         case 0: return {h: 0 /* Left */, a1: 'Modulo requires integer operands'};
        }
       }
      }
     };
     return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($2), $4f);
    };
    return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($1), $4a);
   };
  }
  case 5: return $68 => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($1), x => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($2), y => ({h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: Math.pow(x, y)}})));
  case 6: return $77 => ({h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: Dice_Value_x3dx3d_Eq_Value($1, $2)}});
  case 7: {
   return $7d => {
    let $7f;
    switch(Dice_Value_x3dx3d_Eq_Value($1, $2)) {
     case 1: {
      $7f = 0;
      break;
     }
     case 0: {
      $7f = 1;
      break;
     }
    }
    const $7e = {h: 0 /* VBool */, a1: $7f};
    return {h: 1 /* Right */, a1: $7e};
   };
  }
  case 8: return $84 => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($1), x => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($2), y => ({h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: Prelude_EqOrd_x3e_Ord_Double(x, y)}})));
  case 9: return $94 => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($1), x => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($2), y => ({h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: Prelude_EqOrd_x3ex3d_Ord_Double(x, y)}})));
  case 10: return $a4 => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($1), x => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($2), y => ({h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: Prelude_EqOrd_x3c_Ord_Double(x, y)}})));
  case 11: return $b4 => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($1), x => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractNumber($2), y => ({h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: Prelude_EqOrd_x3cx3d_Ord_Double(x, y)}})));
  case 12: {
   return $c4 => {
    const $c9 = x => {
     const $ce = y => {
      let $d0;
      switch(x) {
       case 1: {
        $d0 = y;
        break;
       }
       case 0: {
        $d0 = 0;
        break;
       }
      }
      const $cf = {h: 0 /* VBool */, a1: $d0};
      return {h: 1 /* Right */, a1: $cf};
     };
     return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractBool($2), $ce);
    };
    return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractBool($1), $c9);
   };
  }
  case 13: {
   return $d2 => {
    const $d7 = x => {
     const $dc = y => {
      let $de;
      switch(x) {
       case 1: {
        $de = 1;
        break;
       }
       case 0: {
        $de = y;
        break;
       }
      }
      const $dd = {h: 0 /* VBool */, a1: $de};
      return {h: 1 /* Right */, a1: $dd};
     };
     return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractBool($2), $dc);
    };
    return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractBool($1), $d7);
   };
  }
  case 14: return Dice_Evaluator_case__evalInfix_7867($2, $1, {a1: Dice_Value_extractNumber($1), a2: Dice_Value_extractNumber($2)});
  case 16: return Dice_Evaluator_case__evalInfix_8104($2, $1, {a1: Dice_Value_extractNumber($1), a2: Dice_Value_extractNumber($2)});
  case 15: return Dice_Evaluator_case__evalInfix_8264($2, $1, {a1: Dice_Value_extractNumber($1), a2: Dice_Value_extractNumber($2)});
  case 17: {
   return $fe => {
    switch($1.h) {
     case 2: /* VArray */ {
      switch($2.h) {
       case 2: /* VArray */ return {h: 1 /* Right */, a1: {h: 2 /* VArray */, a1: Prelude_Types_List_tailRecAppend($1.a1, $2.a1)}};
       default: return {h: 0 /* Left */, a1: ('Concat requires both operands to be arrays but got: '+(Dice_Value_show_Show_Value($1)+(' and '+Dice_Value_show_Show_Value($2))))};
      }
     }
     default: return {h: 0 /* Left */, a1: ('Concat requires both operands to be arrays but got: '+(Dice_Value_show_Show_Value($1)+(' and '+Dice_Value_show_Show_Value($2))))};
    }
   };
  }
  case 18: {
   return $11c => {
    switch($2.h) {
     case 2: /* VArray */ return {h: 1 /* Right */, a1: {h: 2 /* VArray */, a1: {a1: $1, a2: $2.a1}}};
     default: return {h: 0 /* Left */, a1: ('Colon requires right operand to be an arra but got: '+Dice_Value_show_Show_Value($2))};
    }
   };
  }
 }
}

/* Dice.Evaluator.evalCall : DCallHead -> List Value -> IO (OpResult Value) */
function Dice_Evaluator_evalCall($0, $1) {
 switch($0.h) {
  case 1: /* DIdentHead */ {
   const $3 = Data_List_lookup(csegen_113(), $0.a1, Dice_Internal_builtinFunctions());
   switch($3.h) {
    case undefined: /* just */ return $3.a1($1);
    case 0: /* nothing */ {
     const $c = Data_List_lookup(csegen_113(), $0.a1, Dice_Internal_builtinWithLambdaFunctions());
     switch($c.h) {
      case undefined: /* just */ return $c.a1($16 => $17 => Dice_Evaluator_evalBuiltinWithLambda($16, $17))($1);
      case 0: /* nothing */ return $1c => ({h: 0 /* Left */, a1: ('Undefined function: '+$0.a1)});
     }
    }
   }
  }
  case 0: /* DLambdaHead */ {
   switch(((Prelude_Types_List_lengthTR($0.a1)===Prelude_Types_List_lengthTR($1))?1:0)) {
    case 1: return Dice_Evaluator_evaluate(Dice_Evaluator_subst(Data_List_zip_Zippable_List($0.a1, $1), $0.a2));
    case 0: return $2f => ({h: 0 /* Left */, a1: ('Wrong number of arguments for lambda: expected '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0.a1))+(' but got '+Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($1)))))});
   }
  }
 }
}

/* Dice.Evaluator.evalBuiltinWithLambda : Value -> List Value -> IO (OpResult Value) */
function Dice_Evaluator_evalBuiltinWithLambda($0, $1) {
 switch($0.h) {
  case 3: /* VLambda */ return Dice_Evaluator_evalCall({h: 0 /* DLambdaHead */, a1: $0.a1, a2: $0.a2}, $1);
  default: return $8 => ({h: 0 /* Left */, a1: ('Expected a lambda but got: '+Dice_Value_show_Show_Value($0))});
 }
}

/* Dice.Internal.case block in IflatMap */
function Dice_Internal_case__IflatMap_6855($0, $1, $2, $3) {
 switch($2.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $2.a1};
  case 1: /* Right */ {
   const $7 = Dice_Internal_Imap($1, {a1: {h: 2 /* VArray */, a1: $2.a1.a1}, a2: {a1: $2.a1.a2, a2: {h: 0}}}, $3);
   switch($7.h) {
    case 0: /* Left */ return {h: 0 /* Left */, a1: $7.a1};
    case 1: /* Right */ {
     switch($7.a1.h) {
      case 2: /* VArray */ {
       const $1f = v => {
        switch(v.h) {
         case 2: /* VArray */ return v.a1;
         default: return {a1: v, a2: {h: 0}};
        }
       };
       const $15 = Prelude_Types_foldMap_Foldable_List({a1: $19 => $1a => Prelude_Types_List_tailRecAppend($19, $1a), a2: {h: 0}}, $1f, $7.a1.a1);
       const $14 = {h: 2 /* VArray */, a1: $15};
       return {h: 1 /* Right */, a1: $14};
      }
      default: return {h: 0 /* Left */, a1: csegen_0()('Expects an array')};
     }
    }
   }
  }
 }
}

/* Dice.Internal.case block in Ifilter */
function Dice_Internal_case__Ifilter_6647($0, $1, $2, $3) {
 switch($2.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $2.a1};
  case 1: /* Right */ {
   const $7 = Prelude_Types_traverse_Traversable_List(csegen_10(), x => $1($2.a1.a2)({a1: x, a2: {h: 0}}), $2.a1.a1)($3);
   const $18 = b => a => func => $19 => {
    switch($19.h) {
     case 0: /* Left */ return {h: 0 /* Left */, a1: $19.a1};
     case 1: /* Right */ return {h: 1 /* Right */, a1: func($19.a1)};
    }
   };
   const $22 = b => a => $23 => $24 => {
    switch($23.h) {
     case 0: /* Left */ return {h: 0 /* Left */, a1: $23.a1};
     case 1: /* Right */ {
      switch($24.h) {
       case 1: /* Right */ return {h: 1 /* Right */, a1: $23.a1($24.a1)};
       case 0: /* Left */ return {h: 0 /* Left */, a1: $24.a1};
      }
     }
    }
   };
   const $17 = {a1: $18, a2: a => $20 => ({h: 1 /* Right */, a1: $20}), a3: $22};
   const $15 = Prelude_Interfaces_sequence($17, csegen_168(), $7);
   switch($15.h) {
    case 0: /* Left */ return {h: 0 /* Left */, a1: $15.a1};
    case 1: /* Right */ {
     const $3d = $3e => {
      switch($3e.a2.h) {
       case 0: /* VBool */ {
        switch($3e.a2.a1) {
         case 1: return 1;
         default: return 0;
        }
       }
       default: return 0;
      }
     };
     const $3a = Prelude_Types_List_filterAppend({h: 0}, $3d, Data_List_zip_Zippable_List($2.a1.a1, $15.a1));
     const $32 = csegen_106()($37 => Builtin_fst($37))($3a);
     const $31 = {h: 2 /* VArray */, a1: $32};
     return {h: 1 /* Right */, a1: $31};
    }
   }
  }
 }
}

/* Dice.Internal.case block in Isome */
function Dice_Internal_case__Isome_6412($0, $1, $2, $3) {
 switch($2.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $2.a1};
  case 1: /* Right */ {
   const $7 = Prelude_Types_traverse_Traversable_List(csegen_10(), x => $1($2.a1.a2)({a1: x, a2: {h: 0}}), $2.a1.a1)($3);
   const $18 = b => a => func => $19 => {
    switch($19.h) {
     case 0: /* Left */ return {h: 0 /* Left */, a1: $19.a1};
     case 1: /* Right */ return {h: 1 /* Right */, a1: func($19.a1)};
    }
   };
   const $22 = b => a => $23 => $24 => {
    switch($23.h) {
     case 0: /* Left */ return {h: 0 /* Left */, a1: $23.a1};
     case 1: /* Right */ {
      switch($24.h) {
       case 1: /* Right */ return {h: 1 /* Right */, a1: $23.a1($24.a1)};
       case 0: /* Left */ return {h: 0 /* Left */, a1: $24.a1};
      }
     }
    }
   };
   const $17 = {a1: $18, a2: a => $20 => ({h: 1 /* Right */, a1: $20}), a3: $22};
   const $15 = Prelude_Interfaces_sequence($17, csegen_168(), $7);
   switch($15.h) {
    case 0: /* Left */ return {h: 0 /* Left */, a1: $15.a1};
    case 1: /* Right */ {
     const $36 = v => {
      switch(v.h) {
       case 0: /* VBool */ return v.a1;
       default: return 0;
      }
     };
     const $32 = Prelude_Types_foldMap_Foldable_List(csegen_67(), $36, $15.a1);
     const $31 = {h: 0 /* VBool */, a1: $32};
     return {h: 1 /* Right */, a1: $31};
    }
   }
  }
 }
}

/* Dice.Internal.case block in Ievery */
function Dice_Internal_case__Ievery_6303($0, $1, $2, $3) {
 switch($2.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $2.a1};
  case 1: /* Right */ {
   const $7 = Prelude_Types_traverse_Traversable_List(csegen_10(), x => $1($2.a1.a2)({a1: x, a2: {h: 0}}), $2.a1.a1)($3);
   const $18 = b => a => func => $19 => {
    switch($19.h) {
     case 0: /* Left */ return {h: 0 /* Left */, a1: $19.a1};
     case 1: /* Right */ return {h: 1 /* Right */, a1: func($19.a1)};
    }
   };
   const $22 = b => a => $23 => $24 => {
    switch($23.h) {
     case 0: /* Left */ return {h: 0 /* Left */, a1: $23.a1};
     case 1: /* Right */ {
      switch($24.h) {
       case 1: /* Right */ return {h: 1 /* Right */, a1: $23.a1($24.a1)};
       case 0: /* Left */ return {h: 0 /* Left */, a1: $24.a1};
      }
     }
    }
   };
   const $17 = {a1: $18, a2: a => $20 => ({h: 1 /* Right */, a1: $20}), a3: $22};
   const $15 = Prelude_Interfaces_sequence($17, csegen_168(), $7);
   switch($15.h) {
    case 0: /* Left */ return {h: 0 /* Left */, a1: $15.a1};
    case 1: /* Right */ return Dice_Internal_Iand($15.a1, $3);
   }
  }
 }
}

/* Dice.Internal.case block in Igt */
function Dice_Internal_case__Igt_4241($0, $1) {
 return $2 => {
  switch($1.h) {
   case 0: /* Left */ return {h: 0 /* Left */, a1: $1.a1};
   case 1: /* Right */ {
    switch($1.a1.h) {
     case 0: /* nil */ return {h: 0 /* Left */, a1: 'Expects at least one number'};
     case undefined: /* cons */ {
      switch($1.a1.a2.h) {
       case 0: /* nil */ return {h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: 1}};
       default: return {h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: Prelude_Types_foldMap_Foldable_List(csegen_179(), csegen_180(), Dice_Internal_adjacentPairs($1.a1))}};
      }
     }
     default: return {h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: Prelude_Types_foldMap_Foldable_List(csegen_179(), csegen_180(), Dice_Internal_adjacentPairs($1.a1))}};
    }
   }
  }
 };
}

/* Dice.Internal.case block in Ilt */
function Dice_Internal_case__Ilt_4148($0, $1) {
 return $2 => {
  switch($1.h) {
   case 0: /* Left */ return {h: 0 /* Left */, a1: $1.a1};
   case 1: /* Right */ {
    switch($1.a1.h) {
     case 0: /* nil */ return {h: 0 /* Left */, a1: 'Expects at least one number'};
     case undefined: /* cons */ {
      switch($1.a1.a2.h) {
       case 0: /* nil */ return {h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: 1}};
       default: return {h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: Prelude_Types_foldMap_Foldable_List(csegen_179(), csegen_181(), Dice_Internal_adjacentPairs($1.a1))}};
      }
     }
     default: return {h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: Prelude_Types_foldMap_Foldable_List(csegen_179(), csegen_181(), Dice_Internal_adjacentPairs($1.a1))}};
    }
   }
  }
 };
}

/* Dice.Internal.7272:7037:step */
function Dice_Internal_n__7272_7037_step($0, $1, $2, $3, $4, $5, $6) {
 switch($5.h) {
  case 0: /* Left */ return $8 => ({h: 0 /* Left */, a1: $5.a1});
  case 1: /* Right */ return $0($3)({a1: $5.a1, a2: {a1: $6, a2: {h: 0}}});
 }
}

/* Dice.Internal.typeCheckAll : (Value -> OpResult a) -> List Value -> OpResult (List a) */
function Dice_Internal_typeCheckAll($0, $1) {
 const $4 = b => a => func => $5 => {
  switch($5.h) {
   case 0: /* Left */ return {h: 0 /* Left */, a1: $5.a1};
   case 1: /* Right */ return {h: 1 /* Right */, a1: func($5.a1)};
  }
 };
 const $e = b => a => $f => $10 => {
  switch($f.h) {
   case 0: /* Left */ return {h: 0 /* Left */, a1: $f.a1};
   case 1: /* Right */ {
    switch($10.h) {
     case 1: /* Right */ return {h: 1 /* Right */, a1: $f.a1($10.a1)};
     case 0: /* Left */ return {h: 0 /* Left */, a1: $10.a1};
    }
   }
  }
 };
 const $3 = {a1: $4, a2: a => $c => ({h: 1 /* Right */, a1: $c}), a3: $e};
 return Prelude_Types_traverse_Traversable_List($3, $0, $1);
}

/* Dice.Internal.singleNum : (Double -> Double) -> List Value -> IO (OpResult Value) */
function Dice_Internal_singleNum($0, $1) {
 switch($1.h) {
  case undefined: /* cons */ {
   return $3 => {
    switch($1.a1.h) {
     case 1: /* VNum */ {
      switch($1.a2.h) {
       case 0: /* nil */ return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: $0($1.a1.a1)}};
       default: {
        switch($1.a2.h) {
         case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects a number but got '+Dice_Value_show_Show_Value($1.a1))};
         default: return {h: 0 /* Left */, a1: ('Expects one number but got '+Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($1)))};
        }
       }
      }
     }
     default: {
      switch($1.a2.h) {
       case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects a number but got '+Dice_Value_show_Show_Value($1.a1))};
       default: return {h: 0 /* Left */, a1: ('Expects one number but got '+Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($1)))};
      }
     }
    }
   };
  }
  default: return $24 => ({h: 0 /* Left */, a1: ('Expects one number but got '+Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($1)))});
 }
}

/* Dice.Internal.extractArrayWithLambda : List Value -> OpResult (List Value, Value) */
function Dice_Internal_extractArrayWithLambda($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   switch($0.a2.h) {
    case undefined: /* cons */ {
     switch($0.a2.a2.h) {
      case 0: /* nil */ return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29(Dice_Value_extractArray($0.a1), arr => ({h: 1 /* Right */, a1: {a1: arr, a2: $0.a2.a1}}));
      default: return {h: 0 /* Left */, a1: 'Expects an array and a lambda'};
     }
    }
    default: return {h: 0 /* Left */, a1: 'Expects an array and a lambda'};
   }
  }
  default: return {h: 0 /* Left */, a1: 'Expects an array and a lambda'};
 }
}

/* Dice.Internal.builtinWithLambdaFunctions : HashMap String BuiltinWithLambdaFunction */
const Dice_Internal_builtinWithLambdaFunctions = __lazy(function () {
 return {a1: {a1: 'every', a2: $3 => $4 => Dice_Internal_Ievery($3, $4)}, a2: {a1: {a1: 'some', a2: $c => $d => Dice_Internal_Isome($c, $d)}, a2: {a1: {a1: 'map', a2: $15 => $16 => $17 => Dice_Internal_Imap($15, $16, $17)}, a2: {a1: {a1: 'filter', a2: $20 => $21 => Dice_Internal_Ifilter($20, $21)}, a2: {a1: {a1: 'flatMap', a2: $29 => $2a => Dice_Internal_IflatMap($29, $2a)}, a2: {a1: {a1: 'reduce', a2: $32 => $33 => Dice_Internal_Ireduce($32, $33)}, a2: {h: 0}}}}}}};
});

/* Dice.Internal.builtinFunctions : HashMap String BuiltinFunction */
const Dice_Internal_builtinFunctions = __lazy(function () {
 return {a1: {a1: 'add', a2: $3 => $4 => Dice_Internal_Iadd($3, $4)}, a2: {a1: {a1: 'mul', a2: csegen_202()}, a2: {a1: {a1: 'sub', a2: $11 => $12 => Dice_Internal_Isub($11, $12)}, a2: {a1: {a1: 'per', a2: $1a => $1b => Dice_Internal_Idiv($1a, $1b)}, a2: {a1: {a1: 'pow', a2: $23 => $24 => Dice_Internal_Ipow($23, $24)}, a2: {a1: {a1: 'sin', a2: $2c => Dice_Internal_Isin($2c)}, a2: {a1: {a1: 'cos', a2: $33 => Dice_Internal_Icos($33)}, a2: {a1: {a1: 'tan', a2: $3a => Dice_Internal_Itan($3a)}, a2: {a1: {a1: 'cot', a2: $41 => Dice_Internal_Icot($41)}, a2: {a1: {a1: 'sec', a2: $48 => Dice_Internal_Isec($48)}, a2: {a1: {a1: 'csc', a2: $4f => Dice_Internal_Icsc($4f)}, a2: {a1: {a1: 'asin', a2: $56 => Dice_Internal_Iasin($56)}, a2: {a1: {a1: 'acos', a2: $5d => Dice_Internal_Iacos($5d)}, a2: {a1: {a1: 'atan', a2: $64 => Dice_Internal_Iatan($64)}, a2: {a1: {a1: 'sinh', a2: $6b => Dice_Internal_Isinh($6b)}, a2: {a1: {a1: 'cosh', a2: $72 => Dice_Internal_Icosh($72)}, a2: {a1: {a1: 'tanh', a2: $79 => Dice_Internal_Itanh($79)}, a2: {a1: {a1: 'coth', a2: $80 => Dice_Internal_Icoth($80)}, a2: {a1: {a1: 'sech', a2: $87 => Dice_Internal_Isech($87)}, a2: {a1: {a1: 'csch', a2: $8e => Dice_Internal_Icsch($8e)}, a2: {a1: {a1: 'acosh', a2: $95 => Dice_Internal_Iacosh($95)}, a2: {a1: {a1: 'asinh', a2: $9c => Dice_Internal_Iasinh($9c)}, a2: {a1: {a1: 'atanh', a2: $a3 => Dice_Internal_Iatanh($a3)}, a2: {a1: {a1: 'cbrt', a2: $aa => Dice_Internal_Icbrt($aa)}, a2: {a1: {a1: 'sqrt', a2: $b1 => Dice_Internal_Isqrt($b1)}, a2: {a1: {a1: 'ceil', a2: $b8 => Dice_Internal_Iceil($b8)}, a2: {a1: {a1: 'floor', a2: $bf => Dice_Internal_Ifloor($bf)}, a2: {a1: {a1: 'round', a2: $c6 => Dice_Internal_Iround($c6)}, a2: {a1: {a1: 'abs', a2: $cd => Dice_Internal_Iabs($cd)}, a2: {a1: {a1: 'trunc', a2: $d4 => Dice_Internal_Itrunc($d4)}, a2: {a1: {a1: 'fround', a2: $db => Dice_Internal_Ifround($db)}, a2: {a1: {a1: 'hypot', a2: $e2 => $e3 => Dice_Internal_Ihypot($e2, $e3)}, a2: {a1: {a1: 'imul', a2: csegen_202()}, a2: {a1: {a1: 'max', a2: $f0 => $f1 => Dice_Internal_Imax($f0, $f1)}, a2: {a1: {a1: 'min', a2: $f9 => $fa => Dice_Internal_Imin($f9, $fa)}, a2: {a1: {a1: 'log', a2: $102 => Dice_Internal_Ilog($102)}, a2: {a1: {a1: 'exp', a2: $109 => Dice_Internal_Iexp($109)}, a2: {a1: {a1: 'and', a2: $110 => $111 => Dice_Internal_Iand($110, $111)}, a2: {a1: {a1: 'or', a2: $119 => $11a => Dice_Internal_Ior($119, $11a)}, a2: {a1: {a1: 'not', a2: $122 => Dice_Internal_Inot($122)}, a2: {a1: {a1: 'eq', a2: $129 => $12a => Dice_Internal_Ieq($129, $12a)}, a2: {a1: {a1: 'neq', a2: $132 => $133 => Dice_Internal_Ineq($132, $133)}, a2: {a1: {a1: 'lt', a2: $13b => Dice_Internal_Ilt($13b)}, a2: {a1: {a1: 'gt', a2: $142 => Dice_Internal_Igt($142)}, a2: {a1: {a1: 'if', a2: $149 => Dice_Internal_Iif($149)}, a2: {a1: {a1: 'array', a2: $150 => $151 => Dice_Internal_Iarray($150, $151)}, a2: {a1: {a1: 'length', a2: $159 => Dice_Internal_Ilength($159)}, a2: {a1: {a1: 'fill', a2: $160 => Dice_Internal_Ifill($160)}, a2: {a1: {a1: 'slice', a2: $167 => Dice_Internal_Islice($167)}, a2: {a1: {a1: 'sum', a2: $16e => Dice_Internal_Isum($16e)}, a2: {a1: {a1: 'union', a2: $175 => Dice_Internal_Iunion($175)}, a2: {a1: {a1: 'intersection', a2: $17c => Dice_Internal_Iintersection($17c)}, a2: {a1: {a1: 'offset', a2: $183 => Dice_Internal_Ioffset($183)}, a2: {a1: {a1: 'contain', a2: $18a => Dice_Internal_Icontain($18a)}, a2: {a1: {a1: 'include', a2: $191 => Dice_Internal_Iinclude($191)}, a2: {a1: {a1: 'shuffle', a2: $198 => Dice_Internal_Ishuffle($198)}, a2: {a1: {a1: 'pick', a2: $19f => Dice_Internal_Ipick($19f)}, a2: {a1: {a1: 'int', a2: $1a6 => Dice_Internal_Iint($1a6)}, a2: {a1: {a1: 'real', a2: $1ad => Dice_Internal_Ireal($1ad)}, a2: {a1: {a1: 'bool', a2: $1b4 => Dice_Internal_Ibool($1b4)}, a2: {h: 0}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}};
});

/* Dice.Internal.adjacentPairs : List a -> List (a, a) */
function Dice_Internal_adjacentPairs($0) {
 switch($0.h) {
  case 0: /* nil */ return {h: 0};
  case undefined: /* cons */ {
   switch($0.a2.h) {
    case 0: /* nil */ return {h: 0};
    case undefined: /* cons */ return {a1: {a1: $0.a1, a2: $0.a2.a1}, a2: Dice_Internal_adjacentPairs({a1: $0.a2.a1, a2: $0.a2.a2})};
   }
  }
 }
}

/* Dice.Internal.Iunion : BuiltinFunction */
function Dice_Internal_Iunion($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   switch($0.a1.h) {
    case 2: /* VArray */ {
     switch($0.a2.h) {
      case undefined: /* cons */ {
       switch($0.a2.a1.h) {
        case 2: /* VArray */ {
         return $5 => {
          switch($0.a2.a2.h) {
           case 0: /* nil */ {
            const $e = y => {
             switch(Prelude_Types_elem(csegen_163(), csegen_110(), y, $0.a1.a1)) {
              case 1: return 0;
              case 0: return 1;
             }
            };
            const $b = Prelude_Types_List_filterAppend({h: 0}, $e, $0.a2.a1.a1);
            const $8 = Prelude_Types_List_tailRecAppend($0.a1.a1, $b);
            const $7 = {h: 2 /* VArray */, a1: $8};
            return {h: 1 /* Right */, a1: $7};
           }
           default: {
            switch($0.a2.h) {
             case undefined: /* cons */ {
              switch($0.a2.a2.h) {
               case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
               default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
              }
             }
             default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           }
          }
         };
        }
        default: {
         return $37 => {
          switch($0.a2.h) {
           case undefined: /* cons */ {
            switch($0.a2.a2.h) {
             case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
             default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           }
           default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         };
        }
       }
      }
      default: {
       return $57 => {
        switch($0.a2.h) {
         case undefined: /* cons */ {
          switch($0.a2.a2.h) {
           case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
           default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         }
         default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       };
      }
     }
    }
    default: {
     return $77 => {
      switch($0.a2.h) {
       case undefined: /* cons */ {
        switch($0.a2.a2.h) {
         case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
         default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       }
       default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
      }
     };
    }
   }
  }
  default: return $97 => ({h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))});
 }
}

/* Dice.Internal.Itrunc : List Value -> IO (OpResult Value) */
function Dice_Internal_Itrunc($0) {
 return Dice_Internal_singleNum(x => Number(BigInt(Math.trunc(x))), $0);
}

/* Dice.Internal.Itanh : BuiltinFunction */
function Dice_Internal_Itanh($0) {
 return Dice_Internal_singleNum($3 => Prelude_Types_tanh($3), $0);
}

/* Dice.Internal.Itan : BuiltinFunction */
function Dice_Internal_Itan($0) {
 return Dice_Internal_singleNum($3 => Math.tan($3), $0);
}

/* Dice.Internal.Isum : BuiltinFunction */
function Dice_Internal_Isum($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   return $2 => {
    switch($0.a1.h) {
     case 2: /* VArray */ {
      switch($0.a2.h) {
       case 0: /* nil */ {
        const $5 = Dice_Internal_typeCheckAll($8 => Dice_Value_extractNumber($8), $0.a1.a1);
        switch($5.h) {
         case 0: /* Left */ return {h: 0 /* Left */, a1: $5.a1};
         case 1: /* Right */ return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: Prelude_Interfaces_sum(csegen_335(), csegen_163(), $5.a1)}};
        }
       }
       default: return {h: 0 /* Left */, a1: 'Expects an array'};
      }
     }
     default: return {h: 0 /* Left */, a1: 'Expects an array'};
    }
   };
  }
  default: return $17 => ({h: 0 /* Left */, a1: 'Expects an array'});
 }
}

/* Dice.Internal.Isub : BuiltinFunction */
function Dice_Internal_Isub($0, $1) {
 const $2 = Dice_Internal_typeCheckAll($5 => Dice_Value_extractNumber($5), $0);
 switch($2.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $2.a1};
  case 1: /* Right */ {
   switch($2.a1.h) {
    case undefined: /* cons */ return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: Prelude_Types_foldl_Foldable_List($f => $10 => ($f-$10), $2.a1.a1, $2.a1.a2)}};
    case 0: /* nil */ return {h: 0 /* Left */, a1: 'Expects at least one number'};
   }
  }
 }
}

/* Dice.Internal.Isqrt : List Value -> IO (OpResult Value) */
function Dice_Internal_Isqrt($0) {
 return Dice_Internal_singleNum($3 => Math.sqrt($3), $0);
}

/* Dice.Internal.Isome : BuiltinWithLambdaFunction */
function Dice_Internal_Isome($0, $1) {
 return $2 => Dice_Internal_case__Isome_6412($1, $0, Dice_Internal_extractArrayWithLambda($1), $2);
}

/* Dice.Internal.Islice : BuiltinFunction */
function Dice_Internal_Islice($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   switch($0.a1.h) {
    case 2: /* VArray */ {
     switch($0.a2.h) {
      case undefined: /* cons */ {
       switch($0.a2.a1.h) {
        case 1: /* VNum */ {
         switch($0.a2.a2.h) {
          case undefined: /* cons */ {
           switch($0.a2.a2.a1.h) {
            case 1: /* VNum */ {
             switch($0.a2.a2.a2.h) {
              case 0: /* nil */ {
               const $8 = Prelude_Types_prim__integerToNat(BigInt(Math.trunc($0.a2.a1.a1)));
               const $c = Prelude_Types_prim__integerToNat(BigInt(Math.trunc($0.a2.a2.a1.a1)));
               return $10 => ({h: 1 /* Right */, a1: {h: 2 /* VArray */, a1: Data_List_take($c, Data_List_drop($8, $0.a1.a1))}});
              }
              default: return $19 => ({h: 0 /* Left */, a1: 'Expects an array and two numbers'});
             }
            }
            default: return $1b => ({h: 0 /* Left */, a1: 'Expects an array and two numbers'});
           }
          }
          default: return $1d => ({h: 0 /* Left */, a1: 'Expects an array and two numbers'});
         }
        }
        default: return $1f => ({h: 0 /* Left */, a1: 'Expects an array and two numbers'});
       }
      }
      default: return $21 => ({h: 0 /* Left */, a1: 'Expects an array and two numbers'});
     }
    }
    default: return $23 => ({h: 0 /* Left */, a1: 'Expects an array and two numbers'});
   }
  }
  default: return $25 => ({h: 0 /* Left */, a1: 'Expects an array and two numbers'});
 }
}

/* Dice.Internal.Isinh : BuiltinFunction */
function Dice_Internal_Isinh($0) {
 return Dice_Internal_singleNum($3 => Prelude_Types_sinh($3), $0);
}

/* Dice.Internal.Isin : BuiltinFunction */
function Dice_Internal_Isin($0) {
 return Dice_Internal_singleNum($3 => Math.sin($3), $0);
}

/* Dice.Internal.Ishuffle : BuiltinFunction */
function Dice_Internal_Ishuffle($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   return $2 => {
    switch($0.a1.h) {
     case 2: /* VArray */ {
      switch($0.a2.h) {
       case 0: /* nil */ {
        const $5 = Dice_Internal_n__5085_4912_shuffleList($0.a1.a1, $0.a1.a1, $2);
        return {h: 1 /* Right */, a1: {h: 2 /* VArray */, a1: $5}};
       }
       default: {
        switch($0.a2.h) {
         case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects an array but got '+Dice_Value_show_Show_Value($0.a1))};
         default: return {h: 0 /* Left */, a1: ('Expects an array but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       }
      }
     }
     default: {
      switch($0.a2.h) {
       case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects an array but got '+Dice_Value_show_Show_Value($0.a1))};
       default: return {h: 0 /* Left */, a1: ('Expects an array but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
      }
     }
    }
   };
  }
  default: return $2a => ({h: 0 /* Left */, a1: ('Expects an array but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))});
 }
}

/* Dice.Internal.Isech : BuiltinFunction */
function Dice_Internal_Isech($0) {
 return Dice_Internal_singleNum(x => (Number(1n)/Prelude_Types_cosh(x)), $0);
}

/* Dice.Internal.Isec : BuiltinFunction */
function Dice_Internal_Isec($0) {
 return Dice_Internal_singleNum(x => (Number(1n)/Math.cos(x)), $0);
}

/* Dice.Internal.Iround : List Value -> IO (OpResult Value) */
function Dice_Internal_Iround($0) {
 return Dice_Internal_singleNum(x => Number(BigInt(Math.trunc((x+0.5)))), $0);
}

/* Dice.Internal.Ireduce : BuiltinWithLambdaFunction */
function Dice_Internal_Ireduce($0, $1) {
 switch($1.h) {
  case undefined: /* cons */ {
   switch($1.a1.h) {
    case 2: /* VArray */ {
     switch($1.a2.h) {
      case undefined: /* cons */ {
       switch($1.a2.a2.h) {
        case undefined: /* cons */ {
         switch($1.a2.a2.a2.h) {
          case 0: /* nil */ return Prelude_Types_foldlM_Foldable_List(csegen_16(), $b => $c => Dice_Internal_n__7272_7037_step($0, $1.a1.a1, $1.a2.a1, $1.a2.a2.a1, $1, $b, $c), {h: 1 /* Right */, a1: $1.a2.a1}, $1.a1.a1);
          default: return $18 => ({h: 0 /* Left */, a1: 'Expects an array, an initial value, and a lambda'});
         }
        }
        default: return $1a => ({h: 0 /* Left */, a1: 'Expects an array, an initial value, and a lambda'});
       }
      }
      default: return $1c => ({h: 0 /* Left */, a1: 'Expects an array, an initial value, and a lambda'});
     }
    }
    default: return $1e => ({h: 0 /* Left */, a1: 'Expects an array, an initial value, and a lambda'});
   }
  }
  default: return $20 => ({h: 0 /* Left */, a1: 'Expects an array, an initial value, and a lambda'});
 }
}

/* Dice.Internal.Ireal : BuiltinFunction */
function Dice_Internal_Ireal($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   switch($0.a1.h) {
    case 1: /* VNum */ {
     switch($0.a2.h) {
      case undefined: /* cons */ {
       switch($0.a2.a1.h) {
        case 1: /* VNum */ {
         return $5 => {
          switch($0.a2.a2.h) {
           case 0: /* nil */ {
            switch(Prelude_EqOrd_x3ex3d_Ord_Double($0.a1.a1, $0.a2.a1.a1)) {
             case 1: return {h: 0 /* Left */, a1: 'Start must be less than end'};
             case 0: {
              const $c = Dice_Random_prim__random()($5);
              const $10 = ($0.a1.a1+($c*($0.a2.a1.a1-$0.a1.a1)));
              return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: $10}};
             }
            }
           }
           default: {
            switch($0.a2.h) {
             case undefined: /* cons */ {
              switch($0.a2.a2.h) {
               case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects one or two numbers but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
               default: return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
              }
             }
             default: return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           }
          }
         };
        }
        default: {
         return $38 => {
          switch($0.a2.h) {
           case undefined: /* cons */ {
            switch($0.a2.a2.h) {
             case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects one or two numbers but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
             default: return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           }
           default: return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         };
        }
       }
      }
      default: {
       return $58 => {
        switch($0.a2.h) {
         case undefined: /* cons */ {
          switch($0.a2.a2.h) {
           case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects one or two numbers but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
           default: return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         }
         default: return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       };
      }
     }
    }
    default: {
     return $78 => {
      switch($0.a2.h) {
       case undefined: /* cons */ {
        switch($0.a2.a2.h) {
         case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects one or two numbers but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
         default: return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       }
       default: return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
      }
     };
    }
   }
  }
  default: return $98 => ({h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))});
 }
}

/* Dice.Internal.Ipow : BuiltinFunction */
function Dice_Internal_Ipow($0, $1) {
 const $2 = Dice_Internal_typeCheckAll($5 => Dice_Value_extractNumber($5), $0);
 switch($2.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $2.a1};
  case 1: /* Right */ {
   switch($2.a1.h) {
    case undefined: /* cons */ return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: Prelude_Types_foldl_Foldable_List($f => $10 => Math.pow($f, $10), $2.a1.a1, $2.a1.a2)}};
    case 0: /* nil */ return {h: 0 /* Left */, a1: 'Expects at least one number'};
   }
  }
 }
}

/* Dice.Internal.Ipick : BuiltinFunction */
function Dice_Internal_Ipick($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   switch($0.a1.h) {
    case 2: /* VArray */ {
     switch($0.a2.h) {
      case undefined: /* cons */ {
       switch($0.a2.a1.h) {
        case 1: /* VNum */ {
         switch($0.a2.a2.h) {
          case 0: /* nil */ {
           const $6 = Prelude_Types_prim__integerToNat(BigInt(Math.trunc($0.a2.a1.a1)));
           return $a => {
            switch(Prelude_Types_x3cx3d_Ord_Nat($6, 0n)) {
             case 1: return {h: 1 /* Right */, a1: {h: 2 /* VArray */, a1: {h: 0}}};
             case 0: {
              switch(Prelude_Types_x3ex3d_Ord_Nat($6, Prelude_Types_List_lengthTR($0.a1.a1))) {
               case 1: return {h: 1 /* Right */, a1: {h: 2 /* VArray */, a1: $0.a1.a1}};
               case 0: {
                const $19 = Dice_Internal_n__5272_5084_pickRandom($0.a1.a1, $0.a2.a1.a1, $6, $0.a1.a1, {h: 0}, $a);
                return {h: 1 /* Right */, a1: {h: 2 /* VArray */, a1: $19}};
               }
              }
             }
            }
           };
          }
          default: {
           return $23 => {
            switch($0.a2.h) {
             case undefined: /* cons */ {
              switch($0.a2.a2.h) {
               case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects an array and a number but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
               default: return {h: 0 /* Left */, a1: ('Expects an array and a number but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
              }
             }
             default: return {h: 0 /* Left */, a1: ('Expects an array and a number but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           };
          }
         }
        }
        default: {
         return $43 => {
          switch($0.a2.h) {
           case undefined: /* cons */ {
            switch($0.a2.a2.h) {
             case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects an array and a number but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
             default: return {h: 0 /* Left */, a1: ('Expects an array and a number but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           }
           default: return {h: 0 /* Left */, a1: ('Expects an array and a number but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         };
        }
       }
      }
      default: {
       return $63 => {
        switch($0.a2.h) {
         case undefined: /* cons */ {
          switch($0.a2.a2.h) {
           case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects an array and a number but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
           default: return {h: 0 /* Left */, a1: ('Expects an array and a number but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         }
         default: return {h: 0 /* Left */, a1: ('Expects an array and a number but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       };
      }
     }
    }
    default: {
     return $83 => {
      switch($0.a2.h) {
       case undefined: /* cons */ {
        switch($0.a2.a2.h) {
         case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects an array and a number but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
         default: return {h: 0 /* Left */, a1: ('Expects an array and a number but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       }
       default: return {h: 0 /* Left */, a1: ('Expects an array and a number but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
      }
     };
    }
   }
  }
  default: return $a3 => ({h: 0 /* Left */, a1: ('Expects an array and a number but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))});
 }
}

/* Dice.Internal.Ior : BuiltinFunction */
function Dice_Internal_Ior($0, $1) {
 const $2 = Dice_Internal_typeCheckAll($5 => Dice_Value_extractBool($5), $0);
 switch($2.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $2.a1};
  case 1: /* Right */ return {h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: Prelude_Types_foldMap_Foldable_List(csegen_67(), $10 => $10, $2.a1)}};
 }
}

/* Dice.Internal.Ioffset : BuiltinFunction */
function Dice_Internal_Ioffset($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   switch($0.a1.h) {
    case 2: /* VArray */ {
     switch($0.a2.h) {
      case undefined: /* cons */ {
       switch($0.a2.a1.h) {
        case 2: /* VArray */ {
         return $5 => {
          switch($0.a2.a2.h) {
           case 0: /* nil */ {
            const $b = x => {
             switch(Prelude_Types_elem(csegen_163(), csegen_110(), x, $0.a2.a1.a1)) {
              case 1: return 0;
              case 0: return 1;
             }
            };
            const $8 = Prelude_Types_List_filterAppend({h: 0}, $b, $0.a1.a1);
            const $7 = {h: 2 /* VArray */, a1: $8};
            return {h: 1 /* Right */, a1: $7};
           }
           default: {
            switch($0.a2.h) {
             case undefined: /* cons */ {
              switch($0.a2.a2.h) {
               case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
               default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
              }
             }
             default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           }
          }
         };
        }
        default: {
         return $34 => {
          switch($0.a2.h) {
           case undefined: /* cons */ {
            switch($0.a2.a2.h) {
             case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
             default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           }
           default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         };
        }
       }
      }
      default: {
       return $54 => {
        switch($0.a2.h) {
         case undefined: /* cons */ {
          switch($0.a2.a2.h) {
           case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
           default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         }
         default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       };
      }
     }
    }
    default: {
     return $74 => {
      switch($0.a2.h) {
       case undefined: /* cons */ {
        switch($0.a2.a2.h) {
         case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
         default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       }
       default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
      }
     };
    }
   }
  }
  default: return $94 => ({h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))});
 }
}

/* Dice.Internal.Inot : BuiltinFunction */
function Dice_Internal_Inot($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   return $2 => {
    switch($0.a1.h) {
     case 0: /* VBool */ {
      switch($0.a2.h) {
       case 0: /* nil */ {
        let $6;
        switch($0.a1.a1) {
         case 1: {
          $6 = 0;
          break;
         }
         case 0: {
          $6 = 1;
          break;
         }
        }
        const $5 = {h: 0 /* VBool */, a1: $6};
        return {h: 1 /* Right */, a1: $5};
       }
       default: {
        switch($0.a2.h) {
         case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects a booleanbut got '+Dice_Value_show_Show_Value($0.a1))};
         default: return {h: 0 /* Left */, a1: ('Expects one booleanbut got '+Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0)))};
        }
       }
      }
     }
     default: {
      switch($0.a2.h) {
       case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects a booleanbut got '+Dice_Value_show_Show_Value($0.a1))};
       default: return {h: 0 /* Left */, a1: ('Expects one booleanbut got '+Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0)))};
      }
     }
    }
   };
  }
  default: return $22 => ({h: 0 /* Left */, a1: ('Expects one booleanbut got '+Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0)))});
 }
}

/* Dice.Internal.Ineq : BuiltinFunction */
function Dice_Internal_Ineq($0, $1) {
 const $2 = Dice_Internal_typeCheckAll($5 => Dice_Value_extractNumber($5), $0);
 switch($2.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $2.a1};
  case 1: /* Right */ {
   switch($2.a1.h) {
    case 0: /* nil */ return {h: 0 /* Left */, a1: 'Expects at least one number'};
    case undefined: /* cons */ return {h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: Prelude_Types_foldMap_Foldable_List(csegen_179(), $12 => Prelude_EqOrd_x2fx3d_Eq_Double($12, $2.a1.a1), $2.a1.a2)}};
   }
  }
 }
}

/* Dice.Internal.Imul : BuiltinFunction */
function Dice_Internal_Imul($0, $1) {
 const $2 = Dice_Internal_typeCheckAll($5 => Dice_Value_extractNumber($5), $0);
 switch($2.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $2.a1};
  case 1: /* Right */ return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: Prelude_Interfaces_product(csegen_335(), csegen_163(), $2.a1)}};
 }
}

/* Dice.Internal.Imin : BuiltinFunction */
function Dice_Internal_Imin($0, $1) {
 const $2 = Dice_Internal_typeCheckAll($5 => Dice_Value_extractNumber($5), $0);
 switch($2.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $2.a1};
  case 1: /* Right */ {
   switch($2.a1.h) {
    case 0: /* nil */ return {h: 0 /* Left */, a1: 'Expects at least one number'};
    case undefined: /* cons */ return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: Prelude_Types_foldl_Foldable_List($10 => $11 => Prelude_EqOrd_min_Ord_Double($10, $11), $2.a1.a1, $2.a1.a2)}};
   }
  }
 }
}

/* Dice.Internal.Imax : BuiltinFunction */
function Dice_Internal_Imax($0, $1) {
 const $2 = Dice_Internal_typeCheckAll($5 => Dice_Value_extractNumber($5), $0);
 switch($2.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $2.a1};
  case 1: /* Right */ {
   switch($2.a1.h) {
    case 0: /* nil */ return {h: 0 /* Left */, a1: 'Expects at least one number'};
    case undefined: /* cons */ return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: Prelude_Types_foldl_Foldable_List($10 => $11 => Prelude_EqOrd_max_Ord_Double($10, $11), $2.a1.a1, $2.a1.a2)}};
   }
  }
 }
}

/* Dice.Internal.Imap : BuiltinWithLambdaFunction */
function Dice_Internal_Imap($0, $1, $2) {
 const $3 = Dice_Internal_extractArrayWithLambda($1);
 switch($3.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $3.a1};
  case 1: /* Right */ {
   const $8 = Prelude_Types_traverse_Traversable_List(csegen_10(), x => $0($3.a1.a2)({a1: x, a2: {h: 0}}), $3.a1.a1)($2);
   const $18 = $19 => $1a => $1b => $1c => {
    switch($1c.h) {
     case 0: /* Left */ return {h: 0 /* Left */, a1: $1c.a1};
     case 1: /* Right */ return {h: 1 /* Right */, a1: $1b($1c.a1)};
    }
   };
   const $17 = $22 => $23 => $18(undefined)(undefined)($22)($23);
   const $16 = $17($2d => ({h: 2 /* VArray */, a1: $2d}));
   const $32 = b => a => func => $33 => {
    switch($33.h) {
     case 0: /* Left */ return {h: 0 /* Left */, a1: $33.a1};
     case 1: /* Right */ return {h: 1 /* Right */, a1: func($33.a1)};
    }
   };
   const $3c = b => a => $3d => $3e => {
    switch($3d.h) {
     case 0: /* Left */ return {h: 0 /* Left */, a1: $3d.a1};
     case 1: /* Right */ {
      switch($3e.h) {
       case 1: /* Right */ return {h: 1 /* Right */, a1: $3d.a1($3e.a1)};
       case 0: /* Left */ return {h: 0 /* Left */, a1: $3e.a1};
      }
     }
    }
   };
   const $31 = {a1: $32, a2: a => $3a => ({h: 1 /* Right */, a1: $3a}), a3: $3c};
   const $2f = Prelude_Interfaces_sequence($31, csegen_168(), $8);
   return $16($2f);
  }
 }
}

/* Dice.Internal.Ilt : BuiltinFunction */
function Dice_Internal_Ilt($0) {
 return Dice_Internal_case__Ilt_4148($0, Dice_Internal_typeCheckAll($6 => Dice_Value_extractNumber($6), $0));
}

/* Dice.Internal.Ilog : BuiltinFunction */
function Dice_Internal_Ilog($0) {
 return Dice_Internal_singleNum($3 => Math.log($3), $0);
}

/* Dice.Internal.Ilength : BuiltinFunction */
function Dice_Internal_Ilength($0) {
 return $1 => {
  switch($0.h) {
   case undefined: /* cons */ {
    switch($0.a1.h) {
     case 2: /* VArray */ {
      switch($0.a2.h) {
       case 0: /* nil */ return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: Number(Prelude_Types_List_lengthTR($0.a1.a1))}};
       default: return {h: 0 /* Left */, a1: 'Expects an array'};
      }
     }
     default: return {h: 0 /* Left */, a1: 'Expects an array'};
    }
   }
   default: return {h: 0 /* Left */, a1: 'Expects an array'};
  }
 };
}

/* Dice.Internal.Iintersection : BuiltinFunction */
function Dice_Internal_Iintersection($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   switch($0.a1.h) {
    case 2: /* VArray */ {
     switch($0.a2.h) {
      case undefined: /* cons */ {
       switch($0.a2.a1.h) {
        case 2: /* VArray */ {
         return $5 => {
          switch($0.a2.a2.h) {
           case 0: /* nil */ return {h: 1 /* Right */, a1: {h: 2 /* VArray */, a1: Prelude_Types_List_filterAppend({h: 0}, x => Prelude_Types_elem(csegen_163(), csegen_110(), x, $0.a2.a1.a1), $0.a1.a1)}};
           default: {
            switch($0.a2.h) {
             case undefined: /* cons */ {
              switch($0.a2.a2.h) {
               case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
               default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
              }
             }
             default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           }
          }
         };
        }
        default: {
         return $33 => {
          switch($0.a2.h) {
           case undefined: /* cons */ {
            switch($0.a2.a2.h) {
             case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
             default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           }
           default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         };
        }
       }
      }
      default: {
       return $53 => {
        switch($0.a2.h) {
         case undefined: /* cons */ {
          switch($0.a2.a2.h) {
           case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
           default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         }
         default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       };
      }
     }
    }
    default: {
     return $73 => {
      switch($0.a2.h) {
       case undefined: /* cons */ {
        switch($0.a2.a2.h) {
         case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
         default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       }
       default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
      }
     };
    }
   }
  }
  default: return $93 => ({h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))});
 }
}

/* Dice.Internal.Iint : BuiltinFunction */
function Dice_Internal_Iint($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   switch($0.a1.h) {
    case 1: /* VNum */ {
     switch($0.a2.h) {
      case undefined: /* cons */ {
       switch($0.a2.a1.h) {
        case 1: /* VNum */ {
         switch($0.a2.a2.h) {
          case 0: /* nil */ {
           const $6 = BigInt(Math.trunc($0.a1.a1));
           const $8 = BigInt(Math.trunc($0.a2.a1.a1));
           return $a => {
            switch(Prelude_EqOrd_x3ex3d_Ord_Integer($6, $8)) {
             case 1: return {h: 0 /* Left */, a1: 'Start must be less than end'};
             case 0: {
              const $10 = Dice_Random_prim__random()($a);
              const $14 = ($6+BigInt(Math.trunc(($10*Number(($8-$6))))));
              return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: Number($14)}};
             }
            }
           };
          }
          default: {
           return $20 => {
            switch($0.a2.h) {
             case undefined: /* cons */ {
              switch($0.a2.a2.h) {
               case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
               default: return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
              }
             }
             default: return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           };
          }
         }
        }
        default: {
         return $40 => {
          switch($0.a2.h) {
           case undefined: /* cons */ {
            switch($0.a2.a2.h) {
             case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
             default: return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           }
           default: return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         };
        }
       }
      }
      default: {
       return $60 => {
        switch($0.a2.h) {
         case undefined: /* cons */ {
          switch($0.a2.a2.h) {
           case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
           default: return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         }
         default: return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       };
      }
     }
    }
    default: {
     return $80 => {
      switch($0.a2.h) {
       case undefined: /* cons */ {
        switch($0.a2.a2.h) {
         case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
         default: return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       }
       default: return {h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
      }
     };
    }
   }
  }
  default: return $a0 => ({h: 0 /* Left */, a1: ('Expects two numbers but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))});
 }
}

/* Dice.Internal.Iinclude : BuiltinFunction */
function Dice_Internal_Iinclude($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   switch($0.a1.h) {
    case 2: /* VArray */ {
     switch($0.a2.h) {
      case undefined: /* cons */ {
       return $4 => {
        switch($0.a2.a2.h) {
         case 0: /* nil */ return {h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: Prelude_Types_elem(csegen_163(), csegen_110(), $0.a2.a1, $0.a1.a1)}};
         default: {
          switch($0.a2.h) {
           case undefined: /* cons */ {
            switch($0.a2.a2.h) {
             case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects an array and an element but got '+Dice_Value_show_Show_Value($0.a1))};
             default: return {h: 0 /* Left */, a1: ('Expects an array and an element but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           }
           default: return {h: 0 /* Left */, a1: ('Expects an array and an element but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         }
        }
       };
      }
      default: {
       return $28 => {
        switch($0.a2.h) {
         case undefined: /* cons */ {
          switch($0.a2.a2.h) {
           case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects an array and an element but got '+Dice_Value_show_Show_Value($0.a1))};
           default: return {h: 0 /* Left */, a1: ('Expects an array and an element but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         }
         default: return {h: 0 /* Left */, a1: ('Expects an array and an element but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       };
      }
     }
    }
    default: {
     return $42 => {
      switch($0.a2.h) {
       case undefined: /* cons */ {
        switch($0.a2.a2.h) {
         case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects an array and an element but got '+Dice_Value_show_Show_Value($0.a1))};
         default: return {h: 0 /* Left */, a1: ('Expects an array and an element but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       }
       default: return {h: 0 /* Left */, a1: ('Expects an array and an element but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
      }
     };
    }
   }
  }
  default: return $5c => ({h: 0 /* Left */, a1: ('Expects an array and an element but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))});
 }
}

/* Dice.Internal.Iif : BuiltinFunction */
function Dice_Internal_Iif($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   switch($0.a1.h) {
    case 0: /* VBool */ {
     switch($0.a2.h) {
      case undefined: /* cons */ {
       switch($0.a2.a2.h) {
        case undefined: /* cons */ {
         switch($0.a2.a2.a2.h) {
          case 0: /* nil */ {
           return $6 => {
            let $7;
            switch($0.a1.a1) {
             case 1: {
              $7 = $0.a2.a1;
              break;
             }
             case 0: {
              $7 = $0.a2.a2.a1;
              break;
             }
            }
            return {h: 1 /* Right */, a1: $7};
           };
          }
          default: {
           return $9 => {
            switch($0.a2.h) {
             case undefined: /* cons */ {
              switch($0.a2.a2.h) {
               case undefined: /* cons */ {
                switch($0.a2.a2.a2.h) {
                 case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects a boolean and two valuesbut got '+(Dice_Value_show_Show_Value($0.a1)+(', '+(Dice_Value_show_Show_Value($0.a2.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a2.a1))))))};
                 default: return {h: 0 /* Left */, a1: ('Expects a boolean and two valuesbut got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
                }
               }
               default: return {h: 0 /* Left */, a1: ('Expects a boolean and two valuesbut got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
              }
             }
             default: return {h: 0 /* Left */, a1: ('Expects a boolean and two valuesbut got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           };
          }
         }
        }
        default: {
         return $39 => {
          switch($0.a2.h) {
           case undefined: /* cons */ {
            switch($0.a2.a2.h) {
             case undefined: /* cons */ {
              switch($0.a2.a2.a2.h) {
               case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects a boolean and two valuesbut got '+(Dice_Value_show_Show_Value($0.a1)+(', '+(Dice_Value_show_Show_Value($0.a2.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a2.a1))))))};
               default: return {h: 0 /* Left */, a1: ('Expects a boolean and two valuesbut got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
              }
             }
             default: return {h: 0 /* Left */, a1: ('Expects a boolean and two valuesbut got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           }
           default: return {h: 0 /* Left */, a1: ('Expects a boolean and two valuesbut got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         };
        }
       }
      }
      default: {
       return $69 => {
        switch($0.a2.h) {
         case undefined: /* cons */ {
          switch($0.a2.a2.h) {
           case undefined: /* cons */ {
            switch($0.a2.a2.a2.h) {
             case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects a boolean and two valuesbut got '+(Dice_Value_show_Show_Value($0.a1)+(', '+(Dice_Value_show_Show_Value($0.a2.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a2.a1))))))};
             default: return {h: 0 /* Left */, a1: ('Expects a boolean and two valuesbut got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           }
           default: return {h: 0 /* Left */, a1: ('Expects a boolean and two valuesbut got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         }
         default: return {h: 0 /* Left */, a1: ('Expects a boolean and two valuesbut got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       };
      }
     }
    }
    default: {
     return $99 => {
      switch($0.a2.h) {
       case undefined: /* cons */ {
        switch($0.a2.a2.h) {
         case undefined: /* cons */ {
          switch($0.a2.a2.a2.h) {
           case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects a boolean and two valuesbut got '+(Dice_Value_show_Show_Value($0.a1)+(', '+(Dice_Value_show_Show_Value($0.a2.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a2.a1))))))};
           default: return {h: 0 /* Left */, a1: ('Expects a boolean and two valuesbut got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         }
         default: return {h: 0 /* Left */, a1: ('Expects a boolean and two valuesbut got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       }
       default: return {h: 0 /* Left */, a1: ('Expects a boolean and two valuesbut got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
      }
     };
    }
   }
  }
  default: return $c9 => ({h: 0 /* Left */, a1: ('Expects a boolean and two valuesbut got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))});
 }
}

/* Dice.Internal.Ihypot : BuiltinFunction */
function Dice_Internal_Ihypot($0, $1) {
 const $2 = Dice_Internal_typeCheckAll($5 => Dice_Value_extractNumber($5), $0);
 switch($2.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $2.a1};
  case 1: /* Right */ return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: Math.sqrt(Prelude_Interfaces_sum(csegen_335(), csegen_163(), csegen_106()(x => (x*x))($2.a1)))}};
 }
}

/* Dice.Internal.Igt : BuiltinFunction */
function Dice_Internal_Igt($0) {
 return Dice_Internal_case__Igt_4241($0, Dice_Internal_typeCheckAll($6 => Dice_Value_extractNumber($6), $0));
}

/* Dice.Internal.Ifround : List Value -> IO (OpResult Value) */
function Dice_Internal_Ifround($0) {
 return Dice_Internal_singleNum(x => x, $0);
}

/* Dice.Internal.Ifloor : List Value -> IO (OpResult Value) */
function Dice_Internal_Ifloor($0) {
 return Dice_Internal_singleNum($3 => Math.floor($3), $0);
}

/* Dice.Internal.IflatMap : BuiltinWithLambdaFunction */
function Dice_Internal_IflatMap($0, $1) {
 return $2 => Dice_Internal_case__IflatMap_6855($1, $0, Dice_Internal_extractArrayWithLambda($1), $2);
}

/* Dice.Internal.Ifilter : BuiltinWithLambdaFunction */
function Dice_Internal_Ifilter($0, $1) {
 return $2 => Dice_Internal_case__Ifilter_6647($1, $0, Dice_Internal_extractArrayWithLambda($1), $2);
}

/* Dice.Internal.Ifill : BuiltinFunction */
function Dice_Internal_Ifill($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   return $2 => {
    switch($0.a1.h) {
     case 2: /* VArray */ {
      switch($0.a2.h) {
       case undefined: /* cons */ {
        switch($0.a2.a2.h) {
         case 0: /* nil */ return {h: 1 /* Right */, a1: {h: 2 /* VArray */, a1: csegen_106()($c => $0.a2.a1)($0.a1.a1)}};
         default: return {h: 0 /* Left */, a1: 'Expects an array and a value'};
        }
       }
       default: return {h: 0 /* Left */, a1: 'Expects an array and a value'};
      }
     }
     default: return {h: 0 /* Left */, a1: 'Expects an array and a value'};
    }
   };
  }
  default: return $11 => ({h: 0 /* Left */, a1: 'Expects an array and a value'});
 }
}

/* Dice.Internal.Iexp : BuiltinFunction */
function Dice_Internal_Iexp($0) {
 return Dice_Internal_singleNum($3 => Math.exp($3), $0);
}

/* Dice.Internal.Ievery : BuiltinWithLambdaFunction */
function Dice_Internal_Ievery($0, $1) {
 return $2 => Dice_Internal_case__Ievery_6303($1, $0, Dice_Internal_extractArrayWithLambda($1), $2);
}

/* Dice.Internal.Ieq : BuiltinFunction */
function Dice_Internal_Ieq($0, $1) {
 const $2 = Dice_Internal_typeCheckAll($5 => Dice_Value_extractNumber($5), $0);
 switch($2.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $2.a1};
  case 1: /* Right */ {
   switch($2.a1.h) {
    case 0: /* nil */ return {h: 0 /* Left */, a1: 'Expects at least one number'};
    case undefined: /* cons */ return {h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: Prelude_Types_foldMap_Foldable_List(csegen_179(), $12 => Prelude_EqOrd_x3dx3d_Eq_Double($12, $2.a1.a1), $2.a1.a2)}};
   }
  }
 }
}

/* Dice.Internal.Idiv : BuiltinFunction */
function Dice_Internal_Idiv($0, $1) {
 const $2 = Dice_Internal_typeCheckAll($5 => Dice_Value_extractNumber($5), $0);
 switch($2.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $2.a1};
  case 1: /* Right */ {
   switch($2.a1.h) {
    case undefined: /* cons */ return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: Prelude_Types_foldl_Foldable_List($f => $10 => ($f/$10), $2.a1.a1, $2.a1.a2)}};
    case 0: /* nil */ return {h: 0 /* Left */, a1: 'Expects at least one number'};
   }
  }
 }
}

/* Dice.Internal.Icsch : BuiltinFunction */
function Dice_Internal_Icsch($0) {
 return Dice_Internal_singleNum(x => (Number(1n)/Prelude_Types_sinh(x)), $0);
}

/* Dice.Internal.Icsc : BuiltinFunction */
function Dice_Internal_Icsc($0) {
 return Dice_Internal_singleNum(x => (Number(1n)/Math.sin(x)), $0);
}

/* Dice.Internal.Icoth : BuiltinFunction */
function Dice_Internal_Icoth($0) {
 return Dice_Internal_singleNum(x => (Number(1n)/Prelude_Types_tanh(x)), $0);
}

/* Dice.Internal.Icot : BuiltinFunction */
function Dice_Internal_Icot($0) {
 return Dice_Internal_singleNum(x => (Number(1n)/Math.tan(x)), $0);
}

/* Dice.Internal.Icosh : BuiltinFunction */
function Dice_Internal_Icosh($0) {
 return Dice_Internal_singleNum($3 => Prelude_Types_cosh($3), $0);
}

/* Dice.Internal.Icos : BuiltinFunction */
function Dice_Internal_Icos($0) {
 return Dice_Internal_singleNum($3 => Math.cos($3), $0);
}

/* Dice.Internal.Icontain : BuiltinFunction */
function Dice_Internal_Icontain($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   switch($0.a1.h) {
    case 2: /* VArray */ {
     switch($0.a2.h) {
      case undefined: /* cons */ {
       switch($0.a2.a1.h) {
        case 2: /* VArray */ {
         return $5 => {
          switch($0.a2.a2.h) {
           case 0: /* nil */ return {h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: Prelude_Types_foldMap_Foldable_List(csegen_179(), y => Prelude_Types_elem(csegen_163(), csegen_110(), y, $0.a1.a1), $0.a2.a1.a1)}};
           default: {
            switch($0.a2.h) {
             case undefined: /* cons */ {
              switch($0.a2.a2.h) {
               case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
               default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
              }
             }
             default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           }
          }
         };
        }
        default: {
         return $34 => {
          switch($0.a2.h) {
           case undefined: /* cons */ {
            switch($0.a2.a2.h) {
             case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
             default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
            }
           }
           default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         };
        }
       }
      }
      default: {
       return $54 => {
        switch($0.a2.h) {
         case undefined: /* cons */ {
          switch($0.a2.a2.h) {
           case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
           default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
          }
         }
         default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       };
      }
     }
    }
    default: {
     return $74 => {
      switch($0.a2.h) {
       case undefined: /* cons */ {
        switch($0.a2.a2.h) {
         case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Dice_Value_show_Show_Value($0.a1)+(' and '+Dice_Value_show_Show_Value($0.a2.a1))))};
         default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       }
       default: return {h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
      }
     };
    }
   }
  }
  default: return $94 => ({h: 0 /* Left */, a1: ('Expects two arrays but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))});
 }
}

/* Dice.Internal.Iceil : List Value -> IO (OpResult Value) */
function Dice_Internal_Iceil($0) {
 return Dice_Internal_singleNum($3 => Math.ceil($3), $0);
}

/* Dice.Internal.Icbrt : List Value -> IO (OpResult Value) */
function Dice_Internal_Icbrt($0) {
 return Dice_Internal_singleNum(x => Math.pow(x, (1.0/3.0)), $0);
}

/* Dice.Internal.Ibool : BuiltinFunction */
function Dice_Internal_Ibool($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   return $2 => {
    switch($0.a1.h) {
     case 1: /* VNum */ {
      switch($0.a2.h) {
       case 0: /* nil */ {
        let $5;
        switch(Prelude_EqOrd_x3c_Ord_Double($0.a1.a1, 0.0)) {
         case 1: {
          $5 = 1;
          break;
         }
         case 0: {
          $5 = Prelude_EqOrd_x3e_Ord_Double($0.a1.a1, 1.0);
          break;
         }
        }
        switch($5) {
         case 1: return {h: 0 /* Left */, a1: 'Probability must be between 0 and 1'};
         case 0: {
          const $e = Dice_Random_prim__random()($2);
          return {h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: Prelude_EqOrd_x3c_Ord_Double($e, $0.a1.a1)}};
         }
        }
       }
       default: {
        switch($0.a2.h) {
         case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects a number between 0 and 1 but got '+Dice_Value_show_Show_Value($0.a1))};
         default: return {h: 0 /* Left */, a1: ('Expects a probability number but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
        }
       }
      }
     }
     default: {
      switch($0.a2.h) {
       case 0: /* nil */ return {h: 0 /* Left */, a1: ('Expects a number between 0 and 1 but got '+Dice_Value_show_Show_Value($0.a1))};
       default: return {h: 0 /* Left */, a1: ('Expects a probability number but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))};
      }
     }
    }
   };
  }
  default: return $35 => ({h: 0 /* Left */, a1: ('Expects a probability number but got '+(Prelude_Show_show_Show_Nat(Prelude_Types_List_lengthTR($0))+' arguments'))});
 }
}

/* Dice.Internal.Iatanh : BuiltinFunction */
function Dice_Internal_Iatanh($0) {
 return Dice_Internal_singleNum(x => (0.5*Math.log(((1.0+x)/(1.0-x)))), $0);
}

/* Dice.Internal.Iatan : BuiltinFunction */
function Dice_Internal_Iatan($0) {
 return Dice_Internal_singleNum($3 => Math.atan($3), $0);
}

/* Dice.Internal.Iasinh : BuiltinFunction */
function Dice_Internal_Iasinh($0) {
 return Dice_Internal_singleNum(x => Math.log((x+Math.sqrt(((x*x)+1.0)))), $0);
}

/* Dice.Internal.Iasin : BuiltinFunction */
function Dice_Internal_Iasin($0) {
 return Dice_Internal_singleNum($3 => Math.asin($3), $0);
}

/* Dice.Internal.Iarray : BuiltinFunction */
function Dice_Internal_Iarray($0, $1) {
 return {h: 1 /* Right */, a1: {h: 2 /* VArray */, a1: $0}};
}

/* Dice.Internal.Iand : BuiltinFunction */
function Dice_Internal_Iand($0, $1) {
 const $2 = Dice_Internal_typeCheckAll($5 => Dice_Value_extractBool($5), $0);
 switch($2.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $2.a1};
  case 1: /* Right */ return {h: 1 /* Right */, a1: {h: 0 /* VBool */, a1: Prelude_Types_foldMap_Foldable_List(csegen_179(), $10 => $10, $2.a1)}};
 }
}

/* Dice.Internal.Iadd : BuiltinFunction */
function Dice_Internal_Iadd($0, $1) {
 const $2 = Dice_Internal_typeCheckAll($5 => Dice_Value_extractNumber($5), $0);
 switch($2.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $2.a1};
  case 1: /* Right */ return {h: 1 /* Right */, a1: {h: 1 /* VNum */, a1: Prelude_Interfaces_sum(csegen_335(), csegen_163(), $2.a1)}};
 }
}

/* Dice.Internal.Iacosh : BuiltinFunction */
function Dice_Internal_Iacosh($0) {
 return Dice_Internal_singleNum(x => Math.log((x+Math.sqrt(((x*x)-1.0)))), $0);
}

/* Dice.Internal.Iacos : BuiltinFunction */
function Dice_Internal_Iacos($0) {
 return Dice_Internal_singleNum($3 => Math.acos($3), $0);
}

/* Dice.Internal.Iabs : List Value -> IO (OpResult Value) */
function Dice_Internal_Iabs($0) {
 return Dice_Internal_singleNum($3 => Prelude_Num_abs_Abs_Double($3), $0);
}

/* Dice.Random.randomInt : Int -> Int -> IO Int */
function Dice_Random_randomInt($0, $1, $2) {
 const $3 = Dice_Random_prim__random()($2);
 return _add32s($0, _truncInt32(Math.trunc(Math.floor(($3*_add32s(_sub32s($1, $0), 1))))));
}

/* Examples.render */
function Examples_render_Renderable_ExampleBlock($0) {
 const $2 = Prelude_Show_show_Show_String($0.a1);
 return Web_Isx2_div($7 => $7, {a1: Web_Isx2_x2ex3d('class', 'expr-block'), a2: {h: 0}}, {a1: Web_Isx2_h3($12 => ({h: 0 /* Text */, a1: $12}), {h: 0}, {a1: $0.a1, a2: {h: 0}}), a2: {a1: Web_Isx2_div($1c => $1c, {a1: Web_Isx2_x2ex3d('class', 'expr-input-group'), a2: {h: 0}}, {a1: Web_Isx2_input({a1: Web_Isx2_x2ex3d('type', 'text'), a2: {a1: Web_Isx2_x2ex3d('class', 'expr-input'), a2: {a1: Web_Isx2_x2ex3d('placeholder', 'Enter expression'), a2: {a1: Web_Isx2_x2ex3d('value', $0.a2), a2: {a1: Web_Isx2_x2ex3d('data-input-id', $2), a2: {h: 0}}}}}}), a2: {a1: Web_Isx2_button($44 => ({h: 0 /* Text */, a1: $44}), {a1: Web_Isx2_x2ex3d('class', 'btn btn-run'), a2: {a1: Web_Isx2_x2ex3d('data-run-id', $2), a2: {h: 0}}}, {a1: csegen_0()('Run'), a2: {h: 0}}), a2: {h: 0}}}), a2: {a1: Web_Isx2_div($5c => ({h: 0 /* Text */, a1: $5c}), {a1: Web_Isx2_x2ex3d('class', 'result empty'), a2: {a1: Web_Isx2_x2ex3d('data-result-id', $2), a2: {h: 0}}}, {a1: csegen_0()('Result will appear here...'), a2: {h: 0}}), a2: {h: 0}}}});
}

/* Examples.exampleBlocks : List ExampleBlock */
const Examples_exampleBlocks = __lazy(function () {
 return {a1: {a1: 'Single Roll', a2: '1d20'}, a2: {a1: {a1: 'Multiple Dice', a2: '4d6'}, a2: {a1: {a1: 'Zero Dice => Empty Array', a2: '0d8'}, a2: {a1: {a1: 'Basic Arithmetic', a2: '2d6 + 3'}, a2: {a1: {a1: 'Complex Expression', a2: '(1d6 + 2) * 4 - 1'}, a2: {a1: {a1: 'Exponentiation', a2: '2 ^ 10'}, a2: {a1: {a1: 'Modulo', a2: '23 % 10'}, a2: {a1: {a1: 'Range Operator (..)', a2: '1 .. 6'}, a2: {a1: {a1: 'Descending Range', a2: '10 .. 5'}, a2: {a1: {a1: 'Random Integer (~)', a2: '1~100'}, a2: {a1: {a1: 'Cons Operator', a2: '1 : [2, 3]'}, a2: {a1: {a1: 'Concatenation', a2: '[1, 2] ++ [3, 4]'}, a2: {a1: {a1: 'Literal Array', a2: '[1, 2, 3, 4]'}, a2: {a1: {a1: 'Empty Array', a2: '[]'}, a2: {a1: {a1: 'Equality Chain', a2: '5 == 5 == 5'}, a2: {a1: {a1: 'Inequality Chain', a2: '1 != 2 != 2'}, a2: {a1: {a1: 'Ordered Comparison', a2: '1 < 2 <= 3 > 2'}, a2: {a1: {a1: 'AND / OR', a2: 'True && False || True'}, a2: {a1: {a1: 'NOT', a2: '!False'}, a2: {a1: {a1: 'Keep Highest', a2: '4d6>3'}, a2: {a1: {a1: 'Exploding Dice (custom)', a2: '1d6++'}, a2: {a1: {a1: 'Lambda (add 1)', a2: '(\u{5c}x -> x + 1)(5)'}, a2: {a1: {a1: 'Multi-arg Lambda', a2: '(\u{5c}x, y -> x * y)(3, 7)'}, a2: {a1: {a1: 'Trig Functions', a2: 'sin(p/2)'}, a2: {a1: {a1: 'Log & Exp', a2: 'log(e)'}, a2: {a1: {a1: 'Rounding', a2: 'floor(3.7)'}, a2: {a1: {a1: 'Max / Min', a2: 'max(1, 5, 3)'}, a2: {a1: {a1: 'Length', a2: 'length([1,2,3,4])'}, a2: {a1: {a1: 'Sum', a2: 'sum(4d6)'}, a2: {a1: {a1: 'Slice', a2: 'slice([1 .. 10], 2, 4)'}, a2: {a1: {a1: 'Shuffle', a2: 'shuffle([1..5])'}, a2: {a1: {a1: 'Pick Random Elements', a2: 'pick([1 .. 100], 3)'}, a2: {a1: {a1: 'Union', a2: 'union([1,2], [2,3])'}, a2: {a1: {a1: 'Intersection', a2: 'intersection([1,2,3], [2,3,4])'}, a2: {a1: {a1: 'Difference', a2: 'offset([1,2,3], [2])'}, a2: {a1: {a1: 'Contains All', a2: 'contain([1,2,3,4], [2,4])'}, a2: {a1: {a1: 'Random Float', a2: 'real(0, 1)'}, a2: {a1: {a1: 'Random Bool (70%)', a2: 'bool(0.7)'}, a2: {a1: {a1: 'Random Int (inclusive)', a2: 'int(1, 7)'}, a2: {a1: {a1: 'If Expression', a2: 'if(1d6 > 3, 111111, 23333)'}, a2: {a1: {a1: 'Pi', a2: 'p'}, a2: {a1: {a1: 'Eulers Number', a2: 'e'}, a2: {h: 0}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}};
});

/* Web.Isx2.4337:3223:buildElement */
function Web_Isx2_n__4337_3223_buildElement($0, $1, $2, $3, $4) {
 switch($3.h) {
  case 0: /* Text */ return Web_Dom_createTextNode($3.a1, $4);
  case 1: /* Element */ {
   const $9 = Web_Dom_createElement($3.a1, $4);
   const $d = Prelude_Interfaces_traverse_(csegen_10(), csegen_163(), $15 => $16 => Web_Dom_setAttribute($9, $15.a1, $15.a2, $16), $3.a2)($4);
   const $26 = child => $27 => {
    const $28 = Web_Isx2_n__4337_3223_buildElement($0, $1, $2, child, $27);
    return Web_Dom_appendChild($9, $28, $27);
   };
   const $20 = Prelude_Interfaces_traverse_(csegen_10(), csegen_163(), $26, $3.a3);
   const $1f = $20($4);
   return $9;
  }
 }
}

/* Web.Isx2.ul : Renderable a => List Attr -> List a -> ISX */
function Web_Isx2_ul($0, $1, $2) {
 return Web_Isx2_defineTag($0, 'ul', $1, $2);
}

/* Web.Isx2.text : String -> ISX */
function Web_Isx2_text($0) {
 return {h: 0 /* Text */, a1: $0};
}

/* Web.Isx2.section : Renderable a => List Attr -> List a -> ISX */
function Web_Isx2_section($0, $1, $2) {
 return Web_Isx2_defineTag($0, 'section', $1, $2);
}

/* Web.Isx2.renderToDOM : Renderable a => Element -> a -> IO () */
function Web_Isx2_renderToDOM($0, $1, $2, $3) {
 const $4 = Web_Dom_clearInner($1)($3);
 const $10 = $0;
 const $f = $11 => $10($11);
 const $e = $f($2);
 const $9 = Web_Isx2_n__4337_3223_buildElement($0, $2, $1, $e, $3);
 return Web_Dom_appendChild($1, $9, $3);
}

/* Web.Isx2.p : Renderable a => List Attr -> List a -> ISX */
function Web_Isx2_p($0, $1, $2) {
 return Web_Isx2_defineTag($0, 'p', $1, $2);
}

/* Web.Isx2.li : Renderable a => List Attr -> List a -> ISX */
function Web_Isx2_li($0, $1, $2) {
 return Web_Isx2_defineTag($0, 'li', $1, $2);
}

/* Web.Isx2.input : List Attr -> ISX */
function Web_Isx2_input($0) {
 return {h: 1 /* Element */, a1: 'input', a2: $0, a3: {h: 0}};
}

/* Web.Isx2.h3 : Renderable a => List Attr -> List a -> ISX */
function Web_Isx2_h3($0, $1, $2) {
 return Web_Isx2_defineTag($0, 'h3', $1, $2);
}

/* Web.Isx2.h1 : Renderable a => List Attr -> List a -> ISX */
function Web_Isx2_h1($0, $1, $2) {
 return Web_Isx2_defineTag($0, 'h1', $1, $2);
}

/* Web.Isx2.div : Renderable a => List Attr -> List a -> ISX */
function Web_Isx2_div($0, $1, $2) {
 return Web_Isx2_defineTag($0, 'div', $1, $2);
}

/* Web.Isx2.defineTag : Renderable a => String -> List Attr -> List a -> ISX */
function Web_Isx2_defineTag($0, $1, $2, $3) {
 const $b = $0;
 const $a = $c => $b($c);
 const $7 = csegen_106()($a);
 const $6 = $7($3);
 return {h: 1 /* Element */, a1: $1, a2: $2, a3: $6};
}

/* Web.Isx2.button : Renderable a => List Attr -> List a -> ISX */
function Web_Isx2_button($0, $1, $2) {
 return Web_Isx2_defineTag($0, 'button', $1, $2);
}

/* Web.Isx2.a : Renderable a => List Attr -> List a -> ISX */
function Web_Isx2_a($0, $1, $2) {
 return Web_Isx2_defineTag($0, 'a', $1, $2);
}

/* Web.Isx2..= : String -> String -> Attr */
function Web_Isx2_x2ex3d($0, $1) {
 return {a1: $0, a2: $1};
}

/* Web.Dom.setTextContent : Element -> String -> IO () */
function Web_Dom_setTextContent($0, $1, $2) {
 return Web_Dom_prim__setTextContent($0, $1, $2);
}

/* Web.Dom.setInnerHTML : Element -> String -> IO () */
function Web_Dom_setInnerHTML($0, $1, $2) {
 return Web_Dom_prim__setInnerHTML($0, $1, $2);
}

/* Web.Dom.setAttribute : Element -> String -> String -> IO () */
function Web_Dom_setAttribute($0, $1, $2, $3) {
 return Web_Dom_prim__setAttribute($0, $1, $2, $3);
}

/* Web.Dom.querySelectorAll : HasIO IO => String -> IO (EsIterator Element) */
function Web_Dom_querySelectorAll($0, $1) {
 return $0.a2(undefined)($7 => Web_Dom_prim__querySelectorAll($1, $7));
}

/* Web.Dom.querySelector : HasIO IO => String -> IO (Maybe Element) */
function Web_Dom_querySelector($0, $1) {
 return $0.a2(undefined)($7 => Web_Dom_prim__querySelector($1, $b => ({a1: $b}), {h: 0}, $7));
}

/* Web.Dom.getElemValue : Element -> IO (Maybe String) */
function Web_Dom_getElemValue($0, $1) {
 return Web_Dom_prim__getElemValue($0, $5 => ({a1: $5}), {h: 0}, $1);
}

/* Web.Dom.getAttribute : Element -> String -> IO (Maybe String) */
function Web_Dom_getAttribute($0, $1, $2) {
 return Web_Dom_prim__getAttribute($0, $1, $7 => ({a1: $7}), {h: 0}, $2);
}

/* Web.Dom.createTextNode : String -> IO Element */
function Web_Dom_createTextNode($0, $1) {
 return Web_Dom_prim__createTextNode($0, $1);
}

/* Web.Dom.createElement : String -> IO Element */
function Web_Dom_createElement($0, $1) {
 return Web_Dom_prim__createElement($0, $1);
}

/* Web.Dom.clearInner : Element -> IO () */
function Web_Dom_clearInner($0) {
 return Prelude_Basics_flip($3 => $4 => $5 => Web_Dom_setInnerHTML($3, $4, $5), '', $0);
}

/* Web.Dom.appendChild : Element -> Element -> IO () */
function Web_Dom_appendChild($0, $1, $2) {
 return Web_Dom_prim__appendChild($0, $1, $2);
}

/* Web.Dom.addEventListener : Element -> String -> IO () -> IO () */
function Web_Dom_addEventListener($0, $1, $2, $3) {
 return Web_Dom_prim__addEventListener($0, $1, $2, $3);
}

/* Web.Es.for_ : EsIterator a -> (a -> IO ()) -> IO () */
function Web_Es_for_($0, $1, $2) {
 return Web_Es_prim__for_(undefined, $0, $1, $2);
}


try{__mainExpression_0()}catch(e){if(e instanceof IdrisError){console.log('ERROR: ' + e.message)}else{throw e} }
