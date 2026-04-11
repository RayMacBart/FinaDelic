// LoginPage.ts
import InputChecker from "./loginPage_src/inputChecker.js";
import SIA from "./loginPage_src/serverInteraction.js";
import { showInfo } from "../infos.js";

/**
 * Minimal app types used by this module
 */
type Router = {
  navigate: (route: string, args?: any[]) => void;
};

type LazyLoader = {
  importSVG: (name: string, containerId: string, classes?: string[]) => Promise<void>;
};

type App = {
  router: Router;
  lazyLoader: LazyLoader;
};

/**
 * Event shape used by handlers: a click event whose target is an element inside a form.
 * We accept the general Event type in handlers and narrow/cast where needed.
 */
type MaybeFormTarget = {
  form?: HTMLFormElement & { [index: number]: HTMLInputElement | HTMLInputElement & { checked?: boolean } };
};

/**
 * LoginPage
 *
 * - Binds event handlers once in the constructor and stores them as EventListener
 *   so addEventListener/removeEventListener calls are type-safe and removable.
 * - Public API: setup(app)
 */
export default class LoginPage {
  private resetModal: HTMLDialogElement;
  public inputChecker: InputChecker;

  // Bound handlers typed as EventListener so they match addEventListener overloads
  private onSignIn: EventListener;
  private onSignUp: EventListener;
  private onOpenResetModal: EventListener;
  private onSubmitReset: EventListener;

  constructor() {
    const resetModal = document.getElementById("reset-modal") as HTMLDialogElement | null;
    if (!resetModal) {
      throw new Error("LoginPage: required element '#reset-modal' not found");
    }
    this.resetModal = resetModal;
    this.inputChecker = new InputChecker();

    // Bind once and store as EventListener (cast via unknown to satisfy TS)
    this.onSignIn = (this.signIn.bind(this) as unknown) as EventListener;
    this.onSignUp = (this.signUp.bind(this) as unknown) as EventListener;
    this.onOpenResetModal = (this.openResetModal.bind(this) as unknown) as EventListener;
    this.onSubmitReset = (this.submitReset.bind(this) as unknown) as EventListener;
  }

  // -------------------------
  // Internal handlers (accept Event and narrow inside)
  // -------------------------
  private signIn(event: Event): void {
    event.preventDefault();

    // Narrow event.target to the expected shape
    const target = event.target as unknown as MaybeFormTarget;
    // InputChecker expects the same event shape as original JS code
    const valid = this.inputChecker.checkSignIn(event as unknown as Event & { target: any });
    if (valid) {
      // SIA.execSignIn expects the event-like object
      SIA.execSignIn(event as unknown as Event & { target: any });
      // async BACKEND SEND AND REACT UPON RESPONSE (e.g. app.router.navigate('flowPage') or showInfo('invalidLogin', 'warning')) LOGIC HERE
    }
  }

  private signUp(event: Event): void {
    event.preventDefault();
    // const valid = this.inputChecker.checkSignUp(event as unknown as Event & { target: any });
    const valid = true;
    if (valid) {
      SIA.execSignUp(event as unknown as Event & { target: any });
    }
  }

  private submitReset(event: Event): void {
    event.preventDefault();

    const target = event.target as unknown as MaybeFormTarget;
    const form = target.form;
    const mailInput = form ? ((form[0] as HTMLInputElement).value ?? "") : "";
    const isValidEmail = this.inputChecker.emailRX.test(mailInput);

    if (isValidEmail) {
      // POST REQUEST WITH MAILINPUT TO BACKEND - omitted here
      this.resetModal.close();
      showInfo("emailSent");
    } else {
      const warn = document.getElementById("invalMailWarn");
      if (warn) {
        (warn as HTMLElement).style.display = "block";
      }
    }
  }

  private openResetModal(event: Event): void {
    event.preventDefault();

    this.resetModal.showModal();

    const warn = document.getElementById("invalMailWarn");
    if (warn) {
      (warn as HTMLElement).style.display = "none";
    }

    const input = document.getElementById("reset-modal-input") as HTMLInputElement | null;
    if (input) {
      input.value = "";
    }

    const resetBtn = document.getElementById("resetSubmitButton");
    if (resetBtn) {
      // attach the submit handler (use the pre-bound EventListener)
      resetBtn.addEventListener("click", this.onSubmitReset);
    }
  }

  // -------------------------
  // Setup wiring
  // -------------------------
  private setupLoginPageLinks(app: App): void {
    const backBtn = document.querySelector(".loginBackButton");
    if (backBtn) {
      backBtn.addEventListener("click", () => app.router.navigate("loggedoutHP", ["page--landing"]));
    }

    const forgotLink = document.getElementById("forgotPWlink");
    if (forgotLink) {
      forgotLink.addEventListener("click", this.onOpenResetModal);
    }

    const signInBtn = document.getElementById("sign-in-submit-button");
    if (signInBtn) {
      signInBtn.addEventListener("click", this.onSignIn);
    }

    const termsLink = document.getElementById("inline-terms-link");
    if (termsLink) {
      termsLink.addEventListener("click", (event: Event) => {
        event.preventDefault();
        app.router.navigate("terms");
      });
    }

    const privacyLink = document.getElementById("inline-privacy-link");
    if (privacyLink) {
      privacyLink.addEventListener("click", (event: Event) => {
        event.preventDefault();
        app.router.navigate("privacy");
      });
    }

    const signUpBtn = document.getElementById("sign-up-submit-button");
    if (signUpBtn) {
      signUpBtn.addEventListener("click", this.onSignUp);
    }
  }

  // -------------------------
  // Public API
  // -------------------------
  public async setup(app: App): Promise<void> {
    this.setupLoginPageLinks(app);
    await app.lazyLoader.importSVG("FinaDelic Logo Hero", "heroLogoBox", ["logo", "logo--hero"]);
  }
}
