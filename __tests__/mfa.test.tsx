import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "@/app/login/mfa/page";
import userEvent from "@testing-library/user-event";
import mediaQuery from "css-mediaquery";

jest.mock(
  "firebase/app",
  () => ({
    initializeApp: jest.fn(), // Mock the initializeApp function
  }),
  { virtual: true }
);

jest.mock(
  "next/navigation",
  () => ({
    useRouter() {
      return {
        prefetch: () => null,
      };
    },
  }),
  { virtual: true }
);

describe("MFA", () => {
  it("test for mfa texts", () => {
    render(<Login />);

    const mfa = screen.getByText("Multi Factor Authentication");
    const enterCode = screen.getByText(
      "Enter below the 6-digit authentication code sent to your email address"
    );

    expect(mfa).toBeInTheDocument();
    expect(enterCode).toBeInTheDocument();
  });

  //   it("tests for Continue Button", async () => {
  //     render(<Login />);

  //     const continueButton = screen.getByRole("button", {
  //       name: "Continue",
  //     });

  //     fireEvent.submit(continueButton);

  //     const errorText = screen.getByText("Please enter a valid 6-digit code");

  //     expect(errorText).toBeInTheDocument();
  //   });

  //   it("tests for input code", async () => {
  //     render(<Login />);

  //     const continueButton = screen.getByRole("button", {
  //       name: "Continue",
  //     });

  //     fireEvent.submit(continueButton);

  //     const errorText = screen.getByText("Please enter a valid 6-digit code");

  //     expect(errorText).toBeInTheDocument();
  //   });
});
