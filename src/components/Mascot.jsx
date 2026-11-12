import {useEffect,useRef,useState} from 'react';

let msge='';
let i=0;
const REACTIONS = [
  'c(•o•c)', 'c(•-•c)', 'c(---c)', 'c(o-oc)', '(ɔo-o)ɔ', 'c(ToT)ɔ', 'c(T-T)ɔ', '(ɔToT)ɔ', '(ɔT-T)ɔ',
  'c(ToTc)', 'c(T-Tc)','.·°՞(っ-ᯅ-ς)՞°·.', 'c(ᴗ_ ᴗ。c)', 'c( •̀⤙•́ c)', '╭∩╮( •̀_•́ )╭∩╮','c(•𐃷•c)',
];
const RAINBOW = [
  { color: 'red' },
  { color: 'rgb(255,210, 0)'},
  { color: 'green' },
  { color: 'blue' },
  { color: 'purple' },
];
export const reacTo =(msg)=>{
    msge = msg.toLowerCase();
    switch(msge){
        case 'test': return REACTIONS;
        case 'worried':return REACTIONS.slice(3,5);
        case 'preocupado': return REACTIONS.slice(3,5);
        case 'blink':return REACTIONS.slice(1,3);
        case 'pestañando': return REACTIONS.slice(1,3);
        case 'normal': return REACTIONS.slice(0,3);
        case 'sad': return REACTIONS.slice(5);
        case 'angry': return REACTIONS.slice(12);
        default: throw new Error(`mensage no valido :${msg}`);
    };
}
export const Mascota=()=>{
    const kirbyRef=useRef(null);
    const reactCount= useRef(0);
    const [kirby,setKirby]= useState('c(-_-c)');
    const [flipped,setFlipped]= useState(false);
    const [colorIdx,setColorIdx]= useState(-1);
    const [blink,setBlink]=useState(false);
    //apuntar hacia el clic
    useEffect(()=>{
        const onMove=(e)=>{
            const rect=kirbyRef.current?.getBoundingClientRect();
            if(!rect) return;
            const centerX= rect.left+rect.width/2;
            setFlipped(e.clientX>=centerX);
        };
        document.addEventListener('mousemove',onMove);
        return () => document.removeEventListener('mousemove',onMove);
    }, []);
//despertar
    const handleEnter=()=>{
        if(reactCount.current<1){
            reactCount.current=3;
            setKirby(REACTIONS[3]);
        }
    };
//solo Dios y claude saben como hacer que c(o_oc) pestañee bien
   useEffect(() => {

  let closeTimer;
  const interval = setInterval(() => {
   if(i<1){
   setKirby(REACTIONS[1]);
   i++;}
   else{setKirby(REACTIONS[2]); i=0;}

   //closeTimer=setTimeout(()=>{setBlink(false)},150)
  }, 1500); // 3000 ms = 3 segundos
  return()=> {clearInterval(interval);setBlink(false)}},[]);
   
    const handleClick=()=>{
        setKirby(REACTIONS[15]);
        reactCount.current = reactCount.current === 1 ? 2 : 1;
    };

    const handleDoubleClick=()=>{
      setKirby(REACTIONS[13]);
      setColorIdx((i)=>(i+1)%RAINBOW.length);
    };

    const handleAux=(e)=>{
        e.preventDefault();
        setColorIdx(-1);
    };
//estilos para que o_o de la vuelta bien y para que cambie el color
    const style = {
        display: 'inline-block',
        transition:' cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s',
        transform: flipped ? 'scaleX(-1)' : 'scaleX(1)',
        cursor: 'pointer',
        userSelect: 'none',
        ...(colorIdx >= 0 ? RAINBOW[colorIdx] : { color: '#111' }),
    };

    return(
      <div className="mascotframe">
                <h2
            ref={kirbyRef}
            style={style}
            onMouseEnter={handleEnter}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onAuxClick={handleAux}
        >
            {kirby}
        </h2>
      </div>

    )
}
  /*
//GUIA

export const Mascota = () => {
  const faceRef = useRef(null);          // reemplaza getElementById('o_o')
  const reactCount = useRef(0);          // persiste entre renders sin provocar uno
  const [face, setFace] = useState('c(-_-c)');
  const [flipped, setFlipped] = useState(false);
  const [colorIdx, setColorIdx] = useState(-1); // -1 = sin color

  // Mirar hacia el mouse. El listener se crea UNA vez y se limpia al desmontar.
  useEffect(() => {
    const onMove = (e) => {
      const rect = faceRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      setFlipped(e.clientX >= centerX);
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  const handleEnter = () => {
    if (reactCount.current < 1) {
      reactCount.current = 3;
      setFace(REACTIONS[3]);
    }
  };

  const handleClick = () => {
    setFace(REACTIONS[reactCount.current]);
    reactCount.current = reactCount.current === 1 ? 2 : 1;
  };

  const handleDoubleClick = () => {
    setColorIdx((i) => (i + 1) % RAINBOW.length); // sin salirse del arreglo
  };

  const handleAux = (e) => {
    e.preventDefault();
    setColorIdx(-1); // quita el color
  };

  const style = {
    display: 'inline-block', // para que el centro sea el de la cara, no el de la página
    transform: flipped ? 'scaleX(-1)' : 'scaleX(1)',
    cursor: 'pointer',
    userSelect: 'none',
    ...(colorIdx >= 0 ? RAINBOW[colorIdx] : { color: '#222' }),
  };

  return (
    <h2
      ref={faceRef}
      style={style}
      onMouseEnter={handleEnter}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onAuxClick={handleAux}
    >
      {face}
    </h2>
  );
};*/ 









/* ORIGINAL
const all=document.getElementById('app');
const o_o =document.getElementById('o_o');
const btns=document.querySelectorAll('button')
let reactions = ['c(•o•c)','c(•-•c)','c(---c)','c(o-oc)','(ɔo-o)ɔ','.·°՞(っ-ᯅ-ς)՞°·.','c(ToT)ɔ','c(T-T)ɔ','(ɔToT)ɔ','(ɔT-T)ɔ','c(ToTc)','c(T-Tc)','(ᴗ_ ᴗ。)','( •̀⤙•́  )','╭∩╮( •̀_•́ )╭∩╮'];
let reactcount=0;
let istyle=0;
const continer=document.getElementsByClassName('container');
let rainbowcolor=['background-color:red;','background-color: rgb(246, 234, 107); color:#4f4e4e;','background-color:green;','background-color:blue;','background-color:purple;']

document.addEventListener('mousemove', (e) => {
    const rect = o_o.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;

    if (e.clientX < centerX) {
        o_o.style.transform = 'scaleX(1)'; // mira a la izquierda
    } else {
        o_o.style.transform = 'scaleX(-1)';  // mira a la derecha (normal)
    }
});
all.addEventListener('cut', (e) => {
    const rect = o_o.getBoundingClientRect();
    // Centro del elemento o_o en la pantalla
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Ángulo entre el centro y el mouse (en radianes -> grados)
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const angle2 = Math.atanh(dy, dx) * (180/Math.PI);

    o_o.style.transform = `rotateY(${angle2}deg) `;
});


o_o.addEventListener("mouseenter",()=>{
    if (reactcount<1){  
    reactcount=3
    o_o.textContent=reactions[reactcount];}
})
o_o.addEventListener('auxclick',()=>{
    all.style='color:#222;'
})
o_o.addEventListener('dblclick',()=>{
    all.style=rainbowcolor[istyle];
    //o_o.style='color:#222;'
    istyle++;
    //alert("sirvo")
    if(istyle === 1){
        btns.style='color: #222;'
        document.documentElement.style.setProperty('--color1:green;')
    }
    if (istyle>5){
        istyle=0;
    }

    
})
o_o.addEventListener("click",()=>{
    
    
    o_o.textContent=reactions[reactcount];
    
    if(reactcount===1){
    reactcount++;
}
  
    
    else{
        reactcount=1
    }
    
})




const reactto=(msg)=>{
    
    switch (msg) {
        case 'test':
            for (let reaction = 0; reaction < reactions.length; reaction++) {
            const reaccion = reactions[reaction];
            return(reaccion);
            break;}
        
            case 'sad':
            for (let reaction = 5; reaction < reactions.length; reaction++) {
            const reaccion = reactions[reaction];
            return(reaccion);}
            break;
            
            case 'normal':
            for (let reaction = 0; reaction < 3; reaction++) {
            const reaccion = reactions[reaction];
            return(reaccion);}
            break;

                
    default:
            alert('escoge un valor valido para la funcion');
            break;
                

    }
    alert(reaccion)
}*/