import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { server, http, HttpResponse, delay } from "./test/mocks/server";
import imagesData from "../public/images.json";

const CARDS_URL = "http://supabase.test/rest/v1/cards";

const renderApp = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
};

describe("App image list", () => {
  it("announces the loading state while images are being fetched", () => {
    server.use(
      http.get(CARDS_URL, async () => {
        await delay("infinite");
      }),
    );
    //clean up
    renderApp();

    expect(screen.getByRole("status")).toHaveTextContent("Loading images…");
  });

  it("shows the error fallback when the API fails", async () => {
    server.use(
      http.get(CARDS_URL, () => new HttpResponse(null, { status: 500 })),
    );

    renderApp();

    const alert = await screen.findByRole("alert");
    expect(
      within(alert).getByText("Failed to load images."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("recovers and renders the images when Retry is clicked", async () => {
    const user = userEvent.setup();
    let shouldFail = true;
    const images = imagesData.slice(0, 1);
    server.use(
      http.get(CARDS_URL, () => {
        if (shouldFail) return new HttpResponse(null, { status: 500 });
        return HttpResponse.json(images);
      }),
    );

    renderApp();

    const alert = await screen.findByRole("alert");
    shouldFail = false;
    await user.click(within(alert).getByRole("button", { name: "Retry" }));

    expect(
      await screen.findByAltText(images[0].alt_description),
    ).toBeInTheDocument();
  });
});
