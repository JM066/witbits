import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Profile from "./index";

const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText("Name"), "Mina Lee");
  await user.type(screen.getByLabelText("Email"), "mina@example.com");
  fireEvent.change(screen.getByLabelText("Date of birth"), {
    target: { value: "1990-01-12" },
  });
  await user.type(screen.getByLabelText("Favourite colour"), "Blue");
  fireEvent.change(screen.getByLabelText(/^Salary/), {
    target: { value: "10000" },
  });
};

describe("Profile", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // use vi.spyOn for console mock
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it("renders all profile fields and the submit button", () => {
    render(<Profile />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Date of birth")).toBeInTheDocument();
    expect(screen.getByLabelText("Favourite colour")).toBeInTheDocument();
    expect(screen.getByLabelText("Salary (£0)")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Save profile" }),
    ).toBeInTheDocument();
  });

  it("shows required errors and does not submit when the form is empty", async () => {
    const user = userEvent.setup();
    render(<Profile />);

    await user.click(screen.getByRole("button", { name: "Save profile" }));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("A valid email is required")).toBeInTheDocument();
    expect(screen.getByText("Date of birth is required")).toBeInTheDocument();
    expect(
      screen.getByText("Favourite colour is required"),
    ).toBeInTheDocument();
    expect(logSpy).not.toHaveBeenCalled();
  });

  it("shows an error for an invalid email address", async () => {
    const user = userEvent.setup();
    render(<Profile />);

    await user.type(screen.getByLabelText("Email"), "not-an-email");
    await user.click(screen.getByRole("button", { name: "Save profile" }));

    expect(
      await screen.findByText("A valid email is required"),
    ).toBeInTheDocument();
    expect(logSpy).not.toHaveBeenCalled();
  });

  it("submits the entered values when the form is valid", async () => {
    const user = userEvent.setup();
    render(<Profile />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Save profile" }));

    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith({
        data: {
          name: "Mina Lee",
          email: "mina@example.com",
          dateOfBirth: "1990-01-12",
          favouriteColour: "Blue",
          salary: 10000,
        },
      });
    });
  });

  it("resets the form after a successful submit", async () => {
    const user = userEvent.setup();
    render(<Profile />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Save profile" }));

    await waitFor(() => {
      expect(screen.getByLabelText("Name")).toHaveValue("");
    });
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByLabelText("Salary (£0)")).toBeInTheDocument();
  });

  it("updates the salary label as the bar moves", () => {
    render(<Profile />);

    fireEvent.change(screen.getByLabelText("Salary (£0)"), {
      target: { value: "70000" },
    });

    expect(screen.getByLabelText("Salary (£70000)")).toBeInTheDocument();
  });
});
