import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import { store } from "../store";
import { CounterState, dogToFavToggle } from "./favoriteDogsSlice";
import { IDog } from "../../../types/types";

const mockDogData: IDog[] = [
  {
    id: "1",
    name: "Bunny",
    img: "sdsd",
    age: 2,
    zip_code: "57312",
    breed: "Hund",
  },
  {
    id: "2",
    name: "dogg2",
    img: "sdsd",
    age: 2,
    zip_code: "57311",
    breed: "Hund",
  },
];

describe("dog slice reducer", () => {
  let state: CounterState;
  beforeEach(() => {
    state = store.getState().favDogs;
  });
  it("can get initial empty state", () => {
    expect(state.dogsList).toEqual([]);
  });
  it("should be able to add to store", () => {
    mockDogData.forEach((dog) => store.dispatch(dogToFavToggle(dog)));
    state = store.getState().favDogs;
    expect(state.dogsList).toMatchObject(mockDogData);
  });
  it("should be able to remove correct one on toggle", () => {
    store.dispatch(dogToFavToggle(mockDogData[0]));
    state = store.getState().favDogs;
    expect(state.dogsList.length).toBe(1);
    expect(state.dogsList[0]).toMatchObject(mockDogData[1]);
  });
});
