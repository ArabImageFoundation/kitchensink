const KEYS_MAP = {
	'backspace':8, 'back_space':8, '⌫':8, '⟵':8
,	'tab':9, '↹':9, '⇄':9, '⇤':9, '⇥':9, '↤':9, '↦':9
,	'enter':13, 'return':13, '⏎':13, '↵':13, '↩':13
,	'shift':16, 'shft':16, '⇧':16
,	'ctrl':17, 'control':17, 'meta':17, '◆':17, '◇':17
,	'alt':18, 'alternative':18, '⎇':18, '⌥':18, 'option':18
,	'pause':19, 'break':19, 'pause/break':19, '⎉':19, '⎊':19
,	'capslock':20, 'caps':20, 'caps_lock':20, '⇪':20, 'A⃣':20
,	'escape':27, 'esc':27, '⎋':27
,	'space':32, ' ':32, '⇟':32, '⎘':32
,	'pageup':33, 'page_up':33, 'pgup':33, '⇞':33, '⎗':33
,	'pagedown':34, 'page_down':34, 'pgdown':34
,	'end':35, '↘':35, '⇥':35, '⤓':35, '⇲':35
,	'home':36, '↖':36, '⇤':36, '⤒':36, '⇱':36
,	'left_arrow':37, 'leftarrow':37, 'leftarr':37, 'larr':37, 'left':37, '←':37,'⇦':37,'⬅':37,'◀':37,'◁':37
,	'up_arrow':38, 'uparrow':38, 'uparr':38, 'larr':38, 'up':38, '↑':38,'⇧':38,'⬆':38,'▲':38,'△':38
,	'right_arrow':39, 'rightarrow':39, 'rightarr':39, 'larr':39, 'right':39, '→':39,'⇨':39,'➡':39,'▶':39,'▷':39
,	'down_arrow':40, 'downarrow':40, 'downarr':40, 'larr':40, 'down':40, '↓':40,'⇩':40,'⬇':40,'▼':40,'▽':40
,	'insert':45, 'ins':45, '⎀':45
,	'delete':46, 'del':46
,	'0':48
,	'1':49
,	'2':50
,	'3':51
,	'4':52
,	'5':53
,	'6':54
,	'7':55
,	'8':56
,	'9':57
,	'a':65
,	'b':66
,	'c':67
,	'd':68
,	'e':69
,	'f':70
,	'g':71
,	'h':72
,	'i':73
,	'j':74
,	'k':75
,	'l':76
,	'm':77
,	'n':78
,	'o':79
,	'p':80
,	'q':81
,	'r':82
,	's':83
,	't':84
,	'u':85
,	'v':86
,	'w':87
,	'x':88
,	'y':89
,	'z':90
,	'left_window':91, 'lwin':91, 'lsuper':91, '⌘':91, 'command':91
,	'right_window':92, 'rwin':92, 'rsuper':92
,	'super':[91,92], '❖':[91,92]
,	'select':93
,	'numpad_0':96, 'num0':96, 'n0':96
,	'numpad_1':97, 'num1':97, 'n1':97
,	'numpad_2':98, 'num2':98, 'n2':98
,	'numpad_3':99, 'num3':99, 'n3':99
,	'numpad_4':100, 'num4':100, 'n4':100
,	'numpad_5':101, 'num5':101, 'n5':101
,	'numpad_6':102, 'num6':102, 'n6':102
,	'numpad_7':103, 'num7':103, 'n7':103
,	'numpad_8':104, 'num8':104, 'n8':104
,	'numpad_9':105, 'num9':105, 'n9':105
,	'multiply':106, 'num*':106, 'n*':106
,	'add':107, 'num+':107, 'n+':107
,	'subtract':109, 'num-':109, 'n-':109
,	'decimal':110, 'num.':110, 'n.':110
,	'divide':111, 'num/':110, 'n/':110
,	'f1':112
,	'f2':113
,	'f3':114
,	'f4':115
,	'f5':116
,	'f6':117
,	'f7':118
,	'f8':119
,	'f9':120
,	'f10':121
,	'f11':122
,	'f12':123
,	'num_lock':144, 'numlock':144
,	'scroll_lock':145, 'scrolllock':145
,	'semi_colon':186, 'semicolon':186, ';':186
,	'equal':187, 'eq':187, '=':187
,	'comma':188, ',':188
,	'dash':189, '-':189, 'minus':189
,	'period':190, '.':190
,	'forward_slash':191, '/':191
,	'grave_accent':192, 'backtick':192, 'tick':192, '`':192
,	'open_bracket':219, 'openbracket':219, '[':219
,	'back_slash':220, 'backslash':220, '\\':220
,	'close_bracket':221, 'closebracket':221, ']':221
,	'single_quote':222, 'quote':222, "'":222
}

const equivalents = {
	91:17
,	93:17
,	224:17
}

function checkEquivalence(key){
	if(key in equivalents){return equivalents[key];}
	return key;
}

const keyboards = {
	querty:{}
};

function addShifted(obj,start,...combs){
	combs.forEach((key,i)=>{
		obj[key] = [KEYS_MAP.shift, start+i]
	})
}

addShifted(keyboards.querty,48,')','!','@','#','$','%','^','&','*','(','A','B'
,'C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V'
,'W','X','Y','Z');
addShifted(keyboards.querty,186,':','+','<','_','>','?','~','{','|','}','"');


function addKey(keys,key){
	key = checkEquivalence(key);
	if(keys.indexOf(key)>=0){return keys;}
	return [...keys,key];
}
function removeKey(keys,key){
	key = checkEquivalence(key);
	const index = keys.indexOf(key)
	if(index>=0){
		return [...keys.slice(0,index),...keys.slice(index+1)]
	}
	return keys;
}

function addCombo(map,combos,combo,fn,keyUp,sequence){
	if(typeof combo == 'string'){
		if(/konami/i.test(combo)){combo = combo.replace(/konami/ig,'↑ ↑ ↓ ↓ ← → ← → b a')}
		combo = combo.split(/\s/);
	}
	combo = combo.map(char=>
		((typeof char == 'number')? char:
		(char in map)?map[char]:
		null)
	).filter(Boolean).reduce((a,b)=>a.concat(b),[]);
	return [...combos,[combo,fn,!!keyUp,!!sequence]]
}

function removeCombo(combos,combo){
	return combos.filter(([comboKeys])=>!comboKeys.every(key=>combo.indexOf(key)>=0));
}

function checkKeys(map,keys,combos,keyUp,sequence){
	var matches = false;
	combos.forEach(([comboKeys,fn,comboKeyUp,comboSequence])=>{
		if((keyUp && !comboKeyUp) || (sequence && !comboSequence)){return;}
		if(comboKeys.every(key=>keys.indexOf(key)>=0)){
			matches = true;
			fn(comboKeys);
		}
	});
	return matches;
}


function addKeyboardLayout(map,keys,layout){
	Object.keys(layout).forEach(char=>{
		const key = layout[char];
		map[char] = key;
	})
	return keys;
}

export default function comboMatcher(...addCombos){
	var keys = [];
	var combos = [];
	var sequence = [];
	var map = Object.assign({},KEYS_MAP);
	var doDebug = false;
	var seqTimeOut = null;
	var sequenceInterval = 300;
	if(combos.length){
		combos.forEach(combo=>add(...combo));
	}
	function log(){
		if(!doDebug){return;}
		console.log('keys:',keys,'sequence:',sequence);
		console.log('combos:',combos)
	}
	function clearSequence(){
		checkKeys(map,sequence,combos,true,true);
		sequence = [];
	}
	function handleKeyUp(evt){
		keyUp(evt.keyCode)
	}
	function handleKeyDown(evt){
		keyDown(evt.keyCode)
	}
	function keyUp(key){
		keys = removeKey(keys,key);
		log();
		checkKeys(map,keys,combos,true,false)
	}
	function keyDown(key){
		keys = addKey(keys,key);
		sequence = addKey(sequence,key);
		clearTimeout(seqTimeOut)
		seqTimeOut = setTimeout(clearSequence,sequenceInterval);
		log();
		checkKeys(map,keys,combos,false,false)
	}
	function add(combo,fn,keyUp,sequence){
		combos = addCombo(map,combos,combo,fn,keyUp,sequence)
	}
	function remove(combo){
		combos = removeCombo(combos,combo)
	}
	function addSeq(combo,fn){
		add(combo,fn,true,true);
	}
	function removeSeq(combo){
		remove(combo)
	}
	function addKeyboardLayout(layout){
		if(layout in keyboards){
			map = Object.assign({},keyboards[layout]);
		}
	}
	function listen(el){
		el = el || window;
		el.addEventListener('keyup',handleKeyUp);
		el.addEventListener('keydown',handleKeyDown);
	}
	function stopListening(el){
		el = el || windows
		el.removeEventListener('keyup',handleKeyUp);
		el.removeEventListener('keydown',handleKeyDown);
	}
	return {
		handleKeyUp
	,	handleKeyDown
	,	keyUp
	,	keyDown
	,	add
	,	remove
	,	listen
	,	stopListening
	,	addSeq
	,	removeSeq
	,	get keys(){
			return keys;
		}
	,	set debug(opt){
			doDebug = opt;
		}
	,	get debug(){
			return doDebug;
		}
	,	set interval(int){
			sequenceInterval = int;
		}
	,	get interval(){
			return sequenceInterval;
		}
	}
}
