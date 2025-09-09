import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Help from "@/app/help/page";
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

function createMatchMedia(width: number) {
  return (query: string) => ({
    matches: mediaQuery.match(query, {
      width,
    }),
    addEventListener: () => {},
    removeEventListener: () => {},
    onchange: () => {},
    addListener: () => {},
    removeListener: () => {},
    media: "",
    dispatchEvent: jest.fn(),
  });
}

describe("Help", () => {
  it("test for header texts", async () => {
    window.matchMedia = createMatchMedia(1920);

    render(<Help />);

    const helpText = await waitFor(() =>
      screen.getByText("Frequently Asked Questions")
    );
    const helpTextTwo = await waitFor(() =>
      screen.getByText("Still have questions?")
    );

    expect(helpText).toBeInTheDocument();
    expect(helpTextTwo).toBeInTheDocument();
  });

  it("test if the buttons are present", async () => {
    window.matchMedia = createMatchMedia(1024);

    render(<Help />);

    const contactButton = await waitFor(() =>
      screen.getByRole("button", { name: "Contact us" })
    );
    const chatButton = await waitFor(() =>
      screen.getByRole("button", {
        name: "Chat with a Virtual Agent",
      })
    );

    expect(contactButton).toBeInTheDocument();
    expect(chatButton).toBeInTheDocument();
  });

  it("test chat button click opens chat box", async () => {
    const user = userEvent.setup();

    render(<Help />);

    const chatButton = await waitFor(() =>
      screen.getByRole("button", {
        name: "Chat with a Virtual Agent",
      })
    );
    await user.click(chatButton);

    expect(screen.getByText("Conversation with ShopBot")).toBeInTheDocument();
  });
});
