let Mas = [];
let MasOsi = [];
window.onload = function (){
    let c = document.getElementById("myCanvas");
    let setka = this.document.getElementById('sitka');
    let detal = this.document.getElementById('detal');
    let myDetal = this.document.getElementById('myDetail');
    setka.addEventListener('change',function(e){
        if(setka.checked){
            main(true);
        }else{
            main(false);
        }
    });

    let button = this.document.getElementById('button'); 
    button.addEventListener('click', main);

    let normal = this.document.getElementById('normal');
    normal.addEventListener('click', ()=>{
        normali();
    })

   }





function drawSitka(){
    let c = document.getElementById("myCanvas");
    let ctx=c.getContext('2d');
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle="#000000"

    let Mas1 = [];
    let Mas2 = [];
    for(let i=0; i<1000; i+=50){
        ctx.moveTo(i,0);
        Mas1.push({
            x : i,
            y : 0
        })
        ctx.fillText(i, i+1, 13);
        ctx.lineTo(i,600); 
        Mas1.push({
            x : i,
            y : 600
        })
    }
    MasOsi.push(Mas1);
    for(let i=0; i<600; i+=50){
        ctx.moveTo(0,i);
        Mas2.push({
            x : 0,
            y : i
        })
        ctx.fillText(i, 1, i+13);
        ctx.lineTo(1000,i); 
        Mas2.push({
            x : 1000,
            y : i
        })
    }
    MasOsi.push(Mas2);
    ctx.moveTo(50,50);
    ctx.fillText('X', 988, 13);
    ctx.fillText('Y', 1, 598);
    ctx.stroke();      
}

function drawDetail(){
    let MasTochki = [];
    var c = document.getElementById("myCanvas");
    var ctx=c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle="#000000"
    let x0 = 500;
    let y0 = 300;
    let x,y;
    const A = Number(document.getElementById('A').value);

    for (let i = 0; i <= 360; i += 0.5) {
        x =
          2 * A * Math.cos((i * Math.PI) / 180) +
          A * Math.cos((2* i * Math.PI) / 180);
        y =
          2 * A * Math.sin((i * Math.PI) / 180) -
          A * Math.sin((2 * i * Math.PI) / 180);
        MasTochki.push({
            x : x,
            y : y
        })
    }
    draw(MasTochki);          
}

function draw(MasTochki){
    let x0 = 500;
    let y0 = 300;

    for(let i=0; i<MasTochki.length - 1; i++){
        let x1 = MasTochki[i].x + x0;
        let y1 = MasTochki[i].y ;
        let x2 = MasTochki[i+1].x + x0;
        let y2 = MasTochki[i+1].y;
        y1 = y1+y0;
        y2 = y2+y0;
        let first = {
            x1 : x1,
            y1 : -MasTochki[i].y+y0,
            x2 : x2,
            y2 : -MasTochki[i+1].y+y0
        }
        let second = {
            x1 : x1,
            y1 : y1,
            x2 : x2,
            y2 : y2
        }
       let jj = setTimeout(()=>{
           animation(first,second)
       },10);
    }
    console.log(MasTochki);
    Mas = MasTochki;
}

function animation(first, second){
    var c = document.getElementById("myCanvas");
    var ctx=c.getContext('2d');
    ctx.strokeStyle="#000000";
    ctx.beginPath();
    ctx.moveTo(first.x1, first.y1);
    ctx.lineTo(first.x2, first.y2);
    ctx.moveTo(second.x1, second.y1);
    ctx.lineTo(second.x2, second.y2);
    ctx.stroke();

}

function normali(){
    const A = Number(document.getElementById('A').value);
    let X0 = Number(document.getElementById('X').value);
    let Y0 = Number(document.getElementById('Y').value);
    console.log(Y0);
    Y0 = Y0;
    X0 = X0;
    console.log(Y0,X0);
    let masNorm = [];
    let masDot = [];
    let x;
    let y;
    console.log(Mas);
    for(let i = -120; i < 120; i++){
        x = i + X0;
        if(X0<0 && Y0>0 ||  X0>0 && Y0<0){
            y = Y0 - ((24*X0*X0)-4*X0*(X0*X0+Y0*Y0)-36*X0-24*Y0*Y0)/(48*X0*Y0+4*Y0*(X0*X0+Y0*Y0)+36*Y0) * (x - X0);
        }else{
        y = Y0 + ((24*X0*X0)-4*X0*(X0*X0+Y0*Y0)-36*X0-24*Y0*Y0)/(48*X0*Y0+4*Y0*(X0*X0+Y0*Y0)+36*Y0) * (x - X0);}
        masDot.push({
            x : x,
            y : y
        });
        x=i+X0;
        if(X0<0 && Y0>0 ||  X0>0 && Y0<0){
            y = Y0 - (48*X0*Y0+4*Y0*(X0*X0+Y0*Y0)+36*Y0) / ((24*X0*X0)-4*X0*(X0*X0+Y0*Y0)-36*X0-24*Y0*Y0) * (x - X0);
        }else{
            y = Y0 + (48*X0*Y0+4*Y0*(X0*X0+Y0*Y0)+36*Y0) / ((24*X0*X0)-4*X0*(X0*X0+Y0*Y0)-36*X0-24*Y0*Y0) * (x - X0);}
        masNorm.push({
            x : x,
            y : y
        });
    }
    console.log(masDot);
    drawDotychna(masDot, masNorm);
}

function drawDotychna(mas, mas2){
    var c = document.getElementById("myCanvas");
    var ctx=c.getContext('2d');
    ctx.strokeStyle="#000000";
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.moveTo(mas[0].x + 500,  300  - mas[0].y);
    for(let i = 1; i<mas.length;i++){
        ctx.lineTo(mas[i].x + 500, 300 - mas[i].y);
    }
    ctx.stroke();
    ctx.beginPath();
    let reversed = mas2;
    console.log(mas2);
    reversed.reverse();
    console.log(reversed);
    ctx.strokeStyle = "green";
    ctx.moveTo(mas2[0].x + 500,  300  - mas2[mas2.length - 1].y);
    for(let i = 1; i<mas2.length;i++){
        ctx.lineTo(mas2[i].x + 500,300 - mas2[mas2.length - i -1].y);
    }
    ctx.stroke();
}

function main(sitka){
    let c = document.getElementById("myCanvas");
    let ctx  =c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    drawDetail();
    if(sitka) drawSitka();
}
