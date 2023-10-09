import { useEffect } from "preact/hooks";
import { AppPage } from "./AppPage";
import { PageContents } from "./PageContents";
import { PageHeading } from "./PageHeading";

export function RedirectRoot({ destination }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // 👇️ redirects to an external URL
      window.location.replace(destination);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  // this shenaningans allows to display a spinner that doesn't jump when
  // the redirect happens
  return (
    <>
      <AppPage>
        <PageHeading title="&nbsp;" />
        <PageContents>
          <div
            class="d-flex align-items-center justify-content-center min"
            style="height: 100vh"
          >
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </PageContents>
      </AppPage>
    </>
  );
}
