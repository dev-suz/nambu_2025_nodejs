// 객체(Obj)
// 예를들어 함선우라는 객체를 표현하려면
const name = '함선우';
const age = 40;
const job ='developer';


const name1 = '김자바';
const age1 = 39;
const job1 = 's/w developer';


// 객체 
// 선언  {}
// key : val , 

const person1 = {
    name : '함선우',
    age : 40,
    job : 'sw engineer'
}

// 접근 : dot notaion or square bracket notation
console.log(person1.name, person1['name']);


person1.hobby = ["cook","fishing"];
console.log(person1);

// key값 목록 가져옴! - Object.keys(obj);
console.log(Object.keys(person1));

// values 만 가져옴! - Object.values(obj);
console.log(Object.values(person1));


// 객체에는 다양하게 추가 가능! - 함수, 배열~ etc..
person1.addAge = function (){
    // this  해당 객체
    this.age = this.age +1;
}

person1.addAge();
console.log(person1);


//클래스  -  붕어빵틀 / 인스턴스 찍어낼 템플릿
class PersonInfo{
    constructor(name, age, address){
        this.name = name;
        this.age = age;
        this.address = address;
    }

    addAge(age){
        this.age = this.age + age;
    }

    getAge(){
        return this.age;
    }
}

let p1 = new PersonInfo('함선우', 29, '경기도 군포시');
console.log(p1);
p1.addAge(20);
console.log(p1.getAge());


// 상속
class Employee extends PersonInfo{
    constructor(name, age, address, salary){
        super(name, age, address);
        this.salary = salary;
    }
}

let e1 = new Employee('김구름',30, '금천구',100);

console.log(e1);


// 예외 처리 하여 정상종료를 해줌!
try {    
    // 처리 대상 : 데이터베이스 커넥션 받아와서
    // 데이터베이스에 데이터 질의
    const arr = new Array(-1);
} catch (error) {
    // 데이터 질의 중 예외 발생시 처리
    console.log("예외 발생 : ", error);    
} finally {
    // 예외가 발생되어도 아래의 작업은 반드시 실행
    // 처리 대상 :  데이터베이스 커넥션 닫아주기! -- 자원누수되면 나중에 접근 불가 
}

// 커스텀에러 - 비정상 에러
// 에러 호출한 쪽으로 던짐 
try {
    const err = new Error('나만의 에러~ ');
    err.name = "나만의 에러";
    err.message = "나만의 에러 메시지~"
    //err.msg = "나만의 에러 메시지2~"
    throw err ;
} catch (e) {
    console.log(e.name , e.message);
    //console.log(e.name , e.message, e.msg);
}



// =================q1 .  CarInfo 클래스 만들고 함수만들고 객체 만들어서 함수 실행.
console.log('==========q1============');
class CarInfo{
    constructor(brand, color, model){
        this.brand = brand;
        this.color = color;
        this.model =  model;
    }

    drive(){
        console.log(`모델 ${this.model}가 달리는 중`);
    }
    stop(){
        console.log(`모델 ${this.model}가 멈췄습니다.`);
    }
}


const car1 = new CarInfo("BMW", "검정", "BMW-p1");
const car2 = new CarInfo("Ford", "파랑", "Ford01x-p1");


car1.drive();
car2.stop();

console.log('========== q2 ============');
// =================q1 .  CarInfo 클래스 상속받는 ElectricCarInfo 클래스 만들고 charge 함수추가로 만들고 객체 만들어서 함수 실행.
class ElectricCarInfo extends CarInfo{
    constructor(brand, color, model,battery){
        super(brand, color, model);
        this.battery = battery;
    }

    charge(){
        console.log(`${this.model}(이)가 충전중`);
    }

}

let car3 = new ElectricCarInfo("테슬라", "쥐색", "b3-mod1",40000);
let car4 = new ElectricCarInfo("차브랜드4", "초록", "b4-mod1",480000);

car3.charge();
car3.stop();
car3.drive();

car4.charge();
car4.stop();
car4.drive();

// ts - class, interface가 중요함!


// 객체 구조분해할당




// 


