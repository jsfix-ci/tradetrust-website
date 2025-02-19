import { ACCOUNT_2, ACCOUNT_1 } from "../utils";

describe(
  "Transfer Holder",
  {
    retries: {
      runMode: 5,
      openMode: 0,
    },
  },
  () => {
    before(() => {
      cy.getMetamaskWalletAddress().then((address) => {
        if (address !== ACCOUNT_1) {
          cy.switchMetamaskAccount(1);
        }
      });
    });

    it("should go to verify page, upload a file, connect to wallet and transfer holder successfully", () => {
      cy.visit("/verify");
      cy.get("input[type=file]").attachFile("ebl-transfer-holder.json");
      cy.get("[data-testid='asset-title-owner']").should("be.visible");
      cy.get("[data-testid='asset-title-holder']").should("be.visible");
      cy.clickConnectAndManageAssetButton();
      cy.get("[data-testid='transferHolderDropdown']").click();
      cy.get("[data-testid='editable-input-holder']").type(ACCOUNT_2);
      cy.get("[data-testid='transferBtn']").click();
      cy.confirmMetamaskTransaction();
      cy.get("[data-testid='non-editable-input-holder']").should("have.text", ACCOUNT_2);
      cy.get("[data-testid='overlay-title']").should("have.text", "Transfer Holder Success");
    });
  }
);
