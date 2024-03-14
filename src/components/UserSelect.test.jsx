import { render, screen } from "@testing-library/react";
import UserSelect from "./UserSelect";
import userEvent from "@testing-library/user-event";

/* 
1. Arrange
2. User interaction
3. Assertion
*/

const mockOnChange = jest.fn();

describe("<UserSelect>", () => {
  let instance;

  beforeEach(() => {
    console.log("befor each");
    // Arrange
    instance = render(<UserSelect onChange={mockOnChange} />);
  });

  afterEach(() => {
    console.log("after each");
  });

  afterAll(() => {
    console.log("after all");
  });

  beforeAll(() => {
    console.log("before all");
  });

  it("should render the component", () => {
    // Assertion
    expect(instance).toBeDefined();
  });

  it("should display the label", () => {
    /*
        Querying in the test runner DOM (JEST)

        1. GetBy - if not found it wil throw error
        2. QueryBy - if not found it will retunr null.
        3. Findby - if found it will resolve the promise if not t will be rejected
    */
    const labelCOntainer = screen.queryByTestId("label");

    expect(labelCOntainer).toHaveTextContent("Select the User :");
  });

  describe("when user selects", () => {
    it("should trigger the onChange", async () => {
      const select = screen.queryByTestId("user-select");

      await userEvent.selectOptions(select, ["1"]);

      expect(mockOnChange).toHaveBeenCalled();
    });
  });
});
