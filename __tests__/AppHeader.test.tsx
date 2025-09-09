import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppHeader } from "@/ui-components/AppHeader/AppHeader";
import userEvent from "@testing-library/user-event";
// import { useRouter } from "next/navigation";

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

describe("App Header", () => {
  it("test for header text", async () => {
    render(<AppHeader />);

    const header = await waitFor(() => screen.getByText("Next ECommerce"));

    expect(header).toBeInTheDocument();
  });

  it("test for header icons", async () => {
    render(<AppHeader />);

    const accountAvatar = await waitFor(() =>
      screen.getByTestId("avatar-icon")
    );

    const homeIcon = await waitFor(() => screen.getByTestId("HomeIcon"));

    const favoritesIcon = await waitFor(() =>
      screen.getByTestId("FavoriteIcon")
    );

    const cartIcon = await waitFor(() => screen.getByTestId("ShoppingBagIcon"));

    expect(accountAvatar).toBeInTheDocument();
    expect(homeIcon).toBeInTheDocument();
    expect(favoritesIcon).toBeInTheDocument();
    expect(cartIcon).toBeInTheDocument();
  });

  it("test links for header icons", async () => {
    render(<AppHeader />);

    const links = await waitFor(() => screen.getAllByRole("link"));

    const routes = ["/products", "/products/favorites", "/products/checkout"];

    links.forEach((link, i) => {
      expect(link).toHaveAttribute("href", routes[i]);
    });
  });

  it("test clicking on avatar opens the menu", async () => {
    const user = userEvent.setup();

    render(<AppHeader />);

    const accountAvatar = await waitFor(() =>
      screen.getByTestId("avatar-icon")
    );
    await user.click(accountAvatar);

    expect(screen.getByText("My account")).toBeInTheDocument();
    expect(screen.getByText("View Orders")).toBeInTheDocument();
    expect(screen.getByText("Help")).toBeInTheDocument();
  });

  it("test clicking on avatar opens the menu", async () => {
    const useRouter = jest.spyOn(require("next/navigation"), "useRouter");
    useRouter.mockImplementation(() => ({
      push: jest.fn(),
    }));

    const user = userEvent.setup();

    render(<AppHeader />);

    const accountAvatar = await waitFor(() =>
      screen.getByTestId("avatar-icon")
    );
    await user.click(accountAvatar);

    const myAccountOption = await waitFor(() => screen.getByText("My account"));
    await user.click(myAccountOption);

    expect(useRouter).toHaveBeenCalled();
  });
});
