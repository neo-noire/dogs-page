import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SortDropdown } from "./SortDropdown";

describe("Sort Dropdown Component", () => {
  let item = 1;
  const onClick = vi.fn((value: number) => (item = value));
  let button: HTMLButtonElement;
  let dropdownContainer: HTMLDivElement;
  let ul: HTMLUListElement;
  let component: any;
  beforeEach(() => {
    component = render(
      <SortDropdown
        figure="Test"
        sortArray={[1, 2, 3, 4]}
        choosenItem={item}
        controlFunction={onClick}
      />
    );

    button = screen.getByRole("button");
    dropdownContainer = screen.getByTestId(/dropdown-list/i);
    ul = screen.getByRole("list");
  });
  it("It is Rendered", () => {
    expect(screen.getByText(/test/i)).toBeInTheDocument();
    // expect(component).toMatchSnapshot();
  });
  it("It renders correct number of elements", () => {
    expect(ul.childNodes.length).toBe(4);
  });
  it("It renders more then 3 elements", () => {
    expect(ul.childNodes.length).toBeGreaterThan(3);
  });
  it("It renders less then 5 elements", () => {
    expect(ul.childNodes.length).toBeLessThan(5);
  });

  it("class open added on button click", () => {
    expect(dropdownContainer.classList).toMatch(/popup/i);
    fireEvent.click(button);
    expect(dropdownContainer.className).toMatch(/open/i);
  });
  it("class open toggles on button click", () => {
    expect(dropdownContainer.classList).toMatch(/popup/i);
    fireEvent.click(button);
    expect(dropdownContainer.className).toMatch(/open/i);
    fireEvent.click(button);
    expect(dropdownContainer.className).not.toMatch(/open/i);
  });

  it("button text rendered correctly", () => {
    expect(button.textContent).toBe("Test: 1");
  });
  it("li element change button content on click", () => {
    fireEvent.click(button);
    expect(dropdownContainer.className).toMatch(/open/i);
    fireEvent.click(ul.childNodes[1]);
    expect(dropdownContainer.className).not.toMatch(/open/i);

    component.rerender(
      <SortDropdown
        figure="Test"
        sortArray={[1, 2, 3, 4]}
        choosenItem={item}
        controlFunction={onClick}
      />
    );
    expect(button.textContent).toMatch("Test: 2");
  });
});
