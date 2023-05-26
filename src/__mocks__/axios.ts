import mockAxios from 'vitest-mock-axios';
export default mockAxios;


class Dog {
    dogName: string;
    constructor(dogName: string) {
        this.dogName = dogName;
    }

    sayDogName() {
        console.log('this is ' + this.dogName)
    }
}

const chappy = new Dog("Chappy")

chappy.sayDogName