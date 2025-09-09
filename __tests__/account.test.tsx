import {
  render,
  screen,
  fireEvent,
  waitFor,
  prettyDOM,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Account from "@/app/account/page";
import userEvent from "@testing-library/user-event";
import mediaQuery from "css-mediaquery";
import OrderHistory from "@/components/orderHistory";

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

global.fetch = jest.fn();

describe("Account", () => {
  it("test for account page fields", async () => {
    render(<Account />);

    const name = screen.getByText("Name:");
    const email = screen.getByText("Email Address:");
    const memberSince = screen.getByText("Member since:");
    const lastLogged = screen.getByText("Last Logged In Activity:");

    await waitFor(() => {
      expect(name).toBeInTheDocument();
      expect(email).toBeInTheDocument();
      expect(memberSince).toBeInTheDocument();
      expect(lastLogged).toBeInTheDocument();
    });
  });

  it("test for tabs", async () => {
    render(<Account />);

    const profile = screen.getByRole("tab", { name: "Profile" });
    const orderHistory = screen.getByRole("tab", { name: "Order History" });
    const savedAddresses = screen.getByRole("tab", {
      name: "Saved Addresses",
    });
    const paymentMethods = screen.getByRole("tab", {
      name: "Payment Methods",
    });

    await waitFor(() => {
      expect(profile).toBeInTheDocument();
      expect(orderHistory).toBeInTheDocument();
      expect(savedAddresses).toBeInTheDocument();
      expect(paymentMethods).toBeInTheDocument();
    });
  });

  it("test for switching tabs", async () => {
    const user = userEvent.setup();

    render(<Account />);

    const orderHistory = screen.getByRole("tab", { name: "Order History" });

    await user.click(orderHistory);

    await waitFor(() => {
      expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
        "Order History"
      );
    });

    const savedAddresses = screen.getByRole("tab", {
      name: "Saved Addresses",
    });

    await user.click(savedAddresses);

    await waitFor(() => {
      expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
        "Saved Addresses"
      );
    });

    const paymentMethods = screen.getByRole("tab", {
      name: "Payment Methods",
    });

    await user.click(paymentMethods);

    await waitFor(() => {
      expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
        "Payment Methods"
      );
    });
  });

  it("test for add address button opens dialog box", async () => {
    const user = userEvent.setup();

    render(<Account />);

    const savedAddresses = screen.getByRole("tab", {
      name: "Saved Addresses",
    });

    await user.click(savedAddresses);

    const addAddressButton = screen.getByRole("button", {
      name: "Add Address",
    });
    await user.click(addAddressButton);

    await waitFor(() => {
      expect(screen.getByText("Add a new address")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Cancel" })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });
  });

  it("test for add address errors", async () => {
    const user = userEvent.setup();

    render(<Account />);

    const savedAddresses = screen.getByRole("tab", {
      name: "Saved Addresses",
    });

    await user.click(savedAddresses);

    const addAddressButton = screen.getByRole("button", {
      name: "Add Address",
    });
    await user.click(addAddressButton);

    await user.click(
      screen.getByRole("button", {
        name: "Save",
      })
    );

    await waitFor(() => {
      expect(screen.getByText("Please enter a full name")).toBeInTheDocument();
    });
  });

  it("test for addresses already present and check for set as default button", async () => {
    const user = userEvent.setup();

    render(<Account />);

    const savedAddresses = screen.getByRole("tab", {
      name: "Saved Addresses",
    });

    await user.click(savedAddresses);

    const setAsDefault = screen.getAllByRole("button", {
      name: "Set as Default",
    });

    await waitFor(() => {
      expect(setAsDefault).toHaveLength(2);
    });
  });

  it("test for addresses already present and test action buttons", async () => {
    const user = userEvent.setup();

    render(<Account />);

    const savedAddresses = screen.getByRole("tab", {
      name: "Saved Addresses",
    });

    await user.click(savedAddresses);

    const removeAddress = screen.getAllByTestId("ClearIcon");

    await user.click(removeAddress[0]);

    const getLength = await screen.findAllByTestId("ClearIcon");

    await waitFor(() => {
      expect(getLength).toHaveLength(2);
    });
  });

  // it("test for edit address", async () => {
  //   const user = userEvent.setup();

  //   render(<Account />);

  //   const savedAddresses = screen.getByRole("tab", {
  //     name: "Saved Addresses",
  //   });

  //   await user.click(savedAddresses);

  //   const editAddress = screen.getAllByTestId("EditIcon");

  //   await user.click(editAddress[0]);

  //   const input = screen.getByRole("textbox", { name: "State" });
  //   await waitFor(() => {
  //     expect(input).toHaveValue("IL");
  //   });

  //   await user.click(
  //     screen.getByRole("button", {
  //       name: "Cancel",
  //     })
  //   );

  //   await user.click(editAddress[1]);

  //   await waitFor(() => {
  //     expect(input).toHaveValue("FL");
  //   });
  // }, 10000);

  it("test adding a new address", async () => {
    const user = userEvent.setup();

    render(<Account />);

    const savedAddresses = screen.getByRole("tab", {
      name: "Saved Addresses",
    });

    await user.click(savedAddresses);

    const addAddressButton = screen.getByRole("button", {
      name: "Add Address",
    });
    await user.click(addAddressButton);

    fireEvent.input(
      screen.getByRole("textbox", {
        name: "Full Name",
      }),
      {
        target: {
          value: "abc def",
        },
      }
    );

    fireEvent.input(
      screen.getByRole("textbox", {
        name: "Email",
      }),
      {
        target: {
          value: "abc@def.com",
        },
      }
    );

    fireEvent.input(
      screen.getByRole("textbox", {
        name: "Phone Number",
      }),
      {
        target: {
          value: "3125558888",
        },
      }
    );

    fireEvent.input(
      screen.getByRole("textbox", {
        name: "Address",
      }),
      {
        target: {
          value: "585 S Wrigley Street",
        },
      }
    );

    fireEvent.input(
      screen.getByRole("textbox", {
        name: "City",
      }),
      {
        target: {
          value: "Chicago",
        },
      }
    );

    fireEvent.input(
      screen.getByRole("textbox", {
        name: "State",
      }),
      {
        target: {
          value: "IL",
        },
      }
    );

    fireEvent.input(
      screen.getByRole("textbox", {
        name: "Zip Code",
      }),
      {
        target: {
          value: "55588",
        },
      }
    );

    await user.click(
      screen.getByRole("button", {
        name: "Save",
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText("Address Saved to your account!")
      ).toBeInTheDocument();
    });
  }, 10000);
});
