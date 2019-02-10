function* addGenerator() {
    let i = 0;
    while (1) {
        i += yield i;
    }
}

let adder = addGenerator();
console.log(adder.next().value);
console.log(adder.next(5));
console.log(adder.next(6).value);
console.log(adder.next(10).value);
console.log(adder.next(20).value);
