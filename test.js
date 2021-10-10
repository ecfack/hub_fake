let arr=[];
let map=new Map();

let start;
let end;
const cardinality=100000;

start=new Date().getTime();
for(let i=0;i<cardinality;++i){
    arr.push[i];
}
end=new Date().getTime();
duration=(end-start)/1000;
console.log("init"+duration+"sec");

start=new Date().getTime();
for(let i=0;i<cardinality;++i){
    map.set(i,i);
}
end=new Date().getTime();
duration=(end-start)/1000;
console.log("init"+duration+"sec");

let arrLength=arr.length;
let mapLength=map.size;
let value;

start=new Date().getTime();
for (let i=0;i<cardinality;++i){
    value=Math.floor(Math.random()*arrLength);
    // index=arr.findIndex((element)=>{element==value});
    arr[value]=value;
}
end=new Date().getTime();
duration=(end-start)/1000;
console.log("讀or寫"+duration+"sec");


start=new Date().getTime();
for (let i=0;i<cardinality;++i){
    value=Math.floor(Math.random()*arrLength);
    map.get(value,value);
    // map.set(value,value);
}
end=new Date().getTime();
duration=(end-start)/1000;
console.log("讀or寫"+duration+"sec");

start=new Date().getTime();
arr.forEach((value)=>{
    
});
end=new Date().getTime();
duration=(end-start)/1000;
console.log("foreach"+duration+"sec");

start=new Date().getTime();
map.forEach((value)=>{
    
});
end=new Date().getTime();
duration=(end-start)/1000;
console.log("foreach"+duration+"sec");